package com.wyl.controller.bill;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wyl.controller.BaseController;
import com.wyl.entity.BillLogVO;
import com.wyl.entity.BillVO;
import com.wyl.entity.PageVO;
import com.wyl.entity.ResultMap;
import com.wyl.entity.UserVO;
import com.wyl.service.bill.IBillService;
import com.wyl.utils.GsonUtil;
import com.wyl.utils.NullUtil;
import com.wyl.utils.StringUtil;

@Controller
@RequestMapping("/bill")
public class BillController extends BaseController{

	private static final String BILL_LIST = "bill/billList";
	private static final String TEMP = "bill/temp";
	private static final String TEMP2 = "bill/temp2";
	private static final String BILLVIEW = "bill/billView";
	private static final String BILLEDIT = "bill/billEdit";
	
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
	@RequestMapping("/temp")
	public String temp(Model model){
		return TEMP;
	}
	@RequestMapping("/temp2")
	public String temp2(Model model){
		return TEMP2;
	}
	@RequestMapping("/showBillView")
	public String showBillView(Model model,HttpServletRequest request){
		String billId=request.getParameter("billId");
        String flag=request.getParameter("flag");
        model.addAttribute("billId", billId);
        model.addAttribute("flag", flag);
        if("detail".equals(flag)){
//        	返回详情页
        	return BILLVIEW;
        }
//      返回新增修改页
        return BILLEDIT;
	}
	
	@RequestMapping(value="/getBillList",method=RequestMethod.POST)
	@ResponseBody
	public String getBillList(HttpServletRequest request){
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
	
	
	/**
	 * 根据id查询账单信息
	 * @param request
	 * @param response
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/getBillById",method=RequestMethod.POST)
	@ResponseBody
	public ResultMap getBillById(HttpServletRequest request,HttpServletResponse response,HttpSession session){
		ResultMap resultMap = new ResultMap();
		
        Map<String,Object> paramMap = new HashMap<String,Object>();
        paramMap.put("billId", request.getParameter("billId"));
        List <BillVO> billList = billService.getBillList(paramMap);
		if(NullUtil.isNotNull(billList)) {
			resultMap.setResultCode("0");
			resultMap.setResultObj(billList.get(0));
		}else {
			resultMap.setResultCode("-1");
			resultMap.setResultMsg("没查到T_BILL数据信息");
		}
		return resultMap;
	}
	
	
	
	@RequestMapping(value="/updateBill",method=RequestMethod.POST)
	@ResponseBody
	public ResultMap updateBill(HttpServletRequest request){
		ResultMap resultMap = new ResultMap();
		
		String paramsStr = request.getParameter("param");
		Map<String,Object> params =GsonUtil.fromJsonDefault(paramsStr, Map.class);
		
		HttpSession session = request.getSession();
		UserVO sysUser = getSysUserInfo(session);
		
		params.put("updateUser", sysUser.getId());
		
		try {
			//先记录历史，再更新
			billService.addBillLog(params);
			billService.updateBillById(params);
			resultMap.setResultMsg("账单修改成功");
			resultMap.setResultCode("0");
		}catch(Exception e) {
			resultMap.setResultCode("1");
			resultMap.setResultMsg("账单修改异常："+e.getMessage());
		}
		
		return resultMap;
	}
	
	
	/**
	 * 获取账单历史信息
	 * @param request
	 * @param response
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/getBillLogByBillId",method=RequestMethod.POST)
	@ResponseBody
	public String getBillLogByBillId(HttpServletRequest request,HttpServletResponse response,HttpSession session){
		ResultMap resultMap = new ResultMap();
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("billId", request.getParameter("billId"));
        
		int pageNo = StringUtil.getInt(request.getParameter("page"));
		int pageSize = StringUtil.getInt(request.getParameter("limit"))==0?10:StringUtil.getInt(request.getParameter("limit"));
		
		try {
			long totalCount = billService.getBillLogCount(params);
			
			//获得页码和每页显示数
			
			PageVO page= new PageVO(pageNo,pageSize);
			page.setTotalCount(totalCount);
			params = page.buildPageParmap(params,page);
			if(totalCount > 0) {
				List <BillLogVO> billList = billService.getBillLogList(params);
				page.setRecords(billList);
				resultMap.setResultObj(page);
				resultMap.setResultMsg("查询成功");
			}else{
				resultMap.setResultMsg("未查询到符合条件的数据数据");
			}
			resultMap.setResultCode("0");
		}catch(Exception e) {
			resultMap.setResultCode("1");
			resultMap.setResultMsg("账单历史查询异常："+e.getMessage());
		}
		
		return formatRturnForLayTable(resultMap);
	}
	
}
