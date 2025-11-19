# NovaShop Design System - FINAL Color Update Script
# Catches all remaining blue/purple/pink colors missed by first pass

Write-Host "NovaShop - FINAL Color Cleanup Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

$rootPath = $PSScriptRoot

# Additional color replacements (patterns missed in first pass)
$replacements = @{
    # Light blue text (used on colored backgrounds)
    'text-blue-100' = 'text-white/90'
    'text-blue-200' = 'text-white/80'
    'text-blue-300' = 'text-white/70'
    
    # Gradient backgrounds (light mode)
    'from-blue-50' = 'from-orange-50'
    'to-blue-50' = 'to-orange-50'
    'via-blue-50' = 'via-orange-50'
    'from-purple-50' = 'from-orange-50'
    'to-purple-50' = 'to-orange-50'
    'from-pink-50' = 'from-orange-50'
    'to-pink-50' = 'to-orange-50'
    
    # Dark mode gradients
    'dark:from-blue-900/20' = 'dark:from-orange-900/20'
    'dark:to-blue-900/20' = 'dark:to-orange-900/20'
    'dark:from-purple-900/20' = 'dark:from-orange-900/20'
    'dark:to-purple-900/20' = 'dark:to-orange-900/20'
    'dark:from-blue-900/30' = 'dark:from-orange-900/30'
    'dark:bg-blue-900/30' = 'dark:bg-orange-900/30'
    
    # Remaining blue variants
    'bg-blue-800' = 'bg-orange-700'
    'bg-blue-900' = 'bg-gray-900'
    'text-blue-800' = 'text-orange-600'
    'text-blue-900' = 'text-gray-900'
    'border-blue-300' = 'border-orange-300'
    'border-blue-200' = 'border-orange-200'
    
    # Purple variants
    'bg-purple-100' = 'bg-orange-100'
    'bg-purple-500' = 'bg-orange-500'
    'bg-purple-600' = 'bg-orange-600'
    'text-purple-600' = 'text-orange-600'
    'text-purple-400' = 'text-orange-400'
    
    # Pink variants
    'bg-pink-100' = 'bg-orange-100'
    'bg-pink-500' = 'bg-orange-500'
    'text-pink-600' = 'text-orange-600'
    
    # Indigo variants
    'from-indigo-50' = 'from-gray-50'
    'bg-indigo-100' = 'bg-orange-100'
    'text-indigo-600' = 'text-orange-600'
}

$foldersToSearch = @("components", "pages", "layouts", "contexts")
$fileExtensions = @("*.tsx", "*.ts", "*.jsx", "*.js")

$totalReplacements = 0
$filesModified = 0

Write-Host "Searching for remaining color instances..." -ForegroundColor Yellow
Write-Host ""

foreach ($folder in $foldersToSearch) {
    $folderPath = Join-Path $rootPath $folder
    
    if (-not (Test-Path $folderPath)) {
        Write-Host "Folder not found: $folder" -ForegroundColor Yellow
        continue
    }
    
    foreach ($ext in $fileExtensions) {
        $files = Get-ChildItem -Path $folderPath -Filter $ext -Recurse -File
        
        foreach ($file in $files) {
            $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
            $originalContent = $content
            $fileReplacements = 0
            
            foreach ($key in $replacements.Keys) {
                $oldValue = $key
                $newValue = $replacements[$key]
                
                if ($content -match [regex]::Escape($oldValue)) {
                    $count = ([regex]::Matches($content, [regex]::Escape($oldValue))).Count
                    $content = $content -replace [regex]::Escape($oldValue), $newValue
                    $fileReplacements += $count
                    $totalReplacements += $count
                }
            }
            
            if ($fileReplacements -gt 0) {
                Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
                $relativePath = $file.FullName.Replace($rootPath, "").TrimStart('\')
                Write-Host "[OK] $relativePath" -ForegroundColor Green
                Write-Host "     $fileReplacements replacements" -ForegroundColor Gray
                $filesModified++
            }
        }
    }
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "FINAL Cleanup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Files Modified: $filesModified" -ForegroundColor White
Write-Host "  Total Replacements: $totalReplacements" -ForegroundColor White
Write-Host ""

if ($totalReplacements -eq 0) {
    Write-Host "No additional colors found - Design system is 100% complete!" -ForegroundColor Green
} else {
    Write-Host "Additional colors updated successfully!" -ForegroundColor Green
}

Write-Host ""
