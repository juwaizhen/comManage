var UserEdit = function(){
	var temp = this;	//当前对象
	var currSelector = null;
	var flag = null;
	var id = null;
	/**初始化*/
	this.init = function(){
		currSelector = $("#userEdit");//获取页面选择器
		temp.bindMethod();	//初始化页面绑定操作
		
		flag = currSelector.find("input[name=flag]").val();
		id = currSelector.find("input[name=id]").val();
		if("add" !=flag){
			//编辑页面需要初始化原始数据 TODO 暂时用不到
			temp.initDate();
		}
	};
	
	
	//初始化绑定事件
	this.bindMethod = function(){
		layForm.on('submit(formUserEdit)', function(data){
			debugger;
		    var param = {
		    	"param":JSON.stringify(data.field)
		    };
		    var url = CONTEXT_PATH+ "/user/addUser";
//		    if(flag == 'edit'){
//		    	url = CONTEXT_PATH+"/bill/updateBill";
//		    }
		    
		    $.ajax({
				type	:	"post",
				url		:	url,
				data	:	param,
				async	:	false,
				success	:	function(result){
					if(result.resultCode == "0"){
						showMes.tAlert(result.resultMsg,function(){
							//当你在iframe页面关闭自身时
							var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
							parent.layer.close(index);
						});
					}else{
						showMes.fAlert(result.resultMsg);
					}
				},
				error:function(e){
					showMes.fAlert('修改账单异常!'+e);
				}
			});
		    
		    return false;
		  });
	}
	
	
};

var userEdit = new UserEdit();
$(function() {
	layForm.render();
	userEdit.init();
});

