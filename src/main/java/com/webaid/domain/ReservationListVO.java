package com.webaid.domain;

import java.util.List;

public class ReservationListVO {
	private FixClinicReservationVO vo;
	private List<String> dateList;

	public ReservationListVO() {
		super();
	}

	public FixClinicReservationVO getVo() {
		return vo;
	}

	public void setVo(FixClinicReservationVO vo) {
		this.vo = vo;
	}

	public List<String> getDateList() {
		return dateList;
	}

	public void setDateList(List<String> dateList) {
		this.dateList = dateList;
	}

	@Override
	public String toString() {
		return "ReservationListVO [vo=" + vo + ", dateList=" + dateList + "]";
	}

}
