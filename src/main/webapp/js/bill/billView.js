var BillView = function(){
	var temp = this;	//当前对象
	var currSelector = null;
	var billId = null;
	/**初始化*/
	this.init = function(){
		currSelector = $("#billView");//获取页面选择器
		
		billId = currSelector.find("input[name=billId]").val();
//		初始化账单数据
		temp.initBillInfo();
//		查询账单历史信息
		temp.initBillLog();
	};
	
//	初始化数据
	this.initBillInfo = function(){
		var html = [];
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
						html.push("<ul class='new-list mt10'>");
						var data = result.resultObj;
						html.push("<li class='col-4'><label>标题：</label>"+util.setValue(data.title)+"</li>");
						html.push("<li class='col-4'><label>收支类型：</label>"+util.setValue(data.typeName)+"</li>");
						html.push("<li class='col-4'><label>资金用途：</label>"+util.setValue(data.useForName)+"</li>");
						html.push("<li class='col-4'><label>支付方式：</label>"+util.setValue(data.moneyTypeName)+"</li>");
						html.push("<li class='col-4'><label>金额：</label>"+util.setValue(data.price)+"</li>");
						html.push("<li class='col-4'><label>账单状态：</label>"+util.setValue(data.statusCdName)+"</li>");
						html.push("<li class='col-12'><label>备注：</label>"+util.setValue(data.remark)+"</li>");
						html.push("<div class='clear'></div></ul>");
						$("#billInfo").html(html.join(""));
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
	
//	账单历史信息
	this.initBillLog = function(){
		var param = {
				"billId":billId
		}
		
		table.render({
			elem: '#billLogListTable',
            url: CONTEXT_PATH+"/bill/getBillLogByBillId",
            method:"post",
            where:param,
            size: 'sm',
            loading: true,
            cols: [[
            	{field: 'title', title: '标题'},
            	{field: 'typeName', title: '收支类型'},
            	{field: 'useForName', title: '资金用途'},
            	{field: 'usePerson', title: '使用人'},
            	{field: 'moneyTypeName', title: '支付方式'},
            	{field: 'price', title: '金额'},
            	{field: 'statusCdName', title: '状态'},
            	{field: 'updateDate', title: '创建时间'},
            	{field: 'remark', title: '备注'}
             ]],
             page:{
            	 layout	:	['count', 'prev', 'page', 'next'],
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
        });
	}
};

var billList = new BillView();
//var billListForm = layui.form; 
$(function() {
	layForm.render();
	billList.init();
});

