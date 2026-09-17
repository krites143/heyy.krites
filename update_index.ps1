# update_index.ps1: Build full 28-product productData() and update categories in index.html

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$indexPath = Join-Path $PSScriptRoot "index.html"
$jsonPath = Join-Path $PSScriptRoot "products_catalog.json"
$catsPath = Join-Path $PSScriptRoot "categories.json"

$productsJson = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)
$products = $productsJson | ConvertFrom-Json

$catsJson = [System.IO.File]::ReadAllText($catsPath, [System.Text.Encoding]::UTF8)
$cats = $catsJson | ConvertFrom-Json

# Helper function to escape JS string
function Escape-JS($str) {
    if (-not $str) { return "" }
    return $str.Replace("\", "\\").Replace("'", "\'").Replace("`r", "").Replace("`n", " ")
}

# Generate categories() function code
$catLines = @()
foreach ($c in $cats) {
    $cId = $c[0]
    $cEn = Escape-JS $c[1]
    $cHi = Escape-JS $c[2]
    $cAr = Escape-JS $c[3]
    $catLines += "  ['$cId', t('$cEn', '$cHi', '$cAr')]"
}
$allCats = $catLines -join ",`n"
$categoriesCode = @"
const categories=()=>[
$allCats
];
"@

# Generate productData() items
$prodItems = @()
foreach ($p in $products) {
    $id = $p.id
    $cat = $p.category
    $page = $p.filename
    $img = $p.primaryImage
    $detailImg = if ($p.galleryImages.Count -gt 1) { $p.galleryImages[1] } else { $p.primaryImage }
    $halal = if ($p.halal) { "true" } else { "false" }

    $nameEn = Escape-JS $p.name
    $nameHi = Escape-JS $p.nameHi
    $nameAr = Escape-JS $p.nameAr

    $subEn = Escape-JS $p.subtitle
    $subHi = Escape-JS $p.subtitle
    $subAr = Escape-JS $p.subtitle

    $descEn = Escape-JS $p.desc
    $descHi = Escape-JS $p.desc
    $descAr = Escape-JS $p.desc

    $badgeEn = Escape-JS $p.badge

    $tagItems = @()
    foreach ($tg in $p.tags) {
        $tgEsc = Escape-JS $tg
        $tagItems += "t('$tgEsc','$tgEsc','$tgEsc')"
    }
    $tagsArray = $tagItems -join ","

    $packsEn = Escape-JS $p.packs

    $item = @"
{
  category:'$cat',
  id:'$id',
  page:'$page',
  name:t('$nameEn','$nameHi','$nameAr'),
  sub:t('$subEn','$subHi','$subAr'),
  desc:t('$descEn','$descHi','$descAr'),
  img:'$img',
  detailImg:'$detailImg',
  badge:t('$badgeEn','$badgeEn','$badgeEn'),
  tags:[$tagsArray],
  packs:t('$packsEn','$packsEn','$packsEn'),
  halal:$halal
}
"@
    $prodItems += $item
}

$allProdItems = $prodItems -join ",`n"
$productDataCode = @"
const productData=()=>[
$allProdItems
];
"@

# New renderProducts() code with dedicated page links
$renderProductsCode = @"
function renderProducts(){
  const allProds=productData();
  const rows=allProds.filter(p=>selectedCategory==='all'||p.category===selectedCategory);
  $('#product-grid').innerHTML=rows.map(p=>{
    const origIdx=allProds.indexOf(p);
    const catObj=categories().find(c=>c[0]===p.category);
    const catLabel=catObj?catObj[1]:p.category;
    const mediaHtml=p.img?`
      <a class="product-media" href="` + p.page + `" title="` + t('View details for ','विवरण देखें: ','عرض تفاصيل ') + escapeHTML(p.name) + `">
        ` + (p.badge?`<span class="product-badge-overlay">✦ ` + p.badge + `</span>`:'') + `
        <img src="` + encodeURI(p.img) + `" alt="` + escapeHTML(p.name) + `" loading="lazy">
        <span class="product-zoom-hint">👁 ` + t('View Details →','विवरण देखें →','عرض التفاصيل ←') + `</span>
      </a>`:`
      <a class="product-media" href="` + p.page + `" style="background:linear-gradient(135deg,#092840,#123f62);display:flex;align-items:center;justify-content:center;color:#dfbf83;font-size:2.2rem">
        ` + (p.badge?`<span class="product-badge-overlay">✦ ` + p.badge + `</span>`:'') + `
        <span>🌾</span>
      </a>`;
    const specsHtml=(p.tags&&p.tags.length)?`
      <div class="product-specs">
        ` + p.tags.slice(0,3).map(tag=>`<span>` + tag + `</span>`).join('') + `
      </div>`:'';
    const packsHtml=p.packs?`
      <div class="product-packs">
        <span>📦 <strong>` + t('Packs','पैक','العبوات') + `:</strong> ` + p.packs + `</span>
      </div>`:'';
    return `
      <article class="card product">
        ` + mediaHtml + `
        <div class="product-body">
          <div class="product-top">
            <span class="product-cat">` + catLabel + `</span>
            ` + (p.halal?`<span class="product-halal">✓ ` + t('Halal Certified','हलाल प्रमाणित','حلال معتمد') + `</span>`:'') + `
          </div>
          <h3><a href="` + p.page + `" style="color:var(--navy);text-decoration:none">` + p.name + `</a></h3>
          ` + (p.sub?`<div class="product-sub">` + p.sub + `</div>`:'') + `
          <p class="product-desc">` + p.desc + `</p>
          ` + specsHtml + `
          ` + packsHtml + `
          <div class="product-actions">
            <a class="btn" href="` + p.page + `">` + t('View Details →','पूरा विवरण देखें →','عرض التفاصيل ←') + `</a>
            <a class="btn outline" href="#partners" data-role="Distributor" data-product="` + escapeHTML(p.name) + `" title="` + t('Direct Enquiry','सीधी पूछताछ','استفسار مباشر') + `">✉</a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}
"@

# Read index.html
$indexContent = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)

# Replace categories() and productData()
$patternCatProd = 'const categories=\(\)=>\[[\s\S]*?const roles=\(\)=>\['
$replacementCatProd = "$categoriesCode`n$productDataCode`nconst roles=()=>["

if ($indexContent -match $patternCatProd) {
    $indexContent = [regex]::Replace($indexContent, $patternCatProd, $replacementCatProd)
    Write-Host "Replaced categories() and productData() successfully."
} else {
    Write-Error "Could not find categories() to roles() block."
}

# Replace renderProducts()
$patternRenderProd = 'function renderProducts\(\)\{[\s\S]*?function openProductModal\(idx\)\{'
$replacementRenderProd = "$renderProductsCode`nfunction openProductModal(idx){"

if ($indexContent -match $patternRenderProd) {
    $indexContent = [regex]::Replace($indexContent, $patternRenderProd, $replacementRenderProd)
    Write-Host "Replaced renderProducts() successfully."
} else {
    Write-Error "Could not find renderProducts() block."
}

# Write back
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($indexPath, $indexContent, $utf8NoBom)
Write-Host "index.html updated successfully with clean UTF-8!"
