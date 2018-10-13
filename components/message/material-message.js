import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-message');
/**
  *
  */
  export default class MaterialMessage extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialMessage);
