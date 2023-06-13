$company_name = ''

$code = ""
$orgId = "749689656"
$client_id = ""
$client_secret = ""
$scope= "Desk.contacts.READ,Desk.tickets.READ"
$numCompanies = 100
$from = 100
$access_token = ''

if($access_token -eq ''){
    $invokeURL = 'https://accounts.zoho.com/oauth/v2/token?code='+ $code +'&grant_type=authorization_code&client_id=' + $client_id + '&client_secret=' + $client_secret + '&redirect_uri=https://www.zylker.com/oauthgrant'

    $jsonObject = Invoke-RestMethod -Uri $invokeURL -Method POST

    if($jsonObject.PSObject.Properties.Name -contains "access_token") {
        Write-Host "access_token: " $jsonObject.access_token
        $headers=@{}
        $headers.Add(“orgId”, $orgId)
        $headers.Add(“Authorization”, "Zoho-oauthtoken " + $jsonObject.access_token)

        $invokeURL = 'https://desk.zoho.com/api/v1/accounts?limit='+$numCompanies
        $jsonObject = Invoke-RestMethod -Uri $invokeURL -Method GET -Headers $headers

        $company_id = ""
        $found = $false

        while($jsonObject.PSObject.Properties.Name -contains "data" -and $jsonObject.data.Length -gt 0) {
            $data = $jsonObject.data
            for($i = 0; $i -lt $data.Length; $i++) {
                if($data[$i].accountName.ToLower() -eq $company_name.ToLower()) {
                    $company_id = $jsonObject.data[$i].id
                    $found = $true
                    break
                }
            }
            if($found) {
                break
            }
            elseif($jsonObject.data.Length -lt 100) {
                Write-Host $company_name "not found"
                Exit
            }
            else {
                $invokeURL = 'https://desk.zoho.com/api/v1/accounts?from='+$from+'&limit='+$numCompanies
                $jsonObject = Invoke-RestMethod -Uri $invokeURL -Method GET -Headers $headers
                $from = $from + 100
            }
         }

            $invokeURL = 'https://desk.zoho.com/api/v1/accounts/'+ $company_id +'/tickets'
            $jsonObject = Invoke-RestMethod -Uri $invokeURL -Method GET -Headers $headers
        
            if($jsonObject.PSObject.Properties.Name -contains "data") {
            $data = $jsonObject.data
                foreach($ticket in $jsonObject.data) {
                    if($ticket.status -eq 'Open') {
                        Write-Host $ticket
                    }
                }
            }
            else {
                Write-Host "Something went wrong with getting" $company_id "tickets"
                Write-Host $jsonObject
            }
    }
    else {
        Write-Host "Authentication failed"
        Write-Host $response
    }
}
else {
    $headers=@{}
    $headers.Add(“orgId”, $orgId)
    $headers.Add(“Authorization”, "Zoho-oauthtoken " + $access_token)

    $invokeURL = 'https://desk.zoho.com/api/v1/accounts?limit='+$numCompanies
    $jsonObject = Invoke-RestMethod -Uri $invokeURL -Method GET -Headers $headers

    $company_id = ""
    $found = $false

    while($jsonObject.PSObject.Properties.Name -contains "data" -and $jsonObject.data.Length -gt 0) {
        $data = $jsonObject.data
        for($i = 0; $i -lt $data.Length; $i++) {
            if($data[$i].accountName.ToLower() -eq $company_name.ToLower()) {
                $company_id = $jsonObject.data[$i].id
                $found = $true
                break
            }
         }
         if($found) {
            break
         }
         elseif($jsonObject.data.Length -lt 100) {
             Write-Host $company_name "not found"
             Exit
         }
         else {
            $invokeURL = 'https://desk.zoho.com/api/v1/accounts?from='+$from+'&limit='+$numCompanies
            $jsonObject = Invoke-RestMethod -Uri $invokeURL -Method GET -Headers $headers
            $from = $from + 100
         }
     }

        $invokeURL = 'https://desk.zoho.com/api/v1/accounts/'+ $company_id +'/tickets'
        $jsonObject = Invoke-RestMethod -Uri $invokeURL -Method GET -Headers $headers
        
        if($jsonObject.PSObject.Properties.Name -contains "data") {
            $data = $jsonObject.data
            foreach($ticket in $jsonObject.data) {
                if($ticket.status -eq 'Open') {
                    Write-Host $ticket
                }
            }
    }
}