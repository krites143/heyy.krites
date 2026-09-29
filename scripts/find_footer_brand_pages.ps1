$files = Get-ChildItem -Filter '*.html'
$hasFooterBrand = @()
$noFooterBrand = @()
foreach ($f in $files) {
    if ($f.Name -match '^test_') { continue }
    $c = Get-Content $f.FullName -Raw -Encoding UTF8
    if ($c -match '<footer[^>]*>[\s\S]*?class="brand"') {
        $hasFooterBrand += $f.Name
    } else {
        $noFooterBrand += $f.Name
    }
}
Write-Host "PAGES WITH FOOTER BRAND LOGO (" $hasFooterBrand.Count "):"
$hasFooterBrand | ForEach-Object { Write-Host "  $_" }
Write-Host "`nPAGES WITHOUT FOOTER BRAND LOGO (" $noFooterBrand.Count "):"
$noFooterBrand | ForEach-Object { Write-Host "  $_" }
