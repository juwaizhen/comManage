package com.wyl.entity;

import java.io.Serializable;

public class ResultMap  implements Serializable {

	/** 
	* @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
	*/
	private static final long serialVersionUID = -621246447734481587L;
	
	private String resultCode;		//返回编码  0成功
	private String resultMsg;		//返回信息
	private Object resultObj;		//返回对象
	
	/*//无参构造函数
	public ResultMap(){}
	
	//有参构造
	public ResultMap(String resultCode,  String resultMsg, Object resultObj){
		this.resultCode = resultCode;
		this.resultMsg = resultMsg;
		this.resultObj = resultObj;
	}*/
	
	
	public String getResultCode() {
		return resultCode;
	}
	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}
	public String getResultMsg() {
		return resultMsg;
	}
	public void setResultMsg(String resultMsg) {
		this.resultMsg = resultMsg;
	}
	public Object getResultObj() {
		return resultObj;
	}
	public void setResultObj(Object resultObj) {
		this.resultObj = resultObj;
	}

}
