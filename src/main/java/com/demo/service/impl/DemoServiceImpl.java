package com.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.mapper.DemoMapper;
import com.demo.service.IDemoService;


/**
 * @author wyl
 *
 */
@Service
public class DemoServiceImpl implements IDemoService {
	@Autowired
	private DemoMapper mapper;

	@Override
	public String queryNickNameById(String id) {
		String nickName = mapper.queryNickNameById(id);
		return nickName;
	}

}
