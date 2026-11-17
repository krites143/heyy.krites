# ==============================================================================
# Kotwari International Ltd. - Automated Quality and Regression Test Suite
# Tests: Route validation, HTML semantics, SEO parity, Link health, PDF integrity, Motion assets
# ==============================================================================

Write-Host ""
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host " KOTWARI INTERNATIONAL LTD. - AUTOMATED QA TEST SUITE" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""

$root = "d:\kotwari"
$htmlFiles = Get-ChildItem -Path $root -Filter "*.html" -File
$failures = @()
$warnings = @()

# --- TEST SUITE 1: HTML STRUCTURE & METADATA ---
$pageCount = $htmlFiles.Count
Write-Host "--- TEST SUITE 1: HTML Structure, Metadata and Motion Engine Audit ($pageCount pages) ---" -ForegroundColor Yellow
$passedPages = 0

foreach ($f in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $pageErrors = @()

    if ($content -notmatch '<!DOCTYPE\s+html>') { $pageErrors += "Missing DOCTYPE" }
    if ($content -notmatch '<html\s+lang=') { $pageErrors += "Missing html lang" }
    if ($content -notmatch '<meta\s+charset=') { $pageErrors += "Missing meta charset" }
    if ($content -notmatch '<meta\s+name="viewport"') { $pageErrors += "Missing viewport meta tag" }
    if ($content -notmatch '<title>[^<]+</title>') { $pageErrors += "Missing or empty title" }
    if ($content -notmatch '<meta\s+name="description"') { $pageErrors += "Missing meta description" }
    if ($content -notmatch '<link\s+rel="canonical"') { $pageErrors += "Missing canonical link" }
    if ($content -notmatch 'class="skip-to-content"') { $pageErrors += "Missing accessibility skip link" }
    if ($content -notmatch 'kotwari-search\.js') { $pageErrors += "Missing kotwari-search.js" }
    if ($content -notmatch 'kotwari-consent\.js') { $pageErrors += "Missing kotwari-consent.js" }
    if ($content -notmatch 'kotwari-analytics\.js') { $pageErrors += "Missing kotwari-analytics.js" }
    if ($content -notmatch 'kotwari-motion\.css') { $pageErrors += "Missing kotwari-motion.css" }
    if ($content -notmatch 'kotwari-motion\.js') { $pageErrors += "Missing kotwari-motion.js" }

    if ($pageErrors.Count -gt 0) {
        $failures += ("Page " + $f.Name + ": " + ($pageErrors -join ", "))
        Write-Host "  [FAIL] $($f.Name)" -ForegroundColor Red
    } else {
        $passedPages++
    }
}
Write-Host "  -> $passedPages of $pageCount pages passed complete structure and motion engine audit.`n" -ForegroundColor Green


# --- TEST SUITE 2: INTERNAL LINK HEALTH CHECK ---
Write-Host "--- TEST SUITE 2: Internal Link Health Check ---" -ForegroundColor Yellow
$brokenLinks = @()
$totalLinksChecked = 0

foreach ($f in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $regex = New-Object System.Text.RegularExpressions.Regex('href="([^"]+)"')
    $matches = $regex.Matches($content)

    foreach ($m in $matches) {
        $href = $m.Groups[1].Value.Trim()
        # Skip external, hash-only, mailto, tel, javascript, template variables
        if ($href -match '^(https?://|mailto:|tel:|javascript:|#|\/\/|\$\{)' -or $href.Contains('${') -or [string]::IsNullOrWhiteSpace($href)) {
            continue
        }

        # Strip query params and hash
        $cleanPath = $href.Split('#')[0].Split('?')[0]
        if ([string]::IsNullOrWhiteSpace($cleanPath)) { continue }

        $totalLinksChecked++
        $targetFile = Join-Path $root $cleanPath.Replace('/', '\')

        if (!(Test-Path $targetFile)) {
            $brokenLinks += ($f.Name + " -> " + $href + " (Target not found: " + $targetFile + ")")
        }
    }
}

if ($brokenLinks.Count -gt 0) {
    Write-Host "  [FAIL] Found $($brokenLinks.Count) broken internal links:" -ForegroundColor Red
    $brokenLinks | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
    $failures += $brokenLinks
} else {
    Write-Host "  -> All $totalLinksChecked internal links verified. Zero broken 404 links found!`n" -ForegroundColor Green
}


# --- TEST SUITE 3: DOWNLOADABLE CORPORATE DOCUMENTS CHECK ---
Write-Host "--- TEST SUITE 3: Corporate PDF Downloads Integrity ---" -ForegroundColor Yellow
$pdfDocs = @(
    "docs/kotwari-corporate-profile.pdf",
    "docs/kotwari-export-specifications-2026.pdf",
    "docs/kotwari-quality-safety-charter.pdf",
    "docs/kotwari-farmer-charter.pdf"
)

foreach ($pdf in $pdfDocs) {
    $fullPath = Join-Path $root $pdf.Replace('/', '\')
    if (Test-Path $fullPath) {
        $size = (Get-Item $fullPath).Length
        $header = [System.IO.File]::ReadAllText($fullPath).Substring(0, 8)
        if ($header -eq "%PDF-1.4" -and $size -gt 1000) {
            Write-Host "  [PASS] $pdf ($size bytes, valid PDF 1.4)" -ForegroundColor Green
        } else {
            $failures += "Corrupt or invalid PDF header in $pdf"
            Write-Host "  [FAIL] $pdf (Invalid format)" -ForegroundColor Red
        }
    } else {
        $failures += "Missing PDF document: $pdf"
        Write-Host "  [FAIL] $pdf (File not found)" -ForegroundColor Red
    }
}
Write-Host ""


# --- TEST SUITE 4: SITEMAP AND ROBOTS.TXT AUDIT ---
Write-Host "--- TEST SUITE 4: SEO Indexability and Sitemap Parity ---" -ForegroundColor Yellow
$sitemapPath = Join-Path $root "sitemap.xml"
$robotsPath = Join-Path $root "robots.txt"

if (Test-Path $sitemapPath) {
    $sitemapXml = [xml](Get-Content $sitemapPath)
    $urlCount = $sitemapXml.urlset.url.Count
    Write-Host "  [PASS] sitemap.xml exists with $urlCount indexable URLs" -ForegroundColor Green
} else {
    $failures += "sitemap.xml missing"
    Write-Host "  [FAIL] sitemap.xml not found" -ForegroundColor Red
}

if (Test-Path $robotsPath) {
    $robotsTxt = Get-Content $robotsPath -Raw
    if ($robotsTxt -match 'Sitemap:\s*https://www\.kotwari\.com/sitemap\.xml') {
        Write-Host "  [PASS] robots.txt links correctly to official sitemap" -ForegroundColor Green
    } else {
        $warnings += "robots.txt missing sitemap directive"
        Write-Host "  [WARN] robots.txt missing sitemap link" -ForegroundColor DarkYellow
    }
} else {
    $failures += "robots.txt missing"
    Write-Host "  [FAIL] robots.txt not found" -ForegroundColor Red
}
Write-Host ""


# --- SUMMARY ---
Write-Host "=======================================================" -ForegroundColor Cyan
if ($failures.Count -eq 0) {
    Write-Host " ALL TEST SUITES PASSED (100% HEALTHY & PRODUCTION READY)" -ForegroundColor Green
} else {
    Write-Host " TESTS FAILED: $($failures.Count) errors encountered" -ForegroundColor Red
    $failures | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
}
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""
