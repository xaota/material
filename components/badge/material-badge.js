import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-badge');
/**
  *
  */
  export default class MaterialBadge extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialBadge);
