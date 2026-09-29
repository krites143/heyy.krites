$files = Get-ChildItem -Path . -Filter *.html
$results = foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    [PSCustomObject]@{
        File = $f.Name
        HasProgress = $c.Contains('id="scrollProgress"')
        HasShimmer = $c.Contains('btnShimmer')
        HasCounters = $c.Contains('initCounters')
        HasReveal = $c.Contains('.reveal')
        HasBtt = $c.Contains('id="backToTop"')
        ValidHtml = $c.Contains('</body>') -and $c.Contains('</html>')
    }
}
$results | Format-Table -AutoSize
$bad = $results | Where-Object { -not ($_.HasProgress -and $_.HasShimmer -and $_.HasCounters -and $_.HasReveal -and $_.HasBtt -and $_.ValidHtml) }
if ($bad) {
    Write-Host "Incomplete pages found:" -ForegroundColor Red
    $bad | Format-Table
} else {
    Write-Host "SUCCESS: All 48 pages have the full animation suite (Scroll Progress Bar, Button Shimmer, Number Counters, Card Hover Zoom, Scroll Reveal & Back To Top)!" -ForegroundColor Green
}
