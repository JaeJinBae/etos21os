package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.FixOffVO;
import com.webaid.domain.OffData;
import com.webaid.domain.SearchCriteriaRR;

@Repository
public class FixOffDaoImpl implements FixOffDao {

	private static final String namespace = "com.webaid.mappers.FixOffMapper";

	@Autowired
	private SqlSession session;

	@Override
	public List<FixOffVO> selectAll() {
		return session.selectList(namespace + ".selectAll");
	}

	@Override
	public FixOffVO selectByNo(int no) {
		return session.selectOne(namespace + ".selectByNo", no);
	}

	@Override
	public List<FixOffVO> selectByDate(OffData offdata) {
		return session.selectList(namespace + ".selectByDate", offdata);
	}

	@Override
	public List<FixOffVO> selectByEnoDate(OffData offdata) {
		return session.selectList(namespace + ".selectByEnoDate", offdata);
	}

	@Override
	public List<FixOffVO> listSearch(SearchCriteriaRR cri) {
		return session.selectList(namespace + ".listSearch", cri);
	}

	@Override
	public int listSearchCount(SearchCriteriaRR cri) {
		return session.selectOne(namespace + ".listSearchCount", cri);
	}

	@Override
	public void register(FixOffVO vo) {
		session.insert(namespace + ".register", vo);
	}

	@Override
	public void update(FixOffVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public void delete(int no) {
		session.delete(namespace+".delete", no);
	}

}
