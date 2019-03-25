<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF8">
<title>首页</title>
<link rel="stylesheet" type="text/css" href="css/common/common.css" />
<!-- <link rel="stylesheet" type="text/css" href="js/layer/css/layui.css" /> -->
<link rel="stylesheet" type="text/css" href="js/layui/css/layui.css" />
<script type="text/javascript" src="js/jquery-1.12.1.min.js"></script>
<!-- <script type="text/javascript" src="js/layer/layui.all.js"></script> -->
<script type="text/javascript" src="js/layui/layui.all.js"></script>
<script type="text/javascript" src="js/common/common.js"></script>
<script type="text/javascript" src="js/common/showMessage.js"></script>
<script type="text/javascript" src="js/common/util.js"></script>
<script type="text/javascript" src="js/common/constant.js"></script>
<script type="text/javascript" src="js/common/tabUtil.js"></script>
<script type="text/javascript" src="js/init.js"></script>
</head>
<body>
	<!--头部+导航 begin-->
	<div class="head">
		<div class="head-r fr">
			<ul>
				<li class="user">
					<a class="icon-jt">${sessionScope.USER_SESSION.name }<span>（${sessionScope.USER_SESSION.accNum }）</span></a>
					<div class="user-xx">
						<p><a onclick="changePass()">修改密码</a></p>
						<p><a>退出</a></p>
					</div>
				</li>     
				<!-- <li><img src="/images/head/head-icon.png" /></li> --><!-- TODO 暂时无用 -->
			</ul>
		</div>
		<img src="images/head/login_login.png" class="logo" id="homePageBtn"/>
		<div id="outer" class="outer-tab">
			<div class="left-dir"></div>
			<div class="right-dir"></div>
			<div id="firstMenuDiv" class="menu">
			</div>
		</div>
		<div class="clear"></div>
	</div>
	<div class="menu_second" id="menu_second">
	</div>
	<div id="bodyDiv" name="bodyDiv" style="overflow: auto">
		<div id="homeDiv">
			<!-- 首页 -->
			<%@ include file="homePage.jsp"%>
		</div>
		<div id="mainDiv" class="pl10 pb10" style="display:none">
			<!-- 主页 -->
			<div class="layui-tab layui-tab-brief"  lay-allowClose="true" lay-filter="demo">
				<ul class="layui-tab-title">
				</ul>
				<div class="layui-tab-content">
				</div>
			</div>  
		</div>
	</div>
</body>
</html>