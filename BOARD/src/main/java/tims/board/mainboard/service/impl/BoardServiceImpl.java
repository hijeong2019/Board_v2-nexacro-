package tims.board.mainboard.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.nexacro.uiadapter17.spring.core.data.DataSetRowTypeAccessor;
import com.nexacro17.xapi.data.DataSet;

import tims.board.mainboard.service.BoardService;
import tims.board.mainboard.service.BoardVO;

@Service("boardService")
public class BoardServiceImpl implements BoardService {

	@Resource(name = "boardMapper")
	private BoardMapper boardMapper;

	/* 게시글 목록 조회 및 검색*/
	@Override
	public Map<String, Object> selectBoardList(Map<String, Object> searchMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();

		//selectBoardList : 게시글 목록 조회 및 검색
		List<BoardVO> dsBoard = boardMapper.selectBoardList(searchMap);
		map.put("dsBoard", dsBoard);
		return map;
	}

	/* 게시글 상세보기 */
	@Override
	public Map<String, Object> selectBoard(Map<String, Object> searchdetailMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();

		//selectBoard : 게시글 상세보기
		List<BoardVO> dsBoardDetail = boardMapper.selectBoard(searchdetailMap);
		map.put("dsBoardDetail", dsBoardDetail);
		return map;
	}

	/* 게시글 조회수 */
	@Override
	public Map<String, Object> boardHit(Map<String, Object> searchMap) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		
		//boardHit : 게시글 조회수 증가
		boardMapper.boardHit(searchMap);
		return map;
	}

	/* 게시글 등록 */
	@Override
	public Map<String, Object> boardInsert(Map<String, Object> dsBoard) {
		Map<String, Object> map = new HashMap<String, Object>();

		//insertBoard : 게시글 등록
		boardMapper.insertBoard(dsBoard);
		return map;
	}
	
	/* 게시글 수정 */
	@Override
	public Map<String, Object> boardUpdate(Map<String, Object> dsBoardDetail) {
		Map<String, Object> map = new HashMap<String, Object>();

		//updateBoard : 게시글 수정
		boardMapper.updateBoard(dsBoardDetail);
/*		int result = 0;

		// 기본사항 CRUD
		for (int i = 0; i < dsBoardDetail.size(); i++) 
		{
			Map<String, Object> ApplyInfoMap = dsBoardDetail.get(i);
			
			//DataSetRowTypeAccessor : 데이터 변환 시 DataSet의 행(row)의 형식(type)을 처리하기 위한 인터페이스이다
			int dataRowType = Integer.parseInt(String.valueOf(ApplyInfoMap.get(DataSetRowTypeAccessor.NAME))); 

			if (dataRowType == DataSet.ROW_TYPE_UPDATED) {
				result = boardMapper.updateBoard(ApplyInfoMap);
			} else if (dataRowType == DataSet.ROW_TYPE_DELETED) {
				result = boardMapper.deleteBoard(ApplyInfoMap);
			}
		}*/
		return map;
	}
	
	/* 게시글 삭제 */
	@Override
	public Map<String, Object> boardDelete(Map<String, Object> dsBoardDetail) {
		Map<String, Object> map = new HashMap<String, Object>();

		//deleteBoard : 게시글 삭제
		boardMapper.deleteBoard(dsBoardDetail);
		return map;
	}
}
