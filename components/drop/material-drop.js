import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-drop');
/**
  *
  */
  export default class MaterialDrop extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** */
    mount(node) {
      /* transition: var(--duration) ease transform; */
      this.style.transition = 'var(--duration) ease transform';
    }

  /** Является ли узел элементом {MaterialDrop} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialDrop
    */
    static is(node) {
      return Material.is(node, MaterialDrop);
    }

  /** */
    get visible() {
      return this.hasAttribute("visible");
    }

  /** */
    set visible(value = false) {
      value
        ? this.setAttribute("visible", "")
        : this.removeAttribute("visible");
    }
  }

Material.define(component, MaterialDrop);

// #region [Private]

// #endregion
