package testWeb.reply.service.impl;

import java.util.List;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import testWeb.reply.service.ReplyVO;

@Mapper("replyMapper")
public interface ReplyMapper {

	/*댓글 조회*/
	public List<ReplyVO> readReply(String id) throws Exception;
	
	/*댓글 등록*/
	void insertReply(ReplyVO vo) throws Exception;
	
	/*대댓글 등록*/
	void insertreReply(ReplyVO vo) throws Exception;
	
	/*선택 댓글 조회*/
	public ReplyVO ridreadReply(int rid) throws Exception;
	
	/*댓글 수정*/
	void updateReply(ReplyVO vo) throws Exception;
	
	/*댓글 삭제*/
	void deleteReply(ReplyVO vo) throws Exception;
}
