# NovaShop - ABSOLUTE FINAL Color Pass
# Every single remaining blue/purple/pink instance

Write-Host "NovaShop - ABSOLUTE FINAL Pass" -ForegroundColor Yellow
Write-Host "===============================" -ForegroundColor Yellow
Write-Host ""

$rootPath = $PSScriptRoot

# EVERY remaining pattern
$replacements = @{
    # Dashboard gradients
    'to-blue-700' = 'to-orange-600'
    'hover:to-blue-800' = 'hover:to-orange-700'
    'to-purple-700' = 'to-orange-600'
    'from-purple-700' = 'from-orange-600'
    'hover:from-purple-700' = 'hover:from-orange-600'
    'hover:to-purple-800' = 'hover:to-orange-700'
    
    # Dark mode backgrounds
    'dark:bg-purple-900/30' = 'dark:bg-orange-900/30'
    'dark:bg-blue-800' = 'dark:bg-gray-800'
    
    # Any other purple variants
    'purple-900' = 'orange-900'
    'purple-800' = 'orange-800'
    'purple-700' = 'orange-700'
    
    # Any other blue variants  
    'blue-900' = 'gray-900'
    'blue-800' = 'gray-800'
    'blue-700' = 'orange-600'
    'blue-200' = 'orange-200'
    'blue-300' = 'orange-300'
    
    # Pink
    'pink-900' = 'orange-900'
    'pink-800' = 'orange-800'
    'pink-700' = 'orange-700'
}

$foldersToSearch = @("components", "pages", "layouts")
$fileExtensions = @("*.tsx", "*.ts")

$totalReplacements = 0
$filesModified = 0

foreach ($folder in $foldersToSearch) {
    $folderPath = Join-Path $rootPath $folder
    
    if (-not (Test-Path $folderPath)) { continue }
    
    foreach ($ext in $fileExtensions) {
        $files = Get-ChildItem -Path $folderPath -Filter $ext -Recurse -File
        
        foreach ($file in $files) {
            $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
            $fileReplacements = 0
            
            foreach ($key in $replacements.Keys) {
                if ($content -match [regex]::Escape($key)) {
                    $count = ([regex]::Matches($content, [regex]::Escape($key))).Count
                    $content = $content -replace [regex]::Escape($key), $replacements[$key]
                    $fileReplacements += $count
                    $totalReplacements += $count
                }
            }
            
            if ($fileReplacements -gt 0) {
                Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
                Write-Host "[FIXED] $($file.Name) ($fileReplacements)" -ForegroundColor Green
                $filesModified++
            }
        }
    }
}

Write-Host ""
Write-Host "===============================" -ForegroundColor Yellow
if ($totalReplacements -eq 0) {
    Write-Host "100% COMPLETE - NO COLORS LEFT!" -ForegroundColor Green
} else {
    Write-Host "Fixed: $filesModified files, $totalReplacements colors" -ForegroundColor Green
}
Write-Host ""
