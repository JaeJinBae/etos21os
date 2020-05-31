package com.webaid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webaid.domain.HospitalInfoVO;
import com.webaid.persistence.HospitalInfoDao;

@Service
public class HospitalInfoServiceImpl implements HospitalInfoService {

	@Autowired
	private HospitalInfoDao dao;
	
	@Override
	public List<HospitalInfoVO> selectAll() {
		return dao.selectAll();
	}

	@Override
	public HospitalInfoVO selectOne(String day) {
		return dao.selectOne(day);
	}

	@Override
	public void updateTime(HospitalInfoVO vo) {
		dao.updateTime(vo);
	}

}
