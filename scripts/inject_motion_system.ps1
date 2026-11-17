# scripts/inject_motion_system.ps1
# Idempotently injects kotwari-motion.css and kotwari-motion.js across all 52 HTML pages

$files = Get-ChildItem -Path d:\kotwari -Filter "*.html"
$cssTag = '  <link rel="stylesheet" href="kotwari-motion.css">'
$jsTag = '  <script src="kotwari-motion.js"></script>'

$count = 0
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $modified = $false

    # 1. Inject kotwari-motion.css if not present
    if (-not $content.Contains('kotwari-motion.css')) {
        if ($content.Contains('</head>')) {
            $content = $content.Replace('</head>', "$cssTag`n</head>")
            $modified = $true
        }
    }

    # 2. Inject kotwari-motion.js if not present
    if (-not $content.Contains('kotwari-motion.js')) {
        if ($content.Contains('</body>')) {
            $content = $content.Replace('</body>', "$jsTag`n</body>")
            $modified = $true
        }
    }

    if ($modified) {
        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        $count++
        Write-Host "Injected motion system into: $($f.Name)"
    }
}

Write-Host "Total pages updated: $count of $($files.Count)"
