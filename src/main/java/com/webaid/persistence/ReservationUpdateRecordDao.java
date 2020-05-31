package com.webaid.persistence;

import java.util.List;

import com.webaid.domain.PatientVO;
import com.webaid.domain.ReservationUpdateRecordVO;
import com.webaid.domain.SearchCriteria;

public interface ReservationUpdateRecordDao {
	public List<ReservationUpdateRecordVO> selectAll();
	public List<ReservationUpdateRecordVO> selectByPno(int pno);
	public List<ReservationUpdateRecordVO> listSearch(SearchCriteria cri);
	public int listSearchCount(SearchCriteria cri);
	public void register(ReservationUpdateRecordVO vo);
	public void updatePatientInfo(PatientVO vo);
	public void deleteByRnoRtype(ReservationUpdateRecordVO vo);
}
