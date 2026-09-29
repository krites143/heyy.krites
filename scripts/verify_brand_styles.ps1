$files = Get-ChildItem -Filter '*.html'
$checked = 0
$issues = @()

foreach ($f in $files) {
    if ($f.Name -match '^test_') { continue }
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    $checked++

    # Check header brand-name sup
    if ($content -match '\.brand-name\s+sup\{[^}]*vertical-align' -and $content -notmatch '\.brand-name\s+sup\{[^}]*position:\s*absolute') {
        $issues += [PSCustomObject]@{ File = $f.Name; Issue = "Header brand-name sup still has vertical-align without position:absolute" }
    }
    # Check footer brand-name sup
    if ($content -match 'footer\s+\.brand\s+\.brand-name\s+sup[^{]*\{[^}]*vertical-align:\s*super\s*!important' -and $content -notmatch 'footer\s+\.brand\s+\.brand-name\s+sup[^{]*\{[^}]*position:\s*absolute') {
        $issues += [PSCustomObject]@{ File = $f.Name; Issue = "Footer brand-name sup still has vertical-align:super !important without position:absolute" }
    }
    # Check brand-tag has justify
    if ($content -match '\.brand-tag\{' -and $content -notmatch '\.brand-tag\{[^}]*text-align-last:\s*justify') {
        $issues += [PSCustomObject]@{ File = $f.Name; Issue = "Header brand-tag missing text-align-last:justify" }
    }
}

Write-Host ("Audited {0} HTML files." -f $checked)
if ($issues.Count -eq 0) {
    Write-Host "SUCCESS: All files have the updated brand logo styles (TM on top of I and justified tagline)!" -ForegroundColor Green
} else {
    Write-Host ("FOUND {0} ISSUES:" -f $issues.Count) -ForegroundColor Red
    $issues | Format-Table -AutoSize
}
