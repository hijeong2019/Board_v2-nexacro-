package testWeb.board.service;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class BoardPageVO {
		
	// 현재페이지, 시작페이지, 끝페이지, 게시글 총 갯수, 페이지당 글 갯수, 마지막페이지, SQL쿼리에 쓸 start, end
	private int nowPage, startPage, endPage, total, cntPerPage, lastPage, start, end;
	private int cntPage = 5;
	
//	private String searchType=""; //게시글 검색타입
//	private String keyword=""; //게시글 검색어
	
	public BoardPageVO() {
	}
	public BoardPageVO(int total, int nowPage, int cntPerPage) {
		setNowPage(nowPage);
		setCntPerPage(cntPerPage);
		setTotal(total);
		calcLastPage(getTotal(), getCntPerPage());
		calcStartEndPage(getNowPage(), cntPage);
		calcStartEnd(getNowPage(), getCntPerPage());
	}
	// 제일 마지막 페이지 계산
	public void calcLastPage(int total, int cntPerPage) {
		setLastPage((int) Math.ceil((double)total / (double)cntPerPage));
	}
	// 시작, 끝 페이지 계산
	public void calcStartEndPage(int nowPage, int cntPage) {
		setEndPage(((int)Math.ceil((double)nowPage / (double)cntPage)) * cntPage);
		if (getLastPage() < getEndPage()) {
			setEndPage(getLastPage());
		}
		setStartPage(getEndPage() - cntPage + 1);
		if (getStartPage() < 1) {
			setStartPage(1);
		}
	}
	// DB 쿼리에서 사용할 start, end값 계산
	public void calcStartEnd(int nowPage, int cntPerPage) {
		setEnd(nowPage * cntPerPage);
		setStart(getEnd() - cntPerPage + 1);
	}
	
	public int getNowPage() {
		return nowPage;
	}
	public void setNowPage(int nowPage) {
		this.nowPage = nowPage;
	}
	public int getStartPage() {
		return startPage;
	}
	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}
	public int getEndPage() {
		return endPage;
	}
	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public int getCntPerPage() {
		return cntPerPage;
	}
	public void setCntPerPage(int cntPerPage) {
		this.cntPerPage = cntPerPage;
	}
	public int getLastPage() {
		return lastPage;
	}
	public void setLastPage(int lastPage) {
		this.lastPage = lastPage;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getEnd() {
		return end;
	}
	public void setEnd(int end) {
		this.end = end;
	}	
	public int setCntPage() {
		return cntPage;
	}
	public void getCntPage(int cntPage) {
		this.cntPage = cntPage;
	}
	
//	public String getSearchType() {
//		return searchType;
//	}
//	public void setSearchType(String searchType) {
//		this.searchType = searchType;
//	}
//	public String getKeyword() {
//		return keyword;
//	}
//	public void setKeyword(String keyword) {
//		this.keyword = keyword;
//	}
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this); 
	}
		
		
	
/*	public static final int PAGE_SCALE = 10; //페이지당 게시물 수 
	public static final int BLOCK_SCALE = 10; //화면당 페이지 수
	
	private int curPage; //현재 페이지수
	private int prevPage; //이전 페이지
	private int nextPage; //다음 페이지
	private int totPage; //전체 페이지 갯수
	private int totBlock; //전체 페이지 블록 갯수
	private int curBlock; //현재 페이지 블록
	private int prevBlock; //이전 페이지 블록
	private int nextBlock; //다음 페이지 블록
	private int pageBegin; //페이지 시작
	private int pageEnd; //페이지 끝
	private int blockBegin; //현재 페이지 블록 시작 번호
	private int blockEnd; //현재 페이지 블록 끝번호
	
	//BoardPager(레코드 갯수, 현재 페이지 번호)
	public BoardPageVO(int count, int curPage) {
		curBlock = 1; //현재 페이지 블록 번호
		this.curPage = curPage; //현재 페이지 설정
		setTotPage(count); //현재 페이지 갯수 계산
		setPageRange(); 
		setTotBlock(); //전체 페이지 블록 갯수 계산
		setBlockRange(); //페이지 블록의 시작, 끝 번호 계산
	}
	
	public void setBlockRange() {
		//Math.ceil-주어진 숫자보다 크거나 같은 숫자 중 가장 작은 숫자
		curBlock = (int)Math.ceil((curPage-1)/BLOCK_SCALE)+1; //현재 페이지가 몇번째 페이지 블록에 속하는지 계산 
		blockBegin = (curBlock-1)*BLOCK_SCALE+1; //현재 페이지 블록 시작, 끝 번호 계산
		blockEnd = blockBegin+BLOCK_SCALE-1; //페이지 블록 끝번호
		if(blockEnd > totPage) blockEnd = totPage; //마지막 블록이 범위를 초과하지 않도록 계산
		prevPage = (curPage == 1)? 1:(curBlock-1)*BLOCK_SCALE; //이전 눌렀을 때 이동할 페이지 번호
		nextPage = curBlock > totBlock ? (curBlock*BLOCK_SCALE) : (curBlock*BLOCK_SCALE)+1; //다음 눌렀을 때 이동할 페이지 번호
		if(nextPage >= totPage) nextPage = totPage; //마지막 페이지가 범위를 초과하지 않도록 처리
	}
	
	public void setPageRange() {
		pageBegin = (curPage-1)*PAGE_SCALE+1; //시작번호 = (현재페이지-1)*페이지당 게시물 수 +1
		pageEnd = pageBegin+PAGE_SCALE-1; //끝번호 = 시작번호+페이지당 게시물 수 -1
	}
	
	public int getCurPage() {
		return curPage;
	}
	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}
	public int getPrevPage() {
		return prevPage;
	}
	public void setPrevPage(int prevPage) {
		this.prevPage = prevPage;
	}
	public int getNextPage() {
		return nextPage;
	}
	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}
	public int getTotPage() {
		return totPage;
	}
	public void setTotPage(int count) {
		//Math.ceil(실수) 올림 처리
		totPage = (int)Math.ceil(count*0.1 / PAGE_SCALE);
	}
	public int getTotBlock() {
		return totBlock;
	}
	//페이지 블록 갯수 계산(총 100페이지면 10개의 블록)
	public void setTotBlock() {
		// 전체 페이지 갯수 / 10
		// 91 / 10 => 9.1 => 10개
		totBlock = (int)Math.ceil(totPage / BLOCK_SCALE);
	}
	public int getCurBlock() {
		return curBlock;
	}
	public void setCurBlock(int curBlock) {
		this.curBlock = curBlock;
	}
	public int getPrevBlock() {
		return prevBlock;
	}
	public void setPrevBlock(int prevBlock) {
		this.prevBlock = prevBlock;
	}
	public int getNextBlock() {
		return nextBlock;
	}
	public void setNextBlock(int nextBlock) {
		this.nextBlock = nextBlock;
	}
	public int getPageBegin() {
		return pageBegin;
	}
	public void setPageBegin(int pageBegin) {
		this.pageBegin = pageBegin;
	}
	public int getPageEnd() {
		return pageEnd;
	}
	public void setPageEnd(int pageEnd) {
		this.pageEnd = pageEnd;
	}
	public int getBlockBegin() {
		return blockBegin;
	}
	public void setBlockBegin(int blockBegin) {
		this.blockBegin = blockBegin;
	}
	public int getBlockEnd() {
		return blockEnd;
	}
	public void setBlockEnd(int blockEnd) {
		this.blockEnd = blockEnd;
	}
*/
}
