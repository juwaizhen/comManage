package com.wyl.entity;

import java.io.Serializable;
import java.util.Date;

import com.wyl.utils.StringUtil;

public class OperLogVO  implements Serializable{

	/** 
	* @Fields serialVersionUID :
	*/
	private static final long serialVersionUID = 6542213906758350938L;
	

	private String id;			//id
	private String operName;	//operName
	private String operMethod;	//调用方法
	private Date operDate;		//时间
	private String operUser;	//操作人
	private String operReq;		//入参
	private String operRes;		//返参
	private String operType;	//操作类型
	
	//构造函数
	public OperLogVO(){}
	
	/**
	 * 创建日志对象
	 * @param operName 操作名称
	 * @param operMethod 调用方法
	 * @param operUser 操作人
	 * @param operReq 请参
	 * @param operRes 返参
	 */
	public OperLogVO(String operName,String operMethod,String operUser,String operReq,String operRes,String operType){
		this.operName = operName;
		this.operMethod = operMethod;
		this.operUser = operUser;
		this.operReq = operReq;
		this.operRes = operRes;
		if("".equals(StringUtil.getString(operType))) {
			this.operType = "NONE";
		}
		this.operType = operType;
	}
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getOperName() {
		return operName;
	}
	public void setOperName(String operName) {
		this.operName = operName;
	}
	public String getOperMethod() {
		return operMethod;
	}
	public void setOperMethod(String operMethod) {
		this.operMethod = operMethod;
	}
	public Date getOperDate() {
		return operDate;
	}
	public void setOperDate(Date operDate) {
		this.operDate = operDate;
	}
	public String getOperUser() {
		return operUser;
	}
	public void setOperUser(String operUser) {
		this.operUser = operUser;
	}
	public String getOperReq() {
		return operReq;
	}
	public void setOperReq(String operReq) {
		this.operReq = operReq;
	}
	public String getOperRes() {
		return operRes;
	}
	public void setOperRes(String operRes) {
		this.operRes = operRes;
	}

	public String getOperType() {
		return operType;
	}

	public void setOperType(String operType) {
		this.operType = operType;
	}
	
	
	
	
	
}
