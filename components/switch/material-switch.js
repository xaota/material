import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-switch');
/** */
  export default class MaterialSwitch extends Material {
  /** */
    constructor() {
      super(component, 'closed');
    }
  }

Material.define(component, MaterialSwitch);

// #region [Private]

// #endregion
