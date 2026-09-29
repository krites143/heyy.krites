$files = Get-ChildItem -Filter '*.html'
foreach ($f in $files) {
    if ($f.Name -match '^test_') { continue }
    $c = Get-Content $f.FullName -Raw -Encoding UTF8
    $matchesBrand = [regex]::Matches($c, 'footer[^{}]*\.brand[^{]*\{[^}]*\}')
    if ($matchesBrand.Count -gt 0) {
        Write-Host "--- $($f.Name) ---"
        foreach ($m in $matchesBrand) {
            Write-Host "  " $m.Value.Trim()
        }
    }
}
