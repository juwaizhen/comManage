<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/includeFile.jsp" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>用户角色分配管理</title>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/user/addRoleRelPage.js"></script>
	</head>
	<body>
		<div class="layui-card bgBorder minHeight440" name="userRoleManageDiv" id="userRoleManageDiv">
			<input type="hidden" name="userId" id="userId" value="${userId}"/>
			<div class="">
				<table class="layui-table m0" lay-filter="roleListTable" id="roleListTable"'>
				</table>
			</div>
			<div style="text-align: center; margin-top:30px">
				<button class="layui-btn layui-btn-normal" name="submitBtn">确定</button>
				<button class="layui-btn layui-btn-primary" name="resetBtn">重置</button>
			</div>
		</div>
	</body>

</html>