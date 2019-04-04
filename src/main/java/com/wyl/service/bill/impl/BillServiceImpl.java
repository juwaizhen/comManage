package com.wyl.service.bill.impl;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyl.entity.BillVO;
import com.wyl.mapper.BillMapper;
import com.wyl.mapper.UtilMapper;
import com.wyl.service.bill.IBillService;

@Service
public class BillServiceImpl implements IBillService {
	@Autowired
	private BillMapper billMapper;

	public long getBillCount(Map<String,Object> map) {
		return billMapper.getBillCount(map);
	}
	@Override
	public List<BillVO> getBillList(Map<String,Object> map) {
		return billMapper.getBillList(map);
	}
	
	@Override
	public void updateBillById(Map<String,Object> map) {
		billMapper.updateBillById(map);
	}
	

}
