$catalogPath = "scripts/products_catalog.json"
$jsonText = [System.IO.File]::ReadAllText($catalogPath, [System.Text.Encoding]::UTF8)
$catalog = $jsonText | ConvertFrom-Json

# Helper to check array contains
function Add-GalleryImage($prod, $img) {
    $current = @($prod.galleryImages)
    if ($current -notcontains $img) {
        $prod.galleryImages = $current + @($img)
        Write-Host "Added $img to $($prod.id) gallery"
    }
}

# 1. Update kooa-mineral-water
$kooaWater = $catalog | Where-Object { $_.id -eq 'kooa-mineral-water' }
if ($kooaWater) {
    Add-GalleryImage $kooaWater "products/kooa-mineral-water-250ml-handheld.jpeg"
    Add-GalleryImage $kooaWater "products/kooa-mineral-water-lawn-outdoor.jpeg"
    $kooaWater.packs = "200ml · 250ml Handheld · 300ml · 500ml · 1 Litre Premium Bottles"
    Write-Host "Updated kooa-mineral-water"
}

# 2. Update kotwari-himalayan-haldi
$haldi = $catalog | Where-Object { $_.id -eq 'kotwari-himalayan-haldi' }
if ($haldi) {
    Add-GalleryImage $haldi "products/kotwari-spices-himalayan-haldi-canister.jpeg"
    $haldi.packs = "100g Pouch · 200g Glass Jar · 100g Metal Tin · 500g Arabian Collection Canister"
    Write-Host "Updated kotwari-himalayan-haldi"
}

# 3. Update kotwari-garam-masala
$garamMasala = $catalog | Where-Object { $_.id -eq 'kotwari-garam-masala' }
if ($garamMasala) {
    Add-GalleryImage $garamMasala "products/kotwari-spices-garam-masala-arabian-canister.jpeg"
    $garamMasala.packs = "100g Pouch · 200g Glass Jar · 500g Arabian Collection Canister"
    Write-Host "Updated kotwari-garam-masala"
}

# 4. Update kotwari-mithla-makhana
$makhana = $catalog | Where-Object { $_.id -eq 'kotwari-mithla-makhana' }
if ($makhana) {
    $makhana.primaryImage = "products/kotwari-snacks-methali-makhana-200g-box-showcase.jpeg"
    Add-GalleryImage $makhana "products/kotwari-snacks-methali-makhana-200g-box-showcase.jpeg"
    Add-GalleryImage $makhana "products/kotwari-snacks-methali-makhana-200g-box-front-back.jpeg"
    $makhana.packs = "100g Airtight Pouch · 200g Retail Box · 200g Glass/Pet Jar"
    Write-Host "Updated kotwari-mithla-makhana"
}

# 5. Add kotwari-potato-finger-sticks if not exists
if (-not ($catalog | Where-Object { $_.id -eq 'kotwari-potato-finger-sticks' })) {
    $newP1 = [PSCustomObject]@{
        id = "kotwari-potato-finger-sticks"
        filename = "product-kotwari-potato-finger-sticks.html"
        name = "Kotwari Potato Finger Sticks (Arabian Collection)"
        nameHi = "Kotwari पोटैटो फिंगर स्टिक्स (अरेबियन कलेक्शन)"
        nameAr = "أصابع البطاطس كوتواري الممتازة (المجموعة العربية)"
        brand = "Kotwari"
        category = "snacks"
        categoryLabel = "Snacks & Namkeen"
        categoryLabelHi = "स्नैक्स एवं नमकीन"
        subtitle = "Crispy Golden Potato Fries with Aromatic Herbs & Sea Salt · Arabian Canister"
        desc = "Kotwari Potato Finger Sticks from the exclusive Arabian Collection are crafted from 100% real farm potatoes, cut into crisp gourmet finger sticks, and delicately seasoned with aromatic herbs and pure spices. Free from artificial colours and chemical preservatives, packed into an airtight luxury gold canister for enduring freshness, crunch, and authentic international flavor."
        primaryImage = "products/kotwari-snacks-potato-finger-sticks-canister.jpeg"
        galleryImages = @("products/kotwari-snacks-potato-finger-sticks-canister.jpeg")
        badge = "Arabian Collection"
        tags = @("100% Real Potatoes", "No Artificial Colour", "No Preservatives", "Arabian Luxury Canister", "Halal Certified")
        packs = "150g Luxury Canister · 250g Canister · Export Bulk Pack"
        specs = [PSCustomObject]@{
            "Brand" = "Kotwari Snacks (A Global Indian Company)"
            "Origin" = "Selected Potato Cultivation Farms, India"
            "Packaging" = "Airtight Gold Embossed Metal Canister with Pull-Ring Seal"
            "Shelf Life" = "9 Months from Packaging"
            "Storage" = "Store in a cool, dry place away from direct sunlight"
            "Certification" = "FSSAI / Halal Certified / Export Grade"
        }
        halal = $true
        status = "New Launch"
    }
    $catalog += $newP1
    Write-Host "Added kotwari-potato-finger-sticks"
}

# 6. Add kotwari-mix-fruits-juice if not exists
if (-not ($catalog | Where-Object { $_.id -eq 'kotwari-mix-fruits-juice' })) {
    $newP2 = [PSCustomObject]@{
        id = "kotwari-mix-fruits-juice"
        filename = "product-kotwari-mix-fruits-juice.html"
        name = "Kotwari Premium Mix Fruits Juice"
        nameHi = "Kotwari प्रीमियम मिक्स फ्रूट्स जूस"
        nameAr = "عصير الفواكه المشكلة الفاخر كوتواري"
        brand = "Kotwari"
        category = "beverages"
        categoryLabel = "Beverages & Juices"
        categoryLabelHi = "पेय एवं ताजे जूस"
        subtitle = "Natural Orchard Blend of Mango, Banana, Papaya, Apple, Guava, Orange & Pineapple"
        desc = "Kotwari Premium Mix Fruits Juice is a revitalizing nectar pressed from seven sun-ripened orchard fruits: Mango, Banana, Papaya, Apple, Guava, Orange, and Pineapple. Formulated under the motto 'Kisan ka Sathi, Har Ghar ka Sathi', it delivers 100% natural fruit goodness, rich vitamins, natural energy, and zero artificial colors or synthetic flavorings. Available in convenient travel packs, bottles, and family-sized aseptic cartons."
        primaryImage = "products/kotwari-beverages-mix-fruits-juice-range.jpeg"
        galleryImages = @(
            "products/kotwari-beverages-mix-fruits-juice-range.jpeg",
            "products/kotwari-beverages-mix-fruits-juice-orchard-display.jpeg"
        )
        badge = "100% Natural Fruits"
        tags = @("7 Orchard Fruits Blend", "No Artificial Colour", "No Artificial Flavour", "Natural Energy", "Halal Certified")
        packs = "200ml Slim Carton · 300ml Bottle · 500ml Bottle · 1 Litre Tetra Pak"
        specs = [PSCustomObject]@{
            "Brand" = "Kotwari Beverages (Gao Se Global Tak)"
            "Origin" = "Direct Integrated Farmer Orchards, India"
            "Packaging" = "Aseptic Gable-Top Tetra Pak / Food-Grade Recyclable PET Bottle"
            "Shelf Life" = "6 Months from Packaging"
            "Storage" = "Store in a cool dry place. Shake well and refrigerate after opening."
            "Certification" = "FSSAI / Halal / Lab-Tested Quality"
        }
        halal = $true
        status = "New Launch"
    }
    $catalog += $newP2
    Write-Host "Added kotwari-mix-fruits-juice"
}

# 7. Add kotwari-mix-fruit-milk-dryfruits-juice if not exists
if (-not ($catalog | Where-Object { $_.id -eq 'kotwari-mix-fruit-milk-dryfruits-juice' })) {
    $newP3 = [PSCustomObject]@{
        id = "kotwari-mix-fruit-milk-dryfruits-juice"
        filename = "product-kotwari-mix-fruit-milk-dryfruits-juice.html"
        name = "Kotwari Premium Mix Fruit, Milk & Dry Fruits Juice"
        nameHi = "Kotwari मिक्स फ्रूट, मिल्क एवं ड्राई फ्रूट्स जूस"
        nameAr = "عصير الفواكه المشكلة مع الحليب والمكسرات الفاخر كوتواري"
        brand = "Kotwari"
        category = "beverages"
        categoryLabel = "Nutri-Beverages & Dairy"
        categoryLabelHi = "पौष्टिक पेय एवं डेयरी"
        subtitle = "Nourishing Power Shake with Real Fruits, Pure Milk, Almonds, Cashews, Dates & Walnuts"
        desc = "A revolutionary nutritional beverage combining farm-fresh whole milk, luscious orchard fruits (Mango, Banana, Apple, Orange, Papaya), and super-premium dry fruits (Dates, Almonds, Cashews, Pistachios, and Walnuts). Engineered for 'Energy, Immunity, and Strength', this traditional homemade-inspired recipe provides natural stamina, muscle nourishment, and unforgettable taste without artificial additives."
        primaryImage = "products/kotwari-beverages-mix-fruit-milk-dryfruits-juice-showcase.jpeg"
        galleryImages = @(
            "products/kotwari-beverages-mix-fruit-milk-dryfruits-juice-showcase.jpeg",
            "products/kotwari-beverages-mix-fruit-milk-dryfruits-juice-farmstead.jpeg",
            "products/kotwari-beverages-mix-fruit-milk-dryfruits-juice-green-edition.jpeg"
        )
        badge = "Energy · Immunity · Strength"
        tags = @("Pure Fresh Milk", "5 Rich Dry Fruits", "Real Fruit Pulp", "Home Made Recipe", "Lab Tested Quality")
        packs = "200ml Slim Pack · 300ml Bottle · 500ml Bottle · 1 Litre Aseptic Carton"
        specs = [PSCustomObject]@{
            "Brand" = "Kotwari Nutri-Beverages (Kisan ka Sathi, Har Ghar ka Sathi)"
            "Origin" = "Direct Village Dairy & Fruit Cooperatives, India"
            "Packaging" = "Aseptic Multi-Layer Brick Carton & Tamper-Evident Bottle"
            "Shelf Life" = "6 Months from Packaging"
            "Storage" = "Keep in a cool dry place. Consume chilled. Shake well before drinking."
            "Certification" = "FSSAI Certified / Halal / Lab-Tested Purity"
        }
        halal = $true
        status = "New Launch"
    }
    $catalog += $newP3
    Write-Host "Added kotwari-mix-fruit-milk-dryfruits-juice"
}

# Save updated JSON
$updatedJson = $catalog | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($catalogPath, $updatedJson, [System.Text.Encoding]::UTF8)
Write-Host "Saved updated catalog. Total products: $($catalog.Count)"
