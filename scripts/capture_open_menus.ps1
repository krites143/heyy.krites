# scripts/capture_open_menus.ps1
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$outDir = "C:\Users\krite\.gemini\antigravity\brain\4c5b9c58-572e-4ff9-a33c-f431d3fd4cc9\qa_mobile_nav_verification"

# We create an automation harness that loads the page, clicks the menu button, and renders it
$pages = @(
    @{ file="index.html"; selector=".menu, #menuToggle"; outName="index_375_menu_open.png" },
    @{ file="about.html"; selector=".mobile-nav-toggle"; outName="about_375_menu_open.png" },
    @{ file="product-kotwari-deshi-ghee.html"; selector="#mobileNavToggle, .mobile-nav-toggle"; outName="product_375_menu_open.png" }
)

foreach ($item in $pages) {
    $tempHarness = "test_harness_$($item.file)"
    $html = @"
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>body,html{margin:0;padding:0;overflow:hidden;width:375px;height:812px;}</style>
</head>
<body>
  <iframe id="f" src="$($item.file)" style="width:375px;height:812px;border:none;"></iframe>
  <script>
    const iframe = document.getElementById('f');
    iframe.onload = () => {
      setTimeout(() => {
        const doc = iframe.contentDocument;
        const btn = doc.querySelector('$($item.selector)');
        if (btn) {
          btn.click();
        }
      }, 200);
    };
  </script>
</body>
</html>
"@
    Set-Content -Path $tempHarness -Value $html -Encoding utf8
    $outPath = Join-Path $outDir $item.outName
    & $edge --headless=new --window-size=375,812 --disable-gpu --virtual-time-budget=2000 --screenshot="$outPath" "file:///d:/kotwari/$tempHarness" 2>&1 | Out-Null
    Remove-Item $tempHarness -Force -ErrorAction SilentlyContinue
    Write-Host "Captured open menu state for $($item.file) -> $($item.outName)" -ForegroundColor Green
}
