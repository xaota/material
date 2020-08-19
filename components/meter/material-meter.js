import Material from '../../script/Material.js';

const colors = ['lime', 'aqua', 'blue', 'magenta'];
const speed = 1400;

const component = Material.meta(import.meta.url, 'material-meter');
const updateAttribute = {
/** */
  value() { this.increase = false }
/** */
  // min(root, value) { Material.updateChildrenAttribute(root, 'material-button-upload',  'text',     value) }
};

/**
  *
  */
  export default class MaterialMeter extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** */
    mount(root) {
      Object
        .keys(updateAttribute)
        .forEach(attribute => {
          updateAttribute[attribute].bind(this, root, this[attribute])
        });

      this.increase = true;
      // console.log('value', value);
      let current = 0;
      // duration
      Material.cssVariable(this, 'color', colors.join(','));

      // var start = performance.now();
      var previous;
      const frame = callback.bind(this);
      this.animation = window.requestAnimationFrame(frame);
      root.addEventListener('click', () => {
        this.value = 20;
      });

      /** */
      function callback(timestamp) {
        if (!previous) previous = timestamp;
        const delay = timestamp - previous;
        previous = timestamp;

        const increment = delay * 100 / speed;

        const value = this.value;
        let increase = this.increase;

        if (increase && current >= value || !increase && current <= 0) {
          increase = !increase;
          if (increase) Material.cssVariable(this, 'color', colors.reverse().join(','));
        }
        this.increase = increase;
        current += increase ? increment : -increment / 2;
        if (current < 0) current = 0;
        // if (current > value) current = value;
        // console.log(delay, current, increment);
        Material.cssVariable(this, 'fill', current + '%');

        this.animation = window.requestAnimationFrame(frame);
      }
    }

  /** */
    unmount() {
      window.cancelAnimationFrame(this.animation);
    }

  /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) {
        updateAttribute[name].call(this, root, current);
      }
    }


  /** Является ли узел элементом {MaterialMeter} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialMeter
    */
    static is(node) {
      return Material.is(node, MaterialMeter);
    }
  }

  Material.attributes(MaterialMeter, 'value');

// Material.attributes(MaterialMeter, 'min', 'max', 'value', 'mode', 'color', 'background', 'size', 'angle', 'low', 'high', 'optium', 'stroke', 'speed');
// Material.properties(MaterialMeter, 'disabled', 'linear', 'fill', 'reverse');
Material.define(component, MaterialMeter);
