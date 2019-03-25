package com.wyl.mapper;

import java.util.List;
import java.util.Map;

import com.wyl.entity.ConfigCodesVO;

public interface ConfigCodesMapper {
	List<ConfigCodesVO> qryConfigCodes(Map<String,Object> paramMap);
}
