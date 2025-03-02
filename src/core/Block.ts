import EventBus from "./Event-bus";

interface BlockMeta<T> {
  tagName: string;
  props: T;
}

interface Props {
  [key: string]: any;
}

// Основной класс Block, используемый для создания компонентов
class Block<T extends Props = {}> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  private _element: HTMLElement | null = null;
  private _meta: BlockMeta<T> | null = null;
  private eventBus: () => EventBus;
  public props: T;

  constructor(tagName: string = "div", props: T = {} as T) {
    const eventBus = new EventBus();
    this._meta = { tagName, props };

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;

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
    if (!this._meta) return;
    this._element = this._createDocumentElement(this._meta.tagName);
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

  // Отрисовка компонента
  private _render(): void {
    if (!this._element) {
      this._createResources();
    }

    const block = this.render();

    if (!this._element) return;

    this._element.innerHTML = "";
    if (block instanceof Node) {
      this._element.appendChild(block);
    } else {
      console.error("Render method must return a DOM node.");
    }
  }

  // Метод, который должен быть переопределён в наследниках
  protected render(): Node {
    const div = document.createElement("div");
    div.textContent = (this.props as any).text; // Используется для простоты
    return div;
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
        target[prop as keyof T] = value;
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  // Создание HTML-элемента
  private _createDocumentElement(tagName: string): HTMLElement {
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
