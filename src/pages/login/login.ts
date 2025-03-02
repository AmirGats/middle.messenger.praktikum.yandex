import { button, input } from "../../templates/components";
import Block from "../../core/Block";

interface LoginPageProps {
  formState: {
    login: string;
    password: string;
  };
}

export default class LoginPage extends Block {
  children: {
    InputLogin?: Block;
  } = {};

  constructor(props: LoginPageProps) {
    super("div", {
      ...props,
      formState: {
        login: "",
        password: "",
      },
      errors: {
        login: "",
        password: "",
      },
      className: "container",
      InputLogin: new input({
        label: "Login",
        name: "login",
        type: "text",
        error: "",
        onChange: (e: Event) => {
          const target = e.target as HTMLInputElement;
          if (!target) return;
          const value = (e.target as HTMLInputElement).value;

          let error = "";

          if (value === "error") {
            error = "Some error happened.";
          }
          if (value.length < 3) {
            error = "More than 3 characters required.";
          }

          (this.children.InputLogin as Block).setProps({ error });

          this.setProps({
            formState: {
              ...this.props.formState,
              login: value,
            },
          });
        },
      }),
      InputPassword: new input({
        label: "Password",
        name: "password",
        type: "password",
        error: "",
        onChange: (e: Event) => {
          const target = e.target as HTMLInputElement;
          if (!target) return;
          const value = target.value;
        
          this.setProps({
            formState: {
              ...this.props.formState,
              login: value, 
            },
          });
        }
        
      }),
      SignInButton: new button({
        btnText: "Sign in",
        color: "primary",
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          console.log("Login:", this.props.formState.login);
          console.log("Password:", this.props.formState.password);
        },
      }),
      SignUpButton: new button({
        btnText: "Sign up",
        color: "link",
      }),
    });
  }

  public render(): Node {
    const form = document.createElement("form");
    form.className = "login__form";
    form.innerHTML = `
      <form class="login__form">
        <div class="login__inputs">
          {{{InputLogin}}}
          {{{InputPassword}}}
        </div>
        <div class="login__btns">
          {{{SignInButton}}}
          {{{SignUpButton}}}
        </div>
      </form>
    `;

    return form;
  }
}
