(function (root) {
  'use strict';

  var Inspect = {};

  Inspect.summarize = function (ev) {
    if (!ev) return '';

    if (ev.kind === 'if') {
      return 'IF ' + ev.expr + ' → ' + (ev.result ? 'true' : 'false');
    }
    if (ev.kind === 'enter-then' || ev.kind === 'enter-else') {
      return ev.kind + ' ' + ev.id;
    }
    if (ev.kind === 'write-scenario') {
      return 'scenario = ' + JSON.stringify(ev.value);
    }
    if (ev.kind === 'write-personality') {
      return 'personality = ' + JSON.stringify(ev.value);
    }
    if (ev.kind === 'error') {
      return 'ERROR: ' + ev.message;
    }
    return JSON.stringify(ev);
  };

  root.ScriptDebugInspect = Inspect;

})(window);
