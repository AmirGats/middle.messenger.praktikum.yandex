import Handlebars from 'handlebars';
import * as Components  from "./components";
import * as Pages  from "./pages";

const linkPage = {
  'nav': [ Pages.navPage],
  'login': [ Pages.logPage ],
};

function navigate(page: string){
  //@ts-ignore
  const [ source, context ] = linkPage[page];
  const container = document.getElementById('#app')!;

  const templateFunc = Handlebars.compile(source);
  container.innerHTML = templateFunc(context);
}

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
})


document.addEventListener('DOMContentLoaded', () => {navigate('nav')})

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');

  if(page){
    navigate(page);
    e.preventDefault();
  }
});