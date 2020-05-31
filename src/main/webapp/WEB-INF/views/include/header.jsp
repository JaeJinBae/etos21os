<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<style>
	.header_wrap{
		width:100%;
		min-width: 1200px;
		background: #353c46;
		/* border-bottom:2px solid lightgray; */
	}
	.header_div{
		width:100%;
		/* padding:20px 0; */
		margin: 0 auto;
		overflow:hidden;
		padding-right: 30px;
	}
	.header_inner1{
		float:left;
		width: 265px;
		text-align: center;
		background: #fff;
	}
	.header_inner2{
		float:left;
	}
	.header_inner3{
		float: right;
		
	}
	.header_inner, .header_inner > a{
		font-size: 15px;
	}
	
	.header_inner1 > a{
		font-weight:bold;
		color: #fff;
		color: #3f3f3f;
		font-size:30px;
		line-height: 62px;
		letter-spacing: 5px;
	}
	.header_inner1 > a > img{
		width: 230px;
		margin-top: 5px;
	}
	.header_inner2 > ul{
		overflow: hidden;
	}
	.header_inner2 > ul > li{
		float: left;
		line-height:62px;
		padding: 0 15px;
	}
	.header_inner2 > ul > li > a{
		color: #fff;
		font-size:17px;
	}
	#reservation_view_btn{
		display:none;
	}
	.header_inner3 > ul{
		text-align: center;
	}
	.header_inner3 > ul > li{
		font-size:15px;
		color: #fff;
		line-height: 30px;
	}
	.header_inner3 > ul > li > span{
		/* font-weight: bold; */
	}
	.header_inner3 > ul > li > a{
		color: #fff;	
	}
	.header_inner3 > ul > li > a > img{
		width: 20px;
		vertical-align: text-bottom;
	}
	
</style>
<script>
function get_employee_byEno(eno){
	var dt;
	
	$.ajax({
		url:"${pageContext.request.contextPath}/employeeGetByEno/"+eno,
		type:"get",
		dataTyp:"json",
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

function post_employee_update2(employee){
	$.ajax({
		url:"${pageContext.request.contextPath}/employeeUpdate2",
		type:"post",
		dataType:"text",
		data:employee,
		async:false,
		success:function(json){
			$(".popup_mypage").css("display", "none");
			$(".popup_wrap").css("display","none");
			$(".popup_mypage > table tr > td > input[name='pw']").val("");
			$(".popup_mypage > table tr > td > input[name='pwConfirm']").val("");
			alert("정보수정이 완료되었습니다.");
		}
	});
}

$(function(){
	
	var session_id=$("#session_value").val();
	
	if(session_id == null || session_id == ""){
		location.replace("${pageContext.request.contextPath}/");
	}
	
	$("input").attr("autocomplete", "off");
	
	$(".header_inner2 > ul > li:last-child > a").click(function(e){
		e.preventDefault();
		window.open($(this).prop("href"),"","");
	});
	
	$(".header_inner3 > ul > li:last-child > a:first-child").click(function(e){
		e.preventDefault();
		var eno = $("#session_eno").val();
		var json = get_employee_byEno(eno);
		$(".popup_mypage > table tr > td > input[name='name']").val(json.name);
		$(".popup_mypage > table tr > td > input[name='birth']").val(json.birth);
		$(".popup_mypage > table tr > td > input[name='phone']").val(json.phone);
		$(".popup_mypage > table tr > td > input[name='id']").val(json.id);
		$(".popup_wrap").css("display","block");
		$(".popup_mypage").css("display","block");
	});
	
	$(".popup_mypage_btn_wrap > p").click(function(){
		var btn_index = $(this).index();
		if(btn_index == 0){
			var eno = $("#session_eno").val();
			var name = $(".popup_mypage > table tr > td > input[name='name']").val();
			var birth = $(".popup_mypage > table tr > td > input[name='birth']").val();
			var phone = $(".popup_mypage > table tr > td > input[name='phone']").val();
			var id = $(".popup_mypage > table tr > td > input[name='id']").val();
			var pw = $(".popup_mypage > table tr > td > input[name='pw']").val();
			var pwConfirm = $(".popup_mypage > table tr > td > input[name='pwConfirm']").val();
			
			if(name == ""){
				alert("이름을 입력해주세요.");
				return false;
			}
			if(birth == ""){
				alert("생년월일을 입력해주세요.");
				return false;
			}
			if(phone == ""){
				alert("연락처를 입력해주세요.");
				return false;
			}
			if(pw != pwConfirm){
				alert("비밀번호가 일치하지 않습니다.");
				return false;
			}
			var vo = {eno:eno, name:name, birth:birth, phone:phone, id:id, pw:pw}
			
			post_employee_update2(vo);
		}else{
			$(".popup_mypage").css("display","none");
			$(".popup_wrap").css("display","none");
		}
	});
	
	$(document).keyup(function(e){
		if(e.which == 27){
			$(".popup_content input").val("");
			$(".popup_content select > option").eq(0).prop("selected", true);
			$(".popup_clinic_reservation_register .fix_clinic_res_tr").css("display", "none");
			$(".popup_therapy_reservation_register .fix_therapy_res_tr").css("display", "none");
			$(".popup_content").css("display", "none");
			$(".popup_wrap").css("display", "none");
		}
	});
	
	$(window).scroll(function(){
		$(".all_wrap").css("margin-left", 0-$(this).scrollLeft());
	});
});
</script>
<div class="header_wrap">
	<input id="session_value" type="hidden" value="${sessionScope.id}">
	<input id="session_eno" type="hidden" value="${sessionScope.eno}">
	<input id="session_login_name" type="hidden" value="${sessionScope.name}">
	<div class="header_div">
		<c:if test="${sessionScope.id != null}">
			<div class="header_inner header_inner1">
				<c:if test="${sessionScope.type =='manager'}">
					<a href="${pageContext.request.contextPath}/sub_main"><img src="${pageContext.request.contextPath}/resources/images/logo.png"></a>
				</c:if>
				<c:if test="${sessionScope.type =='doctor'}">
					<a href="${pageContext.request.contextPath}/doctor"><img src="${pageContext.request.contextPath}/resources/images/logo.png"></a>
				</c:if>
				<c:if test="${sessionScope.type =='therapist'}">
					<a href="${pageContext.request.contextPath}/therapist"><img src="${pageContext.request.contextPath}/resources/images/logo.png"></a>
				</c:if>
				<c:if test="${sessionScope.type =='nurse'}">
					<a href="${pageContext.request.contextPath}/nurse"><img src="${pageContext.request.contextPath}/resources/images/logo.png"></a>
				</c:if>
			</div>
			<div class="header_inner header_inner2">
				<ul>
					<c:if test="${sessionScope.type =='manager'}">
						<li><a href="${pageContext.request.contextPath}/sub_main">예약관리</a></li>
						<li><a href="${pageContext.request.contextPath}/employeeView">직원관리</a></li>
						<li><a href="${pageContext.request.contextPath}/clinicView">코드관리</a></li>
						<li><a href="${pageContext.request.contextPath}/hospitalInfo">병원시간관리</a></li>
						<li><a href="${pageContext.request.contextPath}/smsView">문자관리</a></li>
						<li><a href="${pageContext.request.contextPath}/statistic">통계관리</a></li>
					</c:if>
					<c:if test="${sessionScope.type =='doctor'}">
						<li><a href="${pageContext.request.contextPath}/doctor">예약관리</a></li>
					</c:if>
					<c:if test="${sessionScope.type =='therapist'}">
						<li><a href="${pageContext.request.contextPath}/therapist">예약관리</a></li>
					</c:if>
					<c:if test="${sessionScope.type =='nurse'}">
						<li><a href="${pageContext.request.contextPath}/nurse">예약관리</a></li>
						<li><a href="${pageContext.request.contextPath}/employeeView">직원관리</a></li>
						<li><a href="${pageContext.request.contextPath}/clinicView">코드관리</a></li>
						<li><a href="${pageContext.request.contextPath}/hospitalInfo">병원시간관리</a></li>
						<li><a href="${pageContext.request.contextPath}/smsView">문자관리</a></li>
					</c:if>
					<li><a href="">홈페이지</a></li>
				</ul>
			</div>
			<div class="header_inner header_inner3">
				<ul>
					<li><span>${sessionScope.name}(${sessionScope.type})</span>님 반갑습니다.</li>
					<li><a href="${pageContext.request.contextPath}/"><img src="${pageContext.request.contextPath}/resources/images/icon_info_white.png"> MyPage</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="${pageContext.request.contextPath}/logout"><img src="${pageContext.request.contextPath}/resources/images/icon_logout_white.png"> Logout</a></li>
				</ul>
			</div>
		</c:if>
	</div>
	
</div>