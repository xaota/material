import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-copyright');
/**
  *
  */
  export default class MaterialCopyright extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialCopyright);
