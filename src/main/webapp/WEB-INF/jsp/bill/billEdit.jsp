<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/includeFile.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>账单操作页面</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/bill/billEdit.js"></script>
</head>
<body class="bg-white">
	<form id="billEdit" class="layui-form p15 formClass" action="">
		<input type="hidden" name="billId" value="${billId}"/>
		<input type="hidden" name="flag" value="${flag}"/>
		<div class="layui-col-xs12">
			<label class="layui-form-label">标题</label>
			<div class="layui-input-block">
				<input type="text" name="billTitle" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-col-xs12">
			<label class="layui-form-label">收支类型</label>
			<div class="layui-input-block">
				<select name="billType"></select>
			</div>
		</div>
		<div class="layui-col-xs12">
			<label class="layui-form-label">资金用途</label>
			<div class="layui-input-block">
				<select name="useFor"></select>
			</div>
		</div>
		<div class="layui-col-xs12">
			<label class="layui-form-label">支付方式</label>
			<div class="layui-input-block">
				<select name="moneyType"></select>
			</div>
		</div>
		<div class="layui-col-xs12">
			<label class="layui-form-label">金额</label>
			<div class="layui-input-block">
				<input type="text" name="price" placeholder="请输入金额" class="layui-input">
			</div>
		</div>
		<div class="layui-col-xs12">
			<label class="layui-form-label">备注</label>
			<div class="layui-input-block">
				 <textarea name="remark" placeholder="请输入备注" class="layui-textarea"></textarea>
			</div>
		</div>
		<div class="clear"></div>
		<div name="btnDiv" class="layui-col-xs12 pt10">
			<div class="layui-input-block">
				<button class="layui-btn layui-btn-normal" lay-submit lay-filter="formBillView">提交</button>
				<button type="reset" class="layui-btn layui-btn-primary">重置</button>
			</div>
		</div>
	</form>
</body>

</html>