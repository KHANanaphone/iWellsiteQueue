var Consumer = {
		
	sessionId: null,
	subscribeToTopic: function(){
			
		var topic = $('#topicName').val();
		
		if(topic.length <= 0)
			return;
		
		var server = 'http://' + CONFIG.serverName + '/Broker/' + topic;
		
		$.get(server, {id: Consumer.sessionID})
		.error(errorCallback)
		.success(callback);
					
		function errorCallback(e){
			
			debugger;
		};
		
		function callback(message){

			debugger;			
		};
	}
};

$(document).ready(function(){
	
	var sessionID = null;	
	getSessionID();

	$('#topicName').keyup(function(e){
		
		if(e.keyCode == 13)
			Consumer.subscribeToTopic();
	});	
	
	function getSessionID(){		

	    var server = 'http://' + CONFIG.serverName + '/Broker/GetSessionID';
	    
	    $.get(server, callback);
	    
	    function callback(id){
	    	
	    	Consumer.sessionID = id;
	    	$('#sessionID span').text(id);
	    	$('#subscribe').removeClass('hidden');	    	
	    };				
	};
	
});