package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.NormalTherapyReservationVO;
import com.webaid.domain.PatientVO;
import com.webaid.domain.SelectByDateEmployeeVO;

@Repository
public class NormalTherapyReservationDaoImpl implements NormalTherapyReservationDao {

	private static final String namespace = "com.webaid.mappers.NormalTherapyReservationMapper";

	@Autowired
	private SqlSession session;

	@Override
	public List<NormalTherapyReservationVO> selectAll() {
		return session.selectList(namespace + ".selectAll");
	}

	@Override
	public List<NormalTherapyReservationVO> selectByDate(String date) {
		return session.selectList(namespace + ".selectByDate", date);
	}

	@Override
	public NormalTherapyReservationVO selectByRno(int rno) {
		return session.selectOne(namespace + ".selectByRno", rno);
	}

	@Override
	public List<NormalTherapyReservationVO> selectByDateEno(SelectByDateEmployeeVO vo) {
		return session.selectList(namespace + ".selectByDateEno", vo);
	}

	@Override
	public List<NormalTherapyReservationVO> selectByDatePno(NormalTherapyReservationVO vo) {
		return session.selectList(namespace + ".selectByDatePno", vo);
	}

	@Override
	public List<NormalTherapyReservationVO> selectCompleteTotalCount(String rdate) {
		return session.selectList(namespace + ".selectCompleteTotalCount", rdate);
	}

	@Override
	public List<NormalTherapyReservationVO> selectCompleteByDateEno(NormalTherapyReservationVO vo) {
		return session.selectList(namespace + ".selectCompleteByDateEno", vo);
	}

	@Override
	public void register(NormalTherapyReservationVO vo) {
		session.insert(namespace + ".register", vo);
	}

	@Override
	public void updateDeskState(NormalTherapyReservationVO vo) {
		session.update(namespace + ".updateDeskState", vo);
	}

	@Override
	public void updateTherapistState(NormalTherapyReservationVO vo) {
		session.update(namespace + ".updateTherapistState", vo);
	}

	@Override
	public void updateInfo(NormalTherapyReservationVO vo) {
		session.update(namespace + ".updateInfo", vo);
	}

	@Override
	public void updatePatientInfo(PatientVO vo) {
		session.update(namespace + ".updatePatientInfo", vo);
	}

	@Override
	public void cancel(NormalTherapyReservationVO vo) {
		session.update(namespace + ".cancel", vo);
	}

	@Override
	public void deleteByRno(int rno) {
		session.delete(namespace + ".deleteByRno", rno);
	}

}
