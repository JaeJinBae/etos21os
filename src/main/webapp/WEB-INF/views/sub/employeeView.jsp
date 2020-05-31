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
	.header_inner2 > ul > li:nth-child(2){
		background: #0068b8;
	}
	.header_inner2 > ul > li:nth-child(2) > a{
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
	.employee_register_btn_wrap{
		float:right;
	}
	.employee_register_btn_wrap > button{
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
	.aside1 > .table_wrap > table tr > td > .employee_update_btn{
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
	.aside1 > .table_wrap > table tr > td > .employee_update_btn > img{
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
function get_employee_all(info){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/employeeAllGet",
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

function draw_employee_table(info){
	var json = get_employee_all(info);
	
	var str = "";

	$(".aside1 > .table_wrap").empty();
	
	str ="<table><tr><th></th><th>이름</th><th>설정</th><th>직원등급</th><th>생년월일</th><th>연락처</th><th>ID</th><th>메모</th></tr>";
	
	if(json.employeeListAll.length == 0){
		str += "<tr><td colspan='8'>등록된 회원이 없습니다.</td></tr>";
	}else{
		$(json.employeeListAll).each(function(){
			str += "<tr><td><input type='hidden' name='eno' value='"+this.eno+"'></td><td>"+this.name+"</td><td><p class='employee_update_btn'><img src='${pageContext.request.contextPath}/resources/images/icon_update.png'>수정</p></td>"
				+"<td>"+this.type+"</td><td>"+this.birth+"</td><td>"+this.phone+"</td><td>"+this.id+"</td><td>"+this.memo+"</td></tr>";
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


function get_employee_by_eno(eno){
	var dt;
	
	$.ajax({
		url:"${pageContext.request.contextPath}/employeeGetByEno/"+eno,
		type:"get",
		dataType:"json",
		async:false,
		success:function(json){
			dt = json;
		}
	}) 
	return dt;
}



//환자 정보 수정view에 정보 기입
function draw_employee_update_view(eno){
	var json = get_employee_by_eno(eno);
	
	$(".popup_employee_update > input[name='eno']").val(json.eno);
	$(".popup_employee_update > table tr td > input[name='name']").val(json.name);
	$(".popup_employee_update > table tr td > input[name='phone']").val(json.phone);
	$(".popup_employee_update > table tr td > select[name='type'] option[value='"+json.type+"']").prop("selected", true);
	$(".popup_employee_update > table tr td > select[name='level'] option[value='"+json.level+"']").prop("selected", true);
	$(".popup_employee_update > table tr td > input[name='id']").val(json.id);
	$(".popup_employee_update > table tr td > input[name='birth']").val(json.birth);
	$(".popup_employee_update > table tr td > select[name='gender'] option[value='"+json.gender+"']").prop("selected", true);
	$(".popup_employee_update > table tr td > input[name='memo']").val(json.memo);
	
	$(".popup_wrap").css("display","block");
	$(".popup_employee_update").css("display", "block");
}

function post_employee_register(vo){
	console.log(vo);
	
	$.ajax({
		url:"${pageContext.request.contextPath}/employeeRegister",
		type:"post",
		dataType:"text",
		data:vo,
		async:false,
		success:function(json){
			$(".popup_employee_register > input[name='eno']").val("");
			$(".popup_employee_register > table tr > td > input[name='name']").val("");
			$(".popup_employee_register > table tr > td > input[name='phone']").val("");
			$(".popup_employee_register > table tr > td > select[name='type'] > option[value='doctor']").prop("selected",true);
			$(".popup_employee_register > table tr > td > select[name='level'] > option[value='lv1']").prop("selected", true);
			$(".popup_employee_register > table tr > td > input[name='id']").val("");
			$(".popup_employee_register > table tr > td > input[name='id_check']").val("");
			$(".popup_employee_register > table tr > td > input[name='pw']").val("");
			$(".popup_employee_register > table tr > td > input[name='pwconfirm']").val("");
			$(".popup_employee_register > table tr > td > input[name='birth']").val("");
			$(".popup_employee_register > table tr > td > select[name='gender']").val();
			$(".popup_employee_register > table tr > td > input[name='memo']").val("");
			
			$(".popup_employee_register").css("display", "none");
			$(".popup_wrap").css("display","none");
			alert("직원등록이 완료되었습니다.");
			var o={};
			draw_employee_table(o);
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

function post_employee_update(employee){
	$.ajax({
		url:"${pageContext.request.contextPath}/employeeUpdate",
		type:"post",
		dataType:"text",
		data:employee,
		async:false,
		success:function(json){
			$(".popup_employee_update").css("display", "none");
			$(".popup_wrap").css("display","none");
			alert("직원정보수정이 완료되었습니다.");
			var o={};
			draw_employee_table(o);
		}
	});
}

function id_duplication_check(id){
var dt;
	
	$.ajax({
		url:"${pageContext.request.contextPath}/employeeIdCheck/"+id,
		type:"get",
		dataType:"text",
		async:false,
		success:function(json){
			dt = json;
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	}) 
	return dt;
}

$(function(){
	var o={};
	draw_employee_table(o);
	
	//직원 검색
	$("#searchBtn").click(function(){
		var s=$("select[name='searchType']").val();
		var k=$("input[name='keyword']").val();
		
		var page=1;
		var perPageNum=10;
		var searchType=s;
		var keyword=k;
		
		var info = {page:page, perPageNum:perPageNum, searchType:searchType, keyword:keyword};
		draw_employee_table(info);
	});
	
	//직원table에서 페이지 클릭
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
		draw_employee_table(info);
	});
	
	//직원추가 버튼 클릭
	$(".employee_register_btn_wrap > button").click(function(){
		$(".popup_wrap").css("display", "block");
		$(".popup_employee_register").css("display", "block");
	});
		
	//직원 등록popup에서 버튼 클릭
	$(".popup_employee_register_submit_wrap > p").click(function(){
		var idx = $(this).index();
		if(idx == 0){
			var eno = "0";
			var name = $(".popup_employee_register > table tr > td > input[name='name']").val();
			var phone = $(".popup_employee_register > table tr > td > input[name='phone']").val();
			var type = $(".popup_employee_register > table tr > td > select[name='type']").val();
			var level = $(".popup_employee_register > table tr > td > select[name='level']").val();
			var id = $(".popup_employee_register > table tr > td > input[name='id']").val();
			var id_check = $(".popup_employee_register > table tr > td > input[name='id_check']").val();
			var pw = $(".popup_employee_register > table tr > td > input[name='pw']").val();
			var pwConfirm = $(".popup_employee_register > table tr > td > input[name='pwconfirm']").val();
			var birth = $(".popup_employee_register > table tr > td > input[name='birth']").val();
			var gender = $(".popup_employee_register > table tr > td > select[name='gender']").val();
			var memo = $(".popup_employee_register > table tr > td > input[name='memo']").val();
			
			
			if(name == "" || name == null){
				alert("이름을 입력해주세요.");
				return false;
			}else if(phone == "" || phone == null){
				alert("연락처를 입력해주세요.");
				return false;
			}else if(id == "" || id == null){
				alert("ID를 입력해주세요.");
				return false;
			}else if(id_check== "no"){
				alert("사용할 수 없는 아이디입니다. 중복확인을 해주세요.");
				return false;
			}else if(pw == "" || pw == null){
				alert("비밀번호를 입력해주세요.");
				return false;
			}else if(pw != pwConfirm){
				alert("비밀번호와 비밀번호확인이 일치하지 않습니다.");
				return false;
			}else if(birth == "" || birth == null){
				alert("생년월일을 입력해주세요.");
				return false;
			}else{
				var vo = {eno:eno, name:name, phone:phone, type:type, level:level, id:id, pw:pw, birth:birth, gender:gender, memo:memo, offday_fix:"", offday_normal:""}
				
				post_employee_register(vo);
			}
			
			
			
		}else{
			$(".popup_employee_register").css("display", "none");
			$(".popup_wrap").css("display", "none");
		}
	});
	
	//id 중복확인
	$(".id_duplication_check_btn").click(function(){
		var id=$(this).parent().find("input[name='id']").val();
		
		var id_duplication = id_duplication_check(id);

		$(this).parent().find("input[name='id_check']").val(id_duplication);
		if(id_duplication == "ok"){
			alert("사용가능한 아이디입니다.");
		}else{
			alert("이미 존재하는 아이디입니다.");
		}
	});
	
	//직원 수정버튼 클릭
	$(document).on("click", ".employee_update_btn", function(){
		var eno = $(this).parent().parent().find("input[name='eno']").val();
		console.log("click");
		draw_employee_update_view(eno);
	});
	
	//직원 수정 popup에서 버튼 클릭
	$(".popup_employee_update_submit_wrap > p").click(function(){
		var idx = $(this).index();
		if(idx == 0){
			var eno = $(".popup_employee_update > input[name='eno']").val();
			var name = $(".popup_employee_update > table tr > td > input[name='name']").val();
			var phone = $(".popup_employee_update > table tr > td > input[name='phone']").val();
			var type = $(".popup_employee_update > table tr > td > select[name='type']").val();
			var level = $(".popup_employee_update > table tr > td > select[name='level']").val();
			var id = $(".popup_employee_update > table tr > td > input[name='id']").val();

			var pw = $(".popup_employee_update > table tr > td > input[name='pw']").val();
			var pwConfirm = $(".popup_employee_update > table tr > td > input[name='pwconfirm']").val();
			var birth = $(".popup_employee_update > table tr > td > input[name='birth']").val();
			var mail = $(".popup_employee_update > table tr > td > input[name='mail']").val();
			var gender = $(".popup_employee_update > table tr > td > select[name='gender']").val();
			var memo = $(".popup_employee_update > table tr > td > input[name='memo']").val();
			
			if(name == "" || name == null){
				alert("이름을 입력해주세요.");
				return false;
			}else if(phone == "" || phone == null){
				alert("연락처를 입력해주세요.");
				return false;
			}else if(pw != pwConfirm){
				alert("비밀번호와 비밀번호확인이 일치하지 않습니다.");
				return false;
			}else if(birth == "" || birth == null){
				alert("생년월일을 입력해주세요.");
				return false;
			}else{
				var vo = {eno:eno, name:name, phone:phone, type:type, level:level, id:id, pw:pw, birth:birth, mail:mail, gender:gender, memo:memo, offday_fix:"", offday_normal:""}
				
				post_employee_update(vo);
			}
			
		}else{
			$(".popup_employee_update").css("display", "none");
			$(".popup_wrap").css("display", "none");
		}
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
					<span>직원관리</span>
					<div class="line"></div> 
				</div>
				<div class="select_btn_wrap">
					<select name="searchType">
						<option value="name" ${cri.searchType=='name'?'selected':''}>이름</option>
						<option value="id" ${cri.searchType=='id'?'selected':''}>ID</option>
						<option value="phone" ${cri.searchType=='phone'?'selected':''}>연락처</option>
					</select> 
					<input type="text" name="keyword" id="keywordInput" value="">
					<button id="searchBtn">검색</button>
				</div><!-- select_btn_wrap -->
				<div class="employee_register_btn_wrap">
					<button>직원추가</button>
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