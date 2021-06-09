<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>글 등록</title>
<script>
function datacheck(){
	if(id.value == ""){
		alert("아이디 입력하시오");
		document.getElementById('id').focus();
		return false;
	}
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
		alert("사용여부 선택하시오");
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
	<nav> 글 등록 </nav>
	<hr />
	<form action="/insertBoard.do" method="post" onsubmit="return datacheck()">
		<table border="1">
			<tr>
				<td>아이디</td>
				<td>
					<input type="text" id="id" name="id" value="${sessionScope.userid}">
				</td>
			</tr>
			<tr>
				<td>이름</td>
				<td><input type="text" id="name" name="name"></td>
			</tr>
			<tr>
				<td>설명</td>
				<td><input type="text" id="description" name="description"></td>
			</tr>
			<tr>
				<td>사용여부</td>
				<td>
					<select id="useYn" name="useYn">
						<option value="Y" selected>Y</option>
						<option value="N">N</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>등록자</td>
				<td><input type="text" id="regUser" name="regUser"></td>
			</tr>
			<tr>
				<td>
					<button type="submit">등록</button>
					<td><input type="button" value="취소" onclick="location.href='/boardList.do'"/></td>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>