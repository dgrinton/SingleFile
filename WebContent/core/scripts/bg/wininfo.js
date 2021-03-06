/*
 * Copyright 2011 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of SingleFile Core.
 *
 *   SingleFile Core is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   SingleFile Core is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with SingleFile Core.  If not, see <http://www.gnu.org/licenses/>.
 */

var wininfo = {
	init : function(tabId, processCallback) {
		function onConnect(port) {
			if (port.name == "wininfo" && port.sender.tab.id == tabId)
				port.onMessage.addListener(function(message) {
					// console.log("winfo.onMessage", tabId, message);
					if (message.initResponse)
						processCallback(message.processableDocs);
					chrome.extension.onConnect.removeListener(onConnect);
				});
		}

		chrome.extension.onConnect.addListener(onConnect);
		chrome.tabs.sendRequest(tabId, {
			initRequest : true,
			winId : "0",
			index : 0
		});
	}
};