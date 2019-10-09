package com.wyl.service.user.impl;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyl.entity.UserVO;
import com.wyl.mapper.UserMapper;
import com.wyl.mapper.UtilMapper;
import com.wyl.service.user.IUserService;

@Service
public class UserServiceImpl implements IUserService {
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private UtilMapper utilMapper;

	@Override
	public long getUserCount(Map<String,Object> map) {
		return userMapper.getUserCount(map);
	}
	@Override
	public List<UserVO> getUserList(Map<String,Object> map) {
		return userMapper.getUserList(map);
	}
	
	@Override
	public void updateUserById(Map<String,Object> map) {
		userMapper.updateUserById(map);
	}
	
	@Override
	public void insertUser(Map<String,Object> map) {
		userMapper.insertUser(map);
	}
	
	@Override
	public List<Map<String,Object>> getUserRoleRelList(Map<String,Object> map) {
		return userMapper.getUserRoleRelList(map);
	}
	
	@Override
	public void deleteUserRoleRel(Map<String,Object> map) {
		userMapper.deleteUserRoleRel(map);
	}
	
	@Override
	public void insertUserRoleRel(Map<String,Object> map) {
		userMapper.insertUserRoleRel(map);
	}
}
