import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-navigation');
/**
  *
  */
  export default class MaterialNavigation extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** Является ли узел элементом {MaterialNavigation} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialNavigation
    */
    static is(node) {
      return Material.is(node, MaterialNavigation);
    }
  }

Material.define(component, MaterialNavigation);
