import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-input-slider');
const updateAttribute = {
  /** */
    value(root, value) { Material.updateChildrenAttribute(root,   'input[type="range"]', 'value',    value) },
  /** */
    min(root, value) { Material.updateChildrenAttribute(root,   'input[type="range"]', 'min',    value) },
  /** */
    max(root, value) { Material.updateChildrenAttribute(root,   'input[type="range"]', 'max',    value) },
  /** */
    step(root, value) { Material.updateChildrenAttribute(root,   'input[type="range"]', 'step',    value) },
  /** */
    disabled(root, value) { Material.updateChildrenProperty(root, 'input[type="range"]', 'disabled', value) }
};

/** Ползунок @class MaterialInputSlider @extends {Material}
  */
  export default class MaterialInputSlider extends Material {
  /** Создание компонента {MaterialInputSlider} @constructor
    * @param {string} label название поля
    */
    constructor(label) {
      super(component, 'closed');
      if (label) this.innerHTML = label;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} root ShadowRoot узел элемента
    * @return {MaterialInputSlider} @this
    */
    mount(root) {
      Object
        .keys(updateAttribute)
        .forEach(attribute => updateAttribute[attribute](root, this[attribute]));
      const input = root.querySelector('input[type="range"]');
      input.addEventListener('input', _ => setValue.call(this, input.value));

      setValue.call(this, this.value);
      return this;
    }

  /** Отслеживаемые атрибуты / observedAttributes @readonly @static
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
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


  /** Является ли узел элементом {MaterialInputSlider} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialInputSlider
    */
    static is(node) {
      return Material.is(node, MaterialInputSlider);
    }
  }


Material.attributes(MaterialInputSlider, 'value', 'max', 'min', 'step');
Material.properties(MaterialInputSlider, 'disabled');
Material.define(component, MaterialInputSlider);

// #region [Private]
/** */
  function setValue(data) {
    const value = data || this.min || 0;
    this.value = value;
    visualise.call(this, this.value || this.min || 0, this.max || 100, this.min || 100);
  }

/** */
  function visualise(value = 0, max = 100, min = 0) {
    const percent = parseFloat(value) / (parseFloat(max) - parseFloat(min)) * 100;
    Material.cssVariable(this, 'value', percent + '%');
  }
// #endregion
