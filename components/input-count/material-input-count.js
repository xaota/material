
import Material           from '../../script/Material.js';
import MaterialButtonIcon from '../button-icon/material-button-icon.js';
import MaterialInput      from '../input/material-input.js';

const updateAttribute = {
/** */
  value(root, value, previous) {
    value = parseFloat(value);
    if (isNaN(value)) value = 0; // !
    const max = this.max ||  Infinity;
    const min = this.min || -Infinity;
    if (value > max) value = max;
    if (value < min) value = min;
    previous = parseFloat(previous) || 0;
    if (value === previous) return;
    Material.updateChildrenAttribute(root, 'material-input', 'value', value.toString());
    this.value = value;
  },

/** */
  disabled(root, value) {
    Material.updateChildrenProperty(root, 'material-input', 'disabled', value);
    Material.updateChildrenProperty(root, '#remove', 'disabled', value);
    Material.updateChildrenProperty(root, '#append', 'disabled', value);
  },

/** */
  text(root, value) {
    Material.updateChildrenAttribute(root, '#append', 'text', value);
    Material.updateChildrenAttribute(root, '#remove', 'text', value);
  },

/** */
  mode(root, value) {
    Material.updateChildrenAttribute(root, '#append', 'mode', value);
    Material.updateChildrenAttribute(root, '#remove', 'mode', value);
  },

/** */
  placeholder(root, value) { Material.updateChildrenAttribute(root, 'material-input', 'placeholder', value) }
};

const component = Material.meta(import.meta.url, 'material-input-count');
/** Поле для ввода количества @class MaterialInputCount @extends {Material}
  */
  export default class MaterialInputCount extends Material {
  /** Создание компонента {MaterialInputCount} @constructor
    * @param {string|object} options название поля ввода либо настройки компонента {label, max, min, step, value}
    */
    constructor(options) {
      super(component);

      if (!options) return;
      if (typeof options !== 'object') options = {label: options};

      if (options.label) this.innerHTML = options.label;
      ['max', 'min', 'step', 'value'].forEach(e => { if (options[e]) this[e] = options[e] });
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} root ShadowRoot узел элемента
    * @return {MaterialKeyboardLine} @this
    */
    mount(root) {
      super.mount(root, updateAttribute);

      const append = root.querySelector('#append');
      const remove = root.querySelector('#remove');
      const input  = root.querySelector('material-input');

      append.addEventListener('click', _ => this.value = (parseFloat(this.value) || 0) + (parseFloat(this.step) || 1));
      remove.addEventListener('click', _ => this.value = (parseFloat(this.value) || 0) - (parseFloat(this.step) || 1));
      input.addEventListener('input', _ => this.value = input.value);

      return this;
    }

  /** Отслеживаемые атрибуты / observedAttributes @readonly @static
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return ['min', 'max', 'step', ...Object.keys(updateAttribute)];
    }

  /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous && name in updateAttribute) {
        updateAttribute[name].call(this, root, current, previous);
      }
    }

  /** Является ли узел элементом {MaterialInputCount} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialInputCount
    */
    static is(node) {
      return Material.is(node, MaterialInputCount);
    }
  }

Material.properties(MaterialInputCount, 'disabled');
Material.attributes(MaterialInputCount, 'value', 'min', 'max', 'step', 'placeholder', 'text', 'mode');
Material.define(component, MaterialInputCount);

