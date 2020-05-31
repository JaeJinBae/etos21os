package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.DelFixSchVO;
import com.webaid.domain.FixClinicReservationVO;
import com.webaid.domain.PatientVO;
import com.webaid.domain.SelectByDateEmployeeVO;

@Repository
public class FixClinicReservationDaoImpl implements FixClinicReservationDao {
	private static final String namespace = "com.webaid.mappers.FixClinicReservationMapper";

	@Autowired
	private SqlSession session;

	@Override
	public List<FixClinicReservationVO> selectAll() {
		return session.selectList(namespace + ".selectAll");
	}

	@Override
	public List<FixClinicReservationVO> selectByDate(String date) {
		return session.selectList(namespace + ".selectByDate", date);
	}

	@Override
	public FixClinicReservationVO selectByRno(int rno) {
		return session.selectOne(namespace + ".selectByRno", rno);
	}

	@Override
	public List<FixClinicReservationVO> selectByDateEno(SelectByDateEmployeeVO vo) {
		return session.selectList(namespace + ".selectByDateEno", vo);
	}

	@Override
	public List<FixClinicReservationVO> selectByDatePno(FixClinicReservationVO vo) {
		return session.selectList(namespace + ".selectByDatePno", vo);
	}

	@Override
	public List<FixClinicReservationVO> selectByFixInfo(DelFixSchVO vo) {
		return session.selectList(namespace + ".selectByFixInfo", vo);
	}

	@Override
	public void register(FixClinicReservationVO vo) {
		session.insert(namespace + ".register", vo);
	}

	@Override
	public void updateDeskState(FixClinicReservationVO vo) {
		session.update(namespace + ".updateDeskState", vo);
	}

	@Override
	public void updateInfo(FixClinicReservationVO vo) {
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
	public void cancel(FixClinicReservationVO vo) {
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
