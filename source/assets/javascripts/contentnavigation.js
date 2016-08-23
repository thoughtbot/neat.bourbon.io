class ContentNavigation {
  constructor(element) {
    this.fixedClass = "fixed";
    this.bottomOutClass = "bottom-out";
    this.navigationBreakPoint = $(element).offset().top;
    this.$navigation = $(element);
    this.$parent = $(element).parent();
    this.$triggers = this.$navigation.find("[data-content-navigation-link]");

    this._bindEvents();
  }

  get pastNavigationPoint() {
    return $(window).scrollTop() >= this.navigationBreakPoint - 1;
  }

  get windowBottom() {
    return $(window).scrollTop() + $(window).height();
  }

  get parentBottom() {
    var navParentTop = this.$parent.offset().top;
    var navParentHeight = this.$parent.outerHeight();

    return navParentHeight + navParentTop;
  }

  get bottomOut() {
    return this.parentBottom <= this.windowBottom;
  }

  get parentBottomVisibility() {
    return this.windowBottom - this.parentBottom;
  }

  _bindEvents() {
    this.$triggers.on("click", this._animate);

    $(document).on(
      "scroll ready", _.throttle(this._setNavigationClass.bind(this), 100)
    )
  }

  _animate() {
    event.preventDefault();

    var topPadding = 20;
    var target = $(this).attr("href");
    var targetPosition = $(target).offset().top - topPadding;

    $("html, body").animate({ scrollTop: targetPosition}, 500);
  }

  _setNavigationClass() {
    var self = this;

    if(this.bottomOut) {
      self._bottomOutNav();
    } else {
      self._unbottomOutNav();
    }

    if(this.pastNavigationPoint) {
      self._fixNav();
    } else {
      self._unfixNav();
    }
  }

  _fixNav() {
    this.$navigation.addClass(this.fixedClass);
  }

  _bottomOutNav() {
    this.$navigation.addClass(this.bottomOutClass);
    this.$navigation.css("bottom", this.parentBottomVisibility);
  }

  _unfixNav() {
    this.$navigation.scrollTop(0);
    this.$navigation.removeClass(this.fixedClass);
  }

  _unbottomOutNav() {
    this.$navigation.removeClass(this.bottomOutClass);
    this.$navigation.css("bottom", "");
  }
}

$("[data-content-navigation]").each(function() {
  new ContentNavigation(this);
});
