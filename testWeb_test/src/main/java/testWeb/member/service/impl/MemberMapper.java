package testWeb.member.service.impl;

import javax.servlet.http.HttpSession;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import testWeb.member.service.MemberVO;

@Mapper("memberMapper")
public interface MemberMapper {

	/*회원 가입*/
	void insertMember(MemberVO vo) throws Exception;

	/*아이디 중복 체크*/
	public int idCheck(MemberVO vo) throws Exception;
 
	/*로그인 체크*/
	public int loginCheck(MemberVO vo);
	
	/*로그아웃*/
	void logout(HttpSession session);
}
