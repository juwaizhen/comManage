Util = function(){
	/**当前对象的引用*/
	var temp = this;
	var configCodesList = null;
	
	var laypage = layui.laypage;
	
	//
	this.getConfigCodes = function(colName,tabName,codeType){
		configCodesList = null;
		var para = {"colName":colName,
					"tabName":tabName,
					"codeType":codeType
					}
		$.ajax({
			type:"post",
			url:CONTEXT_PATH+"/common/qryConfigCodes",
			data:para,
			async:false,
			success:function(result){
				if(result.resultCode == "0"){
					configCodesList = result.resultObj;
				}else{
					showMes.fAlert(result.resultMsg);
				}
			},
			error:function(e){
				showMes.fAlert('获取"T_CONFIG_CODES"表数据异常!');
			}
		});
	}
	
	/**
	 * 初始化 config_codes表的下拉框
	 * element 选择器
	 */
	this.initConfigCodesSelect = function(element,colName,tabName,codeType){
		debugger;
		temp.getConfigCodes(colName,tabName,codeType);
		var optionHtml = [];
		optionHtml.push("<option value=''>请选择</option>");
		if(configCodesList.length > 0){
			$.each(configCodesList,function(i,configCodes){
				optionHtml.push("<option value='"+configCodes.code+"'>"+configCodes.codeName+"</option>");
			})
		}
		element.append(optionHtml);
	}
	
	this.buildLayPage = function(elem,count){
		laypage.render({
		    /*elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
		    ,count: 50 //数据总数，从服务端得到
*/		    
			  elem: elem
				    ,count: count
				    ,layout: ['count', 'prev', 'page', 'next', 'limit', 'skip']
		  			,theme: '#1E9FFF'
				    ,jump: function(obj){
				      console.log(obj)
				    }
		  });
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 判断字符串是否为空，如果为空是否需要设置默认值
	 * str 字符串
	 * v 默认值
	 **/
	this.isSetDefault = function (str, v) {
		return temp.isNull(str) ? v : str;
	};
	
	/**--------------------------------设计要求-begin-----------------------*/
	/**密码不能为空，密码为数字，长度限制6位，不能是弱密码*/
	this.pwdValid = function(value){
		var strContinueNum1 = '01234567890';
		var strContinueNum2 = '09876543210';
		if(temp.isNull(value)){showMes.alert("客户密码不能为空！");return false;}
		for(var i=0;i<value.length;i++){
			 var each = value.charAt(i);
			 if (each > '9' || each <'0') {
				 showMes.alertDetail("客户密码只能为数字！");
				 return false;
			}
		}
		var rs = /^1{6,8}|2{6,8}|3{6,8}|4{6,8}|5{6,8}|6{6,8}|7{6,8}|8{6,8}|9{6,8}|0{6,8}$/;
		if(rs.test(value) || strContinueNum1.indexOf(value) >= 0 || strContinueNum2.indexOf(value) >= 0){
			showMes.alert("客户密码过于简单，请重新输入！");
			return false;
		}else{
			return true;
		}
	}
	
	/**身份证格式验证；15位、18位身份格式校验*/
	this.idCardValid = function(certNumber, msg){
		if(temp.isNull(certNumber)){showMes.alert(msg+"证件号码不能为空");return false;}
		var isCard = isIdCardNo(certNumber);
		if (isCard != true) {
			showMes.alert(msg+isCard);
			return false;
		}else{
			return true;
		}
	}
	
	
	/**身份证格式验证；15位、18位身份格式校验*/
	this.checkIdCardValid = function(certNumber,dom){
		if(temp.isNull(certNumber)){
			//showMes.alert("证件不能为空，请核查");
			$(dom).focus();
			showMes.confirm("证件不能为空，请核查",function(){$(dom).focus();});
			return false;
			}
		var isCard = isIdCardNo(certNumber);
		if (isCard != true) {
			$(dom).focus();
			showMes.confirm(isCard,function(){$(dom).focus();});
			//showMes.alert(isCard);
			return false;
		}else{
			return true;
		}
	}
	
	
	
	/**联系人号码必须限制输入数字，且只能输入7位或8位或11,12位号码*/
	this.telValid = function(str, msg){
		if(temp.isNull(str)){showMes.alert(msg+"不能为空");return false;}
		 var re =/(^\d{11,12}$)|(^\d{7,8}$)/; 
		 if (re.test(str)) { 
			 return true; 
		 }else{
			 showMes.alert(msg+"必须限制输入数字，且只能输入7位或8位或11,12位号码");
			 return false; 
		 } 
	};
	
	
	/**联系人号码必须限制输入数字，且只能输入7位或8位或11,12位号码*/
	this.telValid2 = function(str, msg,dom){
		if(temp.isNull(str)){
			//showMes.alert(msg+"不能为空");
			$(dom).focus();
		    showMes.confirm(msg+"不能为空",function(){$(dom).focus();});
			return false;}
		 var re =/(^\d{11,12}$)|(^\d{7,8}$)/; 
		 if (re.test(str)) { 
			 return true; 
		 }else{
			// showMes.alert(msg+"必须限制输入数字，且只能输入7位或8位或11,12位号码");
				$(dom).focus();
			    showMes.confirm(msg+"必须限制输入数字，且只能输入7位或8位或11,12位号码",function(){$(dom).focus();});
			 return false; 
		 } 
	};
	
	
	/**通用名称格式校验（联系人、经办人、责任人）；名称只能为汉字或英文，汉字大于等于2个中文字符，英文至少4个字符*/
	this.nameValid = function(str, msg){
		if(temp.isNull(str)){showMes.alert(msg+"不能为空");return false;}
		if(/^[\u3400-\u9FFF]+$/.test(str)){
			if(str.length<2){
				showMes.alert(msg+"只能为汉字或英文，汉字大于等于2个中文字符，英文至少4个字符");
				return false;
			}else{
				return true;
			}
		}else{
			if(str.length<4){
				showMes.alert(msg+"只能为汉字或英文，汉字大于等于2个中文字符，英文至少4个字符");
				return false;
			}else{
				return true;
			}
		}
	}
	
	/**通用名称格式校验（联系人、经办人、责任人）；名称只能为汉字或英文，汉字大于等于2个中文字符，英文至少4个字符*/
	this.nameValid2 = function(str, msg,dom){
		if(temp.isNull(str)){
			//showMes.alert(msg+"不能为空");
			$(dom).focus();
			showMes.confirm(msg+"不能为空",function(){$(dom).focus();});
			return false;
		}
		if(/^[\u3400-\u9FFF]+$/.test(str)){
			if(str.length<2){
				//showMes.alert(msg+"只能为汉字或英文，汉字大于等于2个中文字符，英文至少4个字符");
				$(dom).focus();
				showMes.confirm(msg+"只能为汉字或英文，汉字大于等于2个中文字符，英文至少4个字符",function(){$(dom).focus();});
				return false;
			}else{
				return true;
			}
		}else{
			if(str.length<4){
				//showMes.alert(msg+"只能为汉字或英文，汉字大于等于2个中文字符，英文至少4个字符");
				$(dom).focus();
				showMes.confirm(msg+"只能为汉字或英文，汉字大于等于2个中文字符，英文至少4个字符",function(){$(dom).focus();});
				return false;
			}else{
				return true;
			}
		}
	}
	
	
	/**
	 * 客户名称格式校验；支持传入名称、类型（可不传，默认不传或传1代表个人证件名称校验、2 代表单位证件证件名称校验）
	 * 个人证件证件名称：当含中文时，限制大于等于2个汉字，含英文大于等于4个字符。支持新疆人名称中间带点，如阿万蒂•麦麦提，支持特殊汉字输入，如颸
	 * 单位证件证件名称：不为空，且大于等于10个字符，不能全为数字
	 * 入参格式{?:?,?:?......}
	 */
	this.certNameValid = function(options,msg){
		debugger
		var certName = options.certName;
		if(temp.isNull(certName)){
			showMes.alert(msg+"名称不能为空");
			return false;
			}
		var certType = options.certType;
		if (certType == undefined) certType='1';
		if(certType == '2'){//2代表单位证件证件名称校验
			if(/^([a-zA-Z\u3400-\u9FFF\（\）\(\)][a-zA-Z0-9\u3400-\u9FFF\（\）\(\)]*){5,}$/.test(certName)){
				return true;
			}else{
				showMes.alert(msg+"名称必须大于等于10个字符，不能全为数字");
				return false;
			}
		}else{//1代表个人证件名称校验
			if(/(^[\u3400-\u9FFF]+([\u3400-\u9FFF]|·|•)+$)|(^[a-zA-Z]{4,}[.·]*[a-zA-Z]*[.·]*[a-zA-Z]*$)/.test(certName)){
				return true;
			}else{
				showMes.alert(msg+"名称只能为汉字或英文，汉字大于等于2个中文字符，英文至少4个字符");
				return false;
			}
		}
	}
	
	
	this.certNameValid2 = function(options,msg,dom){
		debugger
		var certName = options.certName;
		if(temp.isNull(certName)){
			//showMes.alert(msg+"名称不能为空");
			$(dom).focus();
			showMes.confirm(msg+"名称不能为空",function(){$(dom).focus();});
			return false;
			}
		var certType = options.certType;
		if (certType == undefined) certType='1';
		if(certType == '2'){//2代表单位证件证件名称校验
			if(/^([a-zA-Z\u3400-\u9FFF\（\）\(\)][a-zA-Z0-9\u3400-\u9FFF\（\）\(\)]*){5,}$/.test(certName)){
				return true;
			}else{
				//showMes.alert(msg+"名称必须大于等于10个字符，不能全为数字");
				$(dom).focus();
				showMes.confirm(msg+"名称必须大于等于10个字符，不能全为数字",function(){$(dom).focus();});
				return false;
			}
		}else{//1代表个人证件名称校验
			if(/(^[\u3400-\u9FFF]+([\u3400-\u9FFF]|·|•)+$)|(^[a-zA-Z]{4,}[.·]*[a-zA-Z]*[.·]*[a-zA-Z]*$)/.test(certName)){
				return true;
			}else{
				//showMes.alert(msg+"名称只能为汉字或英文，汉字大于等于2个中文字符，英文至少4个字符");
				$(dom).focus();
				showMes.confirm(msg+"名称只能为汉字或英文，汉字大于等于2个中文字符，英文至少4个字符",function(){$(dom).focus();});
				return false;
			}
		}
	}
	
	
	
	this.certAddrValid = function(str, msg){
		if(temp.isNull(str)){showMes.alert(msg+"不能为空");return false;}
		if(/^[^0-9].{1,}$/.test(str)){
			if(temp.getBytesLength(str) < 12){
				showMes.alert(msg+"不少于12个字符(6个汉字)，不能为全数字，不能数字开头");
				return false;
			}else{
				return true;
			}
		}else{
			showMes.alert(msg+"不少于12个字符(6个汉字)，不能为全数字，不能数字开头");
			return false;
		}
	}
	
	
	this.certAddrValid2 = function(str, msg,dom){
		if(temp.isNull(str)){
			//showMes.alert(msg+"不能为空");
			$(dom).focus();
			showMes.confirm(msg+"不能为空",function(){$(dom).focus();});
			return false;
			}
		if(/^[^0-9].{1,}$/.test(str)){
			if(temp.getBytesLength(str) < 12){
				//showMes.alert(msg+"不少于12个字符(6个汉字)，不能为全数字，不能数字开头");
				$(dom).focus();
				showMes.confirm(msg+"不少于12个字符(6个汉字)，不能为全数字，不能数字开头",function(){$(dom).focus();});
				return false;
			}else{
				return true;
			}
		}else{
			//showMes.alert(msg+"不少于12个字符(6个汉字)，不能为全数字，不能数字开头");
			$(dom).focus();
			showMes.confirm(msg+"不少于12个字符(6个汉字)，不能为全数字，不能数字开头",function(){$(dom).focus();});
			return false;
		}
	}
	
	
	/**
	 * 证件类型、证件号码、客户入网时间【certObj.certType（默认不传为身份证）、certObj.certNum、certObj.enterDate】
	 */
	this.certNumValid = function(options,msg){
		debugger;
		var certType = options.certType;//证件类型
		if (certType == undefined) certType='1';
		var certNum = options.certNum;//证件号码
		// 获取国家或地区代码   add==wangqinghua
		var countryCode = options.countryCode;
		
		var enterDate = options.enterDate;//入网时间
		if (enterDate != undefined){
			enterDate = new Date(enterDate).format('yyyy-MM-dd');
		}
		if(util.isNull(certNum)){
			showMes.alert(msg+"证件号码不能为空！");
			return false;
		}
		
		var starDate = new Date("2016-07-01").format('yyyy-MM-dd');
		//2-军人身份证、22-武装警察身份证件、31-港澳居民来往内地通行证、32-台湾居民来往大陆通行证
		//3-外国公民护照、6-营业执照、33-事业单位法人证书、34-社会团体法人登记证书
		//7-单位介绍信和公函、15-组织机构代码、49-统一社会信用代码
		switch (certType) {
		case '1'://身份证
			if(temp.idCardValid(certNum)){
				return true;
			}else{
				return false;
			};
			break;
		case '2': // 军人身份证
			var certNumFirst = certNum.substring(0,1);
			var realCertNum = certNum.substring(3,certNum.length-1);
			if (enterDate != undefined){
				if(enterDate<starDate){//2016年7月1日之前：证件号码必须含6-8位数字
					if(/^(\d{6,8})$/.test(certNum)){
						return true;
					}else{
						showMes.alert(msg+"入网时间为2016年7月1日之前：证件号码必须含6-8位数字");
						return false;
					}
				}else{//入网时间为2016年7月1日以后：证件号码格式为“X字第Y号”，当“X=军”时，Y为7位数字；“X=兵、士、文、职”时，Y为7-12位由阿拉伯数字或英文字母组成
					if(certNumFirst == "军"){
						if(/^(\d{7})$/.test(realCertNum)){
							return true;
						}else{
							showMes.alert(msg+"证件号码必须为7位数字；");
							return false;
						}
					}else{
						if(/^([a-zA-Z\d]){7,12}$/.test(realCertNum)){
							return true;
						}else{
							showMes.alert(msg+"证件号码必须是7-12位阿拉伯数字或英文字母");
							return false;
						}
					}
				}
			}else{//客户入网时间为空,证件号码格式为“X字第Y号”，当“X=军”时，Y为7位数字；“X=兵、士、文、职”时，Y为7-12位由阿拉伯数字或英文字母组成
				if(certNumFirst == "军"){
					if(/^(\d{7})$/.test(realCertNum)){
						return true;
					}else{
						showMes.alert(msg+"证件号码必须为7位数字；");
						return false;
					}
				}else{
					if(/^([a-zA-Z\d]){7,12}$/.test(realCertNum)){
						return true;
					}else{
						showMes.alert(msg+"证件号码必须是7-12位阿拉伯数字或英文字母");
						return false;
					}
				}
			}
			break;
		case '22': // 武装警察身份证件
			var certNumFirst = certNum.substring(0,1);
			var realCertNum = certNum.substring(3,certNum.length-1);
			if (enterDate != undefined){
				if(enterDate<starDate){//2016年7月1日之前：证件号码必须含6-8位数字
					if(/^(\d{5,})$/.test(certNum)){
						return true;
					}else{
						showMes.alert(msg+"入网时间为2016年7月1日之前：证件号码必须含大于等于5位数字");
						return false;
					}
				}else{//客户入网时间为2016年7月1日以后：证件号码格式为“X字第Y号”；当“X=武”时，Y 为7位数字；“X=兵、士、文、职”时，Y为7-12位阿拉伯数字和英文字母组成
					if(certNumFirst == "武"){
						if(/^(\d{7})$/.test(realCertNum)){
							return true;
						}else{
							showMes.alert(msg+"证件号码必须是7位数字；");
							return false;
						}
					}else{
						if(/^([a-zA-Z\d]){7,12}$/.test(realCertNum)){
							return true;
						}else{
							showMes.alert(msg+"证件号码格必须是7-12位由阿拉伯数字或英文字母");
							return false;
						}
					}
				}
			}else{//客户入网时间为空：证件号码格式为“X字第Y号”；当“X=武”时，Y 为7位数字；“X=兵、士、文、职”时，Y为7-12位阿拉伯数字和英文字母组成
				if(certNumFirst == "武"){
					if(/^(\d{7})$/.test(realCertNum)){
						return true;
					}else{
						showMes.alert(msg+"证件号码必须是7位数字；");
						return false;
					}
				}else{
					if(/^([a-zA-Z\d]){7,12}$/.test(realCertNum)){
						return true;
					}else{
						showMes.alert(msg+"证件号码格必须是7-12位由阿拉伯数字或英文字母");
						return false;
					}
				}
			}
			break;
		case '31': // 港澳居民来往内地通行证
			 var realCertNum = certNum.substring(1);
 			 var res =/^\d{9,}$/; 
			 if (res.test(realCertNum)) { 
				 return true; 
			 }else{
				 showMes.alert(msg+"证件号码全部为数字，且长度必须大于等于9个字符");
				 return false; 
			 } 
			break;
		case '32': //台湾居民来往大陆通行证
			var res =/^\d{8,}$/; 
			 if (res.test(certNum)) { 
				 return true; 
			 }else{
				 showMes.alert(msg+"证件号码由阿拉伯数字组成，长度必须大于等于8个字符");
				 return false; 
			 } 
			break;
		case '3': // 外国公民护照
//			 var realCertNum = certNum.substring(3);
//			 var res = /^[a-zA-Z0-9]{5,}$/;
//			 if(res.test(realCertNum)){
//				 return true; 
//			 }else{
//				 showMes.alert(msg+"证件号码大于等于5个字符且由阿拉伯数字和英文字母组成");
//				 return false;
//			 }
			// 存在国家代码、校验规则修改     update==wangqinghua
			if(countryCode!=""){
				if(/^[A-Z]{3}$/.test(countryCode)){
					var res =/^[a-zA-Z0-9]{5,}$/; 
					if(res.test(certNum)){
						certNum=countryCode+certNum;
						return true; 
					}else{
						showMes.alert("证件号码大于等于5个字符且由阿拉伯数字和英文字母组成");
						return false;
					}
				}else{
					showMes.alert("证件号码的国家代码由3位大写英文字母组成");
					return false;
				}
			}
			
			break;
		case '6': //营业执照
			if(/^(\d{15}|[A-Z0-9]{18})$/.test(certNum)){
				 return true; 
			}else{
				showMes.alert(msg+"证件号码为15位或18位, 位长15位由阿拉伯数字组成，位长18位由阿拉伯数字或大写英文字母组成");
				return false;
			}
			break;
		case '33': //事业单位法人证书
			if(/^(\d{12}|[A-Z0-9]{18})$/.test(certNum)){
				 return true; 
			}else{
				showMes.alert(msg+"证件号码为12位或18位, 位长12位由阿拉伯数字组成，位长18位由阿拉伯数字或大写英文字母组成");
				return false;
			}
			break;
		case '34': // 社会团体法人登记证书
			if(/^[a-zA-Z0-9\u3400-\u9FFF]{9,18}$/.test(certNum)){
				 return true; 
			}else{
				showMes.alert(msg+"证件号码为9-18位，由汉字、大写英文字母或数字组成，不可全为汉字或全为英文字母");
				return false;
			}
			break;
		case '15': // 组织机构代码
			if(/^[A-Z0-9]{9,18}$/.test(certNum)){
				 return true; 
			}else{
				showMes.alert(msg+"证件号码为9位或18位，由阿拉伯数字或大写英文字母组成");
				return false;
			}
			break;
		case '49': //统一社会信用代码
			if(/^[A-Z0-9]{18}$/.test(certNum)){
				 return true; 
			}else{
				showMes.alert(msg+"证件号码为18位，由阿拉伯数字或大写英文字母组成");
				return false;
			}
			break;
		case '50': // 外国人永久居留身份证码	add==wangqinghua
			// 存在国家代码
			if(countryCode!=""){
				if(/^[A-Z]{3}$/.test(countryCode)){
					var res =/^\d{5,}$/; 
					if(res.test(certNum)){
						certNum=countryCode+certNum;
						return true; 
					}else{
						showMes.alert("证件号码由大于等于5个字符的阿拉伯数字组成");
						return false;
					}
				}else{
					showMes.alert("证件号码的国家代码由3位大写英文字母组成");
					return false;
				}
			}
			break;	
		default:
			return true;
			break;
		}
	}
	
	/**--------------------------------设计要求-end-----------------------*/
	
	/**
	* 判断是否为空
	* param str 字符串
	* return boolean true为空
	*/
//	this.isNull = function (str) {
//		//如果str为boolean类型，将不支持后面的replace方法。
//		if(typeof (str) == "boolean"){
//			return false;
//		}
//		return (null == str || typeof (str) == "undefined" || str == "undefined" || ( typeof (str) == "string" && str.replace(/(^\s*)|(\s*$)/g, "") == ""));
//	};
	
	/**判空*/
	this.isNull = function(obj) {
		//如果obj为boolean类型则直接返回不为空，因为在js中能识别出来为boolean类型则肯定有值
		if(typeof (obj) == "boolean"){
			return false;
		}
		if(typeof(obj) == 'array' && obj.length>0){
			return false;
		}
		if(typeof(obj) == 'object'){
			var i=0;
			for(var item in obj){ 
				i++;
			}
			if(i>0){
				return false;
			}
		}
		if(null != obj && typeof(obj) != 'undefined' && '' != obj && obj != 'undefined' && obj != 'null' && JSON.stringify(obj) != "{}" ){
			return false;
		}
		return true;
	};
	/**
	 * 如果传入对象为空则返回"",否则原样返回
	 * @param obj 要判断的对象
	 */
	this.nullToStr = function(obj){
		if(temp.isNull(obj)){
			return "";
		}else{
			return obj;
		}
	};
	/**
	 * 值为空就返回空
	 */
	this.setValue = function(str){
		var value = "";
		if(temp.isNotNull(str)){
			value = str;
		}
		return value;
	}
	
	/**
	 * 判断正整数
	 */
	this.isPositiveInteger=function(value) {
		var re = /^[1-9]+[0-9]*]*$/;
		if (!re.test(value)) {
			return true;
		}
		return false;
	};
	/**
	 * 添加方法 增加代码的可读性
	 */
	this.isNotNull = function (str) {
		return !this.isNull(str);
	};
	/**
	 * @see  将json字符串转换为对象
	 * @param   json字符串
	 * @return 返回object,array,string等对象
	*/
	this.toObj = function (strJson) {
		return eval( "(" + strJson + ")");
	};
	
	/**
	 * 证件号码验证
	 */
	this.isCertNumber = function(v){
		var res = /^[A-Za-z0-9]{4,}$/;
		if (!res.test(v)) {
			return false;
		}
		return true;
	};
	
	/**
	 * 证件号码验证
	 */
	this.isEmailNumber = function(v){
		var res = /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;
		if (!res.test(v)) {
			return false;
		}
		return true;
	};
	
	
	/**
	 * 判断是否是电信手机
	 */
	this.isMobileNum = function(obj) {
		var res = /^(13|15|18|17)+[0-9]{9}$/;
		if (!res.test(obj)) {
			return false;
		}
		return true;
	};
	
	/**
	 * 判断是否是手机号码
	 */
	this.isMobileTelephone = function(obj) {
		var res = /^(1)+[0-9]{10}$/;
		if (!res.test(obj)) {
			return false;
		}
		return true;
	};
	
	/**
	 * 判断是否是宽带号码
	 */
	this.isWideNumber = function(obj){
		debugger;
		var str1 = obj.substring(0,4);
		var str2 = obj.substring(0,3);
		if("ADS"==str2||"KDYX"==str1||"IPTV"==str1){
			return true;
		}
		return false;
	}
	
	/**
	 * 判断是否是数字
	 */
	this.isDigital = function(obj) {
		var res = /^[0-9]*$/;
		if (!res.test(obj)) {
			return false;
		}
		return true;
	};
	
	
	/**亲情号码*/
	this.checkFamilyTel = function(str){
		 var re =/(^\d{11,12}$)|(^\d{7,8}$)/; 
		 if (re.test(str)) { 
			 return true; 
		 }else{ 
			 return false; 
		 }	
	};
	/**检查只有26个字母
	 * 返回值：0：含有 1：全部为字母
	*/
	this.checkIsChar = function(str){
		var strSource = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var ch;
		var i;
		var temp;
		for (i = 0; i <= (str.length - 1); i++) {
			ch = str.charAt(i);
			temp = strSource.indexOf(ch);
			if (temp == -1) {
				return 0;
			}
		}
		
		return 1;
	};
	
	/**验证是否是中文*/
	this.checkIsChina = function(str, len) {
		var flag = true;
		var _len = str.length;
		// 是否只是中文
		var s = str.replace(/[^\u3400-\u9FFF]/g,'');;
		if (str != s) {
			flag = false;
		} else {
			if (!temp.isNull(len) && _len < len) {
				flag = false;
			}
		}
		
		return flag;
	};
	

	/**
	 * 得到字符串的字符长度（一个汉字占两个字符长） 将验证的函数改成128以类的为单字符。避免“·”符号
	 */
	this.getBytesLength = function(str) {
		var i;
		var sum = 0;
		if(!temp.isNull(str)){
			for (i = 0; i < str.length; i++) {
				if ((str.charCodeAt(i) >= 0) && (str.charCodeAt(i) <= 128)) {
					sum = sum + 1;
				} else {
					sum = sum + 2;
				}
			}
		}
		return sum;
	};

    /**
     * 获取当前浏览器的url
     */
	this.getCurrentUrl = function(isNeedParam) {
	    var url = window.location.href;
	    if(url == null || url == undefined) return '';
	    if(!isNeedParam){
	    	return url.split('?')[0];
	    }
	    return url;
    };
    
    /**获取6位的随机数*/
    this.get6Random = function() {
    	var x = 999999;
		var y = 100000;
		return  parseInt(Math.random() * (x - y + 1) + y);
    };
    
   /**截取字符串，中英文都能用  
    *如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。  
    *字符串，长度  
   */
   this.cutstr = function(str, len) {  
	   if (str == null || str == "") {
		   return "";
	   }
	  	var str_length = 0;  
	  	var str_len = 0;  
	  	str_cut = new String();  
	  	str_len = str.length;  
	      for(var i = 0;i<str_len;i++){  
	      	a = str.charAt(i);  
	          str_length++;  
	          if(escape(a).length > 4){  
	           //中文字符的长度经编码之后大于4  
	          	str_length++;  
	          }  
	          str_cut = str_cut.concat(a);  
	          if(str_length>=len){  
	          	str_cut = str_cut.concat("...");  
	           return str_cut;  
	          }  
	      }  
	      //如果给定字符串小于指定长度，则返回源字符串；  
	      if(str_length<len){  
	      	return  str;  
	      }  
   }; 
   
   /**日期格式截取yyyy-mm-dd*/
   this.formatDate = function(str){
	   var date = " ";
	   if (str != null && str != "") {
		   date = str.substr(0, 10);
	   }
	   
	   return date;
   };
	
   this.replaceAll = function(str,sptr,sptr1){
	   while (str.indexOf(sptr) >= 0){
           str = str.replace(sptr,sptr1);
        }
        return str;
   }
	/**
	 * 获取URL中参数的名称
	 */
	this.getUrlParamValue = function(paramKey){
	    var url = window.location.href;  
	    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");  
	    var paraObj = {};
	    for (i = 0; j = paraString[i]; i++) {  
	        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);  
	    }  
	    var returnValue = paraObj[paramKey.toLowerCase()];  
	    if (typeof (returnValue) == "undefined") {  
	        return "";  
	    } else {  
	        return returnValue;  
	    }  
	};
	
	/**获取路径参数*/
	this.getUrlParam = function(url,param){
		debugger;
		var reg = new RegExp("(^|&)"+ param +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var params = url.substring(url.indexOf("?")+1, url.length);
		var r = params.match(reg);  //匹配目标参数
		if (r!=null) return unescape(r[2]); return null; //返回参数值
	};
	
	
	this.getCurentDate=function() {
		var now = new Date();
		var year = now.getFullYear(); // 年
		var month = now.getMonth() + 1; // 月
		var day = now.getDate(); // 日
		
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day + " ";
		return (clock);
	} ;
	
	/*this.getLoginDomainUrl=function(){
		debugger;
		if(sessionStorage.loginDomainUrl){
			return sessionStorage.loginDomainUrl;
		}
		var param = {
				"configKey" : "com.tydic.framework.saleWeb.auth"
		};
		var loginDomainUrl="";//http://134.64.110.44:3002/Auth
		em.ajax(URL_GET_SYS_CONFIG_FILE, function(data){
			sessionStorage.loginDomainUrl = data['configValue'];
		}, param,false,null,null,10000);
		return sessionStorage.loginDomainUrl;
	};*/
	
	/**数组去重
	 * List:需要过滤的数组
	 * keySet：过滤数组所产参考的属性（必传）
	 * */
	this.filterRepeat = function(List,keySet) {
		var addList = [];
		if (List == null || List.length <= 0) {
			return addList;
		}
		if (temp.isNull(keySet)) {
			return List.concat();
		}
		var optionMap = new Map();
		$.each(List, function(i, data) {
			var key = data[keySet];
			optionMap.put(key, data);
		});
		addList = optionMap.getMapObjs();
		return addList;
	};
	
	
	//TODO 根据key获取cookie的value
	this.getCookieByKey=function(key){
		var cookie=document.cookie;//获取cookie
		var value="";//返回值
		key=key+"=";
		var start=cookie.indexOf(key);
		if(start!=-1){
			start+=key.length;
			var end=cookie.indexOf(";",start);
			if(end==-1){
				end=cookie.length;
			}
			value=cookie.substring(start,end);
		}
		return value;
	};
	
	this.getQueryString = function(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
    };
    
	/** 浮点数相加 */
	this.floatAdd = function(arg1, arg2){   
		var r1, r2, m;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		
		return ((arg1 * m + arg2 * m) / m ).toFixed(2);  
	};
	
	/** 浮点数相减 */	
	this.floatSub = function(arg1, arg2) {
		var r1, r2, m;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		
		return ((arg1 * m - arg2 * m) / m).toFixed(2);
	};
	
	//获取AddDayCount天后的日期
	this.GetDateStr= function(AddDayCount) { 
		var dd = new Date(); 
		dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
		var y = dd.getFullYear(); 
		var m = dd.getMonth()+1;//获取当前月份的日期 
		var d = dd.getDate(); 
		if(m < 10){
			m="0"+m;
		}
		if(d<10){
			d="0"+d;
		}
		return y+"-"+m+"-"+d; 
	}; 
	
	//获取当前日期前一个月日期
	this.getPreMonth = function(monthCount){
		var now=new Date();
		new Date(now.setMonth((new Date().getMonth()-monthCount)));
		var clock= now.format("yyyy-MM-dd");
		return (clock);
	};
	
	/**
	 * @see 将javascript数据类型转换为json字符串
	 * @param 待转换对象,支持object,array,string,function,number,boolean,regexp
	 * @return 返回json字符串
	*/
	this.toJSON = function (object) {
		var type = typeof object;
		if ('object' == type) {
			if (Array == object.constructor)
				type = 'array';
			else if (RegExp == object.constructor)
				type = 'regexp';
			else
				type = 'object';
		}
		switch (type) {
			case 'undefined':
			case 'unknown': 
				return;
				break;
			case 'function':
			case 'boolean':
			case 'regexp':
				return object.toString();
				break;
			case 'number':
				return isFinite(object) ? object.toString() : 'null';
				break;
			case 'string':
				return '"' + object.replace(/(\\|\")/g,"\\$1").replace(/\n|\r|\t/g,
				function () {   
					var a = arguments[0];                   
					return  (a == '\n') ? '\\n':   
							(a == '\r') ? '\\r':   
							(a == '\t') ? '\\t': ""
							}) + '"';
					break;
			case 'object':
				if (object === null) return 'null';
				var results = [];
				for (var property in object) {
					var value = temp.toJSON(object[property]);
					if (value !== undefined)
						results.push(temp.toJSON(property) + ':' + value);
				}
				return '{' + results.join(',') + '}';
				break;
			case 'array':
				var results = [];
				for(var i = 0; i < object.length; i++) {
					var value = temp.toJSON(object[i]);
					if (value !== undefined) results.push(value);
				}
				return '[' + results.join(',') + ']';
				break;
		}
	};
	
	//如果名称中带有空格（如“吴 海”或“吴海”等），需将空格自动替换为空。如果名称中有中文括号（“（）”）、中括号（“【】”）时，自动转换为英文的括号"()"和中括号"[]" 
	this.trimName = function(str){
		var result = str.replace(/\s/g,'').replace(/\【(.*)\】/g,"[$1]").replace(/\（(.*)\）/g,"($1)");
		return result;
	};
	
	/**
	 * 对tab的操作
	 * 新打开一页
	 */
	this.tab = {
		/**
		 * 最多有多少个tab
		 */
		maxLiNum : 12,
		/**
		 * 获取随机数
		 * @param length 随机数位数
		 */
		getRandom : function(length){
			var result ="";
			for(var i= 0; i < length; i++){
				result += Math.floor(Math.random()*10);
		    }
			return result;
		},
		/**
		 * 新增tab
		 * @param tabParam 新增tab要传递的参数
		 * tabParam = {
		 * 		name:"新增tab的标题",
		 * 		url:"新增tab加载的页面路径",
		 * 		param："要传递的参数"
		 * }
		 */
		addTable :function(tabParam){
			var temp = this;
			// STEP-1 获取父页面操作对象
			var parentPanel = parent.parent.indexMenu;
	        // STEP-2 判断tab的数目是否达到上限
	        if(parentPanel.panelFrame.getLiLength() >= temp.maxLiNum) {
	        	// STEP-3.1 tab的数目达到上限提示并结束不弹出
	            art.dialog.message('warning',"已超过"+ temp.maxLiNum +"个标签页",null);
	        }else {
//	        	//此处是以长度作为 tab的id
//	        	var liDataLength = parentPanel.panelFrame.getLiDataLength();
//	        	var frameIndex = liDataLength == 0 ? 0 : liDataLength ;//看不懂这里的逻辑，等于0 返回0，不等于0返回自己。先注释
	        	// STEP-3.2 tab的数目未达到上限，获取iframe的id
	        	var frameIndex = temp.getRandom(10);//获取随机数，parentPanel.setMainFrmLayout已经拼接了"mainFrm"所以不能传iframeId，只能传frameIndex
	        	var iframeId = "mainFrm"+frameIndex;
	        	//tabParam.url+=('?t='+(new Date()).getTime());
	            // STEP-4 新增tab
	            parentPanel.mainDiv.append('<iframe src="'+ tabParam.url +'" id="'+ iframeId +'" name="'+ iframeId +'" frameborder="0" scrolling="auto" style="display: none;"></iframe>');
	            // STEP-5 为新增的tab加上样式
	            parentPanel.setMainFrmLayout(frameIndex);//因为该方法中已经拼接了"mainFrm" 所以不能传iframeId，只能传frameIndex
	            // STEP-6 获取新增的tab对象，并传递参数
	            var childFrameObj = parentPanel.mainDiv.find("#"+iframeId)[0];//因为 .find用的是jq封装的返回的是list，所以要取下表为0的才和原生js获取的js对象一样
				childFrameObj.contentWindow.paramFromParent = tabParam.param;// 将参数传递到另一个tab中
	            // STEP-7 添加到panel table 中
				var panelIndex = parentPanel.panelFrame.addLiFun({
	                title : tabParam.name ,
	                content : parentPanel.mainDiv.find("#"+iframeId),
	                url : tabParam.url ,
	                closeable : true
	            });
	            // STEP-8 展示这个刚刚添加的tab
	            temp.showTable(panelIndex);
	            // STEP-9 将panelIndex和iframeId保存到tabParam中
	            tabParam["panelIndex"] = panelIndex;
	            tabParam["iframeId"] = iframeId;
	        }
	        return tabParam;//返回，可接收可不接受
		},
		/**
		 * 展示tab
		 * @param panelIndex 要展示的tab的索引
		 */
		showTable : function(panelIndex){
			// STEP-1 获取父页面操作对象
			var parentPanel = parent.parent.indexMenu;
			// STEP-2 展示这个刚刚添加的panel page
            parentPanel.panelFrame.showLiFun(panelIndex);
		},
		/**
		 * 删除tab 
		 * @param name 要删除的tab的name
		 */
		deleteTable : function(name){
			// STEP-1 获取父页面操作对象
			var parentPanel = parent.parent.indexMenu;
			// STEP-2 删除这个tab
	        parentPanel.panelFrame.deleteLiFun(name);
		},
		/**
		 * 新增iframe
		 * @param iframeParam 新增iframe要传递的参数
		 * tabParam = {
		 * 		type:"类型", type="new" 表示新建个iframe,type="had" 表示已有iframe
		 * 		selector:"在此元素对象中增加iframe",
		 * 		url:"新增tab加载的页面路径",
		 * 		param："要传递的参数"
		 * }
		 */
		addIframe :function(iframeParam){
			var temp = this;
			// STEP-1 获取操作对象
			var obj = iframeParam.selector;
	        // STEP-2 获取iframeId
	        var iframeId = temp.getRandom(10);
	        // STEP-3 新增iframe
	        obj.html('<iframe src="'+ iframeParam.url +'" id="'+ iframeId +'" name="'+ iframeId +'" width="100%" height="100%" scrolling="no" frameborder="0"></iframe>');
	        // STEP-4 获取新增的iframe对象，并传递参数
	        var childFrameObj = obj.find("#"+iframeId)[0];//因为 .find用的是jq封装的返回的是list，所以要取下表为0的才和原生js获取的js对象一样
			childFrameObj.contentWindow.paramFromParent = iframeParam.param;// 将参数传递到另一个iframe中
	        // STEP-5 展示这个刚刚添加的iframe
			obj.show();
	        // STEP-6 将iframeId保存到iframeParam中
	        iframeParam["iframeId"] = iframeId;
	        return iframeParam;//返回，可接收可不接受
		}
	};
	
	this.getFormateDate = function(strDate){
		var retDate = "";
	    if ( util.isNull(strDate) )
	    	return "";
	    for (var i = 0; i < strDate.length; i++) {
	    	retDate += strDate[i] ;
	    	if( i == 3 || i == 5 ){
	    		retDate += "-";
	    	}else if( i == 7 ){
	    		retDate += " ";
	    	}else if( i == 9 || i == 11 ){
	    		retDate += ":";
	    	}
	    }
	    return retDate;
	}
	
};

//对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.format = function(fmt){ 
var o = {   
 "M+" : this.getMonth()+1,                 //月份   
 "d+" : this.getDate(),                    //日   
 "h+" : this.getHours(),                   //小时   
 "m+" : this.getMinutes(),                 //分   
 "s+" : this.getSeconds(),                 //秒   
 "q+" : Math.floor((this.getMonth()+3)/3), //季度   
 "S"  : this.getMilliseconds()             //毫秒   
};   
if(/(y+)/.test(fmt))   
 fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
for(var k in o)   
 if(new RegExp("("+ k +")").test(fmt))   
fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
return fmt;   
}  

var util = new Util();

