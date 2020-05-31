package com.webaid.domain;

public class FixClinicReservationVO {
	private int rno;
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
	private String fix_day;
	private String fix_day_start;
	private String fix_day_end;
	private String writer;
	private String regdate;
	private String desk_state;
	private String desk_state_writer;
	private String desk_state_regdate;
	private String result;
	private String result_memo;

	public FixClinicReservationVO() {
		super();
	}

	public int getRno() {
		return rno;
	}

	public void setRno(int rno) {
		this.rno = rno;
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

	public String getFix_day() {
		return fix_day;
	}

	public void setFix_day(String fix_day) {
		this.fix_day = fix_day;
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

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getRegdate() {
		return regdate;
	}

	public void setRegdate(String regdate) {
		this.regdate = regdate;
	}

	public String getDesk_state() {
		return desk_state;
	}

	public void setDesk_state(String desk_state) {
		this.desk_state = desk_state;
	}

	public String getDesk_state_writer() {
		return desk_state_writer;
	}

	public void setDesk_state_writer(String desk_state_writer) {
		this.desk_state_writer = desk_state_writer;
	}

	public String getDesk_state_regdate() {
		return desk_state_regdate;
	}

	public void setDesk_state_regdate(String desk_state_regdate) {
		this.desk_state_regdate = desk_state_regdate;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getResult_memo() {
		return result_memo;
	}

	public void setResult_memo(String result_memo) {
		this.result_memo = result_memo;
	}

	@Override
	public String toString() {
		return "FixClinicReservationVO [rno=" + rno + ", pno=" + pno + ", pname=" + pname + ", chart_no=" + chart_no
				+ ", eno=" + eno + ", memo=" + memo + ", clinic=" + clinic + ", clinic_name=" + clinic_name + ", rtype="
				+ rtype + ", rdate=" + rdate + ", rtime=" + rtime + ", fix_day=" + fix_day + ", fix_day_start="
				+ fix_day_start + ", fix_day_end=" + fix_day_end + ", writer=" + writer + ", regdate=" + regdate
				+ ", desk_state=" + desk_state + ", desk_state_writer=" + desk_state_writer + ", desk_state_regdate="
				+ desk_state_regdate + ", result=" + result + ", result_memo=" + result_memo + "]";
	}

}
