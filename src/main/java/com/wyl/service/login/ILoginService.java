package com.wyl.service.login;

import java.util.List;

import com.wyl.entity.PrivilegeVO;
import com.wyl.entity.UserVO;

public interface ILoginService {
	/**
	 * 
	* @Title: qryUserByAccNum 
	* @Description: 根据账号查询员工信息
	* @author wangyl
	* @param accNum
	* @return  参数说明 
	* @return UserVO    返回类型 
	* @throws
	 */
	UserVO qryUserByAccNum(String accNum);

	/**
	 * 
	* @Title: qryPrivilegeListByUserId
	* @Description: 根据员工id查询员工权限列表
	* @author wangyl
	* @param id
	* @param  参数说明
	* @return List<PrivilegeVO>    返回类型
	* @throws
	 */
	List<PrivilegeVO> qryPrivilegeListByUserId(String id);
}
