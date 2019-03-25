package com.wyl.mapper;

import java.util.List;
import java.util.Map;

import com.wyl.entity.BillVO;

public interface BillMapper {
	long getBillCount(Map<String,Object> map);
	List<BillVO> getBillList(Map<String,Object> map);
}
