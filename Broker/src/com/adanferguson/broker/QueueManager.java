package com.adanferguson.broker;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class QueueManager {
	
	private Map<String, ArrayList<String>> messages;
	private Map<String, Map<String, Integer>> consumerStatuses;
	
	public QueueManager(){
		
		this.messages = new HashMap<String, ArrayList<String>>();
		this.consumerStatuses = new HashMap<String,  Map<String, Integer>>();
	}
	
	/**
	 * Add a message to a given topic.
	 * 
	 * @param topic Topic name
	 * @param message Message to be added 
	 */
	public void addMessage(String topic, String message){
		
		ArrayList<String> messages = this.messages.get(topic);
		
		if(messages == null){
			
			// if the topic doesn't exist, create it
			messages = new ArrayList<String>();
			this.messages.put(topic, messages);
		}
		
		messages.add(message);
	}
	
	public void getMessage(String topic, String consumerID){
		
		
	}
}
