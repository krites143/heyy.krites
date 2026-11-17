# scripts/fix_main_landmarks.ps1
$pages = @("careers.html", "exports.html", "investors.html", "news.html", "sustainability.html", "water.html")

foreach ($p in $pages) {
    $fullPath = "d:\kotwari\$p"
    $content = [System.IO.File]::ReadAllText($fullPath, [System.Text.Encoding]::UTF8)

    if (-not $content.Contains('id="main"')) {
        # 1. Add <main id="main"> after </header>
        if ($content.Contains('</header>')) {
            $content = $content.Replace('</header>', "</header>`n`n  <main id=""main"">")
        }

        # 2. Add </main> before <footer>
        if ($content.Contains('<!-- Footer -->')) {
            $content = $content.Replace('<!-- Footer -->', "</main>`n`n  <!-- Footer -->")
        } elseif ($content.Contains('<!-- Site Footer -->')) {
            $content = $content.Replace('<!-- Site Footer -->', "</main>`n`n  <!-- Site Footer -->")
        } elseif ($content.Contains('<footer>')) {
            $content = $content.Replace('<footer>', "</main>`n`n<footer>")
        }

        [System.IO.File]::WriteAllText($fullPath, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed <main id='main'> landmark in: $p"
    }
}
