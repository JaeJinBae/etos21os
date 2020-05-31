package com.webaid.domain;

public class SmsRecordVO {
	private int no;
	private String receiver;
	private String sender;
	private String phone;
	private String rdate;
	private String state;
	private String content;

	public SmsRecordVO() {
		super();
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getRdate() {
		return rdate;
	}

	public void setRdate(String rdate) {
		this.rdate = rdate;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "SmsRecordVO [no=" + no + ", receiver=" + receiver + ", sender=" + sender + ", phone=" + phone
				+ ", rdate=" + rdate + ", state=" + state + ", content=" + content + "]";
	}

	

}
