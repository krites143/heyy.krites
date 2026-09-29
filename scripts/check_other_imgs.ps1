$pages = @('dairy.html', 'water.html', 'fmcg.html')
foreach ($p in $pages) {
    $html = Get-Content $p -Raw -Encoding UTF8
    $matches = [regex]::Matches($html, 'products/[^"'']+')
    Write-Host "Found $($matches.Count) product image occurrences in ${p}:"
    $matches | ForEach-Object { $_.Value } | Select-Object -Unique | ForEach-Object { Write-Host " - $_" }
}
