import Block from "../../../core/Block";
import Input from "./input";

type InputFieldProps = {
    label: string;
    name: string;
    type: string;
    error?: string;
    onChange: (e: Event) => void;
    onBlur: (e: FocusEvent) => void;  
};

export default class InputField extends Block {
    constructor(props: InputFieldProps) {
        super("input", {
            ...props,
            className: "input",
            change: props.onChange,
            Input: new Input({
                className: "input__element",
                label: "{{label}}",
            }),
        });
    }

    public render(): string {
        return `
            <label class="input__container">
              {{{Input}}}
              <div class="input__label">{{label}}</div>
            </label>
            <div class="input__error">{{#if error}}{{error}}{{/if}}</div>
        `;
    }
}
