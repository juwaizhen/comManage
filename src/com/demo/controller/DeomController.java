package com.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.demo.service.IDemoService;

/**
 * @author wyl
 * 测试页面跳转
 *
 */
@Controller
@RequestMapping("/init")
public class DeomController {

	private static final String INIT_PAGE = "init"; 
	
	@Autowired
	private IDemoService demoService ;
	@RequestMapping("")
	public String toInit(Model model){
		String nickname = demoService.queryNickNameById("1");
		model.addAttribute("nickname", nickname);
		return INIT_PAGE;	//提交测试
	}
	
}
