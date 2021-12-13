import { addClass, removeAllChildNodes } from "../../utils";
import "./styles.css";

export class ImageList {
  constructor(className = "") {
    this.imagesList = document.createElement("div");
    this.className = className;
  }

  init() {
    addClass(this.imagesList, "images-list");
    addClass(this.imagesList, this.className);

    return this.imagesList;
  }

  render(photos) {
    photos.forEach((photo) => {
      const img = document.createElement("img");
      const link = document.createElement("a");

      img.src = photo.url;
      addClass(img, "images-list__img");
      link.href = `fullimage/${photo.id}`;
      link.setAttribute("data-navigo", "");

      link.appendChild(img);
      this.imagesList.append(link);
    });
  }

  update({ isLoading, photos }) {
    if (isLoading) {
      removeAllChildNodes(this.imagesList);
      this.imagesList.textContent = "Загрузка...";

      return;
    }

    if (!isLoading && photos) {
      removeAllChildNodes(this.imagesList);
      this.render(photos);
    }
  }
}
