package testWeb.member.service;

import javax.servlet.http.HttpSession;

public interface MemberService {
	
	/*회원가입*/
	void insertMember(MemberVO vo) throws Exception;
	
	/*아이디 중복 체크*/
	int idCheck(MemberVO vo) throws Exception;
	
	/*로그인 체크*/
	int loginCheck(MemberVO vo, HttpSession session);

	/*로그아웃*/
	void logout(HttpSession session);

}
