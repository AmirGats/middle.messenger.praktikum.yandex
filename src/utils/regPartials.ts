import Handlebars from "handlebars";

// Импортируем все компоненты
import * as Components from "../templates/components"
import * as Template from "../templates/partials"



export const registerPartial = () => {
    Handlebars.registerPartial("button", Components.button);
    Handlebars.registerPartial("input", Components.input);
    Handlebars.registerPartial("link", Components.link);
    Handlebars.registerPartial("inputProfile", Components.inputProfile);
    Handlebars.registerPartial("errorContainer", Template.errorContainer);
    Handlebars.registerPartial("profileContainer", Template.profileContainer);
    Handlebars.registerPartial("profileSet", Template.profileSet);
    Handlebars.registerPartial("profileNav", Template.profileNav);
    Handlebars.registerPartial("profileSetChange", Template.profileSetChange);
    Handlebars.registerPartial("profilePassword", Template.profilePassword);
    Handlebars.registerHelper("eq", function(a, b) {
        return a === b;
    });
}