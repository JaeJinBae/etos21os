package com.webaid.service;

import java.util.List;

import com.webaid.domain.SearchCriteria;
import com.webaid.domain.SmsRecordVO;

public interface SmsRecordService {
	public List<SmsRecordVO> selectAll();
	public List<SmsRecordVO> listSearch(SearchCriteria cri);
	public int listSearchCount(SearchCriteria cri);
	public void register(SmsRecordVO vo);
}
