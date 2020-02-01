import Material     from '../../script/Material.js';
import MaterialText from '../text/material-text.js';
import MaterialIcon from '../icon/material-icon.js';

const component = Material.meta(import.meta.url, 'material-avatar');
const updateAttribute = {
  /** size */
    size(root, value) {
      if (value === null) return;
      this.style.setProperty('--size', value)
    },
  /** src */
    src(root, value) { Material.updateChildrenAttribute(root, 'img', 'src', value) },
  /** icon */
    icon(root, value) { Material.updateChildrenText(root, 'material-icon', value) },
  /** color */
    color(root, value) {
      this.style.backgroundColor = value;
    }
};

/** Компонент отображения аватара пользователя @class MaterialAvatar @extends {Material}
  * Порядок наложения атрибутов: color->+innerText->icon->src
  * letter устанавливается автоматически из переданного innerText
  */
  export default class MaterialAvatar extends Material {
  /** Создание элемента
    * @param {string|object} options название аватара или его опции
    */
    constructor(options) {
      super(component);
      if (!options) return;
      if (!options.text) options = {text: options};
      this.innerText = options.text;
      if (options.src)   this.src   = options.src;
      if (options.icon)  this.icon  = options.icon;
      if (options.size)  this.size  = options.size;
      if (options.color) this.color = options.color;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialAvatar} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);
      const slot = node.querySelector('slot');
      slot.addEventListener('slotchange', _ => {
        const value = letter(this.innerText);
        Material.updateChildrenHTML(node, 'material-text', value);
      });
      return this;
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Обновление отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name     Название атрибута
    * @param {string} previous Предыдущее значение ?null
    * @param {string} current  Устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous && (name in updateAttribute)) {
        updateAttribute[name].call(this, root, current, previous);
      }
    }

  /** Является ли узел элементом {MaterialAvatar} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialAvatar
    */
    static is(node) {
      return Material.is(node, MaterialAvatar);
    }
  }

Material.attributes(MaterialAvatar, ...Object.keys(updateAttribute));
Material.define(component, MaterialAvatar);

// #region [Private]
/** setText */
  function letter(value) {
    return value
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(e => e.charAt(0))
      .join('')
      .toUpperCase();
  }
// #endregion
