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
    ready(template) {
      this;
      return template;
    }

  /** */
    render(template) {
      this.shadowRoot.appendChild(template);
      return this;
    }

  /** */
    mount(root) {
      return this;
    }

  /** Отправка событий во внешний DOM @event / event
    * @param {string} event Название события
    * @param {any} detail Передаваемые параметры
    * @return {CustomEvent} Распространяемое событие
    */
    event(event, detail = null) {
      const options = {bubbles: true, composed: true};
      event = detail !== null || event.includes('-')
        ? new CustomEvent(event, {detail, ...options})
        : new Event(event);
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
    }

  /** */
    // disconnectedCallback() {
      // if (!this.ownerDocument.defaultView) return; // !
      // const root = this.shadowRoot;
      // while (root.firstChild) root.removeChild(root.firstChild);
    // }

  /** @subsection @static */
  /** */
    static is(node, constructor) {
      if (!isString(constructor)) return node instanceof constructor;
      // !
      const tag = node && node.nodeName && node.nodeName.toLowerCase();
      return tag === constructor.toLowerCase();
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
      const attributes = constructor.observedAttributes;
      if (list.length === 0 && attributes) list = attributes;
      list.forEach(attribute => setAttribute(constructor.prototype, attribute));
    }

  /** */
    static properties(constructor, ...list) {
      const attributes = constructor.observedAttributes;
      if (list.length === 0 && attributes) list = attributes;
      list.forEach(property => setProperty(constructor.prototype, property));
    }

  /** */
    static updateChildrenAttribute(root, selector, attribute, value) {
      const children = root.querySelector(selector);
      if (!children) return;
      value === null || value === false
        ? children.removeAttribute(attribute)
        : children.setAttribute(attribute, value);
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
    static cssVariable(element, name, value) {
      if (name.charAt(0) !== '-') name = '--' + name;
      if (value) element.style.setProperty(name, value);
      return getComputedStyle(element).getPropertyValue(name);
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

  /** @subsection @common */
  /** */
    function isString(val) { // @lodash
      const string    = typeof val === 'string';
      const object    = typeof val === 'object';
      const boolean   = Boolean(val);
      const prototype = Object.prototype.toString.call(val);
      return string || ((boolean && object) && prototype === '[object String]');
    }
// #endregion
