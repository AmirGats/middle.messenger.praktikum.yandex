import "./style.css";
import Handlebars from "handlebars";
import { registerPartial } from "./utils/regPartials";
import * as Pages from "./pages";


registerPartial();

const linkPage = {
  'nav': [ Pages.navPage ],
  'login': [ Pages.logPage ],
  'register': [ Pages.regPage ],
  'profile': [Pages.profile],
  'profileChange': [Pages.profileChange],
  'profilePassword': [Pages.profilePassword],
  'chat': [Pages.chat],
  'error404': [Pages.error404],
  'error500': [Pages.error500],
};


function navigate(page: string) {
  //@ts-ignore
  const [source, context] = linkPage[page];
  const container = document.getElementById("app")!;

  //@ts-ignore
  let profileData = {}

  if(page = 'profile'){
    profileData = {
      email: "pochta@gmail.com",
      login: "user123",
      name: "Давид",
      surname: "Нагорный",
      nickname: "ivan_chat",
      phone: "+7 (999) 123-45-67"
    };
  }


  const templateFunc = Handlebars.compile(source);
  container.innerHTML = templateFunc(profileData);
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
