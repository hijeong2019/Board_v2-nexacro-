<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>회원가입</title>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script>

window.onload = function() { 
	var chk = '${sessionScope.idCheck}';

	if(chk == 1) {
		alert("이미 동일한 사용자가 있습니다. 아이디를 재설정하세요.");
	}
		/* if(confirm("회원가입 하시겠습니까?") == true){
			alert("회원가입을 축하합니다");
			location.href="/login.do";	
		}else {
			alert("회원가입이 취소되었습니다");
			return false;
		} */
}
	
function datacheck(){
	if(userid.value == ""){
		alert("아이디 입력하시오");
		document.getElementById('userid').focus();
		return false;
	}
	if(userpw.value == ""){
		alert("비밀번호 입력하시오");
		document.getElementById('userpw').focus();
		return false;
	}
	if(username.value == ""){
		alert("이름 입력하시오");
		document.getElementById('username').focus();
		return false;
	}
	if(useremail.value == ""){
		alert("이메일 입력하시오");
		document.getElementById('useremail').focus();
		return false;
	}
	if(usergender.value == ""){
		alert("성별 입력하시오");
		document.getElementById('usergender').focus();
		return false;
	}
	if(useraddress.value == ""){
		alert("주소 입력하시오");
		document.getElementById('useraddress').focus();
		return false;
	}
	return true;
}

/* function idcheck(){
	$.ajax({
		url:'idCheck.do?userid='+$('#userid').val(),
		type : 'post',
		dataType : 'json',
		data: {'userid' : $('#userid').val()},
		success : function(data){
			if(data == 1){
				alert("중복된 아이디 입니다.");	
				$("#submit").attr("disabled", "disabled");
			}else if(data == 0){
				alert("사용 가능한 아이디 입니다."+ id);
				$("#submit").removeAttr("disabled");
			}
		},
		error : function(data){
			console.log(data.statusText) //statusText : 오류 내용 텍스트 출력
		}
	})
} */

	
function idcheck(){
	$.ajax({
		url:'idCheck.do?userid='+$('#userid').val(),
		type : 'post',
		contentType : "application/json;charset=utf-8",
		success : function(data){
			console.log("data >> " + data)
			if(data > 0){
				alert("중복된 아이디 입니다.");				
			}else {
				alert("사용 가능한 아이디 입니다.");
			}
		},
		error : function(data){
			console.log(data.statusText); //statusText : 오류 내용 텍스트 출력
		}
	})
}
</script>

</head>
<body>
<h2>회원가입</h2>
	<form action="/memberInsert.do" method="post" onsubmit="return datacheck()">
		<table border="1">
			<tr>
				<td>아이디</td>
				<td><input type="text" id="userid" name="userid" placeholder="ID 입력"></td>
				<td><button type="button" onclick="idcheck();">아이디 중복확인</td>
			</tr>
			<tr>
				<td>비밀번호</td>
				<td><input type="password" id="userpw" name="userpw" placeholder="PW 입력"></td>
			</tr>
			<tr>
				<td>이름</td>
				<td><input type="text" id="username" name="username" placeholder="홍길동"></td>
			</tr>
			<tr>
				<td>이메일</td>
				<td><input type="email" id="useremail" name="useremail" placeholder="id@domain.com"></td>
			</tr>
			<tr>
				<td>성별</td>
				<td>
					<select id="usergender" name="usergender">
						<option value="M" selected>M</option>
						<option value="W">W</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>주소</td>
				<td><input type="text" id="useraddress" name="useraddress" placeholder="Korea"></td>
			</tr>
			<tr>
				<td><button type="submit" id="submit">확인</button></td>
				<td><button type="button" onclick="location.href='/login.do'">취소</button></td>
			</tr>
		</table>
	</form>
</body>
</html>