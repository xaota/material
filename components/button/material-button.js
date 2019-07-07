import Material, {drawRipple, pointerOffset} from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-button');

/** {MaterialButton} Кнопка @class @extends {Material}
  */
  export default class MaterialButton extends Material {
  /** Создание элемента {MaterialButton} @constructor
    * @param {object|string} content? название кнопки
    */
    constructor(content) {
      super(component);
      if (content === undefined) return;
      if (typeof content !== 'object') content = {label: content};
      if ('label' in content) this.innerHTML = content.label;
      if ('mode'  in content) this.mode = content.mode;
      if ('text'  in content) this.text = content.text;
    }

  /**
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return ['disabled', 'mode', 'text']; // Object.keys(updateAttribute);
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
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialButton
    */
    static is(node) {
      return Material.is(node, MaterialButton);
    }
  }

Material.attributes(MaterialButton, 'mode', 'text');
Material.properties(MaterialButton, 'disabled');
Material.define(component, MaterialButton);

// #region [Private]

// #endregion
