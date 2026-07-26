(function() {
  window.createSearch = function(config) {
    var data = config.data || [];
    var fields = config.fields || ['n', 'a'];
    var container = typeof config.container === 'string' ? document.querySelector(config.container) : config.container;
    if (!container) return;
    var onFilter = config.onFilter || function(d) {};
    var placeholder = config.placeholder || '搜尋地點名稱、地址、地區...';

    var wrapper = document.createElement('div');
    wrapper.className = 'search-bar';
    wrapper.innerHTML =
      '<div class="search-input-wrap">' +
        '<span class="search-icon">🔍</span>' +
        '<input type="text" class="search-input" placeholder="' + placeholder + '" autocomplete="off">' +
        '<button class="search-clear" style="display:none">✕</button>' +
      '</div>' +
      '<div class="search-count"></div>';

    container.appendChild(wrapper);

    var input = wrapper.querySelector('.search-input');
    var clearBtn = wrapper.querySelector('.search-clear');
    var countEl = wrapper.querySelector('.search-count');
    var timer = null;

    function doFilter() {
      var q = input.value.trim().toLowerCase();
      clearBtn.style.display = q ? '' : 'none';

      var filtered;
      if (!q) {
        filtered = data;
      } else {
        filtered = data.filter(function(item) {
          for (var i = 0; i < fields.length; i++) {
            var val = item[fields[i]];
            if (val && String(val).toLowerCase().indexOf(q) !== -1) return true;
          }
          return false;
        });
      }

      countEl.textContent = q ? '顯示 ' + filtered.length + '/' + data.length + ' 個結果' : '';
      onFilter(filtered);
    }

    input.addEventListener('input', function() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(doFilter, 150);
    });

    clearBtn.addEventListener('click', function() {
      input.value = '';
      doFilter();
      input.focus();
    });

    return {
      filter: doFilter,
      input: input,
      setData: function(newData) { data = newData; },
      destroy: function() { container.removeChild(wrapper); }
    };
  };
})();
