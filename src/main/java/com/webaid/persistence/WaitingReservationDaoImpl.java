package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.PatientVO;
import com.webaid.domain.WaitingReservationVO;

@Repository
public class WaitingReservationDaoImpl implements WaitingReservationDao {
	private static final String namespace = "com.webaid.mappers.WaitingReservationMapper";

	@Autowired
	private SqlSession session;

	@Override
	public List<WaitingReservationVO> selectAll() {
		return session.selectList(namespace + ".selectAll");
	}

	@Override
	public List<WaitingReservationVO> selectByDate(String rdate) {
		return session.selectList(namespace + ".selectByDate", rdate);
	}

	@Override
	public WaitingReservationVO selectByNo(int no) {
		return session.selectOne(namespace + ".selectByNo", no);
	}

	@Override
	public void register(WaitingReservationVO vo) {
		session.insert(namespace + ".register", vo);
	}

	@Override
	public void updatePatientInfo(PatientVO vo) {
		session.update(namespace + ".updatePatientInfo", vo);
	}

	@Override
	public void delete(int no) {
		session.delete(namespace + ".delete", no);
	}

}
