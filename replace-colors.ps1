# PowerShell script to replace purple colors with black/white/grey throughout the project

$srcPath = "f:\Projects\Dev Portfolio\Kush05Bhardwaj.dev\src"

# Define color replacements
$colorMap = @{
    '#7b3fe4' = '#ffffff'
    '#b799ff' = '#cccccc'
    '#6b2fd4' = '#e5e5e5'
    '#1e1b2f' = '#1a1a1a'
    '#0a0612' = '#000000'
    '#a688ee' = '#cccccc'
    '#9f7aea' = '#cccccc'
}

# Get all .tsx and .ts files in components directory
$files = Get-ChildItem -Path "$srcPath\components" -Filter "*.tsx" -File

Write-Host "Replacing purple colors with black/white/grey in component files..." -ForegroundColor Cyan

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Yellow
    
    $content = Get-Content $file.FullName -Raw
    $modified = $false
    
    foreach ($oldColor in $colorMap.Keys) {
        $newColor = $colorMap[$oldColor]
        if ($content -match [regex]::Escape($oldColor)) {
            $content = $content -replace [regex]::Escape($oldColor), $newColor
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "  Updated $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "  No purple colors found in $($file.Name)" -ForegroundColor Gray
    }
}

Write-Host "Color replacement complete!" -ForegroundColor Green
