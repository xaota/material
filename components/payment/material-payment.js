import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-payment');
/**
  *
  */
  export default class MaterialPayment extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialPayment);
