

const apiController = new FSApiController();
const map = new fourStoryMap('map');

Promise.all([map.initPromise, apiController.getCheckinHistory()]).then(function(results){
	console.log(apiController.history);
	apiController.openDatabase();
	map.updateMarkers(apiController.history);
});
