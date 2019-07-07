import Material from '../../script/Material.js'

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

  /** Является ли узел элементом {MaterialMessage} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialMessage
    */
    static is(node) {
      return Material.is(node, MaterialMessage);
    }
  }

Material.define(component, MaterialMessage);
