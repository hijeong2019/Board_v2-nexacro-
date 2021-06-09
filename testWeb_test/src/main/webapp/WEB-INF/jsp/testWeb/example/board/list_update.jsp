<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>게시물 상세 페이지</title>
<script>
function datacheck(){
	if(name.value == ""){
		alert("이름 입력하시오");
		document.getElementById('name').focus();
		return false;
	}
	if(description.value == ""){
		alert("설명 입력하시오");
		document.getElementById('description').focus();
		return false;
	}
	if(useYn.value == ""){
		alert("사용여부 입력하시오");
		document.getElementById('useYn').focus();
		return false;
	}
	if(regUser.value == ""){
		alert("등록자 입력하시오");
		document.getElementById('regUser').focus();
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
	<nav> 게시글 수정하기 </nav>
	<hr />
	<form action="/updateBoard.do" method="post" onsubmit="return datacheck()" >
		<table border="1">
			<input type="hidden" id="id" name="id" value="${update.id}"/>
				<tr>
					<td>이름</td>
					<td><input type="text" id="name" name="name" value="${update.name}"/></td>
				</tr>
				<tr>
					<td>설명</td>
					<td><input type="text" id="description" name="description" value="${update.description}"/></td>
				</tr>
				<tr>
					<td>사용여부</td>
					<td><input type="text" id="useYn" name="useYn" placeholder="Y/N" value="${update.useYn}"/></td>
				</tr>
				<tr>
					<td>등록자</td>
					<td><input type="text" id="regUser" name="regUser" value="${update.regUser}"/></td>
				</tr>
				<tr>
					<td><button type="submit">저장</button></td>
					<td><input type="button" value="취소" onclick="location.href='/detailBoard.do?id=${update.id}'"/></td>
				</tr>
		</table>
	</form>
</body>
</html>