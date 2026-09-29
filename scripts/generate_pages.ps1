$rootDir = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$jsonPath = Join-Path $PSScriptRoot "products_catalog.json"
if (-not (Test-Path $jsonPath)) {
    $jsonPath = Join-Path $rootDir "products_catalog.json"
}
$products = Get-Content -Path $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

Write-Host "Found $($products.Count) products to generate into $rootDir."

foreach ($p in $products) {
    $filename = $p.filename
    $outPath = Join-Path $rootDir $filename

    # Build gallery thumbnails HTML
    $thumbsHtml = ""
    if ($p.galleryImages.Count -gt 1) {
        $thumbsList = ""
        $idx = 0
        foreach ($img in $p.galleryImages) {
            $activeClass = if ($idx -eq 0) { "active" } else { "" }
            $thumbsList += @"
            <button type="button" class="thumb-btn $activeClass" data-img="$img" onclick="switchImage('$img', this)">
                <img src="$img" alt="$($p.name) thumbnail $($idx + 1)" loading="lazy">
            </button>
"@
            $idx++
        }
        $thumbsHtml = @"
        <div class="gallery-thumbs">
            $thumbsList
        </div>
"@
    }

    # Build Specs HTML
    $specsRows = ""
    $p.specs.psobject.properties | ForEach-Object {
        $specsRows += @"
        <tr>
            <th>$($_.Name)</th>
            <td>$($_.Value)</td>
        </tr>
"@
    }

    # Build Tags HTML
    $tagsHtml = ""
    foreach ($tg in $p.tags) {
        $tagsHtml += "<span class='spec-pill'>$tg</span>"
    }

    # Build Related Products
    $relatedList = $products | Where-Object { $_.id -ne $p.id -and ($_.category -eq $p.category -or $_.brand -eq $p.brand) } | Select-Object -First 3
    if (-not $relatedList -or $relatedList.Count -lt 3) {
        $relatedList = $products | Where-Object { $_.id -ne $p.id } | Select-Object -First 3
    }
    $relatedCards = ""
    foreach ($rel in $relatedList) {
        $relCards = @"
        <a class="related-card" href="$($rel.filename)">
            <div class="related-img-wrap">
                <img src="$($rel.primaryImage)" alt="$($rel.name)" loading="lazy">
            </div>
            <div class="related-body">
                <span class="related-brand">$($rel.brand)</span>
                <h4>$($rel.name)</h4>
                <p class="related-sub">$($rel.subtitle)</p>
                <span class="btn-sm">View Details &rarr;</span>
            </div>
        </a>
"@
        $relatedCards += $relCards
    }

    $waMessage = [System.Uri]::EscapeDataString("Hello Kotwari, I am interested in distributorship / wholesale order for $($p.name). Please share product specifications, MOQ, and trade pricing.")
    $waLink = "https://wa.me/919978648583?text=$waMessage"
    $mailSub = [System.Uri]::EscapeDataString("Trade Enquiry: $($p.name)")
    $mailLink = "mailto:kotwarigroup18@gmail.com?subject=$mailSub"

    # Category-based background banner
    $bannerImage = switch ($p.category) {
        "eggs"    { "products/kotwari-eggs-logistics-truck-banner.jpeg" }
        "dairy"   { "products/kotwari-dairy-lassi-dahi-range-banner.jpeg" }
        "spices"  { "products/kotwari-spices-haldi-harvest-banner.jpeg" }
        "staples" { "products/kotwari-spices-haldi-harvest-banner.jpeg" }
        "snacks"  { "products/kotwari-snacks-namkeen-range-banner-1.jpeg" }
        "pickles" { "products/kotwari-spices-chilli-haldi-banner.jpeg" }
        "oils"    { "products/kotwari-oils-mustard-oil-1l-banner.jpeg" }
        "water"   { "products/kooa-mineral-water-300ml-showcase.jpeg" }
        default   { "products/kotwari-eggs-logistics-truck-banner.jpeg" }
    }

    # Category-based hub link
    $categoryHubLink = switch ($p.category) {
        "eggs"    { "eggs.html" }
        "dairy"   { "dairy.html" }
        "water"   { "water.html" }
        default   { "fmcg.html" }
    }

    $html = @"
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#092840">
<title>$($p.name) | $($p.brand) &mdash; Kotwari International</title>
<meta name="description" content="$($p.desc.Substring(0, [Math]::Min(155, $p.desc.Length)))">
<link rel="canonical" href="https://www.kotwari.com/$($p.filename)">

<!-- Open Graph & Social Cards -->
<meta property="og:type" content="product">
<meta property="og:site_name" content="Kotwari International">
<meta property="og:title" content="$($p.name) | $($p.brand) &mdash; Kotwari International">
<meta property="og:description" content="$($p.desc.Substring(0, [Math]::Min(155, $p.desc.Length)))">
<meta property="og:url" content="https://www.kotwari.com/$($p.filename)">
<meta property="og:image" content="https://www.kotwari.com/$($p.primaryImage)">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="$($p.name) | $($p.brand)">
<meta name="twitter:description" content="$($p.desc.Substring(0, [Math]::Min(155, $p.desc.Length)))">
<meta name="twitter:image" content="https://www.kotwari.com/$($p.primaryImage)">

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Schema.org JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "$($p.name)",
  "image": "https://www.kotwari.com/$($p.primaryImage)",
  "description": "$($p.desc.Replace('"', '\"'))",
  "brand": {
    "@type": "Brand",
    "name": "$($p.brand)"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Kotwari International Ltd."
    }
  }
}
</script>

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<style>
:root{--navy:#092840;--blue:#123f62;--gold:#bc944f;--gold-light:#dfbf83;--ivory:#faf8f1;--ink:#183143;--muted:#596977;--line:#dedfd9;--white:#fff;--radius:16px}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--ivory);color:var(--ink);font:16px/1.7 'Plus Jakarta Sans',Arial,sans-serif}
h1,h2,h3,h4{font-family:'Playfair Display',Georgia,serif;font-weight:600;line-height:1.2}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
.wrap{width:min(1180px,calc(100% - 48px));margin:auto}

/* Topbar */
.topbar{background:var(--navy);color:#d9e3e8;font-size:.78rem;padding:7px 0}
.topbar .wrap{display:flex;justify-content:space-between;gap:16px}

/* Header */
header{position:sticky;top:0;z-index:30;background:rgba(250,248,241,.98);border-bottom:1px solid var(--line);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:background .3s ease,box-shadow .3s ease,border-color .3s ease}
.header-row{display:flex;align-items:center;justify-content:space-between;min-height:96px;gap:20px;transition:min-height .3s ease}
header.scrolled{background:rgba(250,248,241,.94);border-bottom:1px solid rgba(188,148,79,.35);box-shadow:0 8px 25px rgba(9,40,64,.06);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
header.scrolled .header-row{min-height:86px}
.brand{display:inline-flex;flex-direction:column;align-items:center;text-align:center;text-decoration:none;position:relative;padding:4px 0;color:inherit;transition:transform .2s ease}
.brand-emblem-img{width:48px;height:auto;display:block;margin:0 auto -8px;filter:drop-shadow(0 2px 5px rgba(188,148,79,.35));transition:transform .3s ease}
.brand:hover .brand-emblem-img{transform:translateY(-2px) scale(1.06)}
.brand-name{font:2.05rem/1 'Playfair Display',Georgia,serif;color:var(--ink);letter-spacing:-.035em;display:inline-flex;align-items:baseline}
.brand-name sup{font-size:10px;vertical-align:top;margin-left:2px;font-family:'Plus Jakarta Sans',Arial,sans-serif;color:#8b682b;font-weight:600}
.brand-tag{display:block;font:8.5px 'Plus Jakarta Sans',Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#8b682b;margin-top:3px;font-weight:700}
footer .brand, .footer-grid .brand{display:inline-flex !important;flex-direction:column !important;align-items:flex-start !important;text-align:start !important;text-decoration:none !important;padding:0 !important;margin-bottom:14px !important}
footer .brand .brand-emblem-img, .footer-grid .brand .brand-emblem-img{width:46px !important;height:auto !important;display:block !important;margin:0 0 6px 0 !important;filter:drop-shadow(0 2px 6px rgba(188,148,79,.35)) !important;transition:transform .3s ease !important}
footer .brand:hover .brand-emblem-img, .footer-grid .brand:hover .brand-emblem-img{transform:translateY(-2px) scale(1.04) !important}
footer .brand .brand-name, .footer-grid .brand .brand-name{display:block !important;font-family:'Playfair Display',Georgia,serif !important;font-size:1.95rem !important;line-height:1.1 !important;color:#ffffff !important;letter-spacing:-0.02em !important;font-weight:700 !important}
footer .brand .brand-name sup, .footer-grid .brand .brand-name sup{color:#dfbf83 !important;font-size:0.45em !important;margin-left:2px !important;vertical-align:super !important;font-weight:600 !important}
footer .brand .brand-tag, .footer-grid .brand .brand-tag{display:block !important;font-family:'Plus Jakarta Sans',Arial,sans-serif !important;font-size:8.5px !important;letter-spacing:0.22em !important;text-transform:uppercase !important;color:#dfbf83 !important;margin-top:4px !important;font-weight:700 !important}
.header-nav{display:flex;align-items:center;gap:20px;font-size:.88rem}
.header-nav a:hover{color:var(--gold)}
.btn-nav{padding:8px 16px;border:1px solid var(--navy);border-radius:4px;background:var(--navy);color:#fff;font-weight:bold;font-size:.82rem;transition:all .2s ease}
.btn-nav:hover{background:var(--blue);transform:translateY(-1px);box-shadow:0 4px 12px rgba(9,40,64,.2)}
.btn-home{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border:1.5px solid var(--gold);border-radius:4px;background:#fdfcf9;color:var(--navy);font-weight:bold;font-size:.84rem;text-decoration:none;transition:all .2s ease;box-shadow:0 2px 6px rgba(188,148,79,.12)}
.btn-home:hover{background:var(--gold);color:#092840;transform:translateY(-1px);box-shadow:0 4px 12px rgba(188,148,79,.3)}

/* Mobile Nav Toggle */
.mobile-nav-toggle{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;z-index:40}
.mobile-nav-toggle span{display:block;width:24px;height:2.5px;background:var(--navy);border-radius:2px;transition:0.3s ease}

/* Breadcrumbs */
.breadcrumbs{padding:16px 0;font-size:.84rem;color:var(--muted);border-bottom:1px solid var(--line)}
.breadcrumbs a{color:var(--muted)}
.breadcrumbs a:hover{color:var(--navy);text-decoration:underline}
.breadcrumbs span{margin:0 8px;color:#abb7bf}
.breadcrumbs .current{color:var(--navy);font-weight:600}

/* Product Main Section */
.product-hero{padding:44px 0 68px}
.product-layout{display:grid;grid-template-columns:1.05fr 1fr;gap:52px;align-items:start}

/* Left: Gallery */
.gallery-wrap{position:sticky;top:100px}
.main-img-box{position:relative;background:#fff;border:1px solid var(--line);border-radius:20px;padding:24px;box-shadow:0 12px 35px rgba(9,40,64,.06);text-align:center;overflow:hidden;min-height:420px;display:flex;align-items:center;justify-content:center;cursor:zoom-in}
.main-img-box img{max-height:460px;width:auto;max-width:100%;object-fit:contain;transition:transform .3s ease;border-radius:12px}
.main-img-box:hover img{transform:scale(1.03)}
.badge-overlay{position:absolute;top:18px;left:18px;background:rgba(9,40,64,.92);backdrop-filter:blur(6px);color:var(--gold-light);font-size:.74rem;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;padding:6px 14px;border-radius:20px;border:1px solid rgba(223,191,131,.4);box-shadow:0 4px 14px rgba(0,0,0,.25)}
.halal-badge{position:absolute;top:18px;right:18px;background:#edfaf4;color:#1e7e34;font-size:.74rem;font-weight:bold;padding:5px 12px;border-radius:16px;border:1px solid #b7e4c7;display:inline-flex;align-items:center;gap:4px}
.zoom-hint{position:absolute;bottom:14px;right:14px;background:rgba(255,255,255,.9);border:1px solid var(--line);color:var(--navy);font-size:.72rem;font-weight:600;padding:4px 10px;border-radius:20px;pointer-events:none}
.gallery-thumbs{display:flex;gap:12px;margin-top:16px;overflow-x:auto;padding-bottom:6px}
.thumb-btn{border:2px solid var(--line);background:#fff;border-radius:12px;padding:6px;width:78px;height:78px;cursor:pointer;flex-shrink:0;transition:all .2s ease;overflow:hidden;display:flex;align-items:center;justify-content:center}
.thumb-btn img{width:100%;height:100%;object-fit:cover;border-radius:6px}
.thumb-btn.active,.thumb-btn:hover{border-color:var(--gold);transform:translateY(-2px);box-shadow:0 4px 12px rgba(188,148,79,.25)}

/* Right: Product Info */
.info-eyebrow{font-size:.82rem;font-weight:bold;letter-spacing:.16em;text-transform:uppercase;color:#8b682b;display:flex;align-items:center;gap:10px;margin-bottom:12px}
.info-eyebrow .brand-pill{background:#092840;color:var(--gold-light);padding:3px 10px;border-radius:12px;font-size:.72rem}
.product-title{font-size:clamp(2rem,3.5vw,2.9rem);color:var(--navy);margin-bottom:8px;line-height:1.15}
.product-sub{font-size:1.05rem;color:var(--muted);font-style:italic;margin-bottom:20px}
.product-desc{font-size:.98rem;color:#334756;line-height:1.75;margin-bottom:26px}

.spec-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px}
.spec-pill{padding:5px 12px;background:#fff;border:1px solid var(--line);border-radius:20px;font-size:.78rem;color:#4f606e;font-weight:500}

.packs-box{background:#fcf8ee;border:1.5px solid #ebdcb7;border-radius:12px;padding:16px 20px;margin-bottom:28px}
.packs-box h4{font-size:.88rem;color:#7a602e;text-transform:uppercase;letter-spacing:.08em;font-weight:bold;margin-bottom:6px;font-family:'Plus Jakarta Sans',Arial,sans-serif}
.packs-box p{color:#4a3a19;font-weight:600;font-size:1rem}

/* Specs Table */
.specs-table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden;margin-bottom:32px}
.specs-table tr{border-bottom:1px solid #f0f0eb}
.specs-table tr:last-child{border-bottom:none}
.specs-table th{background:#faf9f5;text-align:left;padding:12px 18px;font-size:.85rem;color:#556677;font-weight:600;width:34%;border-right:1px solid #f0f0eb}
.specs-table td{padding:12px 18px;font-size:.9rem;color:#183143}

/* Action Buttons */
.cta-group{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:20px}
.btn-primary{flex:1;min-width:220px;display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:14px 24px;background:#25D366;color:#fff;font-weight:bold;border-radius:6px;font-size:.95rem;transition:.2s;box-shadow:0 4px 15px rgba(37,211,102,.3)}
.btn-primary:hover{background:#1ebe5b;transform:translateY(-2px)}
.btn-secondary{flex:1;min-width:200px;display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:14px 22px;background:var(--navy);color:#fff;font-weight:bold;border-radius:6px;font-size:.95rem;transition:.2s}
.btn-secondary:hover{background:var(--blue);transform:translateY(-2px)}
.back-link{display:inline-flex;align-items:center;gap:6px;font-size:.88rem;color:var(--muted);font-weight:600;margin-top:14px}
.back-link:hover{color:var(--navy);text-decoration:underline}

/* Assurance Strip */
.assurance-strip{background:#092840;color:#fff;padding:48px 0;margin-top:40px}
.assurance-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center}
.assurance-item{padding:10px}
.assurance-icon{font-size:2.2rem;margin-bottom:12px;color:var(--gold-light)}
.assurance-item h4{font-size:1.15rem;color:#fff;margin-bottom:6px}
.assurance-item p{font-size:.82rem;color:#bdcbd5;line-height:1.5}

/* Related Products */
.related-section{padding:64px 0;background:#eeede5}
.related-title{font-size:1.8rem;color:var(--navy);margin-bottom:24px}
.related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.related-card{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;transition:all .25s ease;display:flex;flex-direction:column}
.related-card:hover{transform:translateY(-5px);border-color:var(--gold);box-shadow:0 14px 35px rgba(9,40,64,.08)}
.related-img-wrap{height:200px;background:#f4f6f8;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:16px}
.related-img-wrap img{max-height:100%;max-width:100%;object-fit:contain;transition:transform .3s ease}
.related-card:hover .related-img-wrap img{transform:scale(1.05)}
.related-body{padding:20px;display:flex;flex-direction:column;flex:1}
.related-brand{font-size:.72rem;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;color:#8b682b;margin-bottom:6px}
.related-body h4{font-size:1.2rem;color:var(--navy);margin-bottom:6px}
.related-sub{font-size:.82rem;color:var(--muted);margin-bottom:14px;flex:1;font-style:italic}
.btn-sm{font-size:.82rem;font-weight:bold;color:var(--navy);align-self:flex-start}

/* Lightbox Modal */
.img-modal{display:none;position:fixed;inset:0;background:rgba(9,40,64,.88);backdrop-filter:blur(8px);z-index:100;align-items:center;justify-content:center;padding:24px}
.img-modal.is-open{display:flex}
.img-modal-content{position:relative;max-width:90vw;max-height:90vh;background:#fff;border-radius:16px;padding:24px;box-shadow:0 20px 50px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center}
.img-modal-content img{max-height:80vh;max-width:85vw;object-fit:contain;border-radius:8px}
.modal-close{position:absolute;top:10px;right:14px;font-size:2rem;line-height:1;background:none;border:none;color:var(--navy);cursor:pointer;padding:4px 8px;font-weight:bold}

/* Footer */
footer{padding:54px 0 25px;background:#062034;color:#d2dce4}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px}
.footer-grid h3{color:#e2c58d;font-size:1rem;margin-bottom:12px}
.footer-grid a{display:block;font-size:.9rem;color:#a3b8c2;margin-bottom:8px}
.footer-grid a:hover{color:#fff}
.footer-bottom{border-top:1px solid #334c5d;margin-top:35px;padding-top:22px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;font-size:.8rem}
.footer-bottom a{color:#dfbf83}

@media(max-width:900px){
  .mobile-nav-toggle{display:flex}
  .header-nav{display:none;position:absolute;top:100%;left:0;right:0;background:#ffffff;border-bottom:2px solid var(--gold);box-shadow:0 12px 30px rgba(9,40,64,.15);flex-direction:column;padding:20px;gap:12px;align-items:stretch;z-index:35}
  .header-nav.is-open{display:flex}
  .header-nav a{padding:10px 14px;border-radius:6px;background:rgba(9,40,64,.03);color:var(--navy);font-weight:600}
  .header-nav a:hover{background:var(--navy);color:#fff}
  .header-nav .btn-nav{text-align:center;background:var(--navy);color:#fff;margin-top:4px}
  .header-nav .btn-home{background:#fdfcf9;border:1.5px solid var(--gold)}
  .header-row{flex-wrap:nowrap}
  .product-layout{grid-template-columns:1fr;gap:36px}
  .gallery-wrap{position:static}
  .assurance-grid{grid-template-columns:1fr 1fr}
  .related-grid{grid-template-columns:1fr}
  .footer-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:560px){
  .wrap{width:calc(100% - 32px)}
  .header-row{gap:10px;min-height:80px}
  .brand{padding:3px 0}
  .brand-emblem-img{width:36px;margin-bottom:2px}
  .brand-name{font-size:1.6rem}
  .brand-tag{font-size:7px;letter-spacing:.16em;margin-top:2px}
  .assurance-grid{grid-template-columns:1fr}
  .footer-grid{grid-template-columns:1fr}
  .cta-group{flex-direction:column}
}

/* Scroll Reveal Animations */
.reveal{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);will-change:opacity,transform}
.reveal.is-visible{opacity:1;transform:translateY(0)}
.reveal-stagger>*{opacity:0;transform:translateY(20px);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)}
.reveal-stagger.is-visible>*{opacity:1;transform:translateY(0)}
.reveal-stagger.is-visible>*:nth-child(1){transition-delay:.04s}
.reveal-stagger.is-visible>*:nth-child(2){transition-delay:.1s}
.reveal-stagger.is-visible>*:nth-child(3){transition-delay:.16s}
.reveal-stagger.is-visible>*:nth-child(4){transition-delay:.22s}
@media(prefers-reduced-motion:reduce){
  *,*:before,*:after{animation:none!important;transition:none!important}
  .reveal,.reveal-stagger>*{opacity:1!important;transform:none!important}
}
</style>
</head>
<body>

<div class="topbar">
  <div class="wrap">
    <span>KOTWARI INTERNATIONAL LTD. &mdash; Gao Se Global Tak</span>
    <span>Authentic Rural &amp; Gourmet Indian Foods</span>
  </div>
</div>

<header>
  <div class="wrap header-row">
    <a class="brand" href="index.html">
      <img class="brand-emblem-img" src="kotwari_emblem_new.png" alt="Kotwari Golden Emblem">
      <span class="brand-name">Kotwari<sup>&trade;</sup></span>
      <small class="brand-tag">Gao Se Global Tak</small>
    </a>
    <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Toggle Navigation Menu" aria-expanded="false" onclick="toggleNav()">
      <span></span><span></span><span></span>
    </button>
    <nav class="header-nav" id="mainNav">
      <a class="btn-home" href="index.html">&#8962; Home</a>
      <a href="fmcg.html">FMCG</a>
      <a href="dairy.html">Dairy</a>
      <a href="water.html">Water</a>
      <a href="eggs.html">Eggs</a>
      <a href="exports.html">Exports</a>
      <a href="contact.html">Contact</a>
      <a class="btn-nav" href="$waLink" target="_blank" rel="noopener noreferrer">Order Inquiry &#x2197;</a>
    </nav>
  </div>
</header>

<div class="breadcrumbs">
  <div class="wrap">
    <a href="index.html" style="font-weight:bold;color:var(--navy)">&#8962; Home</a>
    <span>/</span>
    <a href="$categoryHubLink">$($p.categoryLabel)</a>
    <span>/</span>
    <span class="current">$($p.name)</span>
  </div>
</div>

<main>
  <section class="product-hero reveal">
    <div class="wrap product-layout">
      
      <!-- Left Column: Gallery & Image Preview -->
      <div class="gallery-wrap">
        <div class="main-img-box" onclick="openModal()" title="Click to enlarge image">
          <span class="badge-overlay">&#10022; $($p.badge)</span>
          $(if ($p.halal) { '<span class="halal-badge">&#10003; Halal Certified</span>' })
          <img id="mainImage" src="$($p.primaryImage)" alt="$($p.name) showcase image">
          <span class="zoom-hint">&#128269; Click to zoom</span>
        </div>
        $thumbsHtml
      </div>

      <!-- Right Column: Details, Specs, Inquiry -->
      <div class="product-info">
        <div class="info-eyebrow">
          <span class="brand-pill">$($p.brand)</span>
          <span>$($p.categoryLabel)</span>
        </div>
        
        <h1 class="product-title">$($p.name)</h1>
        <p class="product-sub">$($p.subtitle)</p>
        
        <p class="product-desc">$($p.desc)</p>

        <div class="spec-tags">
          $tagsHtml
        </div>

        <div class="packs-box">
          <h4>Available Pack Sizes &amp; Formats</h4>
          <p>&#128230; $($p.packs)</p>
        </div>

        <table class="specs-table">
          <tbody>
            $specsRows
          </tbody>
        </table>

        <div class="cta-group">
          <a class="btn-primary" href="$waLink" target="_blank" rel="noopener noreferrer">
            <span>&#128241; Enquire via WhatsApp</span>
          </a>
          <a class="btn-secondary" href="$mailLink">
            <span>&#9993; Institutional &amp; Export</span>
          </a>
        </div>

        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-top:20px">
          <a class="btn-home" href="index.html">&#8962; Go to Home Page</a>
          <a class="back-link" href="$categoryHubLink" style="margin-top:0">&larr; Back to $($p.categoryLabel)</a>
        </div>
      </div>

    </div>
  </section>

  <!-- Quality Assurance Strip -->
  <section class="assurance-strip" style="background: linear-gradient(rgba(9,40,64,0.91), rgba(9,40,64,0.91)), url('$bannerImage') center/cover no-repeat">
    <div class="wrap assurance-grid reveal-stagger">
      <div class="assurance-item">
        <div class="assurance-icon">&#127806;</div>
        <h4>Farmer Integrated</h4>
        <p>Direct sourcing from verified village farmer groups &amp; FPOs with fair compensation.</p>
      </div>
      <div class="assurance-item">
        <div class="assurance-icon">&#128300;</div>
        <h4>Quality Tested</h4>
        <p>Multi-stage lab testing for zero adulteration, high potency, and absolute purity.</p>
      </div>
      <div class="assurance-item">
        <div class="assurance-icon">&#128737;</div>
        <h4>Hygienic Packaging</h4>
        <p>Aroma-lock, tamper-evident food-grade containers engineered for global freshness.</p>
      </div>
      <div class="assurance-item">
        <div class="assurance-icon">&#127757;</div>
        <h4>Gao Se Global Tak</h4>
        <p>Traditional Indian recipes and purity standards prepared for discerning global palates.</p>
      </div>
    </div>
  </section>

  <!-- Related Products Section -->
  <section class="related-section reveal">
    <div class="wrap">
      <h3 class="related-title">More from Kotwari &amp; KooA</h3>
      <div class="related-grid reveal-stagger">
        $relatedCards
      </div>
    </div>
  </section>
</main>

<!-- Lightbox Modal -->
<div id="imageModal" class="img-modal" onclick="closeModal(event)">
  <div class="img-modal-content">
    <button class="modal-close" onclick="closeModal(event)" aria-label="Close Preview">&times;</button>
    <img id="modalImg" src="" alt="Product Large Preview">
  </div>
</div>

<footer>
  <div class="wrap reveal">
    <div class="footer-grid">
      <div>
        <a class="brand" href="index.html">
          <img class="brand-emblem-img" src="kotwari_emblem_new.png" alt="Kotwari Golden Emblem">
          <span class="brand-name">Kotwari<sup>&trade;</sup></span>
          <small class="brand-tag">Gao Se Global Tak</small>
        </a>
        <p style="margin-top:14px;font-size:.85rem;color:#a3b8c2">
          Kotwari International Ltd.<br>
          Kotwari House, Jankipuram-III<br>
          Kursi Road, Lucknow &ndash; 226021<br>
          Uttar Pradesh, India
        </p>
      </div>
      <div>
        <h3>Businesses</h3>
        <a href="eggs.html">Kotwari Eggs</a>
        <a href="water.html">KooA Water</a>
        <a href="dairy.html">Kotwari Dairy</a>
        <a href="fmcg.html">Kotwari FMCG</a>
        <a href="retail.html">Kotwari One</a>
        <a href="exports.html">Kotwari Global</a>
      </div>
      <div>
        <h3>Corporate</h3>
        <a href="investors.html">Investors</a>
        <a href="sustainability.html">Sustainability</a>
        <a href="careers.html">Careers</a>
        <a href="contact.html">Contact</a>
        <a href="privacy.html">Privacy Policy</a>
        <a href="terms.html">Terms</a>
      </div>
      <div>
        <h3>Direct Contact</h3>
        <a href="tel:+919978648583">+91 99786 48583</a>
        <a href="mailto:kotwarigroup18@gmail.com">kotwarigroup18@gmail.com</a>
        <a href="https://www.kotwari.com">www.kotwari.com</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 Kotwari International Ltd. All rights reserved.</span>
      <span style="display:flex;gap:16px">
        <a href="privacy.html">Privacy</a>
        <a href="terms.html">Terms</a>
        <a href="cookie-policy.html">Cookies</a>
      </span>
    </div>
  </div>
</footer>

<script>
function switchImage(src, btn) {
  var main = document.getElementById('mainImage');
  if (main) {
    main.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    main.style.opacity = '0.3';
    main.style.transform = 'scale(0.97)';
    setTimeout(function(){
      main.src = src;
      main.style.opacity = '1';
      main.style.transform = 'scale(1)';
    }, 150);
  }
  var buttons = document.querySelectorAll('.thumb-btn');
  buttons.forEach(function(b){ b.classList.remove('active'); });
  if (btn) { btn.classList.add('active'); }
}

function openModal() {
  var main = document.getElementById('mainImage');
  var modal = document.getElementById('imageModal');
  var mImg = document.getElementById('modalImg');
  if (main && modal && mImg) {
    mImg.src = main.src;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(e) {
  if (!e || e.target.id === 'imageModal' || e.target.classList.contains('modal-close')) {
    var modal = document.getElementById('imageModal');
    if (modal) { modal.classList.remove('is-open'); }
    document.body.style.overflow = '';
  }
}

function toggleNav() {
  var nav = document.getElementById('mainNav');
  var btn = document.getElementById('mobileNavToggle');
  if (nav && btn) {
    var isOpen = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen);
  }
}

window.addEventListener('scroll', function() {
  var h = document.querySelector('header');
  if (h) {
    if (window.scrollY > 40) {
      h.classList.add('scrolled');
    } else {
      h.classList.remove('scrolled');
    }
  }
}, { passive: true });

function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries, o) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          o.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.12 });
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){ obs.observe(el); });
  } else {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){ el.classList.add('is-visible'); });
  }
}
document.addEventListener('DOMContentLoaded', initScrollReveal);
initScrollReveal();
</script>

</body>
</html>
"@

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($outPath, $html, $utf8NoBom)
    Write-Host "Generated: $filename"
}

Write-Host "Done generating all 28 product pages with clean UTF-8 encoding, mobile drawer, Google Fonts, and lightbox preview!"
