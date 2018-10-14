import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-avatar');
/**
  *
  */
  export default class MaterialAvatar extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialAvatar);
