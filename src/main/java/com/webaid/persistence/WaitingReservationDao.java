package com.webaid.persistence;

import java.util.List;

import com.webaid.domain.PatientVO;
import com.webaid.domain.WaitingReservationVO;

public interface WaitingReservationDao {
	public List<WaitingReservationVO> selectAll();
	public List<WaitingReservationVO> selectByDate(String rdate);
	public WaitingReservationVO selectByNo(int no);
	public void register(WaitingReservationVO vo);
	public void updatePatientInfo(PatientVO vo);
	public void delete(int no);
}
