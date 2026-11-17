# scripts/capture_phase5_viewports.ps1
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$outDir = "C:\Users\krite\.gemini\antigravity\brain\4c5b9c58-572e-4ff9-a33c-f431d3fd4cc9\qa_screenshots_phase5"

if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$viewports = @(
    @{ name="320_compact_mobile"; size="--window-size=320,640" },
    @{ name="375_standard_mobile"; size="--window-size=375,812" },
    @{ name="430_large_mobile"; size="--window-size=430,932" },
    @{ name="768_tablet"; size="--window-size=768,1024" },
    @{ name="1024_laptop"; size="--window-size=1024,768" },
    @{ name="1440_desktop"; size="--window-size=1440,900" },
    @{ name="1920_large_desktop"; size="--window-size=1920,1080" }
)

$pages = @(
    "index.html",
    "dairy.html",
    "careers.html",
    "about.html",
    "product-kotwari-deshi-ghee.html",
    "contact.html",
    "news.html",
    "404.html"
)

Write-Host "Capturing 7-viewport responsive suite for representative routes..." -ForegroundColor Cyan

foreach ($vp in $viewports) {
    Write-Host "--- Viewport: $($vp.name) ---" -ForegroundColor Yellow
    foreach ($p in $pages) {
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($p)
        $fileName = "${baseName}_$($vp.name).png"
        $targetPath = Join-Path $outDir $fileName
        $url = "file:///d:/kotwari/$p"

        Start-Process -FilePath $edge -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", $vp.size, "--screenshot=$targetPath", $url -Wait
    }
}

Get-ChildItem -Path $outDir | Select-Object Name, Length
Write-Host "Completed 7-viewport visual capture suite!" -ForegroundColor Green
