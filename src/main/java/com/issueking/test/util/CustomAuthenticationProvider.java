package com.issueking.test.util;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.issueking.test.api.bean.user.CustomUserDetails;
import com.issueking.test.api.service.user.CustomUserDetailsServiceImpl;

@Component("customAuthenticationProvider")
public class CustomAuthenticationProvider implements AuthenticationProvider {
	
	@Autowired
    private CustomUserDetailsServiceImpl customUserDetailsServiceImpl;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder; 
	
	@Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
        String username = authentication.getName();
        String password = (String) authentication.getCredentials();
        Collection<? extends GrantedAuthority> authorities;
        try {
	        CustomUserDetails  customUserDetails = customUserDetailsServiceImpl.loadUserByUsername(username);
	        
	        if (!passwordEncoder.matches(password, customUserDetails.getPassword())) 
	            throw new BadCredentialsException("비밀번호 불일치");
	 
	        authorities = customUserDetails.getAuthorities();
	        
        } catch(UsernameNotFoundException e) {
            e.printStackTrace();
            throw new UsernameNotFoundException(e.getMessage());
        } catch(BadCredentialsException e) {
            e.printStackTrace();
            throw new BadCredentialsException(e.getMessage());
        } catch(Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
 
        return new UsernamePasswordAuthenticationToken(username, password, authorities);
    }
 
    @Override
    public boolean supports(Class<?> arg0) {
        return true;
    }
}
