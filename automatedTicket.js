let config = {
    code:'1000.be5a0fd59dadcfc2857e3013624edaf5.92af34e26866cdf94e35f21804a9e488',
    client_id: '1000.LZAWBOTEYQ2MYNCVATLVEECK367TIB',
    client_secret: '7d3e6fdbd93812879c39567fd7f450859330adf8b8',
    scope: "Desk.tickets.ALL,Desk.settings.READ,Desk.basic.READ",
    redirect_uri:"https://www.zylker.com/oauthgrant"
};

async function oauthgrant() {
    // Default options are marked with *
    const response = await fetch("https://accounts.zoho.com/oauth/v2/token?code="+config.code+"&grant_type=authorization_code&client_id="+config.client_id+"&client_secret="+config.client_secret+"&redirect_uri="+config.redirect_uri, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      // headers: {
      //   "orgId": "749689656",
      //   "Authorization": "Zoho-oauthtoken 1000.a8bb31bcbee40b64afe002a17e5d0a6f.7c3885f16eda2b152bbf79f8171012d7"
      // },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer"// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function Ticket() {
    // Default options are marked with *
    const response = await fetch("https://desk.zoho.com/api/v1/tickets", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "orgId": "749689656",
        "Authorization":"Zoho-oauthtoken " + config.grant.access_token,
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({"subject":"[TEST] Error Report", "departmentId":"601361000000006907","description":"This is a test for a new feature upon PPI error. If you see this ticket, Zoho token reauthorization has succeeded.", "contactId":"601361000030806189", "assigneeId":"601361000016556001"})
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

async function reauthorize() {
  // Default options are marked with *
  const response = await fetch("https://accounts.zoho.com/oauth/v2/token?refresh="+config.grant.refresh_token+"&client_id="+config.client_id+"&client_secret="+config.client_secret+"&scope="+config.scope+"&redirect_uri="+config.redirect_uri + "&grant_type=refresh_token", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    // headers: {
    //   "orgId": "749689656",
    //   "Authorization": "Zoho-oauthtoken 1000.a8bb31bcbee40b64afe002a17e5d0a6f.7c3885f16eda2b152bbf79f8171012d7"
    // },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer"// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }).then(response => {
    response = response.json();
    if(response.hasOwnProperty("access_token")) {
      config.grant.access_token = response.access_token;
      console.log("Reauthorized.");
      Ticket().then(res => console.log(res)).catch(error => console.error(error));
    }
  }).catch(err => console.error(err));// parses JSON response into native JavaScript objects
}

  oauthgrant().then((data) => {
    if(data.hasOwnProperty("access_token")) {
        config["grant"] = data;
        console.log("Refreshing in " + (config.grant.expires_in * 1000) + " miliseconds.");
        setInterval(reauthorize, config.grant.expires_in * 1000);
    }
    else {
      console.log(data);
    }
}).catch(err => console.error(err));