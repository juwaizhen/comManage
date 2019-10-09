package com.wyl.service.user;


import java.util.List;
import java.util.Map;

import com.wyl.entity.UserVO;

public interface IUserService {
	
	/**
	 * 获取用户数量
	 * @author wangyl   
	 * @date 2019年9月12日 下午7:48:39
	 * Description:此处添加方法作用……
	 * @param map
	 * @return
	 */
	public long getUserCount(Map<String,Object> map);
	
	/**
	 * 获取用户列表
	 * @author wangyl   
	 * @date 2019年9月12日 下午7:48:55
	 * Description:此处添加方法作用……
	 * @param map
	 * @return
	 */
	List<UserVO> getUserList(Map<String,Object> map);
	
	/**
	 * 
	 * @author wangyl   
	 * @date 2019年9月17日 下午8:43:27
	 * Description:根据主键修改用户
	 * @param map
	 */
	public void updateUserById(Map<String,Object> map);
	
	/**
	 * 
	 * @author wangyl   
	 * @date 2019年9月25日 上午1:19:48
	 * Description:新增用户
	 * @param map
	 */
	public void insertUser(Map<String,Object> map);
	
	/**
	 * 
	 * @author wangyl   
	 * @date 2019年9月29日 下午10:09:00
	 * Description:获取角色列表并查出师傅选中标识
	 * @param map
	 * @return
	 */
	List<Map<String,Object>> getUserRoleRelList(Map<String,Object> map);
	
	/**
	 * @author wangyl   
	 * @date 2019年10月8日 下午2:14:00
	 * Description:删除用户下所有的角色
	 * @param map
	 */
	void deleteUserRoleRel(Map<String,Object> map);
	
	
	public void insertUserRoleRel(Map<String,Object> map);
}
