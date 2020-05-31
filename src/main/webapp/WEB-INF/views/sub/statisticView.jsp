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
	.header_inner2 > ul > li:nth-child(6){
		background: #0068b8;
	}
	.header_inner2 > ul > li:nth-child(6) > a{
		color: #fff; 
		font-weight: bold;
	}
	.aside1{
		width:1000px;
		margin:50px;
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
	.aside1 > .aside1_selectBox_wrap{
		float:left;
	}
	.aside1_selectBox_wrap > select{
		font-size: 15px;
		padding: 3px 5px;
	}
	.aside1_selectBox_wrap > input{
		font-size: 15px;
		padding: 3px 5px;
	}
	.aside1_selectBox_wrap > button{
		font-size: 15px;
		padding: 5px 10px;
		margin-left: 10px;
		letter-spacing: 1px; 
		background: #1e866a;
		border-radius: 3px;
		color: #fff;
	}
	.aside1 > .table_wrap{
		float:left;
		margin-top: 20px;
	}
	.aside1 > .table_wrap > table {
		width:100%;
		border-top: 2px solid gray;
	}
	.aside1 > .table_wrap > table tr:first-child{
		background: #f5f5f5;
	}
	.aside1 > .table_wrap > table tr th{
		font-size:15px;
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
	.excelDownF > img{
		width: 20px;
		display: none;
	}
	.excelDownF > input[type='submit']{
		background: url("${pageContext.request.contextPath}/resources/images/icon_download.png") no-repeat;
		background-size: contain;
		width: 30px;
		height: 30px;
		border: none;
		cursor: pointer;
	}
</style>
<script>
function get_reservationCount_byDate(date){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/reservationCountByDate/"+date,
		type:"get",
		dataType:"json",
		async:false,
		success:function(json){
			dt = json;
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
	return dt;
}

function draw_cureCnt(date){
	var json = get_reservationCount_byDate(date);
	var splitStr;
	var target;
	var ntrTotal = 0;
	var ftrTotal = 0;
	var ntrNum;
	var ftrNum;
	var totalNum;
	
	//각 tr에 ntr, ftr 값 넣기
	$(json).each(function(){
		splitStr = this.split("_");
		target = "."+splitStr[0]+"_"+splitStr[1];
		$(target).text(splitStr[2]);
		
		if(splitStr[1] == "ntr"){
			ntrTotal += Number(splitStr[2]);
		}else if(splitStr[1] == "ftr"){
			ftrTotal += Number(splitStr[2])
		}
		
		$("."+splitStr[0]+"_total").text();
	});
	
	//전체 ntr, ftr total값
	 $(".total_ntr").text(ntrTotal);
	 $(".total_ftr").text(ftrTotal);
	
	 //각 tr의 total값 계산해서 넣기
	 $(".table_wrap > table tr").each(function(){
		if($(this).index() > 0){
			ntrNum = Number($(this).find("td").eq(1).text());
			ftrNum = Number($(this).find("td").eq(2).text());
			totalNum = ntrNum+ftrNum;
			$(this).find("td").eq(3).text(totalNum);
		}
	 });
}

function statistic_base_setting(){
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth()+1;
	$(".aside1_selectBox_wrap > select[name='sb_year'] > option[value='"+nowYear+"']").prop("selected", true);
	$(".aside1_selectBox_wrap > select[name='sb_month'] > option[value='"+nowMonth+"']").prop("selected", true);
	nowMonth=(nowMonth>9?'':'0')+nowMonth;
	
	draw_cureCnt(nowYear+"-"+nowMonth);
}

function excelDown(eno, date){
	console.log(eno+"/"+date);
	$.ajax({
		url:"${pageContext.request.contextPath}/statisticDown/"+eno+"/"+date,
		type:"post",
		dataType:"text",
		async:false,
		success:function(json){
			dt = json;
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

$(function(){
	statistic_base_setting();
	
	$(document).on("click", ".aside1_selectBox_wrap > button", function(){
		var selYear = $(".aside1_selectBox_wrap > select[name='sb_year']").val();
		var selMonth = $(".aside1_selectBox_wrap > select[name='sb_month']").val();
		selMonth=(selMonth>9?'':'0')+selMonth;
		
		draw_cureCnt(selYear+"-"+selMonth);
	});
	
	$(".excelDownF").submit(function(e){
		//e.preventDefault();
		var eno = $(this).parent().parent().find("input[name='eno']").val();
		var selYear = $(".aside1_selectBox_wrap > select[name='sb_year']").val();
		var selMonth = $(".aside1_selectBox_wrap > select[name='sb_month']").val();
		selMonth=(selMonth>9?'':'0')+selMonth;
		var selDate = selYear+"-"+selMonth;
		$(this).prop("action","${pageContext.request.contextPath}/statisticDown/"+eno+"/"+selDate);
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
					<span>통계관리</span>
					<div class="line"></div> 
				</div>
				<div class="aside1_selectBox_wrap">
					<select name="sb_year">
						<c:forEach var="idx" begin="2019" end="2080">
							<option value="${idx}">${idx}년</option>
						</c:forEach>
					</select>
					<select name="sb_month">
						<c:forEach var="idx" begin="1" end="12">
							<option value="${idx}">${idx}월</option>
						</c:forEach>
					</select>
					<button>검색</button>
				</div>
				<div class="table_wrap">
					<table>
						<tr>
							<th>치료사</th>
							<th>일반치료</th>
							<th>고정치료</th>
							<th>Total</th>
							<th>엑셀</th>
						</tr>
						<tr>
							<td>Total</td>
							<td class="total_ntr"></td>
							<td class="total_ftr"></td>
							<td class="totalAll"></td>
							<td>-</td>
						</tr>
						<c:forEach var="item" items="${list}">
							<tr class="${item.eno}_tr">
								<td class="${item.eno}_name">${item.name}<input type="hidden" name="eno" value="${item.eno}"></td>
								<td class="${item.eno}_ntr"></td>
								<td class="${item.eno}_ftr"></td>
								<td class="${item.eno}_total"></td>
								<td>
									<form class="excelDownF" method="GET" action="statisticDown/">
										<input type="submit" value="">
									</form>
								</td>
							</tr>
						</c:forEach>
						
					</table>
				</div><!-- table_wrap end -->
			</div>
		</div>
		<div class="footer">
		</div>
	</div>
</body>
</html>