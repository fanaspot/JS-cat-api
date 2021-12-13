import { Pagination } from "../../components/Pagination";
import { ImageList } from "../../components/ImageList";
import { Select } from "../../components/Select";
import { getImages } from "../../actions";
import { getCategories } from "../../actions";
import { addClass, createBtn } from "../../utils";
import { routes } from "../../routes";
import CategoriesImage from "../../assets/images/CategoriesImage.svg";
import "./main-page.css";

export const MainPage = async () => {
  const mainPage = document.createElement("div");
  const categoriesBtn = createBtn(
    "Категории",
    routes.categoriesList,
    CategoriesImage,
    "main-page__categories-btn"
  );

  const categories = await getCategories();

  const imageList = new ImageList();

  addClass(mainPage, "main-page");

  const onChangePagination = async (current) => {
    imageList.update({ isLoading: true });
    await getImages({
      limit: 9,
      page: current - 1,
      order: "ASC",
    }).then(({ photos }) => {
      imageList.update({ isLoading: false, photos });
    });
  };

  const onChangeSelect = async (id) => {
    imageList.update({ isLoading: true });
    getImages({
      limit: 9,
      page: 0,
      order: "ASC",
      category_ids: id,
    }).then(({ photos, paginationCount }) => {
      pagination.update(paginationCount, 1);
      imageList.update({ isLoading: false, photos });
    });
  };

  const pagination = new Pagination(
    1,
    0,
    onChangePagination,
    "main-page__pagination"
  );

  const select = new Select(categories, onChangeSelect);

  mainPage.append(
    categoriesBtn,
    pagination.render(),
    select.render(),
    imageList.init()
  );

  await getImages({
    limit: 9,
    page: 0,
    order: "ASC",
  }).then(({ photos, paginationCount }) => {
    pagination.update(paginationCount, 1);
    imageList.render(photos);
  });

  return mainPage;
};
