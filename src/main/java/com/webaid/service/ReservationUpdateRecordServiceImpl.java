package com.webaid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webaid.domain.PatientVO;
import com.webaid.domain.ReservationUpdateRecordVO;
import com.webaid.domain.SearchCriteria;
import com.webaid.persistence.ReservationUpdateRecordDao;

@Service
public class ReservationUpdateRecordServiceImpl implements ReservationUpdateRecordService {

	@Autowired
	private ReservationUpdateRecordDao dao;

	@Override
	public List<ReservationUpdateRecordVO> selectAll() {
		return dao.selectAll();
	}

	@Override
	public List<ReservationUpdateRecordVO> selectByPno(int pno) {
		return dao.selectByPno(pno);
	}

	@Override
	public List<ReservationUpdateRecordVO> listSearch(SearchCriteria cri) {
		return dao.listSearch(cri);
	}

	@Override
	public int listSearchCount(SearchCriteria cri) {
		return dao.listSearchCount(cri);
	}

	@Override
	public void register(ReservationUpdateRecordVO vo) {
		dao.register(vo);
	}

	@Override
	public void updatePatientInfo(PatientVO vo) {
		dao.updatePatientInfo(vo);
	}

	@Override
	public void deleteByRnoRtype(ReservationUpdateRecordVO vo) {
		dao.deleteByRnoRtype(vo);
	}

}
