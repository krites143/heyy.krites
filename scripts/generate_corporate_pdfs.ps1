function Create-SimplePdf {
    param(
        [string]$FilePath,
        [string]$DocTitle,
        [string]$DocSubtitle,
        [string[]]$Lines
    )

    $stream = "BT /F1 20 Tf 50 750 Td (" + ($DocTitle -replace '\(','\(' -replace '\)','\)') + ") Tj ET`n"
    $stream += "BT /F1 12 Tf 50 725 Td (" + ($DocSubtitle -replace '\(','\(' -replace '\)','\)') + ") Tj ET`n"
    $stream += "BT /F1 10 Tf 50 705 Td (Kotwari International Ltd. - Gao Se Global Tak - Official Document) Tj ET`n"
    $stream += "0.5 w 50 695 m 550 695 l S`n"
    
    $y = 670
    foreach ($line in $Lines) {
        $escaped = $line -replace '\\','\\\\' -replace '\(','\(' -replace '\)','\)'
        $stream += "BT /F2 10 Tf 50 $y Td ($escaped) Tj ET`n"
        $y -= 18
    }

    $streamBytes = [System.Text.Encoding]::ASCII.GetBytes($stream)
    $streamLen = $streamBytes.Length

    $pdf = "%PDF-1.4`n"
    $pdf += "1 0 obj`n<< /Type /Catalog /Pages 2 0 R >>`nendobj`n"
    $pdf += "2 0 obj`n<< /Type /Pages /Kids [3 0 R] /Count 1 >>`nendobj`n"
    $pdf += "3 0 obj`n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>`nendobj`n"
    $pdf += "4 0 obj`n<< /Length $streamLen >>`nstream`n" + $stream + "endstream`nendobj`n"
    $pdf += "5 0 obj`n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`nendobj`n"
    $pdf += "6 0 obj`n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`nendobj`n"
    
    # xref table
    $bodyBytes = [System.Text.Encoding]::ASCII.GetBytes($pdf)
    $xrefOffset = $bodyBytes.Length

    $pdf += "xref`n0 7`n0000000000 65535 f `n"
    # Find offsets of 1 0 obj through 6 0 obj
    for ($i = 1; $i -le 6; $i++) {
        $pattern = "$i 0 obj"
        $idx = $pdf.IndexOf($pattern)
        $offsetStr = $idx.ToString("D10")
        $pdf += "$offsetStr 00000 n `n"
    }
    $pdf += "trailer`n<< /Size 7 /Root 1 0 R >>`nstartxref`n$xrefOffset`n%%EOF`n"

    [System.IO.File]::WriteAllBytes($FilePath, [System.Text.Encoding]::ASCII.GetBytes($pdf))
}

Create-SimplePdf -FilePath "d:\kotwari\docs\kotwari-corporate-profile.pdf" `
    -DocTitle "KOTWARI INTERNATIONAL LTD. - CORPORATE PROFILE" `
    -DocSubtitle "Enterprise Overview, Mission, Core Verticals & 5-Year Vision 2026-2030" `
    -Lines @(
        "Registered Office: Kotwari House, Jankipuram-III, Kursi Road, Lucknow - 226021, UP, India",
        "Website: www.kotwari.com | Contact: kotwarigroup18@gmail.com | Phone: +91 99786 48583",
        "1. EXECUTIVE SUMMARY: Kotwari International Ltd. is an integrated agricultural, processing, and",
        "   rural-commerce ecosystem operating under the guiding ethos 'Gao Se Global Tak'.",
        "2. CORE VERTICALS: Kotwari Dairy, Kotwari FMCG, Kotwari Eggs, KooA Mineral Water, Kotwari One Retail,",
        "   and the Kotwari Global Export Division.",
        "3. FARMER INTEGRATION: Operating 120+ direct village procurement centers with computerized weigh slips.",
        "4. PROCESSING & QUALITY: Automated chilling, stone-grinding, cold-pressed extraction, and FSSAI/APEDA certification.",
        "5. DISTRIBUTION & EXPORTS: Pan-India supermarket presence and container shipments across UAE, GCC, and Africa.",
        "6. SUSTAINABILITY COMMITMENT: Solar-powered cold chain, zero chemical adulteration, and transparent farmer settlements.",
        "Certified Document - Issued by Kotwari Corporate Bureau - November 2026"
    )

Create-SimplePdf -FilePath "d:\kotwari\docs\kotwari-export-specifications-2026.pdf" `
    -DocTitle "KOTWARI EXPORT DIVISION - COMMODITY SPECIFICATIONS 2026" `
    -DocSubtitle "International Agro-Commodity Export Catalog & Quality Parameters" `
    -Lines @(
        "Trade Desk: exports@kotwari.com / kotwarigroup18@gmail.com | Ports of Loading: JNPT / Mundra / Kandla",
        "Target Markets: United Arab Emirates, Saudi Arabia, Oman, Qatar, Bahrain, Kuwait, Southeast Asia",
        "1. TRADITIONAL BASMATI RICE: Aged 24 months, average grain length 8.35mm+, moisture max 12.5%, purity 95%.",
        "2. COLD-PRESSED KACHI GHANI MUSTARD OIL: Raw pungent, natural allyl isothiocyanate min 0.30%, zero argemone.",
        "3. STONE-GROUND SPICES: Single-origin turmeric (curcumin 4.5%+), stemless Kashmiri red chilli, royal garam masala.",
        "4. MITHILA PHOOL MAKHANA (FOX NUTS): Hand-sorted jumbo grade, moisture max 9%, sulfur-free processing.",
        "5. PACKAGING: Bulk 25kg/50kg multi-wall paper bags, PP woven bags, or retail nitrogen-flushed foil pouches.",
        "6. CERTIFICATIONS: APEDA, FSSAI, Halal Certified, Phytosanitary, Certificate of Origin, and SGS inspection.",
        "Incoterms Offered: FOB Indian Ports, CIF GCC/Global Destination Ports, CFR.",
        "Official Export Catalog - Valid Through Calendar Year 2026"
    )

Create-SimplePdf -FilePath "d:\kotwari\docs\kotwari-quality-safety-charter.pdf" `
    -DocTitle "KOTWARI FOOD SAFETY & QUALITY ASSURANCE CHARTER" `
    -DocSubtitle "Corporate Standards, Laboratory Protocols & Compliance Framework" `
    -Lines @(
        "Quality Directorate: Kursi Road Central Quality Laboratory, Lucknow, Uttar Pradesh",
        "Scope: Dairy Processing, FMCG Spices & Staples, Cold-Pressed Oils, Poultry Candling & KooA Water",
        "1. RAW MATERIAL INGRESS: 100% incoming raw milk and seed tested for adulterants, urea, starch, and moisture.",
        "2. HYGIENIC PROCESSING: Stainless steel 316-grade food-contact pipelines, CIP automated sanitation cycles.",
        "3. MICROBIOLOGICAL SAFETY: Total plate count, coliforms, and salmonella verified under NABL-accredited protocols.",
        "4. PACKAGING INTEGRITY: Tamper-evident induction cap seals, food-grade virgin polymers, nitrogen flushing.",
        "5. TRACEABILITY: Batch QR code linking finished SKU to source farmer collection cluster and chilling date.",
        "6. REGULATORY COMPLIANCE: Adherence to FSSAI standards, Legal Metrology Act, and international Codex Alimentarius.",
        "Corporate Quality Directorate - Kotwari International Ltd."
    )

Create-SimplePdf -FilePath "d:\kotwari\docs\kotwari-farmer-charter.pdf" `
    -DocTitle "KOTWARI FARMER & FPO PARTNERSHIP CHARTER" `
    -DocSubtitle "Fair Sourcing Protocols, Weighment Integrity & Village Development Policy" `
    -Lines @(
        "Kisan Outreach Directorate: Kotwari House, Lucknow | Toll-Free / WhatsApp Helpdesk: +91 99786 48583",
        "Guiding Philosophy: 'India's Villages Must Participate in the Value They Create'",
        "1. WEIGHMENT ACCURACY: Mandatory computerized electronic weigh slips with zero arbitrary bag deductions.",
        "2. TRANSPARENT QUALITY GRADING: Calibrated digital moisture meters tested in front of farmer members.",
        "3. TIMELY SETTLEMENTS: Direct electronic bank transfers (NEFT/RTGS/UPI) within 24 hours of weighment.",
        "4. VETERINARY & AGRONOMY SUPPORT: Free dairy cattle health camps, balanced feed distribution, and soil analysis.",
        "5. FPO AGGREGATION CONTRACTS: Guaranteed seasonal buyback arrangements with registered producer organizations.",
        "6. ETHICAL TRADE: Absolute adherence to interest-free (Riba-free) transparent commercial transactions.",
        "Kisan Alliances Directorate - Kotwari International Ltd."
    )
