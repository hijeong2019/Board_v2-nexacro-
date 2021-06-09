package tims.board.mainboard.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import tims.board.mainboard.service.BoardVO;

@Mapper("boardMapper")
public interface BoardMapper {
	
	/*게시글 목록 조회 및 검색*/
	List<BoardVO> selectBoardList(Map<String, Object> searchMap) throws Exception;
	
	/*게시글 상세보기*/
	List<BoardVO> selectBoard(Map<String, Object> searchdetailMap) throws Exception;
	
	/*게시글 조회수*/
	int boardHit(Map<String, Object> searchMap) throws Exception;
	
	/*게시글 등록*/
	int insertBoard(Map<String, Object> dsBoard);
	
	/*게시글 삭제*/
	int deleteBoard(Map<String, Object> dsBoardDetail);
	
	/*게시글 수정*/
	int updateBoard(Map<String, Object> dsBoardDetail);
}
