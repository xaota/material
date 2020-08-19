import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-audio');
const updateAttribute = {
/** */
  src(root, value) { Material.updateChildrenAttribute(root, 'audio', 'src', value); } //,
/** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/** Аудио @class
  * @description Элемент для воспроизведения аудиофайлов
  */
  export default class MaterialAudio extends Material {
  /** Создание компонента {MaterialAudio} @constructor
    * @param {string?} src адрес аудиофайла
    */
    constructor(src) {
      super(component);
      if (src) this.src = src;
    }

  /** Отслеживаемые атрибуты / observedAttributes @readonly @static
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialAudio} @this
    */
    mount(node) {
      return super.mount(node, updateAttribute);
    }

  /** Обновление отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name     Название атрибута
    * @param {string} previous Предыдущее значение ?null
    * @param {string} current  Устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialAudio} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialAudio
    */
    static is(node) {
      return Material.is(node, MaterialAudio);
    }
  }

Material.attributes(MaterialAudio, 'src');
// Material.properties(MaterialAudio);
Material.define(component, MaterialAudio);
