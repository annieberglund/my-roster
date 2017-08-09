function PlayerController() {
    var loading = true; //Start the spinner
    var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var service = new PlayerService(apiUrl, ready);

    function ready(playersData) {;
        console.log(playersData);
        loading = false; //stop the spinner
        //Now that all of our player data is back we can safely setup our bindings for the rest of the view
    }

    function drawPlayers(playersData) {
        var template = ''

        console.log("I'm here");

        for (var i = 0; i < playersData.length; i++) {
            var player = playersData[i];
            template += `
            <div>
                    <img src="${player.photo}" alt="player place holder">
                    <h4>${player.fullname}</h4>
                    <h5>${player.position}</h5>
                    <p>${player.pro_team}</p>
                    <button onclick="app.controllers.controller.addPlayer(${player.id})">ADD</button>
            </div>        
            `
        }
        document.getElementById('player-card').innerHTML = template;
    }
    var drawRoster = function() {
        debugger
        var roster = service.getRoster()
        var template = ''

        roster.forEach(char => {
            template += `
            <div>
                    <img src="${player.photo}" alt="player place holder">
                    <h4>${player.fullname}</h4>
                    <h5>${player.position}</h5>
                    <p>${player.pro_team}</p>
                    <button onclick="app.controllers.controller.removePlayer(${player.id})">Remove</button>
            </div>        
            `
        })
        document.getElementById('my-roster').innerHTML = template;
    }


    this.addPlayer = function (id) {
        service.addPlayer(id);
        drawRoster(service.getPlayersData())
    }
    this.getPlayersByTeam = function (e) {
        e.preventDefault();
        var teamName = e.target.teamName.value.toLowerCase(); //goes into your button event, looks at its target value, gets name property ('')
        drawPlayers(service.getPlayersByTeam(teamName))

    }
    this.getPlayersByPosition = function (e) {
        e.preventDefault();
        var position = e.target.position.value.toLowerCase();
        drawPlayers(service.getPlayersByPosition(position))
    }
    this.getPlayersByName = function (e) {
        e.preventDefault();
        var playerName = e.target.fullname.value.toLowerCase();
        drawPlayers(service.getPlayersByName(playerName))
    }


    console.log(service);

}