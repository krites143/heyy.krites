# scripts/capture_phase4_screenshots.ps1
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$outDir = "C:\Users\krite\.gemini\antigravity\brain\4c5b9c58-572e-4ff9-a33c-f431d3fd4cc9\qa_screenshots_phase4"

if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$shots = @(
    @{ name="index_desktop.png"; size="--window-size=1440,900"; url="file:///d:/kotwari/index.html" },
    @{ name="index_mobile.png"; size="--window-size=375,812"; url="file:///d:/kotwari/index.html" },
    @{ name="about_desktop.png"; size="--window-size=1440,900"; url="file:///d:/kotwari/about.html" },
    @{ name="about_mobile.png"; size="--window-size=375,812"; url="file:///d:/kotwari/about.html" },
    @{ name="news_desktop.png"; size="--window-size=1440,900"; url="file:///d:/kotwari/news.html" },
    @{ name="news_mobile.png"; size="--window-size=375,812"; url="file:///d:/kotwari/news.html" },
    @{ name="careers_desktop.png"; size="--window-size=1440,900"; url="file:///d:/kotwari/careers.html" },
    @{ name="careers_mobile.png"; size="--window-size=375,812"; url="file:///d:/kotwari/careers.html" },
    @{ name="contact_desktop.png"; size="--window-size=1440,900"; url="file:///d:/kotwari/contact.html" },
    @{ name="dairy_desktop.png"; size="--window-size=1440,900"; url="file:///d:/kotwari/dairy.html" },
    @{ name="product_ghee_desktop.png"; size="--window-size=1440,900"; url="file:///d:/kotwari/product-kotwari-deshi-ghee.html" }
)

foreach ($s in $shots) {
    $targetPath = Join-Path $outDir $s.name
    Start-Process -FilePath $edge -ArgumentList "--headless=new", "--no-sandbox", "--disable-gpu", $s.size, "--screenshot=$targetPath", $s.url -Wait
}

Get-ChildItem -Path $outDir | Select-Object Name, Length
