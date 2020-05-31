package com.webaid.domain;

public class DelFixSchVO {
	private int pno;
	private String pname;
	private String fix_day_start;
	private String fix_day_end;
	private String fix_day;
	private int prevRtime;
	private int newRtime;
	private String req_day_start;
	private String req_day_end;
	private int clinic;
	private String clinic_name;
	private int eno;
	private String ename;
	private String rtype;
	private String reception_info;

	public DelFixSchVO() {
		super();
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

	public String getFix_day_start() {
		return fix_day_start;
	}

	public void setFix_day_start(String fix_day_start) {
		this.fix_day_start = fix_day_start;
	}

	public String getFix_day_end() {
		return fix_day_end;
	}

	public void setFix_day_end(String fix_day_end) {
		this.fix_day_end = fix_day_end;
	}

	public String getFix_day() {
		return fix_day;
	}

	public void setFix_day(String fix_day) {
		this.fix_day = fix_day;
	}

	public int getPrevRtime() {
		return prevRtime;
	}

	public void setPrevRtime(int prevRtime) {
		this.prevRtime = prevRtime;
	}

	public int getNewRtime() {
		return newRtime;
	}

	public void setNewRtime(int newRtime) {
		this.newRtime = newRtime;
	}

	public String getReq_day_start() {
		return req_day_start;
	}

	public void setReq_day_start(String req_day_start) {
		this.req_day_start = req_day_start;
	}

	public String getReq_day_end() {
		return req_day_end;
	}

	public void setReq_day_end(String req_day_end) {
		this.req_day_end = req_day_end;
	}

	public int getClinic() {
		return clinic;
	}

	public void setClinic(int clinic) {
		this.clinic = clinic;
	}

	public String getClinic_name() {
		return clinic_name;
	}

	public void setClinic_name(String clinic_name) {
		this.clinic_name = clinic_name;
	}

	public int getEno() {
		return eno;
	}

	public void setEno(int eno) {
		this.eno = eno;
	}

	public String getEname() {
		return ename;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public String getRtype() {
		return rtype;
	}

	public void setRtype(String rtype) {
		this.rtype = rtype;
	}

	public String getReception_info() {
		return reception_info;
	}

	public void setReception_info(String reception_info) {
		this.reception_info = reception_info;
	}

	@Override
	public String toString() {
		return "DelFixSchVO [pno=" + pno + ", pname=" + pname + ", fix_day_start=" + fix_day_start + ", fix_day_end="
				+ fix_day_end + ", fix_day=" + fix_day + ", prevRtime=" + prevRtime + ", newRtime=" + newRtime
				+ ", req_day_start=" + req_day_start + ", req_day_end=" + req_day_end + ", clinic=" + clinic
				+ ", clinic_name=" + clinic_name + ", eno=" + eno + ", ename=" + ename + ", rtype=" + rtype
				+ ", reception_info=" + reception_info + "]";
	}

}
