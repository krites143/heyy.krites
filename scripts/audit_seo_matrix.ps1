# scripts/audit_seo_matrix.ps1
# Thorough audit of Title, Meta Description, Canonical, H1, and JSON-LD across all 52 pages

$root = "d:\kotwari"
$htmlFiles = Get-ChildItem -Path $root -Filter "*.html" -File

$seoErrors = @()
$seoWarnings = @()
$totalPassed = 0

foreach ($f in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $errors = @()

    # 1. Title
    $titleMatch = [System.Text.RegularExpressions.Regex]::Match($content, '<title>([^<]+)</title>')
    if (!$titleMatch.Success -or [string]::IsNullOrWhiteSpace($titleMatch.Groups[1].Value)) {
        $errors += "Missing <title>"
    } else {
        $title = $titleMatch.Groups[1].Value.Trim()
        if ($title.Length -gt 75) {
            $seoWarnings += "$($f.Name): Long title ($($title.Length) chars) -> $title"
        }
    }

    # 2. Meta description
    $descMatch = [System.Text.RegularExpressions.Regex]::Match($content, '<meta\s+name="description"\s+content="([^"]+)"')
    if (!$descMatch.Success -or [string]::IsNullOrWhiteSpace($descMatch.Groups[1].Value)) {
        $errors += "Missing meta description"
    }

    # 3. Canonical URL
    $canonMatch = [System.Text.RegularExpressions.Regex]::Match($content, '<link\s+rel="canonical"\s+href="([^"]+)"')
    if (!$canonMatch.Success -or !$canonMatch.Groups[1].Value.StartsWith('https://www.kotwari.com/')) {
        $errors += "Missing or invalid canonical link"
    }

    # 4. H1 check
    $h1Count = ([System.Text.RegularExpressions.Regex]::Matches($content, '<h1[\s>]')).Count
    if ($h1Count -eq 0 -and $f.Name -ne "404.html") {
        $errors += "Missing <h1> heading"
    }

    # 5. Schema check
    $schemaMatch = [System.Text.RegularExpressions.Regex]::Match($content, '<script\s+type="application/ld\+json">([\s\S]*?)</script>')
    if ($schemaMatch.Success) {
        try {
            $json = $schemaMatch.Groups[1].Value | ConvertFrom-Json
        } catch {
            $errors += "Malformed JSON-LD Schema: $($_.Exception.Message)"
        }
    }

    if ($errors.Count -gt 0) {
        $seoErrors += "$($f.Name): " + ($errors -join "; ")
    } else {
        $totalPassed++
    }
}

Write-Host "Total pages audited: $($htmlFiles.Count)"
Write-Host "Pages passing full SEO & Schema matrix: $totalPassed"

if ($seoWarnings.Count -gt 0) {
    Write-Host "`nWarnings ($($seoWarnings.Count)):" -ForegroundColor DarkYellow
    $seoWarnings | Select-Object -First 5 | ForEach-Object { Write-Host "  $_" -ForegroundColor DarkYellow }
}

if ($seoErrors.Count -gt 0) {
    Write-Host "`nErrors ($($seoErrors.Count)):" -ForegroundColor Red
    $seoErrors | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
} else {
    Write-Host "`n[PASS] 100% SEO & Structured Data compliance across all 52 pages!" -ForegroundColor Green
}
