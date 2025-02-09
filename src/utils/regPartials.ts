import Handlebars from "handlebars";

// Импортируем все компоненты
import * as Components from "../templates/components"


export const registerPartial = () => {
    Handlebars.registerPartial("button", Components.button);
    Handlebars.registerPartial("input", Components.input);
}