package com.wyl.controller.logn;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.fastjson.JSON;
import com.wyl.entity.OperLogVO;
import com.wyl.entity.PrivilegeVO;
import com.wyl.entity.UserVO;
import com.wyl.service.log.IOperLogService;
import com.wyl.service.login.ILoginService;
import com.wyl.service.login.IValidateCodeService;
import com.wyl.utils.NullUtil;
import com.wyl.utils.StringUtil;


@Controller
@RequestMapping("/login")
public class Login {
	private static final String LOGIN = "login/login";
	
	private static final String WELCOME = "redirect:/init";
	
	@Autowired
	private ILoginService loginService ;
	
	@Autowired
	private IValidateCodeService validateCodeService;
	
	@Autowired
	private IOperLogService operLogService;
	
	/**
	 * 
	* @Title: toLogin 
	* @Description: 跳转到登录页面
	* @author wangyl
	* @param  model
	* @param  参数说明 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping("")
	public String toLogin(Model model){
		return LOGIN;
	}
	
	@RequestMapping(value="",method=RequestMethod.POST)
	public String dologin(String accNum,String password,String yzm,HttpSession session) {
		
		//1、校验验证码
		/*String validateCodeKey = (String) session.getAttribute("VALIDATECODEKEY");
		boolean yzmFlag = true;
		String logTip = "登录失败：";
		if(NullUtil.isNotNull(yzm) && NullUtil.isNotNull(validateCodeKey)){
			if(!yzm.trim().toLowerCase().equals(validateCodeKey.toLowerCase())){
				yzmFlag=false;
				logTip =logTip+"验证码错误！";
			}
		}else{
			yzmFlag=false;
			logTip =logTip+"验证码为空,请输入！";
		}
		
		if(!yzmFlag) {
			//验证码校验失败
			session.setAttribute("loginTip", logTip);
			return LOGIN;
		}*/
		
		//2,根据账号查询用户信息
		UserVO u = loginService.qryUserByAccNum(accNum);
		
		//3,校验
		if(!NullUtil.isNotNull(u)) {
			session.setAttribute("loginTip", "用户不存在！");
			return LOGIN;
		}
		if(! u.getPassword().equals(password)) {
			session.setAttribute("loginTip", "密码错误！");
			return LOGIN;
		}
		//4,查询用户权限
		List<PrivilegeVO> pList = loginService.qryPrivilegeListByUserId(u.getId());
		if(NullUtil.isNotNull(pList)) {
			u.setpList(pList);
		}
		session.setMaxInactiveInterval(-1);
		session.setAttribute("USER_SESSION", u);
		
		//记录操作日志
		Map<String,Object> reqMap = new HashMap<String,Object>();
		reqMap.put("accNum", accNum);
		reqMap.put("password", password);
		String reqStr = JSON.toJSONString(reqMap);
		String resStr = JSON.toJSONString(u);
		OperLogVO operLog = new OperLogVO("登录", "Login.dologin", null, reqStr, resStr,"LOGIN");
		operLogService.insertOperLog(operLog);
		return WELCOME;
	}
	
	/*@RequestMapping(value="/doLogin",method=RequestMethod.POST)
	public String doLogin(String accNum,String password,String yzm,HttpSession session) {
		
		//1、校验验证码
		String validateCodeKey = (String) session.getAttribute("VALIDATECODEKEY");
		boolean yzmFlag = true;
		String logTip = "登录失败：";
		if(StringUtil.isNotEmpty(yzm) && StringUtil.isNotEmpty(validateCodeKey)){
			if(!yzm.trim().toLowerCase().equals(validateCodeKey.toLowerCase())){
				yzmFlag=false;
				logTip =logTip+"验证码错误";
			}
		}else{
			yzmFlag=false;
			logTip =logTip+"验证码为空,请输入";
		}
		
		if(!yzmFlag) {
			//验证码校验失败
//			model.addAttribute("loginTip", logTip);
			session.setAttribute("loginTip", logTip);
//			return LOGIN;
			return "redirect:/login";
		}
		
		//2,根据账号查询用户信息
//		int count = loginService.qryCountByAccNum(accNum);
		UserVO u = loginService.qryUserByAccNum(accNum);
		
		if(!NullUtil.isNotNull(u)) {
//			model.addAttribute("loginTip", "用户不存在");
			session.setAttribute("loginTip", "用户不存在");
			return "redirect:/login";
		}
//		将用户信息存入session
		
		
//		session.setAttribute("loginUser", u);
		System.out.println("username="+accNum+";password="+password);
		session.setMaxInactiveInterval(-1);
		session.setAttribute("USER_SESSION", u);
		return "redirect:/init";
	}*/
	
	
	@RequestMapping(value="/getValidateCode",method = RequestMethod.GET)
	public void doGet(Model model,HttpServletRequest request,HttpServletResponse response) {
		validateCodeService.getValidatecode(request, response);
	}
}
