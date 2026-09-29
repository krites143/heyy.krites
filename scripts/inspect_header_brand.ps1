$files = @('about.html','careers.html','contact.html','cookie-policy.html','dairy.html','eggs.html','exports.html','farmers.html','fmcg.html','fpo.html','investors.html','partners.html','privacy.html','retail.html','sustainability.html','terms.html','thank-you.html','water.html','404.html')
foreach ($f in $files) {
    $lines = Select-String -Path $f -Pattern '\.brand-name\s*\{'
    foreach ($l in $lines) {
        if ($l.LineNumber -lt 250) {
            Write-Host ($f + ':' + $l.LineNumber + ' -> ' + $l.Line.Trim())
        }
    }
}
