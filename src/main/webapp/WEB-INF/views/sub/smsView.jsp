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
	.header_inner2 > ul > li:nth-child(5){
		background: #0068b8;
	}
	.header_inner2 > ul > li:nth-child(5) > a{
		color: #fff; 
		font-weight: bold;
	}
	.aside1{
		width:1100px;
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
	.smsInfo{
		width: 300px;
		padding-left: 10px;
		margin-bottom: 40px;
	}
	.smsInfo > p{
		font-size: 18px;
		font-weight: bold;
		border-bottom: 2px solid lightgray;
		margin-bottom: 10px;
		padding-bottom: 5px;
	}
	.smsInfo > p > a{
		font-size: 15px;
		font-weight: normal;
		margin-left: 78px;
	}
	.smsInfo > table{
		width: 100%;
	}
	.smsInfo > table tr{
		
	}
	.smsInfo > table tr > th{
		font-size: 15px;
		font-weight: bold;
		padding: 10px 0;
		border: 1px solid gray;
	}
	.smsInfo > table tr > td{
		width: 100px;
		text-align: center;
		font-sizt: 15px;
		border: 1px solid gray;
	}
	
	.formWrap{
		width: 100%;
		padding-left: 10px;
		overflow: hidden;
	}
	.templateWrap{
		/* width: 100%; */
		margin-bottom: 60px;
		margin-right: 45px;
		float: left;
	}
	.templateWrap > h4{
		
	}
	.templateWrap > h4 > button{
		font-size: 15px;
		padding: 5px 10px;
		background: #1e866a;
		color: #fff;
		border-radius: 5px;
		margin-left: 345px;
	}
	.tempTitle{
		width: 100%;
		overflow: hidden;
	}
	.tempTitle > p{
		width: 230px;
		float:left;
		font-size: 15px;
		text-align: center;
		/* font-weight: bold; */
		margin-right: 15px;
		padding: 15px;
	}
	.templateWrap > ul{
		width: 100%;
		overflow: hidden;
	}
	.templateWrap > ul > li{
		width: 230px;
		height: 411px;
		float:left;
		margin-right: 15px;
		background: url("${pageContext.request.contextPath}/resources/images/icon_phoneFrame.png") no-repeat;
		background-size: contain;
	}
	.templateWrap > ul > li > textarea {
		display: block;
		width: 206px;
		height: 280px;
		margin: 0 auto;
		margin-top: 39px;
		padding: 5px;
		font-size: 14px;
		resize: none;
		scroll-x: none;
	}
	.templateWrap > ul > li > p{
		width: 206px;
		font-size: 14px;
		background: #fff;
		margin: 0 auto;
		padding: 6px 20px;
		text-align: right;
	}
	
	
	
</style>
<script>
function post_smsTamplate_update(vo){	
	$.ajax({
		url:"${pageContext.request.contextPath}/smsUpdate",
		type:"post",
		dataType:"text",
		data:vo,
		async:false,
		success:function(json){
			alert("문자 탬플릿이 변경되었습니다.");
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

function get_smsRemain(){
	
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/sms_remain",
		type: "get",
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

function getTextLength(str) {
	var len = 0;

	for (var i = 0; i < str.length; i++) {
		if (escape(str.charAt(i)).length == 6) {
			len++;
		}
		len++;
	}
	return len;
}

function bytesHandler(obj){
	var text = $(obj).val();
	var numByte = getTextLength(text)
	$(obj).parent().find("p > span").text(numByte);
	$(obj).parent().parent().find(".preview").parent().find("p > span").text(numByte);
}

$(function(){
	
	//진료, 치료 저장내용 byte 표기
	for(var i=1; i<5; i++){
		var obj = $(".templateWrap:nth-child("+i+") > ul > li > textarea");
		var objText = obj.text();
		objText = objText.replace(/\[병원명\]/gi,"21세기연합정형외과");
		objText = objText.replace(/\[환자명\]/gi,"홍길동");
		objText = objText.replace(/\[예약날짜\]/gi,"2019-01-01");
		objText = objText.replace(/\[진료명\]/gi,"초진");
		objText = objText.replace(/\[시작시간\]/gi,"13:50");
		objText = objText.replace(/\[진료명1\]/gi,"초진1");
		objText = objText.replace(/\[시작시간1\]/gi,"14:50");
		objText = objText.replace(/\[진료명2\]/gi,"초진2");
		objText = objText.replace(/\[시작시간2\]/gi,"15:50");
		objText = objText.replace(/\[진료명3\]/gi,"초진3");
		objText = objText.replace(/\[시작시간3\]/gi,"16:50");
		objText = objText.replace(/\[진료명4\]/gi,"초진4");
		objText = objText.replace(/\[시작시간4\]/gi,"17:50");
		
		$(obj).parent().parent().find(".preview").html(objText);
		bytesHandler(obj);
	}
	
	//잔여 문자량 입력
	$("#sms_cnt").text(get_smsRemain().sms);
	$("#lms_cnt").text(get_smsRemain().lms);
	
	
	//키 누를때마다 byte값, 미리보기 내용과 byte 값 변경 
	$('.templateWrap > ul > li > textarea').keyup(function(){
		var text = $(this).val();
		text = text.replace(/\[병원명\]/gi,"21세기연합정형외과");
		text = text.replace(/\[환자명\]/gi,"홍길동");
		text = text.replace(/\[예약날짜\]/gi,"2019-01-01");
		text = text.replace(/\[진료명\]/gi,"초진");
		text = text.replace(/\[시작시간\]/gi,"13:50");
		text = text.replace(/\[진료명1\]/gi,"초진1");
		text = text.replace(/\[시작시간1\]/gi,"14:50");
		text = text.replace(/\[진료명2\]/gi,"초진2");
		text = text.replace(/\[시작시간2\]/gi,"15:50");
		text = text.replace(/\[진료명3\]/gi,"초진3");
		text = text.replace(/\[시작시간3\]/gi,"16:50");
		text = text.replace(/\[진료명4\]/gi,"초진4");
		text = text.replace(/\[시작시간4\]/gi,"17:50");
		
		$(this).parent().parent().find(".preview").html(text);
		bytesHandler(this);
	});
	
	
	
	//문자 탬플릿 변경
	$(".templateWrap > h4 > button").click(function(){
		var num = $(this).parent().find("input[name='no']").val();
		var content = "";
		if(num == 1){
			content = $(".templateWrap:nth-child(1) > ul > li > textarea").val();
		}else if(num ==2){
			content = $(".templateWrap:nth-child(2) > ul > li > textarea").val();
		}else if(num == 3){
			content = $(".templateWrap:nth-child(3) > ul > li > textarea").val();
		}else{
			content = $(".templateWrap:nth-child(4) > ul > li > textarea").val();
		}
		var vo = {no:num, content:content};
		post_smsTamplate_update(vo);
	});
	
	
	
});
</script>
</head>
<body>
	<div class="popup_wrap">
		<jsp:include page="../include/employeePopup.jsp"></jsp:include>
	</div>
	<div class="all_wrap">
		<div class="header">
			<jsp:include page="../include/header.jsp"></jsp:include>
		</div>
		<div class="section">
			<div class="aside1">
				<div class="aside_title">
					<img src="${pageContext.request.contextPath}/resources/images/icon_wheel.png">
					<span>문자관리</span>
					<div class="line"></div> 
				</div>
				<div class="smsInfo">
					<p>문자발송가능건수 <a href="https://smartsms.aligo.in/shop/?ch=1">충전바로가기</a></p>
					<table>
						<tr>
							<th>단문(45자/90 byte)</th>
							<td id="sms_cnt"></td>
						</tr>
						<tr>
							<th>장문(1000자/2000 byte)</th>
							<td id="lms_cnt"></td>
						</tr>
					</table>
				</div>
				<div class="formWrap">
					<div class="templateWrap">
						<h4>진료예약<input type="hidden" name="no" value="1"> <button>저 장</button></h4>
						<div class="tempTitle">
							<p>-탬플릿-</p>
							<p>-미리보기-</p>
						</div>
						<ul>
							<li>
								<textarea>${smsClinic.content}</textarea>
								<p><span>0</span>/2000 Byte</p>
							</li>
							<li>
								<textarea class="preview" readonly></textarea>
								<p><span>0</span>/2000 Byte</p>
							</li>
						</ul>
					</div><!-- templateWrap end -->
					<div class="templateWrap">
						<h4>치료예약<input type="hidden" name="no" value="2"> <button>저 장</button></h4>
						<div class="tempTitle">
							<p>-탬플릿-</p>
							<p>-미리보기-</p>
						</div>
						<ul>
							<li>
								<textarea>${smsTherapy.content}</textarea>
								<p><span>195</span>/2000 Byte</p>
							</li>
							<li>
								<textarea class="preview" readonly></textarea>
								<p><span>195</span>/2000 Byte</p>
							</li>
						</ul>
					</div><!-- templateWrap end -->
					<div class="templateWrap">
						<h4>대기예약<input type="hidden" name="no" value="3"> <button>저 장</button></h4>
						<div class="tempTitle">
							<p>-탬플릿-</p>
							<p>-미리보기-</p>
						</div>
						<ul>
							<li>
								<textarea>${smsWaiting.content}</textarea>
								<p><span>195</span>/2000 Byte</p>
							</li>
							<li>
								<textarea class="preview" readonly></textarea>
								<p><span>195</span>/2000 Byte</p>
							</li>
						</ul>
					</div><!-- templateWrap end -->
					<div class="templateWrap">
						<h4>단체전송<input type="hidden" name="no" value="4"> <button>저 장</button></h4>
						<div class="tempTitle">
							<p>-탬플릿-</p>
							<p>-미리보기-</p>
						</div>
						<ul>
							<li>
								<textarea>${smsGroup.content}</textarea>
								<p><span>195</span>/2000 Byte</p>
							</li>
							<li>
								<textarea class="preview" readonly></textarea>
								<p><span>195</span>/2000 Byte</p>
							</li>
						</ul>
					</div><!-- templateWrap end -->
				</div><!-- table_wrap end -->
			</div>
		</div>
		<div class="footer">
		</div>
	</div>
</body>
</html>