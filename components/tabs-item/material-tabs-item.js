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
  }

Material.define(component, MaterialTabsItem);

// #region [Private]

// #endregion
