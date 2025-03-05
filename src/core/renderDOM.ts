import Block from "./Block";

export default function renderDOM(Block: Block) {
  const root = document.querySelector("#app");

  if (!root) {
    throw new Error("Root element #app not found");
  }

  const content = Block.getContent();
  if (!content) {
    throw new Error("Block content is null");
  }

  root.innerHTML = "";
  root.appendChild(content);
}

export function render(query: string, block: { getContent: () => HTMLElement | null; dispatchComponentDidMount: () => void; }) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`Root element ${query} not found`);
  }

  const content = block.getContent();
  if (!content) {
    throw new Error("Block content is null");
  }

  root.innerHTML = "";
  root.appendChild(content);

  block.dispatchComponentDidMount();

  return root;
}
