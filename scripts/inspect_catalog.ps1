$path = "scripts/products_catalog.json"
$bytes = [System.IO.File]::ReadAllBytes($path)
Write-Host "Length: $($bytes.Length)"
Write-Host "First 4 bytes: $($bytes[0..3] -join ' ')"

$content = [System.IO.File]::ReadAllText($path)
Write-Host "Char length: $($content.Length)"

$json = Get-Content $path -Raw -Encoding UTF8 | ConvertFrom-Json
Write-Host "Total products in JSON: $($json.Count)"
