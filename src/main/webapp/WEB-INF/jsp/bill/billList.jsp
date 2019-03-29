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
			<!-- <colgroup>
				<col width="12%">
				<col width="8%">
				<col width="8%">
				<col width="8%">
				<col width="8%">
				<col width="8%">
				<col width="8%">
				<col width="10%">
				<col width="22%">
				<col width="8%">
				<col>
			</colgroup>
			<thead>
				<tr>
					<th>标题</th>
					<th>收支类型</th>
					<th>资金用途</th>
					<th>使用人</th>
					<th>支付方式</th>
					<th>金额</th>
					<th>状态</th>
					<th>创建时间</th>
					<th>备注</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody name="billListTbody">
				<tr>
					<td>贤心</td>
					<td>2016-11-29</td>
					<td>s洒水车</td>
					<td>s洒水车</td>
					<td>s洒水车</td>
					<td>贤心</td>
					<td>2016-11-29</td>
					<td>sa</td>
					<td>人生就像是一场修行</td>
					<td>2016-11-29</td>
				</tr>
				<tr>
					<td>许闲心</td>
					<td>2016-11-28</td>
					<td>123</td>
					<td>许闲心</td>
					<td>2016-11-28</td>
					<td>s洒水车</td>
					<td>s洒水车</td>
					<td>于…</td>
					<td>于千万人之中遇见你所遇见的人，于千万年之中，时间的无涯的荒野里…</td>
					<td>2016-11-28</td>
				</tr>
			</tbody> -->
		</table>
		<div id="tabPage"></div>
		</div>
	</div>
</body>

</html>