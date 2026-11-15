$ErrorActionPreference = 'Stop'
function Find-HtmlFiles($root) {
    Get-ChildItem -Path $root -Recurse -Include *.html -File
}
function Extract-NavLinks($content) {
    $navPattern = '<nav[^>]*>(.*?)</nav>'
    $navMatch = [regex]::Match($content, $navPattern, [System.Text.RegularExpressions.RegexOptions]::Singleline -bor [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    if (-not $navMatch.Success) { return @() }
    $navHtml = $navMatch.Groups[1].Value
    $linkPattern = "<a[^>]+href\s*=\s*[\"']([^\"']+)[\"']"
    $matches = [regex]::Matches($navHtml, $linkPattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    $links = @()
    foreach ($m in $matches) { $links += $m.Groups[1].Value }
    return $links
}
function Has-Id($content, $id) {
    $pattern = "id=['\"]$([regex]::Escape($id))['\"]"
    return [regex]::IsMatch($content, $pattern)
}
$root = $args[0]
if (-not $root) { $root = '.' }
$broken = @()
foreach ($file in Find-HtmlFiles $root) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $links = Extract-NavLinks $content
    foreach ($href in $links) {
        if ($href.StartsWith('#')) {
            $targetId = $href.Substring(1)
            if (-not (Has-Id $content $targetId)) {
                $broken += [pscustomobject]@{file=$file.FullName;type='anchor';href=$href}
            }
        } else {
            $targetPath = $href.Split('#')[0]
            if ([string]::IsNullOrWhiteSpace($targetPath)) { continue }
            $absPath = Join-Path (Split-Path $file.FullName) $targetPath
            $absPath = [System.IO.Path]::GetFullPath($absPath)
            if (-not (Test-Path $absPath)) {
                $broken += [pscustomobject]@{file=$file.FullName;type='file';href=$href}
            }
        }
    }
}
$broken | ConvertTo-Json -Depth 3 | Out-File -FilePath d:\kotwari\broken_links.json -Encoding UTF8
Write-Output "Broken links written to broken_links.json"
