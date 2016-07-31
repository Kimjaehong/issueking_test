package com.issueking.test.api.service.user;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.issueking.test.api.bean.user.CustomUserDetails;
import com.issueking.test.api.persistance.user.UserMapper;
import com.issueking.test.util.Role;

@Service("CustomUserDetailsServiceImpl")
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	
	private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsServiceImpl.class);
	
	@Autowired
	UserMapper userMapper;
	
	@Override
    public CustomUserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
		
		logger.info("loadUserByUsername::::::::"+username);
		
		CustomUserDetails customUserDetails = userMapper.getUser(username);
		
		logger.info("customUserDetails::::::::"+customUserDetails);
		
		customUserDetails.setUsername(customUserDetails.getUsername());
		logger.info("encoded pwd :::::"+new BCryptPasswordEncoder().encode(customUserDetails.getPassword()));
		customUserDetails.setPassword(new BCryptPasswordEncoder().encode(customUserDetails.getPassword()));
		
		Role role = new Role();
		role.setName(customUserDetails.getUsername());
		List<Role> roles = new ArrayList<Role>();
		roles.add(role);
		logger.info("role::::::::"+role);
		customUserDetails.setAuthorities(roles);
		
		return customUserDetails;
    }
}
