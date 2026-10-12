
(function () {
  var q = document.getElementById('q');
  var cat = document.getElementById('nisaCat');
  var count = document.getElementById('count');
  var rows = Array.prototype.slice.call(document.querySelectorAll('#plist tbody tr'));
  if (!rows.length) return;
  function apply() {
    var term = (q && q.value || '').trim().toLowerCase();
    var c = (cat && cat.value || '').toLowerCase();
    var shown = 0;
    rows.forEach(function (tr) {
      var ok = true;
      if (c && (tr.getAttribute('data-cat') || '') !== c) ok = false;
      if (ok && term) {
        var hay = (tr.getAttribute('data-name') || '') + ' '
          + (tr.getAttribute('data-brand') || '') + ' '
          + (tr.getAttribute('data-cat') || '');
        if (hay.indexOf(term) === -1) ok = false;
      }
      tr.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });
    if (count) count.textContent = shown + ' shown';
  }
  if (q) q.addEventListener('input', apply);
  if (cat) cat.addEventListener('change', apply);
})();
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('#clist li.co'));
  if (!items.length) return;
  var sels = {type: 'fType', indep: 'fIndep', ontario: 'fOntario', regen: 'fRegen'};
  var count = document.getElementById('ccount');
  var boxes = Array.prototype.slice.call(document.querySelectorAll('input.certf'));
  function apply() {
    var shown = 0;
    var want = boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
    items.forEach(function (li) {
      var ok = true;
      Object.keys(sels).forEach(function (k) {
        var el = document.getElementById(sels[k]);
        var v = el && el.value;
        if (v && (li.getAttribute('data-' + k) || '') !== v) ok = false;
      });
      if (ok && want.length) {
        var have = (li.getAttribute('data-certs') || '').split('|');
        // multi-select: company must hold ALL checked certifications
        want.forEach(function (w) { if (have.indexOf(w) === -1) ok = false; });
      }
      li.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });
    if (count) count.textContent = shown + ' shown';
  }
  Object.keys(sels).forEach(function (k) {
    var el = document.getElementById(sels[k]); if (el) el.addEventListener('change', apply);
  });
  boxes.forEach(function (b) { b.addEventListener('change', apply); });
})();
