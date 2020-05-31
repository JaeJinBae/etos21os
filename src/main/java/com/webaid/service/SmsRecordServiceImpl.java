package com.webaid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webaid.domain.SearchCriteria;
import com.webaid.domain.SmsRecordVO;
import com.webaid.persistence.SmsRecordDao;

@Service
public class SmsRecordServiceImpl implements SmsRecordService {

	@Autowired
	private SmsRecordDao dao;
	
	@Override
	public List<SmsRecordVO> selectAll() {
		return dao.selectAll();
	}

	@Override
	public List<SmsRecordVO> listSearch(SearchCriteria cri) {
		return dao.listSearch(cri);
	}

	@Override
	public int listSearchCount(SearchCriteria cri) {
		return dao.listSearchCount(cri);
	}

	@Override
	public void register(SmsRecordVO vo) {
		dao.register(vo);
	}

}
