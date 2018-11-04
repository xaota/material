import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-banner');
/**
  *
  */
  export default class MaterialBanner extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialBanner);
