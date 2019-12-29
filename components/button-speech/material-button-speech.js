import Material       from '../../script/Material.js';
import MaterialButton from '../button/material-button.js';
import MaterialIcon   from '../icon/material-icon.js';

const component = Material.meta(import.meta.url, 'material-button-speech');
const updateAttribute = {
  /** */
    active(root, value) {
      value = [true, ''].includes(value) ? null : 'outline';
      Material.updateChildrenAttribute(root, 'material-button-icon', 'text', value);
    },

  /** */
    disabled(root, value) {
      const disabled = [true, ''].includes(value);
      const icon = disabled ? 'volume_off' : 'volume_up';
      Material.updateChildrenHTML(root, 'material-button-icon', icon);
      Material.updateChildrenProperty(root, 'material-button-icon', 'disabled', disabled);
    }
  };

/** {MaterialButtonSpeech} Кнопка для голосового ввода @class @extends {Material}
  */
  export default class MaterialButtonSpeech extends Material {
  /** Создание элемента
    */
    constructor() {
      super(component, 'close');
    }

  /** */
    #toggle = () => {
      const text = this.value;
      if (!text) return;
      if (!this.active) return this.#start(text);
      // todo: queue
    }

  /** */
    #start = text => {
      // eslint-disable-next-line no-undef
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.lang = 'ru-RU';
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1;
      const voices = window.speechSynthesis.getVoices();
      utterance.voice = voices.filter(voice => voice.default === true)[0]; // + .lang, + .localService
      // mark (ssml)

      utterance.onend = this.#stop;
      window.speechSynthesis.speak(utterance);

      this.active = true;
    }

  /** */
    #stop = () => {
      this.active = false;
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return [...Object.keys(updateAttribute)]; // ? 'value'
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialButtonSpeech} @this
    */
    mount(node) {
      if (!('speechSynthesis' in window)) {
        this.disabled = true;
        return this;
      }

      super.mount(node, updateAttribute);
      const button = node.querySelector('material-button-icon');

      button.addEventListener('click', _ => {
        this.#toggle();
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

  /** Является ли узел элементом {MaterialButtonSpeech} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof {MaterialButtonSpeech}
    */
    static is(node) {
      return Material.is(node, MaterialButtonSpeech);
    }
  }

Material.properties(MaterialButtonSpeech, 'disabled', 'active');
Material.attributes(MaterialButtonSpeech, 'value');
Material.define(component, MaterialButtonSpeech);

// #region [Private]

// #endregion
