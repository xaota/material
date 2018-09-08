import Material from '../../script/Material.js'
const element = 'material-header';

/**
  *
  */
  class MaterialHeader extends Material {
  /**
    *
    */
    constructor() {
      super(element);
    }

  /**
    *
    */
    init() {
      const root = this.content.querySelector('div.root');
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

customElements.define(element, MaterialHeader);

// #region [Private]

// #endregion
