package com.webaid.persistence;

import java.util.List;

import com.webaid.domain.PatientVO;
import com.webaid.domain.SearchCriteria5;

public interface PatientDao {
	public List<PatientVO> selectAll();
	public PatientVO selectByPno(String pno);
	public List<PatientVO> selectByName(String name);
	public PatientVO selectByPhone(String phone);
	public PatientVO selectInfoByCno(int cno);
	public int selectByCno(int cno);
	public List<PatientVO> listSearch(SearchCriteria5 cri) throws Exception;
	public int listSearchCount(SearchCriteria5 cri);
	public void update(PatientVO vo);
	public void register(PatientVO vo);
}
