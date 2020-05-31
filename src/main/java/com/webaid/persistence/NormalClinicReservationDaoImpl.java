package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.NormalClinicReservationVO;
import com.webaid.domain.PatientVO;
import com.webaid.domain.SelectByDateEmployeeVO;

@Repository
public class NormalClinicReservationDaoImpl implements NormalClinicReservationDao {

	private static final String namespace = "com.webaid.mappers.NormalClinicReservationMapper";

	@Autowired
	private SqlSession session;

	@Override
	public List<NormalClinicReservationVO> selectAll() {
		return session.selectList(namespace + ".selectAll");
	}

	@Override
	public List<NormalClinicReservationVO> selectByDate(String date) {
		return session.selectList(namespace + ".selectByDate", date);
	}

	@Override
	public NormalClinicReservationVO selectByRno(int rno) {
		return session.selectOne(namespace + ".selectByRno", rno);
	}

	@Override
	public List<NormalClinicReservationVO> selectByDateEno(SelectByDateEmployeeVO vo) {
		return session.selectList(namespace + ".selectByDateEno", vo);
	}

	@Override
	public void register(NormalClinicReservationVO vo) {
		session.insert(namespace + ".register", vo);
	}

	@Override
	public void updateDeskState(NormalClinicReservationVO vo) {
		session.update(namespace + ".updateDeskState", vo);
	}

	@Override
	public void updateInfo(NormalClinicReservationVO vo) {
		session.update(namespace + ".updateInfo", vo);
	}

	@Override
	public void updatePatientInfo(PatientVO vo) {
		session.update(namespace + ".updatePatientInfo", vo);
	}

	@Override
	public void cancel(NormalClinicReservationVO vo) {
		session.update(namespace + ".cancel", vo);
	}

	@Override
	public List<NormalClinicReservationVO> selectByDatePno(NormalClinicReservationVO vo) {
		return session.selectList(namespace + ".selectByDatePno", vo);
	}

	@Override
	public void deleteByRno(int rno) {
		session.delete(namespace + ".deleteByRno", rno);
	}

}
