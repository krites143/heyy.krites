$map = [ordered]@{
    'WhatsApp Image 2026-09-24 at 11.45.09 AM 2.jpeg' = 'kotwari-spices-himalayan-haldi-canister.jpeg'
    'WhatsApp Image 2026-09-24 at 11.45.09 AM.jpeg'   = 'kotwari-spices-garam-masala-arabian-canister.jpeg'
    'WhatsApp Image 2026-09-24 at 11.45.09 AM3.jpeg'  = 'kotwari-snacks-potato-finger-sticks-canister.jpeg'
    'WhatsApp Image 2026-09-29 at 5.13.52 PM 6.jpeg'  = 'kotwari-beverages-mix-fruits-juice-range.jpeg'
    'WhatsApp Image 2026-09-29 at 5.13.52 PM4.jpeg'   = 'kotwari-beverages-mix-fruit-milk-dryfruits-juice-showcase.jpeg'
    'WhatsApp Image 2026-09-29 at 5.13.52 PM5.jpeg'   = 'kotwari-beverages-mix-fruits-juice-orchard-display.jpeg'
    'WhatsApp Image 2026-09-29 at 5.13.52 PM7.jpeg'   = 'kotwari-beverages-mix-fruit-milk-dryfruits-juice-farmstead.jpeg'
    'WhatsApp Image 2026-09-29 at 5.13.53 PM8.jpeg'   = 'kotwari-beverages-mix-fruit-milk-dryfruits-juice-green-edition.jpeg'
    'WhatsApp Image 2026-09-29 at 5.15.53 PM9.jpeg'   = 'kotwari-snacks-methali-makhana-200g-box-front-back.jpeg'
    'WhatsApp Image 2026-09-29 at 5.15.54 PM 10.jpeg' = 'kooa-mineral-water-lawn-outdoor.jpeg'
    'WhatsApp Image 2026-09-29 at 5.15.54 PM9.jpeg'   = 'kotwari-snacks-methali-makhana-200g-box-showcase.jpeg'
    'WhatsApp Image 2026-09-29 at 5.16.43 PM12.jpeg'  = 'kooa-mineral-water-250ml-handheld.jpeg'
}

$rootDir = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$newDir = Join-Path $rootDir "new"
$productsDir = Join-Path $rootDir "products"

$count = 0
foreach ($src in $map.Keys) {
    $srcPath = Join-Path $newDir $src
    $dstName = $map[$src]
    $dstPath = Join-Path $productsDir $dstName
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $dstPath -Force
        $len = (Get-Item $dstPath).Length
        Write-Host "COPIED: $src -> $dstName ($len bytes)"
        $count++
    } else {
        Write-Error "SOURCE NOT FOUND: $srcPath"
    }
}
Write-Host "Successfully processed $count of $($map.Count) images into $productsDir."
