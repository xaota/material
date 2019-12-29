import Template from './Template.js';

/**
  *
  */
  export default class Component extends HTMLElement {
  /** */
    constructor(component, mode = 'open') {
      super();
      this.attachShadow({mode});
      this.component = component;
    }

  /** */
    #store = {};

  /** */
    store(...data) {
      Object.assign(this.#store, ...data);
      return this.#store;
    }

  /** Создание элемента в DOM (DOM не доступен) / ready @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {Component} @this
    */
    ready(node) {
      return this;
    }

  /** */
    render(template) {
      this.shadowRoot.appendChild(template);
      return this;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @param {object} attributes функции, вызываемые при изменении отслеживаемых атрибутов
    * @return {Component} @this
    */
    mount(node, attributes = {}) {
      Object
        .keys(attributes)
        .forEach(attribute => attributes[attribute].call(this, node, this[attribute]));
      return this;
    }

  /** */
    unmount() {
      return this;
    }

  /** Отправка событий во внешний DOM @event / event
    * @param {string} event Название события
    * @param {any} detail Передаваемые параметры
    * @return {CustomEvent} Распространяемое событие
    */
    event(event, detail = null) {
      const options = {bubbles: true, composed: true};
      event = detail !== null || (!event.type && event.includes('-'))
        ? new CustomEvent(event, {detail, ...options})
        : typeof event === 'object' ? event : new Event(event);
      return this.dispatchEvent(event);
    }

  /** */
    async connectedCallback() {
      if (!this.ownerDocument.defaultView) return; // !
      if (this.shadowRoot.firstChild) return; // ! loaded @TODO:

      const template = await Template(this.component);
      this.ready(template);
      this.render(template);
      this.mount(this.shadowRoot);
      this.mounted = true;
      this.event('load');
    }

  /** */
    disconnectedCallback() {
      this.unmount();
      // this.mounted = false;
      this.event('unload');
      // if (!this.ownerDocument.defaultView) return; // !
      // const root = this.shadowRoot;
      // while (root.firstChild) root.removeChild(root.firstChild);
    }

  /** @subsection @static */
  /** Является ли узел элементом определенного класса / is @static
    * @param {any} component проверяемый элемент
    * @param {...Function} constructors список конструкторов для проверки
    * @return {boolean} true, если элемент является одним из элементов списка constructors
    */
    static is(component, ...constructors) {
      // if (!isString(constructor)) return node instanceof constructor;
      // // !
      // const tag = node && node.nodeName && node.nodeName.toLowerCase();
      // return tag === constructor.toLowerCase();

      if (typeof component !== 'object') component = document.createElement(component);
      const is = constructor => constructor
        ? component instanceof constructor
        : Object.getPrototypeOf(component.constructor) !== HTMLElement && component.constructor !== HTMLElement;

        return constructors.some(is);
    }

  /** */
    static define({name}, constructor, options = undefined) {
      const registry = window.customElements;
      if (registry.get(name) !== undefined) return;
      registry.define(name, constructor, options);
    }

  /** */
    static meta(base, name, href = './index.html') {
      return {name, href, base};
    }

  /** */
    static attributes(constructor, ...list) {
      const attributes = constructor.observedAttributes || [];
      if (list.length === 0 && attributes) list = attributes;
      list.forEach(attribute => setAttribute(constructor.prototype, attribute));
    }

  /** */
    static properties(constructor, ...list) {
      const attributes = constructor.observedAttributes || [];
      if (list.length === 0 && attributes) list = attributes;
      list.forEach(property => setProperty(constructor.prototype, property));
    }


  /** */
    static updateChildrenElement(root, selector, attribute, value) {
      const children = root.querySelector(selector);
      if (!children) return;
      children[attribute] = value || '';
    }

  /** */
    static updateChildrenAttribute(root, selector, attribute, value) {
      const children = root.querySelector(selector);
      if (!children) return;
      const remove = value === null || value === false;
      remove
        ? children.removeAttribute(attribute)
        : children.setAttribute(attribute, value);
      if (children[attribute] && !remove) children[attribute] = value;
    }

  /** */
    static updateChildrenProperty(root, selector, property, value = false) {
      const children = root.querySelector(selector);
      if (!children) return;
      value
        ? children.setAttribute(property, '')
        : children.removeAttribute(property)
    }

  /** */
    static updateChildrenHTML(root, selector, value = '') {
      const children = root.querySelector(selector);
      if (!children) return;
      children.innerHTML = value;
    }

  /** */
    static updateChildrenText(root, selector, value = '') {
      const children = root.querySelector(selector);
      if (!children) return;
      children.innerText = value;
    }

  /** */
    static updateChildrenClass(root, selector, value = {}) {
      const children = root.querySelector(selector);
      if (!children) return;
      Object.keys(value).forEach(c => children.classList[value[c] ? 'add' : 'remove'](c));
    }

  /** */
    static cssVariable(element, name, value) {
      if (name.charAt(0) !== '-') name = '--' + name;
      if (value) element.style.setProperty(name, value);
      return getComputedStyle(element).getPropertyValue(name);
    }

  /** / defined */
    static defined(components = []) {
      return Promise.all(components.map(e => customElements.whenDefined(e)));
    }

  /** */
    static exist(component) {
      return Boolean(customElements.get(component));
    }

  /** */
    static custom(root) {
      return [...root.querySelectorAll('*')]
        .map(e => e.nodeName.toLowerCase())
        .filter((e, i, l) => l.indexOf(e) === i)
        .filter(e => Component.is(e));
    }

  /** */
    static items(root) {
      return [root, ...root.querySelectorAll('*')]
        .filter(e => Component.is(e));
    }

  /** */
    static onload(root = document.body, deep = true) {
      const elements = Component.items(root);
      return Promise
        .all(elements.map(e => mounted(e, deep)))
        .then(loaded => loaded.flat(Infinity));
    }
  }

// #region [Private]
/** */
  function setAttribute(prototype, attribute) {
    Object.defineProperty(prototype, attribute, {
      /** */
      get() {
        return this.getAttribute(attribute);
      },
      /** */
      set(value) {
        value === null
          ? this.removeAttribute(attribute)
          : this.setAttribute(attribute, value);
      }
    });
  }

/** */
  function setProperty(prototype, property) {
    Object.defineProperty(prototype, property, {
      /** */
      get() {
        return this.hasAttribute(property);
      },
      /** */
      set(value) {
        value === false
          ? this.removeAttribute(property)
          : this.setAttribute(property, '');
      }
    });
  }

/** */
  function mounted(element, deep, timeout = 5000) {
    return new Promise(async (resolve, reject) => {
      if (element.mounted === true) return resolve(element);
      if (element.nodeType !== 11) { // document-fragment
        element.addEventListener('load', async () => await loaded(element, resolve, deep));
      } else {
        await Promise.all([...element.children].map(Component.items).flat(Infinity).map(e => Component.onload(e, deep)));
        resolve(element);
      }
    });
  }

/** */
  async function loaded(element, resolve, deep) {
    // element.addEventListener('load', async _ => {
      const result = [];

      if (deep) {
        const items = await Component.onload(element.shadowRoot);
        items.forEach(c => result.push(c));
      }

      result.push(element);
      resolve(result);
    // });
    // setTimeout(() => reject(element), timeout);
  }
// #endregion
