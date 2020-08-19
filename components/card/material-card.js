import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-card');
/**
  *
  */
  export default class MaterialCard extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialCard);
