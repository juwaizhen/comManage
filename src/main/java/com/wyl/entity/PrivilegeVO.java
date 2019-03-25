package com.wyl.entity;

import java.io.Serializable;
import java.util.Date;

public class PrivilegeVO  implements Serializable{

	/** 
	* @Fields serialVersionUID :
	*/
	private static final long serialVersionUID = 7419496292753391597L;
	
	private String id;			//权限id
	private String parId;		//父菜单id
	private String name;		//权限名称
	private String type;		//权限类型
	private String url;			//菜单地址
	private String createUser;	//创建人
	private Date createDate;	//创建时间
	private String updateUser;	//修改人
	private Date updateDate;	//修改时间
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getParId() {
		return parId;
	}
	public void setParId(String parId) {
		this.parId = parId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
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
	
	

}
