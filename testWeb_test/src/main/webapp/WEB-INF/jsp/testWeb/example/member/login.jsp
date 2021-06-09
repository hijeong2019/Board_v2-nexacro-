<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>로그인</title>
<script type="text/javaScript" language="javascript" defer="defer">
	function check() {
		if (userid.value == "") {
			alert("아이디 입력하시오");
			return false;
		}
		if (userpw.value == "") {
			alert("비밀번호 입력하시오");
			document.getElementById('userpw').focus();
			return false;
		}
		return true;
	}
</script>
</head>

<body onload = "document.getElementById('userid').focus();">
	<h2>로그인</h2>
	<form action="/loginCheck.do" method="post" onsubmit="return check()">
		<table border="1">
			<tr>
				<td>아이디</td>
				<td><input type="text" id="userid" name="userid" placeholder="ID입력"></td>
			</tr>
			<tr>
				<td>비밀번호</td>
				<td><input type="password" id="userpw" name="userpw" placeholder="PW입력"></td>
			</tr>
			<tr>
				<td><button type="submit" id="submit">로그인</button></td>
				<td><input type="button" value="회원가입" onclick="location.href='/memberRegister.do'"></td>
			</tr>
			<tr>
				<td colspan="2">
				<c:choose>
					<c:when test="${msg == 'failure'}">
						<p>아이디 또는 비밀번호가 일치하지 않습니다</p>
					</c:when>
					<c:when test="${msg == 'logout'}">
						<p>로그아웃되었습니다</p>
					</c:when>
					<c:otherwise>
						<p>로그인하세요</p>
					</c:otherwise>
				</c:choose>
				</td>
			</tr>
		</table>
	</form>
</body>

</html>