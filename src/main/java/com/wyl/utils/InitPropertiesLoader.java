package com.wyl.utils;

import java.io.InputStream;
import java.util.Properties;

public class InitPropertiesLoader {
	 /**
	     * 直接读取classpath中的属性文件
	     * @param filename 文件名称和路径
	     * @return
	     */
	    public Properties getProperties(String filename)
	    {
	        Properties prop = new Properties();
	        InputStream in = null;
	        try
	        {
	            in = getClass().getResourceAsStream(filename);
	            prop.load(in);
	        }
	        catch (Exception e)
	        {
	           System.out.println("无法正确读取properties配置属性文件！");
	        }
	        finally
	        {
	            try
	            {
	                if (in != null)
	                {
	                    in.close();
	                }
	            }
	            catch (Exception e)
	            {
	            }
	        }
	        return prop;
	    }
}
