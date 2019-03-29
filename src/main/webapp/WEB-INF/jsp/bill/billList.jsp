<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>账单查询</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/common/common.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/layui/css/layui.css" />

<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.12.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/layui/layui.all.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/constant.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/showMessage.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/util.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/json2.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/common.js"></script>
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
						<select name="billType">
					        <!-- <option value=""></option>
					        <option value="0">收入</option>
					        <option value="1">支出</option> -->
						</select>
					</div>
				</div>
				<div class="layui-inline">
					<label class="layui-form-label">用途</label>
					<div class="layui-input-inline">
						<select name="useFor">
					        <!-- <option value=""></option>
					        <option value="0">学习</option>
					        <option value="1">日常</option> -->
						</select>
					</div>
				</div>
				<div class="layui-inline">
					<label class="layui-form-label">支付方式</label>
					<div class="layui-input-inline">
						<select name="moneyType">
					        <!-- <option value=""></option>
					        <option value="0">现金</option>
					        <option value="1">银行卡</option>
					        <option value="2">微信</option>
					        <option value="3">支付宝</option> -->
						</select>
					</div>
				</div>
				<div class="layui-inline">
					<label class="layui-form-label">状态</label>
					<div class="layui-input-inline">
						<select name="billStatus">
					        <!-- <option value=""></option>
					        <option value="0">待确认</option>
					        <option value="1">已确认</option>
					        <option value="2">作废</option> -->
						</select>
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
				<a lay-event="edit" class="a_edit layui-icon layui-icon-edit mr10" title="修改"></a>
				<a lay-event="del" class="a_del layui-icon layui-icon-delete" title="删除"></a>
			</div>
		</script>

	</div>
</body>

</html>