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
	.header_inner2 > ul > li:nth-child(3){
		background: #0068b8;
	}
	.header_inner2 > ul > li:nth-child(3) > a{
		color: #fff; 
		font-weight: bold; 
	}
	.aside1{
		width:1000px;
		margin-left:50px;
		margin-top:50px;
		overflow:hidden;
	}.aside_title{
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
	.aside1 > .select_btn_wrap{
		float:left;
	}
	.select_btn_wrap > select{
		font-size: 15px;
		padding: 3px 5px;
	}
	.select_btn_wrap > input{
		font-size: 15px;
		padding: 3px 5px;
	}
	.select_btn_wrap > button{
		font-size: 15px;
		padding: 5px 10px;
		margin-left: 10px;
		letter-spacing: 1px; 
		background: #1e866a;
		border-radius: 3px;
		color: #fff;
	}
	.clinic_register_btn_wrap{
		float:right;
	}
	.clinic_register_btn_wrap > button{
		font-size: 15px;
		padding: 5px 10px;
		letter-spacing: 1px; 
		background: #1e866a;
		border-radius: 3px;
		color: #fff;
	}
	.aside1 > .table_wrap{
		float:left;
		margin-top: 15px;
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
	.aside1 > .table_wrap > table tr > th:first-child{
		width:0;
	}
	.clinic_update_btn{
		width: 60px;
		margin: 0 auto;
		padding: 4px 0;
		font-size: 15px;
		background: #f3f3f3;
		color: #777;
		cursor: pointer;
		border: 1px solid #a0a0a0;
		border-radius: 6px;
		text-align: center;
	}
	.clinic_update_btn > img{
		width: 20px;
	}
	.page{
		margin: 15px auto;
	}
	.page > ul{
		text-align: center;
	}
	.page ul li{
		margin:0 auto;
		list-style: none;
		display: inline-block;
		text-align:center;
		border:1px solid #e9e9e9;
		border-radius: 8px;
		margin: 0 1px;
		background: #fafafa;
	}
	.page ul li a{
		display:inline-block;
		width:35px;
		height:30px;
		font-size:1.1em;
		line-height: 30px;
	}
	.active1{
		background: #e02c4f !important;
	}
	.active2{
		font-weight: bold;
		color:white;
	}
</style>
<script>
function get_clinic_all(info){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/clinicAllGet",
		type: "post",
		data:JSON.stringify(info),
		async:false,
		contentType : "application/json; charset=UTF-8",
		dataType:"json",
		success:function(json){			
			dt = json;
		}
	});
	return dt;
}

function draw_clinic_table(info){
	var json = get_clinic_all(info);
	
	var str = "";

	$(".aside1 > .table_wrap").empty();
	
	str ="<table><tr><th></th><th>코드명</th><th>문자전송코드명</th><th>설정</th><th>코드분류</th><th>진행시간(분)</th><th>색깔</th></tr>";
	
	if(json.clinicListAll.length == 0){
		str += "<tr><td colspan='7'>등록된 정보가 없습니다.</td></tr>"; 
	}else{
		$(json.clinicListAll).each(function(){
			str += "<tr><td><input type='hidden' name='cno' value='"+this.cno+"'></td><td>"+this.code_name+"</td><td>"+this.code_smsname+"</td><td><p class='clinic_update_btn'><img src='${pageContext.request.contextPath}/resources/images/icon_update.png'>수정</p></td>"
				+"<td>"+this.code_type+"</td><td>"+this.time+"</td><td style='background:"+this.color+";'>"+this.color+"</td></tr>";
		});
	}
	str += "</table>";
	
	str += "<div class='page'><ul>";
	if(json.pageMaker.prev){
		str += "<li><a href='page="+(json.pageMaker.startPage-1)+"&perPageNum=10&searchType="+json.pageMaker.cri.searchType+"&keyword="+json.pageMaker.cri.keyword+"'>&laquo;</a></li>";
	}
	for(var i=json.pageMaker.startPage; i<=json.pageMaker.endPage; i++){
		
		if(json.pageMaker.cri.page == i){
			str += "<li class='active1'><a class='active2' href='page="+i+"&perPageNum=10&searchType="+json.pageMaker.cri.searchType+"&keyword="+json.pageMaker.cri.keyword+"'>"+i+"</a></li>";
		}else{
			str += "<li><a href='page="+i+"&perPageNum=10&searchType="+json.pageMaker.cri.searchType+"&keyword="+json.pageMaker.cri.keyword+"'>"+i+"</a></li>"
		}
	}
	if(json.pageMaker.next){
		str += "<li><a href='page="+(json.pageMaker.endPage+1)+"&perPageNum=10&searchType="+json.pageMaker.cri.searchType+"&keyword="+json.pageMaker.cri.keyword+"'>&raquo;</a></li>";
	}
	str += "</ul></div>";	
	$(".aside1 > .table_wrap").append(str);
}


function get_clinic_by_cno(cno){
	var dt;
	
	$.ajax({
		url:"${pageContext.request.contextPath}/clinicGetByCno/"+cno,
		type:"get",
		dataType:"json",
		async:false,
		success:function(json){
			dt = json;
		}
	}) 
	return dt;
}



//클리닉 수정view에 정보 기입
function draw_clinic_update_view(cno){
	var json = get_clinic_by_cno(cno);

	$(".popup_clinic_update > input[name='cno']").val(json.cno); 
	$(".popup_clinic_update > table tr > td > input[name='code_name']").val(json.code_name);
	$(".popup_clinic_update > table tr > td > input[name='code_smsname']").val(json.code_smsname);
	$(".popup_clinic_update > table tr > td > select[name='code_type'] > option[value='"+json.code_type+"']").prop("selected", true);
	$(".popup_clinic_update > table tr > td > select[name='time'] > option[value='"+json.time+"']").prop("selected", true);
	$(".popup_clinic_update > table tr > td > input[name='color']").val(json.color);
	
	$(".popup_wrap").css("display","block");
	$(".popup_clinic_update").css("display", "block");
}

function post_clinic_register(vo){
	console.log(vo);
	
	$.ajax({
		url:"${pageContext.request.contextPath}/clinicRegister",
		type:"post",
		dataType:"text",
		data:vo,
		async:false,
		success:function(json){
			$(".popup_clinic_register").css("display", "none");
			$(".popup_wrap").css("display","none");
			alert("코드등록이 완료되었습니다.");
			$(".popup_clinic_register > table tr > td > input[name='code_name']").val("");
			$(".popup_clinic_register > table tr > td > input[name='code_smsname']").val("");
			$(".popup_clinic_register > table tr > td > select[name='code_type'] > option[value='진료']").prop("selected", true);
			$(".popup_clinic_register > table tr > td > select[name='time'] > option[value='0']").prop("selected", true);
			$(".popup_clinic_register > table tr > td > input[name='color']").val("");
			var o={};
			draw_clinic_table(o);
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

function post_clinic_update(vo){
	$.ajax({
		url:"${pageContext.request.contextPath}/clinicUpdate",
		type:"post",
		dataType:"text",
		data:vo,
		async:false,
		success:function(json){
			$(".popup_clinic_update").css("display", "none");
			$(".popup_wrap").css("display","none");
			var o={};
			draw_clinic_table(o);
		}
	});
}

$(function(){
	var o={};
	draw_clinic_table(o);
	
	//코드 검색
	$("#searchBtn").click(function(){
		var s=$("select[name='searchType']").val();
		var k=$("input[name='keyword']").val();
		
		var page=1;
		var perPageNum=10;
		var searchType=s;
		var keyword=k;
		
		var info = {page:page, perPageNum:perPageNum, searchType:searchType, keyword:keyword};
		draw_clinic_table(info);
	});
	
	//코드table에서 페이지 클릭
	$(document).on("click", ".page > ul > li > a", function(e){
		e.preventDefault();
		
		var page="";
		var perPageNum="";
		var searchType="";
		var keyword="";
		
		var href_txt = $(this).attr("href");
		var splitList = href_txt.split("&");
		
		for(var i=0; i<splitList.length; i++){
			console.log(splitList[i].split("=")[1]);
			if(i==0){
				page=splitList[i].split("=")[1];
			}else if(i==1){
				perPageNum=splitList[i].split("=")[1];
			}else if(i==2){
				searchType = splitList[i].split("=")[1];
			}else if(i==3){
				keyword = splitList[i].split("=")[1];
			}
		}
		
		var info = {page:page, perPageNum:perPageNum, searchType:searchType, keyword:keyword};
		
		draw_clinic_table(info);
	});
	
	//코드추가 버튼 클릭
	$(".clinic_register_btn_wrap > button").click(function(){
		$(".popup_wrap").css("display", "block");
		$(".popup_clinic_register").css("display", "block");
	});
		
	//코드 등록popup에서 버튼 클릭
	$(".popup_clinic_register_submit_wrap > p").click(function(){
		var idx = $(this).index();
		if(idx == 0){
			var cno = "0";
			var code_name = $(".popup_clinic_register > table tr > td > input[name='code_name']").val();
			var code_smsname = $(".popup_clinic_register > table tr > td > input[name='code_smsname']").val();
			var code_type = $(".popup_clinic_register > table tr > td > select[name='code_type']").val();
			var time = $(".popup_clinic_register > table tr > td > select[name='time']").val();
			var color = $(".popup_clinic_register > table tr > td > input[name='color']").val();

			if(code_name == ""){
				alert("코드명을 입력해주세요.");
				return false;
			}
			if(code_smsname == ""){
				alert("문자전송코드명을 입력해주세요.");
				return false;
			}
			if(time == "0"){
				alert("진행시간을 선택해주세요.");
				return false;
			}
			if(color == ""){
				alert("색깔을 입력해주세요.");
				return false;
			}
			
			var vo = {cno:cno, code_name:code_name, code_smsname:code_smsname, code_type:code_type, time:time, color:color}
			post_clinic_register(vo);

		}else{
			$(".popup_clinic_register").css("display", "none");
			$(".popup_wrap").css("display", "none");
		}
	});
		
	//코드 수정버튼 클릭
	$(document).on("click", ".clinic_update_btn", function(){
		var cno = $(this).parent().parent().find("input[name='cno']").val();
		console.log("click");
		draw_clinic_update_view(cno);
	});
	
	//직원 수정 popup에서 버튼 클릭
	$(".popup_clinic_update_submit_wrap > p").click(function(){
		var idx = $(this).index();
		if(idx == 0){
			var cno = $(".popup_clinic_update > input[name='cno']").val();
			var code_name = $(".popup_clinic_update > table tr > td > input[name='code_name']").val();
			var code_smsname = $(".popup_clinic_update > table tr > td > input[name='code_smsname']").val();
			var code_type = $(".popup_clinic_update > table tr > td > select[name='code_type']").val();
			var time = $(".popup_clinic_update > table tr > td > select[name='time']").val();
			var color = $(".popup_clinic_update > table tr > td > input[name='color']").val();
			
			if(code_name == ""){
				alert("코드명을 입력해주세요.");
				return false;
			}else if(code_smsname == ""){
				alert("문자전송코드명을 입력해주세요.");
				return false;
			}else if(color == ""){
				alert("색깔을 입력해주세요.");
				return false;
			}else{
				var vo = {cno:cno, code_name:code_name, code_smsname:code_smsname, code_type:code_type, time:time, color:color}
				
				post_clinic_update(vo);
			}
			
		}else{
			$(".popup_clinic_update").css("display", "none");
			$(".popup_wrap").css("display", "none");
		}
	});
	
});
</script>
</head>
<body>
	<div class="popup_wrap">
		<jsp:include page="../include/clinicPopup.jsp"></jsp:include>
	</div>
	<div class="all_wrap">
		<div class="header">
			<jsp:include page="../include/header.jsp"></jsp:include>
		</div>
		<div class="section">
			<div class="aside1">
				<div class="aside_title">
					<img src="${pageContext.request.contextPath}/resources/images/icon_wheel.png">
					<span>코드관리</span>
					<div class="line"></div> 
				</div>
				<div class="select_btn_wrap">
					<select name="searchType">
						<option value="ct" ${cri.searchType=='ct'?'selected':''}>코드분류</option>
						<option value="cn" ${cri.searchType=='cn'?'selected':''}>코드명</option>
						<option value="t" ${cri.searchType=='t'?'selected':''}>진행시간</option>
					</select> 
					<input type="text" name="keyword" id="keywordInput" value="">
					<button id="searchBtn">검색</button>
				</div><!-- select_btn_wrap -->
				<div class="clinic_register_btn_wrap">
					<button>코드추가</button>
				</div>
				<div class="table_wrap">
				
				</div><!-- table_wrap end -->
			</div>
		</div>
		<div class="footer">
		</div>
	</div>
</body>
</html>