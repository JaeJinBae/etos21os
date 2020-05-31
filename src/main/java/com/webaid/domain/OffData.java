package com.webaid.domain;

public class OffData {
	private int eno;
	private String dow;
	private String yearmonth;
	private String select_date;

	public OffData() {
		super();
	}

	public int getEno() {
		return eno;
	}

	public void setEno(int eno) {
		this.eno = eno;
	}

	public String getDow() {
		return dow;
	}

	public void setDow(String dow) {
		this.dow = dow;
	}

	public String getYearmonth() {
		return yearmonth;
	}

	public void setYearmonth(String yearmonth) {
		this.yearmonth = yearmonth;
	}

	public String getSelect_date() {
		return select_date;
	}

	public void setSelect_date(String select_date) {
		this.select_date = select_date;
	}

	@Override
	public String toString() {
		return "OffData [eno=" + eno + ", dow=" + dow + ", yearmonth=" + yearmonth + ", select_date=" + select_date
				+ "]";
	}

}
