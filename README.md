# Kotwari International Website Architecture

This repository contains the official corporate and e-commerce website for **Kotwari International Ltd.** (*"Gao Se Global Tak"*).

---

## 📁 Directory Structure

```
d:\kotwari\
├── assets/                       # Static media and brand assets
│   ├── audio/                    # Background story audio & media
│   │   ├── music.mp3
│   │   └── music.mp4
│   ├── brand/                    # Logos, emblems, and corporate marks
│   │   ├── kotwari_emblem_new.png
│   │   ├── kotwari_logo_gold.png
│   │   ├── kotwari_eagle_transparent.png
│   │   └── ...
│   └── icons/                    # Favicons, apple touch icons, chrome badges
│       ├── favicon.svg
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       └── apple-touch-icon.png
├── docs/                         # Project documentation and catalog inventories
│   ├── PRODUCT_INVENTORY.md      # Full 28-product master inventory & image map
│   └── Pasted markdown.md        # Original business specifications
├── products/                     # 70 High-resolution product package photographs
│   ├── kooa-mineral-water-*.jpeg
│   ├── kotwari-dairy-*.jpeg
│   ├── kotwari-spices-*.jpeg
│   └── ...
├── scripts/                      # Build automation & data sources
│   ├── generate_pages.ps1        # PowerShell script to rebuild all 28 product pages
│   └── products_catalog.json     # Master JSON dataset (specs, tags, descriptions)
├── index.html                    # Main trilingual corporate hub & live catalog
├── dairy.html                    # Kotwari Dairy business hub
├── water.html                    # KooA Mineral Water brand portal
├── eggs.html                     # Kotwari Eggs business portal
├── fmcg.html                     # Kotwari FMCG catalog overview
├── retail.html                   # Kotwari One hypermarket concept
├── exports.html                  # Kotwari Global export hub
├── farmers.html                  # Farmer & FPO network portal
├── partners.html                 # Partner & distributor enquiry form
├── investors.html                # Investor relations & governance
├── sustainability.html           # ESG, farmer welfare & impact
├── careers.html                  # Career opportunities & departments
├── contact.html                  # Corporate contact & Lucknow headquarters
├── product-*.html                # 28 Individual dedicated product specification pages
├── sitemap.xml                   # Search engine sitemap with canonical URLs
├── robots.txt                    # Search crawler indexing rules
└── site.webmanifest              # PWA manifest & mobile app metadata
```

---

## 🚀 How to Rebuild Product Pages

If you add new products or update specifications in `scripts/products_catalog.json`, regenerate the product HTML pages with:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/generate_pages.ps1
```

All 28 product pages will be compiled and updated with the latest brand lockup, responsive galleries, specification tables, Halal badges, and WhatsApp/Email inquiry routing.
