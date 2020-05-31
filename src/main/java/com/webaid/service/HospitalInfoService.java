package com.webaid.service;

import java.util.List;

import com.webaid.domain.HospitalInfoVO;

public interface HospitalInfoService {
	public List<HospitalInfoVO> selectAll();
	public HospitalInfoVO selectOne(String day);
	public void updateTime(HospitalInfoVO vo);
}
