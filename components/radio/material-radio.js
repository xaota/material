import Material from '../../script/Material.js'
const component = Material.meta(import.meta.url, 'material-radio');

/** */
  export default class MaterialRadio extends Material {
  /** */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialRadio);

// #region [Private]

// #endregion
