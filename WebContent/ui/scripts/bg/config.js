/*
 * Copyright 2011 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of SingleFile.
 *
 *   SingleFile is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   SingleFile is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with SingleFile.  If not, see <http://www.gnu.org/licenses/>.
 */

(function() {

	singlefile.config = {};

	singlefile.config.set = function(config) {
		localStorage.config = JSON.stringify(config);
	};

	singlefile.config.get = function() {
		return localStorage.config ? JSON.parse(localStorage.config) : {
			removeFrames : false,
			removeScripts : false,
			removeObjects : false,
			removeHidden : false,
			removeUnusedCSSRules : false,
			processInBackground : true,
			displayProcessedPage : false,
			getContent : true,
			getRawDoc : false,
			displayInContextMenu : true,
			sendToPageArchiver : false,
			displayNotification : false,
			displayBanner: true
		};
	};

	singlefile.config.reset = function() {
		delete localStorage.config;
	};

	// migration 0.1 -> 0.2
	delete localStorage.options;

	// migration 0.2.26 -> 0.2.27
	if (localStorage.config) {
		var conf = singlefile.config.get();
		if (typeof conf.displayInContextMenu == "undefined") {
			conf.displayInContextMenu = true;
			singlefile.config.set(conf);
		}
	}

	// migration 0.2.33 -> 0.3.0
	if (localStorage.config) {
		var conf = singlefile.config.get();
		if (typeof conf.displayNotification == "undefined") {
			conf.sendToPageArchiver = conf.getContent;
			conf.getContent = true;
			conf.displayNotification = false;
			conf.displayBanner = true;
			conf.processInBackground = true;
			conf.displayProcessedPage = false;
			singlefile.config.set(conf);
		}
	}

})();
