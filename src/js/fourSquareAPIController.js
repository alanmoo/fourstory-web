export class FSApiController{
	constructor(){
		this.LAST_CHECKIN_KEY = 'LAST_CHECKIN_DATE';
		this.api = "https://api.foursquare.com/v2/";
		this.version = 20150404;
		this.mode = "swarm";
		this.token = document.location.hash.split('=')[1];
		this.history = [];

		this.status = document.createElement("div");
		let statusText;
		if(this.token){
			statusText = document.createTextNode('logged in');
		} else {
			statusText = document.createTextNode("unable to fetch token from URL");
		}
		this.status.appendChild(statusText);
		document.body.appendChild(this.status);
	}

	_fetchNext250(offset, searchBeginTime, resolve, reject){
		const xhr = new XMLHttpRequest();
		// console.log(`searchBegin: ${searchBeginTime}`);
		// console.log(searchBeginTime.constructor);
		const url = `https://api.foursquare.com/v2/users/self/checkins?oauth_token=${this.token}&sort=oldestfirst&afterTimestamp=`+searchBeginTime+`&offset=${offset}&v=20150404&m=swarm&limit=250`
	    xhr.open("GET", url);
	    xhr.send(null);

		xhr.onload = (res) =>{
    		//Destructure to create an array of objects instead of an array of arrays
	    	this.history.push(...JSON.parse(xhr.responseText).response.checkins.items);
    		// console.log(JSON.parse(xhr.responseText).response.checkins.items);
	    	if(JSON.parse(xhr.responseText).response.checkins.items.length === 250){
	    		var newOffset = offset+250;
	    		console.log(`fetching from ${newOffset}`);
	    		// console.log(newOffset);
	    		// I don't want to have to make a bunch of calls during development. Uncomment next line, and remove following when done debugging
	    		this._fetchNext250(newOffset, searchBeginTime, resolve, reject);
	    		// resolve();
	    	} else {
	    		window.localStorage.setItem(this.LAST_CHECKIN_KEY, this.history[this.history.length -1 ].createdAt);
		    	const statusText = document.createTextNode("fetched history");
		    	this.status.appendChild(statusText);
	    		resolve();
	    	}
    	}
    }
	getCheckinHistory(offset = 0){

		var lastCheckinDate = window.localStorage.getItem(this.LAST_CHECKIN_KEY) || 1;

	    const promise = new Promise((resolve, reject)=>{
	    	this._fetchNext250(offset, lastCheckinDate, resolve, reject);
	    	// xhr.onload = (res) => {
		    // 	this.history = JSON.parse(xhr.responseText).response.checkins.items;
		    // 	console.log(this.history[0]);
		    // 	const statusText = document.createTextNode("fetched history");
		    // 	this.status.appendChild(statusText);
		    // 	resolve();
	    	// }

	    });

	    return promise;
	}


	openDatabase(callback){
		var db;
		var request = indexedDB.open("FourStoryDB");
		request.onerror = function(event) {
		  // Generic error handler for all errors targeted at this database's
		  // requests!
		  alert("Database error: " + event.target.errorCode);
		};

		request.onsuccess = (event) => {
			console.log("db successfully opened");
			db = event.target.result;
			//Ok the DB is opened and data is added to it (because this gets called after onupgradeneeded is successful)
			//So let's try and pull checkins in a fixed time range out of the IndexedDB.
			// var dateRange = IDBKeyRange.bound(1428525636, 1428705636, true, true);
			var dateRange = IDBKeyRange.bound(44, 45, true, true);
			var objectStore = db.transaction("checkins").objectStore("checkins");
			// var index = objectStore.index("createdAt");
			var index = objectStore.index("latitude");
			this.history = [];
			index.openCursor(dateRange, "prev").onsuccess = (event) => {
				var cursor = event.target.result;
				if (cursor) {
					this.history.push(cursor.value);
					cursor.continue();
				} else {
					console.log(this.history);
					callback(this.history);
				}
			}
			//This works, so some things next up: Fetch all of the user's data, bind the date range searching to a UI element


			// var index = this.db.objectStore.index("createdAt")
			// this.db.transaction("checkins","readonly").objectStore("checkins").get("55288597498ead4043c9ef40").onsuccess = (event)=>{
				// console.log(event.target.result);
			// };

		};

		request.onupgradeneeded = (event)=>{
			console.log("upgrading db");
			this.db = event.target.result;
			var objectStore = this.db.createObjectStore("checkins", { keyPath: "id" });
			objectStore.createIndex("createdAt", "createdAt", { unique: false });
			objectStore.createIndex("latitude", "venue.location.lat", { unique: false });
			objectStore.createIndex("longitude", "venue.location.lng", { unique: false });
			objectStore.transaction.oncomplete = (event) => {
			    // Store values in the newly created objectStore.
			    var checkinObjectStore = this.db.transaction("checkins", "readwrite").objectStore("checkins");
			    for (var i in this.history) {
			        if(this.history[i].venue){
					    checkinObjectStore.add(this.history[i]);
				    	console.log("write transaction");
				    }
			    }
			};
		}
	}

	getCheckinsInRange(startDate, endDate){

	}

}
