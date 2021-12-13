import { getImage } from "../../actions";
import { addClass } from "../../utils";
import { createBtn } from "../../utils";
import HomePageImage from "../../assets/images/HomePageImage.svg";
import "./style.css";

export const FullPhotoPage = async (id) => {
  const pageDiv = document.createElement("div");
  addClass(pageDiv, "page-wrapper");
  addClass(pageDiv, "full-photo");

  const createImageNode = async (id) => {
    const image = await getImage(id);
    const imageBlock = document.createElement("img");

    addClass(imageBlock, "full-photo__image");
    imageBlock.src = image.image.url;

    return imageBlock;
  };

  const createBackBtn = () => {
    const backBtn = document.createElement("a");
    backBtn.href = "/";
    backBtn.textContent = "Назад";
    addClass(backBtn, "full-photo__back-btn");

    return backBtn;
  };

  pageDiv.append(
    createBtn("Назад", "/", HomePageImage, "full-photo__back-btn"),
    await createImageNode(id)
  );

  return pageDiv;
};
