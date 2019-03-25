package com.wyl.service.commmon;


import java.util.List;
import java.util.Map;

import com.wyl.entity.ConfigCodesVO;

public interface ICommonService {
	/**
	 * 
	* @Title: qryConfigCodes 
	* @Description: 查询配置表
	* @author wangyl
	* @param param
	* @return  参数说明 
	* @return UserVO    返回类型 
	* @throws
	 */
	List<ConfigCodesVO> qryConfigCodes(Map<String,Object> paramMap);

	
}
