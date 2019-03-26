package com.wyl.controller.bill;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wyl.controller.BaseController;
import com.wyl.entity.BillVO;
import com.wyl.entity.PageVO;
import com.wyl.entity.ResultMap;
import com.wyl.service.bill.IBillService;
import com.wyl.utils.GsonUtil;
import com.wyl.utils.StringUtil;

@Controller
@RequestMapping("/bill")
public class BillController extends BaseController{

	private static final String BILL_LIST = "bill/billList";
	
	@Autowired
	private IBillService billService ;
	/**
	 * 跳转到账单查询页
	* @Title: toLogin 
	* @Description: TODO(这里用一句话描述这个方法的作用) 
	* @author wangyl
	* @param model
	* @return  参数说明 
	* @return String    返回类型 
	* @throws
	 */
	@RequestMapping("/toBillList")
	public String toLogin(Model model){
		return BILL_LIST;
	}
	
	
	/*@RequestMapping(value="/getBillList",method=RequestMethod.POST)
	@ResponseBody
	public ResultMap getMenu(@RequestBody Map<String,Object> params){
		ResultMap resultMap = new ResultMap();
		try {
			long totalCount = billService.getBillCount(params);
			
			//获得页码和每页显示数
			int pageNo = (Integer)params.get("pageNo");
			int pageSize = (Integer)params.get("pageSize");
			PageVO page= new PageVO(pageNo,pageSize);
			page.setTotalCount(totalCount);
			params = page.buildPageParmap(params,page);
			if(totalCount > 0) {
				List <BillVO> billList = billService.getBillList(params);
				page.setRecords(billList);
			}
			resultMap.setResultCode("0");
			resultMap.setResultObj(page);
		}catch(Exception e) {
			resultMap.setResultCode("1");
			resultMap.setResultMsg("账单查询异常："+e.getMessage());
		}
		
		return resultMap;
	}*/
	
	@RequestMapping(value="/getBillList",method=RequestMethod.POST)
	@ResponseBody
	public String getMenu(HttpServletRequest request){
		ResultMap resultMap = new ResultMap();
		String paramsStr = request.getParameter("param");
		int pageNo = StringUtil.getInt(request.getParameter("page"));
		int pageSize = StringUtil.getInt(request.getParameter("limit"))==0?10:StringUtil.getInt(request.getParameter("limit"));
		Map<String,Object> params =GsonUtil.fromJsonDefault(paramsStr, Map.class);
		
		try {
			long totalCount = billService.getBillCount(params);
			
			//获得页码和每页显示数
			
			PageVO page= new PageVO(pageNo,pageSize);
			page.setTotalCount(totalCount);
			params = page.buildPageParmap(params,page);
			if(totalCount > 0) {
				List <BillVO> billList = billService.getBillList(params);
				page.setRecords(billList);
				resultMap.setResultObj(page);
				resultMap.setResultMsg("查询成功");
			}else{
				resultMap.setResultMsg("未查询到符合条件的数据数据");
			}
			resultMap.setResultCode("0");
		}catch(Exception e) {
			resultMap.setResultCode("1");
			resultMap.setResultMsg("账单查询异常："+e.getMessage());
		}
		
		return formatRturnForLayTable(resultMap);
	}
}
