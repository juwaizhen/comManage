package com.wyl.service.bill;


import java.util.List;
import java.util.Map;

import com.wyl.entity.BillLogVO;
import com.wyl.entity.BillVO;

public interface IBillService {
	
	/**
	 * 
	* @Title: getBillCount 
	* @Description: 获取账单数量
	* @author wangyl
	* @param map
	* @return  参数说明 
	* @return long    返回类型 
	* @throws
	 */
	public long getBillCount(Map<String,Object> map);
	
	/**
	 * 
	* @Title: getBillList 
	* @Description: 获取账单列表
	* @author wangyl
	* @return  参数说明 
	* @return List<BillVO>    返回类型 
	* @throws
	 */
	List<BillVO> getBillList(Map<String,Object> map);
	
	/**
	 * 
	* @Title: updateBillById 
	* @Description: 修改账单信息
	* @author wangyl
	* @return  参数说明 
	* @return 
	* @throws
	 */
	void updateBillById(Map<String,Object> map);
	
	/**
	 * 
	* @Title: addBillLog 
	* @Description: 记录账单修改信息
	* @author wangyl
	* @return  参数说明 
	* @return 
	* @throws
	 */
	void addBillLog(Map<String,Object> map);
	
	/**
	* @Title: getBillLogCount 
	* @Description: 获取账单历史数量
	* @author wangyl
	* @param map
	* @return  参数说明 
	* @return long    返回类型 
	* @throws
	 */
	public long getBillLogCount(Map<String,Object> map);
	
	/**
	* @Title: getBillLogList 
	* @Description: 获取账单历史
	* @author wangyl
	* @return  参数说明 
	* @return List<BillVO>    返回类型 
	* @throws
	 */
	List<BillLogVO> getBillLogList(Map<String,Object> map);
}
