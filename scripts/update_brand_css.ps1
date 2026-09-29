$files = @(
    'about.html',
    'careers.html',
    'contact.html',
    'cookie-policy.html',
    'dairy.html',
    'eggs.html',
    'exports.html',
    'farmers.html',
    'fmcg.html',
    'fpo.html',
    'investors.html',
    'partners.html',
    'privacy.html',
    'retail.html',
    'sustainability.html',
    'terms.html',
    'thank-you.html',
    'water.html',
    '404.html'
)

$newFooterName = 'footer .brand .brand-name, .footer-grid .brand .brand-name{display:inline-block !important;font-family:''Playfair Display'',Georgia,serif !important;font-size:1.95rem !important;line-height:1.1 !important;color:#ffffff !important;letter-spacing:-0.02em !important;font-weight:700 !important;position:relative !important}'
$newFooterSup  = 'footer .brand .brand-name sup, .footer-grid .brand .brand-name sup{color:#dfbf83 !important;font-size:7px !important;line-height:1 !important;position:absolute !important;top:-3px !important;right:1.5px !important;font-weight:700 !important;letter-spacing:0 !important;margin-left:0 !important}'
$newFooterTag  = 'footer .brand .brand-tag, .footer-grid .brand .brand-tag{display:block !important;width:100% !important;font-family:''Plus Jakarta Sans'',Arial,sans-serif !important;font-size:8px !important;letter-spacing:0.125em !important;text-transform:uppercase !important;color:#dfbf83 !important;margin-top:4px !important;font-weight:700 !important;text-align:justify !important;text-align-last:justify !important}'

foreach ($fname in $files) {
    if (!(Test-Path $fname)) { continue }
    $content = Get-Content $fname -Raw -Encoding UTF8

    # Replace footer brand rules
    $content = [regex]::Replace($content, 'footer\s+\.brand\s+\.brand-name\s*,\s*\.footer-grid\s+\.brand\s+\.brand-name\s*\{[^}]+\}', $newFooterName)
    $content = [regex]::Replace($content, 'footer\s+\.brand\s+\.brand-name\s+sup\s*,\s*\.footer-grid\s+\.brand\s+\.brand-name\s+sup\s*\{[^}]+\}', $newFooterSup)
    $content = [regex]::Replace($content, 'footer\s+\.brand\s+\.brand-tag\s*,\s*\.footer-grid\s+\.brand\s+\.brand-tag\s*\{[^}]+\}', $newFooterTag)

    # Replace standard header brand rules where present
    # Case 1: .brand-name{font:bold 1.85rem Georgia,serif;color:var(--navy);letter-spacing:.04em;line-height:1}
    # or .brand-name{font:2.15rem/1 ...}
    # or .brand-name { font: 2rem/1 ... }
    # We replace .brand-name{...} (that is NOT footer)
    # Check if file has header .brand-name:
    if ($content -match '(?s)(header.*?\.brand-name\s*\{[^}]+\})|(\.brand-name\s*\{[^}]+\})') {
        # Replace the first .brand-name, .brand-name sup, .brand-tag definitions in <head>
    }

    Set-Content -Path $fname -Value $content -Encoding UTF8
    Write-Host "Updated footer brand styles in $fname"
}
