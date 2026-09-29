$htmlFiles = Get-ChildItem -Path '.' -Filter '*.html'
$missingImages = @()
$checkedCount = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $matches = [regex]::Matches($content, 'src=["'']([^"'']+)["'']|image:\s*["'']([^"'']+)["'']')
    foreach ($m in $matches) {
        $path = if ($m.Groups[1].Value) { $m.Groups[1].Value } else { $m.Groups[2].Value }
        if ($path -match '^(http|data:|#|\$\{)' -or $path -match '\.(js|css|ico)$') { continue }
        $checkedCount++
        $cleanPath = $path.Split('?')[0].Replace('/', '\')
        if (!(Test-Path $cleanPath)) {
            $missingImages += [PSCustomObject]@{
                File = $file.Name
                MissingRef = $path
            }
        }
    }
}

Write-Host ("Checked {0} image references across {1} HTML files." -f $checkedCount, $htmlFiles.Count)
if ($missingImages.Count -eq 0) {
    Write-Host "SUCCESS: 0 broken image references found!" -ForegroundColor Green
} else {
    Write-Host ("FAIL: Found {0} broken image references:" -f $missingImages.Count) -ForegroundColor Red
    $missingImages | Format-Table -AutoSize
}
