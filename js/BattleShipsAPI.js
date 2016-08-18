var BattleshipAPI = new function() {
	this.baseUrl = 'http://zeeslagavans.herokuapp.com/';
	this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im0ubmlqaG9sdEBzdHVkZW50LmF2YW5zLm5sIg.OxNflxP5dF8Ccf9YrR_Dq6OSCeaQ9TwIiOMmj4f_zFU';
	this.url = this.baseUrl + '[option]?token=' + this.token;

	this.getMyGames = function(callback) {

		var url = this.url.replace('[option]', 'users/me/games');
		$.ajax({
			url: url,
			dataType: 'json',
			type: 'GET',
			success: function(response) {
				callback(response);
			},
			error: function(response) {
				// onError do nothing
			}
		});
	};

	// Delete
	this.deleteGames = function(callback) {
		var url = this.url.replace('[option]', 'users/me/games');
		$.ajax({
			url: url,
			dataType: 'json',
			type: 'DELETE',
			success: function(response) {
				BattleshipAPI.getMyGames(callback);
			},
			error: function(response) {
				// onError do nothing
			}
		});
	};

	this.newGame = function(gameType, callback) {
		var url;
		if (gameType === 'PLAYER') {
			url = this.url.replace('[option]', 'games');
		} else if (gameType === 'CPU') {
			url = this.url.replace('[option]', 'games/AI');
		}
		$.ajax({
			url: url,
			dataType: 'json',
			type: 'GET',
			success: function(response) {
				BattleshipAPI.getMyGames(callback);
			},
			error: function(response) {
				// onError do nothing
			}
		});
	};

	// Voor elke game kun je alle informatie opvragen doormiddel van het Id.
	// Het is alleen mogelijk gegevens op te halen van een game waar je zelf aan deel neemt.
	this.getGameInfo = function(gameId, callback) {
		var url = this.url.replace('[option]', 'games/' + gameId);
		$.ajax({
			url: url,
			dataType: 'json',
			type: 'GET',
			success: function(response) {
				callback(response);
			},
			error: function(response) {
				// onError do nothing
			}
		});
	};

	// Get shipobjects
	this.getShips = function(callback) {
		var url = this.url.replace('[option]', 'ships');
		$.ajax({
			url: url,
			dataType: 'json',
			type: 'GET',
			success: function(response) {
				callback(response);
			},
			error: function(response) {
				// onError do nothing
			}
		});
	};

	// Submit boards
	this.submitGameBoard = function(gameId, gameBoard, callback) {
		var url = this.url.replace('[option]', 'games/' + gameId + '/gameboards');
		$.ajax({
			url: url,
			dataType: 'json',
			type: 'POST',
			data: gameBoard,
			success: function(response) {
				BattleshipAPI.getMyGames(callback);
			},
			error: function(response) {
				// onError do nothing
			}
		});
	};

	// Submit boards
	this.submitShot = function(gameId, shot, callback, cb) {
		var url = this.url.replace('[option]', 'games/' + gameId + '/shots');
		$.ajax({
			url: url,
			dataType: 'json',
			data: shot,
			type: 'POST',
			success: function(response) {
				cb(shot, response);
				BattleshipAPI.getGameInfo(gameId, callback);
			},
			error: function(response) {
				cb(shot, response);
				BattleshipAPI.getGameInfo(gameId, callback);
				// onError do nothing
			}
		});
	};
};