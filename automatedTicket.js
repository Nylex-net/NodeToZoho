let config = {
    code:'1000.5fe39762d0b1e56c8a14b06560d44fc1.f2faab8c9aa7b21a3560637f5da21122',
    client_id: '1000.LZAWBOTEYQ2MYNCVATLVEECK367TIB',
    client_secret: '7d3e6fdbd93812879c39567fd7f450859330adf8b8',
    scope: "Desk.tickets.ALL,Desk.settings.READ,Desk.basic.READ",
    redirect_uri:"https://www.zylker.com/oauthgrant"
};

async function oauthgrant() {
    // Default options are marked with *
    const response = await fetch("https://accounts.zoho.com/oauth/v2/token?code="+config.code+"&grant_type=authorization_code&client_id="+config.client_id+"&client_secret="+config.client_secret+"&redirect_uri="+config.redirect_uri + "&access_type=offline", {
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
        "Authorization":"Zoho-oauthtoken 1000.f39be4698696ee5c826264d5440eab51.0789573a97fb89a4e5861abbcdb3d1be",
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({"subject":"[TEST] Error Report", "departmentId":"601361000000006907","description":"This is a test for a new feature upon PPI error.", "contactId":"601361000030806189", "assigneeId":"601361000016556001"})
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

async function reauthorizeCall() {
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
  });
  return response;
}

function reauthorize() {
  reauthorizeCall().then(response => {
    if(response.status === 200) {
      const reauthJSON = response.json();
      config.grant.access_token = (reauthJSON.hasOwnProperty("access_token"))?reauthJSON.access_token:config.grant.access_token;
      config.grant.expires_in = (reauthJSON.hasOwnProperty("expires_in"))?reauthJSON.expires_in:config.grant.expires_in;
      console.log("Reauthorized.");
      // Test to see if reauthorization worked by creating a ticket.
      Ticket().then(res => console.log(res)).catch(error => console.error(error));
    }
    else {
      console.log("Something else went wrong\n" + response);
    }// parses JSON response into native JavaScript objects
  }).catch(err => console.error(err));
}

  oauthgrant().then((data) => {
    if(data.hasOwnProperty("access_token")) {
        config["grant"] = data;
        console.log(config);
        console.log("Refreshing in " + 60000 + " miliseconds."); // expires_in is in the form of seconds.
        setInterval(reauthorize, 60000);
    }
    else {
      console.log(data);
    }
}).catch(err => console.error(err));