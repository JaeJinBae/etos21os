package com.webaid.persistence;

import java.util.List;

import com.webaid.domain.ClinicVO;
import com.webaid.domain.EmployeeVO;
import com.webaid.domain.SearchCriteria;

public interface ClinicDao {
	public List<ClinicVO> selectAll();
	public ClinicVO selectOneByCno(int cno);
	public List<ClinicVO> selectByCodeType(String code_type);
	public List<ClinicVO> listSearch(SearchCriteria cri);
	public int listSearchCount(SearchCriteria cri);
	public void register(ClinicVO vo);
	public void update(ClinicVO vo);
	public void delete(int cno);
}
