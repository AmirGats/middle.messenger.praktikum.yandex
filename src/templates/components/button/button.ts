import Block from "../../../core/Block";

export default class Button extends Block{
    constructor(props: any){
        super("button", {
            ...props, 
            events: {
                click: props.onClick,
            },
        });
    }
    public render(): string{
        return `
       <button class="btn btn__{{type}}">
                {{btnText}}
        </button>
        `;
    }
}
