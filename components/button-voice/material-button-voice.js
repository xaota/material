import Material           from '../../script/Material.js';
import MaterialButtonIcon from '../button-icon/material-button-icon.js';

const toggle      = Symbol('toggle');
const start       = Symbol('start');
const stop        = Symbol('stop');
const result      = Symbol('result');
const recognition = Symbol('recognition');

const component = Material.meta(import.meta.url, 'material-button-voice');
const updateAttribute = {
/** */
  active(root, value) {
    value = [true, ''].includes(value) ? null : 'outline';
    Material.updateChildrenAttribute(root, 'material-button-icon', 'text', value);
  },

/** */
  mode(root, value) { Material.updateChildrenAttribute(root, 'material-button-icon', 'mode', value) },

/** */
  disabled(root, value) {
    const disabled = [true, ''].includes(value);
    const icon = disabled ? 'mic_off' : 'keyboard_voice';
    Material.updateChildrenHTML(root, 'material-button-icon', icon);
    Material.updateChildrenProperty(root, 'material-button-icon', 'disabled', disabled);
  }
};

/** {MaterialButtonVoice} Кнопка для голосового ввода @class @extends {Material}
  */
  export default class MaterialButtonVoice extends Material {
  /** Создание элемента
    */
    constructor() {
      super(component, 'close');
    }

  /** */
    [recognition] = null;

  /** */
    [toggle] = () => {
      this.active
        ? this[stop]()
        : this[start]();
    }

  /** */
    [start] = () => {
      // eslint-disable-next-line no-undef
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onstart = () => {};
      recognition.onerror = e => { console.error(e); this[stop](); };
      recognition.onend = () => {};
      recognition.onresult = this[result];
      recognition.lang = 'ru-RU';
      recognition.start();

      this[recognition] = recognition;
      this.active = true;
    }

  /** */
    [stop] = () => {
      if (this[recognition]) this[recognition].stop();
      this[recognition] = null;
      this.active = false;
    }

  /** */
    [result] = event => {
      if (!event.results === undefined) return this[stop]();

      let text;
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          text = event.results[i][0].transcript;
          this[stop]();
          break;
        } else {
          text = [...event.results].map(e => e[0].transcript).join(' ');
        }
      }
      this.event('recognize', {text});
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return [...Object.keys(updateAttribute)];
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialButtonVoice} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);
      const button = node.querySelector('material-button-icon');

      button.addEventListener('click', _ => {
        this[toggle]();
        // this.event('change');
      });

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

  /** Является ли узел элементом {MaterialButtonVoice} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof {MaterialButtonVoice}
    */
    static is(node) {
      return Material.is(node, MaterialButtonVoice);
    }
  }

Material.properties(MaterialButtonVoice, 'disabled', 'active');
Material.define(component, MaterialButtonVoice);

// #region [Private]

// #endregion
