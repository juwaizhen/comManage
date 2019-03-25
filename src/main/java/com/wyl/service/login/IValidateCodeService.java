package com.wyl.service.login;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface IValidateCodeService {

	/*
	 * 获取验证码
	 */
	void getValidatecode(HttpServletRequest request, HttpServletResponse response);
}
