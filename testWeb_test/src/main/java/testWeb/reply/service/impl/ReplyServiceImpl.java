package testWeb.reply.service.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import testWeb.reply.service.ReplyService;
import testWeb.reply.service.ReplyVO;

@Service("replyService")
public class ReplyServiceImpl implements ReplyService{
	
	@Resource(name="replyMapper")
	private ReplyMapper replyDAO;
	
	/*댓글 조회*/
	@Override
	public List<ReplyVO> readReply(String id) throws Exception{
		return replyDAO.readReply(id);
	}

	/*댓글 등록*/
	@Override
	public void insertReply(ReplyVO vo) throws Exception {
		replyDAO.insertReply(vo);
	}
	
	/*대댓글 등록*/
	public void insertreReply(ReplyVO vo) throws Exception{
		replyDAO.insertreReply(vo);
	}
	
	/*선택 댓글 조회*/
	@Override
	public ReplyVO ridreadReply(int rid) throws Exception{
		return replyDAO.ridreadReply(rid);
	}
	
	/*댓글 수정*/
	@Override
	public void updateReply(ReplyVO vo) throws Exception{
		replyDAO.updateReply(vo);
	}
	
	/*댓글 삭제*/
	@Override
	public void deleteReply(ReplyVO vo) throws Exception{
		replyDAO.deleteReply(vo);
	}
}
