import Material from '../../script/Material.js';
import Deferred from '../../script/Deferred.js';

import '../caption/material-caption.js';
import MaterialButton from '../button/material-button.js';

const component = Material.meta(import.meta.url, 'material-dialog');
const updateAttribute = {
/** */
  caption(root, value) { Material.updateChildrenText(root, 'material-caption', value) }
};

/** {MaterialDialog} Диалоговое окно @class @extends {Material}
  */
  export default class MaterialDialog extends Material {
  /** Создание элемента
    * @param {string} caption название диалогового окна
    */
    constructor(caption) {
      super(component);
      if (caption !== undefined) this.caption = caption;
      this.settings = {};
      this.cache = {};
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialDialog} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);
      return this;
    }

  /** */
    content(content) {
      this.appendChild(content);
      return this;
    }

  /** */
    action(label, callback) {
      const button = new MaterialButton({label, mode: 'primary', text: ''});
      button.addEventListener('click', callback.bind(this), false);
      button.slot = 'action';
      this.appendChild(button);
      return this;
    }

  /** */
    open(callback, z = 100, root = document.body) {
      this.cache.root = root;
      this.cache.z = z;

      this.promise = new Deferred();

      this.splash = document.createElement('div'); // #material-popup-splash
      const style = {
        display: 'flex',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: z,
        backgroundColor: 'rgba(0,0,0, 0.5)'
        // backdropFilter: blur(2px)
      };

      Object.keys(style).forEach(key => this.splash.style[key] = style[key]);

      // this.style.width = '400px';
      this.classList.add('animated');
      root.appendChild(this.splash);
      this.splash.appendChild(this);

      if (this.settings.scroll === false) {
        this.cache.scroll = getComputedStyle(root).overflow;
        root.style.overflow = 'hidden';
      }

      const init = () => callback.call(this, this.shadowRoot);
      if (callback) this.addEventListener('transitionend', _ => setTimeout(init, 50), {once: true});
      return this.promise;
    }

  /** */
    close() {
      let restore = false;

      const restoreRootView = () => {
        if (restore) return;
        if (this.splash) this.splash.remove();
        if (this.settings.scroll === false) this.cache.root.style.overflow = this.cache.scroll;
        this.remove();
        restore = true;
      }

      this.addEventListener('transitionend', restoreRootView);
      setTimeout(restoreRootView, 500);

      this.style.opacity = 0;
      this.style.transform = 'translateY(0)';
    }

  /** */
    options(options) {
      Object.assign(this.settings, options);
      return this;
    }

  /** */
    resolve(data, close) {
      if (this.promise) this.promise.resolve(data);
      if (close) this.close();
      return this;
    }

  /** */
    reject(data, close) {
      if (this.promise) this.promise.reject(data);
      if (close) this.close();
      return this;
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

  /** Является ли узел элементом {MaterialDialog} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialDialog
    */
    static is(node) {
      return Material.is(node, MaterialDialog);
    }

  /** */
    static resolve(data, close = false) {
    /** */
      return function() {
        this.resolve(data, close);
      }
    }

  /** */
    static reject(data, close = false) {
      /** */
      return function() {
        this.reject(data, close);
      }
    }
  }

Material.attributes(MaterialDialog, 'caption');
Material.define(component, MaterialDialog);
