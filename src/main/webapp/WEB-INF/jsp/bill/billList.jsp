<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/includeFile.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>账单查询</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/bill/billList.js"></script>
</head>
<body>
	<div class="layui-card bgBorder minHeight440" name="billListDiv" id="billListDiv">
		<div class="layui-form p15 " lay-filter="app-content-workorder">
			<div class="layui-form-item">
				<div class="layui-inline">
					<label class="layui-form-label">账单标题</label>
					<div class="layui-input-inline">
						<input type="text" name="billTitle" placeholder="请输入标题关键字" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-inline">
					<label class="layui-form-label">收支类型</label>
					<div class="layui-input-inline">
						<select name="billType"></select>
					</div>
				</div>
				<div class="layui-inline">
					<label class="layui-form-label">用途</label>
					<div class="layui-input-inline">
						<select name="useFor"></select>
					</div>
				</div>
				<div class="layui-inline">
					<label class="layui-form-label">支付方式</label>
					<div class="layui-input-inline">
						<select name="moneyType"></select>
					</div>
				</div>
				<div class="layui-inline">
					<label class="layui-form-label">状态</label>
					<div class="layui-input-inline">
						<select name="billStatus"></select>
					</div>
				</div>
				<div class="layui-inline">
                  <label class="layui-form-label">创建时间</label>
                  <div class="layui-input-inline">
                    <input type="text" class="layui-input dateRange" id="createDateRange" placeholder="请选择" readonly="readonly">
                  </div>
                </div>
                <div style="text-align: center;">
	                <button class="layui-btn layui-btn-normal" name="billListQryBtn">查询</button>
	                <button class="layui-btn layui-btn-primary" name="resetBtn">重置</button>
				</div>
			</div>
		</div>
		<div class="">
			<table class="layui-table m0" lay-filter="billListTable" id="billListTable"'>
			</table>
			<div id="tabPage"></div>
		</div>
		<script type="text/html" id="barDemo">
			<div class="layui-btn-container">
				<a lay-event="detail" class="a_detail layui-icon layui-icon-list mr10" title="详情"></a>
				<a lay-event="edit" class="a_edit layui-icon layui-icon-edit mr10" title="修改"></a>
				<a lay-event="del" class="a_del layui-icon layui-icon-delete" title="删除"></a>
			</div>
		</script>

	</div>
</body>

</html>