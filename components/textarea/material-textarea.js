import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-textarea');
/**
  *
  */
  export default class MaterialTextarea extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialTextarea);
