$b = [System.IO.File]::ReadAllBytes('d:\kotwari\kotwari_eagle_transparent.png')
$w = [System.BitConverter]::ToInt32(@($b[19], $b[18], $b[17], $b[16]), 0)
$h = [System.BitConverter]::ToInt32(@($b[23], $b[22], $b[21], $b[20]), 0)
Write-Host " Dimensions: $w x $h\
Remove-Item 'test_dim.ps1'
