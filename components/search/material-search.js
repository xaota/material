import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-search');
/**
  *
  */
  export default class MaterialSearch extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialSearch);
