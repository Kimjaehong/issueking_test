package com.issueking.test.base.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

/**
 * 루트 설정용 클래스.
 * 이 클래스는 스프링의 datasource-context.xml 의 역할을 대신한다.
 * @author kingjhong
 *
 */

@Configuration
@MapperScan("/config/sql/*/*.xml")
public class DBConfig {
	
	 @Value("${jdbc.driverClassName}")
	 private String jdbcDriverClassName;

	 @Value("${jdbc.url}")
	 private String jdbcUrl;

	 @Value("${jdbc.username}")
	 private String jdbcUsername;

	 @Value("${jdbc.password}")
	 private String jdbcPassword;

	 private static final String APP_CONFIG_FILE_PATH = "/config/properties/jdbc.properties";

 /**
 * 프로퍼티 홀더는 다른 빈들이 사용하는 프로퍼티들을 로딩하기 때문에, static 메소드로 실행된다.
 * 다른 일반 빈들이 만들어지기전에 먼저 만들어져야 한다.
 * @return
 */
    @Bean
    public static PropertyPlaceholderConfigurer propertyPlaceholderConfigurer() {
        PropertyPlaceholderConfigurer ppc = new PropertyPlaceholderConfigurer();
        ppc.setLocations(new Resource[] { new ClassPathResource(APP_CONFIG_FILE_PATH) });
        return ppc;
    }
    
    @Bean
    public DataSource dataSource() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(this.jdbcDriverClassName);
        dataSource.setUrl(this.jdbcUrl);
        dataSource.setUsername(this.jdbcUsername);
        dataSource.setPassword(this.jdbcPassword);
        return dataSource;
    }
    
    
}
