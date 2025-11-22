(function(root){
  'use strict';

  var FocusRadar = {};
  var TWO_PI = Math.PI * 2;

  function clamp01(x){ return x<0?0:(x>1?1:x); }
  function lerp(a,b,t){ return a + (b - a) * t; }

  function normalizeWeights(actors){
    var i, sum=0;
    for(i=0;i<actors.length;i++) sum += (actors[i].weight>0?actors[i].weight:0);
    if (!sum){
      var even = 1/(actors.length||1); for(i=0;i<actors.length;i++) actors[i]._pct=even;
      return actors;
    }
    for(i=0;i<actors.length;i++){
      var w = (actors[i].weight>0?actors[i].weight:0);
      actors[i]._pct = w/sum;
    }
    return actors;
  }

  function rgba(r,g,b,a){ return 'rgba('+r+','+g+','+b+','+a+')'; }
  function ringColor(op){ return rgba(77,124,255, op); }
  function pointColor(){ return '#00ffc8'; }
  function labelColor(){ return '#cfd3da'; }
  function gridColor(){ return '#2b2f39'; }
  function axisColor(){ return '#3a3f4a'; }
  function bgColor(){ return '#14161a'; }

  function layoutPoints(actors, cx, cy, maxR, minR){
    var pos=[], n=actors.length||1, i;
    for(i=0;i<n;i++){
      var a = actors[i];
      var theta = (i/n)*TWO_PI - Math.PI/2;
      var pct = clamp01(a._pct||0);
      var r = lerp(maxR, minR, pct); // higher pct -> nearer center
      pos.push({ id:a.id, name:a.name, pct:pct, weight:a.weight, x:cx+Math.cos(theta)*r, y:cy+Math.sin(theta)*r, r:r, theta:theta });
    }
    return pos;
  }

  function computeRingDensities(points, maxR, minR, ringCount){
    var bands=[], i, step=(maxR-minR)/ringCount;
    for(i=0;i<ringCount;i++) bands[i]=0;
    for(i=0;i<points.length;i++){
      var p=points[i], band = Math.floor((p.r-minR)/step);
      if (band<0) band=0; if (band>=ringCount) band=ringCount-1; bands[band]+=1;
    }
    var max=0; for(i=0;i<ringCount;i++) if (bands[i]>max) max=bands[i];
    if (!max) return bands;
    for(i=0;i<ringCount;i++) bands[i]=bands[i]/max;
    return bands;
  }

  function makeTooltip(){
    var t=document.createElement('div');
    t.className='focus-radar-tooltip';
    t.style.position='absolute'; t.style.pointerEvents='none'; t.style.padding='4px 6px';
    t.style.borderRadius='4px'; t.style.background='rgba(17,17,17,0.92)'; t.style.border='1px solid #333';
    t.style.color='#ddd'; t.style.fontSize='12px'; t.style.transform='translate(8px,-8px)'; t.style.display='none';
    return t;
  }
  function hitTest(points, mx, my, pad){
    var i; for(i=0;i<points.length;i++){
      var p=points[i], dx=mx-p.x, dy=my-p.y; if ((dx*dx+dy*dy)<=pad*pad) return p;
    } return null;
  }

  function render(state){
    var c=state.ctx,w=state.w,h=state.h,cx=state.cx,cy=state.cy,maxR=state.maxR,minR=state.minR, rings=state.ringCount, pts=state.points;
    c.fillStyle=bgColor(); c.fillRect(0,0,w,h);

    var step=(maxR-minR)/rings, dens=computeRingDensities(pts,maxR,minR,rings), i;
    for(i=0;i<rings;i++){
      var rO=minR+(i+1)*step, rI=minR+i*step, d=dens[i]||0, op=0.08+d*0.18;
      c.beginPath(); c.arc(cx,cy,rO,0,TWO_PI,false); c.arc(cx,cy,rI,0,TWO_PI,true); c.closePath();
      c.fillStyle=ringColor(op); c.fill();
      c.beginPath(); c.arc(cx,cy,rO,0,TWO_PI,false); c.strokeStyle=gridColor(); c.lineWidth=1; c.stroke();
    }

    var axes=Math.max(4, Math.min(12, pts.length));
    for(i=0;i<axes;i++){
      var th=(i/axes)*Math.PI*2 - Math.PI/2;
      c.beginPath(); c.moveTo(cx+Math.cos(th)*minR, cy+Math.sin(th)*minR);
      c.lineTo(cx+Math.cos(th)*maxR, cy+Math.sin(th)*maxR);
      c.strokeStyle=axisColor(); c.lineWidth=1; c.stroke();
    }

    c.fillStyle=pointColor();
    for(i=0;i<pts.length;i++){ c.beginPath(); c.arc(pts[i].x, pts[i].y, 4, 0, Math.PI*2, false); c.fill(); }

    c.font='12px sans-serif'; c.textAlign='left'; c.textBaseline='middle'; c.fillStyle=labelColor();
    for(i=0;i<pts.length;i++){ var p=pts[i]; c.fillText(p.name+' ('+Math.round(p.pct*100)+'%)', p.x+8, p.y); }

    c.font='13px sans-serif'; c.textAlign='center'; c.textBaseline='top'; c.fillStyle='#9aa2ad';
    c.fillText('Scene Focus (token allocation bias)', cx, 8);
  }

  FocusRadar.mount = function(el, opts){
    var canvas=document.createElement('canvas');
    canvas.width=(opts&&opts.width)||560; canvas.height=(opts&&opts.height)||340;
    canvas.className='focus-radar-canvas';

    var tip=makeTooltip(); el.style.position='relative'; el.appendChild(canvas); el.appendChild(tip);

    var ctx=canvas.getContext('2d'), w=canvas.width, h=canvas.height, cx=w/2, cy=h/2+6;
    var rings=(opts&&opts.rings)||6, minRatio=(opts&&opts.minRadiusRatio!=null)?opts.minRadiusRatio:0.12;
    var maxR=Math.min(w,h)*0.42, minR=maxR*minRatio;

    var actors=(opts&&opts.actors)?opts.actors.slice():[];
    normalizeWeights(actors);
    var points=layoutPoints(actors,cx,cy,maxR,minR);

    var state={ el:el, canvas:canvas, ctx:ctx, w:w, h:h, cx:cx, cy:cy, maxR:maxR, minR:minR, ringCount:rings, actors:actors, points:points, tooltip:tip };
    render(state);

    canvas.onmousemove=function(ev){
      var r=canvas.getBoundingClientRect(), mx=ev.clientX-r.left, my=ev.clientY-r.top, hit=hitTest(state.points,mx,my,8);
      if (hit){ tip.style.left=(mx+12)+'px'; tip.style.top=(my-12)+'px'; tip.innerHTML=hit.name+'<br>'+Math.round(hit.pct*100)+'% ('+(hit.weight||0)+'w)'; tip.style.display='block'; }
      else { tip.style.display='none'; }
    };

    el.__focusRadar = state;
    return FocusRadar;
  };

  FocusRadar.update = function(el, actors){
    var st = el && el.__focusRadar; if (!st) return;
    st.actors = (actors||[]).slice();
    normalizeWeights(st.actors);
    st.points = (function(a){ return (a && a.length) ? (function(){ return (function(){
      return (function(){ return (function(){
        return (function cx(){ return; }(), null); })(); })(); })(); }()) : []; }(st.actors), layoutPoints(st.actors, st.cx, st.cy, st.maxR, st.minR));
    st.points = layoutPoints(st.actors, st.cx, st.cy, st.maxR, st.minR);
    (function(){ render(st); })();
  };

  root.FocusRadar = FocusRadar;

})(window);
