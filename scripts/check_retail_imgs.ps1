$html = Get-Content retail.html -Raw -Encoding UTF8
$matches = [regex]::Matches($html, 'products/[^"'']+')
Write-Host "Found $($matches.Count) product image occurrences in retail.html:"
$matches | ForEach-Object { $_.Value } | Select-Object -Unique | ForEach-Object { Write-Host " - $_" }
