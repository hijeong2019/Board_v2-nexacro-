//package testWeb.reply.web;
//
//import java.util.List;
//
//import javax.annotation.Resource;
//import javax.servlet.http.HttpServletRequest;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.servlet.ModelAndView;
//
//import testWeb.reply.service.ReplyService;
//import testWeb.reply.service.ReplyVO;
//import testWeb.reply.service.impl.ReplyServiceImpl;
//
//@Controller
//public class ReplyController {
//	@Resource(name="replyService")
//	private ReplyService replyService;
//	
//	private static final Logger LOGGER = LoggerFactory.getLogger(ReplyServiceImpl.class);
//		
///*	게시물 댓글 조회
//	@RequestMapping(value="/replyList.do")
//	public String readReply(Model model, ReplyVO vo, HttpServletRequest rep) throws Exception{
//		List<ReplyVO> readReply = replyService.readReply(vo.getId());
//		model.addAttribute("readReply", readReply);
//		model.addAttribute("id", rep.getParameter("id")); //게시판 ID
//		LOGGER.info("replyList.do called...");
//
//		return "board/reply";
//	}	
//	
//	게시물 댓글 등록
//	@RequestMapping(value="/insertReply.do")
//	public String insertReply(ReplyVO vo) throws Exception{
//		LOGGER.debug("insertReply.do called...");
//		LOGGER.debug("insert "+vo);
//		replyService.insertReply(vo);
//		return "redirect:/boardList.do";
////		return "redirect:/detailBoard.do?id=${detail.id}";
//	}
//	
//	게시물 댓글 수정화면으로 이동
//	@RequestMapping(value="/updateviewReply.do")
//	public String updateviewReply(ReplyVO vo, Model model) throws Exception{
//		LOGGER.debug("updateviewReply.do called..");
////		model.addAttribute("update", replyService.readReply(vo.getId()));
//		return "board/reply_update";
//	}
//	
//	게시글 수정 -> 목록
//	@RequestMapping(value="/updateReply.do")
//	public String updateReply(ReplyVO vo) throws Exception{
//		LOGGER.debug("updateReply.do called..");
//		LOGGER.debug("update "+vo);
//		replyService.updateReply(vo);
//		return "redirect:/boardList.do";
//	}
//	
//	게시글 댓글 삭제
//	@RequestMapping(value="/deleteReply.do")
//	public String deleteReply(ReplyVO vo) throws Exception{
//		LOGGER.debug("deleteReply.do called..");
//		replyService.deleteReply(vo);
//		return "redirect:/boardList.do";
//	}
//*/
//}
