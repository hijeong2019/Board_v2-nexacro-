package testWeb.board.service.impl;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import testWeb.board.service.BoardPageVO;
import testWeb.board.service.BoardVO;

@Mapper("boardMapper")
public interface BoardMapper {
	
	/*게시글 목록 조회*/
//	List<?> selectBoardList(BoardVO vo) throws Exception;
//	public List<BoardVO> selectBoardList() throws Exception;
	public List<BoardVO> selectBoardList(BoardPageVO pvo) throws Exception;
	
//	public List<BoardVO> selectBoardList(@Param("searchType")String searchType, @Param("keyword")String keyword) throws Exception;
//	public List<BoardVO> selectBoardList(BoardPageVO pvo, @Param("searchOption")String searchOption, @Param("keyword")String keyword) throws Exception;

	/*게시글 검색 갯수*/
//	public int searchCount(String searchType, String keyword) throws Exception;
	
	
	
	/*게시글 총 갯수*/
	public int listCount() throws Exception;
	
	/*게시글 조회수*/
	public void boardHit(String id) throws Exception;
	
	/*게시글 클릭 시 상세페이지*/
	public BoardVO selectBoard(String id) throws Exception;
	
	/*게시글 등록*/
	void insertBoard(BoardVO vo) throws Exception;	
	
	/*게시글 수정*/
	void updateBoard(BoardVO vo) throws Exception;
	
	/*게시글 삭제*/
	void deleteBoard(BoardVO vo) throws Exception;
}
