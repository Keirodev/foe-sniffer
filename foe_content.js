var	defaultHisto = 50;
var	defaultColoTop = 16;
var	defaultColoLeft = 450;
var	defaultInfoTop = 16;
var	defaultInfoLeft = 530;
var	defaultGMTop = 16;
var	defaultGMLeft = 610;
var	defaultMapTop = 16;
var	defaultMapLeft = 690;

function onError(error) {
    console.log(`Error: ${error}`);
}

function onGot(item) {
	if (item.activite) GestionAmis[myWorld0]=item.activite;
	if (item.infosGM) GestionGM[myWorld0]=item.infosGM;
	if (item.colonies) GestionColonie[myWorld0]=item.colonies;
	if (item.carte) GestionCarte[myWorld0]=item.carte;
	if (item.ColoTop) ColoTop[myWorld0]=item.ColoTop*1;
	if (item.ColoLeft) ColoLeft[myWorld0]=item.ColoLeft*1;
	if (item.InfoTop) InfoTop[myWorld0]=item.InfoTop*1;
	if (item.InfoLeft) InfoLeft[myWorld0]=item.InfoLeft*1;
	if (item.GMTop) GMTop[myWorld0]=item.GMTop*1;
	if (item.GMLeft) GMLeft[myWorld0]=item.GMLeft*1;
	if (item.MapTop) MapTop[myWorld0]=item.MapTop*1;
	if (item.MapLeft) MapLeft[myWorld0]=item.MapLeft*1;
	if (ColoTop[myWorld0] < 0)
		ColoTop[myWorld0] = defaultColoTop;
	if (ColoLeft[myWorld0] < 0)
		ColoLeft[myWorld0] = defaultColoLeft;
	if (InfoTop[myWorld0] < 0)
		InfoTop[myWorld0] = defaultInfoTop;
	if (InfoLeft[myWorld0] < 0)
		InfoLeft[myWorld0] = defaultInfoLeft;
	if (GMTop[myWorld0] < 0)
		GMTop[myWorld0] = defaultGMTop;
	if (GMLeft[myWorld0] < 0)
		GMLeft[myWorld0] = defaultGMLeft;
	if (MapTop[myWorld0] < 0)
		MapTop[myWorld0] = defaultMapTop;
	if (MapLeft[myWorld0] < 0)
		MapLeft[myWorld0] = defaultMapLeft;
//	FOEHisto[myWorld0] = item.FOEHisto;
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
						FOEHisto: 50,
                        FOESession1: "",
                        FOESession2: "",
                        FOESession3: ""
					});
		getting.then(onGot, onError);
}

function SauveCoord() {
	// sauvedarde des coordonnées des boites
	for (var id_elem=1; id_elem<6; id_elem++) {
		var myId="foe-li"+id_elem+"-div";
		if (window.document.getElementById(myId)) {
			var mytop = 0;
			if (window.document.getElementById(myId).style.top)
				mytop=window.document.getElementById(myId).style.top.replace('px','')*1;
			var myleft = 0;
			if (window.document.getElementById(myId).style.left)
				myleft=window.document.getElementById(myId).style.left.replace('px','')*1;
			switch (id_elem) {
				case 1:
				// Info
					if (mytop != InfoTop[myWorld] || myleft != InfoLeft[myWorld]) {
						InfoTop[myWorld] = mytop;
						InfoLeft[myWorld] = myleft;
						browser.storage.local.set({InfoTop: mytop});
						browser.storage.local.set({InfoLeft: myleft});
					}
					break;
				case 3:
				// GM
					if (mytop != GMTop[myWorld] || myleft != GMLeft[myWorld]) {
						GMTop[myWorld] = mytop;
						GMLeft[myWorld] = myleft;
						browser.storage.local.set({GMTop: mytop});
						browser.storage.local.set({GMLeft: myleft});
					}
					break;
				case 4:
				// Colonie
					if (mytop != ColoTop[myWorld] || myleft != ColoLeft[myWorld]) {
						ColoTop[myWorld] = mytop;
						ColoLeft[myWorld] = myleft;
						browser.storage.local.set({ColoTop: mytop});
						browser.storage.local.set({ColoLeft: myleft});
					}
					break;
				case 5:
					if (mytop != MapTop[myWorld] || myleft != MapLeft[myWorld]) {
						MapTop[myWorld] = mytop;
						MapLeft[myWorld] = myleft;
						browser.storage.local.set({MapTop: mytop});
						browser.storage.local.set({MapLeft: myleft});
					}
					break;
			}
		}
	}
}

function UnicodeToAccent(myvar){
return myvar.replace(
                  /\\u([0-9a-f]{4})/gi, 
                  function (whole, group1) {
                      return String.fromCharCode(parseInt(group1, 16));
                  }
              );
}

function natsortTable(table){
	var heads,i=-1;
	table.onclick=function(event){
		var col=event.target;
		if(col.tagName=='TH'){
			var rowSelector=this.rows[0].getElementsByTagName('th')==null?1:0;
			var cols=this.rows[rowSelector].getElementsByTagName('th'),i=-1,j=0,k,elements=[],temp,node,results=[],current;
			while(cols[++i]!=col){}
			while(this.rows[++j]){
				node=this.rows[j].getElementsByTagName('td')[i];
				if(!node.hasOwnProperty('encodedValue')){
					k=-1;
					node.encodedValue=[];
					while(node.innerHTML[++k]){
						node.encodedValue.push(node.innerHTML.charCodeAt(k));
					}
				}
				elements.push(node);
			}
			i=0;
			results[0]=elements[0];
			while(elements[++i]){
				j=0;
				current=elements[i];
				while(current){
					k=-1;
					if(results[j]){
						if(!isNaN(current.innerHTML)&&!isNaN(results[j].innerHTML)){
							if(Number(current.innerHTML)<Number(results[j].innerHTML)){
								temp=results[j]||false;
								results[j]=current;
								current=temp;
							}
						}
						else if(current==elements[i]){
							if(current.encodedValue.length>=results[j].encodedValue.length){
								if(current.encodedValue.length==results[j].encodedValue.length){
									while(current==elements[i]&&current.encodedValue[++k]){
										if(current.encodedValue[k]<results[j].encodedValue[k]){
											temp=results[j]||false;
											results[j]=current;
											current=temp;
										}
										else if(current.encodedValue[k]>results[j].encodedValue[k]){
											k=current.encodedValue.length;
										}
									}
								}
							}
						}
						else{
							temp=results[j]||false;
							results[j]=current;
							current=temp;
						}
						j++;
					}
					else{
						results[j]=current;
						current=false;
					}
				}
			}
			if(col.ord=='DESC'){
				col.ord='ASC';
			}
			else{
				col.ord='DESC';
				results.reverse();
			}
			i=-1;
			node=this.getElementsByTagName('tbody')[0]||this;
			while(results[++i]){
				node.appendChild(results[i].parentNode);
			}
		}
	};
	i=-1;
	heads=table.getElementsByTagName('th');
	while(heads[++i]){
		heads[i].ord='DESC';
	}
}

function ChargeMap(){
// Initiliase map 
	if (myCityMap[myWorld]) {
//console.log(myWorld+" Initialise map1:"+(Date.now()/1000)+" "+myCityAffiche[myWorld]+"/"+renduMapNeeded[myWorld]+"/"+renduMapAeras[myWorld]+"/"+resetMapNeeded[myWorld]);					
		if (renduMapNeeded[myWorld] && CityTmp[myWorld]){
//console.log(myWorld+" Initialise map1:"+(Date.now()/1000)+" "+CityTmp[myWorld].length+"/"+myCityOri[myWorld].length);					
			// Ajout des positions batiments en fonction de leur taille
			var myCityTmp = CityTmp[myWorld];
			var myLengthTmp = myCityTmp.length;
			myCityTmp = [];
//console.log(myWorld+" Initialise map1:"+(Date.now()/1000)+" "+CityTmp[myWorld].length+"/"+myCityOri[myWorld].length+"/"+myLengthTmp);					
			for (var IndiceI=0; IndiceI<myLengthTmp; IndiceI++) {
				listCity=CityTmp[myWorld][IndiceI];
				if (listCity.cityentity_id) {
					var index = myCityMap[myWorld].findIndex(obj => obj.id==listCity.cityentity_id);
					if (index && index >= 0) {
						var mywidth  = 0;
						if (myCityMap[myWorld][index].width)
							mywidth  = myCityMap[myWorld][index].width*1;
						var mylength  = 0;
						if (myCityMap[myWorld][index].length)
							mylength  = myCityMap[myWorld][index].length*1;
//							var mynameBat=UnicodeToAccent(myCityMap[myWorld][index].name);
						var mynameBat=myCityMap[myWorld][index].name;
						var prodEnable=0;
						if (myCityMap[myWorld][index].available_products)
							prodEnable=myCityMap[myWorld][index].available_products.length;

						var CityMapX = 0;
						if (listCity.x)
							CityMapX = listCity.x*1;
						var CityMapY = 0;
						if (listCity.y)
							CityMapY = listCity.y*1;

						// mise à jour du nom de l'entité courante 
						var myIndice = IndiceI;
						CityTmp[myWorld][myIndice].name=mynameBat;
						CityTmp[myWorld][myIndice].x=CityMapX;
						CityTmp[myWorld][myIndice].y=CityMapY;
						CityTmp[myWorld][myIndice].prodEnable=prodEnable;
						
						for (var IndiceJ=1; IndiceJ<mywidth; IndiceJ++) {
							// ajoute 1 entité sur la largeur
							CityTmp[myWorld].push({
//								myCityTmp.push({
								cityentity_id:listCity.cityentity_id,
								id:listCity.id,
								x:(CityMapX+IndiceJ),
								y:CityMapY,
								type:listCity.type,
								name:mynameBat,
								connected:listCity.connected,
								state:listCity.state,
								prodEnable:prodEnable
							});
//console.log(myWorld+" Initialise push1:"+CityTmp[myWorld].length+"/"+myCityOri[myWorld].length);					
						}
						for (var IndiceJ=1; IndiceJ<mylength; IndiceJ++) {
							// ajoute 1 entité sur la longueur
							CityTmp[myWorld].push({
//								myCityTmp.push({
								cityentity_id:listCity.cityentity_id,
								id:listCity.id,
								x:CityMapX,
								y:(CityMapY+IndiceJ),
								type:listCity.type,
								name:mynameBat,
								connected:listCity.connected,
								state:listCity.state,
								prodEnable:prodEnable
							});
//console.log(myWorld+" Initialise push2:"+CityTmp[myWorld].length+"/"+myCityOri[myWorld].length);					
							for (var IndiceK=1; IndiceK<mywidth; IndiceK++) {
								// ajoute 1 entité sur la largeur
								CityTmp[myWorld].push({
//									myCityTmp.push({
									cityentity_id:listCity.cityentity_id,
									id:listCity.id,
									x:(CityMapX+IndiceK),
									y:(CityMapY+IndiceJ),
									type:listCity.type,
									name:mynameBat,
									connected:listCity.connected,
									state:listCity.state,
									prodEnable:prodEnable
								});
//console.log(myWorld+" Initialise push3:"+CityTmp[myWorld].length+"/"+myCityOri[myWorld].length);					
							}
						}
					}
				}
			}
//				CityTmp[myWorld] = myCityTmp;
//console.log(myWorld+" Initialise map2:"+(Date.now()/1000)+" "+CityTmp[myWorld].length+"/"+myCityOri[myWorld].length);					

			// on trie sur les coordonnées x/y
			CityTmp[myWorld].sort(function(ligne1, ligne2) {
				var myX1 = 0; 
				var myY1 = 0;
				if (ligne1.x) myX1=ligne1.x*1;
				if (ligne1.y) myY1=ligne1.y*1;
				var myX2 = 0; 
				var myY2 = 0;
				if (ligne2.x) myX2=ligne2.x*1;
				if (ligne2.y) myY2=ligne2.y*1;
				return ((myY1*100)+myX1) - ((myY2*100) + myX2);
			});

//console.log(myWorld+" Initialise map3:"+(Date.now()/1000)+" "+CityTmp[myWorld].length+"/"+myCityOri[myWorld].length);					

			if (renduMapAeras[myWorld]) {
				renduMapAeras[myWorld] = false;
				// Complement 4x4 Aera
				var myCityTmp = AerasTmp[myWorld];
				var myLengthTmp = myCityTmp.length;
				for (var IndiceI=0; IndiceI<myLengthTmp; IndiceI++) {
					listCity=AerasTmp[myWorld][IndiceI];
					var mywidth  = 0;
					if (listCity.width)
						mywidth  = listCity.width * 1;
					var mylength  = 0;
					if (listCity.length)
						mylength  = listCity.length * 1;
					var CityMapX = 0;
					if (listCity.x)
						CityMapX = listCity.x*1;
					var CityMapY = 0;
					if (listCity.y)
						CityMapY = listCity.y*1;
//console.log("Aera:"+CityMapX+"/"+CityMapY+","+mywidth+"x"+mylength);
					// mise à jour du nom de l'entité courante 
					var myIndice = IndiceI;
					AerasTmp[myWorld][myIndice].x=CityMapX;
					AerasTmp[myWorld][myIndice].y=CityMapY;
					
					for (var IndiceJ=1; IndiceJ<mywidth; IndiceJ++) {
						// ajoute 1 entité sur la largeur
						AerasTmp[myWorld].push({
							x:(CityMapX+IndiceJ),
							y:CityMapY,
						});
					}
					for (var IndiceJ=1; IndiceJ<mylength; IndiceJ++) {
						// ajoute 1 entité sur la longueur
						AerasTmp[myWorld].push({
							x:CityMapX,
							y:(CityMapY+IndiceJ),
						});
						for (var IndiceK=1; IndiceK<mywidth; IndiceK++) {
							// ajoute 1 entité sur la largeur
							AerasTmp[myWorld].push({
								x:(CityMapX+IndiceK),
								y:(CityMapY+IndiceJ),
							});
						}
					}
				}
				AerasTmp[myWorld].sort(function(ligne1, ligne2) {
					var myX1 = 0; 
					var myY1 = 0;
					if (ligne1.x) myX1=ligne1.x*1;
					if (ligne1.y) myY1=ligne1.y*1;
					var myX2 = 0; 
					var myY2 = 0;
					if (ligne2.x) myX2=ligne2.x*1;
					if (ligne2.y) myY2=ligne2.y*1;
					return ((myY1*100)+myX1) - ((myY2*100) + myX2);
				});

				// Complement 4x4 Block
				if (bFirstTime[myWorld]) {
					var myCityTmp = myBlock[myWorld];
					var myLengthTmp = myCityTmp.length;
					for (var IndiceI=0; IndiceI<myLengthTmp; IndiceI++) {
						listCity=myBlock[myWorld][IndiceI];
						var mywidth  = 4;
						var mylength  = 4;
						var CityMapX = 0;
						if (listCity.x)
							CityMapX = listCity.x*1;
						var CityMapY = 0;
						if (listCity.y)
							CityMapY = listCity.y*1;
//console.log("Aera:"+CityMapX+"/"+CityMapY+","+mywidth+"x"+mylength);
						// mise à jour du nom de l'entité courante 
						var myIndice = IndiceI;
						myBlock[myWorld][myIndice].x=CityMapX;
						myBlock[myWorld][myIndice].y=CityMapY;
						
						for (var IndiceJ=1; IndiceJ<mywidth; IndiceJ++) {
							// ajoute 1 entité sur la largeur
							myBlock[myWorld].push({
								x:(CityMapX+IndiceJ),
								y:CityMapY,
							});
						}
						for (var IndiceJ=1; IndiceJ<mylength; IndiceJ++) {
							// ajoute 1 entité sur la longueur
							myBlock[myWorld].push({
								x:CityMapX,
								y:(CityMapY+IndiceJ),
							});
							for (var IndiceK=1; IndiceK<mywidth; IndiceK++) {
								// ajoute 1 entité sur la largeur
								myBlock[myWorld].push({
									x:(CityMapX+IndiceK),
									y:(CityMapY+IndiceJ),
								});
							}
						}
					}
					myBlock[myWorld].sort(function(ligne1, ligne2) {
						var myX1 = 0; 
						var myY1 = 0;
						if (ligne1.x) myX1=ligne1.x*1;
						if (ligne1.y) myY1=ligne1.y*1;
						var myX2 = 0; 
						var myY2 = 0;
						if (ligne2.x) myX2=ligne2.x*1;
						if (ligne2.y) myY2=ligne2.y*1;
						return ((myY1*100)+myX1) - ((myY2*100) + myX2);
					});
				}
				// Complement 4x4 Block Colonie
				if (MargeColX[myWorld] !=0 ) {
					var myCityTmp = myBlockCol[myWorld];
					var myLengthTmp = myCityTmp.length;
					for (var IndiceI=0; IndiceI<myLengthTmp; IndiceI++) {
						listCity=myBlockCol[myWorld][IndiceI];
						var mywidth  = 4;
						var mylength  = 4;
						var CityMapX = 0;
						if (listCity.x)
							CityMapX = listCity.x*1;
						var CityMapY = 0;
						if (listCity.y)
							CityMapY = listCity.y*1;
//console.log("Aera:"+CityMapX+"/"+CityMapY+","+mywidth+"x"+mylength);
						// mise à jour du nom de l'entité courante 
						var myIndice = IndiceI;
						myBlockCol[myWorld][myIndice].x=CityMapX;
						myBlockCol[myWorld][myIndice].y=CityMapY;
						
						for (var IndiceJ=1; IndiceJ<mywidth; IndiceJ++) {
							// ajoute 1 entité sur la largeur
							myBlockCol[myWorld].push({
								x:(CityMapX+IndiceJ),
								y:CityMapY,
							});
						}
						for (var IndiceJ=1; IndiceJ<mylength; IndiceJ++) {
							// ajoute 1 entité sur la longueur
							myBlockCol[myWorld].push({
								x:CityMapX,
								y:(CityMapY+IndiceJ),
							});
							for (var IndiceK=1; IndiceK<mywidth; IndiceK++) {
								// ajoute 1 entité sur la largeur
								myBlockCol[myWorld].push({
									x:(CityMapX+IndiceK),
									y:(CityMapY+IndiceJ),
								});
							}
						}
					}
					myBlockCol[myWorld].sort(function(ligne1, ligne2) {
						var myX1 = 0; 
						var myY1 = 0;
						if (ligne1.x) myX1=ligne1.x*1;
						if (ligne1.y) myY1=ligne1.y*1;
						var myX2 = 0; 
						var myY2 = 0;
						if (ligne2.x) myX2=ligne2.x*1;
						if (ligne2.y) myY2=ligne2.y*1;
						return ((myY1*100)+myX1) - ((myY2*100) + myX2);
					});
				}
			}
			// On sauvegarde en cache
			if (myCityAffiche[myWorld]) {
				myAreas[myWorld] = AerasTmp[myWorld];
			}
//console.log(myWorld+" Initialise map5:"+(Date.now()/1000)+" "+CityTmp[myWorld].length+"/"+myCityOri[myWorld].length);					
		}
		// Construction de la map
		if (CityTmp[myWorld] && renduMapNeeded[myWorld] && !bWorkInProgress[myWorld]) {
			bWorkInProgress[myWorld] = true;
			myMapHTML[myWorld]="<table>";
			var blockInd = 0;
			var cityInd = 0;
			var areaInd = 0;
			var BorneX = 64;
			var BorneY = 64;
			var SuffixeCol = "";
			if (MargeColX[myWorld] != 0) {
				BorneX = 28;
				BorneY = 28;
				SuffixeCol = "col";
			}
			
			
			for (var mapY=0; mapY<BorneY; mapY++) {
				// Nouvelle ligne
				myMapHTML[myWorld] += "<tr>";
				for (var mapX=0; mapX<BorneX; mapX++) {
					// Nouvelle colonne 
					var myClass= 'tdmap';
					var myTitle= '';
					var myTagName = '';
					var btrouve = false;
					// Cherche dans City
					for (var bB=cityInd; bB<CityTmp[myWorld].length; bB++) {
						if ((CityTmp[myWorld][bB].x - MargeColX[myWorld]) == mapX && (CityTmp[myWorld][bB].y - MargeColY[myWorld]) == mapY) {
							var mynameBat=CityTmp[myWorld][bB].cityentity_id;
							if (CityTmp[myWorld][bB].name)
								mynameBat=CityTmp[myWorld][bB].name;

							myClass = 'tdbrown';
							myTitle = mynameBat+' ('+mapX+'/'+mapY+')';
//								myTagName = ' name="'+CityTmp[myWorld][bB].cityentity_id+'-'+mapX+'-'+mapY+'"';
							myTagName = ' name="'+CityTmp[myWorld][bB].cityentity_id+'-'+CityTmp[myWorld][bB].id+'"';
							
							if (CityTmp[myWorld][bB].type == "street")
								myClass="tdstreet";
							else {
//console.log("X/Y="+mapX+"/"+mapY+":"+myTitle+" "+CityTmp[myWorld][bB].type);			
								switch (CityTmp[myWorld][bB].type) {
									  case 'production':
									// colonies											  
									  case 'cultural_goods_production': // production hache etc
										myClass = "tdprod";
										break;
									  case 'goods':
										myClass = "tdgood";
										break;
									  case 'residential':
										myClass = "tdhouse";
										break;
									  case 'military':
									  case 'diplomacy':					// sanctuaire
										myClass = "tdmil";
										break;
									  case 'greatbuilding':
										myClass = "tdgb";
										break;
									  case 'main_building':
										myClass = "tdtown";
										break;
									  case 'random_production':
									  case 'tower':
									  case 'culture':
									  case 'decoration':
										myClass = 'tddeco';
										break;
									  default:
										myClass = 'tdbrown';
										break;
									  
								}
								
								if (CityTmp[myWorld][bB].state && CityTmp[myWorld][bB].state.__class__) {
//										myState = CityTmp[myWorld][bB].state;
//									if (myState.__class__ == 'ConstructionState' || myState.__class__ == 'UnconnectedState')
//										myClass = "tdorange";
//									else {
//										if ((CityTmp[myWorld][bB].type=="production" || 
//											CityTmp[myWorld][bB].type=="residential" || 
//											CityTmp[myWorld][bB].type=="military" || 
//											CityTmp[myWorld][bB].type=="diplomacy" || 
//											CityTmp[myWorld][bB].type=="goods" || 
//											CityTmp[myWorld][bB].type=="greatbuilding") && 
//											CityTmp[myWorld][bB].state) {
									switch (CityTmp[myWorld][bB].state.__class__) {
									  case 'ProductionFinishedState':
									// prod terminée
										myClass = "tdred";
										break;
									  case 'ConstructionState':
									  case 'UnconnectedState':
										myClass = "tdorange";
										break;
									  case 'IdleState':
										if (CityTmp[myWorld][bB].prodEnable > 0 && CityTmp[myWorld][bB].type!="greatbuilding")
											myClass = "tdyellow";
										break;
									}
								}
							}
						
							cityInd = bB;
							btrouve = true;
							break;							
						}
					}

					if (!btrouve) {
						// Sinon Cherche dans unlock 
						for (var bB=areaInd; bB<AerasTmp[myWorld].length; bB++) {
							if ((AerasTmp[myWorld][bB].x - MargeColX[myWorld]) == mapX && (AerasTmp[myWorld][bB].y - MargeColY[myWorld]) == mapY) {
								myClass = 'tdgreen';
								areaInd = bB;
								btrouve = true;
								break;							
							}
						}
					}
					if (!btrouve) {
						// Sinon Cherche dans block 
						if (MargeColX[myWorld] == 0) {
							for (var bB=blockInd; bB<myBlock[myWorld].length; bB++) {
								if ((myBlock[myWorld][bB].x - MargeColX[myWorld]) == mapX && (myBlock[myWorld][bB].y - MargeColY[myWorld]) == mapY) {
									myClass = 'tdblack';
									blockInd = bB;
									btrouve = true;
									break;							
								}
							}
						} else {
							for (var bB=blockInd; bB<myBlockCol[myWorld].length; bB++) {
								if ((myBlockCol[myWorld][bB].x - MargeColX[myWorld]) == mapX && (myBlockCol[myWorld][bB].y - MargeColY[myWorld]) == mapY) {
									myClass = 'tdblack';
									blockInd = bB;
									btrouve = true;
									break;							
								}
							}
						}
					}
					myMapHTML[myWorld] += '<td class="'+myClass+SuffixeCol+'"'+myTagName+' title="'+myTitle+'"'+'></td>';
				}
				myMapHTML[myWorld] += '</tr>';
			}
			myMapHTML[myWorld] += '</table>';
			// On sauvegarde en cache
			if (myCityAffiche[myWorld]) {
				myCity[myWorld] = myMapHTML[myWorld];
			}
			// on reinit la variable pour ne passer qu'une fois dans le traitement
			CityTmp[myWorld] = null;
			bWorkInProgress[myWorld] = false;
//console.log("myMapHTML[myWorld]:"+myMapHTML[myWorld]);			
		}
		if (window.document.getElementById("foe-map") && renduMapNeeded[myWorld]) {
			renduMapNeeded[myWorld] = false;
			if (MargeColX[myWorld] && MargeColX[myWorld] !=0 ) {
				// Légende colonies
				window.document.getElementById("foe-legende-map").innerHTML = window.document.getElementById("foe-legende-map").innerHTML.replace(browser.i18n.getMessage("Militaires"),browser.i18n.getMessage("Diplomatie"));
			} else {
				// Légende map
				window.document.getElementById("foe-legende-map").innerHTML = window.document.getElementById("foe-legende-map").innerHTML.replace(browser.i18n.getMessage("Diplomatie"),browser.i18n.getMessage("Militaires"));
			}
			window.document.getElementById("foe-map").innerHTML = myMapHTML[myWorld];
		}
//console.log(myWorld+" Initialise mapFin:"+(Date.now()/1000)+" "+myCityAffiche[myWorld]+"/"+renduMapNeeded[myWorld]+"/"+renduMapAeras[myWorld]+"/"+resetMapNeeded[myWorld]);					
	}
}

var myReceipt = "";
var cptPlayer = -1;
var cptFriend = -1;
var playerID = [];
var playerArray = {'-1':{'Nom':'-1','Rang':0,'Membre':-1,'PoliMoti':-1,'Taverne':-1,'AttaqueOK':-1,'AttaqueKO':-1}};
var friendArray = {0:{'PlayerID':'-1','Nom':'','Membre':-1}};
var myName = [];
var myID = [];
var myWorld0 = "";
var myWorld = "";
var GMinvested = 0;
var GMtoUP = 0;
var GMrestant = 0;
var GMInvest = [0,0,0,0,0];
var GMNom = ['','','','',''];
var GMBloque = [0,0,0,0,0];
var GMBonus = [0,0,0,0,0];
var GMBloque0 = [0,0,0,0,0];
var GMBloque05 = [0,0,0,0,0];
var GMBloque1 = [0,0,0,0,0];
var GMBloque15 = [0,0,0,0,0];
var GMBloque2 = [0,0,0,0,0];
var GMBloque25 = [0,0,0,0,0];
var GMBloque3 = [0,0,0,0,0];
var GMBloque35 = [0,0,0,0,0];
var GMBloque4 = [0,0,0,0,0];
var GMBloque45 = [0,0,0,0,0];
var GMBloque5 = [0,0,0,0,0];
var GMBloque55 = [0,0,0,0,0];
var GMBloque6 = [0,0,0,0,0];
var GMBloque65 = [0,0,0,0,0];
var GMBloque7 = [0,0,0,0,0];
var GMBloque75 = [0,0,0,0,0];
var GMBloque8 = [0,0,0,0,0];
var GMBloque85 = [0,0,0,0,0];
var GMBloque9 = [0,0,0,0,0];
var GMBloque95 = [0,0,0,0,0];
var GMBloque100 = [0,0,0,0,0];
var GMPerso = false;
var GMInvestJoueur = 0;
var myArche = [];
var myMapHTML = [];
var myCityMap = [];
var myCityOri = [];
var myColoOri = [];
//var myCityOri = new Object();
//var CityTmp = [];
var CityTmp = new Object();
var myCity = [];
var myBlock = [];
var myBlockCol = [];
var BlockTmp = [];
var myAreas = [];
var myAreasCol = [];
var AerasTmp = [];
var resetMapNeeded = [];
var renduMapNeeded = [];
var renduMapAeras = [];
var myCityAffiche = [];
var bWorkInProgress = [];
var bFirstTime = [];
var MargeColX = [];
var MargeColY = [];
var GestionColonie = [];
var GestionAmis = [];
var GestionGM = [];
var GestionCarte = [];
var ColoTop = [];
var ColoLeft = [];
var InfoTop = [];
var InfoLeft = [];
var GMTop = [];
var GMLeft = [];
var MapTop = [];
var MapLeft = [];
var Incident = [];


if (window.document.location.toString().indexOf("forgeofempires.com/game/index")>0) {
	myWorld0=window.document.location.toString().split('.')[0].split('//')[1];
//console.log(window.navigator.language);
	loadPrefWindow();
	var myPort = browser.runtime.connect({name:"foe_sniffer_port"+myWorld0});
	myPort.onMessage.addListener(function(m) {
		var url = m.greeting.split(':::')[0];
		var c = m.greeting.substr(m.greeting.indexOf(":::")+3);
		myWorld = url.split('.')[0].split('//')[1];

		if (!myArche[myWorld]) {
			myArche[myWorld] = {'Level':-1,'PF':'0/0','Bonus':1};
			bFirstTime[myWorld] = true;
		}

//		if (GestionCarte[myWorld] && !myCityMap[myWorld] && url[0]=="0") {
		if (!myCityMap[myWorld] && url[0]=="0") {
			// on charge le dictionnaire dans une variable
			myCityMap[myWorld] =JSON.parse(c);
			ChargeMap();
			bFirstTime[myWorld] = false;
//console.log(myWorld+" Initialise Dico:"+(Date.now()/1000)+" "+myCityMap[myWorld].length);
			return;
		}
		
		if (window.document.getElementById("div_foe_sniffer")==null) {
			var myHead = window.document.getElementsByTagName("head")[0];
			var myLink = document.createElement("link");
			myLink.setAttribute("rel","stylesheet");
			myLink.setAttribute("href",browser.extension.getURL("images")+"/foe_menu.css");
			myHead.appendChild(myLink);
			
			var myBody = window.document.getElementsByTagName("body")[0];
			myLink = document.createElement("script");
			myLink.setAttribute("type","text/javascript");
			myLink.innerHTML = `// Gestion affichage des box
function affiche(id_div) {
	if (!document.getElementById(id_div) ||
		(document.getElementById(id_div).style.display=="none" || document.getElementById(id_div).style.display=="")) {
		// on rend invisible les autres boxs actives
		for (var ind_li=1; ind_li<6; ind_li++) {
			if ("foe-li"+ind_li+"-div" != id_div &&
				document.getElementById("foe-li"+ind_li+"-div") &&
				document.getElementById("foe-li"+ind_li+"-div").style.display=="block")
				document.getElementById("foe-li"+ind_li+"-div").style.display="none";
		}
		// on active la box
		if (document.getElementById(id_div))
			document.getElementById(id_div).style.display="block"; 
//	} else {
//		// on rend invisible la box
//		document.getElementById(id_div).style.display="none";
	}
}
`;
//			myLink.setAttribute("src",browser.extension.getURL("scripts")+"/foe_script.js");
			myBody.appendChild(myLink);
			var myDivFS = document.createElement("div");
			myDivFS.setAttribute("id","div_foe_sniffer");
			myDivFS.setAttribute("class","fs_div");
			var myUl = document.createElement("ul");
			myUl.setAttribute("id","menu_foe_top");

			var myLi;
			var myDiv;
			var myUl2;
			var myLi2;
			var myTable;
			var myTr;
			var myTd;
			
			if (GestionColonie[myWorld]) {
				myLi = document.createElement("li");
				myLi.setAttribute("id","foe-li4");
				
				myDiv = document.createElement("span");
				myDiv.setAttribute("id","foe-info-colonie");
				myDiv.setAttribute("onmouseover","return affiche('foe-li4-div');");
				myDiv.innerHTML = '\u00a0'+browser.i18n.getMessage("Colonies")+'\u00a0';
				myLi.appendChild(myDiv);
//				myUl2 = document.createElement("ul");
				myLi2 = document.createElement("div");
				myLi2.setAttribute("class",'cldiv');
				myLi2.setAttribute("style",'width:425px; top: '+ColoTop[myWorld]+'px; left: '+ColoLeft[myWorld]+'px;');
				myLi2.setAttribute("id","foe-li4-div");
				myDiv = document.createElement("div");
				myDiv.setAttribute("id","foe-colonie");
				myDiv.setAttribute("style",'overflow-y:auto; overflow-x:auto; height:auto; max-height:350px; width:auto; max-width:1000px; font: 10px "Verdana"; position: relative; top:46px; border-width:1px; border-style:solid; border-color:rgb(240, 229, 174); background-color:rgb(90,50,26);');
				myDiv.innerHTML = browser.i18n.getMessage("Colonies");
				myLi2.appendChild(myDiv);
//				myUl2.appendChild(myLi2);
//				myLi.appendChild(myUl2);
//				myLi.appendChild(myLi2);
				myDivFS.appendChild(myLi2);
				myUl.appendChild(myLi);
			}

			myLi = document.createElement("li");
			myLi.setAttribute("id","foe-li1");
			
			myDiv = document.createElement("span");
			myDiv.setAttribute("id","foe-info-global");
			myDiv.setAttribute("onmouseover","return affiche('foe-li1-div');");
			myDiv.innerHTML = '\u00a0('+myWorld+')\u00a0';
			myLi.appendChild(myDiv);
			if (GestionAmis[myWorld]) {

//				myUl2 = document.createElement("ul");
				myLi2 = document.createElement("div");
				myLi2.setAttribute("class",'cldiv');
				myLi2.setAttribute("style",'width:615px; top: '+InfoTop[myWorld]+'px; left: '+InfoLeft[myWorld]+'px;');
				myLi2.setAttribute("id","foe-li1-div");
				myDiv = document.createElement("textarea");
				myDiv.setAttribute("id","foe-info-area");
				myLi2.appendChild(myDiv);
				
				myDiv = document.createElement("button");
				myDiv.setAttribute("id","foe-info-btn-clk");
				myDiv.setAttribute("style",'overflow-y:auto; overflow-x:auto; height:auto; max-height:640px; width:auto; max-width:1000px; font: 10px "Verdana"; position: relative; top:46px; border-width:1px; border-style:solid; border-color:rgb(240, 229, 174); background-color:rgb(90,50,26);');
				myDiv.innerHTML = '\u00a0'+browser.i18n.getMessage("Tout_copier")+'\u00a0';
				myLi2.appendChild(myDiv);
				myDiv = document.createElement("script");
				myDiv.setAttribute("type","text/javascript");
				myDiv.innerHTML = `
document.getElementById("foe-info-btn-clk").onclick =function() {
document.getElementById('foe-info-area').innerHTML = document.getElementById('foe-info').innerHTML;
document.getElementById('foe-info-area').select();
document.execCommand( 'copy' );
}`;
				myLi2.appendChild(myDiv);
			
				myDiv = document.createElement("div");
				myDiv.setAttribute("id","foe-info");
				myDiv.setAttribute("style",'overflow-y:auto; height:auto; max-height:571px; width:615px; max-width:615px; font: 10px "Verdana"; position: relative; top:46px; border-width:1px; border-style:solid; border-color:rgb(240, 229, 174); background-color:rgb(90,50,26);');
				myDiv.innerHTML = "\u00a0";
				myLi2.appendChild(myDiv);
//				myUl2.appendChild(myLi2);
//				myLi.appendChild(myUl2);
//				myLi.appendChild(myLi2);
				myDivFS.appendChild(myLi2);
			}
			myUl.appendChild(myLi);


			if (GestionGM[myWorld]) {
				myLi = document.createElement("li");
				myLi.setAttribute("id","foe-li3");
				
				myDiv = document.createElement("span");
				myDiv.setAttribute("id","foe-info-GM2");
				myDiv.setAttribute("onmouseover","return affiche('foe-li3-div');");
				myDiv.innerHTML = '\u00a0'+browser.i18n.getMessage("Infos_GM")+'\u00a0';
				myLi.appendChild(myDiv);
//				myUl2 = document.createElement("ul");
				myLi2 = document.createElement("div");
				myLi2.setAttribute("class",'cldiv');
				myLi2.setAttribute("style",'width:615px; top: '+GMTop[myWorld]+'px; left: '+GMLeft[myWorld]+'px;');
//				myLi2.setAttribute("style",'left: -40px; height:640px;');
				myLi2.setAttribute("id","foe-li3-div");
				myDiv = document.createElement("div");
				myDiv.setAttribute("id","foe-GM2");
				myDiv.setAttribute("style",'overflow-y:auto; overflow-x:auto; height:auto; max-height:300px; width:auto; max-width:1000px; font: 10px "Verdana"; position: relative; top:46px; border-width:1px; border-style:solid; border-color:rgb(240, 229, 174); background-color:rgb(90,50,26);');
				myDiv.innerHTML = browser.i18n.getMessage("Infos_GM");
				myLi2.appendChild(myDiv);
//				myUl2.appendChild(myLi2);
//				myLi.appendChild(myUl2);
//				myLi.appendChild(myLi2);
				myDivFS.appendChild(myLi2);
				myUl.appendChild(myLi);
			}

			if (GestionCarte[myWorld]) {
				myLi = document.createElement("li");
				myLi.setAttribute("id","foe-li5");
				
				myDiv = document.createElement("span");
				myDiv.setAttribute("id","foe-info-map");
				myDiv.setAttribute("onmouseover","return affiche('foe-li5-div');");
				myDiv.innerHTML = '\u00a0'+browser.i18n.getMessage("Infos_Carte")+'\u00a0';
				myLi.appendChild(myDiv);
//				myUl2 = document.createElement("ul");
				myLi2 = document.createElement("div");
				myLi2.setAttribute("class",'cldiv');
//				myLi2.setAttribute("style",'left: -40px; border:0; background:transparent; height:720px; width:543px;');
//				myLi2.setAttribute("style",'position: absolute; left: 0px; border:0; background:transparent; height:95vh; width:100%;');
//				myLi2.setAttribute("style",'position: relative; left: -500px; border:0; background:transparent; height:95vh; width:100%;');
//				myLi2.setAttribute("style",'top: '+MapTop[myWorld]+'px; left: '+MapLeft[myWorld]+'px; width: '+(442 + MapLeft[myWorld])+'px; height:95vh;');
				myLi2.setAttribute("style",'top: '+MapTop[myWorld]+'px; left: '+MapLeft[myWorld]+'px;');
				myLi2.setAttribute("id","foe-li5-div");
				myDiv = document.createElement("div");
				myDiv.setAttribute("id","foe-div-map");
//				myDiv.setAttribute("style",'overflow-y:auto; overflow-x:auto; height:auto; max-height:95vh; width:440px; max-width:440px; font: 10px "Verdana"; position: relative; top:46px; border-width:1px; border-style:solid; border-color:rgb(240, 229, 174); background-color:rgb(90,50,26);');
				myDiv.setAttribute("style",'overflow-y:auto; overflow-x:auto; height:auto; max-height:95vh; width:440px; max-width:440px; font: 10px "Verdana"; position: relative; top:46px; left: 0px; border-width:1px; border-style:solid; border-color:rgb(240, 229, 174); background-color:rgb(90,50,26);');
				var myDiv2 = document.createElement("div");
				myDiv2.setAttribute("id","foe-map");
				myDiv2.innerHTML = browser.i18n.getMessage("Infos_Carte");
				myDiv.appendChild(myDiv2);

				myDiv2 = document.createElement("span");
				myDiv2.setAttribute("id","foe-legende-map");
//				myDiv2.setAttribute("style",'overflow-y:auto; overflow-x:auto; height:auto; max-height:95vh; width:440px; max-width:440px; font: 10px "Verdana"; position: relative; top: 30px; border-width:1px; border-style:solid; border-color:rgb(240, 229, 174); background-color:rgb(90,50,26);');
//				myDiv2.setAttribute("style",'position: relative; border-width:1px; border-style:solid; border-color:rgb(240, 229, 174); background-color:rgb(90,50,26);');
				myTable = document.createElement("table");
				myTable.setAttribute("style","background-color:rgb(90,50,26);");
				
				myTr = document.createElement("tr");
				myTd = document.createElement("th");
				myTd.setAttribute("class","tdmap");
				myTr.appendChild(myTd);
				myTd = document.createElement("th");
				myTd.setAttribute("style","width:210px;");
				myTd.innerHTML = browser.i18n.getMessage("Legende");

				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("class","tdgreen");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:211px;");
				myTd.innerHTML = browser.i18n.getMessage("Place_disponible");
				myTr.appendChild(myTd);
				myTable.appendChild(myTr);
				
				myTr = document.createElement("tr");
				myTd = document.createElement("td");
				myTd.setAttribute("class","tdyellow");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:210px;");
				myTd.innerHTML = browser.i18n.getMessage("Production_en_attente");
				myTr.appendChild(myTd);
				
				myTd = document.createElement("td");
				myTd.setAttribute("class","tdred");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:211px;");
				myTd.innerHTML = browser.i18n.getMessage("Production_terminee");
				myTr.appendChild(myTd);
				myTable.appendChild(myTr);

				myTr = document.createElement("tr");
				myTd = document.createElement("td");
				myTd.setAttribute("class","tdorange");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:210px;");
				myTd.innerHTML = browser.i18n.getMessage("Deconnecte");
				myTr.appendChild(myTd);
				
				myTd = document.createElement("td");
				myTd.setAttribute("class","tdstreet");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:211px;");
				myTd.innerHTML = browser.i18n.getMessage("Route");
				myTr.appendChild(myTd);
				myTable.appendChild(myTr);
				
				myTr = document.createElement("tr");
				myTd = document.createElement("td");
				myTd.setAttribute("class","tdtown");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:210px;");
				myTd.innerHTML = browser.i18n.getMessage("Hotel_de_ville");
				myTr.appendChild(myTd);
				
				myTd = document.createElement("td");
				myTd.setAttribute("class","tdhouse");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:211px;");
				myTd.innerHTML = browser.i18n.getMessage("Residentiels");
				myTr.appendChild(myTd);
				myTable.appendChild(myTr);

				myTr = document.createElement("tr");
				myTd = document.createElement("td");
				myTd.setAttribute("class","tdprod");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:210px;");
				myTd.innerHTML = browser.i18n.getMessage("Productions");
				myTr.appendChild(myTd);
				
				myTd = document.createElement("td");
				myTd.setAttribute("class","tdgood");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:211px;");
				myTd.innerHTML = browser.i18n.getMessage("Ressources");
				myTr.appendChild(myTd);
				myTable.appendChild(myTr);

				myTr = document.createElement("tr");
				myTd = document.createElement("td");
				myTd.setAttribute("class","tdmil");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:210px;");
				myTd.innerHTML = browser.i18n.getMessage("Militaires");
				myTr.appendChild(myTd);
				
				myTd = document.createElement("td");
				myTd.setAttribute("class","tdgb");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:211px;");
				myTd.innerHTML = browser.i18n.getMessage("Grands_Monuments");
				myTr.appendChild(myTd);
				myTable.appendChild(myTr);

				myTr = document.createElement("tr");
				myTd = document.createElement("td");
				myTd.setAttribute("class","tddeco");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:210px;");
				myTd.innerHTML = browser.i18n.getMessage("Decorations");
				myTr.appendChild(myTd);
				
				myTd = document.createElement("td");
				myTd.setAttribute("class","tdbrown");
				myTr.appendChild(myTd);
				myTd = document.createElement("td");
				myTd.setAttribute("style","width:211px;");
				myTd.innerHTML = browser.i18n.getMessage("Place_occupee");
				myTr.appendChild(myTd);
				myTable.appendChild(myTr);
				

				myTable.appendChild(myTr);

/*
. {
. {
. {
. {
.tdmil {
.tdgb {
*/						
				myDiv2.appendChild(myTable);
				myDiv.appendChild(myDiv2);
				myLi2.appendChild(myDiv);
//				myUl2.appendChild(myLi2);
//				myLi.appendChild(myUl2);
//				myLi.appendChild(myLi2);
				myDivFS.appendChild(myLi2);
				myUl.appendChild(myLi);
			}
			
			myLi = document.createElement("li");
			myLi.setAttribute("id","foe-li6");
			myLi.setAttribute("style","position: relative;top: 3px; height:16px;");
			myLi.setAttribute("onmouseover","return affiche('-');");

			myDiv = document.createElement("input");
			myDiv.setAttribute("id","foe-visible");
			myDiv.setAttribute("style","position: relative;top: -1px;");
			myDiv.setAttribute("type","checkbox");
			myLi.appendChild(myDiv);
			myDiv = document.createElement("label");
			myDiv.setAttribute("for","foe-visible");
			myDiv.setAttribute("style","position: relative;top: -3px;");
			myDiv.innerHTML = '\u00a0'+browser.i18n.getMessage("Cache")+'\u00a0';
			myLi.appendChild(myDiv);

			myDiv = document.createElement("script");
			myDiv.setAttribute("type","text/javascript");
			myDiv.innerHTML = `//Coche/Décoche visible
document.getElementById("foe-visible").onchange =function() {
	for (var ind_li=1; ind_li<6; ind_li++) {
		if (document.getElementById("foe-li"+ind_li+"-div") &&
			document.getElementById("foe-li"+ind_li+"-div").style.display=="block")
			document.getElementById("foe-li"+ind_li+"-div").style.display="none";
			
	}
	if (document.getElementById("foe-visible").checked) {
		document.getElementById("foe-li1").style.display="none"; 
//		document.getElementById("foe-li2").style.display="none"; 
		document.getElementById("foe-li3").style.display="none"; 
		document.getElementById("foe-li4").style.display="none"; 
		document.getElementById("foe-li5").style.display="none"; 
	} else {
		document.getElementById("foe-li1").style.display=""; 
//		document.getElementById("foe-li2").style.display=""; 
		document.getElementById("foe-li3").style.display=""; 
		document.getElementById("foe-li4").style.display=""; 
		document.getElementById("foe-li5").style.display=""; 
	}
}
`;
			myLi.appendChild(myDiv);


			myUl.appendChild(myLi);


			myLi = document.createElement("li");
			myLi.setAttribute("id","foe-li7");
			myLi.setAttribute("style","position: relative;top: -2px; width:16px; height:16px;");

			myDiv = document.createElement("a");
			myDiv.setAttribute("href",browser.extension.getURL("settings")+"/options.html");
			myDiv.setAttribute("target","_blank");
//			myDiv.setAttribute("style","position: relative;top: -4px;");
			var myImg = document.createElement("img");
			myImg.setAttribute("src",browser.extension.getURL("images")+"/roue14x14.png");
			myImg.setAttribute("style","width:16px; height:16px; position: relative; left: -24px;");
			myImg.setAttribute("alt","Options");
			myDiv.appendChild(myImg);
//			myDiv.innerHTML = '\u00a0Options\u00a0';;
//			myUl2 = document.createElement("img");
//			myUl2.setAttribute("src","javascript:browser.runtime.openOptionsPage();");
//			myDiv.appendChild(myUl2);
			myLi.appendChild(myDiv);
			myUl.appendChild(myLi);
//browser.runtime.openOptionsPage() inaccessible depuis content script !

				
//			myDivFS.appendChild(myUl);
			var myScript = document.createElement("script");
			myScript.setAttribute("type","text/javascript");

			myScript.innerHTML = `
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
//console.log(elmnt.style.width + " " + elmnt.style.top + " " + pos2 + " , " + elmnt.style.left + " " + pos1+ " , " + pos3 + " " + pos4);	
	var mytop = 0;
	if (elmnt.style.top)
		mytop=elmnt.style.top.replace('px','')*1;
	else 
		mytop=elmnt.offsetTop;
	var myleft = 0;
	if (elmnt.style.left)
		myleft=elmnt.style.left.replace('px','')*1;
	else 
		myleft=elmnt.offsetLeft;

	if ((myleft - pos1) > -1) {
		elmnt.style.top = (mytop - pos2) + "px";
		elmnt.style.left = (myleft - pos1) + "px";
	}
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
`;

			if (GestionAmis[myWorld])
				myScript.innerHTML = myScript.innerHTML+'\r\ndragElement(document.getElementById("foe-li1-div"));';
			if (GestionGM[myWorld])
				myScript.innerHTML = myScript.innerHTML+'\r\ndragElement(document.getElementById("foe-li3-div"));';
			if (GestionColonie[myWorld])
				myScript.innerHTML = myScript.innerHTML+'\r\ndragElement(document.getElementById("foe-li4-div"));';
			if (GestionCarte[myWorld])
				myScript.innerHTML = myScript.innerHTML+'\r\ndragElement(document.getElementById("foe-li5-div"));';
//			myUl.appendChild(myScript);
			myDivFS.appendChild(myUl);
//			myDivFS.appendChild(myScript);
			myBody.appendChild(myDivFS);
			myBody.appendChild(myScript);
			// foe-li4 ou foe-info-colonie
//			window.document.getElementById("foe-info-colonie").appendChild(myScript);

//			myHead.appendChild(myScript);
		}
				
		if (c && (c.indexOf(',"events":[{') != -1 || 
			c.indexOf(',"socialbar_list":[{') != -1 || 
			c.indexOf(',"city_map":{') != -1 || 
			c.indexOf('{"id":"shrine",') != -1 || 
			c.indexOf('"requestClass":"HiddenRewardService","requestMethod":"getOverview"') != -1 || 
			c.indexOf('"requestClass":"CityMapService","requestMethod":') != -1 || 
			c.indexOf('"requestClass":"CityProductionService","requestMethod":') != -1 || 
			(c.indexOf(',"user_data":{') != -1 && !myName[myWorld]))) {
			myReceipt = c;
			var myJSON = ""
			try {
				// On sauve les coord des box
				SauveCoord();
				
				myJSON =JSON.parse(myReceipt);
				for (var i=0; i<myJSON.length; i++) {
					var responseData = myJSON[i].responseData;
					// Capture info perso
					if (responseData.user_data) {
						var persoData = responseData.user_data;
						myName[myWorld] = persoData.user_name;
						myID[myWorld] = persoData.player_id+"";
						if (window.document.getElementById("foe-info-global"))
							window.document.getElementById("foe-info-global").innerHTML = '\u00a0'+"("+myWorld+") "+myName[myWorld]+'\u00a0';
					}	


					if (GestionCarte[myWorld]) {

						// Infos incidents
						if (myJSON[i].requestClass && 
							myJSON[i].requestClass == "HiddenRewardService" && 
							myJSON[i].requestMethod == "getOverview" && 
							responseData.hiddenRewards) {
							Incident[myWorld] = '';
							var TabIncident = [];
							var TabIncidentSoon = [];
							var TabIncidentContext = [];
							var TabIncidentName = [];
							var myContexts = [];
							var myContext = 0;
							var myDate = Date.now()/1000;
							for (var indIncident = 0; indIncident < responseData.hiddenRewards.length; indIncident++) {
								if (!TabIncident[responseData.hiddenRewards[indIncident].position.context]) 
									TabIncident[responseData.hiddenRewards[indIncident].position.context] = 0;
								
								if (!responseData.hiddenRewards[indIncident].startTime || 
									(myDate >= responseData.hiddenRewards[indIncident].startTime && myDate <= responseData.hiddenRewards[indIncident].expireTime)) {
									TabIncident[responseData.hiddenRewards[indIncident].position.context]++;
								} else if (!TabIncidentSoon[responseData.hiddenRewards[indIncident].position.context] ||
											TabIncidentSoon[responseData.hiddenRewards[indIncident].position.context] > responseData.hiddenRewards[indIncident].startTime) {
									TabIncidentSoon[responseData.hiddenRewards[indIncident].position.context] = responseData.hiddenRewards[indIncident].startTime;
								}
									
//console.log(myWorld+" Rendu Incident:"+(Date.now()/1000)+" "+responseData.hiddenRewards[indIncident].startTime+" "+responseData.hiddenRewards[indIncident].type+" / "+responseData.hiddenRewards[indIncident].position.context+" / "+responseData.hiddenRewards[indIncident].rarity+" / "+TabIncident[responseData.hiddenRewards[indIncident].position.context]);
	/*
	fr13 Rendu Incident:1553092272.437 ge_relic_common / guildExpedition / 1  foe_content.js:1120:1
	fr13 Rendu Incident:1553092272.438 ge_relic_common / guildExpedition / 2  foe_content.js:1120:1
	fr13 Rendu Incident:1553092272.438 incident_overgrowth / nature / 1  foe_content.js:1120:1
	fr13 Rendu Incident:1553092272.442 incident_fallen_tree_1x1 / cityRoadSmall / 1  foe_content.js:1120:1
	fr13 Rendu Incident:1553092272.442 incident_fruit_vendor / nature / 2  foe_content.js:1120:1
	fr13 Rendu Incident:1553092272.442 incident_crates / nature / 3  foe_content.js:1120:1
	fr13 Rendu Incident:1553092272.443 incident_sos / shore / 1  foe_content.js:1120:1
	fr13 Rendu Incident:1553092272.443 incident_fallen_tree_1x1 / cityRoadSmall / 2  foe_content.js:1120:1

	fr13 Rendu Incident:1553092685.023 ge_relic_common / guildExpedition / 1  foe_content.js:1119:1
	fr13 Rendu Incident:1553092685.024 ge_relic_common / guildExpedition / 2  foe_content.js:1119:1
	fr13 Rendu Incident:1553092685.024 incident_overgrowth / nature / 1  foe_content.js:1119:1
	fr13 Rendu Incident:1553092685.027 incident_fallen_tree_1x1 / cityRoadSmall / 1  foe_content.js:1119:1
	fr13 Rendu Incident:1553092685.027 incident_fruit_vendor / nature / 2  foe_content.js:1119:1
	fr13 Rendu Incident:1553092685.027 incident_crates / nature / 3  foe_content.js:1119:1
	fr13 Rendu Incident:1553092685.027 incident_fallen_tree_1x1 / cityRoadSmall / 2

	zz1 Rendu Incident:1553092813.318 incident_pothole_2x2 / cityRoadBig / 1  foe_content.js:1119:1
	zz1 Rendu Incident:1553092813.318 incident_beehive / nature / 1  foe_content.js:1119:1
	zz1 Rendu Incident:1553092813.318 incident_pothole_1x1 / cityRoadSmall / 1  foe_content.js:1119:1
	zz1 Rendu Incident:1553092813.318 incident_broken_cart / nature / 2  foe_content.js:1119:1
	zz1 Rendu Incident:1553092813.321 incident_beehive / nature / 3  foe_content.js:1119:1
	zz1 Rendu Incident:1553092813.321 incident_wine_cask / nature / 4  foe_content.js:1119:1
	zz1 Rendu Incident:1553092813.321 incident_flotsam / shore / 1

	guildExpedition

	cityRoadSmall	Route
	cityRoadBig		Rue à 2 voies
	nature			Nature
	shore			Plage
	water			Eau

	incident_fallen_tree_1x1 	Arbre tombé
	incident_fruit_vendor 		Vendeur de fruits
	incident_crates 			Caisses

	*/
								var tmpContext = responseData.hiddenRewards[indIncident].position.context;
								var tmpName = tmpContext;
								switch (tmpContext) {
									case 'cityRoadSmall':
										tmpName = browser.i18n.getMessage("Route");
										break;
									case 'cityRoadBig':
										tmpName = browser.i18n.getMessage("Rue_a_2_voies");
										break;
									case 'nature':
										tmpName = browser.i18n.getMessage("Nature");
										break;
									case 'shore':
										tmpName = browser.i18n.getMessage("Plage");
										break;
									case 'water':
										tmpName = browser.i18n.getMessage("Eau");
										break;
									case 'guildExpedition':
										tmpName = browser.i18n.getMessage("Relique_Expedition");
										break;
								}
								if (Incident[myWorld].indexOf(tmpName) == -1) {
									myContext++;
									TabIncidentContext[myContext] = tmpContext;
									Incident[myWorld]+=', '+tmpName+" ({"+myContext+"})";
								}
							}
							for (var indIncident = 1; indIncident <= myContext; indIncident++) {
								if (TabIncident[TabIncidentContext[indIncident]] > 0) {
									Incident[myWorld] = Incident[myWorld].replace("{"+indIncident+"}",TabIncident[TabIncidentContext[indIncident]]);
								} else {
									var myDateInc = new Date(TabIncidentSoon[TabIncidentContext[indIncident]] * 1000)
									Incident[myWorld] = Incident[myWorld].replace("{"+indIncident+"}",myDateInc.toLocaleTimeString());
								}
							}
							if (window.document.getElementById('foe-legende-map')) {
								var myTxt=document.createElement("p");
								myTxt.setAttribute("id","foe-legende-txt");
								myTxt.appendChild(document.createTextNode('\u00a0'+Incident[myWorld].substring(1)));
								if (window.document.getElementById('foe-legende-txt'))
									window.document.getElementById('foe-legende-map').removeChild(window.document.getElementById('foe-legende-txt'));
								window.document.getElementById('foe-legende-map').appendChild(myTxt);
							}
//console.log(myWorld+" Rendu IncidentFin:"+(Date.now()/1000)+" "+Incident[myWorld].substring(1));
						}
						// Rendu map 
						if (myJSON[i].requestClass && 
							myJSON[i].requestClass == "CityMapService" && 
							(myCityAffiche[myWorld] || MargeColX[myWorld]>0) && 
							responseData[0] && responseData[0].id) { 

//console.log(myWorld+" Rendu Map Event:"+(Date.now()/1000)+" "+myJSON[i].requestClass+","+myJSON[i].requestMethod);

					
							if (myJSON[i].requestMethod == 'moveBuilding' || 
								myJSON[i].requestMethod == 'swapBuildings' || 
								myJSON[i].requestMethod == 'placeBuilding' || 
								myJSON[i].requestMethod == 'removeBuilding' ||
								myJSON[i].requestMethod == 'updateEntity' || 
								myJSON[i].requestMethod == 'reset') { 
								var bReset = false;
//console.log(myWorld+" Rendu Map Event0:"+(Date.now()/1000)+" "+myJSON[i].requestClass+","+myJSON[i].requestMethod+"/"+myCityAffiche[myWorld]+"/"+responseData.length);
								for (var indBuild = 0; indBuild < responseData.length; indBuild++) {
									if (responseData[indBuild].player_id == myID[myWorld]) {

										var index = -1;
	//console.log(myWorld+" Rendu Map Charge0b:"+myJSON[i].requestClass+","+myJSON[i].requestMethod+"/"+myCityAffiche[myWorld]+"/"+responseData[indBuild].id+"/"+responseData[indBuild].cityentity_id+"/"+responseData[indBuild].type);
										var myX = 0;
										if (responseData[indBuild].x)
										  myX = responseData[indBuild].x
										var myY = 0;
										if (responseData[indBuild].y)
										  myY = responseData[indBuild].y
										switch (myJSON[i].requestMethod) {
										  case 'moveBuilding':
										  case 'swapBuildings':
										  case 'updateEntity':
										  case 'reset':
											if (MargeColX[myWorld]>0) {
												index = myColoOri[myWorld].findIndex(obj => obj.id==responseData[indBuild].id);
												if (index >= 0) {
													myColoOri[myWorld][index].id=responseData[indBuild].id;
													myColoOri[myWorld][index].cityentity_id=responseData[indBuild].cityentity_id,
													myColoOri[myWorld][index].type=responseData[indBuild].type,
													myColoOri[myWorld][index].x=myX;
													myColoOri[myWorld][index].y=myY;
													myColoOri[myWorld][index].connected=responseData[indBuild].connected;
													myColoOri[myWorld][index].state=responseData[indBuild].state;
//													if (myJSON[i].requestMethod != 'updateEntity' && myJSON[i].requestMethod != 'reset')
														bReset = true;
												}
											} else {
												index = myCityOri[myWorld].findIndex(obj => obj.id==responseData[indBuild].id);
												if (index >= 0) {
													myCityOri[myWorld][index].id=responseData[indBuild].id;
													myCityOri[myWorld][index].cityentity_id=responseData[indBuild].cityentity_id,
													myCityOri[myWorld][index].type=responseData[indBuild].type,
													myCityOri[myWorld][index].x=myX;
													myCityOri[myWorld][index].y=myY;
													myCityOri[myWorld][index].connected=responseData[indBuild].connected;
													myCityOri[myWorld][index].state=responseData[indBuild].state;
													//if (myJSON[i].requestMethod != 'updateEntity' && myJSON[i].requestMethod != 'reset')
														bReset = true;
												}
											}
											if (myJSON[i].requestMethod == 'updateEntity' || myJSON[i].requestMethod == 'reset') {
												bReset = false;
												var mapX = 0;
												var mapY = 0;
												var myTagName = '';
												if (responseData[indBuild].x)
													mapX = responseData[indBuild].x*1;
												if (responseData[indBuild].y)
													mapY = responseData[indBuild].y*1;
												if (responseData[indBuild].cityentity_id)
													myTagName = responseData[indBuild].cityentity_id+'-'+responseData[indBuild].id;

												if (myTagName != '' && window.document.getElementsByName(myTagName)) {
													var myElem = window.document.getElementsByName(myTagName);
													for (var tagI=0; tagI<myElem.length; tagI++) {
														var myClass=myElem[tagI].getAttribute('class');
														switch (responseData[indBuild].type) {
															  case 'production':
															// colonies											  
															  case 'cultural_goods_production': // production hache etc
																myClass = "tdprod";
																break;
															  case 'goods':
																myClass = "tdgood";
																break;
															  case 'residential':
																myClass = "tdhouse";
																break;
															  case 'military':
															  case 'diplomacy':					// sanctuaire
																myClass = "tdmil";
																break;
															  case 'greatbuilding':
																myClass = "tdgb";
																break;
															  case 'main_building':
																myClass = "tdtown";
																break;
															  case 'random_production':
															  case 'tower':
															  case 'culture':
															  case 'decoration':
																myClass = 'tddeco';
																break;
															  default:
																myClass = 'tdbrown';
																break;
															  
														}
														switch (responseData[indBuild].state.__class__) {
														  case 'ProductionFinishedState':
														// prod terminée
															myClass = "tdred";
															break;
														  case 'ConstructionState':
														  case 'UnconnectedState':
															myClass = "tdorange";
															break;
														  case 'IdleState':
															if (prodEnable > 0 && responseData.updatedEntities[EntityI].type!="greatbuilding")
																myClass = "tdyellow";
															break;
														}

														//myElem[tagI].setAttribute('class')=myClass;
														var SuffixeCol='';
														if (MargeColX[myWorld] != 0) 
															SuffixeCol = "col";
														window.document.getElementsByName(myTagName)[tagI].setAttribute('class',myClass+SuffixeCol);
														myMapHTML[myWorld] = window.document.getElementById("foe-map").innerHTML;
													}
												}
											}
											break;
											
										  case 'placeBuilding':
											var prodEnable=0;
											var buildName=responseData[indBuild].cityentity_id;
											index = myCityMap[myWorld].findIndex(obj => obj.id==responseData[indBuild].cityentity_id);
											if (index && index >= 0 && myCityMap[myWorld][index].available_products) {
												prodEnable=myCityMap[myWorld][index].available_products.length;
												buildName=myCityMap[myWorld][index].name;
											}
											if (MargeColX[myWorld]>0) {
												myColoOri[myWorld].push({
													id:responseData[indBuild].id,
													player_id:responseData[indBuild].player_id,
													cityentity_id:responseData[indBuild].cityentity_id,
													type:responseData[indBuild].type,
													x:myX,
													y:myY,
													connected:responseData[indBuild].connected,
													state:responseData[indBuild].state,
													name:buildName,
													prodEnable:prodEnable
												});
											} else {
												myCityOri[myWorld].push({
													id:responseData[indBuild].id,
													player_id:responseData[indBuild].player_id,
													cityentity_id:responseData[indBuild].cityentity_id,
													type:responseData[indBuild].type,
													x:myX,
													y:myY,
													connected:responseData[indBuild].connected,
													state:responseData[indBuild].state,
													name:buildName,
													prodEnable:prodEnable
												});
											}
											bReset = true;
											break;
											
										  case 'removeBuilding': 
											if (MargeColX[myWorld]>0) {
												index = myColoOri[myWorld].findIndex(obj => obj.id==responseData[indBuild].id);
												if (index && index >= 0)
													myColoOri[myWorld].splice(index,1);
												else 
													resetMapNeeded[myWorld] = true;
											} else {
												index = myCityOri[myWorld].findIndex(obj => obj.id==responseData[indBuild].id);
												if (index && index >= 0)
													myCityOri[myWorld].splice(index,1);
												else 
													resetMapNeeded[myWorld] = true;
											}

			//console.log(myWorld+" Rendu Map Charge1:"+myJSON[i].requestClass+","+myJSON[i].requestMethod+"/"+myCityAffiche[myWorld]+"/"+renduMapNeeded[myWorld]+"/"+renduMapAeras[myWorld]);					
											break;
											
										  default:
	//console.log(myWorld+" Rendu Map Event1:"+myJSON[i].requestClass+","+myJSON[i].requestMethod+"/"+myCityAffiche[myWorld]);	
											resetMapNeeded[myWorld] = true;				
											break;
										}
									}
								}
//console.log(myWorld+" Rendu Map Event2:"+(Date.now()/1000)+" "+resetMapNeeded[myWorld]);
								if (bReset) {
									renduMapNeeded[myWorld] = true;
									renduMapAeras[myWorld] = false;
									if (!resetMapNeeded[myWorld]) {
										CityTmp[myWorld] = [];
										if (MargeColX[myWorld]>0) {
											for (var indTmp=0; indTmp<myColoOri[myWorld].length; indTmp++) {
												CityTmp[myWorld].push(myColoOri[myWorld][indTmp]);
											}
											AerasTmp[myWorld] = myAreasCol[myWorld];
										} else {
											for (var indTmp=0; indTmp<myCityOri[myWorld].length; indTmp++) {
												CityTmp[myWorld].push(myCityOri[myWorld][indTmp]);
											}
											AerasTmp[myWorld] = myAreas[myWorld];
										}
									}
									ChargeMap();
								} else {
									renduMapNeeded[myWorld] = false;
									renduMapAeras[myWorld] = false;
								}
//console.log(myWorld+" Rendu Map Event3:"+(Date.now()/1000)+" "+renduMapNeeded[myWorld]+" "+renduMapAeras[myWorld]+" "+resetMapNeeded[myWorld]);
//								resetMapNeeded[myWorld] = true;
							}
						}
						
						
						// Maj map production 
						if (myJSON[i].requestClass && 
							myJSON[i].requestClass == "CityProductionService" && 
							(myCityAffiche[myWorld] || MargeColX[myWorld]>0)) { 

//console.log(myWorld+" Rendu Map prod0:"+(Date.now()/1000)+" "+myJSON[i].requestMethod+"/"+myCityAffiche[myWorld]+"/"+MargeColX[myWorld]+"/"+responseData.updatedEntities);					
							var mapX = 0;
							var mapY = 0;
							var myTagName = '';
							var index = -1;
							if (responseData.updatedEntities) {
								for (var EntityI=0; EntityI<responseData.updatedEntities.length; EntityI++) {
									var prodEnable=0;
									if (MargeColX[myWorld]>0) {
										index = myColoOri[myWorld].findIndex(obj => obj.id==responseData.updatedEntities[EntityI].id);
										if (index >= 0) {
											myColoOri[myWorld][index].id=responseData.updatedEntities[EntityI].id;
											myColoOri[myWorld][index].cityentity_id=responseData.updatedEntities[EntityI].cityentity_id,
											myColoOri[myWorld][index].type=responseData.updatedEntities[EntityI].type,
											myColoOri[myWorld][index].x=responseData.updatedEntities[EntityI].x;
											myColoOri[myWorld][index].y=responseData.updatedEntities[EntityI].y;
											myColoOri[myWorld][index].connected=responseData.updatedEntities[EntityI].connected;
											myColoOri[myWorld][index].state=responseData.updatedEntities[EntityI].state;
											if (myColoOri[myWorld][index].prodEnable)
												prodEnable=myColoOri[myWorld][index].prodEnable;
										}
									} else {
										index = myCityOri[myWorld].findIndex(obj => obj.id==responseData.updatedEntities[EntityI].id);
										if (index >= 0) {
											myCityOri[myWorld][index].id=responseData.updatedEntities[EntityI].id;
											myCityOri[myWorld][index].cityentity_id=responseData.updatedEntities[EntityI].cityentity_id,
											myCityOri[myWorld][index].type=responseData.updatedEntities[EntityI].type,
											myCityOri[myWorld][index].x=responseData.updatedEntities[EntityI].x;
											myCityOri[myWorld][index].y=responseData.updatedEntities[EntityI].y;
											myCityOri[myWorld][index].connected=responseData.updatedEntities[EntityI].connected;
											myCityOri[myWorld][index].state=responseData.updatedEntities[EntityI].state;
											if (myCityOri[myWorld][index].prodEnable)
												prodEnable=myCityOri[myWorld][index].prodEnable;
										}
									}

									if (responseData.updatedEntities[EntityI].x)
										mapX = responseData.updatedEntities[EntityI].x*1;
									if (responseData.updatedEntities[EntityI].y)
										mapY = responseData.updatedEntities[EntityI].y*1;
									if (responseData.updatedEntities[EntityI].cityentity_id)
										myTagName = responseData.updatedEntities[EntityI].cityentity_id+'-'+responseData.updatedEntities[EntityI].id;
//console.log(myWorld+" Rendu Map Rest:"+myTagName+"/"+window.document.getElementsByName(myTagName));					
									if (myTagName != '' && window.document.getElementsByName(myTagName)) {
										var myElem = window.document.getElementsByName(myTagName);
//console.log(myWorld+" Rendu Map Rest2:"+myTagName+"/"+myElem.length);					
										for (var tagI=0; tagI<myElem.length; tagI++) {
//											var OldmyClass=myElem[tagI].getAttribute('class');
											var myClass=myElem[tagI].getAttribute('class');
			// pickupProduction : ramassage prod
//console.log(myWorld+" Rendu Map Rest3:"+myJSON[i].requestMethod+"/"+myCityAffiche[myWorld]+"/"+MargeColX[myWorld]+"/"+myClass+"/"+responseData.updatedEntities[EntityI].type);					
											switch (myJSON[i].requestMethod) {
											  case 'startProduction':	// demarrage prod
											  case 'pickupProduction':	// ramassage prod
												switch (responseData.updatedEntities[EntityI].type) {
													  case 'production':
													// colonies											  
													  case 'cultural_goods_production': // production hache etc
														myClass = "tdprod";
														break;
													  case 'goods':
														myClass = "tdgood";
														break;
													  case 'residential':
														myClass = "tdhouse";
														break;
													  case 'military':
													  case 'diplomacy':					// sanctuaire
														myClass = "tdmil";
														break;
													  case 'greatbuilding':
														myClass = "tdgb";
														break;
													  case 'main_building':
														myClass = "tdtown";
														break;
													  case 'random_production':
													  case 'tower':
													  case 'culture':
													  case 'decoration':
														myClass = 'tddeco';
														break;
													  default:
														myClass = 'tdbrown';
														break;
													  
												}
												if (myJSON[i].requestMethod == 'pickupProduction') {	// ramassage prod
													switch (responseData.updatedEntities[EntityI].state.__class__) {
													  case 'ProductionFinishedState':
													// prod terminée
														myClass = "tdred";
														break;
													  case 'ConstructionState':
													  case 'UnconnectedState':
														myClass = "tdorange";
														break;
													  case 'IdleState':
														if (prodEnable > 0 && responseData.updatedEntities[EntityI].type!="greatbuilding")
															myClass = "tdyellow";
														break;
													}
												}
												//myElem[tagI].setAttribute('class')=myClass;
												break;
											}
											var SuffixeCol='';
											if (MargeColX[myWorld] != 0) 
												SuffixeCol = "col";
											window.document.getElementsByName(myTagName)[tagI].setAttribute('class',myClass+SuffixeCol);
											myMapHTML[myWorld] = window.document.getElementById("foe-map").innerHTML;
//console.log(myWorld+" Rendu Map Rest4:"+myClass+"/"+window.document.getElementsByName(myTagName)[tagI].getAttribute('class'));					
										}
									}
								}
							}
//console.log(myWorld+" Rendu Map prod1:"+(Date.now()/1000)+" "+myJSON[i].requestMethod+"/"+myCityAffiche[myWorld]+"/"+MargeColX[myWorld]);							
						}
	//									requestClass":"CityMapService","requestMethod":"reset" en cas d'evenement sur un de ses batiments
							
						if (myJSON[i].requestClass && (myJSON[i].requestClass == "StartupService" ||							// Démarrage
							(myJSON[i].requestClass == "CityMapService"  && myJSON[i].requestMethod == "getEntities") ||		// Retour visite ou colonie
							(myJSON[i].requestClass == "CityMapService"  && myJSON[i].requestMethod == "getCityMap") ||			// Colonie
							(myJSON[i].requestClass == "OtherPlayerService"  && myJSON[i].requestMethod == "visitPlayer"))) {	// Visite autre joueur

//console.log(myWorld+" Rendu Map Charge0:"+(Date.now()/1000)+" "+myJSON[i].requestMethod+"/"+myCityAffiche[myWorld]+"/"+MargeColX[myWorld]);

	//console.log(myWorld+" myJSON[i]2:"+myJSON[i].requestClass+","+myJSON[i].requestMethod);

							if (responseData.city_map && responseData.city_map.entities  && responseData.city_map.unlocked_areas) {
								// Chargement de sa cité ou visite d'un autre joueur
								CityTmp[myWorld] = responseData.city_map.entities;
								AerasTmp[myWorld] = responseData.city_map.unlocked_areas;
								myCityAffiche[myWorld] = false;
								// on charge les données de sa propre map
								if (CityTmp[myWorld][0].player_id == myID[myWorld]) {
									// Sauvegarde du cache
									myCityOri[myWorld] = [];
									for (var indTmp=0; indTmp<CityTmp[myWorld].length; indTmp++) {
										myCityOri[myWorld].push(CityTmp[myWorld][indTmp]);
									}
									if (responseData.city_map.blocked_areas) myBlock[myWorld] = responseData.city_map.blocked_areas;
									myAreas[myWorld] = responseData.city_map.unlocked_areas;
									myCityAffiche[myWorld] = true;
									resetMapNeeded[myWorld] = false;
								}
								renduMapNeeded[myWorld] = true;
								renduMapAeras[myWorld] = true;
								MargeColX[myWorld] = 0;
								MargeColY[myWorld] = 0;
								
								if (!bFirstTime[myWorld])
									ChargeMap();

	//console.log(myWorld+" Rendu Map Charge1:"+myJSON[i].requestClass+","+myJSON[i].requestMethod+"/"+myCityAffiche[myWorld]+"/"+renduMapNeeded[myWorld]+"/"+renduMapAeras[myWorld]+"/"+CityTmp[myWorld][0].player_id+"/"+myID[myWorld]);					
							} else {
								// Rendu map visite
								if (responseData[0] && responseData[0].__class__ && responseData[0].__class__ == "CityMapEntity") {
									// on charge les données
									CityTmp[myWorld] = responseData;
									myCityAffiche[myWorld] = false;
									if (CityTmp[myWorld][0].player_id == myID[myWorld]) {
										AerasTmp[myWorld] = myAreas[myWorld];
										myCityAffiche[myWorld] = true;
	//console.log((CityTmp[myWorld] == myCityOri[myWorld]) + "/" + (JSON.stringify(CityTmp[myWorld]) == JSON.stringify(myCityOri[myWorld])));					
//										if (resetMapNeeded[myWorld]) {
											// Besoin de reinit la map perso
											// Sauvegarde du cache
											myCityOri[myWorld] = [];
											for (var indTmp=0; indTmp<CityTmp[myWorld].length; indTmp++) {
												myCityOri[myWorld].push(CityTmp[myWorld][indTmp]);
/*
												myCityOri[myWorld].push({
													id:CityTmp[myWorld][indTmp].id,
													player_id:CityTmp[myWorld][indTmp].player_id,
													cityentity_id:CityTmp[myWorld][indTmp].cityentity_id,
													type:CityTmp[myWorld][indTmp].type,
													x:CityTmp[myWorld][indTmp].x,
													y:CityTmp[myWorld][indTmp].y,
													connected:CityTmp[myWorld][indTmp].connected,
													state:CityTmp[myWorld][indTmp].state
												});
*/
											}
											resetMapNeeded[myWorld] = false;
											renduMapNeeded[myWorld] = true;
											renduMapAeras[myWorld] = false;
//										} else {
//											myMapHTML[myWorld] = myCity[myWorld];
//											renduMapNeeded[myWorld] = false;
//											renduMapAeras[myWorld] = true;
//										}
									} else {
										renduMapNeeded[myWorld] = false;
										renduMapAeras[myWorld] = true;
									}
									MargeColX[myWorld] = 0;
									MargeColY[myWorld] = 0;
									ChargeMap();

	//console.log(myWorld+" Rendu Map Charge2:"+myJSON[i].requestClass+","+myJSON[i].requestMethod+"/"+myCityAffiche[myWorld]+"/"+renduMapNeeded[myWorld]+"/"+renduMapAeras[myWorld]);					
								} else {
									// Rendu map colonie
									if (responseData.entities  && responseData.unlocked_areas) {
										// on charge les données
										CityTmp[myWorld] = responseData.entities;
										if (responseData.blocked_areas) myBlockCol[myWorld] = responseData.blocked_areas;
										AerasTmp[myWorld]   = responseData.unlocked_areas;
										myAreasCol[myWorld] = responseData.unlocked_areas;
										// Sauvegarde du cache
										myColoOri[myWorld] = [];
										for (var indTmp=0; indTmp<CityTmp[myWorld].length; indTmp++) {
											myColoOri[myWorld].push(CityTmp[myWorld][indTmp]);
/*
											myColoOri[myWorld].push({
												id:CityTmp[myWorld][indTmp].id,
												player_id:CityTmp[myWorld][indTmp].player_id,
												cityentity_id:CityTmp[myWorld][indTmp].cityentity_id,
												type:CityTmp[myWorld][indTmp].type,
												x:CityTmp[myWorld][indTmp].x,
												y:CityTmp[myWorld][indTmp].y,
												connected:CityTmp[myWorld][indTmp].connected,
												state:CityTmp[myWorld][indTmp].state
												});
*/
										}
										myCityAffiche[myWorld] = false;
										renduMapNeeded[myWorld] = true;
										renduMapAeras[myWorld] = true;
	//console.log(myWorld+" Rendu Map Charge5:"+myJSON[i].requestClass+","+myJSON[i].requestMethod+"/"+myCityAffiche[myWorld]+"/"+renduMapNeeded[myWorld]+"/"+renduMapAeras[myWorld]);					
										MargeColX[myWorld] = 500;
										MargeColY[myWorld] = 0;
										ChargeMap();
									}
								}
							}
//console.log(myWorld+" Rendu Map Charge1:"+(Date.now()/1000)+" "+myJSON[i].requestMethod+"/"+myCityAffiche[myWorld]+"/"+MargeColX[myWorld]+"/"+renduMapNeeded[myWorld]+"/"+renduMapAeras[myWorld]+"/"+resetMapNeeded[myWorld]);
						}
					}

					if (GestionColonie[myWorld]) {
						// Capture info colonie
						if (responseData[0] && responseData[0].id && responseData[0].id == 'shrine' ) {
							var myIDs = responseData;
							var myColonieHTML="<table>";
							var cptAxes=0;
							var cptMead=0;
							var cptHorns=0;
							var cptWool=0;
							var nameAxes=browser.i18n.getMessage("Haches");
							var nameMead=browser.i18n.getMessage("Hydromel");
							var nameHorns=browser.i18n.getMessage("Cornes");
							var nameWool=browser.i18n.getMessage("Laine");
							var abrJour=browser.i18n.getMessage("AbrJour");
							myColonieHTML += '<tr align="center"><th>\u00a0'+browser.i18n.getMessage("Ressources")+'\u00a0</th><th>\u00a0'+browser.i18n.getMessage("Besoins")+'\u00a0</th><th>\u00a0'+browser.i18n.getMessage("Cout")+'\u00a0</th><th>\u00a0'+browser.i18n.getMessage("1_Prod_4")+'\u00a0</th><th>\u00a0'+browser.i18n.getMessage("1_Prod_Jour")+'\u00a0</th></tr>';
							
							myIDs.forEach(function(listIDs) {
								if (listIDs.id) {
								// nouvel ID 
									switch (listIDs.id) {
									  case 'shrine':
									  case 'mead_brewery':
									  case 'hut':
									  case 'beast_hunter':
									  case 'clan_totem':
									  case 'market':
									  case 'wool_farm':
									  case 'clan_house':
									  case 'old_willow':
									  case 'mead_hall':
										if (listIDs.isUnlocked === false) {
											if (listIDs.requirements.resources.axes)
												cptAxes += listIDs.requirements.resources.axes;
											if (listIDs.requirements.resources.mead)
												cptMead += listIDs.requirements.resources.mead;
											if (listIDs.requirements.resources.horns)
												cptHorns += listIDs.requirements.resources.horns;
											if (listIDs.requirements.resources.wool)
												cptWool += listIDs.requirements.resources.wool;
												
										}
										break;
									  default:
										console.log('pas de prise en charge : '+listIDs.id);
										break;
									}
								}
							});
							var myTotal = cptAxes+cptMead+cptHorns+cptWool;
							myColonieHTML += '<tr align="right"><td class="tdcol">\u00a0'+nameAxes+'\u00a0</td><td class="tdcol">\u00a0'+cptAxes+'\u00a0</td><td class="tdcol">\u00a0'+(cptAxes*200)+'\u00a0</td><td class="tdcol">\u00a0'+(Math.round((cptAxes/30)*100)/100)+' '+abrJour+'\u00a0</td><td class="tdcol">\u00a0'+(cptAxes/20)+' '+abrJour+'\u00a0</td></tr>';
							myColonieHTML += '<tr align="right"><td class="tdcol">\u00a0'+nameMead+'\u00a0</td><td class="tdcol">\u00a0'+cptMead+'\u00a0</td><td class="tdcol">\u00a0'+(cptMead*200)+'\u00a0</td><td class="tdcol">\u00a0'+(Math.round((cptMead/30)*100)/100)+' '+abrJour+'\u00a0</td><td class="tdcol">\u00a0'+(cptMead/20)+' '+abrJour+'\u00a0</td></tr>';
							myColonieHTML += '<tr align="right"><td class="tdcol">\u00a0'+nameHorns+'\u00a0</td><td class="tdcol">\u00a0'+cptHorns+'\u00a0</td><td class="tdcol">\u00a0'+(cptHorns*200)+'\u00a0</td><td class="tdcol">\u00a0'+(Math.round((cptHorns/30)*100)/100)+' '+abrJour+'\u00a0</td><td class="tdcol">\u00a0'+(cptHorns/20)+' '+abrJour+'\u00a0</td></tr>';
							myColonieHTML += '<tr align="right"><td class="tdcol">\u00a0'+nameWool+'\u00a0</td><td class="tdcol">\u00a0'+cptWool+'\u00a0</td><td class="tdcol">\u00a0'+(cptWool*200)+'\u00a0</td><td class="tdcol">\u00a0'+(Math.round((cptWool/30)*100)/100)+' '+abrJour+'\u00a0</td><td class="tdcol">\u00a0'+(cptWool/20)+' '+abrJour+'\u00a0</td></tr>';
							myColonieHTML += '<tr align="right"><td class="tdcol">\u00a0Total\u00a0</td><td class="tdcol">\u00a0'+myTotal+'\u00a0</td><td class="tdcol">\u00a0'+(myTotal*200)+'\u00a0</td><td class="tdcol">\u00a0'+(Math.round((myTotal/30)*100)/100)+' '+abrJour+'\u00a0</td><td class="tdcol">\u00a0'+(myTotal/20)+' '+abrJour+'\u00a0</td></tr>';
							myColonieHTML += '</table>';
							myColonieHTML += '<span style="width:0px;"/>';
							window.document.getElementById("foe-colonie").innerHTML = myColonieHTML;
						}
					}

					// Capture infos Arche perso
					if (myArche[myWorld].Level == -1 && responseData.city_map && responseData.city_map.entities) {
						myArche[myWorld] = {'Level':0,'PF':'0/0','Bonus':1};
						for (var j=0; j<responseData.city_map.entities.length; j++) {
							var listData = responseData.city_map.entities[j];
							if (listData.cityentity_id == 'X_FutureEra_Landmark1' && listData.type == 'greatbuilding') {
								myArche[myWorld] = {'Level':(listData.level*1),'PF':listData.state.invested_forge_points+'/'+listData.state.forge_points_for_level_up,'Bonus':((10000+(listData.bonus.value*100))/10000)};
								break;
							}
						}
					}

					if (GestionAmis[myWorld]) {
						// Capture des amis
						if (responseData.socialbar_list) {
							friendArray = {0:{'PlayerID':'-1','Nom':'','Membre':-1}};
							for (var j=0; j<responseData.socialbar_list.length; j++) {
								var listData = responseData.socialbar_list[j];
								friendArray[j] = {'PlayerID':listData.player_id+"",'Nom':listData.name,'Membre':-1}; 
								if (listData.is_neighbor && listData.is_friend && listData.is_guild_member)
									friendArray[j].Membre = 7;
								else if (listData.is_neighbor && listData.is_guild_member)
									friendArray[j].Membre = 6;
								else if (listData.is_neighbor && listData.is_friend)
									friendArray[j].Membre = 5;
								else if (listData.is_friend && listData.is_guild_member)
									friendArray[j].Membre = 4;
								else if (listData.is_neighbor)
									friendArray[j].Membre = 3;
								else if (listData.is_friend)
									friendArray[j].Membre = 2;
								else if (listData.is_guild_member)
									friendArray[j].Membre = 1;

							}
							cptFriend = responseData.socialbar_list.length;
						}
					}

					if (GestionGM[myWorld]) {
						// Capture des infos GM
						if (responseData[0] && responseData[0].type == 'greatbuilding' ) {
							GMinvested = 0;
							if (responseData[0].state.invested_forge_points)
								GMinvested = responseData[0].state.invested_forge_points * 1;
							GMToUP = 0;
							if (responseData[0].state.forge_points_for_level_up)
								GMToUP = responseData[0].state.forge_points_for_level_up * 1;
							GMrestant = GMToUP - GMinvested;
							if (responseData[0].player_id == myID[myWorld]) 
								GMPerso = true;
							else 
								GMPerso = false;
							var GMName = 'Nom';
							if (responseData[0].cityentity_id) {
								GMName = responseData[0].cityentity_id;
								if (myCityMap[myWorld]) {
									var index = myCityMap[myWorld].findIndex(obj => obj.id==responseData[0].cityentity_id);
//									GMName=UnicodeToAccent(myCityMap[myWorld][index].name);
									GMName=myCityMap[myWorld][index].name;
								}
							}
							
							// init
							for (var j=1; j<8; j++) {
								GMInvestJoueur = 0;
								GMBloque[j] = 0;
								GMInvest[j] = 0;
								GMNom[j] = "";
								GMBonus[j] = 0;
								GMBloque0[j] = 0;
								GMBloque05[j] = 0;
								GMBloque1[j] = 0;
								GMBloque15[j] = 0;
								GMBloque2[j] = 0;
								GMBloque25[j] = 0;
								GMBloque3[j] = 0;
								GMBloque35[j] = 0;
								GMBloque4[j] = 0;
								GMBloque45[j] = 0;
								GMBloque5[j] = 0;
								GMBloque55[j] = 0;
								GMBloque6[j] = 0;
								GMBloque65[j] = 0;
								GMBloque7[j] = 0;
								GMBloque75[j] = 0;
								GMBloque8[j] = 0;
								GMBloque85[j] = 0;
								GMBloque9[j] = 0;
								GMBloque95[j] = 0;
								GMBloque100[j] = 0;
							}
							var GMInvestor = 0;
							var GMRank = 99999;
						}
											
						// Capture des infos GM investissement
						if (responseData.rankings) {
							var GMrestantTmp = GMrestant;
							for (var j=0; j<responseData.rankings.length; j++) {
								var rankData = responseData.rankings[j];
								if (rankData.rank && rankData.rank >= 1 && rankData.rank < 7) {
									if (rankData.forge_points) {
										GMNom[rankData.rank] = rankData.player.name;
										GMInvest[rankData.rank] = rankData.forge_points * 1;
											if (rankData.player.player_id == myID[myWorld] && GMPerso === false) {
												GMInvestJoueur += GMInvest[rankData.rank];
												GMRank = rankData.rank;
												GMNom[rankData.rank] = "<b>"+rankData.player.name+"</b>";
											}
									} else { 
										GMInvest[rankData.rank] = 0;
										GMNom[rankData.rank] = "";
									}
									if (rankData.rank < 6 && rankData.reward && rankData.reward.strategy_point_amount) {
										GMBonus[rankData.rank] = Math.round((rankData.reward.strategy_point_amount * 1) * myArche[myWorld].Bonus);
										GMBloque0[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1);
										GMBloque05[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.05);
										GMBloque1[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.1);
										GMBloque15[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.15);
										GMBloque2[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.2);
										GMBloque25[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.25);
										GMBloque3[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.3);
										GMBloque35[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.35);
										GMBloque4[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.4);
										GMBloque45[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.45);
										GMBloque5[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.5);
										GMBloque55[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.55);
										GMBloque6[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.6);
										GMBloque65[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.65);
										GMBloque7[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.7);
										GMBloque75[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.75);
										GMBloque8[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.8);
										GMBloque85[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.85);
										GMBloque9[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.9);
										GMBloque95[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 1.95);
										GMBloque100[rankData.rank] = Math.round(rankData.reward.strategy_point_amount * 2);
									}
								} else {
									if (rankData.player.player_id == myID[myWorld] && rankData.forge_points) {
										GMInvestJoueur += rankData.forge_points * 1;
										if (GMPerso===false) {
											GMRank = rankData.rank;
										}
									}
								}
							}
							var myHTML = '<table id="foe_GM2_table" border="1"><tr><th>'+browser.i18n.getMessage("Rang")+'</th><th>'+GMName+'</th><th>'+browser.i18n.getMessage("Investis")+'</th><th>'+browser.i18n.getMessage("Bloque")+'</th><th style="font-weight: bold;"><b>'+browser.i18n.getMessage("Bonus")+' ' + myArche[myWorld].Bonus +'</b></th>';
							myHTML += "<th>"+browser.i18n.getMessage("Gain")+" 1.55</th><th>"+browser.i18n.getMessage("Gain")+" 1.60</th><th>"+browser.i18n.getMessage("Gain")+" 1.65</th><th>"+browser.i18n.getMessage("Gain")+" 1.70</th><th>"+browser.i18n.getMessage("Gain")+" 1.75</th><th>"+browser.i18n.getMessage("Gain")+" 1.80</th>";
							myHTML += "<th>"+browser.i18n.getMessage("Gain")+" 1.85</th><th>"+browser.i18n.getMessage("Gain")+" 1.90</th><th>"+browser.i18n.getMessage("Gain")+" 1.95</th><th>"+browser.i18n.getMessage("Gain")+" 2.00</th></tr>";
							var GMrestantTmp = GMrestant;
							for (var j=1; j<7; j++) { 
								GMBloque[j] = (GMrestantTmp / 2); // + (GMInvest[j] / 2);
								// bloqué ou pas ?
								if (j!=GMRank)
									GMBloque[j]+=(GMInvest[j] / 2);
								if (j <= GMRank && GMPerso===false)
									GMBloque[j]-=(GMInvestJoueur / 2);
								if (j==GMRank)
									GMBloque[j]+=((GMInvest[j+1]*1) / 2);
								if (GMBloque[j] >= GMrestant || GMBloque[j] < 0 || j == 6)
									GMBloque[j]=0;
								GMrestantTmp -= Math.round(GMBloque[j]);
								var GMBloqueTxt = '<td>'+Math.ceil(GMBloque[j])+'</td>';
								if (GMBloque[j] <= 0) 
									GMBloqueTxt = '<td></td>';
								if (j<6) {
									if (GMBloque[j] <= 0) {
										GMBloqueTxt = '<td style="background-color: #96CA2D;"> </td>';
									} else {
										GMBloqueTxt = '<td style="background-color: #C03000; font-weight: bold;"><b>'+Math.ceil(GMBloque[j])+'</b></td>';
									}
								}
								
								myHTML += "<tr><td>" + j + "</td>";
								myHTML += "<td>" + GMNom[j] + "</td>";
								myHTML += "<td>" + GMInvest[j] + "</td>";
								myHTML += GMBloqueTxt;
								myHTML += '<td style="font-weight: bold;"><b>' + GMBonus[j] + '</b></td>';
								myHTML += "<td>" + GMBloque55[j] + "</td>";
								myHTML += "<td>" + GMBloque6[j] + "</td>";
								myHTML += "<td>" + GMBloque65[j] + "</td>";
								myHTML += "<td>" + GMBloque7[j] + "</td>";
								myHTML += "<td>" + GMBloque75[j] + "</td>";
								myHTML += "<td>" + GMBloque8[j] + "</td>";
								myHTML += "<td>" + GMBloque85[j] + "</td>";
								myHTML += "<td>" + GMBloque9[j] + "</td>";
								myHTML += "<td>" + GMBloque95[j] + "</td>";
								myHTML += "<td>" + GMBloque100[j] + "</td></tr>";
							}
							myHTML += "</table>";
							if (GMInvestJoueur > 0) {
								myHTML += browser.i18n.getMessage("PF_restants")+" : "+GMrestant+",<br>"+browser.i18n.getMessage("Investissement")+" "+myName[myWorld]+" : "+GMInvestJoueur;
							} else {
								myHTML += browser.i18n.getMessage("PF_restants")+" : "+GMrestant;
							}
							window.document.getElementById("foe-GM2").innerHTML = myHTML;
						}
					}
					
					if (GestionAmis[myWorld]) {
						// Capture des events
						if (responseData.events) {
							if (responseData.page == 1) {
								playerID.length = 0;
								playerArray = {'-1':{'Nom':'-1','Rang':0,'Membre':-1,'PoliMoti':-1,'Taverne':-1,'AttaqueOK':-1,'AttaqueKO':-1}};
								for (var j=0; j<cptFriend; j++) {
									playerArray[friendArray[j].PlayerID] = {'Nom':friendArray[j].Nom,'Rang':j,'Membre':friendArray[j].Membre,'PoliMoti':0,'Taverne':0,'AttaqueOK':0,'AttaqueKO':0}; 
									playerID[j]=friendArray[j].PlayerID;
								}
								cptPlayer = cptFriend;
							}
							for (var j=0; j<responseData.events.length; j++) {
								var eventData = responseData.events[j];
	/* classes d'events :
								'SocialInteractionEvent'			// poli/motiv 
								'FriendTavernSatDownEvent'			// Taverne 
								'GreatBuildingBuiltEvent'			// Construction GM guilde
								'ClanInvitedEvent'					// Invitation de guilde
								'EntityLevelUpEvent'				// Level UP de son propre GM 
								'BattleEvent'						// Bataille 
								'GreatBuildingContributionEvent'	// UP GM guilde 
								'ClanMemberNewEraEvent'				// Nouvelle Ere Guilde
								'ClanMemberLeftEvent'				// Départ Guilde 
								'ClanMemberJoinedEvent'				// Arrivée Guilde
	*/
								switch (eventData.__class__) {
								  case 'SocialInteractionEvent':			// poli/motiv 
								  case 'FriendTavernSatDownEvent':			// Taverne 
									var myPlayerID = eventData.other_player.player_id+"";
									if (!playerArray[myPlayerID]) {
										cptPlayer++;
										playerID[cptPlayer]=myPlayerID;
										playerArray[myPlayerID] = {'Nom':eventData.other_player.name,'Rang':0,'Membre':-1,'PoliMoti':0,'Taverne':0,'AttaqueOK':0,'AttaqueKO':0}; 
										if (eventData.other_player.is_neighbor && eventData.other_player.is_friend && eventData.other_player.is_guild_member)
											playerArray[myPlayerID].Membre = 7;
										else if (eventData.other_player.is_neighbor && eventData.other_player.is_guild_member)
											playerArray[myPlayerID].Membre = 6;
										else if (eventData.other_player.is_neighbor && eventData.other_player.is_friend)
											playerArray[myPlayerID].Membre = 5;
										else if (eventData.other_player.is_friend && eventData.other_player.is_guild_member)
											playerArray[myPlayerID].Membre = 4;
										else if (eventData.other_player.is_neighbor)
											playerArray[myPlayerID].Membre = 3;
										else if (eventData.other_player.is_friend)
											playerArray[myPlayerID].Membre = 2;
										else if (eventData.other_player.is_guild_member)
											playerArray[myPlayerID].Membre = 1;
									}
									if (eventData.__class__ == 'SocialInteractionEvent')
										playerArray[myPlayerID].PoliMoti++;
									else if (eventData.__class__ == 'FriendTavernSatDownEvent')
										playerArray[myPlayerID].Taverne++;
									break;
								  case 'GreatBuildingBuiltEvent':			// Construction GM guilde
									break;
								  case 'ClanInvitedEvent':					// Invitation de guilde
									break;
								  case 'EntityLevelUpEvent':				// Level UP de son propre GM 
									break;
								  case 'BattleEvent':						// Bataille 
									break;
								  case 'GreatBuildingContributionEvent':	// UP GM guilde 
									break;
								  case 'ClanMemberNewEraEvent':				// Nouvelle Ere Guilde
									break;
								  case 'ClanMemberLeftEvent':				// Départ Guilde 
									break;
								  case 'ClanMemberJoinedEvent':				// Arrivée Guilde
									break;
								  default:
									console.log('pas de prise en charge : '+eventData.__class__);
								}

							}
						}
					}
				}
				// on a chargé de l'historique
				if (GestionAmis[myWorld] && cptPlayer >= 0) {
					var myHTML = "<table id='foe_info_table' border='1'><tr><th>"+browser.i18n.getMessage("Nom")+"</th><th>"+browser.i18n.getMessage("Voisin")+"</th><th>"+browser.i18n.getMessage("Guilde")+"</th><th>"+browser.i18n.getMessage("Ami")+"</th><th>"+browser.i18n.getMessage("Rang")+"</th><th>"+browser.i18n.getMessage("PoliMoti")+"</th><th>"+browser.i18n.getMessage("Taverne")+"</th></tr>";
					
					for (var i=0; i<cptPlayer; i++) {
						if (playerArray[playerID[i]]) {
							myHTML += "<tr><td>" + playerArray[playerID[i]].Nom + "</td><td>";
							// voisin
							if (playerArray[playerID[i]].Membre * 1 > 4 || playerArray[playerID[i]].Membre == '3') 
								myHTML +=  "1</td><td>";
							else
								myHTML +=  "0</td><td>";
							// Guilde
							if (playerArray[playerID[i]].Membre * 1 > 5 || playerArray[playerID[i]].Membre == '4' || playerArray[playerID[i]].Membre == '1') 
								myHTML +=  "1</td><td>";
							else
								myHTML +=  "0</td><td>";
							// Ami
							if (playerArray[playerID[i]].Membre == '2' || playerArray[playerID[i]].Membre == '4' || playerArray[playerID[i]].Membre == '5' || playerArray[playerID[i]].Membre == '7') {
								myHTML +=  "1</td><td>";
								myHTML +=  (playerArray[playerID[i]].Rang+1)+"</td><td>";
							} else
								myHTML +=  "0</td><td>0</td><td>";
							myHTML +=  playerArray[playerID[i]].PoliMoti + "</td><td>" + playerArray[playerID[i]].Taverne + "</td></tr>";
						}
					}
					myHTML += "</table>";
					myHTML += '<span style="width:0px;"/>';

					window.document.getElementById("foe-info").innerHTML = myHTML;
					// Application de natsortTable à un tableau
					natsortTable(window.document.getElementById('foe_info_table'));
				}
				myReceipt = "";
			} catch (err) {
				console.log("content Receipt : "+err+"="+myReceipt.length);
				console.log("content Receipt : "+myReceipt);
				if (!myName[myWorld]) myName[myWorld]='\u00a0';
				var ici=1;
			}
		} else {
			myReceipt = "";
		}
	});

}


