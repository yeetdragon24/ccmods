LoadScript('https://raw.githack.com/gkz/LiveScript/master/browser/livescript-min.js', function() {
  require("livescript").go();
  const script = document.createElement('script');
  script.type = 'text/ls';
  script.src = 'http://yeetdragon24.github.io/ccmods/jokemod/jokemod.ls';
  document.head.appendChild(script);
});
