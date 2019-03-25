var showMes = {
	tAlert : function(showMsg,okCallBack){
		layer.alert(
				showMsg, 
                {icon: 1 },
                function (index) {
                	layer.close(index);
                	okCallBack && okCallBack();
                });
	},
	fAlert : function(showMsg,okCallBack){
		layer.alert(
				showMsg, 
                {icon: 2 },
                function (index) {
                	layer.close(index);
                	okCallBack && okCallBack();
                });
	},
};
