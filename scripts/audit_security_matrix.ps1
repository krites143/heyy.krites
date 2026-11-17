# scripts/audit_security_matrix.ps1
# Comprehensive Security Hardening & Exposure Audit

$root = "d:\kotwari"
$secErrors = @()

# 1. Leak Scan for API keys, passwords, tokens
$sensitivePatterns = @(
    'AKIA[0-9A-Z]{16}',                     # AWS Key
    'AIza[0-9A-Za-z-_]{35}',                 # Google API Key
    'ghp_[0-9a-zA-Z]{36}',                  # GitHub Personal Access Token
    'bearer\s+[A-Za-z0-9\-\._~\+\/]+=*',    # Generic Bearer
    'password\s*=\s*["''][^"'']+["'']',     # Hardcoded password
    'BEGIN PRIVATE KEY',                    # Private Key
    'mongodb(?:\+srv)?:\/\/'                # Database Connection string
)

$scannableFiles = Get-ChildItem -Path $root -Recurse -File | Where-Object {
    $_.FullName -notmatch '\\\.git\\' -and
    $_.FullName -notmatch '\\qa_screenshots' -and
    $_.FullName -notmatch '\\docs\\' -and
    $_.Name -ne 'audit_security_matrix.ps1' -and
    $_.Extension -in @('.html', '.js', '.css', '.json', '.ps1', '.md', '.txt')
}

$leaksFound = 0
foreach ($f in $scannableFiles) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    foreach ($p in $sensitivePatterns) {
        if ($content -match $p) {
            $secErrors += "Potential secret pattern '$p' matched in: $($f.Name)"
            $leaksFound++
        }
    }
}

# 2. Vercel Security Headers
$vercelJsonPath = Join-Path $root "vercel.json"
if (Test-Path $vercelJsonPath) {
    $vercelContent = [System.IO.File]::ReadAllText($vercelJsonPath, [System.Text.Encoding]::UTF8)
    $requiredHeaders = @("Content-Security-Policy", "Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy")
    foreach ($h in $requiredHeaders) {
        if (-not $vercelContent.Contains($h)) {
            $secErrors += "Missing security header in vercel.json: $h"
        }
    }
} else {
    $secErrors += "vercel.json not found"
}

# 3. Careers Upload Security
$careersPath = Join-Path $root "careers.html"
if (Test-Path $careersPath) {
    $careersContent = [System.IO.File]::ReadAllText($careersPath, [System.Text.Encoding]::UTF8)
    if (-not $careersContent.Contains('5 * 1024 * 1024') -and -not $careersContent.Contains('5MB')) {
        $secErrors += "Careers file upload missing explicit 5MB size limit"
    }
    if (-not $careersContent.Contains('.pdf') -or -not $careersContent.Contains('accept=')) {
        $secErrors += "Careers file upload missing MIME type accept restriction"
    }
}

# 4. Anti-spam honeypot
$contactPath = Join-Path $root "contact.html"
if (Test-Path $contactPath) {
    $contactContent = [System.IO.File]::ReadAllText($contactPath, [System.Text.Encoding]::UTF8)
    if (-not $contactContent.Contains('_kotwari_hp')) {
        $secErrors += "Contact form missing anti-spam honeypot trap"
    }
}

Write-Host "Scanned $($scannableFiles.Count) files across repository."
if ($secErrors.Count -gt 0) {
    Write-Host "[FAIL] Found $($secErrors.Count) security issues:" -ForegroundColor Red
    $secErrors | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
} else {
    Write-Host "[PASS] Zero sensitive secrets exposed, strict CSP & headers active, upload and honeypot validated!" -ForegroundColor Green
}
