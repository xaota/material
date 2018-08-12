import Material from '../Material.js';

const element = 'material-tabs';
customElements.define(element, class MaterialTabs extends Material {
  constructor() {
    super(element);
  }

/** */
  mount() {
    const content = this.shadow;
    this.setAttribute('role', 'tablist');
    const tabsSlot = content.querySelector('#tabsSlot');
    const panelsSlot = content.querySelector('#panelsSlot');
    this.tabs = tabsSlot.assignedNodes({flatten: true});
    this.panels = panelsSlot.assignedNodes({flatten: true}).filter(el => {
      return el.nodeType === Node.ELEMENT_NODE;
    });

    // Add aria role="tabpanel" to each content panel.
    for (let [i, panel] of this.panels.entries()) {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', 0);
    }

    // Save refer to we can remove listeners later.
    this._boundOnTitleClick = this._onTitleClick.bind(this);
    this._boundOnKeyDown = this._onKeyDown.bind(this);
    tabsSlot.addEventListener('click', this._boundOnTitleClick);
    tabsSlot.addEventListener('keydown', this._boundOnKeyDown);

    this.selected = this._findFirstSelectedTab() || 0;
  }

/** */
  get selected() {
    return this.selected_;
  }

/** */
  set selected(idx) {
    this.selected_ = idx;
    this._selectTab(idx);
    // Updated the element's selected attribute value when
    // backing property changes.
    this.setAttribute('selected', idx);
  }

/** */
  disconnectedCallback() {
    const tabsSlot = this.shadow.querySelector('#tabsSlot');
    tabsSlot.removeEventListener('click', this._boundOnTitleClick);
    tabsSlot.removeEventListener('keydown', this._boundOnKeyDown);
  }

/** */
  _onTitleClick(e) {
    console.log('click');
    if (e.target.slot === 'title') {
      this.selected = this.tabs.indexOf(e.target);
      e.target.focus();
    }
  }

/** */
  _onKeyDown(e) {
    switch (e.code) {
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        var idx = this.selected - 1;
        idx = idx < 0 ? this.tabs.length - 1 : idx;
        this.tabs[idx].click();
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        var idx = this.selected + 1;
        this.tabs[idx % this.tabs.length].click();
        break;
      default:
        break;
    }
  }

/** */
  _findFirstSelectedTab() {
    let selectedIdx;
    for (let [i, tab] of this.tabs.entries()) {
      tab.setAttribute('role', 'tab');
      // Allow users to declaratively select a tab
      // Highlight last tab which has the selected attribute.
      if (tab.hasAttribute('selected')) {
        selectedIdx = i;
      }
    }
    return selectedIdx;
  }

/** */
  _selectTab(idx = null) {
    console.log(idx);
    // debugger;
    for (let i = 0, tab; tab = this.tabs[i]; ++i) {
      let select = i === idx;
      tab.setAttribute('tabindex', select ? 0 : -1);
      tab.setAttribute('aria-selected', select);
      this.panels[i].setAttribute('aria-hidden', !select);
    }
  }
});

// #region [Private]

// #endregion
