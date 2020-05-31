package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.PatientVO;
import com.webaid.domain.SearchCriteria5;

@Repository
public class PatientDaoImpl implements PatientDao {

	private static final String namespace = "com.webaid.mappers.PatientMapper";

	@Autowired
	private SqlSession session;

	@Override
	public List<PatientVO> selectAll() {
		return session.selectList(namespace + ".selectAll");
	}

	@Override
	public List<PatientVO> selectByName(String name) {
		return session.selectList(namespace + ".selectByName", name);
	}

	@Override
	public PatientVO selectByPhone(String phone) {
		return session.selectOne(namespace + ".selectByPhone", phone);
	}

	@Override
	public PatientVO selectInfoByCno(int cno) {
		return session.selectOne(namespace + ".selectInfoByCno", cno);
	}

	@Override
	public int selectByCno(int cno) {
		return session.selectOne(namespace + ".selectByCno", cno);
	}

	@Override
	public int listSearchCount(SearchCriteria5 cri) {
		return session.selectOne(namespace + ".listSearchCount", cri);
	}

	@Override
	public List<PatientVO> listSearch(SearchCriteria5 cri) throws Exception {
		return session.selectList(namespace + ".listSearch", cri);
	}

	@Override
	public PatientVO selectByPno(String pno) {
		return session.selectOne(namespace + ".selectByPno", pno);
	}

	@Override
	public void update(PatientVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public void register(PatientVO vo) {
		session.insert(namespace + ".register", vo);
	}

}
