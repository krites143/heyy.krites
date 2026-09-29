$rootDir = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$catalogPath = Join-Path $PSScriptRoot "products_catalog.json"
$newProdsPath = Join-Path $PSScriptRoot "new_products.json"

$catalog = Get-Content -Path $catalogPath -Raw -Encoding UTF8 | ConvertFrom-Json
$newProds = Get-Content -Path $newProdsPath -Raw -Encoding UTF8 | ConvertFrom-Json

# Helper to add image if missing
function Add-GalleryImg($item, $img) {
    $imgs = [System.Collections.ArrayList]@($item.galleryImages)
    if (-not $imgs.Contains($img)) {
        [void]$imgs.Add($img)
        $item.galleryImages = $imgs.ToArray()
        Write-Host "Added $img to $($item.id) gallery"
    }
}

# 1. kooa-mineral-water
$kooa = $catalog | Where-Object { $_.id -eq 'kooa-mineral-water' }
if ($kooa) {
    Add-GalleryImg $kooa "products/kooa-mineral-water-250ml-handheld.jpeg"
    Add-GalleryImg $kooa "products/kooa-mineral-water-lawn-outdoor.jpeg"
    $kooa.packs = "200ml · 250ml Handheld · 300ml · 500ml · 1 Litre Premium Bottles"
    Write-Host "Updated kooa-mineral-water"
}

# 2. kotwari-himalayan-haldi
$haldi = $catalog | Where-Object { $_.id -eq 'kotwari-himalayan-haldi' }
if ($haldi) {
    Add-GalleryImg $haldi "products/kotwari-spices-himalayan-haldi-canister.jpeg"
    $haldi.packs = "100g Pouch · 200g Glass Jar · 100g Metal Tin · 500g Arabian Collection Canister"
    Write-Host "Updated kotwari-himalayan-haldi"
}

# 3. kotwari-garam-masala
$garam = $catalog | Where-Object { $_.id -eq 'kotwari-garam-masala' }
if ($garam) {
    Add-GalleryImg $garam "products/kotwari-spices-garam-masala-arabian-canister.jpeg"
    $garam.packs = "100g Pouch · 200g Glass Jar · 500g Arabian Collection Canister"
    Write-Host "Updated kotwari-garam-masala"
}

# 4. kotwari-mithla-makhana
$makhana = $catalog | Where-Object { $_.id -eq 'kotwari-mithla-makhana' }
if ($makhana) {
    $makhana.primaryImage = "products/kotwari-snacks-methali-makhana-200g-box-showcase.jpeg"
    Add-GalleryImg $makhana "products/kotwari-snacks-methali-makhana-200g-box-showcase.jpeg"
    Add-GalleryImg $makhana "products/kotwari-snacks-methali-makhana-200g-box-front-back.jpeg"
    $makhana.packs = "100g Airtight Pouch · 200g Retail Box · 200g Glass/Pet Jar"
    Write-Host "Updated kotwari-mithla-makhana"
}

# 5. Add new products
$catalogList = [System.Collections.ArrayList]@($catalog)
foreach ($np in $newProds) {
    $exists = $catalog | Where-Object { $_.id -eq $np.id }
    if (-not $exists) {
        [void]$catalogList.Add($np)
        Write-Host "Appended new product: $($np.id) ($($np.name))"
    } else {
        Write-Host "Product $($np.id) already in catalog"
    }
}

$updatedJson = $catalogList | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($catalogPath, $updatedJson, [System.Text.Encoding]::UTF8)
Write-Host "Successfully wrote catalog with $($catalogList.Count) products to $catalogPath"
