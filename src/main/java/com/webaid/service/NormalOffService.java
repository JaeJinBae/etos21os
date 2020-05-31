package com.webaid.service;

import java.util.List;

import com.webaid.domain.NormalOffVO;
import com.webaid.domain.OffData;
import com.webaid.domain.SearchCriteriaRR;

public interface NormalOffService {
	public List<NormalOffVO> selectAll();
	public NormalOffVO selectByNo(int no);
	public List<NormalOffVO> selectByDate(OffData offdata);
	public List<NormalOffVO> selectByEnoDate(OffData offdata);
	public List<NormalOffVO> listSearch(SearchCriteriaRR cri);
	public int listSearchCount(SearchCriteriaRR cri);
	public void register(NormalOffVO vo);
	public void update(NormalOffVO vo);
	public void delete(int no);
}
