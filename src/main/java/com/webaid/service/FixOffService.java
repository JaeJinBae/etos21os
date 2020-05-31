package com.webaid.service;

import java.util.List;

import com.webaid.domain.FixOffVO;
import com.webaid.domain.OffData;
import com.webaid.domain.SearchCriteriaRR;

public interface FixOffService {
	public List<FixOffVO> selectAll();
	public FixOffVO selectByNo(int no);
	public List<FixOffVO> selectByDate(OffData offdata);
	public List<FixOffVO> selectByEnoDate(OffData offdata);
	public List<FixOffVO> listSearch(SearchCriteriaRR cri);
	public int listSearchCount(SearchCriteriaRR cri);
	public void register(FixOffVO vo);
	public void update(FixOffVO vo);
	public void delete(int no);
}
