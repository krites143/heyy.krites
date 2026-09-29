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

$footerName = 'footer .brand .brand-name, .footer-grid .brand .brand-name{display:inline-block !important;font-family:''Playfair Display'',Georgia,serif !important;font-size:1.95rem !important;line-height:1.1 !important;color:#ffffff !important;letter-spacing:-0.02em !important;font-weight:700 !important;position:relative !important}'
$footerSup  = 'footer .brand .brand-name sup, .footer-grid .brand .brand-name sup{color:#dfbf83 !important;font-size:7px !important;line-height:1 !important;position:absolute !important;top:-3px !important;right:1.5px !important;font-weight:700 !important;letter-spacing:0 !important;margin-left:0 !important}'
$footerTag  = 'footer .brand .brand-tag, .footer-grid .brand .brand-tag{display:block !important;width:100% !important;font-family:''Plus Jakarta Sans'',Arial,sans-serif !important;font-size:8px !important;letter-spacing:0.125em !important;text-transform:uppercase !important;color:#dfbf83 !important;margin-top:4px !important;font-weight:700 !important;text-align:justify !important;text-align-last:justify !important}'

foreach ($fname in $files) {
    if (!(Test-Path $fname)) { continue }
    $content = Get-Content $fname -Raw -Encoding UTF8

    # 1. Update footer brand styles
    $content = [regex]::Replace($content, 'footer\s+\.brand\s+\.brand-name\s*,\s*\.footer-grid\s+\.brand\s+\.brand-name\s*\{[^}]+\}', $footerName)
    $content = [regex]::Replace($content, 'footer\s+\.brand\s+\.brand-name\s+sup\s*,\s*\.footer-grid\s+\.brand\s+\.brand-name\s+sup\s*\{[^}]+\}', $footerSup)
    $content = [regex]::Replace($content, 'footer\s+\.brand\s+\.brand-tag\s*,\s*\.footer-grid\s+\.brand\s+\.brand-tag\s*\{[^}]+\}', $footerTag)

    # 2. Update Group 1 Header: Georgia bold 1.85rem
    $g1Old = '\.brand-name\{font:bold 1\.85rem Georgia,serif;color:var\(--navy\);letter-spacing:\.04em;line-height:1\}\s*\.brand-name sup\{font-size:\.45em;font-weight:normal;vertical-align:super\}\s*\.brand-tag\{font-size:8px;font-family:Arial,sans-serif;letter-spacing:\.22em;color:var\(--gold\);text-transform:uppercase;margin-top:3px\}'
    $g1New = '.brand-name{font:700 1.95rem/1.05 ''Playfair Display'',Georgia,serif;color:var(--navy);letter-spacing:-.035em;display:inline-block;position:relative}' + "`n" + '    .brand-name sup{position:absolute;top:-3px;right:1.5px;font:700 7px/1 ''Plus Jakarta Sans'',sans-serif;color:var(--gold);letter-spacing:0;margin-left:0}' + "`n" + '    .brand-tag{display:block;width:100%;font:700 8.2px/1.2 ''Plus Jakarta Sans'',Arial,sans-serif;letter-spacing:0.125em;text-transform:uppercase;color:var(--gold);margin-top:3px;text-align:justify;text-align-last:justify}'
    $content = [regex]::Replace($content, $g1Old, $g1New)

    # 3. Update Group 2 Header: Playfair 2.15rem light
    $g2Old = '\.brand-name\{font:2\.15rem/1 ''Playfair Display'',Georgia,serif;color:#183143;letter-spacing:-\.035em;display:inline-flex;align-items:baseline\}\s*\.brand-name sup\{font-size:10px;vertical-align:top;margin-left:2px;font-family:''?Plus Jakarta Sans''?,Arial,sans-serif;color:#8b682b;font-weight:600\}\s*\.brand-tag\{display:block;font:8\.5px ''?Plus Jakarta Sans''?,Arial,sans-serif;letter-spacing:\.22em;text-transform:uppercase;color:#8b682b;margin-top:3px;font-weight:700\}'
    $g2New = '.brand-name{font:700 2.1rem/1.05 ''Playfair Display'',Georgia,serif;color:#183143;letter-spacing:-.035em;display:inline-block;position:relative}' + "`n" + '    .brand-name sup{position:absolute;top:-3px;right:1.5px;font:700 7px/1 ''Plus Jakarta Sans'',Arial,sans-serif;color:#8b682b;letter-spacing:0;margin-left:0}' + "`n" + '    .brand-tag{display:block;width:100%;font:700 8.2px/1.2 ''Plus Jakarta Sans'',Arial,sans-serif;letter-spacing:0.125em;text-transform:uppercase;color:#8b682b;margin-top:3px;text-align:justify;text-align-last:justify}'
    $content = [regex]::Replace($content, $g2Old, $g2New)

    # 4. Update Group 3 Header: Dark header (404, terms, privacy, cookie-policy, thank-you)
    $g3Old = '\.brand-name\{font:2\.15rem/1 Georgia,serif;color:white;letter-spacing:-\.035em;display:inline-flex;align-items:baseline\}\s*\.brand-name sup\{font-size:11px;vertical-align:top;margin-left:2px;font-family:Arial,sans-serif;color:#dfbf83;font-weight:600\}\s*\.brand-tag\{display:block;font:9\.5px Arial,sans-serif;letter-spacing:\.24em;text-transform:uppercase;color:#dfbf83;margin-top:5px;font-weight:600\}'
    $g3New = '.brand-name{font:700 2.1rem/1.05 ''Playfair Display'',Georgia,serif;color:white;letter-spacing:-.035em;display:inline-block;position:relative}' + "`n" + '    .brand-name sup{position:absolute;top:-3px;right:1.5px;font:700 7px/1 ''Plus Jakarta Sans'',Arial,sans-serif;color:#dfbf83;letter-spacing:0;margin-left:0}' + "`n" + '    .brand-tag{display:block;width:100%;font:700 8.2px/1.2 ''Plus Jakarta Sans'',Arial,sans-serif;letter-spacing:0.125em;text-transform:uppercase;color:#dfbf83;margin-top:3px;text-align:justify;text-align-last:justify}'
    $content = [regex]::Replace($content, $g3Old, $g3New)

    # 5. Update mobile media queries: .brand-name{font-size:1.6rem} or 1.55rem
    $content = [regex]::Replace($content, '\.brand-name\{font-size:1\.6rem\}\s*\.brand-tag\{font-size:7px;letter-spacing:\.16em;margin-top:2px\}', '.brand-name{font-size:1.6rem}.brand-name sup{top:-2px !important;right:1px !important;font-size:6px !important}.brand-tag{font-size:6.8px !important;letter-spacing:0.12em !important;margin-top:2px !important;width:100% !important;text-align-last:justify !important}')
    $content = [regex]::Replace($content, '\.brand-name\s*\{\s*font-size:\s*1\.55rem\s*!important;\s*\}', '.brand-name{font-size:1.55rem !important;display:inline-block !important;position:relative !important}.brand-name sup{top:-2px !important;right:1px !important;font-size:6px !important;position:absolute !important}.brand-tag{font-size:6.8px !important;letter-spacing:0.12em !important;margin-top:2px !important;width:100% !important;text-align-last:justify !important}')

    Set-Content -Path $fname -Value $content -Encoding UTF8
    Write-Host "Processed $fname"
}
