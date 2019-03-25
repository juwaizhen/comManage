var BillList = function(){
	var temp = this;	//当前对象
	var currSelector = null;
	//默认值
	this.pageNoDef = 0;
	this.pageSizeDef = 10;
	
	/**初始化*/
	this.init = function(){
		currSelector = $("#billListDiv");//获取页面选择器
		temp.initSelect();	//初始化下拉选择
		temp.bindMethod();	//初始化页面绑定操作
		var laydate = layui.laydate;
		laydate.render({ 
			  elem: '#createDateRange',
			  type: 'month',
//			  range: true //或 range: '~' 来自定义分割字符
			  range: '~'
			});
		
		
//		var laypage = layui.laypage;
//		  //执行一个laypage实例
//		  laypage.render({
//		    /*elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
//		    ,count: 50 //数据总数，从服务端得到
//*/		    
//			  elem: 'test1'
//				    ,count: 100
//				    ,layout: ['count', 'prev', 'page', 'next', 'limit', 'skip']
//		  			,theme: '#1E9FFF'
//				    ,jump: function(obj){
//				      console.log(obj)
//				    }
//		  });
		util.buildLayPage('test1',100);
	};
	
	//初始化下拉选择
	this.initSelect = function(){
//		初始化收支类型
		util.initConfigCodesSelect(currSelector.find("select[name=billType]"),"C_TYPE","T_BILL","TYPE1");
//		初始化用途
		util.initConfigCodesSelect(currSelector.find("select[name=useFor]"),"C_USE_FOR","T_BILL","TYPE1");
//		初始化支付方式
		util.initConfigCodesSelect(currSelector.find("select[name=moneyType]"),"C_MONEY_TYPE","T_BILL","TYPE1");
//		初始化账单状态
		util.initConfigCodesSelect(currSelector.find("select[name=billStatus]"),"C_STATUS_CD","T_BILL","TYPE1");
		
		billListForm.render();//重置表单
	}
	
	//初始化绑定事件
	this.bindMethod = function(){
		currSelector.find("button[name=billListQryBtn]").on('click',function(){
			temp.qryBillList();
		})
	}
	
	this.qryBillList = function(pageNo,pageSize){
		var billTitle = currSelector.find("input[name=billTitle]").val();
		var billType = currSelector.find("select[name=billType]").val();
		var useFor = currSelector.find("select[name=useFor]").val();
		var moneyType = currSelector.find("select[name=moneyType]").val();
		var billStatus = currSelector.find("select[name=billStatus]").val();
		var createDateRange = $('#createDateRange').val();
		
		var param={
				"title":billTitle,
				"type":billType,
				"useFor":useFor,
				"moneyType":moneyType,
				"statusCd":billStatus,
				"pageNo":pageNo,
				"pageSize":pageSize
			}
		if(util.setValue(createDateRange) !=''){
			param.createDateStart = createDateRange.split('~')[0];
			param.createDateEnd = createDateRange.split('~')[1];
		}
		
		$.ajax({
			type:"post",
			url:CONTEXT_PATH+"/bill/getBillList",
			data:JSON2.stringify(param),
			dataType : "json",
			contentType : "application/json; charset=utf-8",
			success:function(result){
				if(result.resultCode == "0"){
					console.log(result.resultObj);
				}else{
					showMes.fAlert(result.resultMsg);
				}
			},
			error:function(e){
				showMes.fAlert('查询账单列表异常!');
			}
		})
	}
	
	
};

var billList = new BillList();
var billListForm = layui.form; 
$(function() {
	billListForm.render();
	billList.init();
});

