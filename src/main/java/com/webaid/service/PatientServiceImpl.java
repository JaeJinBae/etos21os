package com.webaid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webaid.domain.PatientVO;
import com.webaid.domain.SearchCriteria5;
import com.webaid.persistence.PatientDao;

@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	private PatientDao dao;

	@Override
	public List<PatientVO> selectAll() {
		return dao.selectAll();
	}

	@Override
	public PatientVO selectByPno(String pno) {
		return dao.selectByPno(pno);
	}

	@Override
	public List<PatientVO> selectByName(String name) {
		return dao.selectByName(name);
	}

	@Override
	public PatientVO selectByPhone(String phone) {
		return dao.selectByPhone(phone);
	}

	@Override
	public int selectByCno(int cno) {
		return dao.selectByCno(cno);
	}

	@Override
	public List<PatientVO> listSearch(SearchCriteria5 cri) throws Exception {
		return dao.listSearch(cri);
	}

	@Override
	public int listSearchCount(SearchCriteria5 cri) {
		return dao.listSearchCount(cri);
	}

	@Override
	public void update(PatientVO vo) {
		dao.update(vo);
	}

	@Override
	public void register(PatientVO vo) {
		dao.register(vo);
	}

	@Override
	public PatientVO selectInfoByCno(int cno) {
		return dao.selectInfoByCno(cno);
	}

}
