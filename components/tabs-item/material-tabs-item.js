import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-tabs-item');
/** */
  export default class MaterialTabsItem extends Material {
  /** */
    constructor() {
      super(component);
    }

  /** */
    get name() {
      return this.getAttribute('name');
    }

  /** */
    get caption() {
      return this.getAttribute('caption');
    }

  /** Является ли узел элементом {MaterialTabsItem} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialTabsItem
    */
    static is(node) {
      return Material.is(node, MaterialTabsItem);
    }
  }

Material.define(component, MaterialTabsItem);

// #region [Private]

// #endregion
