package com.adanferguson.broker;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Servlet
 */
@WebServlet("/*")
public class Servlet extends HttpServlet {
	
	
	private static final long serialVersionUID = 1L;
	private TopicManager topicManager;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Servlet() {
        super();    
        
        this.topicManager = new TopicManager();        
    }

	/**
	 * Handle a "get" request from a consumer, ie, fetching a message from a given topic.
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String topic = request.getPathInfo().substring(1);
		
		if(!isValidTopic(topic)){
			
			//handle invalid
		};
		
		//handle valid
		response.getWriter().append("Hello");
	}


	/**
	 * Handle a "post" request from a producer, ie, adding a message to the end of a given topic.
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String topic = request.getPathInfo().substring(1);
		String message = request.getParameter("message");
		
		if(!isValidTopic(topic)){
			
			response.getWriter().write("Invalid topic name.");
			return;
		};
		
		if(message == null || message.length() == 0){

			response.getWriter().write("Message parameter not found.");
			return;
		};
		
		this.topicManager.addMessage(topic, message);
	}
	
	/**
	 * 
	 * Check if the given input is a valid topic name, having only letters or numbers.
	 * 
	 * @param input
	 * @return true if it is a valid topic name, false otherwise.
	 */
	private boolean isValidTopic(String input){

		Pattern pattern = Pattern.compile("^[a-zA-Z0-9]+$");
	    Matcher matcher = pattern.matcher(input);
		
		return matcher.find() ? true : false;				
	};

}
