package com.webaid.domain;

public class DeskStateVO {
	private String rtype;
	private String rno;
	private String state;
	private String writer;
	private String regdate;
	private String reason;

	public DeskStateVO() {
		super();
	}

	public String getRtype() {
		return rtype;
	}

	public void setRtype(String rtype) {
		this.rtype = rtype;
	}

	public String getRno() {
		return rno;
	}

	public void setRno(String rno) {
		this.rno = rno;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
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

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	@Override
	public String toString() {
		return "DeskStateVO [rtype=" + rtype + ", rno=" + rno + ", state=" + state + ", writer=" + writer + ", regdate="
				+ regdate + ", reason=" + reason + "]";
	}

}
