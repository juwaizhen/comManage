package com.wyl.service.commmon.impl;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wyl.entity.ConfigCodesVO;
import com.wyl.mapper.ConfigCodesMapper;
import com.wyl.service.commmon.ICommonService;

@Service
public class CommonServiceImpl implements ICommonService {

	@Autowired
	private ConfigCodesMapper configCodesMapper;
	
	
	@Override
	public List<ConfigCodesVO> qryConfigCodes(Map<String, Object> paramMap) {
		List<ConfigCodesVO> list = configCodesMapper.qryConfigCodes(paramMap);
		return list;
	}

}
