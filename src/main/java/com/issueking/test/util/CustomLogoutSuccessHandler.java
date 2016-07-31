package com.issueking.test.util;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

public class CustomLogoutSuccessHandler extends  SimpleUrlLogoutSuccessHandler{
    
	final private static String logoutSuccessUrl = "login/signin";

    public void onLogoutSuccess (HttpServletRequest request
    										, HttpServletResponse response
    										, Authentication authentication) throws IOException, ServletException {
        
        request.getSession().invalidate();
        response.sendRedirect(request.getContextPath() + this.logoutSuccessUrl);
    }
}
