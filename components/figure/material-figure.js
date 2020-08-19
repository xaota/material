import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-figure');
/**
  *
  */
  export default class MaterialFigure extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialFigure);
