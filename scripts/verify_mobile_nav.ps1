# scripts/verify_mobile_nav.ps1
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$outDir = "C:\Users\krite\.gemini\antigravity\brain\4c5b9c58-572e-4ff9-a33c-f431d3fd4cc9\qa_mobile_nav_verification"

if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$viewports = @(
    @{ name="320_compact"; width=320; height=640 },
    @{ name="360_android"; width=360; height=740 },
    @{ name="375_standard"; width=375; height=812 },
    @{ name="390_iphone14"; width=390; height=844 },
    @{ name="430_promax"; width=430; height=932 },
    @{ name="768_tablet"; width=768; height=1024 }
)

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host " KOTWARI INTERNATIONAL - MOBILE NAVIGATION TEST SUITE" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

# 1. Test index.html interaction cycle in Edge
Write-Host "`nTesting index.html Mobile Navigation Open-Close Cycle..." -ForegroundColor Yellow

$testHtml = @"
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Mobile Nav Test Harness</title>
</head>
<body>
  <iframe id="testFrame" src="index.html" style="width:375px;height:812px;border:none;"></iframe>
  <script>
    window.testLog = [];
    const iframe = document.getElementById('testFrame');
    iframe.onload = () => {
      const doc = iframe.contentDocument;
      const win = iframe.contentWindow;
      const btn = doc.querySelector('.menu, #menuToggle');
      const nav = doc.querySelector('#navigation');
      const backdrop = doc.getElementById('kmNavBackdrop');

      window.testLog.push({ step: 'initial', btnFound: !!btn, navFound: !!nav, expanded: btn ? btn.getAttribute('aria-expanded') : null, navOpen: nav ? nav.classList.contains('open') : null });

      // Click to open
      btn.click();
      setTimeout(() => {
        window.testLog.push({
          step: 'after_open_click',
          expanded: btn.getAttribute('aria-expanded'),
          navOpen: nav.classList.contains('open'),
          navDisplay: win.getComputedStyle(nav).display,
          backdropActive: backdrop ? backdrop.classList.contains('is-active') : false,
          bodyLocked: doc.body.classList.contains('km-nav-locked')
        });

        // Click again to close
        btn.click();
        setTimeout(() => {
          window.testLog.push({
            step: 'after_close_click',
            expanded: btn.getAttribute('aria-expanded'),
            navOpen: nav.classList.contains('open'),
            navDisplay: win.getComputedStyle(nav).display,
            backdropActive: backdrop ? backdrop.classList.contains('is-active') : false,
            bodyLocked: doc.body.classList.contains('km-nav-locked')
          });

          // Test open + backdrop click
          btn.click();
          setTimeout(() => {
            window.testLog.push({ step: 'reopened', navOpen: nav.classList.contains('open') });
            if (backdrop) backdrop.click();
            setTimeout(() => {
              window.testLog.push({
                step: 'after_backdrop_click',
                navOpen: nav.classList.contains('open'),
                bodyLocked: doc.body.classList.contains('km-nav-locked')
              });
              window.testComplete = true;
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    };
  </script>
</body>
</html>
"@

Set-Content -Path "test_nav_harness.html" -Value $testHtml -Encoding utf8

# Run Edge headless to execute the harness
$res = & $edge --headless=new --disable-gpu --run-all-compositor-stages-before-draw "file:///d:/kotwari/test_nav_harness.html" --dump-dom 2>&1

Remove-Item "test_nav_harness.html" -Force -ErrorAction SilentlyContinue

# 2. Capture responsive screenshots across viewports for key pages
$pages = @("index.html", "about.html", "careers.html", "dairy.html", "product-kotwari-deshi-ghee.html")

foreach ($vp in $viewports) {
    Write-Host "Capturing viewport: $($vp.name) ($($vp.width)x$($vp.height))..." -ForegroundColor DarkCyan
    foreach ($pg in $pages) {
        $base = [System.IO.Path]::GetFileNameWithoutExtension($pg)
        $outImg = Join-Path $outDir "${base}_$($vp.name).png"
        & $edge --headless=new --window-size="$($vp.width),$($vp.height)" --disable-gpu --hide-scrollbars --screenshot="$outImg" "file:///d:/kotwari/$pg" 2>&1 | Out-Null
    }
}

Write-Host "`nAll Viewport Visual Captures Saved to:" -ForegroundColor Green
Write-Host " $outDir" -ForegroundColor White
