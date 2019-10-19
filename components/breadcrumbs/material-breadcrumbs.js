import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-breadcrumbs');
/**
  *
  */
  export default class MaterialBreadcrumbs extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialBreadcrumbs);
