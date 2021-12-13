import { addClass } from "../../utils";
import { sortTypes } from "./constants";
import { sortAlphabeticallyByAsc, sortAlphabeticallyByDesc } from "./utils";
import AscImage from "../../assets/images/AscImage.png";
import DescImage from "../../assets/images/DescImage.png";
import "./style.css";

export class Table {
  constructor(data, columns, className = "") {
    this.table = document.createElement("table");
    this.data = data;
    this.columns = columns;
    this.sortType = sortTypes.none;
    this.defaultData = data.slice();
    this.className = className;
  }

  render() {
    addClass(this.table, "table");
    addClass(this.table, "table_width");
    addClass(this.table, this.className);
    this.table.append(this.createTableHead(), this.createTableBody());
    return this.table;
  }

  createTableHead() {
    const thead = document.createElement("thead");
    addClass(thead, "table__head");
    this.createRowInTableHead(thead);

    return thead;
  }

  createRowInTableHead(thead) {
    const tr = document.createElement("tr");

    this.columns.forEach((columnParams) => {
      const th = document.createElement("th");

      addClass(th, "table__head-cell");
      if (columnParams.sortable) {
        addClass(th, "table__sortable");
      }
      th.append(this.createCellInTableHead(columnParams));

      if (columnParams.sortable)
        th.addEventListener("click", () =>
          this.onClickByTableHead(columnParams)
        );

      tr.append(th);
    });

    thead.append(tr);
  }

  createCellInTableHead(columnParams) {
    const title = document.createElement("div");
    const cellBlock = document.createElement("div");

    addClass(cellBlock, "table__column-title");

    title.textContent = columnParams.title;

    cellBlock.append(title, this.createSortImageBlock(columnParams));

    return cellBlock;
  }

  createSortImageBlock(columnParams) {
    const img = document.createElement("img");
    addClass(img, "table__sort-img");
    img.setAttribute("table-sort", `${columnParams.dataIndex}`);
    img.src = "";

    return img;
  }

  // при кликен по хедэру таблицу
  onClickByTableHead(columnParams) {
    const columnDataIndex = columnParams.dataIndex;

    if (this.sortType === sortTypes.none) {
      this.sortColumnBy(columnDataIndex, sortTypes.asc, AscImage);

      return;
    }

    if (this.sortType === sortTypes.asc) {
      this.sortColumnBy(columnDataIndex, sortTypes.desc, DescImage);

      return;
    }

    if (this.sortType === sortTypes.desc) {
      this.sortColumnBy(columnDataIndex, sortTypes.none);
    }
  }

  sortColumnBy(dataIndex, sortType, sortImage = null) {
    this.sortType = sortType;

    if (sortType === sortTypes.asc)
      this.data.sort((a, b) => sortAlphabeticallyByAsc(a, b, dataIndex));

    if (sortType === sortTypes.desc)
      this.data.sort((a, b) => sortAlphabeticallyByDesc(a, b, dataIndex));

    if (sortType === sortTypes.none) this.data = this.defaultData.slice();

    this.displaySort(dataIndex, sortImage);
  }

  displaySort(dataIndex, sortImage) {
    const img = document.querySelector(`[table-sort="${dataIndex}"]`);
    img.src = sortImage || "";
    const tBody = document.querySelector(".table__body");
    tBody.remove();
    this.table.insertAdjacentElement(
      "beforeend",
      this.createTableBody(dataIndex)
    );
  }

  createTableBody(dataIndex) {
    const tbody = document.createElement("tbody");
    addClass(tbody, "table__body");

    this.createTableRows(tbody, dataIndex);

    return tbody;
  }

  createTableRows(tbody, dataIndex) {
    this.data.forEach((dataItem) => {
      const tr = document.createElement("tr");

      this.columns.forEach((item) => {
        const td = document.createElement("td");
        if (dataIndex === item.dataIndex && this.sortType !== sortTypes.none) {
          console.log("Ok");
          addClass(td, "table__column-sorted");
        }
        addClass(td, "table__body-cell");
        td.textContent = dataItem[item.dataIndex];
        tr.append(td);
      });
      tbody.append(tr);
    });
  }
}
