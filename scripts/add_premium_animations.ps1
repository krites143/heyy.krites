# scripts/add_premium_animations.ps1
# Adds:
# 1. Top Reading Scroll Progress Bar (#scrollProgress)
# 2. Metallic Button Shimmer Sweep Effect (.btn-gold, .btn.gold, .btn-primary)
# 3. Card & Image Depth Zoom & Elevation Hover Effects
# 4. Dynamic Animated Number Counters (initCounters)

$premiumCss = @"
/* Top Reading Scroll Progress Bar */
#scrollProgress{position:fixed;top:0;left:0;height:3.5px;background:linear-gradient(90deg,var(--gold,#bc944f),#f7e8b5,#dfbf83,var(--gold,#bc944f));box-shadow:0 0 10px rgba(188,148,79,.65);z-index:99999;width:0%;transition:width .08s linear;pointer-events:none}

/* Metallic Button Shimmer Sweep Effect */
.btn-gold, .btn.gold, .btn-primary{position:relative;overflow:hidden}
.btn-gold::after, .btn.gold::after, .btn-primary::after{content:'';position:absolute;top:0;left:-130%;width:80%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent);transform:skewX(-25deg);animation:btnShimmer 4.2s infinite ease-in-out;pointer-events:none}
.btn-gold:hover::after, .btn.gold:hover::after, .btn-primary:hover::after{animation:btnShimmer 1.2s ease-in-out}
@keyframes btnShimmer{0%{left:-130%}25%{left:150%}100%{left:150%}}

/* Card & Image Depth Zoom & Elevation */
.card, .product-box, .stat-box, .sattu-box, .hero-card{transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s cubic-bezier(.16,1,.3,1),border-color .25s ease}
.card:hover, .product-box:hover{transform:translateY(-5px);box-shadow:0 18px 42px rgba(9,40,64,.12);border-color:var(--gold,#bc944f)}
.stat-box:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(9,40,64,.08);border-color:var(--gold,#bc944f)}
.product-box-img, .card img, .hero-card img{transition:transform .45s cubic-bezier(.16,1,.3,1),filter .45s cubic-bezier(.16,1,.3,1)}
.product-box:hover .product-box-img, .card:hover img{transform:scale(1.04)}
"@

$counterJs = @"
function initCounters(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var counterEls = document.querySelectorAll('.stat-box strong, .glance strong, .stat strong, .hero-card strong, [data-counter]');
  if('IntersectionObserver' in window && counterEls.length > 0){
    var cObs = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var el = entry.target;
          var text = el.textContent.trim();
          var match = text.match(/([0-9,.]+)/);
          if(match){
            var targetVal = parseFloat(match[1].replace(/,/g, ''));
            if(!isNaN(targetVal) && targetVal > 0){
              var prefix = text.substring(0, match.index);
              var suffix = text.substring(match.index + match[0].length);
              var duration = 1400;
              var startTime = performance.now();
              function step(currentTime){
                var progress = Math.min((currentTime - startTime) / duration, 1);
                var ease = 1 - Math.pow(1 - progress, 3);
                var current = Math.floor(ease * targetVal);
                el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
                if(progress < 1) requestAnimationFrame(step);
                else el.textContent = text;
              }
              requestAnimationFrame(step);
            }
          }
          obs.unobserve(el);
        }
      });
    }, {threshold: 0.3});
    counterEls.forEach(function(el){cObs.observe(el);});
  }
}
"@

$scrollProgressBarJs = @"
  var bar = document.getElementById('scrollProgress');
  if(bar){
    var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = scrolled + '%';
  }
"@

$files = Get-ChildItem -Path . -Filter *.html | Where-Object { -not $_.Name.StartsWith('product-') -and $_.Name -ne 'index.html' }

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $modified = $false

    # 1. Inject Premium CSS before </style> if not present
    if (-not $content.Contains('#scrollProgress{')) {
        if ($content.Contains('</style>')) {
            $idx = $content.LastIndexOf('</style>')
            $content = $content.Substring(0, $idx) + "`n" + $premiumCss + "`n" + $content.Substring($idx)
            $modified = $true
        }
    }

    # 2. Inject <div id="scrollProgress"> right after <body>
    if (-not $content.Contains('id="scrollProgress"')) {
        if ($content.Contains('<body>')) {
            $idx = $content.IndexOf('<body>') + 6
            $content = $content.Substring(0, $idx) + "`n<div id=`"scrollProgress`" aria-hidden=`"true`"></div>" + $content.Substring($idx)
            $modified = $true
        }
    }

    # 3. Add scroll progress calculation to scroll listener if missing
    if (-not $content.Contains("var bar = document.getElementById('scrollProgress')") -and -not $content.Contains("const bar=document.getElementById('scrollProgress')")) {
        if ($content.Contains("window.addEventListener('scroll'")) {
            $content = $content.Replace("window.addEventListener('scroll', function(){", "window.addEventListener('scroll', function(){`n$scrollProgressBarJs")
            $modified = $true
        }
    }

    # 4. Add initCounters function and call if missing
    if (-not $content.Contains('function initCounters')) {
        if ($content.Contains('initScrollReveal();')) {
            $content = $content.Replace('initScrollReveal();', "`n$counterJs`n  initScrollReveal();`n  initCounters();")
            $modified = $true
        } elseif ($content.Contains('initScrollReveal()')) {
            $content = $content.Replace('initScrollReveal()', "`n$counterJs`n  initScrollReveal()`n  initCounters()")
            $modified = $true
        }
    }

    if ($modified) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated with animations: $($f.Name)"
    }
}
