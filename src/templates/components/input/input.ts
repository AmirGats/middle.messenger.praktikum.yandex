import Block from "../../../core/Block";

type InputProps = {
    className: string;
    label: string;
};

export default class Input extends Block{
    constructor(props: InputProps){
        super("input", {
            ...props,
            className: "input__element",
            label: `${props.label}`,
            attrs: {
              placeholder: "",
            },
          });
        }
}