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
    mount(content) {
      return this;
    }

  /** */
    get disabled() {
      return this.hasAttribute('disabled');
    }

  /** */
    set disabled(value) {
      value
        ? this.setAttribute('disabled', '')
        : this.removeAttribute('disabled');
    }

  /** Отправка событий во внешний DOM
    * @param {string} event Название события
    * @param {any} detail Передаваемые параметры
    * @return {CustomEvent} Распространяемое событие
    */
    event(event, detail = null) {
      const options = {bubbles: true, composed: true};
      event = event.includes('-')
        ? new CustomEvent(event, {detail, ...options})
        : new Event(event);
      return this.dispatchEvent(event);
    }

  /** */
    async connectedCallback() {
      if (!this.ownerDocument.defaultView) return; // !
      const template = await Template(this.component);
      this.ready(template);
      this.render(template);
      this.mount(this.shadowRoot);
    }

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
  }

/** */
  function isString(val) { // lodash
    const string    = typeof val === 'string';
    const object    = typeof val === 'object';
    const boolean   = Boolean(val);
    const prototype = Object.prototype.toString.call(val);
    return string || ((boolean && object) && prototype === '[object String]');
  }
