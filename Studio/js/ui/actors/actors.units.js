
(function(root){
  'use strict';
  var Units = {};

  Units.DEFAULT_UNITS = 'us'; // 'us' | 'metric'

  Units.getPref = function(cfg){
    cfg = cfg || {};
    var meta = cfg.meta || (cfg.meta = {});
    var ui   = meta.ui || (meta.ui = {});
    if (!ui.units) ui.units = Units.DEFAULT_UNITS;
    return ui.units;
  };

  Units.setPref = function(cfg, units){
    cfg = cfg || {};
    var meta = cfg.meta || (cfg.meta = {});
    var ui   = meta.ui || (meta.ui = {});
    ui.units = (units === 'metric') ? 'metric' : 'us';
  };

  Units.inchesToCm = function(total){ return Math.round(total * 2.54); };
  Units.cmToInches = function(cm){ return Math.round((cm||0) / 2.54); };

  Units.usLabelFromInches = function(total){
    total = total||0;
    var ft = Math.floor(total / 12), inch = total % 12;
    return ft + "'" + (inch ? inch + '"' : '');
  };

  Units.parseUS = function(label){
    // "5'6\"" or "5'"
    var m = /^(\d+)'(?:(\d+))?/.exec(label||"");
    var ft = m ? parseInt(m[1],10) : 0;
    var inch = (m && m[2]) ? parseInt(m[2],10) : 0;
    return ft*12 + inch;
  };

  Units.buildHeightOptionsUS = function(){
    var list = [], ft, inch, total;
    for (ft=4; ft<=7; ft++){
      for (inch=0; inch<12; inch++){
        total = ft*12 + inch;
        if (total < 56) continue; // 4'8"
        if (total > 84) break;    // 7'0"
        list.push(Units.usLabelFromInches(total));
      }
    }
    return list;
  };

  Units.buildHeightOptionsMetric = function(){
    var list = [], cm;
    for (cm=140; cm<=210; cm+=2){
      list.push(cm + " cm");
    }
    return list;
  };

  Units.normalizeHeight = function(displayLabel, currentUnits){
    // Returns { display: "...", cm: <int> }
    if (currentUnits === 'metric' || /cm$/.test(displayLabel||"")){
      var cm = parseInt(displayLabel,10) || 0;
      return { display: cm + " cm", cm: cm };
    } else {
      var inches = Units.parseUS(displayLabel);
      return { display: Units.usLabelFromInches(inches), cm: Units.inchesToCm(inches) };
    }
  };

  root.ActorsUnits = Units;
})(window);
