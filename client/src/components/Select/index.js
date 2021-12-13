import {
  addClass,
  hasClass,
  removeClass,
  removeAllChildNodes,
} from "../../utils";
import "./style.css";

export class Select {
  constructor(options, onChange, className = "", value) {
    this.element = document.createElement("div");
    this.mainBlock = this.createBlock("");
    this.optionsList = document.createElement("div");
    this.options = options;
    this.onChange = onChange;
    this.value = value;
    this.className = className;
    this.onClickMainBlock = this.onClickMainBlock.bind(this);
  }

  render() {
    return this.createSelectList();
  }

  update(option) {
    this.value = option.id;
    this.mainBlock.textContent = option.label;
    this.optionsList.classList.toggle("select_hide");
    this.onChange(this.value);
    removeAllChildNodes(this.optionsList);
  }

  createSelectList() {
    addClass(this.element, "select");
    addClass(this.element, "select_color");
    addClass(this.element, this.className);
    addClass(this.optionsList, "select__option-list");
    addClass(this.optionsList, "select_hide");

    const centerBlock = document.createElement("div");
    addClass(centerBlock, "select__center-block");
    centerBlock.append(this.mainBlock, this.optionsList);
    this.element.append(centerBlock);

    this.mainBlock.addEventListener("click", this.onClickMainBlock);

    return this.element;
  }

  createBlock(content) {
    const block = document.createElement("div");
    addClass(block, "select__option-block");
    block.append(content);
    return block;
  }

  onClickMainBlock() {
    if (this.mainBlock.textContent) {
      this.mainBlock.classList.toggle("select_opacity");
    }
    this.createSingleOptionsList();
    this.optionsList.classList.toggle("select_hide");
    if (hasClass(this.optionsList, "select_hide")) {
      removeAllChildNodes(this.optionsList);
    }
  }

  createSingleOptionsList() {
    this.options.forEach((item) => {
      const option = this.createBlock(item.label);
      this.optionsList.append(option);
      if (this.value === item.id) {
        addClass(option, "select__selected-option");
      }
      if (this.value !== item.id) {
        option.addEventListener("click", () => {
          this.update(item);
          removeClass(this.mainBlock, "select_opacity");
        });
      }
    });
  }
}
