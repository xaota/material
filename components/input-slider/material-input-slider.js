import Material, {pointerOffset} from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-input-slider');
/** @class MaterialInputSlider @extends {Material}
  */
  export default class MaterialInputSlider extends Material {
  /**
    *
    */
    constructor() {
      super(component, 'closed');
    }

  /**
    *
    */
    ready(content) {

    }

  /** */
    mount(content) {

    }

  /** */
    static get observedAttributes() {
      return ['value'];
    }

  /** */
    attributeChangedCallback(attribute, previous, current) {

    }


  /** Является ли узел элементом {MaterialInputSlider} / is @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialInputSlider
    */
    static is(node) {
      return Material.is(node, MaterialInputSlider);
    }
  }

Material.define(component, MaterialInputSlider);
