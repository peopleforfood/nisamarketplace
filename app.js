
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
