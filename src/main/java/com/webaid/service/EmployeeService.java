package com.webaid.service;

import java.util.List;

import com.webaid.domain.EmployeeVO;
import com.webaid.domain.SearchCriteria;

public interface EmployeeService {
	public List<EmployeeVO> selectAll();
	public EmployeeVO selectOneById(String id);
	public List<EmployeeVO> selectByType(String type);
	public EmployeeVO selectByEno(int eno);
	public List<EmployeeVO> listSearch(SearchCriteria cri);
	public int listSearchCount(SearchCriteria cri);
	public void update(EmployeeVO vo);
	public void update2(EmployeeVO vo);
	public void register(EmployeeVO vo);
}
