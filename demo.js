async function Data() {
    // Default options are marked with *
    const response = await fetch("https://accounts.zoho.com/oauth/v2/token?code=1000.be2edfe1faceb400ac89e1af1d651e61.5303cf926fb805c73d84ad4ddff3b859&grant_type=authorization_code&client_id=1000.LZAWBOTEYQ2MYNCVATLVEECK367TIB&client_secret=7d3e6fdbd93812879c39567fd7f450859330adf8b8&redirect_uri=https://www.zylker.com/oauthgrant", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      // headers: {
      //   "orgId": "749689656",
      //   "Authorization": "Zoho-oauthtoken 1000.a8bb31bcbee40b64afe002a17e5d0a6f.7c3885f16eda2b152bbf79f8171012d7"
      // },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({"code":"1000.02ea29196c35ed07ce7b4581896afae9.0c586ce3fbf1d93ab4a72a469b561ef2", "grant_type":"authorization_code", "client_id":"1000.LZAWBOTEYQ2MYNCVATLVEECK367TIB","client_secret":"7d3e6fdbd93812879c39567fd7f450859330adf8b8", "redirect_uri":"https://www.zylker.com/oauthgrant"})
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
        "Authorization":"Zoho-oauthtoken 1000.4856165e9e16f647783ca1456d549764.3df54f77e920e476bcc00f4567515010",
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({"subject":"Test", "departmentId":"601361000000006907","description":"This ticket was created using Node.js!  No further action is needed.", "contactId":"601361000017707258"})
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function Department() { // Nylex is 601361000000006907
    // Default options are marked with *
    const response = await fetch("https://desk.zoho.com/api/v1/departments", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "orgId": "749689656",
        "Authorization":"Zoho-oauthtoken 1000.e62cace6df936dcf1a6d858bdecf1e90.bec27cf4835698acd73ae250321dcc3c",
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer"// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

Department().then(data => {
  console.log(data);
  
}).catch(err => console.log(err));

// Ticket().then(data => {
//   console.log(data);
  
// }).catch(err => console.log(err));

// {"scope":["Desk.tickets.ALL"],"expiry_time":1685749275609,"client_id":"1000.LZAWBOTEYQ2MYNCVATLVEECK367TIB","client_secret":"7d3e6fdbd93812879c39567fd7f450859330adf8b8","code":"1000.7d72b6eafe29740e15f344f1b88c24cf.e0747d1b698f4b5c9f32ec85d76d816e","grant_type":"authorization_code"}
