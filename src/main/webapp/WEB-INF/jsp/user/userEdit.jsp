<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/includeFile.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>用户操作页面</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/user/userEdit.js"></script>
</head>
<body class="bg-white">
	<form id="userEdit" class="layui-form p15 formClass" action="">
		<input type="hidden" name="id" value="${id}"/>
		<input type="hidden" name="flag" value="${flag}"/>
		<div class="layui-col-xs12">
			<label class="layui-form-label">用户名</label>
			<div class="layui-input-block">
				<input type="text" name="name" required  lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-col-xs12">
			<label class="layui-form-label">账号(唯一)</label>
			<div class="layui-input-block">
				<input type="text" name="accNum" required  lay-verify="required" placeholder="请输入账号" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="clear"></div>
		<div name="btnDiv" class="layui-col-xs12 pt10">
			<div class="layui-input-block">
				<button class="layui-btn layui-btn-normal" lay-submit lay-filter="formUserEdit">提交</button>
				<button type="reset" class="layui-btn layui-btn-primary">重置</button>
			</div>
		</div>
	</form>
</body>

</html>