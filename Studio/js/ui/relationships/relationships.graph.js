(function(root){
  'use strict';
  var G = {};

  function drawNode(ctx, x,y, r, color, label){
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.fillStyle=color; ctx.fill();
    ctx.font='12px sans-serif'; ctx.fillStyle='#cfd3da';
    ctx.textAlign='center'; ctx.textBaseline='top';
    ctx.fillText(label, x, y+r+4);
  }

  function line(ctx, x1,y1,x2,y2, w, color){
    ctx.strokeStyle=color; ctx.lineWidth=w; ctx.beginPath();
    ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  }

  G.render = function(canvas, activeName, edges){
    if (!canvas) return;
    var ctx = canvas.getContext('2d'), w=canvas.width, h=canvas.height;
    ctx.fillStyle='#14161a'; ctx.fillRect(0,0,w,h);

    var cx=w/2, cy=h/2;
    drawNode(ctx, cx, cy, 14, '#00ffc8', activeName || '—');

    // layout targets in a circle
    var n = edges.length||0, i, radius = Math.min(w,h)*0.35;
    for (i=0;i<n;i++){
      var e = edges[i]; // {name, weight}
      var th = (i/n)*Math.PI*2 - Math.PI/2;
      var tx = cx + Math.cos(th)*radius;
      var ty = cy + Math.sin(th)*radius;
      var wgt = e.weight || 0;
      line(ctx, cx, cy, tx, ty, 1 + Math.max(0.5, wgt*3), 'rgba(77,124,255,0.7)');
      drawNode(ctx, tx, ty, 8, '#4da3ff', e.name);
      // label weight
      ctx.font='11px sans-serif'; ctx.fillStyle='#9aa2ad'; ctx.textAlign='center'; ctx.textBaseline='bottom';
      ctx.fillText(String(Math.round(wgt*100))+'%', (cx+tx)/2, (cy+ty)/2 - 4);
    }
  };

  root.RelGraph = G;
})(window);
