<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/includeFile.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>用户管理</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/user/userManage.js"></script>
</head>
<body>
	<div class="layui-card bgBorder minHeight440" name="userManageDiv" id="userManageDiv">
		<div class="layui-form p15 " lay-filter="app-content-workorder">
			<div class="layui-form-item">
				<div class="layui-inline">
					<label class="layui-form-label">用户名称</label>
					<div class="layui-input-inline">
						<input type="text" name="name" placeholder="请输入标题关键字" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-inline">
					<label class="layui-form-label">用户账号</label>
					<div class="layui-input-inline">
						<input type="text" name="accNum" placeholder="请输入标题关键字" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-inline">
					<label class="layui-form-label">状态</label>
					<div class="layui-input-inline">
						<select name="statusCd"></select>
					</div>
				</div>
				<div class="layui-inline">
                  <label class="layui-form-label">创建时间</label>
                  <div class="layui-input-inline">
                    <input type="text" class="layui-input dateRange" id="createDateRange" name="createDateRange" placeholder="请选择" readonly="readonly">
                  </div>
                </div>
                <div style="text-align: center;">
	                <button class="layui-btn layui-btn-normal" name="userListQryBtn">查询</button>
	                <button class="layui-btn layui-btn-primary" name="resetBtn">重置</button>
				</div>
			</div>
		</div>
		<div class="">
			<table class="layui-table m0" lay-filter="userListTable" id="userListTable"'>
			</table>
			<div id="tabPage"></div>
		</div>
		
		<script type="text/html" id="headBar">
			<div class="layui-btn-container">
 				<button class="layui-btn layui-btn-normal" lay-event="addBtn">新增</button>
			</div>
		</script>
		<script type="text/html" id="barDemo">
			<div class="layui-btn-container">
  				{{#  if(d.statusCd != '2'){ }}
					<a lay-event="addRoleRel" class="a_oper_blue layui-icon layui-icon-util mr10" title="赋权"></a>
					<a lay-event="resetPass" class="a_oper_red layui-icon layui-icon-password mr10" title="重置密码"></a>
					<a lay-event="del" class="a_oper_red layui-icon layui-icon-delete mr10" title="删除"></a>
				{{#  } }}
			</div>
		</script>
		

	</div>
</body>

</html>