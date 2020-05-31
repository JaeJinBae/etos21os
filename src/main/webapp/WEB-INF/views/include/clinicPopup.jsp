<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<style>
	.popup_wrap{
		width:100%;
		position:fixed;
		top:0;
		left:0;
		display:none;
	}
	.popup_bg{
		position: fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background: #111;
		opacity: 0.5;
	}
	.popup_content{
		display:none;
		width:400px;
		background: #f3f3f3;
		margin:0 auto;
		margin-top:100px;
		position: relative;
		z-index: 999;
		text-align: center;
		padding-bottom: 1px;
	}
	.popup_content > h2{
		width:100%;
		padding: 10px 0;
		background: #353c46;
		color: #fff;
		letter-spacing: 2px;
		overflow: hidden;
		vertical-align: middle;
		font-size: 25px;
		font-weight: bold;
	}
	.popup_content > table{
		width:100%;
		margin: 0 auto;
		border-bottom: 2px solid lightgray;
	}
	.popup_content > table tr{
		display:block;
	}
	.popup_content > table tr > th{
		font-size:16px;
		width:145px;
		background: #e9e9e9;
		color: #494949; 
		font-weight: bold;
		letter-spacing: 0.3px;
		padding: 15px 0;
		padding-left: 10px;
		text-align: left;
	}
	.popup_content > table tr > td{
		font-size:15px;
		padding-left: 20px;
	}
	.popup_content > table tr > td > span{
		vertical-align: middle;
	}
	.popup_content > table tr > td > input{
		font-size:15px;
		padding: 3px;
	}
	.popup_content > table tr > td > select{
		font-size: 15px;
		padding: 3px;
	}
	.popup_mypage{
		display:none;
	}
	.popup_mypage > .popup_mypage_btn_wrap{
		width: 100%;
		margin: 15px auto;
	}
	.popup_mypage > .popup_mypage_btn_wrap > p{
		display: inline-block;
		padding:8px 10px;
		font-size:15px;
		margin-left:20px;
		cursor: pointer;
		background: #595959;
		color: #fff;
		border-radius: 4px;
		letter-spacing: 1px;
	}
	.popup_clinic_register_submit_wrap{
		width: 100%;
		margin: 15px auto;
	}
	.popup_clinic_register_submit_wrap > p{
		display: inline-block;
		padding:8px 10px;
		font-size:15px;
		margin-left:20px;
		cursor: pointer;
		background: #595959;
		color: #fff;
		border-radius: 4px;
		letter-spacing: 1px;
	}
	.popup_clinic_update_submit_wrap{
		width: 100%;
		margin: 15px auto;
	}
	.popup_clinic_update_submit_wrap > p{
		display: inline-block;
		padding:8px 10px;
		font-size:15px;
		margin-left:20px;
		cursor: pointer;
		background: #595959;
		color: #fff;
		border-radius: 4px;
		letter-spacing: 1px;
	}
</style>
<div class="popup_bg">
</div>
<div class="popup_mypage popup_content">
		<h2>내정보 수정</h2>
		<table>
			<tr>
				<th>▶ 이름</th>
				<td><input type="text" name="name"></td>
			</tr>
			<tr>
				<th>▶ 생년월일</th>
				<td><input type="text" name="birth" placeholder="ex) 1999-09-09"></td>
			</tr>
			<tr>
				<th>▶ 연락처</th>
				<td><input type="text" name="phone" placeholder="ex) 010-1234-1234"></td>
			</tr>
			<tr>
				<th>▶ 아이디</th>
				<td><input type="text" name="id" readonly="readonly"></td>
			</tr>
			<tr>
				<th>▶ 변경 비밀번호</th>
				<td><input type="password" name="pw" placeholder="변경 시 입력해주세요."></td>
			</tr>
			<tr>
				<th>▶  비밀번호 확인</th>
				<td><input type="password" name="pwConfirm" placeholder="변경 시 입력해주세요."></td>
			</tr>
		</table>
		<div class="popup_mypage_btn_wrap">
			<p>저장</p>
			<p>닫기</p>
		</div>
	</div>
<div class="popup_clinic_register popup_content">
	<h2>코드등록</h2>
	<table>
		<tr>
			<th>▶ 코드명</th>
			<td><input type="text" name="code_name"></td>
		</tr>
		<tr>
			<th>▶ 문자전송코드명</th>
			<td><input type="text" name="code_smsname"></td>
		</tr>
		<tr>
			<th>▶ 코드분류</th>
			<td>
				<select name="code_type">
					<option value="진료">진료</option>
					<option value="치료">치료</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>▶ 진행시간</th>
			<td>
				<select name="time">
					<option value="0">00분</option>
					<option value="10">10분</option>
					<option value="20">20분</option>
					<option value="30">30분</option>
					<option value="40">40분</option>
					<option value="50">50분</option>
					<option value="60">60분</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>▶ 색깔</th>
			<td><input type="text" name="color" placeholder="ex) #dfdfdf 색상코드표참고"></td>
		</tr>
	</table>
	<div class="popup_clinic_register_submit_wrap">
		<p>저장</p>
		<p>닫기</p>
	</div>
</div><!-- popup_clinic_register end -->

<div class="popup_clinic_update popup_content">
	<h2>코드정보수정</h2>
	<input name="cno" type="hidden" value="">
	<table>
		<tr>
			<th>▶ 코드명</th>
			<td><input type="text" name="code_name"></td>
		</tr>
		<tr>
			<th>▶ 문자전송코드명</th>
			<td><input type="text" name="code_smsname"></td>
		</tr>
		<tr>
			<th>▶ 코드분류</th>
			<td>
				<select name="code_type">
					<option value="진료">진료</option>
					<option value="치료">치료</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>▶ 진행시간</th>
			<td>
				<select name="time">
					<option value="0">00분</option>
					<option value="10">10분</option>
					<option value="20">20분</option>
					<option value="30">30분</option>
					<option value="40">40분</option>
					<option value="50">50분</option>
					<option value="60">60분</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>▶ 색깔</th>
			<td><input type="text" name="color"></td>
		</tr>
	</table>
	<div class="popup_clinic_update_submit_wrap">
		<p>저장</p>
		<p>닫기</p>
	</div>
</div><!-- popup_clinic_update end -->