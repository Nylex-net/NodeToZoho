async function Data() {
    // Default options are marked with *
    const response = await fetch("https://accounts.zoho.com/oauth/v2/auth?code=1000.dc1eefe0ae225ca04cbc7438cbd4a31d.7924eec6f2b3ad2a0563cfe95a819e45&grant_type=authorization_code&client_id=1000.LZAWBOTEYQ2MYNCVATLVEECK367TIB&client_secret=7d3e6fdbd93812879c39567fd7f450859330adf8b8", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "orgId": "749689656",
        "Authorization": "Zoho-oauthtoken 1000.dc1eefe0ae225ca04cbc7438cbd4a31d.7924eec6f2b3ad2a0563cfe95a819e45"
      },
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
        "Authorization": "Zoho-oauthtoken 1000.dc1eefe0ae225ca04cbc7438cbd4a31d.7924eec6f2b3ad2a0563cfe95a819e45"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify('{"subject":"Test","departmentId":"749689656","description":"This ticket was created using Node.js!  No further action is needed."}')
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

Data().then(data => {
  console.log(data);
  
}).catch(err => console.log(err));

// Ticket().then(data => {
//   console.log(data);
  
// }).catch(err => console.log(err));

// {"scope":["Desk.tickets.ALL"],"expiry_time":1685749275609,"client_id":"1000.LZAWBOTEYQ2MYNCVATLVEECK367TIB","client_secret":"7d3e6fdbd93812879c39567fd7f450859330adf8b8","code":"1000.7d72b6eafe29740e15f344f1b88c24cf.e0747d1b698f4b5c9f32ec85d76d816e","grant_type":"authorization_code"}
