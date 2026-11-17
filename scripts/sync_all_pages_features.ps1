$files = Get-ChildItem -Path 'd:\kotwari\*.html' -File

$updatedCount = 0

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $modified = $false

    # 1. Add kotwari-search.css and kotwari-consent.css if missing
    if ($content -notmatch 'kotwari-search\.css') {
        if ($content -match '<link\s+rel="stylesheet"\s+href="glass-dropdown\.css">') {
            $content = $content -replace '<link\s+rel="stylesheet"\s+href="glass-dropdown\.css">', "<link rel=`"stylesheet`" href=`"glass-dropdown.css`">`n  <link rel=`"stylesheet`" href=`"kotwari-search.css`">`n  <link rel=`"stylesheet`" href=`"kotwari-consent.css`">"
            $modified = $true
        } elseif ($content -match '</head>') {
            $content = $content -replace '</head>', "  <link rel=`"stylesheet`" href=`"kotwari-search.css`">`n  <link rel=`"stylesheet`" href=`"kotwari-consent.css`">`n</head>"
            $modified = $true
        }
    }

    # 2. Add kotwari-search.js and kotwari-consent.js before </body> if missing
    if ($content -notmatch 'kotwari-search\.js') {
        if ($content -match '<script\s+src="kotwari-lang\.js"></script>') {
            $content = $content -replace '<script\s+src="kotwari-lang\.js"></script>', "<script src=`"kotwari-search.js`"></script>`n<script src=`"kotwari-consent.js`"></script>`n<script src=`"kotwari-lang.js`"></script>"
            $modified = $true
        } elseif ($content -match '<script\s+src="glass-dropdown\.js"></script>') {
            $content = $content -replace '<script\s+src="glass-dropdown\.js"></script>', "<script src=`"kotwari-search.js`"></script>`n<script src=`"kotwari-consent.js`"></script>`n<script src=`"glass-dropdown.js`"></script>"
            $modified = $true
        } elseif ($content -match '</body>') {
            $content = $content -replace '</body>', "<script src=`"kotwari-search.js`"></script>`n<script src=`"kotwari-consent.js`"></script>`n</body>"
            $modified = $true
        }
    }

    # 3. Ensure News and Careers exist in footers
    if ($content -match '<footer>' -and $content -notmatch 'news\.html') {
        if ($content -match 'href="about\.html"') {
            $content = $content -replace 'href="about\.html"', 'href="about.html">About</a> | <a href="news.html">News</a> | <a href="careers.html'
            $modified = $true
        }
    }

    if ($modified) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $updatedCount++
    }
}

Write-Output "Successfully inspected $($files.Count) pages. Updated: $updatedCount pages."
