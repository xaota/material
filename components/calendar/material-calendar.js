import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-calendar');
/**
  *
  */
  export default class MaterialCalendar extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }
  }

Material.define(component, MaterialCalendar);
