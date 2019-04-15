package com.wyl.mapper;

import java.util.List;
import java.util.Map;

import com.wyl.entity.BillLogVO;
import com.wyl.entity.BillVO;

public interface BillMapper {
	/**
	 * 获取账单数量
	 * @param map
	 * @return
	 */
	long getBillCount(Map<String,Object> map);
	
	/**
	 * 获取账单列表
	 * @param map
	 * @return
	 */
	List<BillVO> getBillList(Map<String,Object> map);
	
	/**
	 * 根据主键更新账单信息
	 * @param map
	 */
	void updateBillById(Map<String,Object> map);
	
	/**
	 * 记录账单修改日志
	 * @param map
	 */
	void addBillLog(Map<String,Object> map);
	
	/**
	 * 获取账单历史数量
	 * @param map
	 * @return
	 */
	long getBillLogCount(Map<String,Object> map);
	
	/**
	 * 获取账单历史列表
	 * @param map
	 * @return
	 */
	List<BillLogVO> getBillLogList(Map<String,Object> map);
}
