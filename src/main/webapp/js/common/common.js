var laydate = layui.laydate;
$(function(){
//	userxx-头部鼠标经过下拉
	$(".user").hover(function(){
		$(".user-xx").show();
		$(".user-xx").hover(function(){$(this).show()},function(){$(this).hide();});
	},function(){
		$(".user-xx").hide();
	});
	
//	绑定所有的时间插件
	lay('.date').each(function(){
		laydate.render({
			elem: this
		});
	});
	
	//日期范围（日）选择-laydate
	lay('.dateRange').each(function(){
		laydate.render({
			elem: this,
			range: true
//			type: 'month',//以月为单位
//			range: true //或 range: '~' 来自定义分割字符
		});
	}); 
})
