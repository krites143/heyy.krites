# scripts/update_about_chain.ps1
$path = 'd:\kotwari\about.html'
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

$oldPattern = @'
  function showChainNode(idx, btn){
    var d = chainData[idx];
    if(!d) return;

    document.getElementById('chainStep').textContent = d.step;
    document.getElementById('chainTitle').textContent = d.title;
    document.getElementById('chainIcon').textContent = d.icon;
    document.getElementById('chainDesc').textContent = d.desc;

    var pContainer = document.getElementById('chainPills');
    pContainer.innerHTML = '';
    d.pills.forEach(function(p){
      var sp = document.createElement('span');
      sp.style.cssText = 'background:rgba(255,255,255,0.1);color:white;padding:4px 12px;border-radius:20px;font-size:.78rem;border:1px solid rgba(255,255,255,0.2)';
      sp.textContent = p;
      pContainer.appendChild(sp);
    });

    var buttons = document.querySelectorAll('.chain-btn');
    buttons.forEach(function(b){
      b.style.background = 'rgba(255,255,255,0.12)';
      b.style.color = 'white';
      b.style.border = '1px solid rgba(255,255,255,0.25)';
    });
    if(btn){
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--navy)';
      btn.style.border = 'none';
    }
  }
'@

$newPattern = @'
  function showChainNode(idx, btn){
    var d = chainData[idx];
    if(!d) return;

    var card = document.getElementById('chainDisplayCard');
    if (card) {
      card.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
      card.style.opacity = '0.35';
      card.style.transform = 'translateY(6px)';
    }

    setTimeout(function() {
      document.getElementById('chainStep').textContent = d.step;
      document.getElementById('chainTitle').textContent = d.title;
      document.getElementById('chainIcon').textContent = d.icon;
      document.getElementById('chainDesc').textContent = d.desc;

      var pContainer = document.getElementById('chainPills');
      pContainer.innerHTML = '';
      d.pills.forEach(function(p){
        var sp = document.createElement('span');
        sp.style.cssText = 'background:rgba(255,255,255,0.1);color:white;padding:4px 12px;border-radius:20px;font-size:.78rem;border:1px solid rgba(255,255,255,0.2)';
        sp.textContent = p;
        pContainer.appendChild(sp);
      });

      if (card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    }, 150);

    var buttons = document.querySelectorAll('.chain-btn');
    buttons.forEach(function(b){
      b.style.background = 'rgba(255,255,255,0.12)';
      b.style.color = 'white';
      b.style.border = '1px solid rgba(255,255,255,0.25)';
    });
    if(btn){
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--navy)';
      btn.style.border = 'none';
    }
  }
'@

# Normalize line endings to match file
if ($content.Contains("`r`n")) {
    $oldPattern = $oldPattern.Replace("`n", "`r`n")
    $newPattern = $newPattern.Replace("`n", "`r`n")
} else {
    $oldPattern = $oldPattern.Replace("`r`n", "`n")
    $newPattern = $newPattern.Replace("`r`n", "`n")
}

if ($content.Contains($oldPattern)) {
    $content = $content.Replace($oldPattern, $newPattern)
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated about.html chain transition successfully."
} else {
    Write-Host "Pattern not matched in about.html."
}
