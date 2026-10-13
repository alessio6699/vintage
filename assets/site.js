// Vintage Biosan — comportamenti condivisi (menu a tendina, menu mobile, moduli)
(function () {
  // --- menu a tendina: si aprono al clic, si chiudono con Esc o cliccando fuori
  var dropdowns = document.querySelectorAll('.dropdown');
  function closeAll(except) {
    dropdowns.forEach(function (d) {
      if (d === except) return;
      d.classList.remove('open');
      d.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  }
  dropdowns.forEach(function (d) {
    var btn = d.querySelector('button');
    btn.addEventListener('click', function () {
      var open = !d.classList.contains('open');
      closeAll(d);
      d.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeAll(); btn.focus(); }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) closeAll();
  });

  // --- menu su smartphone
  var toggle = document.querySelector('.menu-toggle');
  var mnav = document.getElementById('mnav');
  if (toggle && mnav) {
    toggle.addEventListener('click', function () {
      var open = !mnav.classList.contains('open');
      mnav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // --- moduli: dopo l'invio si torna alla pagina "grazie" di questo sito
  document.querySelectorAll('form[data-form]').forEach(function (f) {
    var next = f.querySelector('input[name="_next"]');
    if (next) next.value = new URL('grazie.html', location.href).href;
  });

  // --- altezza dell'intestazione fissa (serve alle barre "sticky" delle pagine)
  var hdr = document.querySelector('.site-header .bar');
  function setHdr() { if (hdr) document.documentElement.style.setProperty('--hdr', hdr.offsetHeight + 2 + 'px'); }
  setHdr();
  window.addEventListener('resize', setHdr);

  var y = document.getElementById('anno');
  if (y) y.textContent = new Date().getFullYear();
})();
