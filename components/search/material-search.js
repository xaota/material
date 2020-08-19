import Material      from '../../script/Material.js'
import MaterialInput from '../input/material-input.js';

const component = Material.meta(import.meta.url, 'material-search');

const updateAttribute = {
/** */
        value(root, value) { Material.updateChildrenAttribute(root, 'material-input', 'value', value) },
/** */
     disabled(root, value) { Material.updateChildrenAttribute(root, 'material-input', 'disabled', value) },
/** */
         fold(root, value) { Material.updateChildrenAttribute(root, 'material-input', 'fold', value) },
/** */
        right(root, value) { Material.updateChildrenAttribute(root, 'material-input', 'right', value) },
/** */
  placeholder(root, value) { Material.updateChildrenAttribute(root, 'material-input', 'placeholder', value) }
};

/** {MaterialSearch} Поле - поисковая строка @class @extends {Material}
  */
  export default class MaterialSearch extends Material {
  /** Создание элемента
    * @param {string} label название поля на форме
    */
    constructor(label) {
      super(component);
      if (label) this.innerHTML = label;
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialSearch} @this
    */
    mount(node) {
      const input = node.querySelector('material-input');
      super.mount(node, updateAttribute);
      input.addEventListener('input', _ => this.value = input.value);
      return this;
    }

  /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous && name in updateAttribute) updateAttribute[name](root, current);
      // if (name === 'value' && current !== previous) Material.updateChildrenAttribute(root, 'material-input', 'value', current);
    }

  /** Является ли узел элементом {MaterialSearch} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialSearch
    */
    static is(node) {
      return Material.is(node, MaterialSearch);
    }
  }

Material.attributes(MaterialSearch, 'value', 'placeholder');
Material.properties(MaterialSearch, 'disabled', 'fold', 'right');
Material.define(component, MaterialSearch);

// #region [Private]

// #endregion
