package tims.board.mainboard.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.DataSetRowTypeAccessor;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.nexacro17.xapi.data.DataSet;

import tims.board.mainboard.service.BoardService;
import tims.board.member.service.MemberVO;
import tims.board.reply.service.ReplyService;

@Controller
public class BoardController {
	private Logger log = LoggerFactory.getLogger(this.getClass().getName());
	
	@Resource(name="boardService")
	private BoardService boardService;
	
	@Resource(name="replyService")
	private ReplyService replyService;
	
	/*게시글 목록 조회 및 검색*/
	@RequestMapping(value="/board/mainboard/boardList.do")
	public NexacroResult selectBoardList(
			    @ParamDataSet(name = "dsBoard", required = false) List<Map<String, Object>> dsBoard
			  , @ParamDataSet(name = "dsSearch", required = false) Map<String, Object> dsSearch
			) throws Exception {
		
//		Map<String, Object> searchMap = new HashMap<String, Object>();
//		searchMap.put("searchType", dsSearch.get("searchType"));
//		searchMap.put("searchWord", dsSearch.get("searchWord"));
		
		Map<String, Object> resultMap = boardService.selectBoardList(dsSearch);
		
		NexacroResult result = new NexacroResult();		
		result.addDataSet("dsBoard", resultMap.get("dsBoard"));
		return result;
	}
	
	/*게시글 상세보기*/
	@RequestMapping(value="/board/mainboard/boardDetail.do")
	public NexacroResult selectBoard(
			  @ParamDataSet(name = "dsSearch", required = false) Map<String, Object> dsSearch
			, @ParamDataSet(name = "dsBoardDetail", required = false) Map<String, Object> dsBoardDetail
			) throws Exception {
		
		
		Map<String, Object> searchMap = new HashMap<String, Object>();
		searchMap.put("searchBoardId", dsSearch.get("searchBoardId"));
		
		Map<String, Object> resultMap = boardService.selectBoard(searchMap); //상세페이지조회
		Map<String, Object> resultMap2 = replyService.readReply(searchMap); //댓글조회
		//boardService.boardHit(searchMap); //조회수
		
		NexacroResult result = new NexacroResult();		
		result.addDataSet("dsBoardDetail", resultMap.get("dsBoardDetail"));
		result.addDataSet("dsReplyList", resultMap2.get("dsReplyList"));
		return result;
	}
	
	
	/*게시글 조회수*/
	@RequestMapping(value="/board/mainboard/boardHit.do")
	public NexacroResult boardHit(
			@ParamDataSet(name = "dsSearch", required = false) Map<String, Object> dsSearch
			) throws Exception {
		
		boardService.boardHit(dsSearch); //조회수
		
		NexacroResult result = new NexacroResult();		
		return result;
	}
 
	/*게시글 등록*/
	@RequestMapping(value="/board/mainboard/boardInsert.do")
	public NexacroResult boardInsert(
			  @ParamDataSet(name = "dsSearch", required = false) Map<String, Object> dsSearch
			, @ParamDataSet(name = "dsBoard", required = false) Map<String, Object> dsBoard
			) throws Exception {
		
		HashMap<String, Object> param = new HashMap<>();
		param.put("id"		, dsSearch.get("boardId"));
		param.put("name"		, dsBoard.get("name"));
		param.put("description"	, dsBoard.get("description"));
		param.put("useYn"		, dsBoard.get("useYn"));
		param.put("regUser"		, dsBoard.get("regUser"));
		
		boardService.boardInsert(param);
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	/*게시글 수정*/
	@RequestMapping(value="/board/mainboard/boardUpdate.do")
	public NexacroResult boardUpdate(
			@ParamDataSet(name = "dsBoardDetail", required = false) Map<String, Object> dsBoardDetail
			) throws Exception {
		
		boardService.boardUpdate(dsBoardDetail);
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	/*게시글 삭제*/
	@RequestMapping(value="/board/mainboard/boardDelete.do")
	public NexacroResult boardDelete(
			  @ParamDataSet(name = "dsBoardDetail", required = false) Map<String, Object> dsBoardDetail
			) throws Exception {
		
		boardService.boardDelete(dsBoardDetail);
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	
	
	
	/*
	 * 댓글, 답글 
	 */
	
	/*댓글 상세보기*/
	@RequestMapping(value="/board/mainboard/replyDetail.do")
	public NexacroResult ridreadReply(
			  @ParamDataSet(name = "dsSearch", required = false) Map<String, Object> dsSearch
			, @ParamDataSet(name = "dsRreplyDetail", required = false) Map<String, Object> dsRreplyDetail
			) throws Exception {
		
		Map<String, Object> searchMap = new HashMap<String, Object>();
		searchMap.put("rid", dsSearch.get("rid"));
		
		Map<String, Object> resultMap = replyService.ridreadReply(searchMap);
		
		NexacroResult result = new NexacroResult();		
		result.addDataSet("dsRreplyDetail", resultMap.get("dsRreplyDetail"));
		return result;
	}
	
	
	/*댓글 등록*/
	@RequestMapping(value="/board/mainboard/replyInsert.do")
	public NexacroResult insertReply(
			 @ParamDataSet(name = "dsSearch", required = false) Map<String, Object> dsSearch
			, @ParamDataSet(name = "dsReplyList", required = false) Map<String, Object> dsReplyList
			) throws Exception {

		HashMap<String, Object> param = new HashMap<>();
		param.put("boardId", dsSearch.get("boardId"));
		param.put("writer", dsReplyList.get("writer"));
		param.put("contents", dsReplyList.get("contents"));
	
		replyService.insertReply(param);
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	
	/*댓글 삭제*/
	@RequestMapping(value="/board/mainboard/replyProc.do")
	public NexacroResult replyProc(
			  @ParamDataSet(name = "dsReplyList", required = false) List<Map<String, Object>> dsReplyList
			) throws Exception {
		
		replyService.replyProcList(dsReplyList);
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	/*댓글 수정*/
	@RequestMapping(value="/board/mainboard/updateReply.do")
	public NexacroResult updateReply(
			  @ParamDataSet(name = "dsRreplyDetail", required = false) List<Map<String, Object>> dsRreplyDetail
			) throws Exception {
		
		Map<String, Object> resultMap = replyService.updateReply(dsRreplyDetail);
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	/*답글등록*/
	@RequestMapping(value="/board/mainboard/insertReReply.do")
	public NexacroResult insertreReply(
			   @ParamDataSet(name = "dsReReplyinsert", required = false) Map<String, Object> dsReReplyinsert
			  ,@ParamDataSet(name = "dsSearch", required = false) Map<String, Object> dsSearch
			) throws Exception {

		replyService.updateSeq(dsSearch); //답글 seq 증가
		
		HashMap<String, Object> param = new HashMap<>();
		param.put("id", dsSearch.get("id"));
		param.put("rid", dsSearch.get("rid"));
		param.put("writer", dsReReplyinsert.get("writer"));
		param.put("contents", dsReReplyinsert.get("contents"));
	
		replyService.insertreReply(param); //답글 등록
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	
}

