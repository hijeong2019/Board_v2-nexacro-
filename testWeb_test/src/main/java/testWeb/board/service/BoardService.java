package testWeb.board.service;

import java.util.List;

public interface BoardService {
	/*게시글 목록 조회*/
//	List<?> selectBoardList(BoardVO vo) throws Exception;
//	List<BoardVO> selectBoardList() throws Exception;
	public List<BoardVO> selectBoardList(BoardPageVO pvo) throws Exception;
	
//	public List<BoardVO> selectBoardList(String searchType, String keyword) throws Exception;
//	public List<BoardVO> selectBoardList(BoardPageVO pvo, String searchOption, String keyword) throws Exception;

	/*게시글 검색 갯수*/
//	public int searchCount(String searchType, String keyword) throws Exception;
	
	
	
	/*게시글 총 갯수*/
	public int listCount() throws Exception;
	
	/*게시글 조회수*/
	public void boardHit(String id) throws Exception;
	
	/*게시글 클릭 시 상세페이지-글조회*/
	public BoardVO selectBoard(String id) throws Exception;
	
	/*게시글 등록*/
	void insertBoard(BoardVO vo) throws Exception;

	/*게시글 수정*/
	void updateBoard(BoardVO vo) throws Exception;
	
	/*게시글 삭제*/
	void deleteBoard(BoardVO vo) throws Exception;
}
