(function(){
  "use strict";

  require('../../index.html');
  const Reveal = require('reveal.js');
  require('reveal.js/css/reveal.css');
  require('reveal.js/css/theme/white.css');
  
  if (window.location.search.match(/print-pdf/gi)) {
    require('reveal.js/css/print/pdf.css');
  }

  Reveal.initialize({
    history: true
  });
})();