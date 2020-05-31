package com.webaid.domain;

public class SelectByDateEmployeeVO {
	private String rdate;
	private String fix_day;
	private int eno;

	public SelectByDateEmployeeVO() {
		super();
	}

	public String getRdate() {
		return rdate;
	}

	public void setRdate(String rdate) {
		this.rdate = rdate;
	}

	public String getFix_day() {
		return fix_day;
	}

	public void setFix_day(String fix_day) {
		this.fix_day = fix_day;
	}

	public int getEno() {
		return eno;
	}

	public void setEno(int eno) {
		this.eno = eno;
	}

	@Override
	public String toString() {
		return "SelectByDateEmployeeVO [rdate=" + rdate + ", fix_day=" + fix_day + ", eno=" + eno + "]";
	}
	
}
