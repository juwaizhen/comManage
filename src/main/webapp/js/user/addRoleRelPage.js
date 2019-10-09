var AddRoleRelPage = function(){
	var temp = this;	//当前对象
	var currSelector = null;
	
	/**初始化*/
	this.init = function(){
		currSelector = $("#userRoleManageDiv");//获取页面选择器
		temp.qryRoleList();
		temp.bindMethod();	//初始化页面绑定操作
	};
	
	//初始化绑定事件
	this.bindMethod = function(){
		//重置按钮事件-重新查询
		currSelector.find("button[name=resetBtn]").on('click',function(){
			temp.qryRoleList();
		});
		//查询按钮事件
		currSelector.find("button[name=submitBtn]").on('click',function(){
			temp.submitFun();
		});
	}
	
	
	this.qryRoleList = function(pageNo,pageSize){
		var table = layui.table;
		var userId = currSelector.find("input[name=userId]").val();
		var param={
				"userId":userId,
				"statusCd":"0"	//只查询有效状态的角色
			}
		
		table.render({
			elem: '#roleListTable',
            url: CONTEXT_PATH+"/user/getUserRoleRelList",	//获得角色列表，并获得是否包含该角色的标识
            method:"post",
            where:{param:JSON2.stringify(param)},
            loading: true,
            size: 'sm',  //sm小尺寸,lg大尺寸
            loading: true,
            cols: [[
//            	{field: '',title:'<div style="margin-top:10px"><input type="checkbox" name="chooseAll" lay-skin="primary" lay-filter="chooseAll" ></div>',width:'10%',templet:function(d){
//            		if(d.chooseFlag == "1"){
//                		return '<div style="margin-top:10px"><input type="checkbox" name="chooseRoleId" lay-skin="primary" lay-filter="chooseRoleId" ></div>';
//            		}else{
//            			return '<div style="margin-top:10px"><input type="checkbox" name="chooseRoleId" lay-skin="primary" lay-filter="chooseRoleId" ></div>';
//            		}
//            	}},
            	{type: 'checkbox', width: 50,fixed: true},
            	{field: 'id', title: 'ID', width: '15%'},
            	{field: 'name', title: '用户名称', width: '25%'},
            	{field: 'remark', title: '角色描述', width: '50%'}
             ]]
//             height: 280
        });
	}
	
	/**
	 * 增加用户角色关系
	 */
	this.submitFun = function(){
		//获取选中行的数据
		var checkStatus = table.checkStatus('roleListTable');
	    var data = checkStatus.data;
	    //获取选中行id
	    var idArr = data.map(x => {return x.id});
	    var ids = idArr.join(",");
	    if(util.isNull(ids)){
	    	layer.alert("请选择要分配的角色！");
	    	return;
	    }
//	    layer.alert(ids);
	    //获取用户id
	    var userId = currSelector.find("input[name=userId]").val();
	    var param = {
  				 "roleIds"	:	ids,
  				 "userId"	:	userId
  			};
   		$.ajax({
				type	:	"post",
				url		:	CONTEXT_PATH+"/user/addUserRoleRel",
				data	:	param,
				async	:	false,
				success	:	function(result){
					if(result.resultCode == "0"){
						showMes.tAlert("角色分配成功",function(){
							var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
							parent.layer.close(index);
						});
					}else{
						showMes.fAlert("角色分配失败："+result.resultMsg);
					}
				},
				error:function(e){
					showMes.fAlert('角色分配异常：'+e);
				}
			});
	}
	
	
	
};

var addRoleRelPage = new AddRoleRelPage();
$(function() {
	layForm.render();
	addRoleRelPage.init();
});

