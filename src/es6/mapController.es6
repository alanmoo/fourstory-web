class fourStoryMap{
	constructor(elementId){
		this.map = L.map(elementId);
		this.initPromise = new Promise((resolve, reject)=>{
			navigator.geolocation.getCurrentPosition((loc)=>{
				this.currentLocation = loc.coords;
				// this.initializeMap(elementId, this.currentLocation);
				this.map.setView([loc.coords.latitude, loc.coords.longitude], 15);
				L.tileLayer('http://{s}.tiles.mapbox.com/v4/alanmoo.ll4kikll/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYWxhbm1vbyIsImEiOiIzN0pFVDVZIn0.MUpIBwrMiV7QB2H8OtDUvQ', {
				    maxZoom: 18
				}).addTo(this.map);
				this.bindMapRedraw();
				resolve();
			});
		});
	}
	updateMarkers(checkins){
		checkins.forEach((checkin)=>{
			const checkincoords = [checkin.venue.location.lat, checkin.venue.location.lng];
			if(this.map.getBounds().contains(checkincoords)){
				L.marker(checkincoords).bindPopup(`${checkin.venue.name} ${new Date(checkin.createdAt*1000)}`).addTo(this.map);
			}
		});
	}
	bindMapRedraw(){
		this.map.on('moveend', ()=>{
			console.log("move end");
		});
	}
}