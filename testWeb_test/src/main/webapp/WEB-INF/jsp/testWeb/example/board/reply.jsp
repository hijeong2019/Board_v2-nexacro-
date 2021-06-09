<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>댓글 보기</title>
<script type="text/javascript">

</script>
</head>
<body>
	<header>
	<h1>게시판</h1>
	</header>
	<hr />
	<nav> 댓글 보기 </nav>
	<hr />
	<form method="post">
 	   	<p>게시판 ID : <input type="text" id="id" name="id" readonly="readonly" value="${id}" /></p>
        <ol>
 	       <c:forEach var="list" items="${readReply}">
	        	<li>
		        	<input type="text" hidden="hidden" value="${list.rid}" />
			        <p>작성자 : <input type="text" id="writer" name="writer" readonly="readonly" value="${list.writer}" /></p>
			        <p>댓글 내용 : <input type="text" id="contents" name="contents" readonly="readonly"  value="${list.contents}" /></p>
	        	</li>
		    </c:forEach>
        </ol>
	    
	    <input type="button" value="게시판 목록" onclick="location.href='/boardList.do'">
	    <input type="button" value="댓글 수정" onclick="location.href='/updateviewReply.do?id=${id}'">
	    <input type="button" value="댓글 삭제" onclick="location.href='/deleteReply.do?id=${id}'">
	</form>
	
	<hr />
	<h3>댓글달기</h3>
	<form action="/insertReply.do" method="post">
		 <p>게시판 ID : <input type="text" id="id" name="id" value="${id}" readonly="readonly"</p>
		<p>댓글 작성자 : <input type="text" id="writer" name="writer"/></p>
	    <p>댓글 내용 : <input type="text" id="contents" name="contents"/></p>
	    <button type="submit">등록</button>
	</form>
</body>
</html>