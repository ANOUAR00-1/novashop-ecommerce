# NovaShop Design System - Color Update Script
# This script updates all blue/purple/pink colors to orange theme

Write-Host "NovaShop Design System - Color Update Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$rootPath = $PSScriptRoot

# Define color replacements
$replacements = @{
    # Background colors
    'bg-blue-600' = 'bg-orange-500'
    'bg-blue-700' = 'bg-orange-600'
    'bg-blue-500' = 'bg-orange-500'
    'bg-blue-50' = 'bg-orange-50'
    'bg-blue-100' = 'bg-orange-100'
    'bg-blue-900/20' = 'bg-orange-500/10'
    
    # Text colors
    'text-blue-600' = 'text-orange-500'
    'text-blue-700' = 'text-orange-600'
    'text-blue-500' = 'text-orange-500'
    'text-blue-400' = 'text-orange-400'
    
    # Hover text colors
    'hover:text-blue-600' = 'hover:text-orange-500'
    'hover:text-blue-400' = 'hover:text-orange-400'
    'hover:text-blue-700' = 'hover:text-orange-600'
    
    # Hover background colors
    'hover:bg-blue-50' = 'hover:bg-orange-50'
    'hover:bg-blue-500' = 'hover:bg-orange-500'
    'hover:bg-blue-600' = 'hover:bg-orange-600'
    'hover:bg-blue-900/20' = 'hover:bg-orange-500/10'
    
    # Border colors
    'border-blue-400' = 'border-orange-500'
    'border-blue-500' = 'border-orange-500'
    'border-blue-600' = 'border-orange-500'
    'hover:border-blue-400' = 'hover:border-orange-500'
    
    # Gradient colors (Blue to Orange)
    'from-blue-600' = 'from-orange-500'
    'to-blue-600' = 'to-orange-600'
    'via-blue-600' = 'via-orange-500'
    'hover:from-blue-700' = 'hover:from-orange-600'
    'hover:to-blue-700' = 'hover:to-orange-600'
    
    # Purple to Orange (removing purple/pink gradients)
    'to-purple-600' = 'to-orange-600'
    'from-purple-600' = 'from-orange-500'
    'via-purple-600' = 'via-orange-500'
    'hover:to-purple-700' = 'hover:to-orange-600'
    'to-pink-600' = 'to-orange-600'
    'from-pink-900' = 'from-orange-900'
    'via-pink-900' = 'via-orange-900'
    'from-pink-900/80' = 'from-gray-900/90'
    'via-rose-900/70' = 'via-gray-800/80'
    
    # Hero section gradients (change to dark gray)
    'from-blue-900/80' = 'from-gray-900/90'
    'via-purple-900/70' = 'via-gray-800/80'
    'from-indigo-900/80' = 'from-gray-900/90'
    'via-blue-900/70' = 'via-gray-800/80'
    
    # Ring/Focus colors
    'ring-blue-500' = 'ring-orange-500'
    'focus:ring-blue-500' = 'focus:ring-orange-500'
    'focus:border-blue-500' = 'focus:border-orange-500'
}

# Files and folders to process
$foldersToSearch = @(
    "components",
    "pages",
    "layouts",
    "contexts"
)

$fileExtensions = @("*.tsx", "*.ts", "*.jsx", "*.js")

$totalReplacements = 0
$filesModified = 0

Write-Host "🔍 Searching for files to update..." -ForegroundColor Yellow
Write-Host ""

foreach ($folder in $foldersToSearch) {
    $folderPath = Join-Path $rootPath $folder
    
    if (-not (Test-Path $folderPath)) {
        Write-Host "⚠️  Folder not found: $folder" -ForegroundColor Yellow
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
                Write-Host "✅ $relativePath" -ForegroundColor Green
                Write-Host "   └─ $fileReplacements replacements" -ForegroundColor Gray
                $filesModified++
            }
        }
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "✨ Color Update Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "   • Files Modified: $filesModified" -ForegroundColor White
Write-Host "   • Total Replacements: $totalReplacements" -ForegroundColor White
Write-Host ""
Write-Host "🎨 Blue → Orange theme applied successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review the changes in your IDE" -ForegroundColor White
Write-Host "2. Test the application (npm run dev)" -ForegroundColor White
Write-Host "3. Commit if everything looks good!" -ForegroundColor White
Write-Host ""
