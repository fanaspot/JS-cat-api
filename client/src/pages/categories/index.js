import { addClass, createBtn } from "../../utils";
import { Table } from "../../components/Table";
import { getBreeds } from "../../actions";
import { columns } from "./constants";
import { routes } from "../../routes";
import HomePageImage from "../../assets/images/HomePageImage.svg";
import "./style.css";

export const CategoriesTable = async () => {
  const pageDiv = document.createElement("div");

  addClass(pageDiv, "page-wrapper");

  const homeButton = createBtn(
    "Home",
    routes.main,
    HomePageImage,
    "categories__home-button"
  );

  const createTable = async () => {
    const breeds = await getBreeds();
    const table = new Table(breeds, columns).render();
    addClass(table, "categories__table");

    return table;
  };

  pageDiv.append(homeButton, await createTable());

  return pageDiv;
};
