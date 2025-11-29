// kidsmath-main.bicep - Azure Static Web App
// Minimal, parameterized static web app deployment for a GitHub-hosted front-end.
// Run: az deployment group create -g <rg> -f kidsmath-main.bicep -p repositoryUrl=https://github.com/<owner>/<repo>

param staticSiteName string = 'kidsmath-static'
param location string = resourceGroup().location
param skuName string = 'Free' // Valid values: 'Free' or 'Standard'
param repositoryUrl string
param branch string = 'main'

// Build settings (adjust to match your repo layout)
param appLocation string = '/'            // location of your static app (e.g. '/', 'app', 'frontend')
param apiLocation string = ''             // optional: e.g. 'api' (leave empty if none)
param appArtifactLocation string = 'build'// e.g. 'build', 'dist'

// Static Web App resource
resource staticSite 'Microsoft.Web/staticSites@2022-03-01' = {
    name: staticSiteName
    location: location
    kind: 'staticapp'
    sku: {
        name: skuName
        tier: skuName
    }
    properties: {
        repositoryUrl: repositoryUrl
        branch: branch
        buildProperties: {
            appLocation: appLocation
            apiLocation: apiLocation
            appArtifactLocation: appArtifactLocation
        }
    }
}

output staticSiteId string = staticSite.id
output defaultHostname string = staticSite.properties.defaultHostname
output repository string = staticSite.properties.repositoryUrl
