import Block from "./Block";
import Handlebars, { HelperOptions } from "handlebars";

type PropsBlock = Record<string, unknown>;


interface BlockConstructable<P = PropsBlock> {
  new (props: P): Block;
}

export default function registerComponent<Props extends PropsBlock>(
  Component: BlockConstructable<Props>,
) {
  Handlebars.registerHelper(
    Component.name,
    function (
      this: Props,
      { hash: { ref, ...hash }, data, fn }: HelperOptions,
    ) {
      if (!data.root.children) {
        data.root.children = {};
      }

      if (!data.root.refs) {
        data.root.refs = {};
      }

      const { children, refs } = data.root;

      /**
       * Костыль для того, чтобы передавать переменные
       * внутрь блоков вручную подменяя значение
       */
      Object.keys(hash).forEach((key) => {
        const stringKey = String(key); // Явно приводим к строке
        if (this[stringKey] && typeof this[stringKey] === "string") {
          hash[stringKey] = hash[stringKey].replace(
            new RegExp(`{{${stringKey}}}`, "i"),
            this[stringKey],
          );
        }
      });
      

      const component = new Component(hash);

      children[component.id] = component;

      if (ref) {
        refs[ref] = component.getContent();
      }

      const contents = fn ? fn(this) : "";

      return `<div data-id="${component.id}">${contents}</div>`;
    },
  );
}