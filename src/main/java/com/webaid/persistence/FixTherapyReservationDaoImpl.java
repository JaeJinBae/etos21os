package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.DelFixSchVO;
import com.webaid.domain.FixTherapyReservationVO;
import com.webaid.domain.PatientVO;
import com.webaid.domain.SelectByDateEmployeeVO;

@Repository
public class FixTherapyReservationDaoImpl implements FixTherapyReservationDao {

	private static final String namespace = "com.webaid.mappers.FixTherapyReservationMapper";

	@Autowired
	private SqlSession session;

	@Override
	public List<FixTherapyReservationVO> selectAll() {
		return session.selectList(namespace + ".selectAll");
	}

	@Override
	public List<FixTherapyReservationVO> selectByDate(String date) {
		return session.selectList(namespace + ".selectByDate", date);
	}

	@Override
	public FixTherapyReservationVO selectByRno(int rno) {
		return session.selectOne(namespace + ".selectByRno", rno);
	}

	@Override
	public List<FixTherapyReservationVO> selectByDateEno(SelectByDateEmployeeVO vo) {
		return session.selectList(namespace + ".selectByDateEno", vo);
	}

	@Override
	public List<FixTherapyReservationVO> selectByDatePno(FixTherapyReservationVO vo) {
		return session.selectList(namespace + ".selectByDatePno", vo);
	}

	@Override
	public List<FixTherapyReservationVO> selectCompleteTotalCount(String rdate) {
		return session.selectList(namespace + ".selectCompleteTotalCount", rdate);
	}

	@Override
	public List<FixTherapyReservationVO> selectCompleteByDateEno(FixTherapyReservationVO vo) {
		return session.selectList(namespace + ".selectCompleteByDateEno", vo);
	}

	@Override
	public List<FixTherapyReservationVO> selectByFixInfo(DelFixSchVO vo) {
		return session.selectList(namespace + ".selectByFixInfo", vo);
	}

	@Override
	public void register(FixTherapyReservationVO vo) {
		session.insert(namespace + ".register", vo);
	}

	@Override
	public void updateDeskState(FixTherapyReservationVO vo) {
		session.update(namespace + ".updateDeskState", vo);
	}

	@Override
	public void updateTherapistState(FixTherapyReservationVO vo) {
		session.update(namespace + ".updateTherapistState", vo);
	}

	@Override
	public void updateInfo(FixTherapyReservationVO vo) {
		session.update(namespace + ".updateInfo", vo);
	}

	@Override
	public void updateInfoGroup(DelFixSchVO vo) {
		session.update(namespace + ".updateInfoGroup", vo);
	}

	@Override
	public void updatePatientInfo(PatientVO vo) {
		session.update(namespace + ".updatePatientInfo", vo);
	}

	@Override
	public void cancel(FixTherapyReservationVO vo) {
		session.update(namespace + ".cancel", vo);
	}

	@Override
	public void deleteByRno(int rno) {
		session.delete(namespace + ".deleteByRno", rno);
	}

	@Override
	public void deleteSchedule(DelFixSchVO vo) {
		session.delete(namespace + ".deleteSchedule", vo);
	}

}
