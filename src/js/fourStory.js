require('../../node_modules/es6-promise').polyfill();
require('../../node_modules/leaflet/dist/leaflet.css');
require('../css/fourStory.css');

var FSApiController = require('./fourSquareApiController.js');
var fourStoryMap = require('./mapController.js');

const apiController = new FSApiController.FSApiController();
const map = new fourStoryMap.fourStoryMap('map');

Promise.all([map.initPromise, apiController.getCheckinHistory()]).then((results)=>{
	console.log(apiController.history);
	apiController.openDatabase((history) => map.updateMarkers(history));
	map.map.on('moveend', ()=>{
		console.log('move3');
	});
});

