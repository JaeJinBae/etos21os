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
	.popup_content > table tr > td > button{
		font-size: 15px;
		background: #353c46;
		color: #fff;
		letter-spacing: 1px;
		padding:4px;
		border-radius: 4px;
		margin-left:10px;
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
	.popup_employee_register > table tr:nth-child(5) td > input[name='id']{
		width:150px;
	}
	.popup_employee_register_submit_wrap{
		width: 100%;
		margin: 15px auto;
	}
	.popup_employee_register_submit_wrap > p{
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
	.popup_employee_update_submit_wrap{
		width: 100%;
		margin: 15px auto;
	}
	.popup_employee_update_submit_wrap > p{
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
<div class="popup_employee_register popup_content">
	<h2>직원등록</h2>
	<table>
		<tr>
			<th>▶ 이름</th>
			<td><input type="text" name="name"></td>
		</tr>
		<tr>
			<th>▶ 연락처</th>
			<td><input type="text" name="phone" placeholder="ex)010-1234-1234"></td>
		</tr>
		<tr>
			<th>▶ 등급</th>
			<td>
				<select name="type">
					<option value="doctor">의사</option>
					<option value="therapist">치료사</option>
					<option value="nurse">간호사</option>
					<option value="manager">관리자</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>▶ 레벨</th>
			<td>
				<select name="level">
					<option value="lv1">레벨1</option>
					<option value="lv2">레벨2</option>
					<option value="lv3">레벨3</option>
					<option value="lv4">레벨4</option>
					<option value="lv5">레벨5</option>
					<option value="lv6">레벨6</option>
					<option value="lv7">레벨7</option>
					<option value="lv8">레벨8</option>
					<option value="lv9">레벨9</option>
					<option value="lv10">레벨10</option>
					<option value="lv11">레벨11</option>
					<option value="lv12">레벨12</option>
					<option value="lv13">레벨13</option>
					<option value="lv14">레벨14</option>
					<option value="lv15">레벨15</option>
					<option value="lv16">레벨16</option>
					<option value="lv17">레벨17</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>▶ ID</th>
			<td><input type="text" name="id" placeholder="영문, 숫자만 가능"><input type="hidden" name="id_check" value="no"><button class="id_duplication_check_btn">중복확인</button></td>
		</tr>
		<tr>
			<th>▶ 비밀번호</th>
			<td><input type="password" name="pw"></td>
		</tr>
		<tr>
			<th>▶ 비밀번호확인</th>
			<td><input type="password" name="pwconfirm"></td>
		</tr>
		<tr>
			<th>▶ 생년월일</th>
			<td><input type="text" name="birth" value="" placeholder="ex)1999-09-09"></td>
		</tr>
		<tr>
			<th>▶ 성별</th>
			<td>
				<select name="gender">
					<option value="남">남</option>
					<option value="여">여</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>▶ 메모</th>
			<td><input type="text" name="memo" value=""></td>
		</tr>
	</table>
	<div class="popup_employee_register_submit_wrap">
		<p>저장</p>
		<p>닫기</p>
	</div>
</div><!-- popup_employee_register end -->

<div class="popup_employee_update popup_content">
	<h2>직원정보수정</h2>
	<input name="eno" type="hidden" value="">
	<table>
		<tr>
			<th>▶ 이름</th>
			<td><input type="text" value="" name="name"></td>
		</tr>
		<tr>
			<th>▶ 연락처</th>
			<td><input type="text" value="" name="phone" placeholder="ex)010-1234-1234"></td>
		</tr>
		<tr>
			<th>▶ 등급</th>
			<td>
				<select name="type">
					<option value="doctor">의사</option>
					<option value="therapist">치료사</option>
					<option value="nurse">간호사</option>
					<option value="manager">관리자</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>▶ 레벨</th>
			<td>
				<select name="level">
					<option value="lv1">레벨1</option>
					<option value="lv2">레벨2</option>
					<option value="lv3">레벨3</option>
					<option value="lv4">레벨4</option>
					<option value="lv5">레벨5</option>
					<option value="lv6">레벨6</option>
					<option value="lv7">레벨7</option>
					<option value="lv8">레벨8</option>
					<option value="lv9">레벨9</option>
					<option value="lv10">레벨10</option>
					<option value="lv11">레벨11</option>
					<option value="lv12">레벨12</option>
					<option value="lv13">레벨13</option>
					<option value="lv14">레벨14</option>
					<option value="lv15">레벨15</option>
					<option value="lv16">레벨16</option>
					<option value="lv17">레벨17</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>▶ ID</th>
			<td><input type="text" name="id" value="" placeholder="영문, 숫자만 가능" readonly="readonly"></td>
		</tr>
		<tr>
			<th>▶ 비밀번호</th>
			<td><input type="password" name="pw"></td>
		</tr>
		<tr>
			<th>▶ 비밀번호확인</th>
			<td><input type="password" name="pwconfirm"></td>
		</tr>
		<tr>
			<th>▶ 생년월일</th>
			<td><input type="text" name="birth" value="" placeholder="ex)1999-09-09"></td>
		</tr>
		<tr>
			<th>▶ 성별</th>
			<td>
				<select name="gender">
					<option value="남">남</option>
					<option value="여">여</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>▶ 메모</th>
			<td><input type="text" name="memo" value=""></td>
		</tr>
	</table>
	<div class="popup_employee_update_submit_wrap">
		<p>저장</p>
		<p>닫기</p>
	</div>
</div><!-- popup_employee_update end -->