# scripts/verify_motion_animations.ps1
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$outDir = "C:\Users\krite\.gemini\antigravity\brain\4c5b9c58-572e-4ff9-a33c-f431d3fd4cc9\qa_motion_verification"

if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$viewports = @(
    @{ name="375_mobile"; size="--window-size=375,812" },
    @{ name="768_tablet"; size="--window-size=768,1024" },
    @{ name="1440_desktop"; size="--window-size=1440,900" }
)

$testPages = @(
    "index.html",
    "about.html",
    "careers.html",
    "news.html",
    "dairy.html",
    "product-kotwari-deshi-ghee.html"
)

Write-Host "Capturing animation visual states across viewports..." -ForegroundColor Cyan

foreach ($vp in $viewports) {
    Write-Host "--- Viewport: $($vp.name) ---" -ForegroundColor Yellow
    foreach ($page in $testPages) {
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($page)
        $targetPath = Join-Path $outDir "${baseName}_$($vp.name).png"
        $url = "file:///d:/kotwari/$page"

        Start-Process -FilePath $edge -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", $vp.size, "--virtual-time-budget=2500", "--screenshot=$targetPath", $url -Wait
    }
}

Write-Host "All motion visual captures complete! Listing files:" -ForegroundColor Green
Get-ChildItem -Path $outDir | Select-Object Name, Length
