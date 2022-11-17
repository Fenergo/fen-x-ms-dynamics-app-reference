param(
    [switch]$version,
    [switch]$useConfig
)

if($version -eq $true){
    $branchName = git rev-parse --abbrev-ref HEAD
    $branchName = $branchName.Replace("/", "-").Replace("\", "-").Replace(" ", "-").Replace("_", "-")
    $commitId = git rev-parse --short HEAD
    npm version prerelease --preid=$branchName.$commitId 
}

if($useConfig -eq $true){
    if(!(Test-Path "$PSScriptRoot\TabControl\services\config\local_config.json")){
        Copy-Item "$PSScriptRoot\TabControl\services\config\dev_config.json" -Destination "$PSScriptRoot\TabControl\services\config\local_config.json" -Force
    }
    
    $config = Get-Content "$PSScriptRoot\TabControl\services\config\config.json" | ConvertFrom-Json
    if($config.localTesting.env -eq "development"){
        Copy-Item "$PSScriptRoot\TabControl\services\config\local_config.json" -Destination "$PSScriptRoot\TabControl\services\config\dev_config.json" -Force
    }
}