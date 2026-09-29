$files = @('fmcg.html', 'retail.html', 'dairy.html', 'water.html', 'exports.html', 'index.html')
foreach ($f in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($f)
    $bom = 'UTF-8'
    if ($bytes[0] -eq 0xff -and $bytes[1] -eq 0xfe) { $bom = 'UTF-16 LE' }
    elseif ($bytes[0] -eq 0xef -and $bytes[1] -eq 0xbb) { $bom = 'UTF-8 BOM' }
    $len = $bytes.Length
    Write-Host "$f : $bom ($len bytes)"
}
