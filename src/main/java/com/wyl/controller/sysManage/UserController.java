package com.wyl.controller.sysManage;

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
import com.wyl.mapper.UtilMapper;
import com.wyl.service.user.IUserService;
import com.wyl.utils.GsonUtil;
import com.wyl.utils.NullUtil;
import com.wyl.utils.StringUtil;

@Controller
@RequestMapping("/user")
public class UserController extends BaseController{

	private static final String USERMANAGE = "user/userManage";
	private static final String USERVIEW = "user/userView";
	private static final String USEREDIT = "user/userEdit";
	private static final String ADDROLERELPAGE = "user/addRoleRelPage";
	
	@Autowired
	private IUserService userService ;
	
	@Autowired
	private UtilMapper utilMapper;
	/**
	 * 跳转到用户管理页
	 * @author wangyl   
	 * @date 2019年9月12日 下午5:09:06
	 * Description:此处添加方法作用……
	 * @param model
	 * @return
	 */
	@RequestMapping("/userManage")
	public String toLogin(Model model){
		return USERMANAGE;
	}
	/**
	 * 
	 * @author wangyl   
	 * @date 2019年9月18日 下午8:52:13
	 * Description:获取用户列表
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getUserList",method=RequestMethod.POST)
	@ResponseBody
	public String getUserList(HttpServletRequest request){
		ResultMap resultMap = new ResultMap();
		String paramsStr = request.getParameter("param");
		int pageNo = StringUtil.getInt(request.getParameter("page"));
		int pageSize = StringUtil.getInt(request.getParameter("limit"))==0?10:StringUtil.getInt(request.getParameter("limit"));
		Map<String,Object> params =GsonUtil.fromJsonDefault(paramsStr, Map.class);
		
		try {
			long totalCount = userService.getUserCount(params);
			
			//获得页码和每页显示数
			
			PageVO page= new PageVO(pageNo,pageSize);
			page.setTotalCount(totalCount);
			params = page.buildPageParmap(params,page);
			if(totalCount > 0) {
				List <UserVO> userList = userService.getUserList(params);
				page.setRecords(userList);
				resultMap.setResultObj(page);
				resultMap.setResultMsg("查询成功");
			}else{
				resultMap.setResultMsg("未查询到符合条件的数据数据");
			}
			resultMap.setResultCode("0");
		}catch(Exception e) {
			resultMap.setResultCode("1");
			resultMap.setResultMsg("用户查询异常："+e.getMessage());
		}
		
		return formatRturnForLayTable(resultMap);
	}
	
	/**
	 * 
	 * @author wangyl   
	 * @date 2019年9月17日 下午8:41:14
	 * Description:可以修改为公共方法 TODO
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/updateUser",method=RequestMethod.POST)
	@ResponseBody
	public ResultMap updateUser(HttpServletRequest request){
		ResultMap resultMap = new ResultMap();
		
		String id = StringUtil.getString(request.getParameter("id"));
		String statusCd = StringUtil.getString(request.getParameter("statusCd"));
		String passWord = StringUtil.getString(request.getParameter("passWord"));
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("id", id);
		if(NullUtil.isNotNull(statusCd)) {
			params.put("statusCd", statusCd);
		}
		if(NullUtil.isNotNull(passWord)) {
			params.put("passWord", passWord);
		}
		HttpSession session = request.getSession();
		UserVO sysUser = getSysUserInfo(session);
		params.put("updateUser", sysUser.getId());
		
		try {
			//先记录历史，再更新
			userService.updateUserById(params);
			resultMap.setResultMsg("用户修改成功");
			resultMap.setResultCode("0");
		}catch(Exception e) {
			resultMap.setResultCode("1");
			resultMap.setResultMsg("用户修改异常："+e.getMessage());
		}
		
		return resultMap;
	}
	
	@RequestMapping(value="/addUser",method=RequestMethod.POST)
	@ResponseBody
	public ResultMap addUser(HttpServletRequest request){
		ResultMap resultMap = new ResultMap();
		
		String paramsStr = request.getParameter("param");
		Map<String,Object> tempParams =GsonUtil.fromJsonDefault(paramsStr, Map.class);
		
		String name = StringUtil.getString(tempParams.get("name"));
		String accNum = StringUtil.getString(tempParams.get("accNum"));
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("accNum", accNum);
		//需要先验证账号是否存在，存在不允许添加
		long uCount = userService.getUserCount(params);
		if(uCount != 0) {
			resultMap.setResultCode("1");
			resultMap.setResultMsg("新增用户异常：该账户已存在");
			return resultMap;
		}
		
		params.put("name", name);
		//补必要的字段
		params.put("passWord", "123456");	//赋值默认密码
		params.put("statusCd", "1");		//默认冻结状态，需要手动解冻，并挂角色，赋权
		HttpSession session = request.getSession();
		UserVO sysUser = getSysUserInfo(session);
		params.put("createUser", sysUser.getId());
		params.put("id", utilMapper.getNextVal("seq_bill_log_id"));
		
		try {
			//先记录历史，再更新
			userService.insertUser(params);
			resultMap.setResultMsg("新增用户成功");
			resultMap.setResultCode("0");
		}catch(Exception e) {
			resultMap.setResultCode("1");
			resultMap.setResultMsg("新增用户异常："+e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * @author wangyl   
	 * @date 2019年9月18日 下午8:51:36
	 * Description:跳转到用户详情，修改，新增页面
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/showUserView")
	public String showUserView(Model model,HttpServletRequest request){
		String id=StringUtil.getString(request.getParameter("id"));		//修改，详情需传主键
        String flag=StringUtil.getString(request.getParameter("flag"));	//操作类型 add detail update
        model.addAttribute("id", id);
        model.addAttribute("flag", flag);
        if("detail".equals(flag)){
//        	返回详情页(暂未作，后续需要再补)
        	return USERVIEW;
        }
//      返回新增修改页
        return USEREDIT;
	}
	
	/**
	 * 
	 * @author wangyl   
	 * @date 2019年9月29日 下午8:45:23
	 * Description:跳转到用户权限分配页面
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping("/showAddRoleRelPage")
	public String showaddRoleRelPage(Model model,HttpServletRequest request){
		String userId=request.getParameter("userId");
        model.addAttribute("userId", userId);
        return ADDROLERELPAGE;
	}
	
	/**
	 * 
	 * @author wangyl   
	 * @date 2019年9月29日 下午10:00:59
	 * Description:获取角色列表，并查询是否选择标识
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getUserRoleRelList",method=RequestMethod.POST)
	@ResponseBody
	public String getUserRoleRelList(HttpServletRequest request){
		ResultMap resultMap = new ResultMap();
		String paramsStr = request.getParameter("param");
		Map<String,Object> params =GsonUtil.fromJsonDefault(paramsStr, Map.class);
		
		try {
			List <Map<String,Object>> userList = userService.getUserRoleRelList(params);
			if(NullUtil.isNotNull(userList)) {
				resultMap.setResultObj(userList);
				resultMap.setResultMsg("查询成功");
			}else {
				resultMap.setResultMsg("未查询到符合条件的数据数据");
			}
			resultMap.setResultCode("0");
		}catch(Exception e) {
			resultMap.setResultCode("1");
			resultMap.setResultMsg("角色查询异常："+e.getMessage());
		}
		return formatRturnForLayTableNoPage(resultMap);
	}
	
	/**
	 * 
	 * @author wangyl   
	 * @date 2019年10月8日 上午11:27:38
	 * Description:添加用户角色关系(批量删除再新增，因为有可能是修改)
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/addUserRoleRel",method=RequestMethod.POST)
	@ResponseBody
	public ResultMap addUserRoleRel(HttpServletRequest request){
		ResultMap resultMap = new ResultMap();
		try {
			String paramsStr = request.getParameter("param");
//			Map<String,Object> tempParams =GsonUtil.fromJsonDefault(paramsStr, Map.class);
			
			String userId = StringUtil.getString(request.getParameter("userId"));
			String roleIds = StringUtil.getString(request.getParameter("roleIds"));
			String[] roleIdArr = roleIds.split(",");
			Map<String,Object> params = new HashMap<String,Object>();
			params.put("userId", userId);
			//先删除用户所有的关系
			userService.deleteUserRoleRel(params);
			
			//不为空，新增关系！为空的话说明删除关系（前端做限制，不能为空）
			if(NullUtil.isNotNull(roleIdArr)) {
				//绑定创建人
				HttpSession session = request.getSession();
				UserVO sysUser = getSysUserInfo(session);
				params.put("createUser", sysUser.getId());
				for(String roleId:roleIdArr) {
					params.put("roleId", roleId);
					params.put("id", utilMapper.getNextVal("seq_rel_user_role_id"));
					params.put("statusCd","0");
					userService.insertUserRoleRel(params);
				}
			}
			resultMap.setResultMsg("新增用户角色关系成功");
			resultMap.setResultCode("0");
		}catch(Exception e) {
			resultMap.setResultCode("1");
			resultMap.setResultMsg("新增用户角色关系异常："+e.getMessage());
		}
		
		return resultMap;
	}
	
}
