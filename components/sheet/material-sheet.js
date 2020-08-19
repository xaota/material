import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-sheet');
/**
  *
  */
  export default class MaterialSheet extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialSheet);
