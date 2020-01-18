import Material     from '../../script/Material.js';
// import Deferred     from '../../script/Deferred.js';
import MaterialIcon from '../icon/material-icon.js';
// import MaterialText from '../text/material-text.js';

const component = Material.meta(import.meta.url, 'material-snackbar');
const updateAttribute = {
/** */
  mode(root, value) { if (!this.icon) this.icon = getIcon(value) },

/** */
  icon(root, value) { Material.updateChildrenHTML(root, 'material-icon', value) }
};

/** Уведомление @class
  * @description Уведомления информируют пользователей о процессе, который приложение выполнило или будет выполнять. Они временно появляются в определенной части экрана и не должны прерывать взаимодействие с UI и не переключать фокус пользователя.
  */
  export default class MaterialSnackbar extends Material {
  /** Создание компонента {MaterialSnackbar} @constructor
    * @param {string|object} options настройки
    */
    constructor(options) {
      super(component);
      if (typeof options !== 'object') options = {label: options};
      // if (options) this.store(options);
      if (options.label) this.appendChild(document.createTextNode(options.label)); // new MaterialText(options.label)
      if (options.mode)  this.mode = options.mode;
      if (options.icon)  this.icon = options.icon;
    }

  // /** */
  //   open(callback, z = 100, root = document.body) {
  //     console.log(this);
  //     // this.cache.root = root;
  //     // this.cache.z = z;

  //     this.promise = new Deferred();

  //     // this.style.width = '400px';
  //     this.classList.add('animated');
  //     root.appendChild(this);

  //     const init = () => callback.call(this, this.shadowRoot);
  //     if (callback) this.addEventListener('transitionend', _ => setTimeout(init, 50), {once: true});
  //     return this.promise;
  //   }

  // /** */
  //   close() {
  //     const restoreRootView = () => this.remove();

  //     this.addEventListener('transitionend', restoreRootView);
  //     setTimeout(restoreRootView, 500);

  //     this.style.opacity = 0;
  //     this.style.transform = 'translateY(0)';
  //   }

  /** Отслеживаемые атрибуты / observedAttributes @readonly @static
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialSnackbar} @this
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

  /** Является ли узел элементом {MaterialSnackbar} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialSnackbar
    */
    static is(node) {
      return Material.is(node, MaterialSnackbar);
    }
  }

Material.attributes(MaterialSnackbar);
// Material.properties(MaterialSnackbar);
Material.define(component, MaterialSnackbar);

// #region [Private]
const icons = {
  error: 'error-outline',
  alert: 'report-problem',
  info: 'info-outline',
  success: 'check-circle-outline'
}

/** */
  function getIcon(value) {
    return icons[value] || '';
  }
// #endregion
