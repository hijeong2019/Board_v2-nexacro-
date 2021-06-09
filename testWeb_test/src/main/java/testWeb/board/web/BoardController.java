package testWeb.board.web;

import org.springframework.ui.Model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;

import testWeb.board.service.BoardPageVO;
import testWeb.board.service.BoardService;
import testWeb.board.service.BoardVO;
import testWeb.board.service.impl.BoardServiceImpl;
import testWeb.reply.service.ReplyService;
import testWeb.reply.service.ReplyVO;

@Controller
public class BoardController {
	
	@Resource(name = "boardService")
	private BoardService boardService;
	
	@Resource(name="replyService")
	private ReplyService replyService;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(BoardServiceImpl.class);
	
	/*게시글 목록 조회*/
	@RequestMapping(value ="/boardList.do")
	public String selectBoardList(Model model, BoardPageVO pvo
//			, @RequestParam(value="searchType", defaultValue="n")String searchType
//			, @RequestParam(value="keyword", defaultValue="") String keyword
			, @RequestParam(value="nowPage", required=false)String nowPage
			, @RequestParam(value="cntPerPage", required=false)String cntPerPage) throws Exception{
		LOGGER.info("boardlist.do called...");
		int total = boardService.listCount();
		if (nowPage == null && cntPerPage == null) {
			nowPage = "1";
			cntPerPage = "5";
		} else if(nowPage == null) {
			nowPage = "1";
		} else if(cntPerPage == null) {
			cntPerPage = "5";
		}
		pvo = new BoardPageVO(total, Integer.parseInt(nowPage), Integer.parseInt(cntPerPage));
		model.addAttribute("paging", pvo);
		
		
		LOGGER.info("pvo : " + pvo);
		model.addAttribute("resultList", boardService.selectBoardList(pvo));
		return "board/list";
	}

//	@RequestMapping(value ="/boardList.do")
//	public ModelAndView selectBoardList(
//			 @RequestParam(defaultValue="id")String searchType
//			, @RequestParam(defaultValue="") String keyword) throws Exception{
//		LOGGER.info("boardlist.do called...");
//		List<BoardVO> resultList = boardService.selectBoardList(searchType, keyword);
//		
//		int total = boardService.listCount(); //총개수
//		int count = boardService.searchCount(searchType, keyword); //검색개수
//		
//		ModelAndView mav = new ModelAndView();
//		Map<String, Object> map = new HashMap<String, Object>();
//		
//		map.put("resultList", resultList);
//		map.put("total", total);
//		map.put("count", count);
//		map.put("searchType", searchType);
//		map.put("keyword", keyword);
//		mav.addObject("map", map);
//		mav.setViewName("board/list");
//		
//		LOGGER.info("resultList >> " + resultList);
//		LOGGER.info("total >> " + total);
//		LOGGER.info("count >> " + count);
//		return mav;
//	}
	
	
//	@RequestMapping(value ="/boardList.do")
//	public ModelAndView selectBoardList(Model model, BoardPageVO pvo
//			, @RequestParam(value="nowPage", required=false)String nowPage
//			, @RequestParam(value="cntPerPage", required=false)String cntPerPage
//			, @RequestParam(defaultValue="n")String searchType
//			, @RequestParam(defaultValue="")String keyword) throws Exception{
//		LOGGER.info("boardlist.do called...");
//		
//		
//		int total = boardService.listCount();
//		if (nowPage == null && cntPerPage == null) {
//			nowPage = "1";
//			cntPerPage = "5";
//		} else if(nowPage == null) {
//			nowPage = "1";
//		} else if(cntPerPage == null) {
//			cntPerPage = "5";
//		}
//		pvo = new BoardPageVO(total, Integer.parseInt(nowPage), Integer.parseInt(cntPerPage));
//		LOGGER.info("paging : ", pvo);
//		
//		List<BoardVO> list = boardService.selectBoardList(pvo);
//		
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("paging", pvo); //페이징
//		map.put("resultList", list);
//		LOGGER.info("resultList : ", list);
////		map.put("resultList", boardService.selectBoardList(pvo, searchOption, keyword));
//		map.put("searchType", searchType); //검색 옵션
//		LOGGER.info("searchType : ", searchType);
//		map.put("keyword", keyword); //검색 키워드
//		
//		ModelAndView mav = new ModelAndView();
//		mav.addObject("map", map); //map에 저장된 데이터를 mav에 저장
//		mav.setViewName("board/list");
//		LOGGER.info("map : ",map);
//		return mav;
//	}

	
	
	
	/* 게시글 클릭 시 상세페이지 + 댓글확인/등록 */
	@RequestMapping(value = "/detailBoard.do")
	public String selectBoard(BoardVO vo, Model model,@RequestParam("id")String id
			, ReplyVO rvo, HttpServletRequest rep) throws Exception{
		LOGGER.info("detailBoard.do called...");
		model.addAttribute("detail", boardService.selectBoard(vo.getId()));
		

		List<ReplyVO> readReply = replyService.readReply(rvo.getId()); //댓글
		model.addAttribute("readReply", readReply);
		model.addAttribute("id", rep.getParameter("id")); //게시판 ID
		
		boardService.boardHit(id); //게시물 조회수 출력
		return "board/list_detail";
	}
	
	/*게시글 등록 화면으로 이동*/
	@RequestMapping(value = "/inBoard.do")
	public String inBoard() throws Exception{
		LOGGER.info("inBoard.do called...");
		return "board/list_insert";
	}

	/*게시글 등록 후 -> 목록으로 리다이렉트*/
	@RequestMapping(value = "/insertBoard.do")
	public String insertBoard(BoardVO vo) throws Exception{
		LOGGER.info("insertBoard.do called...");
//		LOGGER.debug("BoardVO " + vo);
		boardService.insertBoard(vo);
		return "redirect:/boardList.do";
	}
	
	/*게시글 수정 화면으로 이동*/
	@RequestMapping(value="/updateView.do")
	public String updateView(BoardVO vo, Model model) throws Exception{
		LOGGER.info("updateView.do called..");
		model.addAttribute("update", boardService.selectBoard(vo.getId()));
		return "board/list_update";
	}
	
	/*게시글 수정 후 -> 목록으로 리다이렉트*/
	@RequestMapping(value = "/updateBoard.do")
	public String updateBoard(BoardVO vo) throws Exception{
		LOGGER.info("updateBoard.do called...");
//		LOGGER.debug("BoardVO " + vo);
		boardService.updateBoard(vo);
		return "redirect:/detailBoard.do?id="+vo.getId();
	}
	
	/*게시글 삭제*/
	@RequestMapping(value="/deleteBoard.do")
	public String deleteBoard(BoardVO vo) throws Exception{
		boardService.deleteBoard(vo);
		LOGGER.info("deleteBoard.do called...");
		LOGGER.info("delete board >> "+vo);
		return "redirect:/boardList.do";
	}
	
	/*댓글 등록*/
	@RequestMapping(value="/insertReply.do")
	public String insertReply(ReplyVO vo) throws Exception{
		replyService.insertReply(vo);
		LOGGER.info("insertReply.do called...");
		LOGGER.info("insert : "+vo);
		LOGGER.info("insert id >>> "+vo.getId());
		return "redirect:/detailBoard.do?id="+vo.getId();
	}
	
	/*대댓글 등록*/
	@RequestMapping(value="/insertreReply.do")
	public String insertreReply(ReplyVO vo) throws Exception{
		replyService.insertreReply(vo);;
		LOGGER.info("insertreReply.do called...");
		LOGGER.info("insertrereply : "+ vo.toString());
		return "redirect:/detailBoard.do?id="+vo.getId();
	}
	
	/*댓글 수정화면으로 이동*/
	@RequestMapping(value="/updateviewReply.do")
	public String updateviewReply(ReplyVO vo, Model model) throws Exception{
		LOGGER.info("updateviewReply.do called..");
		model.addAttribute("update", replyService.ridreadReply(vo.getRid()));
//		model.addAttribute("update", replyService.readReply(vo.getId()));
		return "board/reply_update";
	}
	
	/*댓글 수정 -> 목록*/
	@RequestMapping(value="/updateReply.do")
	public String updateReply(ReplyVO vo) throws Exception{
		replyService.updateReply(vo);
		LOGGER.info("updateReply.do called..");
		LOGGER.info("update : "+vo);
		return "redirect:/detailBoard.do?id="+vo.getId();
	}
	
	/*댓글 삭제*/
	@RequestMapping(value="/deleteReply.do")
	public String deleteReply(ReplyVO vo) throws Exception{
		replyService.deleteReply(vo);
		LOGGER.info("deleteReply.do called..");
		LOGGER.info("deleteReply >> " +vo);
		return "redirect:/boardList.do";
//		return "redirect:/detailBoard.do?id="+vo.getId();
	}

}
