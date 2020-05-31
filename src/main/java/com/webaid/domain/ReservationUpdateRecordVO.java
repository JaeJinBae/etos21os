package com.webaid.domain;

public class ReservationUpdateRecordVO {
	private int no;
	private int rno;
	private String rtype;
	private int pno;
	private String pname;
	private String before_info;
	private String after_info;
	private String update_type;
	private String update_info;
	private String update_memo;

	public ReservationUpdateRecordVO() {
		super();
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
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

	public String getBefore_info() {
		return before_info;
	}

	public void setBefore_info(String before_info) {
		this.before_info = before_info;
	}

	public String getAfter_info() {
		return after_info;
	}

	public void setAfter_info(String after_info) {
		this.after_info = after_info;
	}

	public String getUpdate_type() {
		return update_type;
	}

	public void setUpdate_type(String update_type) {
		this.update_type = update_type;
	}

	public String getUpdate_info() {
		return update_info;
	}

	public void setUpdate_info(String update_info) {
		this.update_info = update_info;
	}

	public String getUpdate_memo() {
		return update_memo;
	}

	public void setUpdate_memo(String update_memo) {
		this.update_memo = update_memo;
	}

	@Override
	public String toString() {
		return "ReservationUpdateRecordVO [no=" + no + ", rno=" + rno + ", rtype=" + rtype + ", pno=" + pno + ", pname="
				+ pname + ", before_info=" + before_info + ", after_info=" + after_info + ", update_type=" + update_type
				+ ", update_info=" + update_info + ", update_memo=" + update_memo + "]";
	}

}
