class FSApiController{
	constructor(){
		this.api = "https://api.foursquare.com/v2/";
		this.version = 20150404;
		this.mode = "swarm";
		this.token = document.location.hash.split('=')[1];

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

	getCheckinHistory(){
		const xhr = new XMLHttpRequest();
		const url = `https://api.foursquare.com/v2/users/self/checkins?oauth_token=${this.token}&v=20150404&m=swarm&limit=250`
	    xhr.open("GET", url);
	    xhr.send(null);
	    const promise = new Promise((resolve, reject)=>{
	    	xhr.onload = (res) =>{
		    	this.history = JSON.parse(xhr.responseText).response.checkins.items;
		    	console.log(this.history[0]);
		    	const statusText = document.createTextNode("fetched history");
		    	this.status.appendChild(statusText);
		    	resolve();
	    	}
	    });

	    return promise;
	}

	openDatabase(){
		var db;
		var request = indexedDB.open("FourStoryDB");
		request.onerror = function(event) {
		  // Generic error handler for all errors targeted at this database's
		  // requests!
		  alert("Database error: " + event.target.errorCode);
		};

		request.onsuccess = function(event) {
			console.log("db successfully opened");
			this.db = event.target.result;
			//Ok the DB is opened and data is added to it (because this gets called after onupgradeneeded is successful)
			//So let's try and pull checkins in a fixed time range out of the IndexedDB.
			var dateRange = IDBKeyRange.bound(1428525636, 1428705636, true, true);
			var objectStore = this.db.transaction("checkins").objectStore("checkins");
			var index = objectStore.index("createdAt");
			index.openCursor(dateRange, "prev").onsuccess = (event) =>{
				var cursor = event.target.result;
				if (cursor) {
				console.log(cursor.value.venue.name);
				cursor.continue();
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
			// objectStore.createIndex("latitude", "venue.location.lat", { unique: false });
			// objectStore.createIndex("longitude", "venue.location.lng", { unique: false });
			objectStore.transaction.oncomplete = (event) => {
			    // Store values in the newly created objectStore.
			    var checkinObjectStore = this.db.transaction("checkins", "readwrite").objectStore("checkins");
			    for (var i in this.history) {
			      checkinObjectStore.add(this.history[i]);
			    	console.log("write transaction");
			    }
			};
		}
	}

	getCheckinsInRange(startDate, endDate){
		// this.db.
	}

	getNewestCheckins(){
		//Look at latest checkin
		//Fetch next 250 checkins (max allowed at once by API)
		//If there are more, recurse
	}
}