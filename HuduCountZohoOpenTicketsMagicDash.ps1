$HuduAPIKey = "BipomuW9kvJ6jxZWp41q5bfd"
$HuduBaseDomain = "https://hudu.nylex.net"
import-module HuduAPI
#Login to Hudu
New-HuduAPIKey $HuduAPIKey
New-HuduBaseUrl $HuduBaseDomain

#Refresh Zoho access code
#obtain new access token using received refresh token each time script is run. 
$refreshToken = "1000.8a8a5d7e5608853ae3b77e0cae94722c.68c25fdfd0da7633ce1993a9bbcfb1c1"
$clientID = "1000.OQ80NW59V2IXS8YDT3WC6SEST2MTLB"
$clientSecret = "a952de9de42921fc402c4dd5ad91e45c502d2246b5"
$scope = "Desk.tickets.READ,Desk.contacts.READ,Desk.search.READ,Desk.basic.READ"
$grantType = "refresh_token"
$params = "?refresh_token=$refreshToken&client_id=$clientID&client_secret=$clientSecret&scope=$scope&grant_type=$grantType"
$result = Invoke-RestMethod -Method Post -Uri "https://accounts.zoho.com/oauth/v2/token$params"
$accessToken = $result.access_token
$invokeURL = "https://desk.zoho.com/api/v1/"
#Header for additional REST method calls using newly obtained access token.
$headers = @{
    orgId="$orgId"
    Authorization="Zoho-oauthtoken $accessToken"
}

$companies = Get-HuduCompanies
ForEach ( $company in $companies )
{
    $searchAccountName = $company.name
    $orgId = "749689656"

    #Search Zoho for the account name
    $uri = $invokeURL + "accounts/search?"
    $body = @{
        limit = "1"
        accountName = "$searchAccountName"
    }
    $accountJsonObject = Invoke-RestMethod -Uri $uri -Method Get -Body $body -Headers $headers
    $accountName = $accountJsonObject.data.accountName
    $accountId = $accountJsonObject.data.id
    #Since the above search is a wildcard search, verify that account name matches exactly what we are looking for. 
    if( $accountName -ne $searchAccountName )
    {
        Write-Host "Account name is not an exact match or account name not found."
        Continue
    }
    
    #Find open tickets using returned account data:
    $uri = $invokeURL + "ticketsCountByFieldValues?"
    $body = @{
        field = "status"
        accountId = "$accountId"
    }
    $jsonObject = Invoke-RestMethod -Uri $uri -Method GET -Body $body -Headers $headers
    $openCount = $jsonObject.status | Where-Object { $_.value -eq "open" } | Select-Object -ExpandProperty count
    if( $null -eq $openCount )
    {
        $openCount = "0"
    }
    
    #Create a magic dash
    $DashTitle = "Open tickets"
    $Param = @{
        Title = $DashTitle
        CompanyName = $company.name
        message = "$openCount"
        content_link = $accountJsonObject.data.webUrl
        Shade = "success"
    }
    "Creating dash"
    $null = Set-HuduMagicDash @Param
    
}