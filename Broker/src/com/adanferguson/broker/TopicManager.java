package com.adanferguson.broker;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class TopicManager {
	
	private Map<String, Topic> topics;
	
	public TopicManager(){
		
		this.topics = new HashMap<String, Topic>();
	}
	
	/**
	 * Add a message to a given topic.
	 * 
	 * @param topic Topic name
	 * @param message Message to be added 
	 */
	public void addMessage(String topicName, String message){
		
		this.getTopic(topicName).addMessage(message);
	}
	
	public String getMessage(String topicName, String consumerID){
		
		Topic t = this.getTopic(topicName);
		
		if(t == null)
			return null;
		
		return t.getMessage(consumerID);
	}
	
	/*
	 * Get the topic object with the given name. If none exists, create one and return that. 
	 */
	private Topic getTopic(String name){
		
		Topic topic = topics.get(name);
		
		if(topic == null){
			
			// if the topic doesn't exist, create it
			topic = new Topic(name);
			this.topics.put(name, topic);
		}
		
		return topic;
	}
}
