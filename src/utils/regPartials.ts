import Handlebars from "handlebars";

// Импортируем все компоненты
import * as Components from "../templates/components"

export const registerPartial = () => {
    Handlebars.registerPartial("button", Components.button);
    Handlebars.registerPartial("input", Components.input);
    Handlebars.registerPartial("link", Components.link);
    Handlebars.registerPartial("inputProfile", Components.inputProfile);
    Handlebars.registerPartial("inputFile", Components.inputFile);
    Handlebars.registerPartial("errorContainer", Components.errorContainer);
    Handlebars.registerPartial("chatContainer", Components.chatContainer);
    Handlebars.registerPartial("chatSidebar", Components.chatSidebar);
    Handlebars.registerPartial("chatUser", Components.chatUser);
    Handlebars.registerPartial("chatWindow", Components.chatWindow);
    Handlebars.registerPartial("profileContainer", Components.profileContainer);
    Handlebars.registerPartial("profileSet", Components.profileSet);
    Handlebars.registerPartial("profileNav", Components.profileNav);
    Handlebars.registerPartial("profileSetChange", Components.profileSetChange);
    Handlebars.registerPartial("profilePassword", Components.profilePassword);
    Handlebars.registerPartial("modalContainer", Components.modalContainer);
    Handlebars.registerPartial("modalProfile", Components.modalProfile);
    Handlebars.registerHelper("eq", function(a, b) {
        return a === b;
    });
}
