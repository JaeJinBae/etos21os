package com.webaid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webaid.domain.NormalTherapyReservationVO;
import com.webaid.domain.PatientVO;
import com.webaid.domain.SelectByDateEmployeeVO;
import com.webaid.persistence.NormalTherapyReservationDao;

@Service
public class NormalTherapyReservationServiceImpl implements NormalTherapyReservationService {
	@Autowired
	private NormalTherapyReservationDao dao;

	@Override
	public List<NormalTherapyReservationVO> selectAll() {
		return dao.selectAll();
	}

	@Override
	public List<NormalTherapyReservationVO> selectByDate(String date) {
		return dao.selectByDate(date);
	}

	@Override
	public NormalTherapyReservationVO selectByRno(int rno) {
		return dao.selectByRno(rno);
	}

	@Override
	public List<NormalTherapyReservationVO> selectByDateEno(SelectByDateEmployeeVO vo) {
		return dao.selectByDateEno(vo);
	}

	@Override
	public List<NormalTherapyReservationVO> selectByDatePno(NormalTherapyReservationVO vo) {
		return dao.selectByDatePno(vo);
	}

	@Override
	public List<NormalTherapyReservationVO> selectCompleteTotalCount(String rdate) {
		return dao.selectCompleteTotalCount(rdate);
	}

	@Override
	public List<NormalTherapyReservationVO> selectCompleteByDateEno(NormalTherapyReservationVO vo) {
		return dao.selectCompleteByDateEno(vo);
	}

	@Override
	public void register(NormalTherapyReservationVO vo) {
		dao.register(vo);
	}

	@Override
	public void updateDeskState(NormalTherapyReservationVO vo) {
		dao.updateDeskState(vo);
	}

	@Override
	public void updateTherapistState(NormalTherapyReservationVO vo) {
		dao.updateTherapistState(vo);
	}

	@Override
	public void updateInfo(NormalTherapyReservationVO vo) {
		dao.updateInfo(vo);
	}

	@Override
	public void cancel(NormalTherapyReservationVO vo) {
		dao.cancel(vo);
	}

	@Override
	public void deleteByRno(int rno) {
		dao.deleteByRno(rno);
	}

	@Override
	public void updatePatientInfo(PatientVO vo) {
		dao.updatePatientInfo(vo);
	}

}
