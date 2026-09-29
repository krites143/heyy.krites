$files = Get-ChildItem -Filter '*.html'
foreach ($f in $files) {
    if ($f.Name -match '^test_') { continue }
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    $brandMatch = [regex]::Match($content, 'footer\s+\.brand\s*,\s*\.footer-grid\s+\.brand\{([^}]+)\}')
    $emblemMatch = [regex]::Match($content, 'footer\s+\.brand\s+\.brand-emblem-img\s*,\s*\.footer-grid\s+\.brand\s+\.brand-emblem-img\{([^}]+)\}')
    
    $align = if ($brandMatch.Success) { 
        if ($brandMatch.Groups[1].Value -match 'align-items:\s*([^;!]+)') { $matches[1].Trim() } else { 'no-align' }
    } else { 'no-rule' }

    $margin = if ($emblemMatch.Success) {
        if ($emblemMatch.Groups[1].Value -match 'margin:\s*([^;!]+)') { $matches[1].Trim() } else { 'no-margin' }
    } else { 'no-rule' }

    Write-Host ("{0,-40} | align: {1,-12} | margin: {2}" -f $f.Name, $align, $margin)
}
