package com.wyl.service.log.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyl.entity.OperLogVO;
import com.wyl.mapper.OperLogMapper;
import com.wyl.mapper.UtilMapper;
import com.wyl.service.log.IOperLogService;
import com.wyl.utils.Constant;
import com.wyl.utils.StringUtil;

@Service
public class OperLogServiceImpl implements IOperLogService {

	@Autowired
	private OperLogMapper operMapper;
	
	@Autowired
	private UtilMapper utilMapper;

	@Override
	public void insertOperLog(OperLogVO operLogVO) {
//		判断是否需要记录日志
		if("on".equals(Constant.LOG_SWITCH) && StringUtil.getString(Constant.LOG_ACTION).indexOf(operLogVO.getOperType()) != -1) {
//			添加序列
			String id = utilMapper.getNextVal("seq_oper_log_id");
			operLogVO.setId(id);
			operMapper.insertOperLog(operLogVO);
		}
	}
	

}
