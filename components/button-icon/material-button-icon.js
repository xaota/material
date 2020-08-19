import Material       from '../../script/Material.js';
import MaterialButton from '../button/material-button.js';
import MaterialIcon   from '../icon/material-icon.js';

const component = Material.meta(import.meta.url, 'material-button-icon');
const updateAttribute = {
/** */
  text(root, value) { Material.updateChildrenAttribute(root, 'material-button', 'text', value) },
/** */
  mode(root, value) { Material.updateChildrenAttribute(root, 'material-button', 'mode', value) },
/** */
  disabled(root, value) { Material.updateChildrenAttribute(root, 'material-button', 'disabled', value) }
};

/** {MaterialButtonIcon} Кнопка-иконка @class @extends {Material}
  */
  export default class MaterialButtonIcon extends Material {
  /** Создание элемента
    * @param {string} icon название иконки
    */
    constructor(icon) {
      super(component, 'closed');
      if (icon) this.innerText = icon;
    }

  /** */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** */
    mount(root) {
      Object
        .keys(updateAttribute)
        .forEach(attribute => updateAttribute[attribute](root, this[attribute]));
    }

  /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialButtonIcon} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialButtonIcon
    */
    static is(node) {
      return Material.is(node, MaterialButtonIcon);
    }
  }

Material.attributes(MaterialButtonIcon);
Material.define(component, MaterialButtonIcon);
