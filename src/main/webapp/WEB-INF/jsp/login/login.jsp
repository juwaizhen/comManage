<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>登录页</title>
	<link rel="stylesheet" type="text/css" href="css/common/common.css" />
	
	<script type="text/javascript">
		function getValidateCode(img){
			img.src = img.src+"?"+new Date();
		}
	</script>
</head>
<body class="bg-fff">
	<!-- <form action="login/doLogin" method="post">
		账号： <input type="text" id="accNum" name="accNum" /><br />
		密&nbsp;&nbsp;&nbsp;&nbsp;码: <input type="text" id="passWord" name="password" /><br />
		<input type="submit" value="提交" />
	</form> -->

	<div class="login-logo">
		<img src="images/login/login-logo.png" />
	</div>
	<div class="login-main">
		<div class="login-left-img fl"></div>
		<div class="right-login">
			<!--二维码/电脑登录tab begin-->
			<div class="login-tab2">
				<a class="hover" id="a1" onclick="contr1();">
					<img src="images/login/login-qh1.png" width="45" height="43" />
				</a>
				<a id="a2" onclick="contr2();">
					<img src="images/login/login-qh2.png" width="45" height="43" />
				</a>
			</div>

			<div class="login-tabCnt">
				<div class="tabPane hover" id="div1">
					<h3 class="login-head">用户登录</h3>
					<form  action="login" method="post">
						<div class="form-inp">
							<img src="images/login/login-icon1.png" width="20" height="20" class="fl" />
							<input type="text" name="accNum" placeholder="请输入账号" class="fl" />
							<div class="clear"></div>
						</div>
						<div class="form-inp mt10">
							<img src="images/login/login-icon2.png" width="20" height="20" class="fl" />
							<input type="password" name="password" placeholder="请输入密码" class="fl" />
							<div class="clear"></div>
						</div>
						<div class="form-inp mt10">
							<img src="images/login/login-icon3.png" width="20" height="20" class="fl" />
							<input type="text" name="yzm" placeholder="请输入验证码" class="fl w110" />
							<div class="fr">
								<!-- <a class="a-yzm"><img src="images/login/login-yzm.png" width="93" height="23" /></a> -->
								<a class="a-yzm"><img id="yzm" src="${pageContext.request.contextPath }/login/getValidateCode" width="93;" height="23" onclick="getValidateCode(this);"/></a>
							</div>
							<div class="clear"></div>
						</div>
						<p>${loginTip}</p>
						
						<input class="login-btn mt10" type="submit" value="登&nbsp;&nbsp;录" />
						<!-- <button class="login-btn mt10">登&nbsp;&nbsp;录</button> -->
						<div class="clear"></div>
					</form>
				</div>
				<div class="tabPane" id="div2">
					<div class="login-ewm">
						<img src="images/login/login-ewm.png" />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer">版权所有：中国电信陕西分公司</div>
</body>

</html>