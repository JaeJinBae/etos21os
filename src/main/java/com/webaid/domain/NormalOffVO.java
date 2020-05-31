package com.webaid.domain;

public class NormalOffVO {
	private int no;
	private int eno;
	private String etype;
	private String offtype;
	private String startdate;
	private String enddate;
	private String starttime;
	private String endtime;
	private String regdate;
	private String writer;

	public NormalOffVO() {
		super();
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public int getEno() {
		return eno;
	}

	public void setEno(int eno) {
		this.eno = eno;
	}

	public String getEtype() {
		return etype;
	}

	public void setEtype(String etype) {
		this.etype = etype;
	}

	public String getOfftype() {
		return offtype;
	}

	public void setOfftype(String offtype) {
		this.offtype = offtype;
	}

	public String getStartdate() {
		return startdate;
	}

	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}

	public String getEnddate() {
		return enddate;
	}

	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}

	public String getStarttime() {
		return starttime;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	public String getEndtime() {
		return endtime;
	}

	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}

	public String getRegdate() {
		return regdate;
	}

	public void setRegdate(String regdate) {
		this.regdate = regdate;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	@Override
	public String toString() {
		return "NormalOffVO [no=" + no + ", eno=" + eno + ", etype=" + etype + ", offtype=" + offtype + ", startdate="
				+ startdate + ", enddate=" + enddate + ", starttime=" + starttime + ", endtime=" + endtime
				+ ", regdate=" + regdate + ", writer=" + writer + ", getNo()=" + getNo() + ", getEno()=" + getEno()
				+ ", getEtype()=" + getEtype() + ", getOfftype()=" + getOfftype() + ", getStartdate()=" + getStartdate()
				+ ", getEnddate()=" + getEnddate() + ", getStarttime()=" + getStarttime() + ", getEndtime()="
				+ getEndtime() + ", getRegdate()=" + getRegdate() + ", getWriter()=" + getWriter() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}

}
