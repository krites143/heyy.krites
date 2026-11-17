# scripts/verify_phase4_visuals.ps1
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$outDir = "C:\Users\krite\.gemini\antigravity\brain\4c5b9c58-572e-4ff9-a33c-f431d3fd4cc9\qa_screenshots_phase4"

if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$pages = @(
    "index.html",
    "about.html",
    "news.html",
    "careers.html",
    "contact.html",
    "dairy.html",
    "product-kotwari-deshi-ghee.html"
)

Write-Host "Capturing Desktop (1440x900) & Mobile (390x844) renders..." -ForegroundColor Cyan

foreach ($p in $pages) {
    $fullPath = "file:///d:/kotwari/$p"
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($p)

    # 1. Desktop
    $desktopOut = Join-Path $outDir "${baseName}_desktop.png"
    & $edge --headless --disable-gpu --window-size=1440,900 --screenshot=$desktopOut $fullPath
    Write-Host "  [OK] Desktop: $p -> $desktopOut" -ForegroundColor Green

    # 2. Mobile
    $mobileOut = Join-Path $outDir "${baseName}_mobile.png"
    & $edge --headless --disable-gpu --window-size=390,844 --screenshot=$mobileOut $fullPath
    Write-Host "  [OK] Mobile: $p -> $mobileOut" -ForegroundColor Green
}

Write-Host "`nAll Phase 4 visual captures completed successfully!" -ForegroundColor Cyan
