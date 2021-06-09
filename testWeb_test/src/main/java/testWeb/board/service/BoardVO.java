package testWeb.board.service;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class BoardVO {
	private String id;
	private String name;
	private String description;
	private String useYn;
	private String regUser;
	private int hit; //조회수
	private String replyCnt;	//댓글 개수
	private String searchType=""; //게시글 검색옵션
	private String keyword=""; //게시글 검색 키워드
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getRegUser() {
		return regUser;
	}
	public void setRegUser(String regUser) {
		this.regUser = regUser;
	}
	public String getReplyCnt() {
		return replyCnt;
	}
	public void setReplyCnt(String replyCnt) {
		this.replyCnt = replyCnt;
	}
	public int getHit() {
		return hit;
	}
	public void setHit(int hit) {
		this.hit = hit;
	}
	
	
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this); //ToStringBuilder의 reflectionToString()을 사용해 객체의 세부적인 내용들을 String으로 출력
	}

}
