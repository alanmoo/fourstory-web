class fourStoryMap{
	constructor(elementId){
		this.map = L.map(elementId);
		this.customTilesUrl = 'http://{s}.tiles.mapbox.com/v4/alanmoo.ll4kikll/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYWxhbm1vbyIsImEiOiIzN0pFVDVZIn0.MUpIBwrMiV7QB2H8OtDUvQ';
		this.initPromise = new Promise((resolve, reject)=>{
			//TODO: Initalize to fixed location after X seconds/getCurrentPosition failure, or maybe location of last checkin
			navigator.geolocation.getCurrentPosition((loc)=>{
				this.currentLocation = loc.coords;
				this.map.setView([loc.coords.latitude, loc.coords.longitude], 15);
				L.tileLayer(this.customTilesUrl, {maxZoom: 18}).addTo(this.map);
				// this.bindMapRedraw();
				resolve();
			});
		});
	}
	updateMarkers(checkins){
		//Only gets passed in on the first call
		if(checkins){
			console.log(`this ${this}`);
			this.checkins = checkins;
		}

		this.checkins.forEach((checkin)=>{
			if(checkin.venue){
			const checkincoords = [checkin.venue.location.lat, checkin.venue.location.lng];
			//Not sure I need to worry about amount of markers on the map. Will test for performance when I have more data.
			// if(this.map.getBounds().contains(checkincoords)){
				L.marker(checkincoords).bindPopup(`${checkin.venue.name} ${new Date(checkin.createdAt*1000)}`).addTo(this.map);
			// }
			}
		});
	}
}