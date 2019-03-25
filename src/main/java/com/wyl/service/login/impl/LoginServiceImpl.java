package com.wyl.service.login.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyl.entity.PrivilegeVO;
import com.wyl.entity.UserVO;
import com.wyl.mapper.PrivilegeMapper;
import com.wyl.mapper.UserMapper;
import com.wyl.service.login.ILoginService;

@Service
public class LoginServiceImpl implements ILoginService {

	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private PrivilegeMapper privilegeMapper;
	
	@Override
	public UserVO qryUserByAccNum(String accNum) {
		UserVO u = userMapper.qryUserByAccNum(accNum);
		return u;
	}

	
	@Override
	public List<PrivilegeVO> qryPrivilegeListByUserId(String id) {
		List<PrivilegeVO> list = privilegeMapper.qryPrivilegeListByUserId(id);
		return list;
	}

}
