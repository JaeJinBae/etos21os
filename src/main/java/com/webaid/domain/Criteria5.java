package com.webaid.domain;

public class Criteria5 {
	private int page;// 현재 선택한 page번호
	private int perPageNum;// 한 페이지에 표시될 게시물 갯수

	public Criteria5() {
		super();
		this.page = 1;
		this.perPageNum = 5;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		if(page<=0){
			this.page=page;
			return;
					
		}
		this.page = page;
	}

	public int getPerPageNum() {
		return perPageNum;
	}

	public void setPerPageNum(int perPageNum) {
		if (perPageNum <= 0 || perPageNum > 50) {
			this.perPageNum = 5;
			return;
		}

		this.perPageNum = perPageNum;
	}

	public int getPageStart() {
		return (this.page - 1) * perPageNum;
	}

	@Override
	public String toString() {
		return "Criteria5 [page=" + page + ", perPageNum=" + perPageNum + "]";
	}

}
