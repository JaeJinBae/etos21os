package com.webaid.persistence;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webaid.domain.HospitalInfoVO;

@Repository
public class HospitalInfoDaoImpl implements HospitalInfoDao {

	private static final String namespace="com.webaid.mappers.HospitalInfoMapper";
	
	@Autowired
	private SqlSession session;
	
	@Override
	public List<HospitalInfoVO> selectAll() {
		return session.selectList(namespace+".selectAll");
	}

	@Override
	public HospitalInfoVO selectOne(String day) {
		return session.selectOne(namespace+".selectOne", day);
	}

	@Override
	public void updateTime(HospitalInfoVO vo) {
		session.update(namespace+".updateTime", vo);
	}

}
