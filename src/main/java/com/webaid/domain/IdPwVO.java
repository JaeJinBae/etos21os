package com.webaid.domain;

public class IdPwVO {
	private String id;
	private String pw;

	public IdPwVO() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	@Override
	public String toString() {
		return "IdPwVO [id=" + id + ", pw=" + pw + "]";
	}

}
