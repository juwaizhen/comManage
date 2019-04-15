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
//		util.buildLayPage('tabPage',100);
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
		
		layForm.render();//表单样式修改
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
		var table = layui.table;
		var param={
				"title":billTitle,
				"type":billType,
				"useFor":useFor,
				"moneyType":moneyType,
				"statusCd":billStatus
			}
		debugger;
		table.render({
			elem: '#billListTable',
            url: CONTEXT_PATH+"/bill/getBillList",
            method:"post",
            where:{param:JSON2.stringify(param)},
            size: 'sm',
            loading: true,
            cols: [[
            	{field: 'id', title: 'ID', width: '12%', hide: true},
            	{field: 'title', title: '标题', width: '12%', sort: true},
            	{field: 'typeName', title: '收支类型', width: '8%'},
            	{field: 'useForName', title: '资金用途', width: '8%'},
            	{field: 'usePerson', title: '使用人', width: '8%'},
            	{field: 'moneyTypeName', title: '支付方式', width: '8%'},
            	{field: 'price', title: '金额', width: '8%'},
            	{field: 'statusCdName', title: '状态', width: '8%'},
            	{field: 'createDate', title: '创建时间', width: '10%'},
            	{field: 'remark', title: '备注', width: '20%'},
            	{field: 'price', title: '操作', width: '8%',fixed: 'right', toolbar: '#barDemo'}
             ]],
//             toolbar:true,
//             toolbar: '#barDemo',
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
		/*table.on('toolbar(billListTable)', function(obj){
			switch(obj.event){
		    case 'add':
		      layer.msg('添加');
		    break;
		  };
        });*/
		
		//表格后面的操作
		table.on('tool(billListTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data, //获得当前行数据
			layEvent = obj.event; //获得 lay-event 对应的值
			
			var billId = data.id;
		    if(layEvent === 'detail'){
		    	temp.showView(billId)
		    }else if(layEvent === 'edit'){
		    	temp.showEdit(billId);
		    } else if(layEvent === 'del'){
		    	layer.confirm('确定删除该数据吗', function(index){
		        obj.del(); //删除对应行（tr）的DOM结构
		        layer.close(index);
		        //向服务端发送删除指令
		      });
		    }
		});
	}
	
	this.showView = function(billId){
		layer.open({
			type: 2,
			title:"账单详情",
			area : ['850px', '500px'], //宽高
			content: CONTEXT_PATH+"/bill/showBillView?billId="+billId+"&flag=detail" //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
		}); 
	}
	this.showEdit = function(billId){
		layer.open({
			type: 2,
			title:"账单修改",
			area : ['850px', '500px'], //宽高
			content: CONTEXT_PATH+"/bill/showBillView?billId="+billId+"&flag=edit", //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
			end: function(index, layero){
//				弹出层销毁，调用
				temp.qryBillList();
			} 
		}); 
	}
	
};

var billList = new BillList();
//var billListForm = layui.form; 
$(function() {
	layForm.render();
	billList.init();
});

