package com.webaid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webaid.domain.EmployeeVO;
import com.webaid.domain.SearchCriteria;
import com.webaid.persistence.EmployeeDao;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeDao dao;

	@Override
	public List<EmployeeVO> selectAll() {
		return dao.selectAll();
	}

	@Override
	public EmployeeVO selectOneById(String id) {
		return dao.selectOneById(id);
	}

	@Override
	public List<EmployeeVO> selectByType(String type) {
		return dao.selectByType(type);
	}

	@Override
	public EmployeeVO selectByEno(int eno) {
		return dao.selectByEno(eno);
	}

	@Override
	public List<EmployeeVO> listSearch(SearchCriteria cri) {
		return dao.listSearch(cri);
	}

	@Override
	public int listSearchCount(SearchCriteria cri) {
		return dao.listSearchCount(cri);
	}

	@Override
	public void update(EmployeeVO vo) {
		dao.update(vo);
	}

	@Override
	public void update2(EmployeeVO vo) {
		dao.update2(vo);
	}

	@Override
	public void register(EmployeeVO vo) {
		dao.register(vo);
	}

}
