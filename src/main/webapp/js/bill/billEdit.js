var BillEdit = function(){
	var temp = this;	//当前对象
	var currSelector = null;
	var flag = null;
	var billId = null;
	/**初始化*/
	this.init = function(){
		currSelector = $("#billEdit");//获取页面选择器
		temp.initSelect();	//初始化下拉选择
		temp.bindMethod();	//初始化页面绑定操作
		
		flag = currSelector.find("input[name=flag]").val();
		billId = currSelector.find("input[name=billId]").val();
		if("add" !=flag){
			//编辑页面需要初始化原始数据
			temp.initDate();
		}
	};
	
//	初始化下拉选择
	this.initSelect = function(){
//		初始化收支类型
		util.initConfigCodesSelect(currSelector.find("select[name=billType]"),"C_TYPE","T_BILL","TYPE1");
//		初始化用途
		util.initConfigCodesSelect(currSelector.find("select[name=useFor]"),"C_USE_FOR","T_BILL","TYPE1");
//		初始化支付方式
		util.initConfigCodesSelect(currSelector.find("select[name=moneyType]"),"C_MONEY_TYPE","T_BILL","TYPE1");
		
		layForm.render();//表单样式修改
	}
	
//	初始化数据
	this.initDate = function(){
		var param = {
				"billId":billId
		}
		$.ajax({
			type:"post",
			url:CONTEXT_PATH+"/bill/getBillById",
			data:param,
			async:false,
			success:function(result){
				if(result.resultCode == "0"){
					if(!util.isNull(result.resultObj)){
						//拼数据
						var data = result.resultObj;
						currSelector.find("input[name=billTitle]").val(data.title);
						currSelector.find("select[name=billType]").val(data.type);
						currSelector.find("select[name=useFor]").val(data.useFor);
						currSelector.find("select[name=moneyType]").val(data.moneyType);
						currSelector.find("input[name=price]").val(data.price);
						currSelector.find("textarea[name=remark]").val(data.remark);
						
						layForm.render();//表单样式修改
					}
				}else{
					showMes.fAlert(result.resultMsg);
				}
			},
			error:function(e){
				showMes.fAlert('获取"T_BILL"表数据异常!');
			}
		});
	}
	
	
	//初始化绑定事件
	this.bindMethod = function(){
		layForm.on('submit(formBillView)', function(data){
			debugger;
		    var param = {
		    	"param":JSON.stringify(data.field)
		    };
		    var url = "新增url";
		    if(flag == 'edit'){
		    	url = CONTEXT_PATH+"/bill/updateBill";
		    }
		    
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

var billEdit = new BillEdit();
//var billListForm = layui.form; 
$(function() {
	layForm.render();
	billEdit.init();
});

