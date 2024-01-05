function parseAircraftList(){
	
	let pageTitle = document.getElementsByTagName("Title")[0].innerText;
	let afAirline = pageTitle.slice(0,pageTitle.indexOf(" Fleet"));
	
	let dataTable = document.getElementsByClassName("datatable dt-outline dt-striped")[0];
	
	let dataRows = dataTable.querySelectorAll(".dt-tr");
	
	let copyArray = "";
	
	for(let dr = 1; dr < dataRows.length; dr++){
		dataCells = dataRows[dr].querySelectorAll(".dt-td");
//		if(dataCells[5].innerText == "ntu"){continue}
		let afReg = dataCells[1].innerText;
		let afSerial = getMsnLn(dataCells[2].innerText);
		let afMSN = afSerial[0].padStart(4,"0");
		let afLN = afSerial[1];
		let afBrandAndModel = getBrandAndModel(dataCells[3].innerText);
		let afBrand = afBrandAndModel[0];
		let afModel = afBrandAndModel[1];
		let afConfig = getConfig(dataCells[4].innerText);
		let afDelivered = getEventDate(dataCells[5].innerText);
		let afStatus = "Летает";
		
		let copyString = `${afBrand};${afModel};${afReg};${afMSN};${afLN};${afAirline};${afDelivered};;${afConfig};${afStatus}\n`;
		copyArray += copyString;
	}
	navigator.clipboard.writeText(copyArray);
	window.alert("Данные скопированы");
}


function getMsnLn(serialNumber){
	let msn = "";
	let ln = "";
	
	let values = serialNumber.split(" / ");
	msn = values[0];
	if(values.length == 2){ln = values[1];}
	
	numbers = [msn, ln];
	
	return numbers;
}


function getBrandAndModel(aircraft){
	
	const brands = ["Airbus ", "Antonov ", "ATR ", "Boeing ", "Bombardier ", "De Havilland Canada ", "British Aerospace ", "Cessna ", "COMAC ", "Convair ", "Dassault ", "McDonnell Douglas ", "Douglas ", "Dornier ", "Fairchild Dornier ", "Embraer ", "Fokker ", "Ilyushin ", "Lockheed ", "Saab ", "Short ", "Sukhoi ", "Tupolev "];
	
	const replaces = [
					["737-7 MAX", "737 MAX 7"],
					["737-8 MAX", "737 MAX 8"],
					["737-8200 MAX", "737 MAX 8 200"],
					["737-9 MAX", "737 MAX 9"],
					["737-8 MAX", "737 MAX 10"],
					["Tu-", "Ту-"],
					["Il-", "Ил-"],
					["An-", "Ан-"],
					["-148-100B", "-148-100В"],
					["-148-100EA", "-148-100ЕА"],
					["-148-100EM", "-148-100ЕМ"],
					["-148-100E", "-148-100Е"],
					["-124-100M", "-124-100М"],
					["-204C", "-204С"],
					["-204-100C", "-204-100С"],
					["-204-120CE", "-204-120СЕ"],
					["-204-120C", "-204-120С"],
					["-204-100E", "-204-100Е"],
					["-204-100B", "-204-100В"],
					["-204CM", "-204СМ"],
					["-214LMK", "-214ЛМК"],
					["-214ON", "-214ОН"],
					["-214PU-SBUS", "-214ПУ-СБУС"],
					["-214PU", "-214ПУ"],
					["-214R", "-214Р"],
					["-214SR", "-214СР"],
					["-214SUS", "-214СУС"],
					["-214VPU", "-214ВПУ"],
					["-96-300PU", "-96-300ПУ"],
					["-96-400M", "-96-400М"],
					["-96-400T", "-96-400Т"],
					["-96-400VPU", "-96-400ВПУ"],
					["-96-400VVIP", "-96-400В VIP"],
					["KC-767J (767-2FKER)", "767-2FKER (KC-767J)"],
					["KC-767A (767-2EYER)", "767-2EYER (KC-767A)"],
					["KC-46A Pegasus (767-2LKC)", "767-2LKC (KC-46A Pegasus)"],
					["KC-46A Pegasus (767-2C)", "767-2C (KC-46A Pegasus)"],
					["E-767 (B767-27CER)", "B767-27CER (E-767)"],
					["P-8I Neptune (737-8FV)", "737-8FV (P-8I Neptune)"],
					["P-8A Poseidon MRA1 (737-800A)", "737-800A (P-8A Poseidon MRA1)"],
					["P-8A Poseidon (737-8FV)", "737-8FV (P-8A Poseidon)"],
					["P-8A Poseidon (737-800A)", "737-800A (P-8A Poseidon)"],
					["KC-30A (A330-203MRTT)", "A330-203MRTT (KC-30A)"],
					["Voyager KC2 (A330-243MRTT)", "A330-243MRTT (Voyager KC2)"],
					["Voyager KC3 (A330-243MRTT)", "A330-243MRTT (Voyager KC3)"],
					["CC-330 (A330-243)", "A330-243 (CC-330)"]
					];
		
	for(let b of brands){
		if(aircraft.includes(b)){
			afBrand = b.trim();
			afModel = aircraft.substr(aircraft.indexOf(b) + b.length);
			
			for(let r = 0; r < replaces.length; r++){
				if(afModel.includes(replaces[r][0])){
					afModel = afModel.replace(replaces[r][0], replaces[r][1]);
					//break;
				}
			}
			const afComplete = [afBrand, afModel];
			return afComplete;
		}
	}
}


function getConfig(config){
	
	switch(config){
		case "Cargo":
		case "Preighter":
			return "Грузовой";
			break;
		case "Military Transport":
			return "Грузовой";
			break;
		case "Tanker Transport":
			return "Спец. назначения";
			break;
		case "Testbed":
			return "Испытания";
			break;
		case "Multi-Role Tanker Transport":
			return "Спец. назначения";
			break;
		case "Maritime Patrol":
			return "Спец. назначения";
			break;
		default:
			return "Пассажирский";
	}
}


function getEventDate(d){
	
	let months = [
		["Jan", "01"],
		["Feb", "02"],
		["Mar", "03"],
		["Apr", "04"],
		["May", "05"],
		["Jun", "06"],
		["Jul", "07"],
		["Aug", "08"],
		["Sep", "09"],
		["Oct", "10"],
		["Nov", "11"],
		["Dec", "12"]
	];
	
	let dateParts = d.split(" ");
	let eventDate = "";
	
	switch(dateParts.length){
		case 1:
			if(dateParts[0].length == 4){
				eventDate = `00.${dateParts[0]}`;
				break;
			}
		case 2:
			for(let m = 0; m < months.length; m++){
				if(dateParts[0] == months[m][0]){
					dateParts[0] = months[m][1];
					eventDate = `${dateParts[0]}.${dateParts[1]}`;
					break;
				}
			}
		case 3:
			for(let m = 0; m < months.length; m++){
				if(dateParts[1] == months[m][0]){
					dateParts[1] = months[m][1];
					eventDate = `${dateParts[1]}.${dateParts[2]}`;
					break;
				}
			}
	}
	
	return eventDate;
}


function getStatus(statusfate){
	
	switch(statusfate){
		case "Active":
		case "Parked":
			return "Летает";
			break;
		case "Stored":
			return "На хранении";
			break;
		case "Scrapped":
		case "Partially Scrapped":
			return "Порезан";
			break;
		case "Written Off":
			return "Списан";
			break;
		case "Preserved":
			return "Экспонат";
			break;
		case "On Order":
			return "Заказан";
			break;
		default:
			return "Смена оператора";
	}
}

if(document.URL.includes("planespotters.net/airline/")){
	parseAircraftList();
} else {
	window.alert("Адрес источника не совпадает с целевым");
}
