package com.webaid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webaid.domain.SmsTemplateVO;
import com.webaid.persistence.SmsTemplateDao;

@Service
public class SmsTemplateServiceImpl implements SmsTemplateService {

	@Autowired
	private SmsTemplateDao dao;
	
	@Override
	public List<SmsTemplateVO> selectAll() {
		return dao.selectAll();
	}

	@Override
	public SmsTemplateVO selectOne(int no) {
		return dao.selectOne(no);
	}

	@Override
	public void update(SmsTemplateVO vo) {
		dao.update(vo);
	}

}
