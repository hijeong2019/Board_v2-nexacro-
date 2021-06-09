<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>메인화면</title>
</head>
<body>
	<input type="button" value="게시판" onclick="location.href='/boardList.do'">
	<input type="button" value="로그아웃" onclick="location.href='/logout.do'">
	${sessionScope.userid}님이 로그인중입니다.
	
	<hr>
	<h2>${sessionScope.userid}님 환영합니다.</h2>
</body>
</html>