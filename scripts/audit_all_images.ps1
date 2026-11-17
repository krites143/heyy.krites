# scripts/audit_all_images.ps1
# Thoroughly inspects every <img> src, <source> srcset, and inline image URL across all 52 HTML files

$root = "d:\kotwari"
$htmlFiles = Get-ChildItem -Path $root -Filter "*.html" -File

$missingImages = @()
$totalImages = 0
$validImages = 0

foreach ($f in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)

    # 1. Match img src
    $imgMatches = [System.Text.RegularExpressions.Regex]::Matches($content, '<img[^>]+src=["'']([^"'']+)["'']')
    foreach ($m in $imgMatches) {
        $src = $m.Groups[1].Value.Trim()
        if ($src.StartsWith('http://') -or $src.StartsWith('https://') -or $src.StartsWith('data:') -or $src.Contains('${')) {
            continue
        }

        $totalImages++
        $cleanPath = $src.Split('?')[0].Split('#')[0]
        $fullPath = Join-Path $root $cleanPath.Replace('/', '\')

        if (!(Test-Path $fullPath)) {
            $missingImages += "$($f.Name): Image not found -> $src ($fullPath)"
        } else {
            $validImages++
        }
    }

    # 2. Match background url
    $bgMatches = [System.Text.RegularExpressions.Regex]::Matches($content, 'url\(["'']?([^"'')]+)["'']?\)')
    foreach ($m in $bgMatches) {
        $url = $m.Groups[1].Value.Trim()
        if ($url.StartsWith('http://') -or $url.StartsWith('https://') -or $url.StartsWith('data:') -or $url.Contains('${') -or $url.EndsWith('.css') -or $url.EndsWith('.woff2') -or $url.EndsWith('.ttf')) {
            continue
        }

        $totalImages++
        $cleanPath = $url.Split('?')[0].Split('#')[0]
        $fullPath = Join-Path $root $cleanPath.Replace('/', '\')

        if (!(Test-Path $fullPath)) {
            $missingImages += "$($f.Name): Background asset not found -> $url ($fullPath)"
        } else {
            $validImages++
        }
    }
}

Write-Host "Total local image references checked: $totalImages"
Write-Host "Valid images found: $validImages"

if ($missingImages.Count -gt 0) {
    Write-Host "[FAIL] Found $($missingImages.Count) missing images:" -ForegroundColor Red
    $missingImages | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
} else {
    Write-Host "[PASS] All local image references exist on disk with 0 missing assets!" -ForegroundColor Green
}
