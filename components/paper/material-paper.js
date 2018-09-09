import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-paper');
/**
  *
  */
  export default class MaterialPaper extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialPaper);

// #region [Private]

// #endregion
