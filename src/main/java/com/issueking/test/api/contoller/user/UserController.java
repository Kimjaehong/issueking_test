package com.issueking.test.api.contoller.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.issueking.test.view.IntroController;

@Controller
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	/*@Autowired
	private CustomUserDetailsServiceImpl userService; */
	
	@RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String adminPage(ModelMap model) {
        /*model.addAttribute("user", getPrincipal());
        logger.debug("admin::::::::::::::::::::::::::"+model);*/
        return "application/login/index";
    }
     
    @RequestMapping(value = "/db", method = RequestMethod.GET)
    public String dbaPage(ModelMap model) {
        //model.addAttribute("user", getPrincipal());
        return "dba";
    }
 
    @RequestMapping(value = "/Access_Denied", method = RequestMethod.GET)
    public String accessDeniedPage(ModelMap model) {
        //model.addAttribute("user", getPrincipal());
        return "accessDenied";
    }
 
    @RequestMapping(value = {"/", "/login/signin"}, method = RequestMethod.GET)
    public String loginPage() {
    	 logger.info("signin으로::::::::::::::::::::::::::");
        return "application/login/signin";
    }
    
    @RequestMapping(value = {"/index"}, method = RequestMethod.GET)
    public String indexPage(ModelMap model) {
        //model.addAttribute("user", getPrincipal());
        return "login/index";
    }
	
}
