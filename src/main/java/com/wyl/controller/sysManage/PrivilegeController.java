package com.wyl.controller.sysManage;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wyl.entity.PrivilegeVO;
import com.wyl.entity.ResultMap;
import com.wyl.entity.UserVO;
import com.wyl.utils.NullUtil;

@Controller
@RequestMapping("/privilege")
public class PrivilegeController {
	
	@RequestMapping(value="/getMenu",method=RequestMethod.POST)
	@ResponseBody
	public ResultMap getMenu(HttpServletRequest request,HttpServletResponse response,HttpSession session){
		ResultMap resultMap = new ResultMap();
		
		UserVO u = (UserVO) session.getAttribute("USER_SESSION");
		List <PrivilegeVO> pList = u.getpList();
		if(NullUtil.isNotNull(pList)) {
			resultMap.setResultCode("0");
			resultMap.setResultObj(pList);
		}else {
			resultMap.setResultCode("-1");
			resultMap.setResultMsg("没查到菜单信息");
		}
		return resultMap;
	}
}
