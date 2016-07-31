package com.issueking.test.api.persistance.user;

import org.apache.ibatis.annotations.Select;

import com.issueking.test.api.bean.user.CustomUserDetails;

public interface UserMapper {
	
	@Select("SELECT * FROM users WHERE username = #{username}")
    public CustomUserDetails getUser(String username);

}
