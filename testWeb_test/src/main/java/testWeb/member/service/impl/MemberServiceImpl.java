package testWeb.member.service.impl;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import testWeb.member.service.MemberService;
import testWeb.member.service.MemberVO;

@Service("memberService")
public class MemberServiceImpl implements MemberService {
	
	@Resource(name="memberMapper")
	private MemberMapper memberDAO;

	/* 회원가입 */
	@Override
	public void insertMember(MemberVO vo) throws Exception {
		memberDAO.insertMember(vo);
	}

	/*아이디 중복 체크*/
	@Override
	public int idCheck(MemberVO vo) throws Exception {
		int result = memberDAO.idCheck(vo);
		return result;
	}

	/*로그인 체크*/
	@Override
	public int loginCheck(MemberVO vo, HttpSession session) {
		int result = memberDAO.loginCheck(vo);
		
		if(result > 0) { //result 값이 1보다 크면 로그인 성공, true면 세선에 등록
			session.setAttribute("userid", vo.getUserid()); //세션 변수 등록
		}
		
		return result;
	}
	
	/*로그아웃*/
	@Override
	public void logout(HttpSession session) {
		session.invalidate(); //세션정보 초기화
	}

	
}
