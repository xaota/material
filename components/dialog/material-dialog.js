import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-dialog');
/**
  *
  */
  export default class MaterialDialog extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialDialog);
