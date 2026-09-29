$files = Get-ChildItem -Filter '*.html'
$missingReveal = @()
$missingBackToTop = @()

foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw
    if ($c -notmatch 'class="[^"]*reveal') {
        $missingReveal += $f.Name
    }
    if ($c -notmatch 'backToTop') {
        $missingBackToTop += $f.Name
    }
}

Write-Output "=== Missing Scroll Reveal ($($missingReveal.Count)) ==="
$missingReveal | ForEach-Object { Write-Output "  - $_" }

Write-Output "`n=== Missing Back-To-Top Button ($($missingBackToTop.Count)) ==="
$missingBackToTop | ForEach-Object { Write-Output "  - $_" }
