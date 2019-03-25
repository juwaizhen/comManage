package com.wyl.service.log;

import com.wyl.entity.OperLogVO;

public interface IOperLogService {
	
	/**
	 * 
	* @Title: insertOperLog 
	* @Description: 插入日志 
	* @author wangyl
	* @param operLogVO 日志对象
	* @return void
	* @throws
	 */
	void insertOperLog(OperLogVO operLogVO);
}
