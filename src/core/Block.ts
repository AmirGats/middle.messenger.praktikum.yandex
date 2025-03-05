import EventBus from "./Event-bus";
import Handlebars from "handlebars";
import { nanoid } from "nanoid";

interface BlockMeta<T> {
  tagName: string;
  props: T;
}

interface Props {
  events?: Record<string, EventListener>; 
  [key: string]: any;
}

type PropsWithChildren = {
  children?: Record<string, Block | Block[]>;
} & Record<string, unknown>;


// Основной класс Block, используемый для создания компонентов
class Block<T extends Props = {} > {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  
  _element: HTMLElement | null = null;
  _meta: BlockMeta<T> | null = null;
  _id = nanoid(6);
  eventBus: () => EventBus;
  props: T;
  children: {};
    id: any;

  
    /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */

    constructor(tagName: string = "div", propsWithChildren: Record<string, unknown> = {}) {
      const eventBus = new EventBus();
      this.eventBus = () => eventBus;
  
      const { props, children } = this._getChildrenAndProps(propsWithChildren as PropsWithChildren);
      this.children = children;
  
      this._meta = {
        tagName,
        props,
      };
  
      this.props = this._makePropsProxy(props as T);
  
      this._registerEvents(eventBus);
      eventBus.emit(Block.EVENTS.INIT);
  }
  

  // Регистрация событий жизненного цикла компонента
  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // Создание корневого элемента компонента
  private _createResources(): void {
    const tagName: string | undefined = this._meta?.tagName;
    if (!tagName) {
      throw new Error("Ошибка: _meta не инициализирован!");
    }
    this._element = this._createDocumentElement(tagName);
  }

  // Инициализация компонента
  private init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // Вызывается при монтировании компонента
  private _componentDidMount(): void {
    this.componentDidMount();
  }

  private _getChildrenAndProps(propsAndChildren: PropsWithChildren): { props: T; children: Record<string, Block> } {
    const children: Record<string, Block> = {};
    const props: Record<string, any> = {};
  
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((obj) => {
          if (obj instanceof Block) {
            children[key] = value as unknown as Block;
          } else {
            props[key] = value;
          }
        });
        return;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
  
    return { props: props as T, children };
  }

//@ts-ignore
  protected componentDidMount(oldProps?: T): void {}

  // Метод для явного вызова componentDidMount
  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  // Вызывается при обновлении свойств компонента
  private _componentDidUpdate(oldProps: T, newProps: T): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }
//@ts-ignore
  protected componentDidUpdate(oldProps: T, newProps: T): boolean {
    return true;
  }

  // Установка новых свойств компонента
  public setProps(nextProps: Partial<T>): void {
    if (!nextProps) return;

    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);

    if (this.componentDidUpdate(oldProps, this.props)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Получение элемента компонента
  public get element(): HTMLElement | null {
    return this._element;
  }

  private _addEvents(): void{
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    })
  }

  private _removeEvents(): void{
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    })
  }

  private _compile(): DocumentFragment {
    const propsAndStubs: Record<string, unknown> = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
        if (Array.isArray(child)) {
            propsAndStubs[key] = child.map(
                (component) => `<div data-id="${(component as Block)._id}"></div>`,
            );
        } else {
            propsAndStubs[key] = `<div data-id="${(child as Block)._id}"></div>`;
        }
    });

    // Приводим к HTMLTemplateElement, чтобы избежать ошибки с `content`
    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
        if (Array.isArray(child)) {
            child.forEach((component) => {
                const stub = fragment.content.querySelector(`[data-id="${(component as Block)._id}"]`);
                stub?.replaceWith((component as Block).getContent() as Node);
            });
        } else {
            const stub = fragment.content.querySelector(`[data-id="${(child as Block)._id}"]`);
            stub?.replaceWith((child as Block).getContent() as Node);
        }
    });

    return fragment.content;
}


  // Отрисовка компонента
  private _render(): void {
    this._removeEvents();
    if (!this._element) {
      this._createResources();
    }
    const block = this._compile();

    if (!this._element) return;

    this._element.innerHTML = "";
    if (block instanceof Node) {
      this._element.appendChild(block);
    } else {
      console.error("Render method must return a DOM node.");
    }
    this._addEvents();
  }

  // Метод, который должен быть переопределён в наследниках
  public render(): string {
    return "";
  }

  // Получение контента компонента
  public getContent(): HTMLElement | null {
    return this.element;
  }

  // Создание прокси-объекта для пропсов (нельзя удалять свойства)
  private _makePropsProxy(props: T): T {
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop as keyof T];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value: any) {
        (target as Record<string, any>)[prop] = value;
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  // Создание HTML-элемента
  _createDocumentElement(tagName: string): HTMLElement | HTMLTemplateElement {
    if (tagName === "template") {
      return document.createElement(tagName) as HTMLTemplateElement;
    }
    return document.createElement(tagName);
  }

  // Отображение компонента
  public show(): void {
    if (this._element) {
      this._element.style.display = "block";
    }
  }

  // Скрытие компонента
  public hide(): void {
    if (this._element) {
      this._element.style.display = "none";
    }
  }
}

export default Block;
