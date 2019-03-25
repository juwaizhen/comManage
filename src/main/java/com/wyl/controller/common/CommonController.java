package com.wyl.controller.common;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wyl.entity.ConfigCodesVO;
import com.wyl.entity.ResultMap;
import com.wyl.service.commmon.ICommonService;
import com.wyl.utils.NullUtil;

@Controller
@RequestMapping("/common")
public class CommonController {
	
	@Autowired
	private ICommonService commonService ;
	
	@RequestMapping(value="/qryConfigCodes",method=RequestMethod.POST)
	@ResponseBody
	public ResultMap qryConfigCodes(HttpServletRequest request,HttpServletResponse response,HttpSession session){
		ResultMap resultMap = new ResultMap();
		
//		String colName=request.getParameter("colName");
//        String tabName=request.getParameter("tabName");
//        String codeType=request.getParameter("codeType");
//        System.out.println("colName="+colName+";tabName="+tabName+";codeType="+codeType);
        
        Map<String,Object> paramMap = new HashMap<String,Object>();
        paramMap.put("columnName", request.getParameter("colName"));
        paramMap.put("tableName", request.getParameter("tabName"));
        paramMap.put("codeType", request.getParameter("codeType"));
		List <ConfigCodesVO> configCodesList = commonService.qryConfigCodes(paramMap);
		if(NullUtil.isNotNull(configCodesList)) {
			resultMap.setResultCode("0");
			resultMap.setResultObj(configCodesList);
		}else {
			resultMap.setResultCode("-1");
			resultMap.setResultMsg("没查到CONFIG_CODES数据信息");
		}
		return resultMap;
	}
}
