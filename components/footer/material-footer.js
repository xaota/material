import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-footer');
/**
  *
  */
  export default class MaterialFooter extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialFooter);
