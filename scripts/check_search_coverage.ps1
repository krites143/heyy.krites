# scripts/check_search_coverage.ps1
$content = [System.IO.File]::ReadAllText('d:\kotwari\kotwari-search.js', [System.Text.Encoding]::UTF8)
$regex = New-Object System.Text.RegularExpressions.Regex('url:\s*"([^"]+)"')
$matches = $regex.Matches($content)
$indexed = @()
foreach ($m in $matches) {
    $indexed += $m.Groups[1].Value
}

$files = Get-ChildItem -Path d:\kotwari -Filter "*.html"
$missing = @()
foreach ($f in $files) {
    if ($indexed -notcontains $f.Name) {
        $missing += $f.Name
    }
}

Write-Host "Total indexed: $($indexed.Count)"
Write-Host "Missing from search index: $($missing -join ', ')"
