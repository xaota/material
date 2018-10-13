import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-panorama');
/**
  *
  */
  export default class MaterialPanorama extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialPanorama);
