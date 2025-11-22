(function(root){
  'use strict';

  // Seed scenarios with tone intent + minimal prompt text.
  // Users can add their own later.
  var Scenarios = [
    { id:'neutral_intro',   title:'Neutral Intro',   tone:'neutral',   text:'The group meets for the first time.' },
    { id:'rising_conflict', title:'Rising Conflict', tone:'conflict',  text:'A disagreement is escalating.' },
    { id:'comfort_scene',   title:'Comfort Scene',   tone:'comfort',   text:'Someone is upset; others try to help.' },
    { id:'task_planning',   title:'Task Planning',   tone:'planning',  text:'They need to coordinate a plan.' },
    { id:'tension_release', title:'Tension Release', tone:'relief',    text:'Stress fades after a breakthrough.' }
  ];

  function all(){ return Scenarios.slice(); }
  function get(id){
    var i; for(i=0;i<Scenarios.length;i++) if (Scenarios[i].id===id) return Scenarios[i];
    return null;
  }
  function add(obj){
    if (!obj || !obj.id) return;
    var i; for(i=0;i<Scenarios.length;i++) if (Scenarios[i].id===obj.id) return;
    Scenarios.push({ id: String(obj.id), title: obj.title||obj.id, tone: obj.tone||'neutral', text: obj.text||'' });
  }

  root.TestScenarios = { all:all, get:get, add:add };

})(window);
