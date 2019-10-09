package com.wyl.mapper;

import java.util.List;
import java.util.Map;

import com.wyl.entity.UserVO;

public interface UserMapper {
	UserVO qryUserByAccNum(String accNum);
	
	/**
	 * 获取用户数量
	 * @author wangyl   
	 * @date 2019年9月12日 下午7:54:04
	 * Description:此处添加方法作用……
	 * @param map
	 * @return
	 */
	long getUserCount(Map<String,Object> map);
	
	/**
	 * 获取用户列表
	 * @author wangyl   
	 * @date 2019年9月12日 下午7:53:49
	 * Description:此处添加方法作用……
	 * @param map
	 * @return
	 */
	List<UserVO> getUserList(Map<String,Object> map);
	
	/**
	 * 
	 * @author wangyl   
	 * @date 2019年9月17日 下午8:44:21
	 * Description:根据主键修改用户
	 * @param map
	 */
	void updateUserById(Map<String,Object> map);
	
	/**
	 * @author wangyl   
	 * @date 2019年9月25日 上午1:21:23
	 * Description:新增用户
	 * @param map
	 */
	void insertUser(Map<String,Object> map);
	
	/**
	 * 
	 * @author wangyl   
	 * @date 2019年9月29日 下午10:10:00
	 * Description:查询角色列表和选中标识
	 * @param map
	 * @return
	 */
	List<Map<String,Object>> getUserRoleRelList(Map<String,Object> map);
	
	/**
	 * @author wangyl   
	 * @date 2019年10月8日 下午2:16:27
	 * Description:删除用户下所有角色
	 * @param map
	 */
	void deleteUserRoleRel(Map<String,Object> map);
	
	/**
	 * 
	 * @author wangyl   
	 * @date 2019年10月9日 上午9:50:10
	 * Description:新增用户角色关系
	 * @param map
	 */
	void insertUserRoleRel(Map<String,Object> map);
}
