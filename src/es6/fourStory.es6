const apiController = new FSApiController();
const map = new fourStoryMap('map');

Promise.all([map.initPromise, apiController.getCheckinHistory()]).then(function(results){
	map.updateMarkers(apiController.history);
});
