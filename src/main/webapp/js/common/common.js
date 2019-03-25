$(function(){
	//userxx-头部鼠标经过下拉
	$(".user").hover(function(){
		$(".user-xx").show();
		$(".user-xx").hover(function(){$(this).show()},function(){$(this).hide();});
	},function(){
		$(".user-xx").hide();
	});
	
})