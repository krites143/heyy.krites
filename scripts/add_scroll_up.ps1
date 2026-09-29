# scripts/add_scroll_up.ps1
# Ensures consistent site-wide scroll reveal and floating back-to-top smooth scroll

$revealCss = @"
/* Scroll-Up Reveal Animations & Floating Back-To-Top */
.reveal{opacity:0;transform:translateY(32px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1);will-change:opacity,transform}
.reveal.is-visible{opacity:1;transform:translateY(0)}
.reveal-stagger>*{opacity:0;transform:translateY(28px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1);will-change:opacity,transform}
.reveal-stagger.is-visible>*{opacity:1;transform:translateY(0)}
.reveal-stagger.is-visible>*:nth-child(1){transition-delay:.05s}
.reveal-stagger.is-visible>*:nth-child(2){transition-delay:.12s}
.reveal-stagger.is-visible>*:nth-child(3){transition-delay:.19s}
.reveal-stagger.is-visible>*:nth-child(4){transition-delay:.26s}
.reveal-stagger.is-visible>*:nth-child(5){transition-delay:.33s}
.reveal-stagger.is-visible>*:nth-child(6){transition-delay:.40s}
.back-to-top{position:fixed;bottom:26px;inset-inline-end:24px;z-index:99;width:44px;height:44px;border-radius:50%;background:rgba(9,40,64,.94);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:var(--gold);border:1.5px solid var(--gold);display:flex;align-items:center;justify-content:center;font-size:1.25rem;font-weight:bold;box-shadow:0 6px 20px rgba(0,0,0,.25);cursor:pointer;opacity:0;visibility:hidden;transform:translateY(14px);transition:opacity .3s cubic-bezier(.16,1,.3,1),transform .3s cubic-bezier(.16,1,.3,1),visibility .3s,background .2s,color .2s,border-color .2s}
.back-to-top.show{opacity:1;visibility:visible;transform:translateY(0)}
.back-to-top:hover{background:var(--navy-light, #123f62);color:#ffffff;border-color:#ffffff;transform:translateY(-3px);box-shadow:0 8px 24px rgba(9,40,64,.35)}
@media(max-width:850px){.back-to-top{bottom:22px;inset-inline-end:16px;width:40px;height:40px;font-size:1.1rem}}
"@

$bttButtonHtml = '<button id="backToTop" class="back-to-top" aria-label="Back to top" title="Back to top" type="button">&uarr;</button>'

$fullScriptJs = @"
<script>
(function(){
  var btt = document.getElementById('backToTop');
  if(btt){
    btt.addEventListener('click', function(){
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }
  window.addEventListener('scroll', function(){
    if(!btt) btt = document.getElementById('backToTop');
    if(btt){
      if(window.scrollY > 350){
        btt.classList.add('show');
      } else {
        btt.classList.remove('show');
      }
    }
  }, {passive: true});

  function initScrollReveal(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){el.classList.add('is-visible');});
      return;
    }
    if('IntersectionObserver' in window){
      var obs = new IntersectionObserver(function(entries, o){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
            o.unobserve(entry.target);
          }
        });
      }, {rootMargin: '0px 0px -40px 0px', threshold: 0.1});
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){obs.observe(el);});
    } else {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){el.classList.add('is-visible');});
    }
  }
  document.addEventListener('DOMContentLoaded', initScrollReveal);
  initScrollReveal();
})();
</script>
"@

$bttOnlyJs = @"
<script>
(function(){
  var btt = document.getElementById('backToTop');
  if(btt){
    btt.addEventListener('click', function(){
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }
  window.addEventListener('scroll', function(){
    if(!btt) btt = document.getElementById('backToTop');
    if(btt){
      if(window.scrollY > 350){
        btt.classList.add('show');
      } else {
        btt.classList.remove('show');
      }
    }
  }, {passive: true});
})();
</script>
"@

$files = Get-ChildItem -Path . -Filter *.html
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $modified = $false

    # Check if back-to-top CSS exists
    if (-not $content.Contains('.back-to-top{')) {
        if ($content.Contains('</style>')) {
            # Find the last </style>
            $idx = $content.LastIndexOf('</style>')
            $content = $content.Substring(0, $idx) + "`n" + $revealCss + "`n" + $content.Substring($idx)
            $modified = $true
        }
    }

    # Check if button exists
    if (-not $content.Contains('id="backToTop"')) {
        if ($content.Contains('</body>')) {
            $hasObserver = $content.Contains('initScrollReveal') -or $content.Contains('IntersectionObserver')
            $scriptToInsert = if ($hasObserver) { $bttOnlyJs } else { $fullScriptJs }
            
            $insertion = "`n" + $bttButtonHtml + "`n`n" + $scriptToInsert + "`n"
            $idx = $content.LastIndexOf('</body>')
            $content = $content.Substring(0, $idx) + $insertion + $content.Substring($idx)
            $modified = $true
        }
    }

    if ($modified) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated: $($f.Name)"
    }
}
