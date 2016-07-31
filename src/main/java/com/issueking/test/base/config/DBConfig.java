package com.issueking.test.base.config;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.jolbox.bonecp.BoneCPDataSource;

/**
 * 루트 설정용 클래스.
 * 이 클래스는 스프링의 datasource-context.xml 의 역할을 대신한다.
 * propertyholder 설정 , datasource 설정
 * @author kingjhong
 *
 */

@Configuration
@MapperScan("com.issueking.test.api.persistance")
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
	 
    @PostConstruct
    public void init() {
        System.out.println("::::::::::::::::::::: DBConfig initialize..");
    }
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
       /* BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(this.jdbcDriverClassName);
        dataSource.setUrl(this.jdbcUrl);
        dataSource.setUsername(this.jdbcUsername);
        dataSource.setPassword(this.jdbcPassword);
        return dataSource;*/
    	
    	 BoneCPDataSource dataSource = new BoneCPDataSource();
         dataSource.setDriverClass(this.jdbcDriverClassName);
         dataSource.setJdbcUrl(this.jdbcUrl);
         dataSource.setUsername(this.jdbcUsername);
         dataSource.setPassword(this.jdbcPassword);
         return dataSource;
    }
    
    @Bean
    public DataSourceTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }
    
    @Bean
    public SqlSessionFactory sqlSessionFactory(ApplicationContext applicationContext) throws Exception {
        
       SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
       sessionFactory.setDataSource(dataSource());
       //sessionFactory.setMapperLocations(applicationContext.getResources("classpath:/config/sql/*.xml"));
       return sessionFactory.getObject();
    }
}
