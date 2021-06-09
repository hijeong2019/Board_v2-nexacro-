<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>게시판 리스트</title>
</head>
<script language="javascript" defer="defer" type="text/javaScript" >
	function selChange(){
		var sel = document.getElementById('cntPerPage').value;
		location.href="/boardList.do?nowPage=${paging.nowPage}&cntPerPage="+sel;
	}
	
	
</script>
<body>
	<header>
	<h1>게시판</h1>
	<h4>${sessionScope.userid}님이 로그인중입니다. <input type="button" value="로그아웃" onclick="location.href='/logout.do'"></h4>
	
	</header>
	<hr />
	<h3> 글 목록 </h3>
	<hr />
		
	<%-- <form method="post" action="/boardList.do">
		<select name="searchType">
			<option value="all"<c:out value="${map.searchType == 'all' ? 'selected' : ''}"/>>아이디+이름+설명</option>
			<option value="id"<c:out value="${map.searchType == 'id' ? 'selected' : ''}"/>>아이디</option>
			<option value="name"<c:out value="${map.searchType == 'name' ? 'selected' : ''}"/>>이름</option>
			<option value="description"<c:out value="${map.searchType == 'description' ? 'selected' : ''}"/>>설명</option>
		</select>
		<input type="text" id="keyword" name="keyword" value="${paging.keyword}"/>
		<button type="submit">조회</button>
	</form> --%>
	<input type="button" value="게시글 등록" onclick="location.href='/inBoard.do'"/>
	
	
	<div id="page" style="float:right;">
		<select id="cntPerPage" name="sel" onchange="selChange()">
			<option value="5" <c:if test="${paging.cntPerPage == 5}">selected</c:if>>5줄 보기</option>
			<option value="10" <c:if test="${paging.cntPerPage == 10}">selected</c:if>>10줄 보기</option>
			<option value="15" <c:if test="${paging.cntPerPage == 15}">selected</c:if>>15줄 보기</option>
			<option value="20" <c:if test="${paging.cntPerPage == 20}">selected</c:if>>20줄 보기</option>
		</select>
	</div> 
	
	<form role="form" method="post">
		<table border="1">
			<tr>
				<th>아이디</th>
				<th>이름</th>
				<th>설명</th>
				<th>사용여부</th>
				<th>등록자</th>
				<th>조회수</th>
				<th>댓글수</th>
			</tr>

			<c:forEach var="result" items="${resultList}">
				<tr>
					<td><a href="/detailBoard.do?id=${result.id}"><c:out value="${result.id}"/></a></td>
					<td><c:out value="${result.name}" />&nbsp;</td>
					<td><c:out value="${result.description}" />&nbsp;</td>
					<td><c:out value="${result.useYn}" />&nbsp;</td>
					<td><c:out value="${result.regUser}" />&nbsp;</td>
					<td><c:out value="${result.hit}" />&nbsp;</td>
					<td><c:out value="${result.replyCnt}" />&nbsp;</td>
				</tr>
			</c:forEach>
		</table>
	</form>
	<hr />
	<div style="display:black; text-align:center;">
		<c:if test="${paging.startPage != 1}">
			<a href="/boardList.do?nowPage=${paging.startPage - 1}&cntPerPage=${paging.cntPerPage}">&lt;</a>
		</c:if>
		<c:forEach begin="${paging.startPage}" end="${paging.endPage}" var="p">
			<c:choose>
				<c:when test="${p == paging.nowPage}">
					<b>${p }</b>
				</c:when>
				<c:when test="${p != paging.nowPage}">
					<a href="/boardList.do?nowPage=${p}&cntPerPage=${paging.cntPerPage}">${p}</a>
				</c:when>
			</c:choose>
		</c:forEach>
		<c:if test="${paging.endPage != paging.lastPage}">
			<a href="/boardList.do?nowPage=${paging.endPage + 1}&cntPerPage=${paging.cntPerPage}">&gt;</a>
		</c:if>
	</div>
</body>
</html>