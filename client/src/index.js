import Navigo from "navigo";
import { routes } from "./routes";
import { FullPhotoPage } from "./pages/full-photo";
import { removeAllChildNodes } from "./utils";
import { MainPage } from "./pages/main";
import { CategoriesTable } from "./pages/categories";
import "./main.css";

const router = new Navigo("/");
const root = document.getElementById("root");

router.on(routes.main, async () => {
  removeAllChildNodes(root);
  root.append(await MainPage());
  router.updatePageLinks();
});

router.on(routes.fullPhoto, async (match) => {
  removeAllChildNodes(root);
  root.append(await FullPhotoPage(match.data.id));
  router.updatePageLinks();
});

router.on(routes.categoriesList, async () => {
  removeAllChildNodes(root);
  root.append(await CategoriesTable());
  router.updatePageLinks();
});

router.resolve();
