var UserManage = function(){
	var temp = this;	//当前对象
	var currSelector = null;
	//默认值
	this.pageNoDef = 0;
	this.pageSizeDef = 10;
	
	/**初始化*/
	this.init = function(){
		currSelector = $("#userManageDiv");//获取页面选择器
		temp.initSelect();	//初始化下拉选择
		temp.bindMethod();	//初始化页面绑定操作
//		util.buildLayPage('tabPage',100);
	};
	
	//初始化下拉选择
	this.initSelect = function(){
//		初始化状态
		util.initConfigCodesSelect(currSelector.find("select[name=statusCd]"),"C_STATUS_CD","T_USER","TYPE1");
		layForm.render();//表单样式修改
		temp.qryUserList();
	}
	
	//初始化绑定事件
	this.bindMethod = function(){
		//重置按钮事件
		currSelector.find("button[name=resetBtn]").on('click',function(){
			temp.resetForm();
		});
		//查询按钮事件
		currSelector.find("button[name=userListQryBtn]").on('click',function(){
			temp.qryUserList();
		});
	}
	
	this.resetForm = function(){
		currSelector.find("input[name=name]").val('');
		currSelector.find("input[name=accNum]").val('');
		currSelector.find("select[name=statusCd]").val('');
		currSelector.find("input[name=createDateRange]").val('');
		layForm.render();//表单样式修改
	}
	
	this.qryUserList = function(pageNo,pageSize){
		var name = currSelector.find("input[name=name]").val();
		var accNum = currSelector.find("input[name=accNum]").val();
		var statusCd = currSelector.find("select[name=statusCd]").val();
		var createDateRange = util.setValue(currSelector.find("input[name=createDateRange]").val());
		var table = layui.table;
		var param={
				"name":name,
				"accNum":accNum,
				"statusCd":statusCd
			}
		
		if(util.isNotNull(createDateRange)){
			var createDates = createDateRange.split(' - ');
			var createDateStart = createDates[0]+" 00:00:00";
			var createDateEnd = createDates[1]+" 59:59:59";
			alert(createDateStart+"  "+createDateEnd);
			param.createDateStart = createDateStart;
			param.createDateEnd = createDateEnd;
		}
		table.render({
			elem: '#userListTable',
            url: CONTEXT_PATH+"/user/getUserList",
            method:"post",
            where:{param:JSON2.stringify(param)},
            size: 'lg',  //sm小尺寸
            loading: true,
            cols: [[
            	{field: 'id', title: 'ID', width: '12%', hide: true},
            	{field: 'name', title: '用户名称', width: '12%', sort: true},
            	{field: 'accNum', title: '用户账号', width: '12%'},
            	{field: 'createUserName', title: '创建人', width: '12%'},
            	{field: 'createDate', title: '创建时间', width: '12%'},
            	{field: 'updateUserName', title: '最后修改人', width: '12%'},
            	{field: 'updateDate', title: '最后修改时间', width: '12%'},
            	{field: 'statusCdName', title: '状态', width: '8%'},
            	{filed:	'frozenStatus', title: '是否冻结', width:'10%',align: 'center',templet: function(d){  //自定义显示内容
                		if(d.statusCd == "0" || d.statusCd == "1"){
	                		var strCheck = d.statusCd == "0" ? "checked" : "";
	                		return '<div style="margin-top:8px"><input type="checkbox" name="frozenStatus" lay-filter="frozenStatus" lay-skin="switch" lay-text="在用|冻结" ' +strCheck+ ' mid='+d.id+'></div>';
                		}
                		return '';
                	}
            	},
            	{field: 'price', title: '操作', width: '10%', toolbar: '#barDemo'}
             ]],
             toolbar:true,
             toolbar: '#headBar',
             page:{
            	 layout	:	['count', 'prev', 'page', 'next', 'limit', 'skip'],
            	 theme	:	'#1E9FFF',
            	 jump:function (obj,first) {
                 	debugger;
                     if(!first){
                         curnum = obj.curr;
                         limitcount = obj.limit;
                         productsearch(productGroupId,curnum,limitcount);
                     }
                 }
             },
//             height: 280
        });
		
		//表头的操作
		table.on('toolbar(userListTable)', function(obj){
			switch(obj.event){
		    case 'addBtn':
		      temp.addUser();
		    break;
		  };
        });
		
		//表格后面的操作
		table.on('tool(userListTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data, //获得当前行数据
			layEvent = obj.event; //获得 lay-event 对应的值
			
			var id = data.id;
		    if(layEvent === 'addRoleRel'){
		    	temp.addRoleRel(data);
		    }else if(layEvent === 'resetPass'){
		    	temp.resetPass(data);
		    } else if(layEvent === 'del'){
		    	temp.delUser(data);
		    }
		});
		//冻结，解冻按钮操作
		layForm.on('switch(frozenStatus)', function(obj){
			debugger;
			var id = $(this).attr('mid');
			var oldSwitchStatus = obj.elem.checked; //获取原状态
			var statusCd = oldSwitchStatus?"0":"1";	//需要修改的目标状态
			var msg = oldSwitchStatus?"解冻操作":"冻结操作";
			var param = {
				 "id"		:	id,
				 "statusCd"	:	statusCd
			};
			$.ajax({
				type	:	"post",
				url		:	CONTEXT_PATH+"/user/updateUser",
				data	:	param,
				async	:	false,
				success	:	function(result){
					if(result.resultCode == "0"){
						showMes.tAlert(msg+"成功",function(){
							temp.qryUserList();
						});
					}else{
						showMes.fAlert(msg+"失败："+result.resultMsg);
						obj.elem.checked=!oldSwitchStatus;
						layForm.render();
					}
				},
				error:function(e){
					showMes.fAlert('修改客户冻结状态异常：'+e);
				}
			});
			
		});
	}
	
	/**
	 * 重置用户密码
	 */
	this.resetPass = function(data){
		var name = data.name;
		var id = data.id;
		layer.confirm('确定重置用户：'+name+'的密码？', function(index){
    		var param = {
   				 "id"		:	id,
   				 "passWord"	:	"123456"
   			};
    		$.ajax({
				type	:	"post",
				url		:	CONTEXT_PATH+"/user/updateUser",
				data	:	param,
				async	:	false,
				success	:	function(result){
					if(result.resultCode == "0"){
						showMes.tAlert("重置密码成功",function(){
							layer.close(index);
						});
					}else{
						showMes.fAlert("重置密码失败："+result.resultMsg);
					}
				},
				error:function(e){
					showMes.fAlert('重置密码异常：'+e);
				}
			});
      });
	}
	
	this.delUser = function(data){
		var id = data.id;
		layer.confirm('确定删除该用户吗', function(index){
    		var param = {
   				 "id"		:	id,
   				 "statusCd"	:	2
   			};
    		$.ajax({
				type	:	"post",
				url		:	CONTEXT_PATH+"/user/updateUser",
				data	:	param,
				async	:	false,
				success	:	function(result){
					if(result.resultCode == "0"){
						showMes.tAlert("删除操作成功",function(){
							layer.close(index);
							temp.qryUserList();
						});
					}else{
						showMes.fAlert("删除操作失败："+result.resultMsg);
					}
				},
				error:function(e){
					showMes.fAlert('删除操作异常：'+e);
				}
			});
        //向服务端发送删除指令
      });
	}
	
	this.addRoleRel = function(data){
		var id = data.id;
		layer.open({
			type: 2,
			title:"用户角色分配",
			area : ['850px', '500px'], //宽高
			content: CONTEXT_PATH+"/user/showAddRoleRelPage?userId="+id //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			
		}); 
	}
	
	/**
	 * 新增用户
	 */
	this.addUser = function(){
		layer.open({
			type: 2,
			title:"新增用户",
			area : ['850px', '500px'], //宽高
			content: CONTEXT_PATH+"/user/showUserView?flag=add", //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			end: function(index, layero){
//				弹出层销毁，调用
				temp.qryUserList();
			} 
		}); 
	}
	
};

var userManage = new UserManage();
$(function() {
	layForm.render();
	userManage.init();
});

