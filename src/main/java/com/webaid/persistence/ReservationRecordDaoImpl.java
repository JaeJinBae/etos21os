package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.PatientVO;
import com.webaid.domain.ReservationRecordVO;
import com.webaid.domain.SearchCriteriaRR;

@Repository
public class ReservationRecordDaoImpl implements ReservationRecordDao {

	private static final String namespace = "com.webaid.mappers.ReservationRecordMapper";

	@Autowired
	private SqlSession session;

	@Override
	public List<ReservationRecordVO> selectAll() {
		return session.selectList(namespace + ".selectAll");
	}

	@Override
	public List<ReservationRecordVO> selectByPno(int pno) {
		return session.selectList(namespace + ".selectByPno", pno);
	}

	@Override
	public List<ReservationRecordVO> selectCompleteTherapyByPno(int pno) {
		return session.selectList(namespace + ".selectCompleteTherapyByPno", pno);
	}

	@Override
	public List<ReservationRecordVO> selectCompleteClinicByPno(int pno) {
		return session.selectList(namespace + ".selectCompleteClinicByPno", pno);
	}

	@Override
	public List<ReservationRecordVO> selectByKeyword(SearchCriteriaRR cri) {
		return session.selectList(namespace + ".selectByKeyword", cri);
	}

	@Override
	public List<ReservationRecordVO> listSearch(SearchCriteriaRR cri) {
		return session.selectList(namespace + ".listSearch", cri);
	}

	@Override
	public int listSearchCount(SearchCriteriaRR cri) {
		return session.selectOne(namespace + ".listSearchCount", cri);
	}

	@Override
	public void register(ReservationRecordVO vo) {
		session.insert(namespace + ".register", vo);
	}

	@Override
	public void updateReceptionInfo(ReservationRecordVO vo) {
		session.update(namespace + ".updateReceptionInfo", vo);
	}

	@Override
	public void updateTherapyInfo(ReservationRecordVO vo) {
		session.update(namespace + ".updateTherapyInfo", vo);
	}

	@Override
	public void updateRdateRtime(ReservationRecordVO vo) {
		session.update(namespace + ".updateRdateRtime", vo);
	}

	@Override
	public void updatePatientInfo(PatientVO vo) {
		session.update(namespace + ".updatePatientInfo", vo);
	}

	@Override
	public void deleteByRnoRtype(ReservationRecordVO vo) {
		session.delete(namespace + ".deleteByRnoRtype", vo);
	}

	@Override
	public List<ReservationRecordVO> selectByRnoRType(ReservationRecordVO vo) {
		return session.selectList(namespace + ".selectByRnoRtype", vo);
	}

}
