import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-checkbox');
/** */
  export default class MaterialCheckbox extends Material {
  /** */
    constructor() {
      super(component);
    }
  }
Material.define(component, MaterialCheckbox);

// #region [Private]

// #endregion
