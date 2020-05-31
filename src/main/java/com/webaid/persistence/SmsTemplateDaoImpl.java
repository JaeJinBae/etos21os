package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.SmsTemplateVO;

@Repository
public class SmsTemplateDaoImpl implements SmsTemplateDao {
	private static final String namespace = "com.webaid.mappers.SmsTemplateMapper";

	@Autowired
	private SqlSession session;
	
	@Override
	public List<SmsTemplateVO> selectAll() {
		return session.selectList(namespace+".selectAll");
	}

	@Override
	public SmsTemplateVO selectOne(int no) {
		return session.selectOne(namespace+".selectOne", no);
	}

	@Override
	public void update(SmsTemplateVO vo) {
		session.update(namespace+".update", vo);
	}

}
