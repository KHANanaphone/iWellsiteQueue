var Consumer = {
		
	sessionId: null,
	$topics: {},	
	subscribeToTopic: function(){
			
		var topicName = $('#topicName').val();
		
		if(topicName.length <= 0)
			return;
		if(Consumer.$topics[topicName]) //already subscribed
			return;
		
		var $topic = $('.hidden .topic-section').clone();		
		
		$topic.find('.name').text(topicName);	
		$topic.find('button').click(function(){ Consumer.getNext(topicName)});
		
		Consumer.$topics[topicName] = $topic;	
		$('#topics').append($topic).removeClass('hidden');
		
		Consumer.getNext(topicName);
	},
	
	getNext: function(topic){		

		var server = 'http://' + CONFIG.serverName + '/Broker/' + topic;
		var $topic = Consumer.$topics[topic];
		
		startSpinAnim();
		
		$.get(server, {id: Consumer.sessionID})
		.error(errorCallback)
		.success(callback);
					
		function errorCallback(e){
			
			stopSpinAnim();			
			$topic.find('.status').text(e.responseText);
		};
		
		function callback(message){

			$topic.find('.messages').append('<p>' + message + '</p>');
			stopSpinAnim();
			$topic.find('.status').text('');
		};
		
		function startSpinAnim(){
			$topic.find('.check').addClass('hidden');
			$topic.find('.checking').removeClass('hidden');
		}
		
		function stopSpinAnim(){
			$topic.find('.checking').addClass('hidden');
			$topic.find('.check').removeClass('hidden');
			
		}
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