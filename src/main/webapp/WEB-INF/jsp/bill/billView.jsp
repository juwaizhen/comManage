<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/includeFile.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>账单操作页面</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/bill/billView.js"></script>
</head>
<body class="bg-white">
	
	<div id="billView" class="p15">
		<input type="hidden" name="billId" value="${billId}"/>
		<h2 class="main-title">
			<span class="fl titHead">账单基本信息</span>
		</h2>
		<div id="billInfo" name="billInfo"></div>
		<h2 class="main-title">
			<span class="fl titHead">账单历史信息</span>
		</h2>
		<div id="billLog" name="billLog">
			<table class="layui-table m0" lay-filter="billLogListTable" id="billLogListTable"'></table>
		</div>
	</div>
	
</body>
</html>