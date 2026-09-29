$hubFiles = @(
    'about.html',
    'careers.html',
    'contact.html',
    'dairy.html',
    'eggs.html',
    'exports.html',
    'farmers.html',
    'fmcg.html',
    'fpo.html',
    'investors.html',
    'partners.html',
    'retail.html',
    'sustainability.html',
    'water.html'
)

$targetBrandRule = 'footer .brand, .footer-grid .brand{display:inline-flex !important;flex-direction:column !important;align-items:center !important;text-align:center !important;text-decoration:none !important;padding:0 !important;margin-bottom:14px !important}'
$targetEmblemRule = 'footer .brand .brand-emblem-img, .footer-grid .brand .brand-emblem-img{width:48px !important;height:auto !important;display:block !important;margin:0 auto -2px auto !important;filter:drop-shadow(0 2px 6px rgba(188,148,79,.35)) !important;transition:transform .3s ease !important}'

foreach ($fname in $hubFiles) {
    if (!(Test-Path $fname)) { continue }
    $content = Get-Content $fname -Raw -Encoding UTF8

    # 1. Replace footer .brand, .footer-grid .brand rule
    $content = [regex]::Replace($content, 'footer\s+\.brand\s*,\s*\.footer-grid\s+\.brand\s*\{[^}]+\}', $targetBrandRule)

    # 2. Replace footer .brand .brand-emblem-img rule
    $content = [regex]::Replace($content, 'footer\s+\.brand\s+\.brand-emblem-img\s*,\s*\.footer-grid\s+\.brand\s+\.brand-emblem-img\s*\{[^}]+\}', $targetEmblemRule)

    # 3. Replace any mobile media query overriding footer .brand to flex-start
    $content = [regex]::Replace($content, 'footer\s+\.brand\s*\{\s*align-items:\s*flex-start\s*!important;\s*\}', 'footer .brand{align-items:center !important;text-align:center !important}')

    Set-Content -Path $fname -Value $content -Encoding UTF8
    Write-Host "Updated footer brand styling in $fname"
}
