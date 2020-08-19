import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-parallax');
/**
  *
  */
  export default class MaterialParallax extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialParallax);
