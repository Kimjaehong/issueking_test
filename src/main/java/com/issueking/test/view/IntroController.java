package com.issueking.test.view;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class IntroController {
	
	private static final Logger logger = LoggerFactory.getLogger(IntroController.class);
/*	
	*//**
	 * Simply selects the home view to render by returning its name.
	 *//*
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String introController() {
		
		logger.info("Welcome home! The client locale is {}.");
		
		return "application/login";
	}*/
	
}
