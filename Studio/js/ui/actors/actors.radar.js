
(function(root){
  'use strict';
  var Radar = {};

  Radar.drawOcean = function(canvas, ocean){
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height, cx = w/2, cy = h/2;
    var r = Math.min(w,h) * 0.38;
    var axes = ['O','C','E','A','N'];
    var step = (Math.PI*2)/5;
    var i, ang;

    function ring(n){
      ctx.beginPath();
      for (i=0;i<5;i++){
        ang = -Math.PI/2 + i*step;
        var x = cx + Math.cos(ang)*r*(n/4);
        var y = cy + Math.sin(ang)*r*(n/4);
        if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.closePath(); ctx.stroke();
    }

    ctx.clearRect(0,0,w,h);
    ctx.globalAlpha = 0.25;
    ring(1); ring(2); ring(3); ring(4);
    ctx.globalAlpha = 1;

    // axes
    ctx.font = '12px sans-serif';
    for (i=0;i<5;i++){
      ang = -Math.PI/2 + i*step;
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.lineTo(cx+Math.cos(ang)*r, cy+Math.sin(ang)*r);
      ctx.stroke();
      var lx = cx + Math.cos(ang)*(r+12), ly = cy + Math.sin(ang)*(r+12);
      ctx.fillText(axes[i], lx-4, ly+4);
    }

    // polygon
    var vals = [
      ocean && ocean.O || 0,
      ocean && ocean.C || 0,
      ocean && ocean.E || 0,
      ocean && ocean.A || 0,
      ocean && ocean.N || 0
    ];
    ctx.beginPath();
    for (i=0;i<5;i++){
      ang = -Math.PI/2 + i*step;
      var rr = r * Math.max(0, Math.min(1, vals[i]));
      var px = cx + Math.cos(ang)*rr, py = cy + Math.sin(ang)*rr;
      if (i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.closePath();
    ctx.globalAlpha = 0.25; ctx.fill(); ctx.globalAlpha = 1; ctx.stroke();
  };

  root.ActorsRadar = Radar;
})(window);
