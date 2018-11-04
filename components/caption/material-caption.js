import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-caption');
/**
  *
  */
  export default class MaterialCaption extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** Является ли узел элементом {MaterialCaption} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialCaption
    */
    static is(node) {
      return Material.is(node, MaterialCaption);
    }
  }

Material.define(component, MaterialCaption);
