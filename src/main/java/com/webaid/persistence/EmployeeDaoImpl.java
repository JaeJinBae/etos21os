package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.EmployeeVO;
import com.webaid.domain.SearchCriteria;

@Repository
public class EmployeeDaoImpl implements EmployeeDao {

	private static final String namespace = "com.webaid.mappers.EmployeeMapper";

	@Autowired
	private SqlSession session;

	@Override
	public List<EmployeeVO> selectAll() {
		return session.selectList(namespace + ".selectAll");
	}

	@Override
	public EmployeeVO selectOneById(String id) {
		return session.selectOne(namespace + ".selectOneById", id);
	}

	@Override
	public List<EmployeeVO> selectByType(String type) {
		return session.selectList(namespace + ".selectByType", type);
	}

	@Override
	public EmployeeVO selectByEno(int eno) {
		return session.selectOne(namespace + ".selectByEno", eno);
	}

	@Override
	public List<EmployeeVO> listSearch(SearchCriteria cri) {
		return session.selectList(namespace + ".listSearch", cri);
	}

	@Override
	public int listSearchCount(SearchCriteria cri) {
		return session.selectOne(namespace + ".listSearchCount", cri);
	}

	@Override
	public void update(EmployeeVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public void update2(EmployeeVO vo) {
		session.update(namespace + ".update2", vo);
	}

	@Override
	public void register(EmployeeVO vo) {
		session.insert(namespace + ".register", vo);
	}

}
