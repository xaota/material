import Material     from '../../script/Material.js';
import MaterialIcon from '../icon/material-icon.js';

const component = Material.meta(import.meta.url, 'material-chip');
const updateAttribute = {
/** */
  // value(root, value) { Material.updateChildrenAttribute(root, 'material-tooltip', 'content', value) }
/** */
  action(root, value) { Material.updateChildrenHTML(root, 'div.root > button.action > material-icon', value) }
/** */
  //  disabled(root, value) {}
};
/** {MaterialChip} Фишка @class @extends {Material}
  */
  export default class MaterialChip extends Material {
  /** Создание элемента
    * @param {string} html текст на фишке
    * @param {string} action иконка действия
    */
    constructor(html, action) {
      super(component);
      if (html) this.innerHTML = html;
      if (action) this.action = action;
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialChip} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);
      const action = node.querySelector('div.root > button.action');
      action.addEventListener('click', e => swapEvent.call(this, e, 'action', action.querySelector('material-icon').innerHTML));
      return this;
    }

  // /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
  //   * @param {string} name название изменяемого атрибута
  //   * @param {string} previous предыдущее значение ?null
  //   * @param {string} current устанавливаемое значение
  //   */
  //   attributeChangedCallback(name, previous, current) {
  //     const root = this.shadowRoot;
  //     if (current !== previous && name in updateAttribute) updateAttribute[name].call(this, root, current);
  //   }

  /** Является ли узел элементом {MaterialChip} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialChip
    */
    static is(node) {
      return Material.is(node, MaterialChip);
    }
  }

Material.attributes(MaterialChip, 'value', 'action');
// Material.properties(MaterialChip, 'disabled');
Material.define(component, MaterialChip);

// #region [Private]
/** */
  function swapEvent(origin, event, detail) {
    // origin.stopImmediatePropagation();
    origin.preventDefault(); // действие браузера
    origin.stopPropagation();
    // origin.cancelBubble = true;
    return this.event(event, detail);
  }
// #endregion
