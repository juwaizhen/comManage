TabUtil = function(){
	/**当前对象的引用*/
	var temp = this;
	
	this.tabAdd = function (layFilter,url,id,name) {
		//新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
		//关于tabAdd的方法所传入的参数可看layui的开发文档中基础方法部分
		element.tabAdd(layFilter, {
			title: name,
			content: '<iframe data-frameid="'+id+'" scrolling="auto" frameborder="0" src="'+url+'" style="width:100%;height:99%;min-height:480px;"></iframe>',
			id: id //规定好的id
		})
//		temp.CustomRightClick(id); //给tab绑定右击事件
		temp.FrameWH();  //计算ifram层的大小
//		temp.tabChange(layFilter,id);
	};
	
	this.FrameWH = function () {
		var h = $(window).height() -140;
		$("iframe").css("height",h+"px");
	}
	
//	切换到指定Tab项
	this.tabChange = function(layFilter,id) {
		element.tabChange(layFilter, id); //根据传入的id传入到指定的tab项
	}
}


var tabUtil = new TabUtil();
