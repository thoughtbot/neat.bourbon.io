class dropDown {
  constructor(element) {
    this.openClass = "open";
    this.navigationBreakPoint = $(element).offset().top;
    this.$trigger = $(element);
    this.$id = $(element).attr("data-dropdown-trigger");
    this.$dropdown = $('[data-dropdown-list=' + this.$id + ']');

    this._bindEvents();
  }

  get parentBottom() {
    var navParentTop = this.$parent.offset().top;
    var navParentHeight = this.$parent.outerHeight();

    return navParentHeight + navParentTop;
  }

  _bindEvents() {
    this.$trigger.on("click", this._toggleDropdown.bind(this));
  }

  _toggleDropdown() {

    if(this.$dropdown.hasClass(this.openClass)) {
      this._closeDropdown();
    } else {
      this._openDropdown();
    }
  }

  _openDropdown() {
    this.$dropdown.addClass(this.openClass);
  }

  _closeDropdown() {
    this.$dropdown.removeClass(this.openClass);
  }
}

$("[data-dropdown-trigger]").each(function() {
  new dropDown(this);
});
