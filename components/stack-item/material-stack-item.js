import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-stack-item');
/** */
  export default class MaterialStackItem extends Material {
  /** */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialStackItem);

// #region [Private]

// #endregion
