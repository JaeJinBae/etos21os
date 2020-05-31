package com.webaid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webaid.domain.FixOffVO;
import com.webaid.domain.OffData;
import com.webaid.domain.SearchCriteriaRR;
import com.webaid.persistence.FixOffDao;

@Service
public class FixOffServiceImpl implements FixOffService {

	@Autowired
	private FixOffDao dao;

	@Override
	public List<FixOffVO> selectAll() {
		return dao.selectAll();
	}

	@Override
	public FixOffVO selectByNo(int no) {
		return dao.selectByNo(no);
	}

	@Override
	public List<FixOffVO> selectByDate(OffData offdata) {
		return dao.selectByDate(offdata);
	}

	@Override
	public List<FixOffVO> selectByEnoDate(OffData offdata) {
		return dao.selectByEnoDate(offdata);
	}

	@Override
	public List<FixOffVO> listSearch(SearchCriteriaRR cri) {
		return dao.listSearch(cri);
	}

	@Override
	public int listSearchCount(SearchCriteriaRR cri) {
		return dao.listSearchCount(cri);
	}

	@Override
	public void register(FixOffVO vo) {
		dao.register(vo);
	}

	@Override
	public void update(FixOffVO vo) {
		dao.update(vo);
	}

	@Override
	public void delete(int no) {
		dao.delete(no);
	}

}
