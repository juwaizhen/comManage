package com.wyl.utils;


import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
/*import com.google.common.reflect.TypeToken;*/
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import com.google.gson.internal.LinkedTreeMap;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;




public class GsonUtil {

	/**
	 * 使用默认的gson对象进行反序列化
	 * 
	 * @param json
	 * @param typeToken
	 * @return
	 */
	public static <T> T fromJsonDefault(String json, Class<T> t) {
		Gson gson = new Gson();
		return gson.fromJson(json, t);
	}

	/**
	 * json字符串转list或者map
	 * 
	 * @param json
	 * @param type
	 * @return
	 */
	/*public static <T> T fromJson(String json, Type type) {

		Gson gson = new GsonBuilder()
		*//**
		 * 重写map的反序列化
		 *//*
		.registerTypeAdapter(new TypeToken<Map<String, Object>>() {
		}.getType(), new MapTypeAdapter())
		.registerTypeAdapter(new TypeToken<HashMap<String, Object>>() {
		}.getType(), new MapTypeAdapter())
		.registerTypeAdapter(new TypeToken<ConcurrentMap<String, Object>>() {
		}.getType(), new ConcurrentMapTypeAdapter())
		.registerTypeAdapter(new TypeToken<ConcurrentHashMap<String, Object>>() {
		}.getType(), new ConcurrentMapTypeAdapter())
		.create();

		return gson.fromJson(json, type);

	}*/

	/**
	 * json字符串转bean对象
	 * 
	 * @param json
	 * @param cls
	 * @return
	 */
	/*public static <T> T fromJson(String json, Class<T> cls) {

		Gson gson = new GsonBuilder()
				.create();

		return gson.fromJson(json, cls);

	}
*/
	/**
	 * 对象转json
	 * 
	 * @param obj
	 * @param format
	 * @return
	 */
	public static String toJson(Object obj) {

		GsonBuilder gsonBuilder = new GsonBuilder();
		/**
		 * 设置默认时间格式
		 */
		//gsonBuilder;

		/**
		 * 添加格式化设置
		 */

		Gson gson = gsonBuilder.create();

		return gson.toJson(obj);
	}

	public static class MapTypeAdapter extends TypeAdapter<Object> {

		@Override
		public Object read(JsonReader in) throws IOException {
			JsonToken token = in.peek();
			switch (token) {
			case BEGIN_ARRAY:
				List<Object> list = new ArrayList<Object>();
				in.beginArray();
				while (in.hasNext()) {
					list.add(read(in));
				}
				in.endArray();
				return list;

			case BEGIN_OBJECT:
				Map<String, Object> map = new LinkedTreeMap<String, Object>();
				in.beginObject();
				while (in.hasNext()) {
					map.put(in.nextName(), read(in));
				}
				in.endObject();
				return map;

			case STRING:
				return in.nextString();

			case NUMBER:
				/**
				 * 改写数字的处理逻辑，将数字值转换成String.
				 */
				Object o = in.nextString();
				return o;

			case BOOLEAN:
				return in.nextBoolean();

			case NULL:
				in.nextNull();
				return null;

			default:
				throw new IllegalStateException();
			}
		}

		@Override
		public void write(JsonWriter out, Object value) throws IOException {
			// 序列化无需实现
		}

	}
	
	public static class ConcurrentMapTypeAdapter extends TypeAdapter<Object> {

		@Override
		public Object read(JsonReader in) throws IOException {
			JsonToken token = in.peek();
			switch (token) {
			case BEGIN_ARRAY:
				List<Object> list = new ArrayList<Object>();
				in.beginArray();
				while (in.hasNext()) {
					list.add(read(in));
				}
				in.endArray();
				return list;

			case BEGIN_OBJECT:
				ConcurrentMap<String, Object> map = new ConcurrentHashMap<String, Object>();
				in.beginObject();
				while (in.hasNext()) {
					map.put(in.nextName(), read(in));
				}
				in.endObject();
				return map;

			case STRING:
				return in.nextString();

			case NUMBER:
				/**
				 * 改写数字的处理逻辑，将数字值转换成String.
				 */
				Object o = in.nextString();
				return o;

			case BOOLEAN:
				return in.nextBoolean();

			case NULL:
				in.nextNull();
				return null;

			default:
				throw new IllegalStateException();
			}
		}

		@Override
		public void write(JsonWriter out, Object value) throws IOException {
			// 序列化无需实现
		}

	}
	/*public static void main(String[] args) {
		String s = "{\r\n" + 
				"    \"contractRoot\": {\r\n" + 
				"        \"tcpCont\": {\r\n" + 
				"            \"transactionId\": \"2018041116983984820809891842\",\r\n" + 
				"            \"reqTime\": \"20180411162717492\",\r\n" + 
				"            \"appKey\": 99.1,\r\n" + 
				"            \"version\": \"V1.0\",\r\n" + 
				"            \"globalId\": 2018983984820809891843\r\n" + 
				"        },\r\n" + 
				"        \"svcCont\": {\r\n" + 
				"            \"requestObject\": {\r\n" + 
				"                \"objType\": 16,\r\n" + 
				"                \"objValue\": 11111111,\r\n" + 
				"                \"latnId\": \"919\"\r\n" + 
				"            },\r\n" + 
				"            \"resultObject\": 1,\r\n" + 
				"            \"resultCode\": \"0\",\r\n" + 
				"            \"resultMsg\": \"成功\"\r\n" + 
				"        }\r\n" + 
				"    }\r\n" + 
				"}";
		ConcurrentHashMap<String, Object> m = GsonUtil.fromJson(s, new TypeToken<ConcurrentHashMap<String, Object>>(){}.getType());
		System.err.println(GsonUtil.toJson(m));
	}*/
}
