package com.wyl.mapper;

import java.util.List;

import com.wyl.entity.PrivilegeVO;

public interface PrivilegeMapper {
	List<PrivilegeVO> qryPrivilegeListByUserId(String id);
}
