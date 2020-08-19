import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-checkbox');
const updateAttribute = {
/** */
  checked(root, value) {
    Material.updateChildrenProperty(root, '#checkbox', 'checked', [true, ''].includes(value))
  },

/** */
  disabled(root, value) {
    Material.updateChildrenElement(root, '#checkbox', 'disabled', [true, ''].includes(value));
  }
};

/** Поле выбора флажком @class MaterialCheckbox @extends {Material}
  */
  export default class MaterialCheckbox extends Material {
  /** Создание элемента {MaterialCheckbox}
    * @param {string} label название поля
    */
    constructor(label) {
      super(component);
      if (label) this.innerHTML = label;
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return [...Object.keys(updateAttribute), 'right', 'disabled'];
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialCheckbox} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);
      const checkbox = node.querySelector('#checkbox');
      checkbox.addEventListener('change', _ => {
        this.checked = checkbox.checked;
        this.event('change');
      });
      // node.addEventListener('click', _ => checkbox.dispatchEvent(new MouseEvent('click'))); // .checked = !.checked
      return this;
    }

  /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous && name in updateAttribute) updateAttribute[name].call(this, root, current);
    }

  /** Является ли узел элементом {MaterialCheckbox} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialCheckbox
    */
    static is(node) {
      return Material.is(node, MaterialCheckbox);
    }
  }

// Material.attributes(MaterialCheckbox, 'value');
Material.properties(MaterialCheckbox, 'checked', 'right', 'disabled');
Material.define(component, MaterialCheckbox);

// #region [Private]

// #endregion
