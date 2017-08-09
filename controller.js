function PlayerController() {
    var loading = true; //Start the spinner
    var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var service = new PlayerService(apiUrl, ready);

    function ready(playersData) {
        drawPlayers(playersData);
        console.log(playersData);
        loading = false; //stop the spinner
        //Now that all of our player data is back we can safely setup our bindings for the rest of the view
    }

    function drawPlayers(playersData) {
        var template = ''
      
        console.log("I'm here");

        for(var i = 0; i < playersData.length; i++) {
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
    drawRoster = function () {
        var roster = service.getRoster()
        var template = ''

        roster.forEach(char => {
            
        })

    }
    this.addPlayer = function (id) {
        var newPlayer = service.addPlayer(id)
        drawPlayers(service.getPlayersData()) 
    }
    this.getPlayersByTeam = function(e) {
        e.preventDefault(); 
        var teamName = e.target.teamName.value.toLowerCase(); //goes into your button event, looks at its target value, gets name property ('')
        drawPlayers(service.getPlayersByTeam(teamName))
        
    }
    this.getPlayerByPosition = function (e) {
        service.getPlayerByPosition(position)
        var position = e.target.position.value.toLowerCase();
        drawPlayers(service.getPlayersByPosition(position))
    }
    
	
    console.log(service);

}