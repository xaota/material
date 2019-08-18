import Material from '../../script/Material.js';
import MaterialButton from '../button/material-button.js';

const component = Material.meta(import.meta.url, 'material-button-upload');
const types = {buffer, binary, data, text};
const updateAttribute = {
  /** */
      text(root, value) { Material.updateChildrenAttribute(root, 'material-button',  'text',     value) },
  /** */
  disabled(root, value) { Material.updateChildrenProperty(root, 'material-button',  'disabled', value) },
  /** */
    accept(root, value) { Material.updateChildrenAttribute(root, 'input[type="file"]', 'accept', value) },
  /** */
  multiple(root, value) { Material.updateChildrenProperty(root, 'input[type="file"]', 'multiple', value) }
};

/** {MaterialButtonTooltip} Кнопка с подсказкой @class @extends {Material}
  */
  export default class MaterialButtonUpload extends Material {
  /** Создание элемента
    */
    constructor() {
      super(component, 'closed');
    }

  /** */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** */
    get files() {
      const root = this.shadowRoot;
      const input = root.querySelector('input[type="file"]');
      return input && input.files || [];
    }

  /** */
    mount(root) {
      Object
        .keys(updateAttribute)
        .forEach(attribute => updateAttribute[attribute](root, this[attribute]));

      const input = root.querySelector('input[type="file"]');
      input.addEventListener('change', e => {
        const files = [...e.target.files];
        this.event('change', files);
        files.forEach(async file => {
          const value = await read(file);
          this.event('file', value);
        });
      });
    }

  /** */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialButtonTooltip} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialButtonTooltip
    */
    static is(node) {
      return Material.is(node, MaterialButtonUpload);
    }
  }

Material.attributes(MaterialButtonUpload, 'text', 'accept');
Material.properties(MaterialButtonUpload, 'multiple', 'disabled');
Material.define(component, MaterialButtonUpload);

// #region [Private]
/** */
  function read(file, type = 'text') {
    return new Promise((resolve, reject) => {
      const fr  = new FileReader();

      fr.onload = async event => { // onload fires after reading is complete
        const reader = event.target;
        if (reader.readyState !== FileReader.DONE) reject(); // !
        try {
          const data = await types[type](reader);
          resolve({data, name: file.name});
        } catch (error) {
          reject(error);
        }
      }

      switch (type) {
        case 'buffer': fr.readAsArrayBuffer(file);  break;
        case 'binary': fr.readAsBinaryString(file); break;
        case 'data'  : fr.readAsDataURL(file);      break;
        case 'text'  : fr.readAsText(file);         break;
      }
    });
  }

/** */
  function text(reader) {
    return new Promise((resolve, reject) => {
      resolve(reader.result);
    });
  }

/** */
  function binary(reader) {

  }

/** */
  function buffer(reader) {

  }

/** */
  function data(reader) {

  }
// #endregion
