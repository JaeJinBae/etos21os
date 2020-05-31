//달력에 각 일마다 요일 표시
function write_yoil(){
	var idx=1;
	for(var i=0; i < $("#calendar tr:not(.tr_not) td").length; i++){
		if(idx == 8){
			idx = 1;
		} 
		$("#calendar tr:not(.tr_not) td").eq(i).append("<input type='hidden' value='"+idx+"'>");
		idx++;
	}
}

function get_today(){
	var today=new Date();
	var today_month=(today.getMonth()+1)+"";
	var today_date=today.getDate()+"";
	var update_month="";
	var update_date="";
	var fullDate="";
	
	//날짜 월이 한자리면 앞에 숫자0 추가
	if(today_month.length <= 1){
		update_month="0"+today_month;
	}else{
		update_month=today_month;
	}
	//날짜 일이 한자리면 앞에 숫자0 추가
	if(today_date.length <= 1){
		update_date="0"+today_date;
	}else{
		update_date=today_date;
	}
	
	fulldate = today.getFullYear()+"-"+update_month+"-"+update_date;
	//$(".calendar_select_date").val(fulldate);
	return fulldate;
}

function get_day(date){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/getDay/"+date,
		type:"get",
		dataType:"text",
		async:false,
		success:function(json){
			dt = decodeURIComponent(json);
		} 
	})
	return dt;
}

function get_patient_all(info){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/patientAllGet",
		type: "get",
		data:info,
		async:false,
		dataType:"json",
		success:function(json){			
			dt = json;
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
	return dt;
}

function draw_patient_table(info){
	var json = get_patient_all(info);
	
	var str = "";

	$("#inner_tbl_wrap").empty();
	
	str ="<table><tr><th></th><th>이름</th><th>설정</th><th>예약</th><th>담당의사</th><th>담당치료사</th><th>회원등급</th><th>생년월일</th><th>연락처</th><th>차트번호</th><th>메모</th><th>문자</th></tr>";
	
	if(json.patientListAll.length == 0){
		str += "<tr><td colspan='12'>등록된 회원이 없습니다.</td></tr>";
	}else{
		$(json.patientListAll).each(function(){
			str += "<tr><td><input type='hidden' value='"+this.pno+"'></td><td>"+this.name+"</td><td><p class='patient_update_btn'>수정</p></td><td><p class='reservation_select_btn'>선택</p></td><td>"+this.main_doctor_name+"</td><td>"+this.main_therapist+"</td><td>환자</td><td>"+this.birth+"</td><td>"+this.phone+"</td><td>"+this.cno+"</td><td>"+this.memo+"</td><td><p class='sms_open_btn'>열기</p></td></tr>";
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
	$("#inner_tbl_wrap").append(str);
}


function get_patient_by_pno(pno){
	var dt;
	
	$.ajax({
		url:"${pageContext.request.contextPath}/patientByPno/"+pno,
		type:"get",
		dataType:"json",
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

function post_patient_register(patient){
	$.ajax({
		url:"${pageContext.request.contextPath}/patientRegister",
		type:"post",
		dataType:"text",
		data:patient,
		async:false,
		success:function(json){
			$(".popup_patient_register").css("display", "none");
			$(".popup_wrap").css("display","none");
			alert("환자등록이 완료되었습니다.");
			draw_patient_table();
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

//환자 정보 수정view에 정보 기입
function draw_patient_update_view(pno){
	var json = get_patient_by_pno(pno);
	
	$(".popup_patientUpdate > input[name='pno']").val(json.pno);
	$(".popup_patientUpdate > table tr td > input[name='cno']").val(json.cno);
	$(".popup_patientUpdate > table tr td > input[name='name']").val(json.name);
	$(".popup_patientUpdate > table tr td > input[name='phone']").val(json.phone);
	$(".popup_patientUpdate > table tr td > input[name='birth']").val(json.birth);
	$(".popup_patientUpdate > table tr td > select[name='gender'] option[value='"+json.gender+"']").prop("selected", true);
	$(".popup_patientUpdate > table tr > td > select[name='main_doctor'] option[value='"+json.main_doctor+"']").prop("selected", true);
	$(".popup_patientUpdate > table tr > td > select[name='main_therapist'] option[value='"+json.main_therapist+"']").prop("selected", true);
	$(".popup_patientUpdate > table tr td > input[name='mail']").val(json.mail);
	$(".popup_patientUpdate > table tr td > input[name='memo']").val(json.memo);
	
	$(".popup_wrap").css("display","block");
	$(".popup_patientUpdate").css("display", "block");
}

function post_patient_update_info(patient){
	$.ajax({
		url:"${pageContext.request.contextPath}/patientUpdate",
		type:"post",
		dataType:"text",
		data:patient,
		async:false,
		success:function(json){
			$(".popup_patientUpdate").css("display", "none");
			$(".popup_wrap").css("display","none");
			draw_patient_table();
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

//요일별 병원정보 get
function get_hospitalInfo_byDay(date){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/hospitalInfoGetByDay/"+date,
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

//직업별 직원정보list get
function get_employeeList_byType(type){
	var dt;
	
	$.ajax({
		url:"${pageContext.request.contextPath}/employeeListGetByType/"+type,
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

function draw_total_time_table(date, type){
	var hospitalDayInfo = get_hospitalInfo_byDay(date);
	var empList = get_employeeList_byType(type);
	
	var starttime=Number(hospitalDayInfo.start_time)/60;
	var endtime=Number(hospitalDayInfo.end_time)/60;
	var lunch=Number(hospitalDayInfo.lunch)/60;
	
	//진료 테이블 생성
	var txt = "<table class='"+type+"_time_table'><tr><td></td>";
	
	for(var i=starttime; i < endtime; i++){
		txt+="<td>"+i+"시</td>";
	}
	txt+="</tr>";
	
	$(empList).each(function(){
		txt += "<tr class='"+this.type+"_"+this.eno+"'><td>"+this.name+"</td>";
		for(var i=starttime; i < endtime; i++){
			//점심시간에 진료 및 치료 하지않는 병원
			/* if(i == lunch){
				txt += "<td class='"+this.type+"_"+this.eno+"_"+i+"' style='background:gray; text-align:center;'>점심시간</td>";
			}else{
				txt += "<td class='"+this.type+"_"+this.eno+"_"+i+" timetable_inner_content'><p class='reservation_register_btn' style='border:1px solid lightgray;width:20px;text-align:center;height:20px;font-size:20px;background:gray;color:#fff;cursor:pointer;'>+</p></td>";
			} */
			//점심시간에도 진료 및 치료하는 병원
			txt += "<td class='"+this.type+"_"+this.eno+"_"+i+" timetable_inner_content'>";
			txt += "<p class='reservation_register_btn'>+</p></td>";
		}
		txt += "</tr>";
	});
	txt+="</table>";
	return txt;
}

function draw_time_table_by_case(idx){
	var select_date = $(".calendar_select_date").val();
	var table_txt;
	$(".reservation_record_selectBox_wrap").css("display","none");
	$(".reservation_update_record_selectBox_wrap").css("display","none");
	
	switch (idx){
		case 0:
			$(".week_select_box_wrap").css("display","none");
			$(".time_table_wrap").html("");
			table_txt = draw_total_time_table(select_date, "doctor");
			table_txt += "<br><br><br>";
			table_txt += draw_total_time_table(select_date, "therapist");
			$(".time_table_wrap").append(table_txt);
			draw_reservation(select_date);
			draw_normalOff_in_timetable(select_date);
			break;
		case 1:
			$(".week_select_box_wrap").css("display","none");
			$(".time_table_wrap").html("");
			table_txt = draw_total_time_table(select_date, "doctor");
			$(".time_table_wrap").append(table_txt);
			draw_reservation(select_date);
			draw_normalOff_in_timetable(select_date);
			break;
		case 2:
			$(".time_table_wrap").html("");
			$(".week_select_box_wrap").css("display","block");
			draw_week_calendar($(".calendar_select_date").val(), get_employeeList_byType("doctor"), "doctor", idx);
			draw_normalOff_in_weektable();
			break;
		case 3:
			$(".time_table_wrap").html("");
			$(".week_select_box_wrap").css("display","block");
			draw_week_calendar($(".calendar_select_date").val(), get_employeeList_byType("doctor"), "doctor", idx);
			draw_normalOff_in_weektable();
			break;
		case 4:
			$(".week_select_box_wrap").css("display","none");
			$(".time_table_wrap").html("");
			table_txt = draw_total_time_table(select_date, "therapist");
			$(".time_table_wrap").append(table_txt);
			draw_reservation(select_date);
			draw_normalOff_in_timetable(select_date);
			break;
		case 5:
			$(".time_table_wrap").html("");
			$(".week_select_box_wrap").css("display","block");
			draw_week_calendar($(".calendar_select_date").val(), get_employeeList_byType("therapist"), "therapist", idx);
			draw_normalOff_in_weektable();
			break;
		case 6:
			$(".time_table_wrap").html("");
			$(".week_select_box_wrap").css("display","block");
			draw_week_calendar($(".calendar_select_date").val(), get_employeeList_byType("therapist"), "therapist", idx);
			draw_normalOff_in_weektable();
			break;
		case 7:
			$(".week_select_box_wrap").css("display","none");
			$(".reservation_record_selectBox_wrap").css("display","block");
			$(".time_table_wrap").html("");
			draw_reservation_record_table();
			break;
		case 8:
			$(".week_select_box_wrap").css("display","none");
			$(".reservation_update_record_selectBox_wrap").css("display", "block");
			$(".time_table_wrap").html("");
			draw_reservation_update_record_table();
			break;
		case 9:
			$(".week_select_box_wrap").css("display","none");
			$(".time_table_wrap").html("");
			draw_normalOff_table();
			break;
		case 10:
			$(".week_select_box_wrap").css("display","none");
			$(".time_table_wrap").html("");
			draw_fixOff_table();
			break;
		case 11:
			$(".week_select_box_wrap").css("display","none");
			$(".time_table_wrap").html("");
			
			break;
		default:
			console.log(idx);
	}
}

//예약
function get_reservationList_byDate(date){
	var dt;
	
	$.ajax({
		url:"${pageContext.request.contextPath}/reservationListGetByDate/"+date,
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

function get_reservationList_byDate_byEmployee(type, eno, week){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/reservationListByDateEno/"+type+"/"+eno+"/"+week,
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

function get_fixReservationList_byDate_byEmployee(type, eno, week){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/fixReservationListByDateEno/"+type+"/"+eno+"/"+week,
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

function draw_reservation(date){
	var json = get_reservationList_byDate(date);
	var clinic;
	//예약정보 생성
	var target_tag = "";
	var txt = "";		
	var patient;
	var time;
	var hour;
	var minute;
	var clinic_time;
	var overMinute;
	var end_time;
	
	//일반진료
	$(json.ncReservationList).each(function(){
		patient = get_patient_by_pno(this.pno);
		clinic = get_clinic_by_cno(this.clinic);
		clinic_time = Number(clinic.time);
		time = Number(this.rtime);
		hour = parseInt(time/60);
		minute = time%60;
		overMinute = (minute+clinic_time)-60;
		
		if(overMinute >= 0){
			if(overMinute < 10){
				overMinute = "0"+overMinute;
			}
			end_time = (hour+1)+":"+overMinute;
		}else{
			end_time = minute+clinic_time;
		}
		if(minute == 0){
			minute = "0"+minute;
		}
		
		if(this.result == "예약취소"){
			target_tag = ".doctor_"+this.eno+"_"+hour;
			txt = "<p class='patient_p_tag' style='background:#e9e9e9;border:1px solid gray;color:gray;'>"+minute+"~"+end_time+" "+patient.name
				+ "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='nc'></p>";
			
			$(target_tag).append(txt);
		}else{
			target_tag = ".doctor_"+this.eno+"_"+hour;
			txt = "<p class='patient_p_tag' style='background:"+clinic.color+";border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name;
			if(this.desk_state == "접수완료"){
				txt += "<img style='width:15px;' class='footImg' src='${pageContext.request.contextPath}/resources/images/foot.png'>";
			}
			txt += "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='nc'></p>";
			
			$(target_tag).append(txt);
			
			if(overMinute > 0){
				target_tag = ".doctor_"+this.eno+"_"+(hour+1);
				txt = "<p style='background:black;color:#fff;'>~"+end_time+"예약불가</p>";
				$(target_tag).append(txt);
			}
		}
		
		
	});
	
	//일반치료
	$(json.ntReservationList).each(function(){
		patient = get_patient_by_pno(this.pno);
		clinic = get_clinic_by_cno(this.clinic);
		clinic_time = Number(clinic.time);
		time = Number(this.rtime);
		hour = parseInt(time/60);
		minute = time%60;
		overMinute = (minute+clinic_time)-60;
		
		if(overMinute >= 0){
			if(overMinute < 10){
				overMinute = "0"+overMinute;
			}
			end_time = (hour+1)+":"+overMinute;
		}else{
			end_time = minute+clinic_time;
		}
		if(minute == 0){
			minute = "0"+minute;
		}
		
		if(this.result == "예약취소"){
			target_tag = ".therapist_"+this.eno+"_"+hour;
			txt = "<p class='patient_p_tag' style='background:#e9e9e9;border:1px solid gray;color:gray;'>"+minute+"~"+end_time+" "+patient.name
				+ "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='nt'></p>";
			
			$(target_tag).append(txt);
		}else{
			target_tag = ".therapist_"+this.eno+"_"+hour;
			txt = "<p class='patient_p_tag' style='background:"+clinic.color+";border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name;
			if(this.desk_state == "접수완료"){
				txt += "<img style='width:15px;' class='footImg' src='${pageContext.request.contextPath}/resources/images/foot.png'>";
			}
			txt	+= "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='nt'></p>";
			$(target_tag).append(txt);
			
			if(overMinute > 0){
				target_tag = ".therapist_"+this.eno+"_"+(hour+1);
				txt = "<p style='background:black;color:#fff;'>~"+end_time+"예약불가</p>";
				$(target_tag).append(txt);
			}
		}
		
	});
	
	//고정진료
	$(json.fcReservationList).each(function(){
		patient = get_patient_by_pno(this.pno);
		clinic = get_clinic_by_cno(this.clinic);
		clinic_time = Number(clinic.time);
		time = Number(this.rtime);
		hour = parseInt(time/60);
		minute = time%60;
		overMinute = (minute+clinic_time)-60;
		
		if(overMinute >= 0){
			if(overMinute < 10){
				overMinute = "0"+overMinute;
			}
			end_time = (hour+1)+":"+overMinute; 
		}else{
			end_time = minute+clinic_time;
		}
		if(minute == 0){
			minute = "0"+minute;
		}
		
		if(this.result == "예약취소"){
			target_tag = ".doctor_"+this.eno+"_"+hour;
			txt = "<p class='patient_p_tag' style='background:#e9e9e9;border:1px solid gray;color:gray;'>"+minute+"~"+end_time+" "+patient.name
				+ "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='fc'></p>";
			
			$(target_tag).append(txt);
		}else{
			target_tag = ".doctor_"+this.eno+"_"+hour;
			txt = "<p class='patient_p_tag' style='background:#ffaf7a;border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name;
			if(this.desk_state == "접수완료"){
				txt += "<img style='width:15px;' class='footImg' src='${pageContext.request.contextPath}/resources/images/foot.png'>";
			}
			txt	+= "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='fc'></p>";
			$(target_tag).append(txt);
			
			if(overMinute > 0){
				target_tag = ".doctor_"+this.eno+"_"+(hour+1);
				txt = "<p style='background:black;color:#fff;'>~"+end_time+"예약불가</p>";
				$(target_tag).append(txt);
			}
		}
		
		
	});
	
	//고정치료
	$(json.ftReservationList).each(function(){
		patient = get_patient_by_pno(this.pno);
		clinic = get_clinic_by_cno(this.clinic);
		clinic_time = Number(clinic.time);
		time = Number(this.rtime);
		hour = parseInt(time/60);
		minute = time%60;
		overMinute = (minute+clinic_time)-60;
		
		if(overMinute >= 0){
			if(overMinute < 10){
				overMinute = "0"+overMinute;
			}
			end_time = (hour+1)+":"+overMinute; 
		}else{
			end_time = minute+clinic_time;
		}
		if(minute == 0){
			minute = "0"+minute;
		}
		
		if(this.result == "예약취소"){
			target_tag = ".therapist_"+this.eno+"_"+hour;
			txt = "<p class='patient_p_tag' style='background:#e9e9e9;border:1px solid gray;color:gray;'>"+minute+"~"+end_time+" "+patient.name
				+ "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='ft'></p>";
			
			$(target_tag).append(txt);
		}else{
			target_tag = ".therapist_"+this.eno+"_"+hour;
			txt = "<p class='patient_p_tag' style='background:#ffaf7a;border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name;
			if(this.desk_state == "접수완료"){
				txt += "<img style='width:15px;' class='footImg' src='${pageContext.request.contextPath}/resources/images/foot.png'>";
			}
			txt	+= "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='ft'></p>";
			$(target_tag).append(txt);
			
			if(overMinute > 0){
				target_tag = ".therapist_"+this.eno+"_"+(hour+1);
				txt = "<p style='background:black;color:#fff;'>~"+end_time+"예약불가</p>";
				$(target_tag).append(txt);
			}
		}
		
		
	});
}

//일반진료
function get_ncReservation_byRno(rno){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/ncReservationInfoByRno/"+rno,
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
//일반치료
function get_ntReservation_byRno(rno){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/ntReservationInfoByRno/"+rno,
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

//고정진료
function get_fcReservation_byRno(rno){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/fcReservationInfoByRno/"+rno,
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

//고정치료
function get_ftReservation_byRno(rno){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/ftReservationInfoByRno/"+rno,
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

function get_clinic_by_cno(cno){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/clinicGetByCno/"+cno,
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

function get_clinic_by_type(type){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/clinicGetByType/"+type,
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


//진료, 치료 테이블에서 예약된환자 이름에 마우스 올리면 좌측하단에 예약정보 나타내는 함수
function draw_simple_reservation_view(type, rno){
	var json;
	
	if(type=="nc"){
		json = get_ncReservation_byRno(rno);
	}else if(type == "nt"){
		json = get_ntReservation_byRno(rno);
	}else if(type == "fc"){
		json = get_fcReservation_byRno(rno);
	}else{
		json = get_ftReservation_byRno(rno);
	}
	
	var patient = get_patient_by_pno(json.pno);
	var clinic = get_clinic_by_cno(json.clinic);
	var clinic_time = Number(clinic.time);
	var rtime;
	var hour;
	var minute;
	var overMinute;
	var start_time;
	var end_time="";
	var doctor;
	var therapist;
	var employee = get_employee_byEno(json.eno);
	var rtype;
	if(json.rtype=="nc"){
		rtype = "일반진료";
	}else if(json.rtype == "nt"){
		rtype="일반치료"
	}else if(json.rtype == "fc"){
		rtype="고정진료"
	}else if(json.rtype == "ft"){
		rtype="고정치료"
	}
	var str="";
	str = "<p class='al_tbl_wrap2_title'>"+rtype+"예약 &nbsp;&nbsp;<span style='color:#333;font-size:14px;letter-spacing:0;'>[닫기]</span></p><table id='tbl_simple_reservation'>"
		+ "<tr><td class='tbl_content_pName'>"+patient.name+"("+patient.cno+")님 ▶"+ employee.name+"</td></tr>"
		+"<tr><th class='tbl_content_title'>- 예약일시</th></tr>";
		
	if(json.rtype == 'nc' || json.rtype == 'nt'){
		rtime = Number(json.rtime);
		hour = parseInt(rtime/60);
		minute = rtime%60;
		overMinute = (minute+clinic_time)-60;
		
		if(overMinute >= 0){
			if(overMinute < 10){
				overMinute = "0"+overMinute;
			}
			end_time = (hour+1)+":"+overMinute;
		}else{
			end_time = hour+":"+(minute+clinic_time);
		}
		
		if(minute == 0){
			minute = "0"+minute;
		}
		start_time = hour+":"+minute;
		
		str += "<tr><td class='tbl_content'>"+json.rdate+" "+start_time+"~"+end_time+"</td></tr>"
			+"<tr><th class='tbl_content_title'>- 진료종류</th></tr>";
	}else if(json.rtype == 'fc' || json.rtype == 'ft'){
		rtime = Number(json.rtime);
		hour = parseInt(rtime/60);
		minute = rtime%60;
		overMinute = (minute+clinic_time)-60;
		if(overMinute >= 0){
			if(overMinute < 10){
				overMinute = "0"+overMinute;
			}
			end_time = (hour+1)+":"+overMinute;
		}else{
			end_time = hour+":"+(minute+clinic_time);
		}
		
		if(minute == 0){
			minute = "0"+minute;
		}
		start_time = hour+":"+minute;
		str += "<tr><td class='tbl_content'>"+json.fix_day+"요일 "+start_time+"~"+end_time+"</td></tr>"
			+"<tr><th class='tbl_content_title'>- 치료종류</th></tr>";
	}
	str += "<tr><td class='tbl_content'>"+clinic.code_name+"</td></tr>"
		+"<tr><th class='tbl_content_title'>- 등록정보</th></tr>"
		+"<tr><td class='tbl_content'>"+json.regdate+" by "+json.writer+"</td></tr>";
		
	if(json.updatedate != ""){
		str += "<tr><th class='tbl_content_title'>- 변경처리</th></tr>"
			+"<tr><td class='tbl_content'>"+json.updatedate+" by "+json.updatewriter+"</td></tr>";
	}
	if(json.memo != ""){
		str +=  "<tr><th class='tbl_content_title'>- 메모</th></tr>"
			+"<tr><td class='tbl_content'>"+json.memo+"</td></tr>";
	}
	
	str+="</table>";
		
	$(".al_tbl_wrap2").html(str);
		
	$(".al_tbl_wrap2").css("display","block");
}

function post_ncReservation_register(vo, stbn){
	$.ajax({
		url:"${pageContext.request.contextPath}/ncReservationRegister",
		type:"post",
		dataType:"text",
		data:vo,
		async:false,
		success:function(json){
			if(json == "OK"){
				alert("예약등록이 완료되었습니다.");
				$("#reservation_view_btn").html("");
				$(".reservation_register_btn").css("display", "none");
				$("#reservation_view_btn").css("display", "none");
				$(".popup_clinic_reservation_register").css("display", "none");
				$(".popup_therapy_reservation_register").css("display", "none");
				$(".popup_wrap").css("display","none");
				
				draw_time_table_by_case(stbn);
			}else{
				alert("예약등록이 정상적으로 등록되지 않았습니다. 다시 한번 등록하세요.");
			}
		}
	});
}
function post_ntReservation_register(vo, stbn){
	$.ajax({
		url:"${pageContext.request.contextPath}/ntReservationRegister",
		type:"post",
		dataType:"text",
		data:vo,
		async:false,
		success:function(json){
			if(json == "OK"){
				alert("예약등록이 완료되었습니다.");
				$("#reservation_view_btn").html("");
				$(".reservation_register_btn").css("display", "none");
				$("#reservation_view_btn").css("display", "none");
				$(".popup_clinic_reservation_register").css("display", "none");
				$(".popup_therapy_reservation_register").css("display", "none");
				$(".popup_wrap").css("display","none");
				
				draw_time_table_by_case(stbn);
			}else{
				alert("예약등록이 정상적으로 등록되지 않았습니다. 다시 한번 등록하세요.");
			}
		}
	});
}
function post_fcReservation_register(vo, stbn){
	var arrDate = get_between_date(vo.fix_day_start, vo.fix_day_end);
	var data = {"vo":vo, "date":arrDate};
	
	$.ajax({
		url:"${pageContext.request.contextPath}/fcReservationRegister",
		type:"post",
		dataType:"text",
		data:JSON.stringify(data),
		async:false,
		contentType : "application/json; charset=UTF-8",
		success:function(json){
			if(json == "OK"){
				alert("예약등록이 완료되었습니다.");
				$("#reservation_view_btn").html("");
				$(".reservation_register_btn").css("display", "none");
				$("#reservation_view_btn").css("display", "none");
				$(".popup_clinic_reservation_register").css("display", "none");
				$(".popup_therapy_reservation_register").css("display", "none");
				$(".popup_wrap").css("display","none");
				
				draw_time_table_by_case(stbn);
			}else{
				alert("예약등록이 정상적으로 등록되지 않았습니다. 다시 한번 등록하세요.");
			}
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}
function post_ftReservation_register(vo, stbn){
	var arrDate = get_between_date(vo.fix_day_start, vo.fix_day_end);
	var data = {"vo":vo, "date":arrDate};
	
	$.ajax({
		url:"${pageContext.request.contextPath}/ftReservationRegister",
		type:"post",
		dataType:"text",
		data:JSON.stringify(data),
		async:false,
		contentType : "application/json; charset=UTF-8",
		success:function(json){
			if(json == "OK"){
				alert("예약등록이 완료되었습니다.");
				$("#reservation_view_btn").html("");
				$(".reservation_register_btn").css("display", "none");
				$("#reservation_view_btn").css("display", "none");
				$(".popup_clinic_reservation_register").css("display", "none");
				$(".popup_therapy_reservation_register").css("display", "none");
				$(".popup_wrap").css("display","none");
				
				draw_time_table_by_case(stbn);
			}else{
				alert("예약등록이 정상적으로 등록되지 않았습니다. 다시 한번 등록하세요.");
			}
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

//주간 선택하면 select 태그에 값 설정
function draw_week_calendar(date, emp, type, idxx){
	
	var today = $(".calendar_select_date").val();
	var year = Number(today.substring(0,4));
	var month = today.substring(5,7);
	var str  = "";
	for(i=year-3; i < year+4; i++){
		if(i == year){
			str += "<option value='"+i+"' selected='selected'>"+i+"년</option>";
		}else{
			str += "<option value='"+i+"'>"+i+"년</option>";
		}
	}
	$("#sh_year").html(str);
	str = "";
	$("#sh_month > option[value='"+month+"']").prop("selected","selected");
	
	$(emp).each(function(){
		str += "<option value='"+this.eno+"'>"+this.name+"</option>";
	});
	$(".week_select_box_wrap > select[name='employee']").html(str);
	str="";
	
	makeWeekSelectOptions(type, idxx);
	
}

function draw_week_timetable(etype, idxx){
	var week_time=get_hospitalInfo_byDay("주간");
	var week_sTime=Number(week_time.start_time)/60;
	var week_eTime=Number(week_time.end_time)/60;
	var employee = $(".week_select_box_wrap > select[name='employee']").val();
	var select_week = $("#sh_week").val();
	var select_week_split = select_week.split("|"); 
	var sDate = new Date(select_week_split[0]);
	var tomorrow;
	var arrDay = ["일", "월", "화", "수", "목", "금", "토"];
	var arrDate = [select_week_split[0]];
	
	for(var i=1; i < 7; i++){
		tomorrow = new Date(sDate.setDate(sDate.getDate()+1));
		var year1 = tomorrow.getFullYear();//yyyy
		var month1 = (1 + tomorrow.getMonth());//M
		month1 = month1 >= 10 ? month1 : '0' + month1;// month 두자리로 저장
		var day1 = tomorrow.getDate();//d
		day1 = day1 >= 10 ? day1 : '0' + day1;//day 두자리로 저장
		tomorrow = year1+'-'+month1+'-'+day1;
		arrDate.push(tomorrow);
	}
	
	str = "<table><tr><td></td>";
	
	for(var i=week_sTime; i < week_eTime; i++){
		str += "<td >"+i+"시</td>";
	}
	str += "</tr>";
	
	for(var i=1; i<7; i++){
		str += "<tr class='"+employee+"_"+arrDate[i]+"'><td>"+arrDay[i]+"("+arrDate[i].split("-")[2]+"일)<input type='hidden' name='day' value='"+arrDay[i]+"'></td>";
		for(n=8; n < 20; n++){
			str += "<td class='"+employee+"_"+arrDate[i]+"_"+n+"'></td>";
		}
		str += "</tr>";
	}
	str += "</table>";
	
	$(".time_table_wrap").html(str);
	
	draw_week_reservation(arrDate, etype, employee, idxx);
}

function draw_week_reservation(week, etype, eno, idxx){
	var json;
	var str="";
	var target_tag = "";
	var week_sDate = week[1];
	var week_eDate = week[6];
	var date;
	var rtype;
	var patient;
	var clinic;
	var clinic_time;
	var time;
	var hour;
	var minute;
	var overMinute;
	if(idxx == 3 || idxx == 6){//고정 View
		json = get_fixReservationList_byDate_byEmployee(etype, eno, week);
		if(etype == "doctor"){//진료고정 view
			$(json).each(function(){
				$($(this.vo)).each(function(){
					patient = get_patient_by_pno(this.pno);
					clinic = get_clinic_by_cno(this.clinic);
					clinic_time = Number(clinic.time);
					time = Number(this.rtime);
					hour = parseInt(time/60);
					minute = time%60;
					overMinute = (minute+clinic_time)-60;
					
					if(overMinute >= 0){
						if(overMinute < 10){
							overMinute = "0"+overMinute;
						}
						end_time = (hour+1)+":"+overMinute;
					}else{
						end_time = minute+clinic_time;
					}
					if(minute == 0){
						minute = "0"+minute;
					}
					var cs = $(".time_table_wrap > table tr > td > input[value='"+this.fix_day+"']").parent().parent().prop("class");
					
					if(this.result == "예약취소"){
						target_tag = "."+cs+"_"+hour;
						str = "<p class='patient_p_tag' style='background:#e9e9e9; color:gray; border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name
							+ "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='"+this.rtype+"'></p>";
						$(target_tag).append(str);
					}else{
						target_tag = "."+cs+"_"+hour;
						str = "<p class='patient_p_tag' style='background:#ffaf7a;border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name;
						if(this.desk_state == "접수완료"){
							str += "<img style='width:15px;' class='footImg' src='${pageContext.request.contextPath}/resources/images/foot.png'>";
						}
						str	+= "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='"+this.rtype+"'></p>";
						$(target_tag).append(str);
						
						if(overMinute > 0){
							target_tag = "."+cs+"_"+(hour+1);
							str = "<p style='background:black;color:#fff;'>~"+end_time+"예약불가</p>";
							$(target_tag).append(str);
						}
					}
					
					
				})
			});
		}else if(etype == "therapist"){//치료고정 view
			$(json).each(function(){
				$($(this.vo)).each(function(){
					patient = get_patient_by_pno(this.pno);
					clinic = get_clinic_by_cno(this.clinic);
					clinic_time = Number(clinic.time);
					time = Number(this.rtime);
					hour = parseInt(time/60);
					minute = time%60;
					overMinute = (minute+clinic_time)-60;
					
					if(overMinute >= 0){
						if(overMinute < 10){
							overMinute = "0"+overMinute;
						}
						end_time = (hour+1)+":"+overMinute;
					}else{
						end_time = minute+clinic_time;
					}
					if(minute == 0){
						minute = "0"+minute;
					}
					var cs = $(".time_table_wrap > table tr > td > input[value='"+this.fix_day+"']").parent().parent().prop("class");
					
					if(this.result == "예약취소"){
						target_tag = "."+cs+"_"+hour;
						str = "<p class='patient_p_tag' style='background:#e9e9e9; color:gray; border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name
							+ "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='"+this.rtype+"'></p>";
						$(target_tag).append(str);
					}else{
						target_tag = "."+cs+"_"+hour;
						str = "<p class='patient_p_tag' style='background:#ffaf7a;border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name;
						if(this.desk_state == "접수완료"){
							str += "<img style='width:15px;' class='footImg' src='${pageContext.request.contextPath}/resources/images/foot.png'>";
						}
						str	+= "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='"+this.rtype+"'></p>";
						$(target_tag).append(str);
						
						if(overMinute > 0){
							target_tag = "."+cs+"_"+(hour+1);
							str = "<p style='background:black;color:#fff;'>~"+end_time+"예약불가</p>";
							$(target_tag).append(str);
						}
					}
					
					
				})
			});
		}
	}else{//주간 view
		json = get_reservationList_byDate_byEmployee(etype, eno, week);
		if(etype == "doctor"){//진료주간 view
			$(json).each(function(){
				$($(this.ncr)).each(function(){
					patient = get_patient_by_pno(this.pno);
					clinic = get_clinic_by_cno(this.clinic);
					clinic_time = Number(clinic.time);
					time = Number(this.rtime);
					hour = parseInt(time/60);
					minute = time%60;
					overMinute = (minute+clinic_time)-60;
					
					if(overMinute >= 0){
						if(overMinute < 10){
							overMinute = "0"+overMinute;
						}
						end_time = (hour+1)+":"+overMinute;
					}else{
						end_time = minute+clinic_time;
					}
					if(minute == 0){
						minute = "0"+minute;
					}
					
					if(this.result == "예약취소"){
						target_tag = "."+eno+"_"+this.rdate+"_"+hour;
						str = "<p class='patient_p_tag' style='background:#e9e9e9;color:gray;border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name
							+ "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='"+this.rtype+"'></p>";
						$(target_tag).append(str);
					}else{
						target_tag = "."+eno+"_"+this.rdate+"_"+hour;
						str = "<p class='patient_p_tag' style='background:"+clinic.color+";border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name;
						if(this.desk_state == "접수완료"){
							str += "<img style='width:15px;' class='footImg' src='${pageContext.request.contextPath}/resources/images/foot.png'>";
						}
						str	+= "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='"+this.rtype+"'></p>";
						$(target_tag).append(str);
						
						if(overMinute > 0){
							target_tag = "."+eno+"_"+this.rdate+"_"+(hour+1);
							str = "<p style='background:black;color:#fff;'>~"+end_time+"예약불가</p>";
							$(target_tag).append(str);
						}
					}
					
					
				})
				$($(this.fcr)).each(function(){
					patient = get_patient_by_pno(this.pno);
					clinic = get_clinic_by_cno(this.clinic);
					clinic_time = Number(clinic.time);
					time = Number(this.rtime);
					hour = parseInt(time/60);
					minute = time%60;
					overMinute = (minute+clinic_time)-60;
					
					if(overMinute >= 0){
						if(overMinute < 10){
							overMinute = "0"+overMinute;
						}
						end_time = (hour+1)+":"+overMinute;
					}else{
						end_time = minute+clinic_time;
					}
					if(minute == 0){
						minute = "0"+minute;
					}
					var cs = $(".time_table_wrap > table tr > td > input[value='"+this.fix_day+"']").parent().parent().prop("class");
					
					if(this.result == "예약취소"){
						target_tag = "."+cs+"_"+hour;
						str = "<p class='patient_p_tag' style='background:#e9e9e9;color:gray;border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name
							+ "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='"+this.rtype+"'></p>";
						$(target_tag).append(str);
					}else{
						target_tag = "."+cs+"_"+hour;
						str = "<p class='patient_p_tag' style='background:#ffaf7a;border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name;
						if(this.desk_state == "접수완료"){
							str += "<img style='width:15px;' class='footImg' src='${pageContext.request.contextPath}/resources/images/foot.png'>";
						}
						str	+= "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='"+this.rtype+"'></p>";
						$(target_tag).append(str);
						
						if(overMinute > 0){
							target_tag = "."+cs+"_"+(hour+1);
							str = "<p style='background:black;color:#fff;'>~"+end_time+"예약불가</p>";
							$(target_tag).append(str);
						}
					}

				})
			});
		}else if(etype == "therapist"){//치료주간 view
			$(json).each(function(){
				$($(this.ntr)).each(function(){
					patient = get_patient_by_pno(this.pno);
					clinic = get_clinic_by_cno(this.clinic);
					clinic_time = Number(clinic.time);
					time = Number(this.rtime);
					hour = parseInt(time/60);
					minute = time%60;
					overMinute = (minute+clinic_time)-60;
					
					if(overMinute >= 0){
						if(overMinute < 10){
							overMinute = "0"+overMinute;
						}
						end_time = (hour+1)+":"+overMinute;
					}else{
						end_time = minute+clinic_time;
					}
					if(minute == 0){
						minute = "0"+minute;
					}
					
					if(this.result == "예약취소"){
						target_tag = "."+eno+"_"+this.rdate+"_"+hour;
						str = "<p class='patient_p_tag' style='background:#e9e9e9;color:gray;border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name
							+ "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='"+this.rtype+"'></p>";
						$(target_tag).append(str);
					}else{
						target_tag = "."+eno+"_"+this.rdate+"_"+hour;
						str = "<p class='patient_p_tag' style='background:"+clinic.color+";border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name;
						if(this.desk_state == "접수완료"){
							str += "<img style='width:15px;' class='footImg' src='${pageContext.request.contextPath}/resources/images/foot.png'>";
						}
						str	+= "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='"+this.rtype+"'></p>";
						$(target_tag).append(str);
						
						if(overMinute > 0){
							target_tag = "."+eno+"_"+this.rdate+"_"+(hour+1);
							str = "<p style='background:black;color:#fff;'>~"+end_time+"예약불가</p>";
							$(target_tag).append(str);
						}
					}
				})
				$($(this.ftr)).each(function(){
					patient = get_patient_by_pno(this.pno);
					clinic = get_clinic_by_cno(this.clinic);
					clinic_time = Number(clinic.time);
					time = Number(this.rtime);
					hour = parseInt(time/60);
					minute = time%60;
					overMinute = (minute+clinic_time)-60;
					
					if(overMinute >= 0){
						if(overMinute < 10){
							overMinute = "0"+overMinute;
						}
						end_time = (hour+1)+":"+overMinute;
					}else{
						end_time = minute+clinic_time;
					}
					if(minute == 0){
						minute = "0"+minute;
					}
					var cs = $(".time_table_wrap > table tr > td > input[value='"+this.fix_day+"']").parent().parent().prop("class");
					
					if(this.result == "예약취소"){
						target_tag = "."+cs+"_"+hour;
						str = "<p class='patient_p_tag' style='background:#e9e9e9; color:gray; border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name
							+ "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='"+this.rtype+"'></p>";
						$(target_tag).append(str);
					}else{
						target_tag = "."+cs+"_"+hour;
						str = "<p class='patient_p_tag' style='background:#ffaf7a;border:1px solid gray;'>"+minute+"~"+end_time+" "+patient.name;
						if(this.desk_state == "접수완료"){
							str += "<img style='width:15px;' class='footImg' src='${pageContext.request.contextPath}/resources/images/foot.png'>";
						}
						str	+= "<input type='hidden' name='rno' value='"+this.rno+"'><input type='hidden' name='type' value='"+this.rtype+"'></p>";
						$(target_tag).append(str);
						
						if(overMinute > 0){
							target_tag = "."+cs+"_"+(hour+1);
							str = "<p style='background:black;color:#fff;'>~"+end_time+"예약불가</p>";
							$(target_tag).append(str);
						}
					}
				})
			});
		}
	}

	
}

//시작날짜 종료날짜 사이 매주 요일의 날짜 반환
function get_between_date(date1, date2){
	var arrDate = [];
	var sDate = new Date(date1).getTime();
	var eDate = new Date(date2).getTime();
	var today = new Date(date1).getTime();
	var nextWeekDate = sDate;
	
	var year;
	var month;
	var day;
	var result_date;
	
	while(nextWeekDate <= eDate){
		arrDate.push(nextWeekDate);
		nextWeekDate = nextWeekDate+(1000*60*60*24*7);
	}
	
	for(var i=0; i<arrDate.length; i++){
		year=new Date(arrDate[i]).getFullYear();
		month=new Date(arrDate[i]).getMonth()+1;
		month = month >= 10 ? month : '0' + month;
		day=new Date(arrDate[i]).getDate();
		day = day >= 10 ? day : '0' + day;
		
		arrDate[i]= year+"-"+month+"-"+day;
	}
	return arrDate;
}

function open_reservation_info_view(type, rno){
	var rData;
	var pData;
	var eData;
	var cData;
	var time;
	var rtype;
	if(type == "nc"){
		rData = get_ncReservation_byRno(rno);
		rtype="일반진료예약";
	}else if(type == "nt"){
		rData = get_ntReservation_byRno(rno);
		rtype="일반치료예약";
	}else if(type == "fc"){
		rData = get_fcReservation_byRno(rno);
		rtype="고정진료예약";
	}else if(type == "ft"){
		rData = get_ftReservation_byRno(rno);
		rtype="고정치료예약";
	}
	
	$(".popup_reservation_info_btn_wrap > p").css({"background":"#fff", "color":"black"});
	if(rData.result =="예약완료"){
		$(".popup_reservation_info_btn_wrap > p").eq(0).css({"background":"#057be8", "color":"#fff"});
	}else if(rData.result == "접수완료"){
		$(".popup_reservation_info_btn_wrap > p").eq(1).css({"background":"#057be8", "color":"#fff"});
	}else if(rData.result == "예약취소"){
		$(".popup_reservation_info_btn_wrap > p").eq(2).css({"background":"#057be8", "color":"#fff"});
	}else{
		$(".popup_reservation_info_btn_wrap > p").eq(0).css({"background":"#057be8", "color":"#fff"});
	}
	
	pData = get_patient_by_pno(rData.pno);
	eData = get_employee_byEno(rData.eno);
	cData = get_clinic_by_cno(rData.clinic);
	
	var str = rtype+"<span> "+pData.name+"("+pData.cno+")님</span><input type='hidden' name='rtype' value='"+rData.rtype+"'>"
			+"<input type='hidden' name='rno' value='"+rData.rno+"'>";
	$(".popup_reservation_info_view > h2").html(str);
	$(".popup_reservation_info_view > table tr:first-child > td > span").html(pData.phone);
	$(".popup_reservation_info_view > table tr:nth-child(2) > td > span").html(rData.rdate+" "+rData.rtime);
	$(".popup_reservation_info_view > table tr:nth-child(3) > td > span").html(cData.code_name+" / "+eData.name);
	$(".popup_reservation_info_view > table tr:last-child > td > span").html(rData.memo);
	$(".popup_reservation_info_view").css("display", "block");
	$(".popup_wrap").css("display", "block");
}

function draw_reservation_update_view(rno, rtype){
	var json;
	var type;
	var patient;
	var emp;
	var clinic;
	if(rtype == "nc"){
		json = get_ncReservation_byRno(rno);
		type = "일반진료";
		emp = get_employeeList_byType("doctor");
		clinic = get_clinic_by_type("진료");
	}else if(rtype == "nt"){
		json = get_ntReservation_byRno(rno);
		type = "일반치료";
		emp = get_employeeList_byType("therapist");
		clinic = get_clinic_by_type("치료");
	}else if(rtype == "fc"){
		json = get_fcReservation_byRno(rno);
		type = "고정진료";
		emp = get_employeeList_byType("doctor");
		clinic = get_clinic_by_type("진료");
	}else if(rtype == "ft"){
		json = get_ftReservation_byRno(rno);
		type = "고정치료";
		emp = get_employeeList_byType("therapist");
		clinic = get_clinic_by_type("치료");
	}
	patient = get_patient_by_pno(json.pno);
	var rdate_rtime = json.rdate+" "+parseInt(Number(json.rtime)/60)+":"+((Number(json.rtime)%60>9?'':'0')+Number(json.rtime)%60);
	var str;
	$(emp).each(function(){
		str += "<option value='"+this.eno+"'>"+this.name+"</option>";
	});
	$(".popup_reservation_update > table tr:nth-child(4) > td select[name='emp']").html(str);
	str = "";
	
	$(clinic).each(function(){
		str += "<option value='"+this.cno+"'>"+this.code_name+"</option>";
	});
	$(".popup_reservation_update > table tr:nth-child(5) > td select[name='clinic']").html(str);
	
	$(".popup_reservation_update > h2 > span").text(type+" "+patient.name+"("+patient.cno+")님 ");
	$(".popup_reservation_update > h2").append("<input type='hidden' name='rno' value='"+rno+"'><input type='hidden' name='rtype' value='"+rtype+"'><input type='hidden' name='pno' value='"+json.pno+"'>");
	$(".popup_reservation_update > table tr:first-child > td").text(rdate_rtime);
	$(".popup_reservation_update > table tr:nth-child(2) > td > input[name='rdate']").val(json.rdate);
	$(".popup_reservation_update > table tr:nth-child(4) > td select[name='emp'] > option[value='"+json.eno+"']").prop("selected",true);
	$(".popup_reservation_update > table tr:nth-child(5) > td select[name='clinic'] > option[value='"+json.clinic+"']").prop("selected",true);
	$(".popup_reservation_update > table tr:nth-child(6) > td >input[name='memo']").val(json.memo);
	$(".popup_reservation_info_view").css("display","none");
	$(".popup_reservation_update").css("display","block");
	
}

function update_reservation_info(){
	var now = new Date();
	
	var pno = $(".popup_reservation_update > h2 > input[name='pno']").val();
	var rno = $(".popup_reservation_update > h2 > input[name='rno']").val();
	var rtype = $(".popup_reservation_update > h2 > input[name='rtype']").val();
	var rdate = $(".popup_reservation_update > table tr:nth-child(2) > td > input[name='rdate']").val();
	var rtime1 = $(".popup_reservation_update > table tr:nth-child(3) > td > select[name='rtime1']").val();
	var rtime2 = $(".popup_reservation_update > table tr:nth-child(3) > td > select[name='rtime2']").val();
	var rtime = Number(rtime1)+Number(rtime2);
	var emp = $(".popup_reservation_update > table tr:nth-child(4) > td > select[name='emp']").val();
	var clinic = $(".popup_reservation_update > table tr:nth-child(5) > td > select[name='clinic']").val();
	var memo = $(".popup_reservation_update > table tr:nth-child(6) > td > input[name='memo']").val();
	var updateMemo = $(".popup_reservation_update > table tr:nth-child(7) > td > input[name='updateMemo']").val();
	var before_reservation;
	if(rtype == "nc"){
		before_reservation = get_ncReservation_byRno(rno);
	}else if(rtype == "fc"){
		before_reservation = get_fcReservation_byRno(rno);
	}else if(rtype == "nt"){
		before_reservation = get_ntReservation_byRno(rno);
	}else if(rtype == "ft"){
		before_reservation = get_ftReservation_byRno(rno);
	}
	var before_info = $(".popup_reservation_update > table tr:first-child > td").text()+" "+get_employee_byEno(before_reservation.eno).name;
	var after_info = rdate+" "+Number(rtime1/60)+":"+((Number(rtime2)>9?'':'0')+rtime2)+" "+$(".popup_reservation_update > table tr:nth-child(4) > td > select[name='emp'] option:selected").text();
	var update_info = now.getFullYear()+"-"+(((now.getMonth()+1)>9?'':'0')+(now.getMonth()+1))+"-"+((now.getDate()>9?'':'0')+now.getDate())+" "
					+ now.getHours()+":"+((now.getMinutes()>9?'':'0')+now.getMinutes())+" "+$("#session_login_name").val();
	
	var data = {pno:pno, rno:rno, rtype:rtype, rdate:rdate, rtime:rtime, emp:emp, clinic:clinic, memo:memo, updateMemo:updateMemo, before_info:before_info, after_info:after_info, update_type:"일정변경", update_info:update_info};
	
	$.ajax({
		url:"${pageContext.request.contextPath}/updateReservationInfo",
		type:"post",
		dataType:"text",
		data:JSON.stringify(data),
		async:false,
		contentType : "application/json; charset=UTF-8",
		success:function(json){
			if(json == "ok"){
				alert("일정변경이 완료되었습니다.");
			}else{
				alert("예약등록이 정상적으로 등록되지 않았습니다. 다시 한번 등록하세요.");
			}
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

function update_reservation_deskState(rtype, rno, state, writer, regdate, stbn){
	var reason = $(".popup_reservation_info_cancel_wrap > table tr > td > textarea[name='cancel_reason']").val();
	if(reason == ""){
		reason = "_";
	}

	$.ajax({
		url:"${pageContext.request.contextPath}/updateReservationDeskState/"+rtype+"/"+rno+"/"+state+"/"+writer+"/"+regdate+"/"+reason,
		type:"post",
		dataType:"text",
		async:false,
		success:function(json){
			if(json == "ok"){
								
				alert(state+" 되었습니다.");
				$(".popup_reservation_info_cancel_wrap").css("display","none");
				$(".popup_reservation_info_view").css("display", "none");
				$(".popup_wrap").css("display","none");
				
				draw_time_table_by_case(stbn);
			}else{
				alert("예약등록이 정상적으로 등록되지 않았습니다. 다시 한번 등록하세요.");
			}
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

function update_reservation_state(idxx, rtype, rno, state, writer, regdate, stbn){
	if(idxx == 0 || idxx == 1){
		update_reservation_deskState(rtype, rno, state, writer, regdate, stbn);
	}else if(idxx == 2){
		$(".popup_reservation_info_cancel_wrap").css("display","block");
	}
}

function get_reservation_record_all(info){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/reservationRecordGetAll",
		type:"get",
		data:info,
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

function draw_reservation_record_table(info){
	var json = get_reservation_record_all(info);
	var str = "";
	var time;
	var hour;
	var minute;
	var overMinute;
	
	str = "<table class='tbl_reservation_record'><tr><th>환자명</th><th>담당자</th><th>분류</th><th>종류</th><th>예정일시</th><th>접수일시</th><th>치료완료일시</th><th>최초등록일시</th></tr>";
	if(json.list.length == 0){
		str += "<tr><td colspan='8'>등록된 정보가 없습니다.</td></tr>";
	}else{
		$(json.list).each(function(){
			time = Number(this.rtime);
			hour = parseInt(time/60);
			minute = time%60;

			if(minute < 10){
				minute = "0"+minute;
			}
			if(hour < 10){
				hour = "0"+hour;
			}
			
			str += "<tr><td>"+this.pname+"</td><td>"+this.ename+"</td>";
			if(this.rtype == "nc"){
				str += "<td>일반진료</td>";
			}else if(this.rtype == "fc"){
				str += "<td>고정진료</td>";
			}else if(this.rtype == "nt"){
				str += "<td>일반치료</td>";
			}else if(this.rtype == "ft"){
				str += "<td>고정진료</td>";
			}
			str += "<td>"+this.cname+"</td><td>"+this.rdate+" "+hour+":"+minute+"</td><td>"+this.reception_info+"</td><td>"+this.therapy_info+"</td><td>"+this.register_info+"</td></tr>";
		});
		str += "</table>";
		
		str += "<div class='reservation_record_page'><ul>";
		if(json.pageMaker.prev){
			str += "<li><a href='page="+(json.pageMaker.startPage-1)+"&perPageNum=10&keyword1="+json.pageMaker.cri.keyword1+"&keyword2="+json.pageMaker.cri.keyword2+"&keyword3="+json.pageMaker.cri.keyword3+"&keyword4="+json.pageMaker.cri.keyword4+"'>&laquo;</a></li>";
		}
		for(var i=json.pageMaker.startPage; i<=json.pageMaker.endPage; i++){
			
			if(json.pageMaker.cri.page == i){
				str += "<li class='active1'><a class='active2' href='page="+i+"&perPageNum=10&keyword1="+json.pageMaker.cri.keyword1+"&keyword2="+json.pageMaker.cri.keyword2+"&keyword3="+json.pageMaker.cri.keyword3+"&keyword4="+json.pageMaker.cri.keyword4+"'>"+i+"</a></li>";
			}else{
				str += "<li><a href='page="+i+"&perPageNum=10&keyword1="+json.pageMaker.cri.keyword1+"&keyword2="+json.pageMaker.cri.keyword2+"&keyword3="+json.pageMaker.cri.keyword3+"&keyword4="+json.pageMaker.cri.keyword4+"'>"+i+"</a></li>"
			}
		}
		if(json.pageMaker.next){
			str += "<li><a href='page="+(json.pageMaker.endPage+1)+"&perPageNum=10&keyword1="+json.pageMaker.cri.keyword1+"&keyword2="+json.pageMaker.cri.keyword2+"&keyword3="+json.pageMaker.cri.keyword3+"&keyword4="+json.pageMaker.cri.keyword4+"'>&raquo;</a></li>";
		}
		str += "</ul></div>";	
	}
	$(".time_table_wrap").html(str);
	
}

//변경이력 Get All
function get_reservation_update_record_all(info){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/reservationUpdateRecordGetAll",
		type:"get",
		data:info,
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

//변경이력 view 생성
function draw_reservation_update_record_table(info){
	var json = get_reservation_update_record_all(info);
	var str = "";
	var time;
	var hour;
	var minute;
	var overMinute;
	
	str = "<table class='tbl_reservation_update_record'><tr><th>환자명</th><th>예정시간</th><th>변경종류</th><th>변경내용</th><th>변경등록일시</th><th>변경메모</th></tr>";
	if(json.list.length == 0){
		str += "<tr><td colspan='6'>등록된 정보가 없습니다.</td></tr>";
	}else{
		$(json.list).each(function(){
			time = Number(this.rtime);
			hour = parseInt(time/60);
			minute = time%60;

			if(minute < 10){
				minute = "0"+minute;
			}
			if(hour < 10){
				hour = "0"+hour;
			}
			
			str += "<tr><td>"+this.pname+"</td><td>"+this.before_info+"</td>";
			if(this.rtype == "nc"){
				str += "<td>일반진료 일정변경</td>";
			}else if(this.rtype == "fc"){
				str += "<td>고정진료 일정변경</td>";
			}else if(this.rtype == "nt"){
				str += "<td>일반치료 일정변경</td>";
			}else if(this.rtype == "ft"){
				str += "<td>고정치료 일정변경</td>";
			}
			str += "<td>"+this.after_info+"</td><td>"+this.update_info+"</td><td>"+this.update_memo+"</td></tr>";
		});
		str += "</table>";
		
		str += "<div class='reservation_update_record_page'><ul>";
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
	}
	$(".time_table_wrap").html(str);
}


function get_normalOff_byDate(date){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/selectNormalOffByDate/"+date,
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

//일반휴무 선택날짜별 그리기(진료&치료종합, 진료종합, 치료종합)
function draw_normalOff_in_timetable(date){
	var offData = get_normalOff_byDate(date);
	var timeTableClass = "";
	
	$(offData).each(function(){
		for(var i=((this.starttime)/60) ; i<((this.endtime)/60) ; i++){
			timeTableClass = "."+this.etype+"_"+this.eno+"_"+i;
			$(timeTableClass).html("");
			$(timeTableClass).append("<p style='background:#e8f5e9; color:#acb1b4;'>"+this.offtype+"</p>")
		}
	});
}

//주간, 고정 휴무GET
function get_normalOff_byWeek(week, eno){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/selectNormalOffByWeek/"+week+"/"+eno,
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

function draw_normalOff_in_weektable(){
	var select_week = $("#sh_week").val();
	var eno = $(".week_select_box_wrap > select[name='employee']").val();
	var sWeek =select_week.split("|")[0];
	var arrWeek=[];
	var strDate;
	arrWeek.push(sWeek);
	var date = new Date(sWeek);
	for(var i=1; i<7; i++){
		date.setDate(date.getDate()+1);
		strDate = date.getFullYear()+"-"+(((date.getMonth()+1)>9?'':'0')+(date.getMonth()+1))+"-"+((date.getDate()>9?'':'0')+date.getDate());
		arrWeek.push(strDate);
	}
	
	var offData = get_normalOff_byWeek(arrWeek, eno);

	var target_class;
	
	for(var i=1; i<arrWeek.length; i++){
		$(offData[arrWeek[i]]).each(function(){
			for(var n=Number(this.starttime)/60; n<Number(this.endtime)/60; n++){
				target_class = "."+this.eno+"_"+arrWeek[i]+"_"+n;
				$(target_class).html();
				$(target_class).append("<p style='background:#e8f5e9; color:#acb1b4;'>"+this.offtype+"</p>");
			}
		});
	}
}

function get_normalOff_all(info){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/normalOffGetAll",
		type:"get",
		data:info,
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

function draw_normalOff_table(info){
	var json = get_normalOff_all(info);
	var str = "";
	var emp;
	
	str = "<table class='tbl_normal_off'><tr><th>이름</th><th>휴무종류</th><th>시작일시</th><th>종료일시</th><th>등록일시</th><th>관리</th></tr>";
	if(json.list.length == 0){
		str += "<tr><td colspan='6'>등록된 정보가 없습니다.</td></tr>";
	}else{
		$(json.list).each(function(){
			emp = get_employee_byEno(this.eno);
			str += "<tr><td>"+emp.name+"</td><td>"+this.offtype+"</td><td>"+this.startdate+" "+(Number(this.starttime)/60)+"시</td><td>"+this.enddate+" "+(Number(this.endtime)/60)+"시</td><td>"+this.regdate+"</td><td>"+this.writer+"</td><td><button>수정</button></td></tr>";
			/* str += "<tr><td>"+emp.name+"</td><td>"+this.offtype+"</td>"
			+ "<td>"+this.startdate+" "+(Number(this.starttime)/60)+"시</td><td>"+this.enddate+" "+(Number(this.endtime)/60)+"시</td><td>"+this.regdate+" "+this.writer+"</td><td><button>수정</button></td></tr>"; */
		});
		str += "</table>";
		
		str += "<div class='normal_off_page'><ul>";
		if(json.pageMaker.prev){
			str += "<li><a href='page="+(json.pageMaker.startPage-1)+"&perPageNum=10&keyword1="+json.pageMaker.cri.keyword1+"&keyword2="+json.pageMaker.cri.keyword2+"'>&laquo;</a></li>";
		}
		for(var i=json.pageMaker.startPage; i<=json.pageMaker.endPage; i++){
			
			if(json.pageMaker.cri.page == i){
				str += "<li class='active1'><a class='active2' href='page="+i+"&perPageNum=10&keyword1="+json.pageMaker.cri.keyword1+"&keyword2="+json.pageMaker.cri.keyword2+"'>"+i+"</a></li>";
			}else{
				str += "<li><a href='page="+i+"&perPageNum=10&keyword1="+json.pageMaker.cri.keyword1+"&keyword2="+json.pageMaker.cri.keyword2+"'>"+i+"</a></li>"
			}
		}
		if(json.pageMaker.next){
			str += "<li><a href='page="+(json.pageMaker.endPage+1)+"&perPageNum=10&keyword1="+json.pageMaker.cri.keyword1+"&keyword2="+json.pageMaker.cri.keyword2+"'>&raquo;</a></li>";
		}
		str += "</ul></div>";	
	}
	$(".time_table_wrap").html(str);
}

function get_fixOff_byDate(date){
	
}

function get_fixOff_all(info){
	var dt;
	$.ajax({
		url:"${pageContext.request.contextPath}/fixOffGetAll",
		type:"get",
		data:info,
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

function draw_fixOff_table(info){
	var json = get_fixOff_all(info);
	var str = "";
	var emp;
	
	str = "<table class='tbl_fix_off'><tr><th>이름</th><th>휴무종류</th><th>요일</th><th>시작일시</th><th>종료일시</th><th>등록일시</th><th>관리</th></tr>";
	if(json.list.length == 0){
		str += "<tr><td colspan='6'>등록된 정보가 없습니다.</td></tr>";
	}else{
		$(json.list).each(function(){
			emp = get_employee_byEno(this.eno);
			
			str += "<tr><td>"+emp.name+"</td><td>"+this.offtype+"</td><td>"+this.dow+"</td>"
				+ "<td>"+this.startdate+" "+(Number(this.starttime)/60)+"시</td><td>"+this.enddate+" "+(Number(this.endtime)/60)+"시</td><td>"+this.regdate+" "+this.writer+"</td><td><button>수정</button></td></tr>";
		});
		str += "</table>";
		
		str += "<div class='normal_off_page'><ul>";
		if(json.pageMaker.prev){
			str += "<li><a href='page="+(json.pageMaker.startPage-1)+"&perPageNum=10&keyword1="+json.pageMaker.cri.keyword1+"&keyword2="+json.pageMaker.cri.keyword2+"'>&laquo;</a></li>";
		}
		for(var i=json.pageMaker.startPage; i<=json.pageMaker.endPage; i++){
			
			if(json.pageMaker.cri.page == i){
				str += "<li class='active1'><a class='active2' href='page="+i+"&perPageNum=10&keyword1="+json.pageMaker.cri.keyword1+"&keyword2="+json.pageMaker.cri.keyword2+"'>"+i+"</a></li>";
			}else{
				str += "<li><a href='page="+i+"&perPageNum=10&keyword1="+json.pageMaker.cri.keyword1+"&keyword2="+json.pageMaker.cri.keyword2+"'>"+i+"</a></li>"
			}
		}
		if(json.pageMaker.next){
			str += "<li><a href='page="+(json.pageMaker.endPage+1)+"&perPageNum=10&keyword1="+json.pageMaker.cri.keyword1+"&keyword2="+json.pageMaker.cri.keyword2+"'>&raquo;</a></li>";
		}
		str += "</ul></div>";	
	}
	$(".time_table_wrap").html(str);
}

$(function(){
	//진료view에서 무슨 탭 눌러졌는지 기억하기 위한 변수
	var storage_timetable_btn_num=0;
	
	//달력 생성
	buildCalendar();
	
	$(".calendar_select_date").val(get_today());
	//$(".calendar_select_date").val("2019-04-15");
	
	//날짜마다 요일 표시
	write_yoil();
	
	//환자table 생성
	draw_patient_table();
	
	draw_time_table_by_case(0); 
	
	
	//달력 날짜 클릭 시 해당 정보GET
	$(document).on("click", "#calendar td:not(.tr_not > td)", function(){
		//날짜마다 요일 표시
		write_yoil();
		
		//클릭한 td 붉은색 네모
		$("#calendar td").css("border","0");
		$(this).not(".tr_not > td").css("border","1px solid red");
		
		//클릭한 날짜 정보 GET
		var date = $(this).text();
		var update_date = "";
		var year_month = $("#select_year_month").val();
		var fulldate = "";
		
		//날짜 일이 한자리면 앞에 숫자0 추가
		if(date.length <= 1){
			update_date = "0"+date;
		}else{
			update_date=date;
		}
		
		fulldate = year_month+"-"+update_date;
		var day = $(this).find("input[type='hidden']").val();
		$(".calendar_select_date").val(fulldate);
		//draw_time_table(fulldate);
		$(".time_table_wrap").html("");
		
		draw_time_table_by_case(storage_timetable_btn_num);
	 });
	
	//환자table에서 페이지 클릭
	$(document).on("click", ".page > ul > li > a", function(e){
		e.preventDefault();
		draw_patient_table($(this).attr("href"));
	});
	
	$(document).on("click", ".reservation_record_page > ul > li > a", function(e){
		e.preventDefault();
		draw_reservation_record_table($(this).attr("href"));
	});
	
	//환자 등록
	$(".patient_register_btn_wrap > button").click(function(){
		$(".popup_wrap").css("display","block");
		$(".popup_patient_register").css("display","block");
	});
	
	//환자등록 view에서 버튼 클릭
	$(".popup_patient_register_submit_wrap > p").click(function(){
		var idx = $(this).index();
		if(idx == 0){
			var cno = $(".popup_patient_register > table tr td > input[name='cno']").val();
			var name =  $(".popup_patient_register > table tr td > input[name='name']").val();
			var phone = $(".popup_patient_register > table tr td > input[name='phone']").val();
			var birth = $(".popup_patient_register > table tr td > input[name='birth']").val();
			var gender = $(".popup_patient_register > table tr td > select[name='gender']").val();
			var main_doctor = $(".popup_patient_register > table tr td > select[name='main_doctor']").val();
			var main_doctor_name = $(".popup_patient_register > table tr td > select[name='main_doctor'] option:selected").html();
			var main_therapist = $(".popup_patient_register > table tr td > select[name='main_therapist']").val();
			var main_therapist_name = $(".popup_patient_register > table tr td > select[name='main_therapist'] option:selected").html();
			var mail = $(".popup_patient_register > table tr td > input[name='mail']").val();
			var memo = $(".popup_patient_register > table tr td > input[name='memo']").val();
			if(main_therapist_name == "선택해주세요."){
				main_therapist_name = "";
			}
			var patient={
					pno:"0",
					cno:cno,
					name:name,
					phone:phone,
					birth:birth,
					gender:gender,
					main_doctor:main_doctor,
					main_doctor_name:main_doctor_name,
					main_therapist:main_therapist,
					main_therapist_name:main_therapist_name,
					mail:mail,
					memo:memo,
					activation:"",
					sub_therapist:""
					};
			
			post_patient_register(patient);
		}else{
			$(".popup_patient_register").css("display", "none");
			$(".popup_wrap").css("display","none");
		}
	});
	
	//환자table 환자 검색
	$("#searchBtn").click(function(){
    	var s=$("select[name='searchType']").val();
		var searchType = encodeURIComponent(s);
		var k=$("input[name='keyword']").val();
		var keyword = encodeURIComponent(k);
		draw_patient_table("page=1&perPageNum=10&searchType="+searchType+"&keyword="+keyword);
		
	});
	
	//환자테이블에서 정보 수정 클릭했을 때
	$(document).on("click", ".patient_update_btn", function(){
		var pno=$(this).parent().parent().find("input[type='hidden']").val();
		
		draw_patient_update_view(pno);
	});
	
	//환자정보수정 view에서 버튼 클릭
	$(".popup_patient_update_submit_wrap > p").click(function(){
		var idx = $(this).index();
		if(idx == 0){
			var pno = $(".popup_patientUpdate > input[name='pno']").val();
			var cno = $(".popup_patientUpdate > table tr td > input[name='cno']").val();
			var name =  $(".popup_patientUpdate > table tr td > input[name='name']").val();
			var phone = $(".popup_patientUpdate > table tr td > input[name='phone']").val();
			var birth = $(".popup_patientUpdate > table tr td > input[name='birth']").val();
			var gender = $(".popup_patientUpdate > table tr td > select[name='gender']").val();
			var main_doctor = $(".popup_patientUpdate > table tr td > select[name='main_doctor']").val();
			var main_doctor_name = $(".popup_patientUpdate > table tr td > select[name='main_doctor'] option:selected").html();
			var main_therapist = $(".popup_patientUpdate > table tr td > select[name='main_therapist']").val();
			var mail = $(".popup_patientUpdate > table tr td > input[name='mail']").val();
			var memo = $(".popup_patientUpdate > table tr td > input[name='memo']").val();
			var patient={pno:pno, cno:cno, name:name, phone:phone, birth:birth, gender:gender, main_doctor:main_doctor, main_doctor_name:main_doctor_name, main_therapist:main_therapist, mail:mail, memo:memo};
			
			post_patient_update_info(patient);
		}else{
			$(".popup_patientUpdate").css("display", "none");
			$(".popup_wrap").css("display","none");
		}
	});
	
	//헤더에 있는 환자이름 버튼
	$("#reservation_view_btn").click(function(){
		$(this).css("display", "none");
		$("#reservation_view_btn").html("");
		$(".reservation_register_btn").css("display", "none");
		
	});

	//진료, 치료 테이블에서 예약에 마우스 올리고 치웠을때
	$(document).on({
		mouseenter:function(){
			var rno = $(this).find("input[name='rno']").val();
			var type = $(this).find("input[name='type']").val();
			draw_simple_reservation_view(type, rno);
			
		},
		mouseleave:function(){}
		}, ".patient_p_tag");/*  */
		
	$(document).on("click", ".al_tbl_wrap2 > .al_tbl_wrap2_title", function(){
		$(".al_tbl_wrap2").css("display","none");
		$(".al_tbl_wrap2").html("");
	});
		
	//환자 리스트에서 예약-선택 버튼 클릭
	$(document).on("click", ".reservation_select_btn", function(){
		var reservation_click_pno = $(this).parent().parent().find("input[type='hidden']").val();
		var reservation_click_cno = $(this).parent().parent().find("td").eq(9).html();
		$("#reservation_view_btn").html($(this).parent().parent().find("td").eq(1).html()+"<input type='hidden' name='pno' value='"+reservation_click_pno+"'><input type='hidden' name='cno' value='"+reservation_click_cno+"'>");
		$("#reservation_view_btn").css("display", "inline-block");
		$(".reservation_register_btn").css("display", "block");
	});
	
	//진료테이블에서 + 클릭
	$(document).on("click", ".doctor_time_table .reservation_register_btn", function(){
		var select_doctor_time = $(this).parent().prop("class");
		var split_className = select_doctor_time.split(" ");//class가 2개라서 공백으로 걸러내면 첫번째 배열에는 doctor_의사번호_시간 걸러짐
		var split_doctor_time=split_className[0].split("_");
		
		var select_date_hospital_time_info = get_hospitalInfo_byDay($(".calendar_select_date").val());
		var select_day = get_day($(".calendar_select_date").val());
		
		var starttime=Number(select_date_hospital_time_info.start_time)/60;
		var endtime=Number(select_date_hospital_time_info.end_time)/60;
		
		var eno=split_doctor_time[1];
		var time=split_doctor_time[2];
		
		var str = "";
		for(i=starttime; i < endtime; i++){
			str += "<option value='"+i+"'>"+i+"시</option>";
		}
		
		$(".popup_clinic_reservation_register > h2 > span").html($("#reservation_view_btn").text()+"("+$("#reservation_view_btn > input[name='cno']").val()+")님");
		$(".popup_clinic_reservation_register > table td > select[name='clinic'] > option[value='']").prop("selected", true);
		$(".popup_clinic_reservation_register > table td > select[name='eno'] > option[value='"+eno+"']").prop("selected", true);
		$(".popup_reservation_register_date").text($(".calendar_select_date").val()+" "+time);
		$(".popup_clinic_reservation_register > table tr > td > select[name='fix_day'] > option[value='"+select_day+"']").prop("selected", true);
		$(".popup_clinic_reservation_register > table tr > td > input[name='fix_day_start']").val($(".calendar_select_date").val());
		
		$(".popup_wrap").css("display", "block");
		$(".popup_clinic_reservation_register").css("display", "block");
	});
	
	//치료테이블에서 + 클릭
	$(document).on("click", ".therapist_time_table .reservation_register_btn", function(){
		var select_therapist_time = $(this).parent().prop("class");
		var split_className = select_therapist_time.split(" ");//class가 2개라서 공백으로 걸러내면 첫번째 배열에는 doctor_의사번호_시간 걸러짐
		var split_therapist_time=split_className[0].split("_");
		
		var select_date_hospital_time_info = get_hospitalInfo_byDay($(".calendar_select_date").val());
		var select_day = get_day($(".calendar_select_date").val());
		
		var starttime=Number(select_date_hospital_time_info.start_time)/60;
		var endtime=Number(select_date_hospital_time_info.end_time)/60;
		
		var eno=split_therapist_time[1];
		var time=split_therapist_time[2];
		
		var str = "";
		for(i=starttime; i < endtime; i++){
			str += "<option value='"+i+"'>"+i+"시</option>";
		}
		
		$(".popup_therapy_reservation_register > h2 > span").html($("#reservation_view_btn").text()+"("+$("#reservation_view_btn > input[name='cno']").val()+")님");
		$(".popup_therapy_reservation_register > table td > select[name='clinic'] > option[value='']").prop("selected", true);
		$(".popup_therapy_reservation_register > table td > select[name='eno'] > option[value='"+eno+"']").prop("selected", true);
		$(".popup_reservation_register_date").text($(".calendar_select_date").val()+" "+time);
		$(".popup_therapy_reservation_register > table tr > td > select[name='fix_day'] > option[value='"+select_day+"']").prop("selected", true);
		$(".popup_therapy_reservation_register > table tr > td > input[name='fix_day_start']").val($(".calendar_select_date").val());
		
		$(".popup_wrap").css("display", "block");
		$(".popup_therapy_reservation_register").css("display", "block");
	});
	
	//진료예약view에서 예약등록, 예약접수, 취소 버튼 기능
	$(".popup_content2 .popup_reservation_register_btn_wrap > p").click(function(){
		var idx = $(this).index();
		
		//예약등록
		if(idx == 0 || idx == 1){
			var vo;
			//진료등록
			if($(".popup_clinic_reservation_register").css("display") == "block"){
				var selectDate = $(".popup_clinic_reservation_register .popup_reservation_register_date").text();
				var split_date = selectDate.split(" ");
				
				var pno = $("#reservation_view_btn > input[name='pno']").val();
				var eno = $(".popup_clinic_reservation_register > table tr td > select[name='eno']").val();
				var rtype = $(".popup_clinic_reservation_register > table tr td > select[name='rtype']").val();
				
				var rdate = split_date[0]+"";
				var rtime_minute = Number($(".popup_clinic_reservation_register > table tr td > select[name='rtime_minute']").val());
				var rtime = (Number(split_date[1])*60)+rtime_minute+"";
				var fix_day = $(".popup_clinic_reservation_register > table tr > td > select[name='fix_day']").val();
				var fix_day_start = $(".popup_clinic_reservation_register > table tr > td > input[name='fix_day_start']").val();
				var fix_day_end = $(".popup_clinic_reservation_register > table tr > td > input[name='fix_day_end']").val();
				var clinic = $(".popup_clinic_reservation_register > table tr td > select[name='clinic']").val();
				var memo = $(".popup_clinic_reservation_register > table tr td input[name='memo']").val();
				var writer = $("#session_login_name").val();
				var regdate = get_today();
				var desk_state="예약완료";
				var desk_state_writer=$("#session_login_name").val();
				var nowDate = new Date();
				var desk_state_regdate = nowDate.getFullYear()+"-"+(((nowDate.getMonth()+1)>9?'':'0')+(nowDate.getMonth()+1))+"-"+((nowDate.getDate()>9?'':'0')+nowDate.getDate())+" "+nowDate.getHours()+":"+((nowDate.getMinutes()>9?'':'0')+nowDate.getMinutes());
				var result = "예약완료";
				
				if(idx == 1){
					desk_state = "접수완료";
					result = "접수완료";
				}

				if(rtype == "nc"){
					vo = {pno:pno, eno:eno, rtype:rtype, rdate:rdate, rtime:rtime, clinic:clinic, memo:memo, writer:writer, regdate:regdate, updatewriter:"", updatedate:"", desk_state:desk_state, desk_state_writer:desk_state_writer, desk_state_regdate:desk_state_regdate, result:result, result_memo:""};
					post_ncReservation_register(vo, storage_timetable_btn_num);
				}else if(rtype == "fc"){
					vo = {rno:"0", pno:pno, eno:eno, fix_day:fix_day, rdate:rdate, rtime:rtime, fix_day_start:fix_day_start, fix_day_end:fix_day_end, rtype:rtype, clinic:clinic, memo:memo, writer:writer, regdate:regdate, updatewriter:"", updatedate:"", desk_state:desk_state, desk_state_writer:desk_state_writer, desk_state_regdate:desk_state_regdate, result:result, result_memo:""};
					post_fcReservation_register(vo, storage_timetable_btn_num);
				}
			//치료등록
			}else{
				var selectDate = $(".popup_therapy_reservation_register .popup_reservation_register_date").text();
				var split_date = selectDate.split(" ");
				
				var pno = $("#reservation_view_btn > input[name='pno']").val();
				var eno = $(".popup_therapy_reservation_register > table tr td > select[name='eno']").val();
				var rtype = $(".popup_therapy_reservation_register > table tr td > select[name='rtype']").val();
				
				var rdate = split_date[0]+"";
				var rtime_minute = Number($(".popup_therapy_reservation_register > table tr td > select[name='rtime_minute']").val());
				var rtime = (Number(split_date[1])*60)+rtime_minute+"";
				var fix_day = $(".popup_therapy_reservation_register > table tr > td > select[name='fix_day']").val();
				var fix_day_start = $(".popup_therapy_reservation_register > table tr > td > input[name='fix_day_start']").val();
				var fix_day_end = $(".popup_therapy_reservation_register > table tr > td > input[name='fix_day_end']").val();
				var clinic = $(".popup_therapy_reservation_register > table tr td > select[name='clinic']").val();
				var memo = $(".popup_therapy_reservation_register > table tr td input[name='memo']").val();
				var writer = $("#session_login_name").val();
				var regdate = get_today();
				var desk_state="예약완료";
				var desk_state_writer=$("#session_login_name").val();
				var nowDate = new Date();
				var desk_state_regdate = nowDate.getFullYear()+"-"+(((nowDate.getMonth()+1)>9?'':'0')+(nowDate.getMonth()+1))+"-"+((nowDate.getDate()>9?'':'0')+nowDate.getDate())+" "+nowDate.getHours()+":"+((nowDate.getMinutes()>9?'':'0')+nowDate.getMinutes());
				var result = "예약완료";
				
				if(idx == 1){
					desk_state = "접수완료";
					result = "접수완료";
				}
				
				if(rtype == "nt"){
					vo = {pno:pno, eno:eno, rtype:rtype, rdate:rdate, rtime:rtime, clinic:clinic, memo:memo, writer:writer, regdate:regdate, updatewriter:"", updatedate:"", desk_state:desk_state, desk_state_writer:desk_state_writer, desk_state_regdate:desk_state_regdate, therapist_state:"", result:result, result_memo:""};
					post_ntReservation_register(vo, storage_timetable_btn_num);
				}else if(rtype == "ft"){
					vo = {pno:pno, eno:eno, fix_day:fix_day, rdate:rdate, rtime:rtime, fix_day_start:fix_day_start, fix_day_end:fix_day_end, rtype:rtype, clinic:clinic, memo:memo, writer:writer, regdate:regdate, updatewriter:"", updatedate:"", desk_state:desk_state, desk_state_writer:desk_state_writer, desk_state_regdate:desk_state_regdate, therapist_state:"", therapist_state_writer:"", therapist_state_regdate:"", result:result, result_memo:""};
					post_ftReservation_register(vo, storage_timetable_btn_num);
				}
			}
			
			
		}else if(idx == 2){//취소
			$(".popup_clinic_reservation_register").css("display", "none");
			$(".popup_therapy_reservation_register").css("display", "none");
			$(".popup_content").css("display", "none");
			$(".popup_wrap").css("display","none");
		}
	});
	
	//table 선택 버튼(진료&치료종합, 진료종합, 주간, 고정 등등)
	$(".timetable_btn_wrap > ul > li").click(function(){
		var idx = $(this).index();
		$(".timetable_btn_wrap > ul > li").css("background","#fff");
		$(this).css("background","#d3e5f6");
		draw_time_table_by_case(idx);
		storage_timetable_btn_num = idx;
	});
	
	//주간 select에서 주 변경되었을때 timetable 변경해서 삽입
	$("#sh_week").change(function(){
		if(storage_timetable_btn_num == 2 || storage_timetable_btn_num == 3){
			draw_week_timetable("doctor", storage_timetable_btn_num);
			draw_normalOff_in_weektable();
		}else if(storage_timetable_btn_num == 5 || storage_timetable_btn_num == 6){
			draw_week_timetable("therapist", storage_timetable_btn_num);
			draw_normalOff_in_weektable();
		}
		
	})
	//주간 select에서 의사 및 치료사 변경되었을때 timetable 변경해서 삽입
	$(document).on("change",".week_select_box_wrap > select[name='employee']",function(){
		if(storage_timetable_btn_num == 2 || storage_timetable_btn_num == 3){
			draw_week_timetable("doctor", storage_timetable_btn_num);
			draw_normalOff_in_weektable();
		}else if(storage_timetable_btn_num == 5 || storage_timetable_btn_num == 6){
			draw_week_timetable("therapist", storage_timetable_btn_num);
			draw_normalOff_in_weektable();
		} 
	});
	
	$(document).on("click", ".patient_p_tag", function(){
		var type = $(this).find("input[name='type']").val();
		var rno = $(this).find("input[name='rno']").val();
		open_reservation_info_view(type, rno);
	})
	
	//변경 클릭
	$(".popup_reservation_info_view > table tr:nth-child(2) > td > button").click(function(){
		var rno = $(".popup_reservation_info_view > h2 > input[name='rno']").val();
		var rtype = $(".popup_reservation_info_view > h2 > input[name='rtype']").val();
		draw_reservation_update_view(rno, rtype);
	});
	
	//예약일정 변경 저장 클릭
	$(".popup_res_update_btn_wrap > p").click(function(){
		update_reservation_info();
	});
	
	//예약완료, 접수완료, 예약취소 눌렀을 때
	$(".popup_reservation_info_btn_wrap > p").click(function(){
		var btn_idx = $(this).index();
		
		var rtype = $(".popup_reservation_info_view > h2 > input[name='rtype']").val();
		var rno = $(".popup_reservation_info_view > h2 > input[name='rno']").val();
		var state = $(this).text();
		var writer = $("#session_login_name").val();
		var nowDate = new Date();
		var regdate = nowDate.getFullYear()+"-"+(((nowDate.getMonth()+1)>9?'':'0')+(nowDate.getMonth()+1))+"-"+((nowDate.getDate()>9?'':'0')+nowDate.getDate())+" "+nowDate.getHours()+":"+((nowDate.getMinutes()>9?'':'0')+nowDate.getMinutes());
		
		update_reservation_state(btn_idx, rtype, rno, state, writer, regdate, storage_timetable_btn_num);
	});

	//예약취소 누르고 취소사유 입력 후 저장 눌렀을 때
	$(".popup_reservation_info_cancel_wrap > table tr td > button").click(function(){
		var rtype = $(".popup_reservation_info_view > h2 > input[name='rtype']").val();
		var rno = $(".popup_reservation_info_view > h2 > input[name='rno']").val();
		var state = "예약취소";
		var writer = $("#session_login_name").val();
		var nowDate = new Date();
		var regdate = nowDate.getFullYear()+"-"+(((nowDate.getMonth()+1)>9?'':'0')+(nowDate.getMonth()+1))+"-"+((nowDate.getDate()>9?'':'0')+nowDate.getDate())+" "+nowDate.getHours()+":"+((nowDate.getMinutes()>9?'':'0')+nowDate.getMinutes());
		update_reservation_deskState(rtype, rno, state, writer, regdate, storage_timetable_btn_num)
	});
	
	//예약이력에서 검색 눌렀을 때
	$(".reservation_record_selectBox_wrap > button").click(function(){
		var keyword1 = encodeURIComponent($(".reservation_record_selectBox_wrap > input[name='rdate']").val());
		var keyword2 = encodeURIComponent($(".reservation_record_selectBox_wrap > select[name='employee']").val());
		var keyword3 = encodeURIComponent($(".reservation_record_selectBox_wrap > select[name='rtype']").val());
		var keyword4 = encodeURIComponent($(".reservation_record_selectBox_wrap > select[name='result']").val());

		draw_reservation_record_table("page=1&perPageNum=10&keyword1="+keyword1+"&keyword2="+keyword2+"&keyword3="+keyword3+"&keyword4="+keyword4);
	});
	
	//예약이력 테이블 페이지 클릭
	$(document).on("click", ".reservation_record_page > ul > li > a", function(e){
		e.preventDefault();
		draw_reservation_record_table($(this).attr("href"));
	});
	
	//예약이력에서 검색 눌렀을 때
	$(".reservation_update_record_selectBox_wrap > button").click(function(){
		var keyword = encodeURIComponent($(".reservation_update_record_selectBox_wrap > select[name='rtype']").val());

		draw_reservation_update_record_table("page=1&perPageNum=10&searchType=n&keyword="+keyword);
	});
	
	//변경이력 테이블 페이지 클릭
	$(document).on("click", ".reservation_update_record_page > ul > li > a", function(e){
		e.preventDefault();
		draw_reservation_update_record_table($(this).attr("href"));
	});
});