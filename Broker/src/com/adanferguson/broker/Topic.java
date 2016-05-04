package com.adanferguson.broker;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Topic {
	
	private ArrayList<String> messages;
	private Map<String, Integer> consumerStatuses;
	private String name;
	
	public Topic(String name){
		
		this.setName(name);
		this.messages = new ArrayList<String>();
		this.consumerStatuses = new HashMap<String, Integer>();
	};
	
	public void addMessage(String message){
		
		this.messages.add(message);
	};
	
	public String getMessage(String consumerID){
		
		Integer status = this.consumerStatuses.get(consumerID);
		
		if(status == null){
			
			status = new Integer(0);
			this.consumerStatuses.put(consumerID, new Integer(0));
		}
		
		int s = status.intValue();
		
		// no more messages to read
		if(s >= this.messages.size())
			return null;	
		
		this.consumerStatuses.put(consumerID, s + 1);	
		return this.messages.get(s);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	};
}
