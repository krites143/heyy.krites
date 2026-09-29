# scripts/update_reveal_blur.ps1
# Upgrades .reveal and .reveal-stagger across all HTML files to Cinematic Soft-Blur In

$newReveal = '.reveal{opacity:0;filter:blur(8px);transform:translateY(28px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1),filter .85s cubic-bezier(.16,1,.3,1);will-change:opacity,transform,filter}'
$newRevealVisible = '.reveal.is-visible{opacity:1;filter:blur(0);transform:translateY(0)}'

$newStagger = '.reveal-stagger>*{opacity:0;filter:blur(6px);transform:translateY(24px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1),filter .75s cubic-bezier(.16,1,.3,1);will-change:opacity,transform,filter}'
$newStaggerVisible = '.reveal-stagger.is-visible>*{opacity:1;filter:blur(0);transform:translateY(0)}'

$files = Get-ChildItem -Path . -Filter *.html | Where-Object { -not $_.Name.StartsWith('product-') -and $_.Name -ne 'index.html' }

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    
    if (-not $content.Contains('.reveal{opacity:0;filter:blur(8px)')) {
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\.reveal\s*\{\s*opacity\s*:\s*0\s*;\s*transform\s*:\s*translateY\(\d+px\)[^}]*\}', $newReveal)
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\.reveal\.is-visible\s*\{\s*opacity\s*:\s*1\s*;\s*transform\s*:\s*translateY\(0\)\s*\}', $newRevealVisible)
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\.reveal-stagger\s*>\s*\*\s*\{\s*opacity\s*:\s*0\s*;\s*transform\s*:\s*translateY\(\d+px\)[^}]*\}', $newStagger)
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\.reveal-stagger\.is-visible\s*>\s*\*\s*\{\s*opacity\s*:\s*1\s*;\s*transform\s*:\s*translateY\(0\)\s*\}', $newStaggerVisible)

        [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Upgraded to Soft-Blur In: $($f.Name)"
    }
}
