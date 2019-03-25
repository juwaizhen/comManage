package com.wyl.utils;


import java.io.Serializable;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

 
public class NullUtil implements Serializable {

	private static final long serialVersionUID = -615352315797559236L;

	/**
	 * 判断该对象是否为空<br/>
	 * 目前支持Object、String、Map、Collection、Integer(0为空)类型判断
	 * @param obj 对象
	 * @return 判断是否为null或""为集合长度为0返回true,否则返回false
	 */
	@SuppressWarnings("rawtypes")
	public static boolean isNull(Object obj) {
		if (null == obj) {
			return true;
		} else if (obj instanceof String) {
			return "".equals(obj) || "null".equals(obj);
		} else if (obj instanceof Collection) {
			return ((Collection) obj).size() == 0;
		} else if (obj instanceof Map) {
			return ((Map) obj).size() == 0;
		}

		return false;
	}
	
	/**
	 * 判断该对象是否为空<br/>
	 * 目前支持Object、String、Map、Collection、Integer(0为空)类型判断
	 * @param obj 对象
	 * @return 判断是否为null或""为集合长度为0返回true,否则返回false
	 */
	public static boolean isNotNull(Object obj) {
		return !isNull(obj);
	}
	
	@SuppressWarnings("rawtypes")
	public static boolean isNull(Map params, String key) {
		if (isNull(params)) {
			return true;
		}
		if (params.containsKey(key)) {
			return isNull(params.get(key));
		}
		return true;
	}
	
	/**
	 * 是否为空(判断值是否为空)
	 * @param list
	 * @return boolean
	 */
	@SuppressWarnings("rawtypes")
	public static boolean isNullValue(Collection<?> obj) {
		int count = 0;
		if (!NullUtil.isNull(obj)) {
			for (Iterator it = obj.iterator(); it.hasNext();) {
				if (NullUtil.isNull(it.next())) {
					count++;
				}
			}
		}
		return count >= obj.size();
	}
}
