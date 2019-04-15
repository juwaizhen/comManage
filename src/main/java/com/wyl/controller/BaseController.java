package com.wyl.controller;

import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.wyl.entity.PageVO;
import com.wyl.entity.ResultMap;
import com.wyl.entity.UserVO;
import com.wyl.utils.GsonUtil;
import com.wyl.utils.NullUtil;

public class BaseController{

	protected Gson gson = new Gson();
	
	public String formatRturnForLayTable(ResultMap resultMap){
		String code = resultMap.getResultCode();
		String msg = resultMap.getResultMsg();
		PageVO page = (PageVO) resultMap.getResultObj();
		String date = null;
		String count = "0";
		if(!NullUtil.isNull(page)){
			date =GsonUtil.toJson(page.getRecords());
			count = GsonUtil.toJson(page.getTotalCount());
		}
		
		String returnStr = "{\"code\":"+code+",\"msg\":\""+msg+"\",\"count\":"+count+",\"data\":"+date+"}";
//		String returnStr = "{\"code\":"+code+",\"msg\":\"\",\"count\":"+count+",\"data\":"+date+"}";
		System.out.println("|"+returnStr+"|");
		return returnStr;
	}
	
	/**
	 * 获取登录人信息
	 * @param session
	 * @return
	 */
	public UserVO getSysUserInfo(HttpSession session){
		UserVO user = (UserVO) session.getAttribute("USER_SESSION");
		return user;
	}
}
