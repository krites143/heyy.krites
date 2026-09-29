$html = Get-Content fmcg.html -Raw -Encoding UTF8
$matches = [regex]::Matches($html, '(?ms)<h[23][^>]*>(.*?)</h[23]>')
foreach ($m in $matches) {
    $clean = $m.Groups[1].Value -replace '<[^>]+>', ''
    Write-Host $clean.Trim()
}
