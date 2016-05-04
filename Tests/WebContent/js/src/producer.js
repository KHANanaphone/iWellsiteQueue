$(document).ready(function(){
	
	$('.button').click(sendMessage);
	$('#message').keyup(function(e){
		
		if(e.keyCode == 13)
			sendMessage();
	});	

	function sendMessage(){			

		var name = $('#topicName').val();
		var message = $('#message').val();
		
	    var server = 'http://' + CONFIG.serverName + '/Broker/' + name;
	    
	    $.post(server, {message: message}, callback);

	    function callback(error){
	    
	    	if(error)
	            $('#response')
	            .addClass('alert-danger')
	            .removeClass('alert-success')
	            .text(error);
	    	else {

	        	$('#response')
	        	.addClass('alert-success')
	        	.removeClass('alert-danger')
	        	.text("Message added successfully. Add another?");
	        	
	        	$('#topicName').val('');
	        	$('#message').val('');
	    	}       		
	    };			
	};
	
});

