import Material from '../../script/Material.js'
const element = 'material-drop';

/**
  *
  */
  export default class MaterialDrop extends Material {
  /**
    *
    */
    constructor() {
      super(element);
    }

  /** Является ли узел элементом {MaterialDrop} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialDrop
    */
    static is(node) {
      return Material.is(node, element);
    }

  /**
    *
    */
    init() {
      const content = this.content;
    }

  /** */
    // mount() {
    //   const shadow = this.shadow;
    //   shadow.addEventListener('click', () => {
    //     console.log('click');
    //     this.visible = false;

    //   });
    // }

  /** */
    get visible() {
      return this.hasAttribute("visible");
    }

  /** */
    set visible(value = false) {
      value
        ? this.setAttribute("visible", "")
        : this.removeAttribute("visible");
    }
  }

customElements.define(element, MaterialDrop);

// #region [Private]

// #endregion
