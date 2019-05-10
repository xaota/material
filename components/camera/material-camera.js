import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-camera');
/**
  *
  */
  export default class MaterialCamera extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** Является ли узел элементом {MaterialCamera} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialCamera
    */
    static is(node) {
      return Material.is(node, MaterialCamera);
    }
  }

Material.define(component, MaterialCamera);
