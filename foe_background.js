//  https://foefr.innogamescdn.com/start/metadata?id=city_entities-e99b889a38c94de6ca634fff0fe3a58beda9d9de&0 
//  https://foezz.innogamescdn.com/start/metadata?id=city_entities-a469892c704013737a67bf8dbd5213885731b13f&0
var target1 = "*://*.forgeofempires.com/game/json?*";
var target2 = "*://*.innogamescdn.com/start/metadata?id=city_entities*";
var portFromCS = [];
let mySTR0 = [];
function connected(p) {
//  console.log("Connexion FOE"+p.sender+" "+p.sender.tab+" "+p.sender.url)
  var myWorld=p.sender.url.split('.')[0].split('//')[1];
  portFromCS[myWorld] = p;
//  portFromCS[myWorld].postMessage({greeting: "salut, script de contenu?!"});
  portFromCS[myWorld].onMessage.addListener(function(m) {
    console.log("Dans le script d'arrière-plan, réception d'un message du script de contenu.")
    console.log(m.greeting);
  });
  
  browser.webRequest.onBeforeRequest.addListener(
	  listener,
	  {urls: [target1,target2]},
	  ["blocking"]
	);
}

browser.runtime.onConnect.addListener(connected);
//console.log("background");

function listener(responseDetails) {
  let filter = browser.webRequest.filterResponseData(responseDetails.requestId);
//console.log("listener : " + responseDetails.url+" : " + responseDetails.documentUrl);
//  var myURL = responseDetails.url;
  var myURL = responseDetails.documentUrl;
  var myWorld=myURL.split('.')[0].split('//')[1];
  if (responseDetails.url.indexOf("innogamescdn.com/start/metadata?id=city_entities") != -1)
	  myURL = "0"+myURL;
  
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();
  let mySTR = "";
  filter.onstart = event => {
	mySTR0[myWorld] = "";
//	console.log("listener start "+event.status);
  }
  filter.ondata = event => {
	mySTR = event.data;
	mySTR = decoder.decode(mySTR);
	mySTR0[myWorld] += mySTR;
//	console.log("listener data : "+mySTR.length + " : "+mySTR0.length);
	filter.write(event.data);
  }

  filter.onstop = event => {
//	console.log("listener stop "+event.status + " : "+mySTR0.length);
	filter.disconnect();
	if (portFromCS[myWorld])
		portFromCS[myWorld].postMessage({greeting: myURL+":::"+mySTR0[myWorld]});
	else 
		console.log("listener error "+myWorld + " : portFromCS undefined");
	mySTR0[myWorld] = "";
//	console.log("listener stop2 "+event.status + " : "+mySTR0.length);
  }

  filter.onerror = event => {
	console.log("listener error "+event.status + " : "+event.error);
  }  
}
