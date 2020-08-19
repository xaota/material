import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-table');
/**
  *
  */
  export default class MaterialTable extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialTable);
