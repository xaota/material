import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-navigation');
/**
  *
  */
  export default class MaterialNavigation extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialNavigation);
