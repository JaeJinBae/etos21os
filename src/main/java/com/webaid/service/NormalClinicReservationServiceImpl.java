package com.webaid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webaid.domain.NormalClinicReservationVO;
import com.webaid.domain.PatientVO;
import com.webaid.domain.SelectByDateEmployeeVO;
import com.webaid.persistence.NormalClinicReservationDao;

@Service
public class NormalClinicReservationServiceImpl implements NormalClinicReservationService {

	@Autowired
	private NormalClinicReservationDao dao;

	@Override
	public List<NormalClinicReservationVO> selectAll() {
		return dao.selectAll();
	}

	@Override
	public List<NormalClinicReservationVO> selectByDate(String date) {
		return dao.selectByDate(date);
	}

	@Override
	public NormalClinicReservationVO selectByRno(int rno) {
		return dao.selectByRno(rno);
	}

	@Override
	public List<NormalClinicReservationVO> selectByDateEno(SelectByDateEmployeeVO vo) {
		return dao.selectByDateEno(vo);
	}

	@Override
	public List<NormalClinicReservationVO> selectByDatePno(NormalClinicReservationVO vo) {
		return dao.selectByDatePno(vo);
	}

	@Override
	public void register(NormalClinicReservationVO vo) {
		dao.register(vo);
	}

	@Override
	public void updateDeskState(NormalClinicReservationVO vo) {
		dao.updateDeskState(vo);
	}

	@Override
	public void updateInfo(NormalClinicReservationVO vo) {
		dao.updateInfo(vo);
	}

	@Override
	public void updatePatientInfo(PatientVO vo) {
		dao.updatePatientInfo(vo);
	}

	@Override
	public void cancel(NormalClinicReservationVO vo) {
		dao.cancel(vo);
	}

	@Override
	public void deleteByRno(int rno) {
		dao.deleteByRno(rno);
	}

}
