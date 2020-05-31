package com.webaid.domain;

public class PatientVO {
	private int pno;
	private int cno;
	private String name;
	private String phone;
	private String birth;
	private String gender;
	private String main_doctor;
	private String main_doctor_name;
	private String memo;
	private String activation;

	public PatientVO() {
		super();
	}

	public int getPno() {
		return pno;
	}

	public void setPno(int pno) {
		this.pno = pno;
	}

	public int getCno() {
		return cno;
	}

	public void setCno(int cno) {
		this.cno = cno;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getBirth() {
		return birth;
	}

	public void setBirth(String birth) {
		this.birth = birth;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMain_doctor() {
		return main_doctor;
	}

	public void setMain_doctor(String main_doctor) {
		this.main_doctor = main_doctor;
	}

	public String getMain_doctor_name() {
		return main_doctor_name;
	}

	public void setMain_doctor_name(String main_doctor_name) {
		this.main_doctor_name = main_doctor_name;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getActivation() {
		return activation;
	}

	public void setActivation(String activation) {
		this.activation = activation;
	}

	@Override
	public String toString() {
		return "PatientVO [pno=" + pno + ", cno=" + cno + ", name=" + name + ", phone=" + phone + ", birth=" + birth
				+ ", gender=" + gender + ", main_doctor=" + main_doctor + ", main_doctor_name=" + main_doctor_name
				+ ", memo=" + memo + ", activation=" + activation + "]";
	}

}
