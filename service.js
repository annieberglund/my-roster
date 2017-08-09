var PlayerService = function (endpointUri, callback) {
    var playersData = [];
    var myRoster = [];

    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem(playersData);
        if (localData) {
            playersData = JSON.parse(localData);
            return callback(playersData);
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "//bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        return $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback(playersData) //<--- something inside of 'callback(?)' ??? '(res.data.results)'
        })
    }

    //ADD PLAYER TO ROSTER
    this.addPlayer = function (id) {
        var player = playersData.find(char => char.id == id)
        if (myRoster.indexOf(player) == -1) {
            myRoster.push(player)
        }
    }
   

    //GET PLAYER BY TEAM    
    this.getPlayersByTeam = function (teamName) {
        var list = playersData.filter(function (player) {
            //console.log(player)
            if (player.pro_team.toLowerCase() == teamName && player.firstname != '') {
                return true;
            }
        });
        return list;
    }
    //GET PLAYERS BY POSITION
    this.getPlayersByPosition = function (position) {
        var list = playersData.filter(function (player) {
            if (player.position.toLowerCase() == position && player.firstname != '') {
                return true;
            }
        });
        return list;
    }
        this.getPlayersByName = function (playerName) {
        var list = playersData.filter(function (player) {
            if (player.fullname.toLowerCase() == playerName  && player.firstname != '') {
                return true;
            }
        });
        return list;
    }
   this.getRoster = function() {
       return JSON.parse(JSON.stringify(myRoster))
   }

    loadPlayersData();

}
