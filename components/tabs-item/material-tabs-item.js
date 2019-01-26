import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-tabs-item');
/** */
  export default class MaterialTabsItem extends Material {
  /** */
    constructor() {
      super(component);
    }

  /** */
    get chaption() {
      return this.getAttribute('chaption');
    }
  }

Material.define(component, MaterialTabsItem);

// #region [Private]

// #endregion
