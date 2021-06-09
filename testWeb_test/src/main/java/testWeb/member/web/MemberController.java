package testWeb.member.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import testWeb.member.service.MemberService;
import testWeb.member.service.MemberVO;
import testWeb.member.service.impl.MemberServiceImpl;

@Controller
public class MemberController {

	@Resource(name = "memberService")
	private MemberService memberService;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberServiceImpl.class);
	
	/* 회원가입 페이지로 이동 */
	@RequestMapping(value = "/memberRegister.do")
	public String memberRegister(Model model) throws Exception{
		LOGGER.debug("memberRegister.do called...");
		return "member/member_register";
	}
	
	/*아이디 중복 체크*/
	@RequestMapping(value = "/idCheck.do")
	public @ResponseBody int idCheck(MemberVO vo) throws Exception {
		int result = memberService.idCheck(vo);
		return result;
	}

	/* 회원가입 처리 후 => 로그인으로 리다이렉트*/
	@RequestMapping(value = "/memberInsert.do")
	public String memberInsert(@ModelAttribute MemberVO vo, HttpServletRequest req) throws Exception { 
		HttpSession session = req.getSession(); //세션생성 위해 HttpServletRequest 객체의 getSession() 메소드 이용
		
		int result = memberService.idCheck(vo);
		LOGGER.debug("RESULT : " + result);
		if(result > 0) { //아이디 중복
			session.setAttribute("idCheck", 1); //setAttribute : session이 유지되는 동안 저장됨
			return "member/member_register";
		}else if(result == 0) { //아이디 중복 아님
			session.setAttribute("idCheck", 0);
			memberService.insertMember(vo);
		}
		return "redirect:/login.do";
	}
	
	
	
//	/*아이디 중복 체크*/
//	@RequestMapping(value = "/idCheck.do", method=RequestMethod.POST)
//	public @ResponseBody int idCheck(MemberVO vo) throws Exception {
//		int result = memberService.idCheck(vo);
//		LOGGER.info("idcheck result >> "+result);
//		return result;
//	}
//
//	/* 회원가입 처리 후 => 로그인으로 리다이렉트*/
//	@RequestMapping(value = "/memberInsert.do", method=RequestMethod.POST)
//	public String memberInsert(MemberVO vo) throws Exception { 
//		
//		int result = memberService.idCheck(vo);
//		LOGGER.info("RESULT : " + result);
//
//		if(result == 1) { //아이디 중복
//			return "member/member_register";
//		}else if(result == 0) { //아이디 중복 아님
//			memberService.insertMember(vo);
//		}
//		
//		return "redirect:/login.do";
//	}
	
	
	
	
	
	
	
	
	/* 초기화면 */
	@RequestMapping(value = "/login.do")
	public String login(Model model) throws Exception{
		LOGGER.debug("login.do called...");
		return "member/login";
	}
	
	/* 로그인 체크 */
	@RequestMapping(value = "/loginCheck.do")
	public ModelAndView loginCheck(@ModelAttribute MemberVO vo, HttpSession session) {
		int result = memberService.loginCheck(vo, session);
		
		ModelAndView mav = new ModelAndView();
		
		if(result > 0) {//로그인 성공
			LOGGER.debug("loginCheck.do called...");
			mav.setViewName("member/home"); //home.jsp로 이동
			
		}else { //로그인 실패
			LOGGER.debug("failure login...");
			mav.setViewName("member/login"); //login.jsp로 이동
			mav.addObject("msg","failure");
		}
		
		return mav;		
	}
	
	/*로그아웃*/
	@RequestMapping(value = "/logout.do")
	public ModelAndView logout(HttpSession session) {
		memberService.logout(session);
		ModelAndView mav = new ModelAndView();
		mav.setViewName("member/login");
		mav.addObject("msg", "logout");
		LOGGER.debug("logout.do called...");
		
		return mav;
	}

	
	
}
