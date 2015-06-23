(function(){

	var root = this;

	var room = {

		set title(text) {
			showText('theTitle', text);
		},
		set description(text) {
			showText('theDescription', text);
		},
		commands: []
	}

	root.addEventListener('load', initialize);

	return;

	function initialize() {

		document.getElementById('theCommand').onKeypress = onCommandKeypress;

		gotoLocation('intro');

	}

	function onCommandKeypress() {
		//13
		console.log('onCommandKeypress', this, arguments);
	}

	function showText(id, text) {
		document.getElementById(id).textContent = text;
	}

	function gotoLocation(name) {
		getData('locations/' + name + '.json', onRoomDataAvailable);
	}

	function onRoomDataAvailable(data) {
		room.title = data.name;
		room.description = data.description;
		room.commands = data.commands;
	}

	function onErrorGettingData(message) {
		console.error('error!', message);
	}

	function getData(url, onGotData) {

		var request = new XMLHttpRequest();

		request.open('GET', url, true);

		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // HACK

		request.onerror = onErrorGettingData;
		request.onabort = onErrorGettingData;
		request.ontimeout = onErrorGettingData;

		request.onreadystatechange = function() {

			if(request.readyState === 4 && 
				request.status === 200) {

				onGotData(JSON.parse(request.responseText));

			}
		}

		request.send();
	}

}).call(this);