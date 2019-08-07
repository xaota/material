import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-blockquote');
/**
  *
  */
  export default class MaterialSlider extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialSlider);
