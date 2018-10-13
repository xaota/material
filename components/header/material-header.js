import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-header');
/**
  *
  */
  export default class MaterialHeader extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialHeader);
