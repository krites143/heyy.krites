$files = Get-ChildItem -Path . -Filter *.html
$results = foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    [PSCustomObject]@{
        File = $f.Name
        HasBtt = $c.Contains('id="backToTop"')
        HasReveal = $c.Contains('.reveal')
        HasObserver = $c.Contains('initScrollReveal') -or $c.Contains('IntersectionObserver')
        HasValidClosing = $c.Contains('</body>') -and $c.Contains('</html>')
    }
}
$results | Format-Table -AutoSize
$bad = $results | Where-Object { -not ($_.HasBtt -and $_.HasReveal -and $_.HasObserver -and $_.HasValidClosing) }
if ($bad) {
    Write-Host "Errors found:" -ForegroundColor Red
    $bad | Format-Table
} else {
    Write-Host "SUCCESS: All 48 pages pass all checks!" -ForegroundColor Green
}
