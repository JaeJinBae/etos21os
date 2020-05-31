package com.webaid.domain;

public class ReservationRecordVO implements Comparable<ReservationRecordVO> {
	private int no;
	private int pno;
	private int chartno;
	private String pname;
	private String phone;
	private String ename;
	private int rno;
	private String rtype;
	private String cname;
	private String rdate;
	private String rtime;
	private String reception_info;
	private String reception_memo;
	private String therapy_info;
	private String register_info;
	private String result;
	private String result_memo;

	public ReservationRecordVO() {
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

	public int getChartno() {
		return chartno;
	}

	public void setChartno(int chartno) {
		this.chartno = chartno;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEname() {
		return ename;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public int getRno() {
		return rno;
	}

	public void setRno(int rno) {
		this.rno = rno;
	}

	public String getRtype() {
		return rtype;
	}

	public void setRtype(String rtype) {
		this.rtype = rtype;
	}

	public String getCname() {
		return cname;
	}

	public void setCname(String cname) {
		this.cname = cname;
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

	public String getReception_info() {
		return reception_info;
	}

	public void setReception_info(String reception_info) {
		this.reception_info = reception_info;
	}

	public String getTherapy_info() {
		return therapy_info;
	}

	public void setTherapy_info(String therapy_info) {
		this.therapy_info = therapy_info;
	}

	public String getReception_memo() {
		return reception_memo;
	}

	public void setReception_memo(String reception_memo) {
		this.reception_memo = reception_memo;
	}

	public String getRegister_info() {
		return register_info;
	}

	public void setRegister_info(String register_info) {
		this.register_info = register_info;
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
		return "ReservationRecordVO [no=" + no + ", pno=" + pno + ", chartno=" + chartno + ", pname=" + pname
				+ ", phone=" + phone + ", ename=" + ename + ", rno=" + rno + ", rtype=" + rtype + ", cname=" + cname
				+ ", rdate=" + rdate + ", rtime=" + rtime + ", reception_info=" + reception_info + ", reception_memo="
				+ reception_memo + ", therapy_info=" + therapy_info + ", register_info=" + register_info + ", result="
				+ result + ", result_memo=" + result_memo + "]";
	}

	@Override
	public int compareTo(ReservationRecordVO o) {
		return this.rdate.compareTo(o.rdate);
	}

}
