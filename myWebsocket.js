//Define connecting state websocket
// 0 – “CONNECTING”: the connection has not yet been established,
// 1 – “CONNECTED”: communicating,
// 2 – “CLOSING”: the connection is closing,
// 3 – “CLOSED”: the connection is closed.
const CONNECTING=0;
const CONNECTED=1;
const CLOSING=2;
const CLOSED=3;
let i = 0;
let delay = ms => new Promise(r => setTimeout(r, ms));


//Define a var for websocket
var My_websocket;

//-----------------------------------------------------------------------------------------------------
//---------------------------------------------My Websocket -------------------------------------
//-----------------------------------------------------------------------------------------------------  
class MyWebSocket {
  constructor(wss_url) {
    try {
      console.log(wss_url);  
      this.ws = new WebSocket(wss_url);
      this.ws.onopen = this.open_handler;           //handler for on open
      this.ws.onmessage = this.message_handler;     //handler for on message
      this.ws.onerror = this.error_handler;         //handler for on error
    } catch (con_err) {
      console.log("CONNECTION ERROR", con_err);
    }
  }
  //------------------------------------------------------------------------------------------
  //--------------------------------------on open handler-------------------------------------
  //------------------------------------------------------------------------------------------ 
  open_handler = e => {
    console.log("Websocket open");
  };

  //---------------------------------------------------------------------------------------------
  //--------------------------------------on message handler-------------------------------------
  //---------------------------------------------------------------------------------------------  
  message_handler = e => {
    console.log("Message arrived on Websocket");
  };

  //-------------------------------------------------------------------------------------------
  //--------------------------------------on error handler-------------------------------------
  //-------------------------------------------------------------------------------------------  
  error_handler = e => {
    console.log("Websocket error");
    this.ws.close();
  };

  //------------------------------------------------------------------------------------------
  //--------------------------------------manage connection-----------------------------------
  //------------------------------------------------------------------------------------------
  is_connected = async () => {
    i += 1; // unnecessary - for debug only
    if (this.ws.readyState === CONNECTED) {
      return true;
    } else {
      console.log(`Checking ${i}. ReadyState is`, this.ws.readyState); 
      await delay(100).then(this.is_connected);
    }
  };

  connect = async () => {
    console.log("Connecting");
    await this.is_connected();
    console.log("Connected!");
    return true;
  };
  
  //------------------------------------------------------------------------------------------
  //--------------------------------------manage sendMessage----------------------------------
  //------------------------------------------------------------------------------------------
  send = async mesg => {
    await this.connect();
    try {
      this.ws.send(mesg);
      console.log(`Sent ${mesg}!`);
    } catch (transmission_error) {
      console.log("Transmission Error", transmission_error);
    }
  };
}

//----------------------------------------------------------------------------------------
//-------------------------------Initialize websocket ------------------------------------
//----------------------------------------------------------------------------------------  
function init() {
    var wss_uri="wss://echo.websocket.org"
    My_websocket= new MyWebSocket(wss_uri);
  }

//------------------------------------------------------------------------------------------
//-------------------------------Send Message on websocket---------------------------------
//------------------------------------------------------------------------------------------  
function sendMessage(message) {
    const rawMessage = JSON.stringify(message);
    console.log('sendMessage: ' + rawMessage);
    My_websocket.send(rawMessage);
}
