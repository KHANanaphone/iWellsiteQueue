package com.adanferguson.broker;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet for allowing the consumer to get a session ID 
 */
@WebServlet("/GetSessionID")
public class SessionIDServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
       
    public SessionIDServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		
		response.getWriter().append(request.getSession().getId());
	}
}
