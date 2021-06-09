<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>댓글 수정</title>
<script type="text/javaScript" language="javascript" defer="defer">
function replycheck(rid){
	if(confirm("댓글을 삭제하시겠습니까?") == true){
		alert("삭제합니다");
		location.href="/deleteReply.do?rid="+rid;
	}else{
		alert("취소되었습니다");
		return false;
	}
}
</script>
</head>
<body>
	<header>
	<h1>게시판</h1>
	</header>
	<hr />
	<nav> 댓글 수정 </nav>
	<hr />
	<form method="post" action="/updateReply.do">
	    <input type="hidden" id="id" name="id" value="${update.id}" /></p>
        <input type="hidden" id="rid" name="rid" value="${update.rid}" /></p>
        
        <p>작성자 : <input type="text" id="writer" name="writer" value="${update.writer}" /></p>
        <p>댓글 내용 : <input type="text" id="contents" name="contents" value="${update.contents}" /></p>
	    <button type="submit">저장</button>
	    <input type="button" value="취소" onclick="location.href='/detailBoard.do?id=${update.id}'">
	    <input type="button" value="댓글 삭제" onclick="return replycheck(${update.rid})">
	</form>
</body>
</html>