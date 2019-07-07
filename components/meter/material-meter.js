import Material from '../../script/Material.js'

const colors = ['lime', 'aqua', 'blue', 'magenta'];
const speed = 1400;

const component = Material.meta(import.meta.url, 'material-meter');
const updateAttribute = {
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
        .forEach(attribute => updateAttribute[attribute](root, this[attribute]));

      let increase = true;
      const value = Number(this.getAttribute('value'));
      // console.log('value', value);
      let current = 0;
      // duration
      Material.cssVariable(this, 'color', colors.join(','));

      // var start = performance.now();
      var previous;
      const frame = callback.bind(this);
      let animation = window.requestAnimationFrame(frame);
      root.addEventListener('click', () => {
        console.log('click remove', this);
        window.cancelAnimationFrame(animation);
        this.remove();
      });

      /** */
      function callback(timestamp) {
        if (!previous) previous = timestamp;
        const delay = timestamp - previous;
        previous = timestamp;

        const increment = delay * 100 / speed;

        if (increase && current === value || !increase && current === 0) {
          increase = !increase;
          if (increase) Material.cssVariable(this, 'color', colors.reverse().join(','));
        }
        current += increase ? increment : -increment / 2;
        if (current < 0) current = 0;
        if (current > value) current = value;
        // console.log(delay, current, increment);
        Material.cssVariable(this, 'fill', current + '%');

        animation = window.requestAnimationFrame(frame);
      }
    }

  /** */
    unmount() {
      console.log('unmount', this);
    }

  /** */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }


  /** Является ли узел элементом {MaterialMeter} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialMeter
    */
    static is(node) {
      return Material.is(node, MaterialMeter);
    }
  }

// Material.attributes(MaterialMeter, 'min', 'max', 'value', 'mode', 'color', 'background', 'size', 'angle', 'low', 'high', 'optium', 'stroke', 'speed');
// Material.properties(MaterialMeter, 'disabled', 'linear', 'fill', 'reverse');
Material.define(component, MaterialMeter);
