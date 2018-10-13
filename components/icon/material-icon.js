import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-icon');
/**
  *
  */
  export default class MaterialIcon extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialIcon);
