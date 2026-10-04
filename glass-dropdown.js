/**
 * Kotwari International — Universal Frosted Glass Dropdown Engine
 * Upgrades standard HTML <select> elements into luxury frosted glass dropdowns.
 */
(function() {
  'use strict';

  function initCustomGlassSelect(selectEl) {
    if (!selectEl || selectEl.dataset.glassEnhanced === 'true') return;
    if (selectEl.classList.contains('glass-hidden-select')) return;
    selectEl.dataset.glassEnhanced = 'true';

    var isLang = selectEl.id === 'language' || selectEl.classList.contains('lang');
    var wrapper = document.createElement('div');
    wrapper.className = 'custom-glass-dropdown' + (isLang ? ' glass-lang-dropdown' : '');
    wrapper.setAttribute('data-target-id', selectEl.id || '');

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'glass-select-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    var labelSpan = document.createElement('span');
    labelSpan.className = 'glass-select-label';
    var curOpt = selectEl.options[selectEl.selectedIndex] || selectEl.options[0];
    labelSpan.textContent = curOpt ? curOpt.textContent : '';

    var arrowSpan = document.createElement('span');
    arrowSpan.className = 'glass-select-arrow';
    arrowSpan.setAttribute('aria-hidden', 'true');
    arrowSpan.textContent = '▾';

    trigger.appendChild(labelSpan);
    trigger.appendChild(arrowSpan);

    var menu = document.createElement('div');
    menu.className = 'glass-select-menu';
    menu.setAttribute('role', 'listbox');

    function syncTrigger() {
      var sel = selectEl.options[selectEl.selectedIndex];
      if (sel) {
        labelSpan.textContent = sel.textContent;
        Array.prototype.forEach.call(menu.querySelectorAll('.glass-select-option'), function(o) {
          var isMatch = o.getAttribute('data-value') === sel.value;
          o.classList.toggle('selected', isMatch);
          o.setAttribute('aria-selected', String(isMatch));
        });
      }
    }

    function renderOptions() {
      menu.innerHTML = '';
      Array.prototype.forEach.call(selectEl.options, function(opt) {
        var optDiv = document.createElement('div');
        optDiv.className = 'glass-select-option' + (opt.selected ? ' selected' : '');
        optDiv.setAttribute('role', 'option');
        optDiv.setAttribute('data-value', opt.value);
        optDiv.setAttribute('aria-selected', String(opt.selected));
        optDiv.tabIndex = -1;

        var textSpan = document.createElement('span');
        textSpan.className = 'glass-option-text';
        textSpan.textContent = opt.textContent;

        var checkSpan = document.createElement('span');
        checkSpan.className = 'glass-option-check';
        checkSpan.textContent = '✓';

        optDiv.appendChild(textSpan);
        optDiv.appendChild(checkSpan);

        optDiv.addEventListener('click', function(e) {
          e.stopPropagation();
          selectEl.value = opt.value;
          labelSpan.textContent = opt.textContent;
          Array.prototype.forEach.call(menu.querySelectorAll('.glass-select-option'), function(o) {
            o.classList.remove('selected');
            o.setAttribute('aria-selected', 'false');
          });
          optDiv.classList.add('selected');
          optDiv.setAttribute('aria-selected', 'true');
          wrapper.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
          trigger.focus();
          selectEl.dispatchEvent(new Event('change', { bubbles: true }));
        });

        menu.appendChild(optDiv);
      });
    }

    renderOptions();

    // Toggle menu
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      var wasOpen = wrapper.classList.contains('open');
      Array.prototype.forEach.call(document.querySelectorAll('.custom-glass-dropdown.open'), function(d) {
        if (d !== wrapper) {
          d.classList.remove('open');
          var t = d.querySelector('.glass-select-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      if (!wasOpen) {
        // Check positioning
        var rect = trigger.getBoundingClientRect();
        var spaceBelow = window.innerHeight - rect.bottom;
        var spaceAbove = rect.top;
        if (spaceBelow < 280 && spaceAbove > spaceBelow) {
          wrapper.classList.add('drop-up');
        } else {
          wrapper.classList.remove('drop-up');
        }
      }

      wrapper.classList.toggle('open', !wasOpen);
      trigger.setAttribute('aria-expanded', String(!wasOpen));
    });

    // Keyboard navigation
    trigger.addEventListener('keydown', function(e) {
      var isOpen = wrapper.classList.contains('open');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) {
          wrapper.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
        var opts = menu.querySelectorAll('.glass-select-option');
        if (opts.length > 0) {
          var targetIdx = e.key === 'ArrowDown' ? 0 : opts.length - 1;
          opts[targetIdx].focus();
        }
      } else if (e.key === 'Escape' && isOpen) {
        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    menu.addEventListener('keydown', function(e) {
      var opts = Array.from(menu.querySelectorAll('.glass-select-option'));
      var focused = document.activeElement;
      var curIdx = opts.indexOf(focused);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        var nextIdx = curIdx + 1 < opts.length ? curIdx + 1 : 0;
        opts[nextIdx].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        var prevIdx = curIdx - 1 >= 0 ? curIdx - 1 : opts.length - 1;
        opts[prevIdx].focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focused && focused.classList.contains('glass-select-option')) {
          focused.click();
        }
      } else if (e.key === 'Escape') {
        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });

    // Native change event sync
    selectEl.addEventListener('change', syncTrigger);

    // Property descriptor interception for programmatic value changes
    var valDesc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    if (valDesc && valDesc.set) {
      Object.defineProperty(selectEl, 'value', {
        get: function() {
          return valDesc.get.call(this);
        },
        set: function(val) {
          valDesc.set.call(this, val);
          syncTrigger();
        },
        configurable: true
      });
    }

    var idxDesc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'selectedIndex');
    if (idxDesc && idxDesc.set) {
      Object.defineProperty(selectEl, 'selectedIndex', {
        get: function() {
          return idxDesc.get.call(this);
        },
        set: function(val) {
          idxDesc.set.call(this, val);
          syncTrigger();
        },
        configurable: true
      });
    }

    // Observe DOM mutations to <select> options
    if (window.MutationObserver) {
      var obs = new MutationObserver(function() {
        renderOptions();
        syncTrigger();
      });
      obs.observe(selectEl, { childList: true, subtree: true, characterData: true });
    }

    selectEl.classList.add('glass-hidden-select');
    selectEl.parentNode.insertBefore(wrapper, selectEl);
    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);
    wrapper.appendChild(selectEl);

    wrapper.rebuild = renderOptions;
    wrapper.sync = syncTrigger;
    return wrapper;
  }

  function enhanceAllGlassSelects(root) {
    var context = root || document;
    var selects = context.querySelectorAll('select:not([data-no-glass]):not(.glass-hidden-select)');
    Array.prototype.forEach.call(selects, function(s) {
      initCustomGlassSelect(s);
    });
  }

  // Global click & Escape dismissal
  if (!window._glassDropdownEventsBound) {
    window._glassDropdownEventsBound = true;
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.custom-glass-dropdown')) {
        Array.prototype.forEach.call(document.querySelectorAll('.custom-glass-dropdown.open'), function(d) {
          d.classList.remove('open');
          var t = d.querySelector('.glass-select-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        Array.prototype.forEach.call(document.querySelectorAll('.custom-glass-dropdown.open'), function(d) {
          d.classList.remove('open');
          var t = d.querySelector('.glass-select-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  window.initCustomGlassSelect = initCustomGlassSelect;
  window.enhanceAllGlassSelects = enhanceAllGlassSelects;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { enhanceAllGlassSelects(); });
  } else {
    enhanceAllGlassSelects();
  }
})();
