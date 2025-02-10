import Handlebars from "handlebars";

// Импортируем все компоненты
import * as Components from "../templates/components"
import * as Template from "../templates/partials/errorContainer"


export const registerPartial = () => {
    Handlebars.registerPartial("button", Components.button);
    Handlebars.registerPartial("input", Components.input);
    Handlebars.registerPartial("link", Components.link);
    Handlebars.registerPartial("errorContainer", Template.errorContainer);
}