import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-grid');
/**
  *
  */
  export default class MaterialGrid extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialGrid);
