$files = Get-ChildItem -Filter '*.html'
$matched = @()
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    if ($content -match '\.brand-name\s*\{' -or $content -match '\.brand-tag\s*\{') {
        $matched += $f.Name
    }
}
Write-Host ("Matched {0} files defining brand CSS:" -f $matched.Count)
$matched -join ', '
