import Material from '../../script/Material.js';
import '/material/components/icon/material-icon.js';
import '/material/components/tooltip/material-tooltip.js';

const component = Material.meta(import.meta.url, 'material-button-tooltip-icon');

/** {MaterialButtonTooltipIcon} Кнопка с подсказкой @class @extends {Material}
  */
  export default class MaterialButtonTooltipIcon extends Material {
  /** Создание элемента
    */
    constructor() {
      super(component, 'closed');
    }

    mount(content) {
      updateText(content, this.text);
      updateContent(content, this.content);
    }

    static get observedAttributes() {
      return ['text', 'content'];
    }

    attributeChangedCallback(name, previous, current) {
      if (name === 'text') updateText(this.shadowRoot, current);
      if (name === 'content') updateContent(this.shadowRoot, current);
    }

    /** */
      get text() {
        return this.getAttribute("text");
      }

    /** */
      set text(value) {
        value == null
          ? this.removeAttribute("text")
          : this.setAttribute("text", value);
      }

    /** */
    get content() {
      return this.getAttribute("content");
    }

  /** */
    set content(value) {
      value == null
        ? this.removeAttribute("content")
        : this.setAttribute("content", value);
    }
  }

Material.define(component, MaterialButtonTooltipIcon);

// #region [Private]
  function updateText(content, text) {
    const button = content.querySelector('material-button');
    if (!button) return;
    text == null
      ? button.removeAttribute('text')
      : button.setAttribute('text', text);
  }

  function updateContent(root, content) {
    const tooltip = root.querySelector('material-tooltip');
    if (!tooltip) return;
    content == null
      ? tooltip.removeAttribute('content')
      : tooltip.setAttribute('content', content);
  }
// #endregion
