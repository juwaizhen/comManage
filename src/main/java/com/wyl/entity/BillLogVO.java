package com.wyl.entity;

import java.io.Serializable;

public class BillLogVO  implements Serializable{


	/**
	 * @Fields serialVersionUID
	 */
	private static final long serialVersionUID = 9038000542795140808L;
	
	private String id;
	private String billId;
	private String title;
	private String price;
	private String type;
	private String typeName;
	private String useFor;
	private String useForName;
	private String usePerson;
	private String usePersonName;
	private String moneyType;
	private String moneyTypeName;
	private String statusCd;
	private String statusCdName;
	private String remark;
	private String updateUser;
	private String updateDate;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getBillId() {
		return billId;
	}
	public void setBillId(String billId) {
		this.billId = billId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getUseFor() {
		return useFor;
	}
	public void setUseFor(String useFor) {
		this.useFor = useFor;
	}
	public String getUseForName() {
		return useForName;
	}
	public void setUseForName(String useForName) {
		this.useForName = useForName;
	}
	public String getUsePerson() {
		return usePerson;
	}
	public void setUsePerson(String usePerson) {
		this.usePerson = usePerson;
	}
	public String getUsePersonName() {
		return usePersonName;
	}
	public void setUsePersonName(String usePersonName) {
		this.usePersonName = usePersonName;
	}
	public String getMoneyType() {
		return moneyType;
	}
	public void setMoneyType(String moneyType) {
		this.moneyType = moneyType;
	}
	public String getMoneyTypeName() {
		return moneyTypeName;
	}
	public void setMoneyTypeName(String moneyTypeName) {
		this.moneyTypeName = moneyTypeName;
	}
	public String getStatusCd() {
		return statusCd;
	}
	public void setStatusCd(String statusCd) {
		this.statusCd = statusCd;
	}
	public String getStatusCdName() {
		return statusCdName;
	}
	public void setStatusCdName(String statusCdName) {
		this.statusCdName = statusCdName;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}
	public String getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}
	
	
}
