package com.wyl.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class UserVO  implements Serializable{

	/** 
	* @Fields serialVersionUID :
	*/
	private static final long serialVersionUID = 1000335191336046749L;

	private String id;			//id
	private String name;		//name
	private String accNum;		//账号
	private String password;	//密码
	private String statusCd;	//状态
	private String createUser;	//创建人
	private Date createDate;	//创建时间
	private String updateUser;	//修改人
	private Date updateDate;	//修改时间
	
	private List<PrivilegeVO> pList;	//用户权限
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAccNum() {
		return accNum;
	}
	public void setAccNum(String accNum) {
		this.accNum = accNum;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getStatusCd() {
		return statusCd;
	}
	public void setStatusCd(String statusCd) {
		this.statusCd = statusCd;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public List<PrivilegeVO> getpList() {
		return pList;
	}
	public void setpList(List<PrivilegeVO> pList) {
		this.pList = pList;
	}
	
	
	
	
	
}
