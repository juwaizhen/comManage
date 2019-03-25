package com.wyl.utils;

import java.util.Properties;

public class Constant {
	public static Properties prop = new InitPropertiesLoader().getProperties("/param.properties");

	public static String LOG_ACTION = prop.getProperty("param.operLog.operAction").trim();
	public static String LOG_SWITCH = prop.getProperty("param.operLog.switch").trim();
	
//	短信模板
//	public static String SMS_TEMP_AQZDJK = prop.getProperty("sms_temp_aqzdjk").trim();		//安全终端监控
//	public static String SMS_TEMP_AQZDXT = prop.getProperty("sms_temp_aqzdxt").trim();		//安全终端心跳
//	public static String SMS_TEMP_ZDKCTX = prop.getProperty("sms_temp_zdkctx").trim();		//最低库存提醒
//	public static String SMS_TEMP_SQTXLY = prop.getProperty("sms_temp_sqtxly").trim();		//申请提醒领用
//	public static String SMS_TEMP_WZBYTX = prop.getProperty("sms_temp_wzbytx").trim();		//物资保养提醒
//	public static String SMS_TEMP_WZGHTX = prop.getProperty("sms_temp_wzghtx").trim();		//物资归还提醒
}
