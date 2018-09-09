import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-list');
/**
  *
  */
  export default class MaterialList extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialList);
