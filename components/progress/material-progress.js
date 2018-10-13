import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-progress');
/**
  *
  */
  export default class MaterialProgress extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialProgress);
