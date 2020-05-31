<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>
	<%-- <table>
		<tr>
			<th>empname</th>
			<th>deptname</th>
		</tr>
		<c:forEach var="item" items="${list}">
			<tr>
				<td>${item.empname}</td>
				<td>${item.deptname}</td>
			</tr>
		</c:forEach>
	</table> --%>
	<table>
		<tr>
			<td></td>
			<c:forEach begin="${hospitalInfo.start_time}" end="${hospitalInfo.end_time-1}" var="idx">
				<td>${idx}시&nbsp;&nbsp;&nbsp;</td>
			</c:forEach>
		</tr>
		<c:forEach var="item" items="${doctorList}">
			<tr class="${item.type}_${item.eno}">
				<td class="doctor_name">${item.name}</td>
				<c:forEach begin="${hospitalInfo.start_time}" end="${hospitalInfo.end_time-1}" var="idx">
					<c:choose> 
						<c:when test="${idx==hospitalInfo.lunch}">
							<td class="${item.type}_${item.eno}_${idx}" style="background:gray; text-align:center;">점심시간</td>
						</c:when>										
						<c:otherwise>	
							<td class="${item.type}_${item.eno}_${idx} timetable_inner_content"></td>
						</c:otherwise>
					</c:choose>
				</c:forEach>
			</tr>
		</c:forEach>
	</table>
	
</body>
</html>