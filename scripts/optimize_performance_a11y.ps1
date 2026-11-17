$files = Get-ChildItem -Path 'd:\kotwari\*.html' -File
$updatedCount = 0

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $modified = $false

    # 1. Enforce display=swap in Google fonts
    if ($content -match 'fonts\.googleapis\.com/css2\?[^"]+' -and $content -notmatch 'display=swap') {
        $content = [System.Text.RegularExpressions.Regex]::Replace(
            $content,
            '(fonts\.googleapis\.com/css2\?[^"]+)',
            '$1&display=swap'
        )
        $modified = $true
    }

    # 2. Add skip to main content link if missing
    if ($content -notmatch 'class="skip-to-content"' -and $content -match '<body>') {
        $content = $content.Replace('<body>', "<body>`n<a href=`"#main`" class=`"skip-to-content`">Skip to main content</a>")
        $modified = $true
    }

    # 3. Add width="44" height="44" to brand-emblem-img to eliminate layout shifts if missing
    if ($content -match 'class="brand-emblem-img"\s+src="kotwari_emblem_new\.png"\s+alt="[^"]*">' -and $content -notmatch 'class="brand-emblem-img"[^>]*width=') {
        $content = [System.Text.RegularExpressions.Regex]::Replace(
            $content,
            'class="brand-emblem-img"\s+src="kotwari_emblem_new\.png"\s+alt="([^"]*)"',
            'class="brand-emblem-img" src="kotwari_emblem_new.png" alt="$1" width="44" height="44"'
        )
        $modified = $true
    }

    # 4. Ensure non-hero images have loading="lazy" decoding="async"
    # We match <img ...> that doesn't have loading= and isn't the hero image
    $pattern = '(?i)<img(?![^>]*\bloading=)(?![^>]*hero-photo)(?![^>]*hero-emblem)([^>]*?)>'
    if ($content -match $pattern) {
        $content = [System.Text.RegularExpressions.Regex]::Replace(
            $content,
            $pattern,
            '<img$1 loading="lazy" decoding="async">'
        )
        $modified = $true
    }

    # 5. Ensure <main> has id="main" for the skip link
    if ($content -match '<main>' -and $content -notmatch '<main id="main">') {
        $content = $content.Replace('<main>', '<main id="main">')
        $modified = $true
    }

    if ($modified) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $updatedCount++
    }
}

Write-Output "Performance & Accessibility optimizations applied to $updatedCount of $($files.Count) pages."
