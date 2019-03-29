var Init = function(){
	var temp = this;	//当前对象
	var menuList = null;//缓存菜单对象
	/**初始化*/
	this.init = function(){
		currSelector = $("#mainDiv");//获取页面选择器
		temp.initMenu();	//初始化菜单
		temp.bindMethod();	//初始化页面绑定操作
	};
	
	//初始化菜单
	this.initMenu = function(){
		$.ajax({
			type:"post",
			url:CONTEXT_PATH+"/privilege/getMenu",
//			data:para,
			success:function(result){
				if(result.resultCode == "0"){
					debugger;
					//拼装菜单
					temp.menuList =  result.resultObj;
					var firstMenuHtml = [];
					$.each(temp.menuList,function(i,menu){
						if(menu.parId == '0'){
							//追加一级菜单
							firstMenuHtml.push("<dl firstMenuId='"+menu.id+"'><dd><a href='"+CONTEXT_PATH+"/"+menu.url+"'>"+menu.name+"</a></dd></dl>");
						}
					})
					firstMenuHtml.push("<div class='clear'></div>");
					$('#firstMenuDiv').append(firstMenuHtml);
					temp.bindMenuMethod();
					
				}else{
					showMes.fAlert(result.resultMsg);
				}
			},
			error:function(e){
				showMes.fAlert('获取菜单异常!');
			}
		});
	}
	
	//菜单事件
	this.bindMenuMethod = function(){
		//头部导航
		$('#firstMenuDiv').find('dl').mouseenter(// 鼠标移入移出样式
			function(){
				temp.secondMenuShow($(this),$('#menu_second'));
			}
		);
		
		// 鼠标移入main主页面后隐藏2、3级菜单
		$('div[name="bodyDiv"]').mouseenter(
			function(){
				//鼠标移出
				$('div[class="menu_second"]').hide();
			}
		);
	}
	
	//生成2级菜单
	this.secondMenuShow = function(firstMenuElement , secondMenuDiv) {
		var firstMenuId = firstMenuElement.attr('firstMenuId');
		var secondMenu = [];
		var secondFlag = false;
		secondMenu.push("<ul><li>");
		$.each(temp.menuList,function(i,menu){
			if(menu.parId == firstMenuId){
				secondMenu.push("<a class='menu2' id='"+menu.id+"' name='"+menu.name+"' url='"+menu.url+"'>"+menu.name+"</a>");
				secondFlag = true;
			}
		});
		secondMenu.push("</li></ul>");
		
		if(!secondFlag){
			return;
		}
		
		secondMenuDiv.html("").append(secondMenu.join(""));
		var firstMenuLeft = firstMenuElement.offset().left;
		var windowWidth = $(window).width(); 
		var secondMenuWidth = secondMenuDiv.width();
		var secondMenuTop = firstMenuElement.offset().top + firstMenuElement.height();
		var secondMenuLeft = firstMenuLeft;
		var secondMenuRight = firstMenuLeft + secondMenuWidth;
		if(secondMenuLeft < 0) {
			secondMenuLeft = 0;
		}
		if(secondMenuRight + 24 >= windowWidth ) {
			secondMenuLeft = windowWidth - secondMenuWidth - 24;
			secondMenuRight = windowWidth - 24;
		}	
		secondMenuDiv.css({
			top:secondMenuTop,
			left:secondMenuLeft,
			width: secondMenuWidth
		});
  
		secondMenuDiv.show();
		temp.secondMenuClick()
	}
	
	//二级菜单点击事件
	this.secondMenuClick = function(){
//		$('.menu2').on('click',function(){
//			var _this = $(this);
//			var url = _this.attr('url');
//			var name = _this.attr('name');
//			var id = _this.attr('id');
//			tabUtil.tabAdd('demo',url,id,name);
//		});
		
		
//		二级菜单点击事件
		$('.menu2').on('click', function() {
			$('#homeDiv').hide();
			$('#mainDiv').show();
			var _this = $(this);
			var url = _this.attr('url');
			var name = _this.attr('name');
			var id = _this.attr('id');
			//这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
			if ($(".layui-tab-title li[lay-id]").length <= 0) {
				//如果比零小，则直接打开新的tab项
				tabUtil.tabAdd('demo',url,id,name);
			} else {
				//否则判断该tab项是否以及存在
				var tabFlag = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
				$.each($(".layui-tab-title li[lay-id]"), function () {
				    //如果二级菜单的id 在tab项中的lay-id属性可以找到，则说明该tab项已经打开
				    if ($(this).attr("lay-id") == id) {
				    	tabFlag = true;
				    }
				})
				if (tabFlag == false) {
				    //标志为false 新增一个tab项
					tabUtil.tabAdd('demo',url,id,name);
				}
			}
//			最后不管是否新增tab，最后都转到要打开的选项页面上
			tabUtil.tabChange('demo',id);
		});
	}
	
	//绑定初始化页面基础事件
	this.bindMethod = function(){
		//首页logo点击事件，跳转到首页
		$('#homePageBtn').on('click',function(){
			$('#homeDiv').show();
			$('#mainDiv').hide();
		})
	}
	
	//网页尺寸变化事件
	this.windResize = function(){
		$(window).resize(function() {
			var bodyDivH = $(window).height() -40;
			$("#bodyDiv").css("height",bodyDivH+"px");
		});
	}
	
	
	
};

var init = new Init();
var element = layui.element;
$(function() {
	var bodyDivH = $(window).height() -40;
	$("#bodyDiv").css("height",bodyDivH+"px");
	
	init.init();
	init.windResize();
});

