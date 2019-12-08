import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-caption');
/**
  *
  */
  export default class MaterialCaption extends Material {
  /**
    *
    */
    constructor(label) {
      super(component);
      if (label) this.innerHTML = label;
    }

  /** Является ли узел элементом {MaterialCaption} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialCaption
    */
    static is(node) {
      return Material.is(node, MaterialCaption);
    }
  }

Material.properties(MaterialCaption, 'small', 'large');
Material.define(component, MaterialCaption);
