package com.webaid.persistence;

import java.util.List;

import com.webaid.domain.NormalClinicReservationVO;
import com.webaid.domain.PatientVO;
import com.webaid.domain.SelectByDateEmployeeVO;

public interface NormalClinicReservationDao {
	public List<NormalClinicReservationVO> selectAll();
	public List<NormalClinicReservationVO> selectByDate(String date);
	public NormalClinicReservationVO selectByRno(int rno);
	public List<NormalClinicReservationVO> selectByDateEno(SelectByDateEmployeeVO vo);
	public List<NormalClinicReservationVO> selectByDatePno(NormalClinicReservationVO vo);
	public void register(NormalClinicReservationVO vo);
	public void updateDeskState(NormalClinicReservationVO vo);
	public void updateInfo(NormalClinicReservationVO vo);
	public void updatePatientInfo(PatientVO vo);
	public void cancel(NormalClinicReservationVO vo);
	public void deleteByRno(int rno);
}
