

const apiController = new FSApiController();
const map = new fourStoryMap('map');

Promise.all([map.initPromise, apiController.getCheckinHistory()]).then((results)=>{
	console.log(apiController.history);
	apiController.openDatabase((history) => map.updateMarkers(history));
	map.map.on('moveend', ()=>{
		
	});
});

