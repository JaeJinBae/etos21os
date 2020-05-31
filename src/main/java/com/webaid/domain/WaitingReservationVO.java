package com.webaid.domain;

public class WaitingReservationVO {
	private int no;
	private int pno;
	private String pname;
	private int chart_no;
	private int eno;
	private String memo;
	private String clinic;
	private String clinic_name;
	private String rtype;
	private String rdate;
	private String rtime;
	private String writer;

	public WaitingReservationVO() {
		super();
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public int getPno() {
		return pno;
	}

	public void setPno(int pno) {
		this.pno = pno;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public int getChart_no() {
		return chart_no;
	}

	public void setChart_no(int chart_no) {
		this.chart_no = chart_no;
	}

	public int getEno() {
		return eno;
	}

	public void setEno(int eno) {
		this.eno = eno;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getClinic() {
		return clinic;
	}

	public void setClinic(String clinic) {
		this.clinic = clinic;
	}

	public String getClinic_name() {
		return clinic_name;
	}

	public void setClinic_name(String clinic_name) {
		this.clinic_name = clinic_name;
	}

	public String getRtype() {
		return rtype;
	}

	public void setRtype(String rtype) {
		this.rtype = rtype;
	}

	public String getRdate() {
		return rdate;
	}

	public void setRdate(String rdate) {
		this.rdate = rdate;
	}

	public String getRtime() {
		return rtime;
	}

	public void setRtime(String rtime) {
		this.rtime = rtime;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	@Override
	public String toString() {
		return "WaitingReservationVO [no=" + no + ", pno=" + pno + ", pname=" + pname + ", chart_no=" + chart_no
				+ ", eno=" + eno + ", memo=" + memo + ", clinic=" + clinic + ", clinic_name=" + clinic_name + ", rtype="
				+ rtype + ", rdate=" + rdate + ", rtime=" + rtime + ", writer=" + writer + "]";
	}

}
