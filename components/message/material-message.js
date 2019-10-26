import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-message');
/**
  *
  */
  export default class MaterialMessage extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialCheckbox} @this
    */
    mount(node) {
      this;
      // super.mount(node, updateAttribute);
      const slot   = node.querySelector('slot:not([name])');
      const markup = node.querySelector('slot[name="markup"]');

      resizeMarkup(slot, markup);
      slot  .addEventListener('slotchange', _ => resizeMarkup(slot, markup));
      markup.addEventListener('slotchange', _ => resizeMarkup(slot, markup));
    }

  /** Является ли узел элементом {MaterialMessage} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialMessage
    */
    static is(node) {
      return Material.is(node, MaterialMessage);
    }
  }

Material.define(component, MaterialMessage);

// #region [Private]
/** */
  function resizeMarkup(slot, markup) {
    // console.log(1, slot);
    setTimeout(() => {
      // const width = getComputedStyle(slot); // .width;
      const width = slot.getBoundingClientRect().width;
      // console.log(width);
      markup.style.width = width + 'px';
    }, 10);
  }
// #endregion
