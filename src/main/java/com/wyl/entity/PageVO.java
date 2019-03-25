package com.wyl.entity;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 
* @ClassName: PageVO 
* @Description: 分页对象
* @author wangyl
* @date 2019年2月22日 下午2:47:28 
*
 */
public class PageVO  implements Serializable{


	/** 
	* @Fields serialVersionUID
	*/
	private static final long serialVersionUID = 9220931050993284346L;
	private int pageNo;			//当前页
	private int pageSize;		//每页显示条数
	private long totalCount;		//总记录数
	private long startNum;		//开始
	private long endNum;			//结束
	private List<?> records;		//结果集
	
	/**
	 * 默认第一页，每页5条数据
	 */
	public PageVO() {
		this.pageNo = 1;
		this.pageSize = 5;
		setQryNum(pageNo,pageSize);
	}
	
	public PageVO(int pageNo, int pageSize) {
		this.pageNo = pageNo;
		this.pageSize = pageSize;
		setQryNum(pageNo,pageSize);
	}
	
	public void setQryNum(int pageNo, int pageSize) {
		this.startNum = (long)((this.pageNo - 1) * pageSize);
		this.endNum = startNum + pageSize;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}

	public long getStartNum() {
		return startNum;
	}

	public void setStartNum(long startNum) {
		this.startNum = startNum;
	}

	public long getEndNum() {
		return endNum;
	}

	public void setEndNum(long endNum) {
		this.endNum = endNum;
	}

	public List<?> getRecords() {
		return records;
	}

	public void setRecords(List<?> records) {
		this.records = records;
	}
	
	
	public Map<String,Object> buildPageParmap(Map<String,Object> parmap,PageVO page){
		parmap.put("startNum", page.getStartNum());
		parmap.put("endNum", page.getEndNum());
		return parmap;
	}
	

	
	
	
}
