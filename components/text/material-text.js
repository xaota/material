import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-text');
/**
  *
  */
  export default class MaterialText extends Material {
  /**
    *
    */
    constructor(html) {
      super(component);
      if (html !== undefined) this.innerHTML = html;
    }

  /** Является ли узел элементом {MaterialText} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialText
    */
    static is(node) {
      return Material.is(node, MaterialText);
    }
  }

Material.define(component, MaterialText);
