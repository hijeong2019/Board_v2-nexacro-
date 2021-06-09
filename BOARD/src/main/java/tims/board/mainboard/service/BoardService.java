package tims.board.mainboard.service;

import java.util.List;
import java.util.Map;

public interface BoardService {
	
	/*게시글 목록 조회 및 검색*/
	public Map<String, Object> selectBoardList(Map<String, Object> searchMap) throws Exception;
	
	/*게시글 상세보기*/
	public Map<String, Object> selectBoard(Map<String, Object> searchdetailMap) throws Exception;
	
	/*게시글 조회수*/
	public Map<String, Object> boardHit(Map<String, Object> searchMap) throws Exception;

	/*게시글 등록*/
	public Map<String, Object> boardInsert (Map<String, Object> dsBoard);
	
	/*게시글 수정*/
	public Map<String, Object> boardUpdate (Map<String, Object> dsBoardDetail);
	
	/*게시글 삭제*/
	public Map<String, Object> boardDelete (Map<String, Object> dsBoardDetail);
}
