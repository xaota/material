import Material, {drawRipple, pointerOffset} from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-button');
/** {MaterialButton} Кнопка @class @extends {Material}
  */
  export default class MaterialButton extends Material {
  /** Создание элемента
    */
    constructor() {
      super(component, 'closed');
    }

  /** */
    static get observedAttributes() {
      return ['disabled'];
    }

  /**
    *
    */
    ready(root) {
      const button = root.querySelector('button');
      this.addEventListener('click', event => {
        if (this.disabled) return event.stopImmediatePropagation();
        const position = pointerOffset(button, event);
        drawRipple.call(button, position);
      });
    }

  /** Является ли узел элементом {MaterialButton} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialButton
    */
    static is(node) {
      return Material.is(node, MaterialButton);
    }
  }

Material.properties(MaterialButton);
Material.define(component, MaterialButton);

// #region [Private]

// #endregion
