package com.wyl.mapper;

import com.wyl.entity.UserVO;

public interface UserMapper {
	UserVO qryUserByAccNum(String accNum);
}
