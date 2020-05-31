package com.webaid.persistence;

import java.util.List;

import com.webaid.domain.SmsTemplateVO;

public interface SmsTemplateDao {
	public List<SmsTemplateVO> selectAll();
	public SmsTemplateVO selectOne(int no);
	public void update(SmsTemplateVO vo);
}
