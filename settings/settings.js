var	defaultHisto = 50;
var	defaultColoTop = 16;
var	defaultColoLeft = 450;
var	defaultInfoTop = 16;
var	defaultInfoLeft = 530;
var	defaultGMTop = 16;
var	defaultGMLeft = 610;
var	defaultMapTop = 16;
var	defaultMapLeft = 690;

document.getElementById("titre").innerHTML = browser.i18n.getMessage("OptionTitre");
document.getElementById("summary1").innerHTML = browser.i18n.getMessage("OptionSummary1");
document.getElementById("boite1").innerHTML = browser.i18n.getMessage("OptionBoite1");
document.getElementById("label_activite").innerHTML = browser.i18n.getMessage("OptionLabel_Activite");
document.getElementById("label_infosGM").innerHTML = browser.i18n.getMessage("OptionLabel_InfosGM");
document.getElementById("label_colonies").innerHTML = browser.i18n.getMessage("OptionLabel_Colonies");
document.getElementById("label_reset_coord").innerHTML = browser.i18n.getMessage("OptionLabel_Reset_coord");
document.getElementById("summary2").innerHTML = browser.i18n.getMessage("OptionSummary2");
document.getElementById("boite2").innerHTML = browser.i18n.getMessage("OptionBoite2");
document.getElementById("label_carte").innerHTML = browser.i18n.getMessage("OptionLabel_Carte");
document.getElementById("donebutton").innerHTML = browser.i18n.getMessage("OptionDone");

function onError(error) {
    console.log(`Error: ${error}`);
}

function onGot(item) {
	if (item.activite) document.getElementById("activite").checked=item.activite;
	if (item.infosGM) document.getElementById("infosGM").checked=item.infosGM;
	if (item.colonies) document.getElementById("colonies").checked=item.colonies;
	if (item.carte) document.getElementById("carte").checked=item.carte;

//	document.getElementById("FOEHisto").value = item.FOEHisto;
}

function loadPrefWindow() {
		var getting = browser.storage.local.get({
						activite: true,
						infosGM: true,
						colonies: true,
						carte: false,
						ColoTop:defaultColoTop,
						ColoLeft:defaultColoLeft,
						InfoTop:defaultInfoTop,
						InfoLeft:defaultInfoLeft,
						GMTop:defaultGMTop,
						GMLeft:defaultGMLeft,
						MapTop:defaultMapTop,
						MapLeft:defaultMapLeft,
						FOEHisto: defaultHisto,
                        FOESession1: "",
                        FOESession2: "",
                        FOESession3: ""
					});
		getting.then(onGot, onError);
}
function setDefault() {
	url = document.getElementById("FOEHisto");
	url.value = defaultHisto;
}

// Save the settings and close the window.
function saveSettings(ex) {
	try {
		ex.preventDefault();
		browser.storage.local.set({activite: document.getElementById("activite").checked});
		browser.storage.local.set({infosGM: document.getElementById("infosGM").checked});
		browser.storage.local.set({colonies: document.getElementById("colonies").checked});
		browser.storage.local.set({carte: document.getElementById("carte").checked});
		if (document.getElementById("reset_coord").checked) {
			browser.storage.local.set({ColoTop: defaultColoTop});
			browser.storage.local.set({ColoLeft: defaultColoLeft});
			browser.storage.local.set({InfoTop: defaultInfoTop});
			browser.storage.local.set({InfoLeft: defaultInfoLeft});
			browser.storage.local.set({GMTop: defaultGMTop});
			browser.storage.local.set({GMLeft: defaultGMLeft});
			browser.storage.local.set({MapTop: defaultMapTop});
			browser.storage.local.set({MapLeft: defaultMapLeft});
		}

//		browser.storage.local.set({FOEHisto: document.getElementById("FOEHisto").value});

	} catch(e) {alert(e);}
}
document.addEventListener("DOMContentLoaded", loadPrefWindow);
document.getElementById("FOE_Settings").addEventListener("submit", saveSettings);
document.getElementById("FOE_Settings").addEventListener("button", setDefault);