import Block from "../../../core/Block";

export default class Button extends Block{
    constructor(props){
        super("button", {
            ...props, 
            className:`btn btn__{{type}}`,
            events: {
                click: props.onClick,
            },
        });
    }
    public render(): string{
        return `
        {{btnText}}
        `;
    }
}