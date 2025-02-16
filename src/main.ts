import "./style.css";
import Handlebars from "handlebars";
import { registerPartial } from "./utils/regPartials";
import * as Pages from "./pages";

import arrowBack from "./assets/image/arrow_back.svg";
import arrowLight from "./assets/image/arrow_forward-light.svg";
import clipMenu from "./assets/image/clip.svg";
import dotMenu from "./assets/image/dots-menu.svg";
import profileImg from "./assets/image/profile-img.svg";

registerPartial();


const linkPage = {
  'nav': [ Pages.navPage ],
  'login': [ Pages.logPage ],
  'register': [ Pages.regPage ],
  'profile': [Pages.profile, {
    icons: { profileImg, arrowBack },
    email: "pochta@gmail.com",
    login: "user123",
    name: "Давид",
    surname: "Нагорный",
    nickname: "ivan_chat",
    phone: "+7 (999) 123-45-67"
  }],
  'profileChange': [Pages.profileChange, {
    icons: { profileImg, arrowBack },
    email: "pochta@gmail.com",
    login: "user123",
    name: "Давид",
    surname: "Нагорный",
    nickname: "ivan_chat",
    phone: "+7 (999) 123-45-67"
  }],
  'profilePassword': [Pages.profilePassword, {
    icons: { profileImg, arrowBack },
  }],
  'chat': [Pages.chat, {
    icons: { arrowLight, clipMenu, dotMenu },
  }],
  'error404': [Pages.error404],
  'error500': [Pages.error500],
};


function navigate(page: string) {
  //@ts-ignore
  const [source, context] = linkPage[page];
  const container = document.getElementById("app")!;

  //@ts-ignore
  let profileData = context ?? {};
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
