import Block from "../../../core/Block";

type InputProps = {
    label: string;
    onChange: () => void;
    onBlur: () => void;
};

export default class Input extends Block{
    constructor(props: InputProps){
        super("input", {
            ...props,
            attrs: {
              placeholder: "",
            },
          });
        }
}