import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-loader');
/**
  *
  */
  export default class MaterialLoader extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialLoader);
