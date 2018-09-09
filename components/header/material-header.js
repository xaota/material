import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-header');
/**
  *
  */
  export default class MaterialHeader extends Material {
  /**
    *
    */
    constructor() {
      // super(element);
      super(component);
    }

  /**
    *
    */
    ready(content) {
      const root = content.querySelector('div.root');
      root.querySelector('header > p.caption')    .innerText = this.caption;
      root.querySelector('header > p.description').innerText = this.description;
    }

  /** */
    get caption() {
      return this.getAttribute("caption");
    }

  /** */
    set caption(value = undefined) {
      value !== undefined
        ? this.setAttribute("caption", value)
        : this.removeAttribute("caption");
    }

  /** */
    get description() {
      return this.getAttribute("description");
    }

  /** */
    set description(value = undefined) {
      value !== undefined
        ? this.setAttribute("description", value)
        : this.removeAttribute("description");
    }
  }

Material.define(component, MaterialHeader);

// #region [Private]

// #endregion
