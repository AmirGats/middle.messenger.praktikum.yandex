import Block from "../../../core/Block";

export default class Button extends Block{
    constructor(props: any){
        super("button", {
            ...props, 
            className: `btn btn__${props.color}`,
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
