package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.SearchCriteria;
import com.webaid.domain.SmsRecordVO;

@Repository
public class SmsRecordDaoImpl implements SmsRecordDao {

	private static final String namespace = "com.webaid.mappers.SmsRecordMapper";
	
	@Autowired
	private SqlSession session;
	
	@Override
	public List<SmsRecordVO> selectAll() {
		return session.selectList(namespace+".selectAll");
	}

	@Override
	public List<SmsRecordVO> listSearch(SearchCriteria cri) {
		return session.selectList(namespace+".listSearch", cri);
	}

	@Override
	public int listSearchCount(SearchCriteria cri) {
		return session.selectOne(namespace+".listSearchCount", cri);
	}

	@Override
	public void register(SmsRecordVO vo) {
		session.insert(namespace+".register", vo);
	}

}
