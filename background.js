/*browser.contextMenus.create({
	id: "copy_active_table",
	title: "Копировать таблицу действующих ВС",
	icons: {
		32: "icons/icon32active.png"
	},
});

browser.contextMenus.create({
	id: "copy_historic_table",
	title: "Копировать таблицу бывших ВС",
	icons: {
		32: "icons/icon32historic.png"
	},
});*/

browser.contextMenus.create({
	id: "copy_fleet_table",
	title: "Копировать таблицу ВС",
	icons: {
		32: "icons/icon32.png"
	},
});

browser.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "copy_active_table") {
		browser.tabs.executeScript({
			file: "active.js",
		});
	}

	if (info.menuItemId === "copy_historic_table") {
		browser.tabs.executeScript({
			file: "historic.js",
		});
	}

	if (info.menuItemId === "copy_fleet_table") {
		browser.tabs.executeScript({
			file: "selector.js",
		});
	}



});