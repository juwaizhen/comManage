package com.wyl.utils;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StringUtil {

	private static final String UTF8 = "UTF-8";

	private static final String ISO88591 = "ISO-8859-1";


	/**
	 * 去掉obj的空白字符,如果str为null则返回""
	 * */
	public static String getString(String obj) {
		return NullUtil.isNull(obj) ? "" : obj.trim();
	}
	

	/**
	 * 去掉obj的空白字符,如果str为null则返回""
	 * */
	public static String getString(Object obj) {
		return NullUtil.isNull(obj) ? "" : obj.toString().trim();
	}
	
	/**
	 * 
	* @Title: getInt 
	* @Description: obj转化为int,如果为null则返回0;必须为数字格式，否则异常
	* @author wangyl
	* @param obj
	* @return  参数说明 
	* @return int    返回类型 
	* @throws
	 */
	public static int getInt(Object obj) {
		int returnVal = 0;
		String tempStr = "".equals(getString(obj))?"0":getString(obj);
		
		try {
			returnVal = Integer.parseInt(tempStr);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return returnVal;
	}
	
	/**
	 * 获取字符串
	 * @param col
	 * @return String
	 */
	@SuppressWarnings("rawtypes")
	public static String getString(Collection col) {
		StringBuilder sb = new StringBuilder();
		if (null != col && col.size() > 0) {
			for (Object obj : col) {
				sb.append(obj.toString());
			}
		}
		
		return sb.toString();
	}
	
	
//	----------------------------------------------------------------------------------------------------
	/**
	 * 判断传入的数组是否为空
	 * 
	 * @param objs
	 * @return
	 */
	public static boolean isEmpty(Object[] objs) {
		return (objs == null) || (objs.length <= 0);
	}

	/**
	 * @param str
	 *            源字符串默认为ISO-8859-1
	 * @return 返回转换后的UTF-8字符串
	 */
	public static String converISOToUTF8(String str) {
		try {
			return NullUtil.isNull(str) ? null : new String(str
					.getBytes(ISO88591), UTF8);
		} catch (UnsupportedEncodingException e) {
			return "";
		}
	}

	/**
	 * @param str
	 *            源字符串默认为ISO-8859-1
	 * @return 返回转换后的code字符串
	 */
	public static String converISOToCode(String str, String code) {
		if (NullUtil.isNull(str))
			return "";
		try {
			return new String(str.getBytes(ISO88591), code);
		} catch (UnsupportedEncodingException e) {
			return "";
		}
	}

	/**
	 * @param str
	 *            源字符串 code1 源字符编码 code2 目标字符编码
	 * @return 返回转换后的字符串
	 */
	public static String converCode1ToCode1(String str, String code1,
			String code2) {
		if (NullUtil.isNull(str))
			return "";
		try {
			return new String(str.getBytes(code1), code2);
		} catch (UnsupportedEncodingException e) {
			return "";
		}
	}
	
	/**
	 * 返回指定长度的字符,超过该长度的加...结尾
	 * 
	 * @param str
	 *            - 要处理的字符串
	 * @param len
	 *            - 长度
	 * */
	public static String subString(String str, int len) {
		if (NullUtil.isNull(str)) {
			return "";
		}
		if (str.length() > len) {
			return str.substring(0, len) + "...";
		} else {
			return str;
		}
	}
	
	/**
	 * 日期转换字符串
	 * @param date
	 * @return
	 */
	public static String datetoString(Date date) {
		if (NullUtil.isNull(date)) {
			return "";
		}else{
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			String dateString = format.format(date);
			return dateString;
		}
	}
	
	/**
	 * 日期转换字符串
	 */
	public static String dataToTimeStamp(Date date){
		if (NullUtil.isNull(date)) {
			return "";
		}else{
			SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmssSSS");
			String dateString = format.format(date);
			return dateString;
		}
	}
	
	/**
	 * 根据指定的格式将日期转换字符串
	 * @param date
	 * @return
	 */
	public static String datetoString(Date date,String formatStr) {
		if (NullUtil.isNull(date)) {
			return "";
		}else{
			SimpleDateFormat format = new SimpleDateFormat(formatStr);
			String dateString = format.format(date);
			return dateString;
		}
	}
	
	/**
	 * 
	 * 对象转字节
	 * author:hqj
	 * @return
	 */
	public static byte[] toByteArray (Object obj) {      
        byte[] bytes = null;      
        ByteArrayOutputStream bos = new ByteArrayOutputStream();      
        try {        
            ObjectOutputStream oos = new ObjectOutputStream(bos);         
            oos.writeObject(obj);        
            oos.flush();         
            bytes = bos.toByteArray ();      
            oos.close();         
            bos.close();        
        } catch (IOException ex) {        
            ex.printStackTrace();   
        }      
        return bytes;    
    }
	
	/**
	 * 字节转对象
	 * author:hqj
	 * @return
	 */
	public static Object toObject (byte[] bytes) {      
        Object obj = null;      
        try {        
            ByteArrayInputStream bis = new ByteArrayInputStream (bytes);        
            ObjectInputStream ois = new ObjectInputStream (bis);        
            obj = ois.readObject();      
            ois.close();   
            bis.close();   
        } catch (IOException ex) {        
            ex.printStackTrace();   
        } catch (ClassNotFoundException ex) {        
            ex.printStackTrace();   
        }      
        return obj;    
    }
	
	/**
	 * 在驼峰型字符串大写位置之前插入下划线，然后转大写
	 * @author wangyx
	 * @param str
	 * @return
	 */
	public static String strToUpper(String str) {
		StringBuffer sbstr = new StringBuffer(str);
		int j = 0;//插入下划线字符串会变长，记录增加的长度
		for(int i = 0; i < str.length(); i++){
			char c = sbstr.charAt(i + j);
			if (!Character.isLowerCase(c)) {
				sbstr = sbstr.insert(i + j, "_");
				j++;
			}
    	}
		return sbstr.toString().toUpperCase();
	}
	
	/**
	 * 含下划线的大写字符串转驼峰型
	 * @author wangyx
	 * @param str
	 * @return
	 */
	public static String strToLower(String str) {
		StringBuffer sbstr = new StringBuffer(str.toLowerCase());
		int j = 0;//插入下划线字符串会变短，记录缩短的长度
		for(int i = 0; i < str.length(); i++){
			char c = sbstr.charAt(i - j);
			//if(Character.isDigit(c)){
				
				if (c == '_') {
					sbstr = sbstr.deleteCharAt(i - j);
					sbstr.setCharAt(i - j, Character.toUpperCase(sbstr.charAt(i - j)));
					j++;
				}
			//}
    	}
		return sbstr.toString();
	}
	
	/**
	 * Description:判断传入id是否为伪序列
	 * @param id
	 * @return
	 */
	public static boolean checkFakeId(String id) {
		id = StringUtil.getString(id);
		if(id.matches("\\$\\S*\\$")) {
			return true;
		}
		return false;
	}
	
	public static Map listToMap(List<Map<String,Object>> list) {
		Map map = new HashMap();
		if(!NullUtil.isNull(list)){
			for (Map<String,Object> m : list) {
				for(String key :m.keySet()){
					map.put(key, m.get(key));
				}
			} 
		}
		return map;
		
	}
	
	public static final char UNDERLINE = '_';

	public static String camelToUnderline(String param) {
		if (param == null || "".equals(param.trim())) {
			return "";
		}
		int len = param.length();
		StringBuilder sb = new StringBuilder(len);
		for (int i = 0; i < len; i++) {
			char c = param.charAt(i);
			if (Character.isUpperCase(c) && i > 0) {
				sb.append(UNDERLINE);
				sb.append(c);
			} else {
				sb.append(Character.toUpperCase(c));
			}
		}
		return sb.toString();
	}

	public static String underlineToCamel(String param) {
		if (param == null || "".equals(param.trim())) {
			return "";
		}
		int len = param.length();
		StringBuilder sb = new StringBuilder(len);
		for (int i = 0; i < len; i++) {
			char c = param.charAt(i);
			if (c == UNDERLINE) {
				if (++i < len) {
					sb.append(Character.toUpperCase(param.charAt(i)));
				}
			} else {
				sb.append(Character.toLowerCase(c));
			}
		}
		return sb.toString();
	}
	
	public static Map<String, String> convertAttributes( Map<String, Object> attributes) {
	    final Map<String, String> result = new HashMap<String, String>();
	    for (final Map.Entry<String, Object> entry : attributes.entrySet()) {
	        result.put(entry.getKey(), String.valueOf(entry.getValue()));
	    }
	    return result;
	}
	
	public static String  getCycleId(){
		Date currDate = new Date();
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMM");
		return sdf2.format(currDate);
	}



	public static void main(String[] args) {
		
	   
	  /*  String aa ="CUST_ID_CD";
		System.out.println(strToUpper(aa));*/
		//System.out.println("CUST_ID_SS".matches("^[a-z_A-Z]*"));
	    System.out.println(strToLower("1223"));
	    System.out.println(strToUpper("certAddr"));
		/*System.out.println(camelToUnderline("aCustIdZ"));
		System.out.println(camelToUnderline("serviceOfferId"));
		System.out.println(underlineToCamel("CUST_ORDER_ID"));
		System.out.println(datetoString(new Date(), "yyyy-MM-dd HH:mm:ss"));*/
		
	}
}
