# NovaShop - Complete All Remaining Colors
# Final pass to catch edge cases

Write-Host "NovaShop - Completing ALL Colors" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$rootPath = $PSScriptRoot

# Final edge cases
$replacements = @{
    # Social media hovers (make consistent with orange theme)
    'hover:from-blue-400' = 'hover:from-orange-400'
    'hover:to-blue-600' = 'hover:to-orange-600'
    'to-rose-600' = 'to-orange-600'
    'from-rose-500' = 'from-orange-500'
    
    # Any remaining blue classes
    'blue-500' = 'orange-500'
    'blue-600' = 'orange-600'
    'blue-400' = 'orange-400'
}

$foldersToSearch = @("components", "pages", "layouts", "contexts")
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
                $relativePath = $file.FullName.Replace($rootPath, "").TrimStart('\')
                Write-Host "[OK] $relativePath ($fileReplacements)" -ForegroundColor Green
                $filesModified++
            }
        }
    }
}

Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "COMPLETE!" -ForegroundColor Green
Write-Host "Files: $filesModified | Replacements: $totalReplacements" -ForegroundColor White
Write-Host ""
