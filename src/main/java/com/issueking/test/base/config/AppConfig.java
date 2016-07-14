package com.issueking.test.base.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.issueking.test.base.cors.CorsInterceptor;

@Configuration
@EnableWebMvc    //mvc:annotation-driven
@ComponentScan(basePackages="com.issueking.test", excludeFilters=@ComponentScan.Filter(Configuration.class))
public class AppConfig extends WebMvcConfigurerAdapter { // 인터셉터를 추가하기 위해 WebMvcConfigurerAdapter 를 상속한다
	
	@Bean
    public ViewResolver viewResolver()
    {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/jsp/");
        resolver.setSuffix(".jsp");
        return resolver;
    }
	
	/**
     * 인터셉터 추가
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry)
    {
        registry.addInterceptor(new CorsInterceptor());
    }
}
