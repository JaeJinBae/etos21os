<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<% request.setCharacterEncoding("UTF-8");%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>21세기연합정형외과의원 예약관리</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/common.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
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
.header_inner2 > ul > li:nth-child(4){
	background: #0068b8;
}
.header_inner2 > ul > li:nth-child(4) > a{
	color: #fff; 
	font-weight: bold;
}
.aside1{
	width:1000px;
	margin-left:50px;
	margin-top:50px;
	overflow:hidden;
}
.aside_title{
	width: 100%;
	margin-bottom: 50px;
}
.aside_title > img {
	width:30px;
	vertical-align: middle;
}
.aside_title > span{
	font-size:22px;
	font-weight: bold;
	margin: 0 30px 0 5px;
	vertical-align: middle;
}
.aside_title > .line{
	width:600px;
	height:3px;
	background: #353c46;
	display: inline-block;
	vertical-align: middle;
}
.aside1 > .table_wrap{
	float:left;
	margin-top: 15px;
	width: 500px;
}
.aside1 > .table_wrap > table {
	width:100%;
	border-top: 2px solid gray;
}
.aside1 > .table_wrap > table tr:first-child{
	background: #f5f5f5;
}
.aside1 > .table_wrap > table tr th{
	font-size:17px;
	text-align: center;
	font-weight: bold;
	border-bottom: 2px solid #efefef;
	padding: 10px 0;
}
.aside1 > .table_wrap > table tr > td{
	font-size:15px;
	text-align: center;
	padding: 8px 0;
	border-bottom: 1px solid lightgray;
}
.table_wrap > table tr > td > select{
	font-size:15px;
	padding:2px;
}
.hos_time_btn_wrap{
	width: 100%; 
	margin: 20px;
	text-align: center;
}
.hos_time_btn_wrap > button{
	margin: 0 auto;
	font-size: 15px;
	padding: 5px 10px;
	letter-spacing: 1px; 
	background: #1e866a;
	border-radius: 3px;
	color: #fff;
}
</style>
<script>
function get_hospitalInfo_all(){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/hospitalInfoGetAll",
		type: "get",
		dataType:"json", 
		async: false,
		success:function(json){
			dt = json;
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
	return dt;
}

function update_hospitalInfo(list){
	console.log(list);
	$.ajax({
		url:"${pageContext.request.contextPath}/updateHospitalInfo",
		type: "POST",
		dataType:"text",
		data:JSON.stringify(list),
		contentType : "application/json; charset=UTF-8",
		async: false,
		success:function(json){
			console.log("결과는 "+json);
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

function setting_time(){
	var json = get_hospitalInfo_all();
	var arrDay = ["mon", "tue", "wed", "thu", "fri", "sat", "week"];
	var st = "";
	var et = "";
	
	for(var i=0; i<arrDay.length; i++){
		st = Number(json[i].start_time)/60;
		et = Number(json[i].end_time)/60;
		$(".table_wrap > table tr > td select[name='"+arrDay[i]+"_st'] > option[value='"+st+"']").prop("selected", true);
		$(".table_wrap > table tr > td select[name='"+arrDay[i]+"_et'] > option[value='"+et+"']").prop("selected", true);
	}
	
}
$(function(){
	setting_time();
	
	$(".hos_time_btn_wrap").click(function(){
		var dow;
		var st;
		var et;
		var arrDay = ["", "mon", "tue", "wed", "thu", "fri", "sat", "week"];
		var arrVO = [];
		for(var i=1; i<8; i++){
			st = Number($(".table_wrap > table tr:eq("+i+") > td > select[name='"+arrDay[i]+"_st']").val())*60;
			et = Number($(".table_wrap > table tr:eq("+i+") > td > select[name='"+arrDay[i]+"_et']").val())*60;
			
			
			arrVO.push({day:arrDay[i], start_time:st, end_time:et});
		}
		update_hospitalInfo(arrVO);
	});
	
});
</script>
</head>
<body>
	<div class="popup_wrap">
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
					<td><input type="text" name="birth"></td>
				</tr>
				<tr>
					<th>▶ 연락처</th>
					<td><input type="text" name="phone"></td>
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
	</div>
	<div class="all_wrap">
		<div class="header">
			<jsp:include page="../include/header.jsp"></jsp:include>
		</div>
		<div class="section">
			<div class="aside1">
				<div class="aside_title">
					<img src="${pageContext.request.contextPath}/resources/images/icon_wheel.png">
					<span>병원시간관리</span>
					<div class="line"></div> 
				</div>
				<div class="table_wrap">
					<table>
						<tr>
							<th>요일</th>
							<th>시작시간</th>
							<th>종료시간</th>
						</tr>
						<tr>
							<th>월</th>
							<td>
								<select name="mon_st">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
							<td>
								<select name="mon_et">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
						</tr>
						<tr>
							<th>화</th>
							<td>
								<select name="tue_st">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
							<td>
								<select name="tue_et">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
						</tr>
						<tr>
							<th>수</th>
							<td>
								<select name="wed_st">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
							<td>
								<select name="wed_et">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
						</tr>
						<tr>
							<th>목</th>
							<td>
								<select name="thu_st">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
							<td>
								<select name="thu_et">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
						</tr>
						<tr>
							<th>금</th>
							<td>
								<select name="fri_st">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
							<td>
								<select name="fri_et">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
						</tr>
						<tr>
							<th>토</th>
							<td>
								<select name="sat_st">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
							<td>
								<select name="sat_et">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
						</tr>
						<tr>
							<th>주간/고정</th>
							<td>
								<select name="week_st">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
							<td>
								<select name="week_et">
									<c:forEach var="num" begin="7" end="24" >
										<option value="${num}">${num}시</option>
									</c:forEach>
								</select>
							</td>
						</tr>
					</table>
					<div class="hos_time_btn_wrap">
						<button>저장</button>
					</div>
				</div><!-- tbl_wrap end -->
			</div><!-- aside1 end -->
		</div><!-- section end -->
		<div class="footer">
		</div>
	</div><!-- all_wrap end -->
</body>
</html>