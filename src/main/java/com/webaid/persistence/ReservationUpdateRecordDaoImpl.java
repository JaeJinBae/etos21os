package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.PatientVO;
import com.webaid.domain.ReservationUpdateRecordVO;
import com.webaid.domain.SearchCriteria;

@Repository
public class ReservationUpdateRecordDaoImpl implements ReservationUpdateRecordDao {

	private static final String namespce = "com.webaid.mappers.ReservationUpdateRecordMapper";

	@Autowired
	private SqlSession session;

	@Override
	public List<ReservationUpdateRecordVO> selectAll() {
		return session.selectList(namespce + ".selectAll");
	}

	@Override
	public List<ReservationUpdateRecordVO> selectByPno(int pno) {
		return session.selectList(namespce + ".selectByPno", pno);
	}

	@Override
	public List<ReservationUpdateRecordVO> listSearch(SearchCriteria cri) {
		return session.selectList(namespce + ".listSearch", cri);
	}

	@Override
	public int listSearchCount(SearchCriteria cri) {
		return session.selectOne(namespce + ".listSearchCount", cri);
	}

	@Override
	public void register(ReservationUpdateRecordVO vo) {
		session.insert(namespce + ".register", vo);
	}

	@Override
	public void updatePatientInfo(PatientVO vo) {
		session.update(namespce + ".updatePatientInfo", vo);
	}

	@Override
	public void deleteByRnoRtype(ReservationUpdateRecordVO vo) {
		session.delete(namespce + ".deleteByRnoRtype", vo);
	}

}
