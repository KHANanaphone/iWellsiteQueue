var Consumer = {
		
	sessionId: null,
	$topics: {},
	autoCheck: {},
	status: {},
	
	setAutoCheck: function(input){

		var $section = $(input).parent('.topic-section');
		var name = $section.attr('topic-name');		
		Consumer.autoCheck[name] = input.checked;
		
		if(input.checked && Consumer.status[name] == 0)
			Consumer.getNext(name);
	},
	
	subscribeToTopic: function(){
			
		var topicName = $('#topicName').val();
		
		if(topicName.length <= 0)
			return;
		if(Consumer.$topics[topicName]) //already subscribed
			return;
		
		var $topic = $('.hidden .topic-section').clone();		
		
		$topic.attr('topic-name', topicName);
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
		Consumer.status[topic] = 1;		
		
		$.get(server, {id: Consumer.sessionID})
		.error(errorCallback)
		.success(callback);
					
		function errorCallback(e){
			
			debugger;
			$topic.find('.status').text(e.responseText);
			
			if(e.status != 408)
				Consumer.autoCheck[topic] = false;
				
			doNext();
				
		};
		
		function callback(message){

			$topic.find('.messages').append('<p>' + message + '</p>');
			$topic.find('.status').text('');
			doNext();
		};
		
		function doNext(){

			if(Consumer.autoCheck[topic]){
				Consumer.getNext(topic);
			}
			else{
				stopSpinAnim();
				Consumer.status[topic] = 0;	
			}
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