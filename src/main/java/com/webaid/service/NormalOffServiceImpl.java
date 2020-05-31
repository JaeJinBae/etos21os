package com.webaid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webaid.domain.NormalOffVO;
import com.webaid.domain.OffData;
import com.webaid.domain.SearchCriteriaRR;
import com.webaid.persistence.NormalOffDao;

@Service
public class NormalOffServiceImpl implements NormalOffService {

	@Autowired
	private NormalOffDao dao;

	@Override
	public List<NormalOffVO> selectAll() {
		return dao.selectAll();
	}

	@Override
	public NormalOffVO selectByNo(int no) {
		return dao.selectByNo(no);
	}

	@Override
	public List<NormalOffVO> selectByDate(OffData offdata) {
		return dao.selectByDate(offdata);
	}

	@Override
	public List<NormalOffVO> selectByEnoDate(OffData offdata) {
		return dao.selectByEnoDate(offdata);
	}

	@Override
	public List<NormalOffVO> listSearch(SearchCriteriaRR cri) {
		return dao.listSearch(cri);
	}

	@Override
	public int listSearchCount(SearchCriteriaRR cri) {
		return dao.listSearchCount(cri);
	}

	@Override
	public void register(NormalOffVO vo) {
		dao.register(vo);
	}

	@Override
	public void update(NormalOffVO vo) {
		dao.update(vo);
	}

	@Override
	public void delete(int no) {
		dao.delete(no);
	}

}
