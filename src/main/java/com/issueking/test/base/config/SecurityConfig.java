package com.issueking.test.base.config;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.ReflectionSaltSource;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.issueking.test.api.service.user.CustomUserDetailsServiceImpl;
import com.issueking.test.util.CustomAuthenticationProvider;
import com.issueking.test.util.CustomLoginSuccessHandler;
import com.issueking.test.util.CustomLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
@ComponentScan(basePackages = "com.issueking.test")
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
		@PostConstruct
	    public void init() {
	        System.out.println("::::::::::::::::::::: SecurityConfig initialize..");
	    }
		
		@Bean
		public BCryptPasswordEncoder bCryptPasswordEncoder() {
			return new BCryptPasswordEncoder();
		}
		/*@Bean
		ReflectionSaltSource reflectionSaltSource() {
			return new ReflectionSaltSource();
		}*/
		
		
		
		@Bean
	    public CustomLoginSuccessHandler customLoginSuccessHandler() {
	        return new CustomLoginSuccessHandler();
	    }
	    
	    @Bean
	    public CustomLogoutSuccessHandler customLogoutSuccessHandler() {
	        return  new CustomLogoutSuccessHandler();
	    }
	    
		@Bean
		public CustomAuthenticationProvider customAuthenticationProvider() {
		    return new CustomAuthenticationProvider();
		}
		
		@Bean
		public CustomUserDetailsServiceImpl customUserDetailsServiceImpl() {
		    return new CustomUserDetailsServiceImpl();
		}
		
	    //Spring Security ignores request to static resources such as CSS or JS files.
	    @Override
	    public void configure(WebSecurity web) throws Exception {
	        web
	            .ignoring()
	            .antMatchers("/resources/**");
	    }
    
		@Override
	    protected void configure(HttpSecurity http) throws Exception {
	        http
	            .authorizeRequests()
	            .antMatchers("/admin/**").hasRole("ADMIN")
	            .antMatchers("/index/**").hasAnyRole("USER", "ADMIN")
	            .antMatchers("/**").permitAll()
	        .and()
	            .formLogin()
	                .usernameParameter("userId")
	                .passwordParameter("password")
	                .loginPage("/login/signin")
	                .loginProcessingUrl("/j_spring_security_check")
	                .failureUrl("/login/signin?fail=true")
	                .successHandler(customLoginSuccessHandler())
	        .and()
	            .logout()
	                .logoutUrl("/logout")
	                .deleteCookies("JSESSIONID")
	                .logoutSuccessHandler(customLogoutSuccessHandler());
	                //.invalidateHttpSession(true);                                  
	                //.logoutSuccessUrl("/login/signin")
	    }
	  
		@Override
	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
			
			//DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
			
			/*daoAuthenticationProvider.setPasswordEncoder(shaPasswordEncoder());
			daoAuthenticationProvider.setUserDetailsService(customUserDetailsServiceImpl());*/
			
			ReflectionSaltSource saltSource = new ReflectionSaltSource();
			saltSource.setUserPropertyToUse("salt");
			//daoAuthenticationProvider.setSaltSource(saltSource);
			
	        auth
	        	.authenticationProvider(customAuthenticationProvider())
	        	.userDetailsService(customUserDetailsServiceImpl()).passwordEncoder(bCryptPasswordEncoder());
	    }
}
