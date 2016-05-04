var Producer = {
		
	sendMessage: function(){			

		var name = $('#topicName').val();
		var message = $('#message').val();
		
	    var server = 'http://' + CONFIG.serverName + '/Broker/' + name;
	    
	    $.post(server, {message: message})
	    .success(callback)
	    .error(errorCallback);
	    
	    function errorCallback(e, message){	    	
	    	
            $('#response')
            .addClass('alert-danger')
            .removeClass('alert-success')
            .text(e.responseText);
	    }

	    function callback(message){	    
	    	
        	$('#response')
        	.addClass('alert-success')
        	.removeClass('alert-danger')
        	.text("Message added successfully. Add another?");
        	
        	$('#topicName').val('');
        	$('#message').val('');
	    };			
	}
}

$(document).ready(function(){
	
	$('#message').keyup(function(e){
		
		if(e.keyCode == 13)
			Producer.sendMessage();
	});	
});

