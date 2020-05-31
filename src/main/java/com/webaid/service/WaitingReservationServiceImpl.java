package com.webaid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webaid.domain.PatientVO;
import com.webaid.domain.WaitingReservationVO;
import com.webaid.persistence.WaitingReservationDao;

@Service
public class WaitingReservationServiceImpl implements WaitingReservationService {

	@Autowired
	private WaitingReservationDao dao;

	@Override
	public List<WaitingReservationVO> selectAll() {
		return dao.selectAll();
	}

	@Override
	public List<WaitingReservationVO> selectByDate(String rdate) {
		return dao.selectByDate(rdate);
	}

	@Override
	public WaitingReservationVO selectByNo(int no) {
		return dao.selectByNo(no);
	}

	@Override
	public void register(WaitingReservationVO vo) {
		dao.register(vo);
	}

	@Override
	public void updatePatientInfo(PatientVO vo) {
		dao.updatePatientInfo(vo);
	}

	@Override
	public void delete(int no) {
		dao.delete(no);
	}

}
