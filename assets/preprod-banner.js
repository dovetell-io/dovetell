(function(){
  var host = window.location.hostname.toLowerCase();
  var params = new URLSearchParams(window.location.search);
  var isPagesPreview = host.indexOf('.pages.dev') !== -1 && host.indexOf('preprod') !== -1;
  var isPreprod = host.indexOf('preprod.') === 0 || isPagesPreview || params.get('env') === 'preprod';

  if (!isPreprod) return;

  document.title = document.title.indexOf('[PREPROD]') === 0
    ? document.title
    : '[PREPROD] ' + document.title;

  function mountLabel(){
    if (document.getElementById('preprod-env-label')) return;
    var label = document.createElement('div');
    label.id = 'preprod-env-label';
    label.setAttribute('aria-hidden', 'true');
    label.textContent = 'Preprod';
    document.body.appendChild(label);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountLabel);
  } else {
    mountLabel();
  }
})();
