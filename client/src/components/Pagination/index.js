import { addClass, removeClass } from "../../utils";
import { DefaultPaginationParams } from "./constants";
import { removeAllChildNodes } from "../../utils";
import "./style.css";

export class Pagination {
  constructor(
    currentPageNumber = DefaultPaginationParams.currentPage,
    paginationCount,
    onChange,
    className = ""
  ) {
    this.paginationNode = document.createElement("div");
    this.currentPageNumber = currentPageNumber;
    this.paginationCount = Math.ceil(
      paginationCount / DefaultPaginationParams.totalPhotoInPage
    );
    this.currentPageNumberNode = this.createBlock(
      this.currentPageNumber,
      "pagination__current-page"
    );
    this.onChange = onChange;
    this.className = className;
  }

  render() {
    return this.createPaginationList();
  }

  update(paginationCount, currentPageNumber) {
    removeAllChildNodes(this.paginationNode);
    this.paginationCount = Math.ceil(
      paginationCount / DefaultPaginationParams.totalPhotoInPage
    );
    this.currentPageNumber = currentPageNumber;
    this.currentPageNumberNode.textContent =
      DefaultPaginationParams.currentPage;
    this.render();
  }

  createBlock(content, className) {
    const block = document.createElement("div");
    addClass(block, "pagination__item");
    addClass(block, className);
    block.append(content);
    return block;
  }

  createPaginationList() {
    const prev = this.createBlock("<", "pagination__prev-page"),
      next = this.createBlock(">", "pagination__next-page"),
      start = this.createBlock("<<", "pagination__start-page"),
      end = this.createBlock(">>", "pagination__end-page");

    next.addEventListener("click", () => this.handleClickNext());
    prev.addEventListener("click", () => this.handleClickPrev());
    start.addEventListener("click", () => this.handleClickStart());
    end.addEventListener("click", () => this.handleClickEnd());
    addClass(this.paginationNode, "pagination");
    addClass(this.paginationNode, this.className);
    addClass(start, "pagination_disabled");
    addClass(prev, "pagination_disabled");

    this.paginationNode.append(
      start,
      prev,
      this.currentPageNumberNode,
      next,
      end
    );
    return this.paginationNode;
  }

  handleClickNext() {
    const currentPageNumber = this.currentPageNumber + 1;

    if (currentPageNumber <= this.paginationCount) {
      this.updateCurrentPage(currentPageNumber);
      this.updateClassList();
      this.onChange(this.currentPageNumber);
    }
  }

  handleClickPrev() {
    const currentPageNumber = this.currentPageNumber - 1;
    if (currentPageNumber >= 1) {
      this.updateCurrentPage(currentPageNumber);
      this.updateClassList();
      this.onChange(this.currentPageNumber);
    }
  }

  handleClickStart() {
    const startPage = 1;
    if (this.currentPageNumber != startPage) {
      this.updateCurrentPage(startPage);
      this.updateClassList();
      this.onChange(this.currentPageNumber);
    }
  }

  handleClickEnd() {
    const endPageNumber = this.paginationCount;
    if (this.currentPageNumber != endPageNumber) {
      this.updateCurrentPage(endPageNumber);
      this.updateClassList();
      this.onChange(this.currentPageNumber);
    }
  }

  updateCurrentPage(currentPage) {
    this.currentPageNumber = currentPage;
    this.currentPageNumberNode.textContent = this.currentPageNumber;
  }

  updateClassList() {
    const startPage = document.querySelector(".pagination__start-page");
    const prevPage = document.querySelector(".pagination__prev-page");
    const nextPage = document.querySelector(".pagination__next-page");
    const endPage = document.querySelector(".pagination__end-page");

    if (this.currentPageNumber === DefaultPaginationParams.currentPage) {
      addClass(startPage, "pagination_disabled");
      addClass(prevPage, "pagination_disabled");
    } else {
      removeClass(startPage, "pagination_disabled");
      removeClass(prevPage, "pagination_disabled");
    }

    if (this.currentPageNumber === this.paginationCount) {
      addClass(nextPage, "pagination_disabled");
      addClass(endPage, "pagination_disabled");
    } else {
      removeClass(nextPage, "pagination_disabled");
      removeClass(endPage, "pagination_disabled");
    }
  }
}
