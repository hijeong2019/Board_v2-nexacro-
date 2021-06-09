package testWeb.board.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import testWeb.board.service.BoardPageVO;
import testWeb.board.service.BoardService;
import testWeb.board.service.BoardVO;

@Service("boardService")
public class BoardServiceImpl implements BoardService{
	
	@Resource(name = "boardMapper")
	private BoardMapper boardDAO;
	
	/*게시글 목록 조회*/
//	@Override
//	public List<?> selectBoardList(BoardVO vo) throws Exception {
//		return boardDAO.selectBoardList(vo);
//	}
//	@Override
//	public List<BoardVO> selectBoardList() throws Exception {
//		return boardDAO.selectBoardList();
//	}
	@Override
	public List<BoardVO> selectBoardList(BoardPageVO pvo) throws Exception {
		return boardDAO.selectBoardList(pvo);
	}
	
	
//	@Override
//	public List<BoardVO> selectBoardList(String searchType, String keyword) throws Exception {
//		return boardDAO.selectBoardList(searchType, keyword);
//	}
//	@Override
//	public List<BoardVO> selectBoardList(BoardPageVO pvo, String searchOption, String keyword) throws Exception {
//		return boardDAO.selectBoardList(pvo, searchOption, keyword);
//	}

	/*게시글 검색 갯수*/
//	@Override
//	public int searchCount(String searchType, String keyword) throws Exception{
//		return boardDAO.searchCount(searchType, keyword);
//	}
	
	
	
	
	/*게시글 총 갯수*/
	@Override
	public int listCount() throws Exception{
		return boardDAO.listCount();
	}
	
	/*게시글 조회수*/
	@Override
	public void boardHit(String id) throws Exception{
		boardDAO.boardHit(id);
	}
	
	/*게시글 클릭 시 상세페이지-글조회*/
	@Override
	public BoardVO selectBoard(String id) throws Exception{
		return boardDAO.selectBoard(id);
	}
	
	/*게시글 등록*/
	@Override
	public void insertBoard(BoardVO vo) throws Exception{
		boardDAO.insertBoard(vo);
	}
	
	/*게시글 수정*/
	@Override
	public void updateBoard(BoardVO vo) throws Exception{
		boardDAO.updateBoard(vo);
	}
	
	/*게시글 삭제*/
	@Override
	public void deleteBoard(BoardVO vo) throws Exception{
		boardDAO.deleteBoard(vo);
	}
}
