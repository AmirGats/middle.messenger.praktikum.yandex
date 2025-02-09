import "./style.css";
import Handlebars from "handlebars";
import { registerPartial } from "./utils/regPartials";
import * as Pages from "./pages";

registerPartial();

const linkPage = {
  'nav': [ Pages.navPage ],
  'login': [ Pages.logPage ],
  'register': [ Pages.regPage ]
};

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = linkPage[page];
  const container = document.getElementById("app")!;

  const templateFunc = Handlebars.compile(source);
  container.innerHTML = templateFunc(context);
}

document.addEventListener("DOMContentLoaded", () => {
  navigate("nav");
});

document.addEventListener("click", (e) => {
  //@ts-ignore
  const page = (e.target as HTMLElement).getAttribute("page");

  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
