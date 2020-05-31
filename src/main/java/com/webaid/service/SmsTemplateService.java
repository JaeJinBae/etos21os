package com.webaid.service;

import java.util.List;

import com.webaid.domain.SmsTemplateVO;

public interface SmsTemplateService {
	public List<SmsTemplateVO> selectAll();
	public SmsTemplateVO selectOne(int no);
	public void update(SmsTemplateVO vo);
}
