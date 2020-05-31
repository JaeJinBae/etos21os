package com.webaid.persistence;

import java.util.List;

import com.webaid.domain.HospitalInfoVO;

public interface HospitalInfoDao {
	public List<HospitalInfoVO> selectAll();
	public HospitalInfoVO selectOne(String day);
	public void updateTime(HospitalInfoVO vo);
}
