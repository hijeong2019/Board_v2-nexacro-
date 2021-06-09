<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"  %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>게시물 상세 페이지</title>
<script type="text/javaScript" language="javascript" defer="defer">

window.onload = function(){
	getReplyList();
}

function getReplyList(){
	var str = "";
		str += "<c:forEach var='list' items='${readReply}'>";
		str += "<h3 style='color:red'>";
		var level = '${list.level_id}';
		if(level > 0){
			for(var i=0; i<level; i++){
				str += "Re: ";
			}
			str += "댓글 ${list.grp_id}</h3>";
		} else
			str += "<h3>댓글 ${list.grp_id} </h3>"
			str += "rid : <input type='text' id='rid' name='rid' value='${list.rid}' />";
			str += "<input type='hidden' id='grp_id' name='grp_id' value='${list.grp_id}' />";
			str += "<input type='hidden' id='seq_id' name='seq_id' value='${list.seq_id}' />";
			str += "<input type='hidden' id='parent_id' name='parent_id' value='${list.parent_id}' />";
			str += "<p>작성일자 : <fmt:formatDate pattern='yyyy/MM/dd HH:mm:ss' value='${list.reg_date}'/> </p>";
			str += "<p>작성자 : <input type='text' id='writer' name='writer' readonly='readonly' value='${list.writer}' /></p>";
			str += "<p>댓글 내용 : <input type='text' id='recontents' name='recontents' readonly='readonly' value='${list.contents}'/></p>";
			str += "<input type='button' value='댓글 수정' onclick='return reupdate(${list.rid})'/>";
			str += "<input type='button' value='답글' onclick='return reply(${list.rid}, ${list.grp_id}, ${list.seq_id}, ${list.parent_id})'/>";
			str += "<div id='rereply'></div>";
			str += "<hr /></c:forEach>";		
	document.getElementById("replyList").innerHTML = str;
}

function reupdate(rid){
	location.href="/updateviewReply.do?rid="+rid;
}

function reply(rid, grp_id, seq_id, parent_id){
	 //alert(rid);
	 var rhtml = "";
	 	 rhtml += "<h3 style='color:blue'>답글달기</h3>";
		 rhtml += "<form action='/insertreReply.do' method='post' onsubmit='return concheck()'>"
	 	 rhtml += "<input type='hidden' id='id' name='id' value='${detail.id}' readonly='readonly'/>"
		 rhtml += "<p>댓글 번호 : ";
		 rhtml += "<input type='text' id='rid' name='rid' value='" + rid + "' readonly='readonly'/></p>";
		 rhtml += "<p>답글 작성자 : ";
		 rhtml += "<input type='text' id='writer' name='writer' value='${sessionScope.userid}' readonly='readonly'/></p>";
		 rhtml += "<p>답글 내용 : ";
		 rhtml += "<input type='text' id='contents' name='contents' placeholder='답글을 작성해주세요'/></p>";
		 rhtml += "grp_id : <input type='text' id='grp_id' name='grp_id' value='" + grp_id + "'/>";
		 rhtml += "seq_id : <input type='text' id='seq_id' name='seq_id' value='" + seq_id + "'/>";
		 rhtml += "parent_id : <input type='text' id='parent_id' name='parent_id' value='" + parent_id + "'/>";
		 rhtml += "<button type='submit' id='submit'>등록</button></form>";
		//댓글에 대한 고유한 번호 지정해, 해당 댓글의 답글 버튼 아래에 답글형태가 보이도록 수정
		
		//var reBtn = document.createElement('li');
		//var reText = document.createTextNode('댓글달기입니다');
		//str.appendChild(rhtml);
		//document.getElementById("rereply").appendChild(str);
			
		 document.getElementById("rereply").innerHTML = rhtml;
}

function recheck(cnt, id){
	if(cnt > 0){
		alert("댓글있는 게시물은 삭제할 수 없습니다.");
	}else {
		if(confirm("게시글을 삭제하시겠습니까?") == true){
			alert("삭제합니다");
			location.href="/deleteBoard.do?id="+id;	
		}else {
			alert("취소되었습니다");
			return false;
		}
	} 
}

function concheck() {
	if (contents.value == "") {
		alert("댓글내용을 입력하시오");
		return false;
	}
	return true;
} 

</script>
</head>
<body>
	<header>
	<h1>게시판</h1>
	</header>
	<hr />
	<nav> 게시글 상세페이지 <input type="button" value="목록" onclick="location.href='/boardList.do'"/> </nav>
	<hr />
	<form method="post">
		<table border="1">
			<input type="hidden" value="${detail.id}" />
			<input type="hidden" value="${detail.replyCnt}" />
				<tr>
					<td>이름</td>
					<td><c:out value="${detail.name}"/></td>
				</tr>
				<tr>
					<td>설명</td>
					<td><c:out value="${detail.description}"/></td>
				</tr>
				<tr>
					<td>사용여부</td>
					<td><c:out value="${detail.useYn}"/></td>
				</tr>
				<tr>
					<td>등록자</td>
					<td><c:out value="${detail.regUser}"/></td>
				</tr>
				<tr>
					<td><input type="button" value="수정" onclick="location.href='/updateView.do?id=${detail.id}'"/></td>
					<td><input type="button" value="삭제" onclick="return recheck(${detail.replyCnt}, '${detail.id}')"/></td>
				</tr>
		</table>
	</form>
	
	<hr />
		<h3>댓글달기</h3>
		<form action="/insertReply.do" method="post" onsubmit="return concheck()">
			<input type="hidden" id="id" name="id" value="${detail.id}" readonly="readonly"/>
			<p>댓글 작성자 : <input type="text" id="writer" name="writer" value="${sessionScope.userid}"  readonly="readonly"/></p>
		    <p>댓글 내용 : <input type="text" id="contents" name="contents" placeholder="댓글을 작성해주세요"/></p>
		    <button type="submit" id="submit">등록</button>
		</form>
	<hr />
	
		<div id="replyList"></div>
</body>
</html>