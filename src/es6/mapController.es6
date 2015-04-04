class fourStoryMap{
	constructor(elementId){
		this.map = L.map(elementId);
		this.initPromise = new Promise((resolve, reject)=>{
			navigator.geolocation.getCurrentPosition((loc)=>{
				this.currentLocation = loc.coords;
				// this.initializeMap(elementId, this.currentLocation);
				this.map.setView([loc.coords.latitude, loc.coords.longitude], 15);
				L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				    maxZoom: 18
				}).addTo(this.map);
				resolve();
			});
		});
	}
	updateMarkers(checkins){
		checkins.forEach((checkin)=>{
			const checkincoords = [checkin.venue.location.lat, checkin.venue.location.lng];
			L.marker(checkincoords).addTo(this.map);
		});
	}
}