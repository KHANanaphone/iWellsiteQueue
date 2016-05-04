$(document).ready(function(){
	
	var sessionID = null;	
	getSessionID();
	
	function checkTopic(){
		
	};
	
	function getSessionID(){		

	    var server = 'http://' + CONFIG.serverName + '/Broker/GetSessionID';
	    
	    $.get(server, callback);
	    
	    function callback(id){
	    	
	    	sessionID = id;
	    	$('#sessionID span').text(id);
	    };				
	};
	
});