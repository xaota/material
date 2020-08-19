import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-panel');
/**
  *
  */
  export default class MaterialPanel extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** Является ли узел элементом {MaterialPanel} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialPanel
    */
    static is(node) {
      return Material.is(node, MaterialPanel);
    }
  }

Material.define(component, MaterialPanel);
