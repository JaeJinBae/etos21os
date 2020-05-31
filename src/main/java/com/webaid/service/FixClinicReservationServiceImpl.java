package com.webaid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webaid.domain.DelFixSchVO;
import com.webaid.domain.FixClinicReservationVO;
import com.webaid.domain.PatientVO;
import com.webaid.domain.SelectByDateEmployeeVO;
import com.webaid.persistence.FixClinicReservationDao;

@Service
public class FixClinicReservationServiceImpl implements FixClinicReservationService {
	@Autowired
	private FixClinicReservationDao dao;

	@Override
	public List<FixClinicReservationVO> selectAll() {
		return dao.selectAll();
	}

	@Override
	public List<FixClinicReservationVO> selectByDate(String date) {
		return dao.selectByDate(date);
	}

	@Override
	public FixClinicReservationVO selectByRno(int rno) {
		return dao.selectByRno(rno);
	}

	@Override
	public List<FixClinicReservationVO> selectByDateEno(SelectByDateEmployeeVO vo) {
		return dao.selectByDateEno(vo);
	}

	@Override
	public List<FixClinicReservationVO> selectByDatePno(FixClinicReservationVO vo) {
		return dao.selectByDatePno(vo);
	}

	@Override
	public List<FixClinicReservationVO> selectByFixInfo(DelFixSchVO vo) {
		return dao.selectByFixInfo(vo);
	}

	@Override
	public void register(FixClinicReservationVO vo) {
		dao.register(vo);

	}

	@Override
	public void updateDeskState(FixClinicReservationVO vo) {
		dao.updateDeskState(vo);
	}

	@Override
	public void updateInfo(FixClinicReservationVO vo) {
		dao.updateInfo(vo);
	}

	@Override
	public void updateInfoGroup(DelFixSchVO vo) {
		dao.updateInfoGroup(vo);
	}

	@Override
	public void cancel(FixClinicReservationVO vo) {
		dao.cancel(vo);
	}

	@Override
	public void deleteByRno(int rno) {
		dao.deleteByRno(rno);
	}

	@Override
	public void deleteSchedule(DelFixSchVO vo) {
		dao.deleteSchedule(vo);
	}

	@Override
	public void updatePatientInfo(PatientVO vo) {
		dao.updatePatientInfo(vo);
	}

}
