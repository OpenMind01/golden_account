angular.module('bgTemplates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("tpl/directives/address_input.html",
    "<div\n" +
    "  class=\"flyout-widget address-input\"\n" +
    "  ng-init=\"lang = $root.lang; address = {value:null}; list = {visible:null,filter:null,index:-1,stick:null};\"\n" +
    ">\n" +
    "\n" +
    "  <input\n" +
    "    type=\"text\"\n" +
    "    placeholder=\"{{::lang.addressInput.address}}\"\n" +
    "    ng-model=\"address.value\"\n" +
    "    ng-focus=\"list.filter = null; list.index = -1;\"\n" +
    "    ng-keypress=\"list.visible = address.value != '';\"\n" +
    "    ng-blur=\"list.visible = list.stick;\"\n" +
    "    ng-keyup=\"list.filter = address.value;\"\n" +
    "    hit-enter=\"address.value = contacts[list.index].text; list.visible = false;\"\n" +
    "    hit-up=\"list.index = list.index - 1; list.index = list.index < 0 ? 0 : list.index;\"\n" +
    "    hit-down=\"list.index = list.index + 1; list.index = list.index >= contacts.length ? contacts.length - 1 : list.index;\"\n" +
    "    focus-select\n" +
    "  />\n" +
    "\n" +
    "  <span\n" +
    "    class=\"address-drop-down\"\n" +
    "    ng-if=\"contacts\"\n" +
    "    ng-click=\"list.visible = true\"\n" +
    "  ></span>\n" +
    "\n" +
    "  <div\n" +
    "    class=\"flyout-container contact-widget\"\n" +
    "    ng-if=\"contacts\"\n" +
    "    ng-class=\"{ active: list.visible }\"\n" +
    "    ng-show=\"list.visible\"\n" +
    "    ng-click=\"$event.stopPropagation()\"\n" +
    "    ng-mouseenter=\"list.stick = true\"\n" +
    "    ng-mouseleave=\"list.stick = false\"\n" +
    "  >\n" +
    "    <div class=\"inner\">\n" +
    "      <ul class=\"item-list\">\n" +
    "        <li\n" +
    "          ng-repeat=\"item in contacts | filter:list.filter\"\n" +
    "          ng-click=\"address.value = item.text; list.visible = false;\"\n" +
    "          ng-class=\"{ selected: $index === list.index }\"\n" +
    "          ng-init=\"item.text = item.name + ' <' + item.address + '>'\"\n" +
    "        >\n" +
    "          <span class=\"name\">{{item.text}}</span>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/amount_input.html",
    "<div class=\"local-select-container\" ng-init=\"lang = $root.lang; currency = $root.currency;\">\n" +
    "\n" +
    "  <div class=\"col\">\n" +
    "\n" +
    "    <div class=\"amount-input-currency\">\n" +
    "      <currency-input ng-model=\"currency\" />\n" +
    "    </div>\n" +
    "\n" +
    "  </div><!-- col -->\n" +
    "\n" +
    "  <div class=\"col\">\n" +
    "\n" +
    "    <div class=\"amount-input-value\">\n" +
    "      <input\n" +
    "        type=\"text\"\n" +
    "        placeholder=\"{{::lang.amountInput.amount}}\"\n" +
    "        ng-model=\"value\"\n" +
    "        ng-trim=\"false\"\n" +
    "        required\n" +
    "      />\n" +
    "    </div>\n" +
    "\n" +
    "  </div><!-- col -->\n" +
    "\n" +
    "</div><!-- local-select-container -->\n" +
    "");
  $templateCache.put("tpl/directives/country_input.html",
    "<div class=\"country-container\">\n" +
    "\n" +
    "  <div\n" +
    "    class=\"flyout-widget country-input\"\n" +
    "    ng-init=\"lang = $root.lang; country = {value:null,flag:null}; list = {visible:null,filter:null,index:-1,stick:null};\"\n" +
    "  >\n" +
    "\n" +
    "    <input\n" +
    "      type=\"text\"\n" +
    "      placeholder=\"{{::lang.phoneInput.country}}\"\n" +
    "      ng-model=\"country.value\"\n" +
    "      ng-class=\"country.flag ? 'flag ' + country.flag : ''\"\n" +
    "      ng-focus=\"list.visible = true; list.filter = null; list.index = -1;\"\n" +
    "      ng-blur=\"list.visible = list.stick;\"\n" +
    "      ng-keyup=\"list.filter = country.value; list.visible = true;\"\n" +
    "      ng-change=\"country.flag = null;\"\n" +
    "      hit-enter=\"country.value = list.data[list.index].country; list.visible = false;\"\n" +
    "      hit-up=\"list.index = list.index - 1; list.index = list.index < 0 ? 0 : list.index;\"\n" +
    "      hit-down=\"list.index = list.index + 1; list.index = list.index >= list.data.length ? list.data.length - 1 : list.index;\"\n" +
    "      focus-select\n" +
    "      class=\"input-dropdown before-icon\"\n" +
    "      ng-readonly=\"readonly\"\n" +
    "    />\n" +
    "\n" +
    "    <span\n" +
    "      ng-if=\"!readonly\"\n" +
    "      class=\"input-dropdown-chevron\"\n" +
    "      ng-click=\"list.visible = true\"\n" +
    "    ></span>\n" +
    "\n" +
    "    <div\n" +
    "      ng-if=\"!readonly\"\n" +
    "      class=\"flyout-container country-widget\"\n" +
    "      ng-show=\"list.visible\"\n" +
    "      ng-class=\"{ active: list.visible }\"\n" +
    "      ng-mouseenter=\"list.stick = true\"\n" +
    "      ng-mouseleave=\"list.stick = false\"\n" +
    "    >\n" +
    "      <div class=\"inner\">\n" +
    "        <ul class=\"item-list\">\n" +
    "          <li\n" +
    "            ng-repeat=\"item in list.data = (lang.phoneInput.countryList | filter:list.filter)\"\n" +
    "            ng-click=\"country.value = item.country; list.visible = false;\"\n" +
    "            ng-class=\"{ selected: $index === list.index }\"\n" +
    "            scroll-parent-if=\"$index === list.index\"\n" +
    "          >\n" +
    "            <i class=\"flag\" ng-class=\"item.key\"></i>\n" +
    "            <span class=\"name\">{{item.country}}</span>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/csv_button.html",
    "<div class=\"csv-button\" ng-click=\"click()\" ng-transclude>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/currency_input.html",
    "<div\n" +
    "  class=\"flyout-widget\"\n" +
    "  ng-init=\"lang = $root.lang; list = { visible: false, stick: false, filter: null, index: -1, counter: -1 };\"\n" +
    "  ng-click=\"list.visible = true;\"\n" +
    ">\n" +
    "\n" +
    "  <input\n" +
    "    type=\"text\"\n" +
    "    ng-model=\"currency.selected\"\n" +
    "    ng-focus=\"list.visible = true; list.filter = null; list.index = -1; list.counter = -1;\"\n" +
    "    ng-blur=\"list.visible = list.stick;\"\n" +
    "    ng-keyup=\"list.filter = currency.selected; list.counter = -1;\"\n" +
    "    ng-class=\"currency.flag ? 'flag before-icon ' + currency.flag : ''\"\n" +
    "    class=\"input-dropdown\"\n" +
    "    placeholder=\"{{::lang.currencySelector.placeholder}}\"\n" +
    "  />\n" +
    "\n" +
    "  <span class=\"input-dropdown-chevron\"></span>\n" +
    "\n" +
    "  <div\n" +
    "    class=\"flyout-container input-flyout-widget\"\n" +
    "    ng-class=\"{ active: list.visible }\"\n" +
    "    ng-show=\"list.visible\"\n" +
    "    ng-click=\"$event.stopPropagation()\"\n" +
    "    ng-mouseenter=\"list.stick = true\"\n" +
    "    ng-mouseleave=\"list.stick = false\"\n" +
    "  >\n" +
    "    <div class=\"inner\">\n" +
    "      <div ng-repeat=\"(name,countries) in lang.currencySelector.country\">\n" +
    "        <div class=\"list-heading toggle\"\n" +
    "          ng-init=\"continent = $index === 0 ? name : null\"\n" +
    "          ng-click=\"continent = continent === name ? null : name\"\n" +
    "          ng-class=\"{ active: continent === name || list.filter }\"\n" +
    "        >{{name}}</div>\n" +
    "        <ul class=\"item-list\" ng-show=\"continent === name || list.filter\">\n" +
    "          <li\n" +
    "            ng-repeat=\"item in (countries | filter:list.filter)\"\n" +
    "            ng-click=\"currency.selected = item.currency; currency.flag = item.key; list.visible = false;\"\n" +
    "            ng-class=\"{ selected: item.selected }\"\n" +
    "          >\n" +
    "            <i class=\"flag\" ng-class=\"item.key\"></i>\n" +
    "            <span class=\"name\">{{item.country}}</span>\n" +
    "            <span class=\"meta\">{{item.currency}}</span>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/currency_selector.html",
    "<div\n" +
    "  class=\"flyout-widget currency-selector\"\n" +
    "  ng-init=\"lang = $root.lang; list = { visible: false, stick: false, filter: null, index: -1, counter: -1 };\"\n" +
    "  outer-click=\"list.visible=false\"\n" +
    ">\n" +
    "\n" +
    "  <span ng-click=\"list.visible = true; list.filter = null; list.index = -1; list.counter = -1;\" class=\"flyout-hook\">\n" +
    "    {{currency.selected}}\n" +
    "  </span>\n" +
    "\n" +
    "  <div\n" +
    "    class=\"flyout-container currency-widget\"\n" +
    "    ng-class=\"{ active: list.visible }\"\n" +
    "    ng-show=\"list.visible\"\n" +
    "    ng-click=\"$event.stopPropagation()\"\n" +
    "    ng-mouseenter=\"list.stick = true\"\n" +
    "    ng-mouseleave=\"list.stick = false\"\n" +
    "  >\n" +
    "    <div class=\"inner\">\n" +
    "      <div class=\"search-container\">\n" +
    "        <i></i><input class=\"default\" ng-model=\"list.filter\" set-focus=\"list.visible\" placeholder=\"{{lang.currencySelector.search}}\" />\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-repeat=\"(name,countries) in lang.currencySelector.country\">\n" +
    "        <div class=\"list-heading toggle\"\n" +
    "          ng-init=\"continent = $index === 0 ? name : null\"\n" +
    "          ng-click=\"continent = continent === name ? null : name\"\n" +
    "          ng-class=\"{ active: continent === name || list.filter }\"\n" +
    "        >{{name}}</div>\n" +
    "        <ul class=\"item-list\" ng-show=\"continent === name || list.filter\">\n" +
    "          <li\n" +
    "            ng-repeat=\"item in (countries | filter:list.filter)\"\n" +
    "            ng-click=\"currency.selected = item.currency; list.visible = false;\"\n" +
    "            ng-class=\"{ selected: item.selected }\"\n" +
    "            ng-show=\"{{item.currency != 'BTC'}}\"\n" +
    "          >\n" +
    "            <i class=\"flag\" ng-class=\"item.key\"></i>\n" +
    "            <span class=\"name\">{{item.country}}</span>\n" +
    "            <span class=\"meta\">{{item.currency}}</span>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/date_input.html",
    "<div class=\"dob-container\">\n" +
    "\n" +
    "  <div class=\"input-container day\">\n" +
    "    <label ng-if=\"label\">{{label}}</label>\n" +
    "    <input type=\"text\" ng-model=\"date.day\" name=\"dob-day\" maxlength=\"2\" placeholder=\"{{::lang.dateInput.day}}\" auto-tab />\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"input-container month\">\n" +
    "    <label ng-if=\"label\">&nbsp;</label>\n" +
    "    <input type=\"text\" ng-model=\"date.month\" name=\"dob-month\" maxlength=\"2\" placeholder=\"{{::lang.dateInput.month}}\" auto-tab />\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"input-container year\">\n" +
    "    <label ng-if=\"label\">&nbsp;</label>\n" +
    "    <input type=\"text\" ng-model=\"date.year\" name=\"dob-year\" maxlength=\"4\" placeholder=\"{{::lang.dateInput.year}}\" auto-tab />\n" +
    "  </div>\n" +
    "\n" +
    "</div><!-- dob-container -->\n" +
    "");
  $templateCache.put("tpl/directives/email_input.html",
    "<div\n" +
    "  class=\"email-input\"\n" +
    "  ng-init=\"lang = $root.lang; email = {value:null}; list = {visible:null,filter:null,index:-1,stick:null};\"\n" +
    ">\n" +
    "\n" +
    "  <input\n" +
    "    type=\"email\"\n" +
    "    placeholder=\"{{::lang.emailInput.email}}\"\n" +
    "    ng-model=\"email.value\"\n" +
    "    ng-focus=\"list.visible = true; list.filter = null; list.index = -1;\"\n" +
    "    ng-blur=\"list.visible = list.stick;\"\n" +
    "    ng-keyup=\"list.filter = email.value; list.visible = true;\"\n" +
    "    hit-enter=\"email.value = contacts[list.index].email; list.visible = false;\"\n" +
    "    hit-up=\"list.index = list.index - 1; list.index = list.index < 0 ? 0 : list.index;\"\n" +
    "    hit-down=\"list.index = list.index + 1; list.index = list.index >= contacts.length ? contacts.length - 1 : list.index;\"\n" +
    "  />\n" +
    "\n" +
    "  <span\n" +
    "    class=\"email-drop-down\"\n" +
    "    ng-if=\"contacts\"\n" +
    "    ng-click=\"list.visible = true\"\n" +
    "  ></span>\n" +
    "\n" +
    "  <div\n" +
    "    class=\"email-contact-list\"\n" +
    "    ng-if=\"contacts\"\n" +
    "    ng-show=\"list.visible\"\n" +
    "    ng-mouseenter=\"list.stick = true;\"\n" +
    "    ng-mouseleave=\"list.stick = false;\"\n" +
    "  >\n" +
    "    <ul>\n" +
    "      <li\n" +
    "        ng-repeat=\"contact in contacts | filter:list.filter\"\n" +
    "        ng-click=\"email.value = contact.email; list.visible = false;\"\n" +
    "        ng-class=\"{ selected: $index === list.index }\"\n" +
    "        scroll-parent-if=\"$index === $parent.list.index\"\n" +
    "      >\n" +
    "        <span>{{::lang.emailInput.contact.name}} {{contact.name}}</span>\n" +
    "        <br/>\n" +
    "        <span>{{::lang.emailInput.contact.email}} {{contact.email}}</span>\n" +
    "        <br/>\n" +
    "        <span>{{::lang.emailInput.contact.address}} {{contact.address}}</span>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/image_input.html",
    "<h4>{{::lang.imageInput.optOneHeading}}</h4>\n" +
    "\n" +
    "<div class=\"image-input\">\n" +
    "\n" +
    "  <div class=\"drag-and-drop-container\" id=\"drop-attach\" ng-show=\"!preview.display\">\n" +
    "\n" +
    "    <div class=\"content\">\n" +
    "      <i class=\"large-upload-icon\"></i>\n" +
    "      <p>{{::lang.imageInput.uploadLineOne}}</p>\n" +
    "      <p>{{::lang.imageInput.uploadLineTwo}} <a href=\"javascript:;\" id=\"upload-attach\">{{::lang.imageInput.browseLink}}</a></p>\n" +
    "    </div>\n" +
    "\n" +
    "  </div><!-- drag-and-drop-container -->\n" +
    "\n" +
    "  <div class=\"uploaded-image\">\n" +
    "\n" +
    "    <img />\n" +
    "\n" +
    "    <div class=\"button-container\" ng-show=\"preview.display && preview.buttons\">\n" +
    "\n" +
    "      <button type=\"button\" class=\"grey-button\" ng-click=\"cancelImage()\">{{::lang.imageInput.cancel}}</button>\n" +
    "      <button type=\"button\" class=\"blue-button\" ng-click=\"confirmImage()\">{{::lang.imageInput.confirm}}</button>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div><!-- uploaded-image -->\n" +
    "\n" +
    "  <div class=\"original-image\"><img /></div>\n" +
    "\n" +
    "  <div class=\"image-preview-progress\" ng-show=\"preview.display && preview.progress\">\n" +
    "    <p>{{::lang.imageInput.tip.progress}}</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"other-upload-options\" ng-show=\"!preview.display\">\n" +
    "\n" +
    "    <div class=\"option\">\n" +
    "      <h4>{{::lang.imageInput.optTwoHeading}}</h4>\n" +
    "      <button type=\"button\" class=\"blue-button icon-button\" id=\"upload-webcam-attach\" ng-click=\"openWebcam()\">\n" +
    "        <i class=\"camera-icon\"></i>{{::lang.imageInput.webcam}}\n" +
    "      </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"option\">\n" +
    "      <h4>{{::lang.imageInput.optThreeHeading}}</h4>\n" +
    "      <button type=\"button\" class=\"blue-button icon-button\" ng-click=\"sendEmail();\">\n" +
    "        <i class=\"email-icon\"></i>\n" +
    "        {{::lang.imageInput.email}}\n" +
    "      </button>\n" +
    "    </div>\n" +
    "\n" +
    "  </div><!-- other-upload-options -->\n" +
    "\n" +
    "  <div class=\"cta-container\" ng-show=\"!preview.display\">\n" +
    "    <a href=\"javascript:;\" class=\"light-link-button\">{{::lang.imageInput.skip}}</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <modal ng-model=\"webcam.display\">\n" +
    "\n" +
    "    <div class=\"webcam-top\">\n" +
    "      <i class=\"fa fa-times\" ng-click=\"closeWebcam()\"></i>\n" +
    "      <h3>{{::lang.imageInput.webcamTitle}}</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"webcam-attach\" class=\"webcam-container\" ng-show=\"!webcam.error\"></div>\n" +
    "\n" +
    "    <div class=\"webcam-error\" ng-show=\"webcam.error\">\n" +
    "      <span>{{webcam.error}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"capture-button-container\">\n" +
    "      <a href=\"javascript:;\" class=\"capture-button\" ng-click=\"takePicture()\"><i class=\"camera-icon\"></i></a>\n" +
    "    </div>\n" +
    "\n" +
    "  </modal><!-- webcam-modal -->\n" +
    "\n" +
    "  <modal ng-model=\"preview.email\" class=\"send-via-email-modal\" block>\n" +
    "\n" +
    "    <div class=\"modal-box\">\n" +
    "\n" +
    "      <header><h2>{{::lang.imageInput.email}}</h2></header>\n" +
    "\n" +
    "      <div class=\"illustration\">\n" +
    "        <img src=\"img/send-by-email-illustration.png\" retina alt=\"{{::lang.imageInput.imageEmail}}\">\n" +
    "      </div>\n" +
    "\n" +
    "      <p class=\"secondary-text\">{{::lang.imageInput.tip.email}}</p>\n" +
    "      <p compile=\"pin\" class=\"email\">{{::lang.imageInput.sendDocEmail}}</p>\n" +
    "\n" +
    "      <footer class=\"dual-actions\">\n" +
    "        <a href=\"javascript:;\" ng-click=\"preview.email = false;\" class=\"link-button\">{{::lang.imageInput.confirmEmail}}</a>\n" +
    "        <a href=\"javascript:;\" ng-click=\"preview.email = false;\" class=\"cancel-link-button\">{{::lang.imageInput.cancel}}</a>\n" +
    "      </footer>\n" +
    "\n" +
    "    </div><!-- modal-box -->\n" +
    "\n" +
    "  </modal><!-- modal | send-id-via-email -->\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/label_input.html",
    "<div\n" +
    "  class=\"flyout-widget label-input\"\n" +
    "  ng-init=\"lang = $root.lang; list = { visible: false, stick: false };\"\n" +
    "  outer-click=\"list.visible=false\"\n" +
    ">\n" +
    "\n" +
    "  <a ng-click=\"list.visible = true;\">{{label.value}}</a>\n" +
    "\n" +
    "  <div\n" +
    "    class=\"flyout-container label-widget\"\n" +
    "    ng-class=\"{ active: list.visible }\"\n" +
    "    ng-show=\"list.visible\"\n" +
    "    ng-click=\"$event.stopPropagation()\"\n" +
    "    ng-mouseenter=\"list.stick = true\"\n" +
    "    ng-mouseleave=\"list.stick = false\"\n" +
    "  >\n" +
    "    <div class=\"inner\">\n" +
    "      <div class=\"input-container\">\n" +
    "        <label>{{::lang.labelInput.label}}</label>\n" +
    "        <input type=\"text\" ng-model=\"label.new\" set-focus=\"list.visible\" placeholder=\"{{::lang.labelInput.placeholder}}\" maxlength=\"60\" />\n" +
    "      </div>\n" +
    "      <div class=\"cta-container\">\n" +
    "        <button ng-click=\"label.value = label.new; list.visible = false;\" type=\"button\" class=\"medium-button\">{{::lang.labelInput.submit}}</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/language_input.html",
    "<div\n" +
    "  class=\"flyout-widget language-select-widget\"\n" +
    "  ng-init=\"lang = $root.lang; list = { visible: false, stick: false, filter: null, index: -1, counter: -1 };\"\n" +
    "  outer-click=\"list.visible = false\"\n" +
    ">\n" +
    "\n" +
    "  <input\n" +
    "    type=\"text\"\n" +
    "    ng-model=\"language.selected\"\n" +
    "    ng-focus=\"list.visible = true; list.filter = null; list.index = 0; list.counter = -1;\"\n" +
    "    ng-blur=\"list.visible = list.stick; language.selected = language.selected || language.default;\"\n" +
    "    ng-keyup=\"list.filter = language.selected; list.counter = -1;\"\n" +
    "    placeholder=\"{{::lang.languageSelector.placeholder}}\"\n" +
    "  />\n" +
    "\n" +
    "  <div\n" +
    "    class=\"flyout-container language-widget\"\n" +
    "    ng-class=\"{ active: list.visible }\"\n" +
    "    ng-show=\"list.visible\"\n" +
    "    ng-click=\"$event.stopPropagation()\"\n" +
    "    ng-mouseenter=\"list.stick = true\"\n" +
    "    ng-mouseleave=\"list.stick = false\"\n" +
    "  >\n" +
    "    <div class=\"inner\">\n" +
    "      <ul class=\"item-list\">\n" +
    "        <li\n" +
    "          ng-repeat=\"item in lang.languageSelector.languages\"\n" +
    "          ng-click=\"language.selected = item.name; list.visible = false;\"\n" +
    "          ng-class=\"{ selected: item.selected }\"\n" +
    "        >\n" +
    "          <span class=\"name\">{{item.name}}</span>\n" +
    "          <span class=\"meta\">{{item.code}}</span>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/language_selector.html",
    "<div\n" +
    "  class=\"flyout-widget language-select-widget\"\n" +
    "  ng-init=\"lang = $root.lang; list = { visible: false, stick: false, filter: null, index: -1, counter: -1 };\"\n" +
    "  outer-click=\"list.visible = false\"\n" +
    ">\n" +
    "\n" +
    "  <span ng-click=\"list.visible = true; list.filter = null; list.index = -1; list.counter = -1;\" class=\"flyout-hook\">\n" +
    "    {{language.selected}}\n" +
    "  </span>\n" +
    "\n" +
    "  <div\n" +
    "    class=\"flyout-container language-widget\"\n" +
    "    ng-class=\"{ active: list.visible }\"\n" +
    "    ng-show=\"list.visible\"\n" +
    "    ng-click=\"$event.stopPropagation()\"\n" +
    "    ng-mouseenter=\"list.stick = true\"\n" +
    "    ng-mouseleave=\"list.stick = false\"\n" +
    "  >\n" +
    "    <div class=\"inner\">\n" +
    "      <ul class=\"item-list\">\n" +
    "        <li\n" +
    "          ng-repeat=\"item in lang.languageSelector.languages\"\n" +
    "          ng-click=\"language.selected = item.name; list.visible = false;\"\n" +
    "          ng-class=\"{ selected: item.selected }\"\n" +
    "        >\n" +
    "          <span class=\"name\">{{item.name}}</span>\n" +
    "          <span class=\"meta\">{{item.code}}</span>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/location_input.html",
    "<div class=\"location-container\">\n" +
    "\n" +
    "  <div\n" +
    "    class=\"flyout-widget location-input\"\n" +
    "    ng-init=\"lang = $root.lang; location = {value:null,flag:null}; list = {visible:null,filter:null,index:-1,stick:null};\"\n" +
    "  >\n" +
    "\n" +
    "    <input\n" +
    "      type=\"text\"\n" +
    "      placeholder=\"{{::lang.locationInput.placeholder}}\"\n" +
    "      ng-model=\"location.value\"\n" +
    "      ng-class=\"[location.flag ? 'flag before-icon ' + location.flag : '']\"\n" +
    "      ng-focus=\"list.visible = true; list.filter = null; list.index = -1;\"\n" +
    "      ng-blur=\"list.visible = list.stick;\"\n" +
    "      ng-keyup=\"list.filter = location.value; list.visible = true;\"\n" +
    "      ng-change=\"location.flag = null;\"\n" +
    "      hit-enter=\"location.value = list.data[list.index].country; list.visible = false;\"\n" +
    "      hit-up=\"list.index = list.index - 1; list.index = list.index < 0 ? 0 : list.index;\"\n" +
    "      hit-down=\"list.index = list.index + 1; list.index = list.index >= list.data.length ? list.data.length - 1 : list.index;\"\n" +
    "      focus-select\n" +
    "      class=\"input-dropdown\"\n" +
    "    />\n" +
    "\n" +
    "    <span\n" +
    "      class=\"input-dropdown-chevron\"\n" +
    "      ng-click=\"list.visible = true\"\n" +
    "    ></span>\n" +
    "\n" +
    "    <div\n" +
    "      class=\"flyout-container location-widget\"\n" +
    "      ng-show=\"list.visible\"\n" +
    "      ng-class=\"{ active: list.visible }\"\n" +
    "      ng-mouseenter=\"list.stick = true\"\n" +
    "      ng-mouseleave=\"list.stick = false\"\n" +
    "    >\n" +
    "      <div class=\"inner\">\n" +
    "        <ul class=\"item-list\">\n" +
    "          <li\n" +
    "            ng-repeat=\"item in list.data = (lang.locationInput.locationList | filter:list.filter)\"\n" +
    "            ng-click=\"location.value = item.location; list.visible = false;\"\n" +
    "            ng-class=\"{ selected: $index === list.index }\"\n" +
    "            scroll-parent-if=\"$index === list.index\"\n" +
    "          >\n" +
    "            <i class=\"flag\" ng-class=\"item.flag\"></i>\n" +
    "            <span class=\"name\">{{item.location}}</span>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/method_input.html",
    "<div\n" +
    "  class=\"flyout-widget method-input\"\n" +
    "  ng-init=\"lang = $root.lang; method = {value:null,flag:null}; list = {visible:null,filter:null,index:-1,stick:null};\"\n" +
    ">\n" +
    "\n" +
    "  <input\n" +
    "    type=\"text\"\n" +
    "    placeholder=\"{{::lang.methodInput.placeholder}}\"\n" +
    "    ng-model=\"method.value\"\n" +
    "    ng-focus=\"list.visible = true; list.filter = null; list.index = -1;\"\n" +
    "    ng-blur=\"list.visible = list.stick;\"\n" +
    "    ng-keyup=\"list.filter = method.value; list.visible = true;\"\n" +
    "    hit-enter=\"method.value = list.data[list.index].method; list.visible = false;\"\n" +
    "    hit-up=\"list.index = list.index - 1; list.index = list.index < 0 ? 0 : list.index;\"\n" +
    "    hit-down=\"list.index = list.index + 1; list.index = list.index >= list.data.length ? list.data.length - 1 : list.index;\"\n" +
    "    focus-select\n" +
    "    class=\"input-dropdown\"\n" +
    "  />\n" +
    "\n" +
    "  <span\n" +
    "    class=\"input-dropdown-chevron\"\n" +
    "    ng-click=\"list.visible = true\"\n" +
    "  ></span>\n" +
    "\n" +
    "  <div\n" +
    "    class=\"flyout-container method-widget\"\n" +
    "    ng-show=\"list.visible\"\n" +
    "    ng-class=\"{ active: list.visible }\"\n" +
    "    ng-mouseenter=\"list.stick = true\"\n" +
    "    ng-mouseleave=\"list.stick = false\"\n" +
    "  >\n" +
    "    <div class=\"inner\">\n" +
    "      <ul class=\"item-list\">\n" +
    "        <li\n" +
    "          ng-repeat=\"item in list.data = (lang.methodInput.methodList | filter:list.filter)\"\n" +
    "          ng-click=\"method.value = item.method; list.visible = false;\"\n" +
    "          ng-class=\"{ selected: $index === list.index }\"\n" +
    "          scroll-parent-if=\"$index === list.index\"\n" +
    "        >\n" +
    "          <span class=\"name\">{{item.method}}</span>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/modal.html",
    "<div class=\"modal-container\">\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/pdf_button.html",
    "<div class=\"pdf-button\" ng-click=\"click()\" ng-transclude>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/phone_input.html",
    "<div class=\"local-select-container\">\n" +
    "\n" +
    "  <div class=\"col\">\n" +
    "\n" +
    "    <div\n" +
    "      class=\"flyout-widget phone-input\"\n" +
    "      ng-init=\"lang = $root.lang; code = {value:null,flag:null}; list = {visible:null,filter:null,index:-1,stick:null};\"\n" +
    "    >\n" +
    "\n" +
    "      <input\n" +
    "        type=\"text\"\n" +
    "        ng-readonly=\"readonly\"\n" +
    "        placeholder=\"{{::lang.phoneInput.countryCode}}\"\n" +
    "        ng-model=\"code.value\"\n" +
    "        ng-class=\"code.flag ? 'flag ' + code.flag : ''\"\n" +
    "        ng-focus=\"list.visible = true; list.filter = null; list.index = -1;\"\n" +
    "        ng-blur=\"list.visible = list.stick;\"\n" +
    "        ng-keyup=\"list.filter = code.value; list.visible = true;\"\n" +
    "        ng-change=\"code.flag = null;\"\n" +
    "        hit-enter=\"code.flag = list.data[list.index].key; code.value = list.data[list.index].text; list.visible = false;\"\n" +
    "        hit-up=\"list.index = list.index - 1; list.index = list.index < 0 ? 0 : list.index;\"\n" +
    "        hit-down=\"list.index = list.index + 1; list.index = list.index >= list.data.length ? list.data.length - 1 : list.index;\"\n" +
    "        focus-select\n" +
    "        class=\"input-dropdown before-icon\"\n" +
    "      />\n" +
    "\n" +
    "      <span\n" +
    "        class=\"input-dropdown-chevron\"\n" +
    "        ng-click=\"list.visible = true\"\n" +
    "        ng-show=\"!readonly\"\n" +
    "      ></span>\n" +
    "\n" +
    "      <div\n" +
    "        class=\"flyout-container phone-widget\"\n" +
    "        ng-show=\"list.visible && !readonly\"\n" +
    "        ng-class=\"{ active: list.visible }\"\n" +
    "        ng-mouseenter=\"list.stick = true\"\n" +
    "        ng-mouseleave=\"list.stick = false\"\n" +
    "      >\n" +
    "        <div class=\"inner\">\n" +
    "          <ul class=\"item-list\">\n" +
    "            <li\n" +
    "              ng-repeat=\"item in list.data = (lang.phoneInput.countryList | filter:list.filter)\"\n" +
    "              ng-click=\"code.flag = item.key; code.value = item.text; list.visible = false;\"\n" +
    "              ng-class=\"{ selected: $index === list.index }\"\n" +
    "              ng-init=\"item.text = item.country + ' (+' + item.code + ')'\"\n" +
    "              scroll-parent-if=\"$index === list.index\"\n" +
    "            >\n" +
    "              <i class=\"flag\" ng-class=\"item.key\"></i>\n" +
    "              <span class=\"name\">{{item.country}}</span>\n" +
    "              <span class=\"meta\">+{{item.code}}</span>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div><!-- flyout-widget -->\n" +
    "\n" +
    "  </div><!-- col -->\n" +
    "\n" +
    "  <div class=\"col\">\n" +
    "\n" +
    "    <input\n" +
    "      type=\"tel\"\n" +
    "      placeholder=\"{{::lang.phoneInput.phoneNumber}}\"\n" +
    "      ng-model=\"number\"\n" +
    "      ng-readonly=\"readonly\"\n" +
    "    />\n" +
    "\n" +
    "  </div><!-- col -->\n" +
    "\n" +
    "</div><!-- phone-contianer -->\n" +
    "");
  $templateCache.put("tpl/directives/pie-chart.html",
    "<div class=\"pie-chart\">\n" +
    "  <canvas width=\"160\" height=\"120\" />\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/qrcode.html",
    "<div class=\"qrcode\">\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/state_input.html",
    "<div\n" +
    "  class=\"flyout-widget state-input\"\n" +
    "  ng-init=\"lang = $root.lang; list = {visible:null,filter:null,index:-1,stick:null};\"\n" +
    ">\n" +
    "\n" +
    "  <input\n" +
    "    type=\"text\"\n" +
    "    maxlength=\"2\"\n" +
    "    ng-readonly=\"readonly\"\n" +
    "    placeholder=\"{{::lang.stateInput.statePlaceholder}}\"\n" +
    "    ng-model=\"state.value\"\n" +
    "    ng-focus=\"list.visible = true; list.filter = null; list.index = -1;\"\n" +
    "    ng-blur=\"list.visible = list.stick;\"\n" +
    "    ng-keyup=\"list.filter = state.value; list.visible = true;\"\n" +
    "    hit-enter=\"state.value = list.data[list.index].code; list.visible = false;\"\n" +
    "    hit-up=\"list.index = list.index - 1; list.index = list.index < 0 ? 0 : list.index;\"\n" +
    "    hit-down=\"list.index = list.index + 1; list.index = list.index >= list.data.length ? list.data.length - 1 : list.index;\"\n" +
    "    focus-select\n" +
    "    class=\"input-dropdown\"\n" +
    "  />\n" +
    "\n" +
    "  <span\n" +
    "    class=\"input-dropdown-chevron\"\n" +
    "    ng-click=\"list.visible = true\"\n" +
    "    ng-show=\"!readonly\"\n" +
    "  ></span>\n" +
    "\n" +
    "  <div\n" +
    "    class=\"flyout-container input-flyout-widget\"\n" +
    "    ng-show=\"list.visible && !readonly\"\n" +
    "    ng-class=\"{ active: list.visible }\"\n" +
    "    ng-mouseenter=\"list.stick = true\"\n" +
    "    ng-mouseleave=\"list.stick = false\"\n" +
    "  >\n" +
    "    <div class=\"inner\">\n" +
    "      <ul class=\"item-list\">\n" +
    "        <li\n" +
    "          ng-repeat=\"item in list.data = (lang.stateInput.stateList | filter:list.filter)\"\n" +
    "          ng-click=\"state.value = item.code; list.visible = false;\"\n" +
    "          ng-class=\"{ selected: $index === list.index }\"\n" +
    "          scroll-parent-if=\"$index === list.index\"\n" +
    "        >\n" +
    "          <span class=\"name\">{{item.state}}</span>\n" +
    "          <span class=\"meta\">{{item.code}}</span>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div><!-- flyout-widget -->\n" +
    "");
  $templateCache.put("tpl/directives/strength_bar.html",
    "<div class=\"strength-bar\" ng-show=\"field.strength.level > 0\">\n" +
    "  <div class=\"strength-bar-outer\">\n" +
    "    <div ng-class=\"{\n" +
    "      'strength-bar-inner': true,\n" +
    "      'very-weak': field.strength.veryWeak,\n" +
    "      'weak': field.strength.weak,\n" +
    "      'strong': field.strength.strong,\n" +
    "      'very-strong': field.strength.veryStrong,\n" +
    "    }\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"meta\">\n" +
    "    <span ng-show=\"field.strength.veryWeak\">{{::lang.strengthBar.veryWeak}}</span>\n" +
    "    <span ng-show=\"field.strength.weak\">{{::lang.strengthBar.weak}}</span>\n" +
    "    <span ng-show=\"field.strength.strong\">{{::lang.strengthBar.strong}}</span>\n" +
    "    <span ng-show=\"field.strength.veryStrong\">{{::lang.strengthBar.veryStrong}}</span>\n" +
    "    <span ng-show=\"!field.strength.hasLength\">{{::lang.strengthBar.length}}</span>\n" +
    "    <span ng-show=\"!field.strength.hasMixed\">{{::lang.strengthBar.mixed}}</span>\n" +
    "    <span ng-show=\"!field.strength.hasNumber\">{{::lang.strengthBar.number}}</span>\n" +
    "    <span ng-show=\"!field.strength.hasSymbol\">{{::lang.strengthBar.symbol}}</span>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/directives/timezone_input.html",
    "<div\n" +
    "  class=\"flyout-widget timezone-select-widget\"\n" +
    "  ng-init=\"lang = $root.lang; list = { visible: false, stick: false, filter: null, index: -1, counter: -1 };\"\n" +
    "  outer-click=\"list.visible = false\"\n" +
    ">\n" +
    "\n" +
    "  <input\n" +
    "    type=\"text\"\n" +
    "    ng-model=\"timezone.selected\"\n" +
    "    ng-focus=\"list.visible = true; list.filter = null; list.index = -1; list.counter = -1;\"\n" +
    "    ng-blur=\"list.visible = list.stick;\"\n" +
    "    ng-keyup=\"list.filter = timezone.selected; list.counter = -1;\"\n" +
    "    placeholder=\"{{::lang.timezoneSelector.placeholder}}\"\n" +
    "  />\n" +
    "\n" +
    "  <div\n" +
    "    class=\"flyout-container timezone-widget\"\n" +
    "    ng-class=\"{ active: list.visible }\"\n" +
    "    ng-show=\"list.visible\"\n" +
    "    ng-click=\"$event.stopPropagation()\"\n" +
    "    ng-mouseenter=\"list.stick = true\"\n" +
    "    ng-mouseleave=\"list.stick = false\"\n" +
    "  >\n" +
    "    <div class=\"inner\">\n" +
    "      <ul class=\"item-list\">\n" +
    "        <li\n" +
    "          ng-repeat=\"item in lang.timezoneSelector.timezones\"\n" +
    "          ng-click=\"timezone.selected = item.zone; list.visible = false;\"\n" +
    "          ng-class=\"{ selected: item.selected }\"\n" +
    "        >\n" +
    "          <span class=\"name\">{{item.name}}</span>\n" +
    "          <span class=\"meta\">{{item.zone}}</span>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/views/basic_info.html",
    "<section class=\"account-flow\">\n" +
    "\n" +
    "  <div class=\"_wrapper\">\n" +
    "\n" +
    "    <section class=\"box\">\n" +
    "\n" +
    "      <header>\n" +
    "        <h2>{{::lang.basicInfo.title}}</h2>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"step-container\">\n" +
    "\n" +
    "        <div class=\"step email\">\n" +
    "          <div class=\"icon-container\">\n" +
    "            <i></i>\n" +
    "          </div>\n" +
    "          <span>{{::lang.signUp.steps.stepOne}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"step mobile complete\">\n" +
    "          <div class=\"icon-container\">\n" +
    "            <i></i>\n" +
    "          </div>\n" +
    "          <span>{{::lang.signUp.steps.stepTwo}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"step basic-info current\">\n" +
    "          <div class=\"icon-container\">\n" +
    "            <i></i>\n" +
    "          </div>\n" +
    "          <span>{{::lang.signUp.steps.stepThree}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"step verify-id not-complete\">\n" +
    "          <div class=\"icon-container\">\n" +
    "            <i></i>\n" +
    "          </div>\n" +
    "          <span>{{::lang.signUp.steps.stepFour}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "      </div><!-- step-container -->\n" +
    "\n" +
    "      <form name=\"formBasicInfo\" ng-submit=\"updateProfile()\" novalidate>\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"formBasicInfo.$invalid && formBasicInfo.$submitted\">\n" +
    "          <span>{{::lang.verify.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"formBasicInfo.firstName.$invalid\">{{::lang.basicInfo.error.firstName}}</li>\n" +
    "            <li ng-show=\"formBasicInfo.lastName.$invalid\">{{::lang.basicInfo.error.lastName}}</li>\n" +
    "            <li ng-show=\"formBasicInfo.birthDate.$invalid\">{{::lang.basicInfo.error.birthDate}}</li>\n" +
    "            <li ng-show=\"formBasicInfo.address.$invalid\">{{::lang.basicInfo.error.street}}</li>\n" +
    "            <li ng-show=\"formBasicInfo.city.$invalid\">{{::lang.basicInfo.error.city}}</li>\n" +
    "            <li ng-show=\"formBasicInfo.state.$invalid\">{{::lang.basicInfo.error.state}}</li>\n" +
    "            <li ng-show=\"formBasicInfo.postal.$invalid\">{{::lang.basicInfo.error.postalCode}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <h4>{{::lang.basicInfo.personal}}</h4>\n" +
    "\n" +
    "        <div class=\"split-input-container\">\n" +
    "\n" +
    "          <div class=\"input-container\" ng-class=\"{valid:formBasicInfo.firstName.$valid}\">\n" +
    "            <label>{{::lang.basicInfo.firstName}}</label>\n" +
    "            <input type=\"text\" name=\"firstName\" ng-model=\"profile.firstName\" placeholder=\"{{::lang.basicInfo.firstNamePlaceholder}}\" required />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"input-container\" ng-class=\"{valid:formBasicInfo.lastName.$valid}\">\n" +
    "            <label>{{::lang.basicInfo.lastName}}</label>\n" +
    "            <input type=\"text\" name=\"lastName\" ng-model=\"profile.lastName\" placeholder=\"{{::lang.basicInfo.lastNamePlaceholder}}\" required />\n" +
    "          </div>\n" +
    "\n" +
    "        </div><!-- split-input-container -->\n" +
    "\n" +
    "        <div class=\"input-container valid\">\n" +
    "          <label>{{::lang.basicInfo.email}}</label>\n" +
    "          <input type=\"text\" name=\"email\" value=\"{{$root.profile.email}}\" readonly />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container valid\">\n" +
    "          <label>{{::lang.basicInfo.phone}}</label>\n" +
    "          <phone-input ng-model=\"$root.profile.phone\" country=\"basic.countryCode\" readonly />\n" +
    "        </div>\n" +
    "\n" +
    "        <div>\n" +
    "          <date-input name=\"birthDate\" label=\"{{::lang.basicInfo.birthDate}}\" ng-model=\"basic.dateOfBirth\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <h4>{{::lang.basicInfo.address}}</h4>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formBasicInfo.address.$valid}\">\n" +
    "          <label>{{::lang.basicInfo.street}}</label>\n" +
    "          <input type=\"text\" name=\"address\" ng-model=\"basic.street1\" placeholder=\"{{::lang.basicInfo.streetPlaceholder}}\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"off-center-split-input-container\">\n" +
    "\n" +
    "          <div class=\"input-container\" ng-class=\"{valid:formBasicInfo.city.$valid}\">\n" +
    "            <label>{{::lang.basicInfo.city}}</label>\n" +
    "            <input type=\"text\" name=\"city\" ng-model=\"basic.city\" placeholder=\"{{::lang.basicInfo.cityPlaceholder}}\" required />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"input-container\" ng-class=\"{valid:formBasicInfo.state.$valid}\">\n" +
    "            <label>{{::lang.basicInfo.state}}</label>\n" +
    "            <state-input name=\"state\" ng-model=\"basic.stateOrProvince\" country=\"{{basic.countryCode}}\" required />\n" +
    "          </div>\n" +
    "\n" +
    "        </div><!-- off-center-split-input-container -->\n" +
    "\n" +
    "        <div class=\"off-center-split-input-container\">\n" +
    "\n" +
    "          <div class=\"input-container valid\">\n" +
    "            <label>{{::lang.basicInfo.country}}</label>\n" +
    "            <country-input ng-model=\"basic.countryCode\" readonly />\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"input-container\" ng-class=\"{valid:formBasicInfo.postal.$valid}\">\n" +
    "            <label>{{::lang.basicInfo.postal}}</label>\n" +
    "            <input type=\"text\" name=\"postal\" ng-model=\"basic.zipOrPostalCode\" placeholder=\"{{::lang.basicInfo.postalPlaceholder}}\" required />\n" +
    "          </div>\n" +
    "\n" +
    "        </div><!-- off-center-split-input-container -->\n" +
    "\n" +
    "        <div class=\"cta-container\">\n" +
    "          <button type=\"submit\" class=\"medium-button\">\n" +
    "            {{::lang.basicInfo.submit}}\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "      </form>\n" +
    "\n" +
    "    </section><!-- box -->\n" +
    "\n" +
    "  </div><!-- _wrapper -->\n" +
    "\n" +
    "</section>\n" +
    "");
  $templateCache.put("tpl/views/footer/about_us.html",
    "<div></div>\n" +
    "");
  $templateCache.put("tpl/views/footer/atm_locations.html",
    "<div></div>\n" +
    "");
  $templateCache.put("tpl/views/footer/contact_us.html",
    "<div></div>\n" +
    "");
  $templateCache.put("tpl/views/footer/cookies.html",
    "<div></div>\n" +
    "");
  $templateCache.put("tpl/views/footer/disclosures.html",
    "<div></div>\n" +
    "");
  $templateCache.put("tpl/views/footer/investors.html",
    "<div></div>\n" +
    "");
  $templateCache.put("tpl/views/footer/privacy_security.html",
    "<div></div>\n" +
    "");
  $templateCache.put("tpl/views/footer/site_map.html",
    "<div></div>\n" +
    "");
  $templateCache.put("tpl/views/footer/terms_of_service.html",
    "<div></div>\n" +
    "");
  $templateCache.put("tpl/views/footer/transparency.html",
    "<div></div>\n" +
    "");
  $templateCache.put("tpl/views/footer/what_we_do.html",
    "<div></div>\n" +
    "");
  $templateCache.put("tpl/views/footer/why_gold.html",
    "<div></div>\n" +
    "");
  $templateCache.put("tpl/views/investments/investments.html",
    "<nav class=\"app-nav\">\n" +
    "\n" +
    "  <div class=\"_wrapper\">\n" +
    "\n" +
    "    <div class=\"menu-container\" include-template=\"tpl/views/menu.html\">\n" +
    "    </div><!-- menu-container -->\n" +
    "\n" +
    "  </div><!-- _wrapper -->\n" +
    "\n" +
    "</nav><!-- app-nav -->\n" +
    "\n" +
    "<div class=\"app-view-loading\" ng-show=\"loading\">\n" +
    "  <p>{{::lang.investments.loading}}</p>\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/views/menu.html",
    "<div class=\"app-menu\" ng-click=\"menu.visible=true\" outer-click=\"menu.visible=false\" ng-class=\"{ active: menu.visible }\">\n" +
    "  <i class=\"menu-icon\"></i>\n" +
    "  <a href=\"javascript:;\">\n" +
    "    {{lang.menu[menu.active]}}\n" +
    "  </a>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"app-menu-container\" ng-show=\"menu.visible\">\n" +
    "\n" +
    "  <ul>\n" +
    "    <li class=\"dashboard\">\n" +
    "      <a href=\"#/summary\" active-eval=\"menu.active='summary'\" active-link>\n" +
    "        <i></i>{{::lang.menu.summary}}\n" +
    "      </a>\n" +
    "    </li>\n" +
    "    <li class=\"wallet\">\n" +
    "      <a href=\"#/wallet\" active-eval=\"menu.active='wallet'\" active-link>\n" +
    "        <i></i>{{::lang.menu.wallet}}\n" +
    "      </a>\n" +
    "    </li>\n" +
    "    <li class=\"vault\">\n" +
    "      <a href=\"#/vault\" active-eval=\"menu.active='vault'\" active-link>\n" +
    "        <i></i>{{::lang.menu.vault}}\n" +
    "      </a>\n" +
    "    </li>\n" +
    "    <li class=\"investments\">\n" +
    "      <a href=\"#/investments\" active-eval=\"menu.active='investments'\" active-link>\n" +
    "        <i></i>{{::lang.menu.investments}}\n" +
    "      </a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "</div><!-- menu-drop-down -->\n" +
    "");
  $templateCache.put("tpl/views/sign_in.html",
    "<section class=\"account-flow\">\n" +
    "\n" +
    "  <div class=\"_wrapper\">\n" +
    "\n" +
    "    <section class=\"box\">\n" +
    "\n" +
    "      <header>\n" +
    "        <h2>{{::lang.signIn.title}}</h2>\n" +
    "      </header>\n" +
    "\n" +
    "      <form name=\"form\" ng-submit=\"signIn()\" novalidate>\n" +
    "\n" +
    "        <div class=\"alert success\" ng-if=\"emailVerified\">\n" +
    "          <span>{{::lang.signIn.emailVerified.title}}</span>\n" +
    "          <p>{{::lang.signIn.emailVerified.message}}</p>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"form.$invalid && form.$submitted\">\n" +
    "          <span>{{::lang.signIn.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"form.email.$invalid\">{{::lang.signIn.error.email}}</li>\n" +
    "            <li ng-show=\"form.password.$invalid\">{{::lang.signIn.error.password}}</li>\n" +
    "            <li ng-show=\"form.$error.wrong\">{{::lang.signIn.error.wrong}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\">\n" +
    "          <label>{{::lang.signIn.email}}</label>\n" +
    "          <input type=\"email\" name=\"email\" ng-change=\"resetError()\" ng-model=\"email\" placeholder=\"{{::lang.signIn.emailPlaceholder}}\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\">\n" +
    "          <label>{{::lang.signIn.password}}</label>\n" +
    "          <input type=\"password\" name=\"password\" ng-change=\"resetError()\" ng-model=\"password\" placeholder=\"{{::lang.signIn.passwordPlaceholder}}\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cta-container\">\n" +
    "\n" +
    "          <div class=\"col\">\n" +
    "            <div class=\"checkbox-container\">\n" +
    "              <input type=\"checkbox\" id=\"remember-me\" class=\"checkbox-toggle\">\n" +
    "              <label for=\"remember-me\"></label>\n" +
    "              <span>{{::lang.signIn.remember}}</span>\n" +
    "            </div>\n" +
    "          </div><!-- col -->\n" +
    "\n" +
    "          <div class=\"col\">\n" +
    "            <button type=\"submit\" class=\"action-button medium-button\">{{::lang.signIn.submit}}</button>\n" +
    "          </div>\n" +
    "\n" +
    "        </div><!-- input-container -->\n" +
    "\n" +
    "      </form>\n" +
    "\n" +
    "      <footer>\n" +
    "        <p><a href=\"javascript:;\" class=\"forgot-password\">{{::lang.signIn.forgot}}</a></p>\n" +
    "        <p>{{::lang.signIn.signUp.text}} <a href=\"#/sign-up\" class=\"link-button\">{{::lang.signIn.signUp.link}}</a></p>\n" +
    "      </footer>\n" +
    "\n" +
    "    </section><!-- box -->\n" +
    "\n" +
    "  </div><!-- wrapper -->\n" +
    "\n" +
    "</section>\n" +
    "");
  $templateCache.put("tpl/views/sign_up.html",
    "<section class=\"account-flow\">\n" +
    "\n" +
    "  <div class=\"_wrapper\">\n" +
    "\n" +
    "    <section class=\"box\">\n" +
    "\n" +
    "      <header>\n" +
    "        <h2>{{::lang.signUp.title}}</h2>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"signup-features-container\">\n" +
    "\n" +
    "        <div class=\"feature\">{{::lang.signUp.free}}</div>\n" +
    "\n" +
    "        <div class=\"feature\">{{::lang.signUp.secure}}</div>\n" +
    "\n" +
    "      </div><!-- signup-features-container -->\n" +
    "\n" +
    "      <form name=\"form\" ng-submit=\"signUp()\" ng-show=\"!success\" novalidate>\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"!form.$valid && form.$submitted\">\n" +
    "          <span>{{::lang.signUp.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"form.$error.conflict\">{{::lang.signUp.error.conflict}}</li>\n" +
    "            <li ng-show=\"form.email.$invalid\">{{::lang.signUp.error.email}}</li>\n" +
    "            <li ng-show=\"form.password.$invalid\">{{::lang.signUp.error.password}}</li>\n" +
    "            <li ng-show=\"form.repeatPassword.$error.match\">{{::lang.signUp.error.repeatPassword}}</li>\n" +
    "            <li ng-show=\"form.terms.$invalid\">{{::lang.signUp.error.terms}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{ valid: form.email.$valid }\">\n" +
    "          <label>{{::lang.signUp.email}}</label>\n" +
    "          <input type=\"email\" name=\"email\" ng-model=\"email\" ng-change=\"resetError()\" placeholder=\"{{::lang.signUp.emailPlaceholder}}\" required />\n" +
    "          <span class=\"meta\">{{::lang.signUp.emailMeta}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{ valid: form.password.$valid }\">\n" +
    "          <label>{{::lang.signUp.password}}</label>\n" +
    "          <input type=\"password\" name=\"password\" ng-model=\"password\" placeholder=\"{{::lang.signUp.passwordPlaceholder}}\" strong-password required />\n" +
    "          <strength-bar field=\"form.password\" />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{ valid: form.repeatPassword.$valid }\">\n" +
    "          <label>{{::lang.signUp.confirmPassword}}</label>\n" +
    "          <input type=\"password\" name=\"repeatPassword\" ng-model=\"repeatPassword\" placeholder=\"{{::lang.signUp.confirmPasswordPlaceholder}}\" match-password=\"password\" />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cta-container\">\n" +
    "\n" +
    "          <div class=\"col\">\n" +
    "            <div class=\"checkbox-container\">\n" +
    "              <input type=\"checkbox\" id=\"terms\" class=\"checkbox-toggle\" name=\"terms\" ng-model=\"terms\" required >\n" +
    "              <label for=\"terms\"></label>\n" +
    "              <span>{{::lang.signUp.terms}}</span>\n" +
    "            </div>\n" +
    "          </div><!-- col -->\n" +
    "\n" +
    "\n" +
    "          <div class=\"col\">\n" +
    "            <button type=\"submit\" class=\"medium-button\">{{::lang.signUp.open}}</button>\n" +
    "          </div>\n" +
    "\n" +
    "        </div><!-- input-container -->\n" +
    "\n" +
    "      </form>\n" +
    "\n" +
    "      <footer>\n" +
    "        <p>{{::lang.signUp.signIn.text}} <a href=\"#/sign-in\" class=\"link-button\">{{::lang.signUp.signIn.link}}</a></p>\n" +
    "      </footer>\n" +
    "\n" +
    "    </section><!-- box -->\n" +
    "\n" +
    "  </div><!-- _wrapper -->\n" +
    "\n" +
    "</section>\n" +
    "");
  $templateCache.put("tpl/views/sign_up_complete.html",
    "<section class=\"account-flow completion\">\n" +
    "\n" +
    "  <div class=\"_wrapper\">\n" +
    "\n" +
    "    <section class=\"box\">\n" +
    "\n" +
    "      <header>\n" +
    "        <h2>{{::lang.signUp.thankyou.title}}</h2>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"completion-illustration\">\n" +
    "        <i></i>\n" +
    "      </div>\n" +
    "\n" +
    "      <p class=\"text-block\">\n" +
    "        <strong>{{::lang.signUp.thankyou.paragraphTitle}}</strong>\n" +
    "        {{::lang.signUp.thankyou.paragraphText}}\n" +
    "      </p>\n" +
    "\n" +
    "      <footer>\n" +
    "        <a href=\"#/summary\" class=\"button medium-button\">{{::lang.signUp.continue}}</a>\n" +
    "      </footer>\n" +
    "\n" +
    "    </section><!-- box -->\n" +
    "\n" +
    "  </div><!-- _wrapper -->\n" +
    "\n" +
    "</section>\n" +
    "");
  $templateCache.put("tpl/views/summary/summary.html",
    "<nav class=\"app-nav\">\n" +
    "\n" +
    "  <div class=\"_wrapper\">\n" +
    "\n" +
    "    <div class=\"menu-container\" include-template=\"tpl/views/menu.html\">\n" +
    "    </div><!-- menu-container -->\n" +
    "\n" +
    "    <div class=\"sub-nav\">\n" +
    "      <a active-link href=\"#/summary/overview\">{{::lang.summary.overview.title}}</a>\n" +
    "      <a active-link href=\"#/summary/transactions\">{{::lang.summary.transactions.title}}</a>\n" +
    "      <a active-link href=\"#/summary/payments\">{{::lang.summary.payments.title}}</a>\n" +
    "      <a active-link href=\"#/summary/statements\">{{::lang.summary.statements.title}}</a>\n" +
    "      <a active-link href=\"#/summary/settings\">{{::lang.summary.settings.title}}</a>\n" +
    "    </div><!-- sub-nav -->\n" +
    "\n" +
    "    <div class=\"cta\">\n" +
    "      <a href=\"#/summary/funds\" class=\"button add-funds\">{{::lang.summary.funds.title}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "  </div><!-- _wrapper -->\n" +
    "\n" +
    "</nav><!-- app-nav -->\n" +
    "\n" +
    "<div class=\"app-view-loading\" ng-show=\"loading\">\n" +
    "  <p>{{::lang.summary.loading}}</p>\n" +
    "</div>\n" +
    "\n" +
    "<section class=\"app-view overview\" ng-if=\"view.overview\" ng-show=\"!loading\" include-template=\"tpl/views/summary/summary_overview.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view transactions\" ng-if=\"view.transactions\" ng-show=\"!loading\" include-template=\"tpl/views/summary/summary_transactions.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view payments\" ng-if=\"view.payments\" ng-show=\"!loading\" include-template=\"tpl/views/summary/summary_payments.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view statements\" ng-if=\"view.statements\" ng-show=\"!loading\" include-template=\"tpl/views/summary/summary_statements.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view settings\" ng-if=\"view.settings\" ng-show=\"!loading\" include-template=\"tpl/views/summary/summary_settings.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view funds\" ng-if=\"view.funds\"  ng-show=\"!loading\" include-template=\"tpl/views/summary/summary_funds.html\">\n" +
    "</section>\n" +
    "");
  $templateCache.put("tpl/views/summary/summary_balance.html",
    "<table>\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th colspan=\"2\">{{::lang.summary.balance.title}}</th>\n" +
    "      <th>{{::lang.summary.balance.total}}</th>\n" +
    "      <th>{{::lang.summary.balance.percentage}}</th>\n" +
    "      <th>{{::lang.summary.balance.change}}</th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"item in balance.sources\">\n" +
    "      <td ng-if=\"$index === 0\" rowspan=\"3\" class=\"chart\">\n" +
    "        <pie-chart data=\"balance.piechart\" />\n" +
    "      </td>\n" +
    "      <td class=\"first\">\n" +
    "        <a href=\"{{ '#/' + item.source }}\">\n" +
    "          <i ng-style=\"{ backgroundColor: lang.summary.colors[item.source] }\"></i>\n" +
    "          <span>{{::lang.summary.sources[item.source]}}</span>\n" +
    "        </a>\n" +
    "      </td>\n" +
    "      <td class=\"balance\">\n" +
    "        <span>\n" +
    "          {{lang.currencySymbol[$root.currency]}}\n" +
    "          {{item.value * $root.exchange[$root.currency][item.currency] | formatCurrency:2}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "      <td class=\"percentage\">\n" +
    "        <span>{{item.share | formatCurrency:2}}%</span>\n" +
    "      </div>\n" +
    "      <td class=\"change\">\n" +
    "        <span ng-class=\"{ up: item.change.daily > 0, down: item.change.daily < 0 }\">\n" +
    "          {{item.change.daily | formatCurrency:2}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "    <tr class=\"totals\">\n" +
    "      <td colspan=\"2\">\n" +
    "      </td>\n" +
    "      <td class=\"balance\">\n" +
    "        <span>\n" +
    "          {{::lang.currencySymbol[$root.currency]}}\n" +
    "          {{balance.value | formatCurrency:2}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "      <td class=\"percentage\">\n" +
    "        <span>100%</span>\n" +
    "      </td>\n" +
    "      <td class=\"change\">\n" +
    "        <span ng-class=\"{ up: balance.change.daily > 0, down: balance.change.daily < 0 }\">\n" +
    "          {{balance.change.daily | formatCurrency:2}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
  $templateCache.put("tpl/views/summary/summary_funds.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "    <i class=\"transactions-icon\"></i>\n" +
    "    <h2>{{::lang.summary.funds.title}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <section class=\"box\">\n" +
    "\n" +
    "    <form name=\"formAddFunds\" novalidate>\n" +
    "\n" +
    "      <fieldset>\n" +
    "\n" +
    "        <div class=\"cta-container\">\n" +
    "\n" +
    "          <button ng-click=\"funds.type='wallet'\" type=\"button\" class=\"medium-button\">\n" +
    "            {{::lang.summary.funds.wallet}}\n" +
    "          </button>\n" +
    "\n" +
    "          <button ng-click=\"funds.type='vault'\" type=\"button\" class=\"medium-button\">\n" +
    "            {{::lang.summary.funds.vault}}\n" +
    "          </button>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"!formDeposit.$valid && deposit.clicked\">\n" +
    "          <span>{{::lang.summary.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"!formAddFunds.method.$valid\">{{::lang.summary.error.methodValid}}</li>\n" +
    "            <li ng-show=\"!formAddFunds.currency.$valid\">{{::lang.summary.error.currencyValid}}</li>\n" +
    "            <li ng-show=\"!formAddFunds.location.$valid\">{{::lang.summary.error.locationValid}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formDeposit.method.$valid}\" ng-show=\"funds.type\">\n" +
    "          <label>{{::lang.summary.funds.method}}</label>\n" +
    "          <method-input name=\"method\" ng-model=\"funds.method\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formDeposit.currency.$valid}\" ng-show=\"funds.type\">\n" +
    "          <label>{{::lang.summary.funds.currency}}</label>\n" +
    "          <currency-input name=\"amount\" ng-model=\"funds.currency\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formDeposit.location.$valid}\" ng-show=\"funds.type === 'vault'\">\n" +
    "          <label>{{::lang.summary.funds.location}}</label>\n" +
    "          <location-input name=\"location\" ng-model=\"funds.location\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cta-container\" ng-show=\"funds.type\">\n" +
    "          <button ng-click=\"\" type=\"button\" class=\"medium-button\">{{::lang.summary.funds.submit}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "      </fieldset>\n" +
    "\n" +
    "    </form>\n" +
    "\n" +
    "  </section>\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/summary/summary_overview.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "    <i class=\"dashboard-icon\"></i>\n" +
    "    <h2>{{::lang.summary.title}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"summary-balance\" include-template=\"tpl/views/summary/summary_balance.html\"></div>\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "\n" +
    "    <div class=\"actions\">\n" +
    "      <a href=\"#/summary/transactions\" class=\"link-button\">{{::lang.summary.transactions.all}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <i class=\"transactions-icon\"></i>\n" +
    "    <h2 class=\"section-title\">{{::lang.summary.transactions.last}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"summary-transactions\">\n" +
    "    <div include-template=\"tpl/views/summary/summary_transaction_list.html\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/summary/summary_payments.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "    <i class=\"transactions-icon\"></i>\n" +
    "    <h2>{{::lang.summary.payments.title}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"summary-payments\">\n" +
    "  </div>\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/summary/summary_settings.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "\n" +
    "    <div class=\"actions\">\n" +
    "      <a href=\"javascript:;\" class=\"link-button\" ng-click=\"showPrefs()\">{{::lang.summary.settings.preferences}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <i class=\"settings-icon\"></i>\n" +
    "    <h2>{{::lang.summary.settings.title}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"summary-settings\">\n" +
    "\n" +
    "    <div include-template=\"tpl/views/summary/summary_settings_table.html\"></div>\n" +
    "    <div scope=\"parent\" include-template=\"tpl/views/summary/summary_settings_prefs.html\"></div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/summary/summary_settings_prefs.html",
    "<modal ng-model=\"displayPrefs\">\n" +
    "\n" +
    "  <div class=\"modal-box\">\n" +
    "\n" +
    "    <header>\n" +
    "      <a href=\"javascript:;\" ng-click=\"cancelPrefs()\" class=\"close-modal\"><i class=\"fa fa-times\"></i></a>\n" +
    "      <h2>{{::lang.summary.settings.preferences}}</h2>\n" +
    "    </header>\n" +
    "\n" +
    "    <form name=\"formPrefs\" ng-submit=\"savePrefs()\">\n" +
    "\n" +
    "      <fieldset>\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"!formPrefs.$valid && formPrefs.$submitted\">\n" +
    "          <span>{{::lang.summary.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"formPrefs.currency.$error.valid\">{{::lang.settings.error.currencyRequired}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid: formPrefs.currency.$valid}\">\n" +
    "          <label>{{::lang.summary.settings.currency}}</label>\n" +
    "          <currency-input name=\"currency\" ng-model=\"prefs.currency\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid: formPrefs.language.$valid}\">\n" +
    "          <label>{{::lang.summary.settings.language}}</label>\n" +
    "          <language-input name=\"language\" ng-model=\"prefs.language\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid: formPrefs.timezone.$valid}\">\n" +
    "          <label>{{::lang.summary.settings.timezone}}</label>\n" +
    "          <timezone-input name=\"timezone\" ng-model=\"prefs.timezone\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cta-container\">\n" +
    "          <button type=\"submit\" class=\"medium-button\">{{::lang.summary.settings.save}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "      </fieldset>\n" +
    "\n" +
    "    </form>\n" +
    "\n" +
    "  </div><!-- modal-box -->\n" +
    "\n" +
    "</modal><!-- modal-overlay -->\n" +
    "");
  $templateCache.put("tpl/views/summary/summary_settings_table.html",
    "<table>\n" +
    "  <tbody>\n" +
    "    <tr>\n" +
    "      <th rowspan=\"2\" valign=\"middle\">\n" +
    "        {{::lang.summary.settings.wallet}}\n" +
    "      </th>\n" +
    "      <td>\n" +
    "        {{::lang.summary.settings.verifyEmail}}\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        <a href=\"#/basic-info\">{{profile.email}}</a>\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        {{::lang.summary.settings.complete}}\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <td>\n" +
    "        {{::lang.summary.settings.verifyMobile}}\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        <a href=\"#/basic-info\">{{profile.phone}}</a>\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        {{::lang.summary.settings.complete}}\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <th rowspan=\"2\" valign=\"middle\">\n" +
    "        {{::lang.summary.settings.vault}}\n" +
    "      </th>\n" +
    "      <td>\n" +
    "        {{::lang.summary.settings.personalInfo}}\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        <a href=\"#/settings/personal\">{{::lang.summary.settings.edit}}</a>\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        {{::lang.summary.settings.incomplete}}\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <td>\n" +
    "        {{::lang.summary.settings.verifyID}}\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        <a href=\"#/settings/personal\">{{::lang.summary.settings.edit}}</a>\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        {{::lang.summary.settings.incomplete}}\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <th rowspan=\"2\" valign=\"middle\">\n" +
    "        {{::lang.summary.settings.investments}}\n" +
    "      </th>\n" +
    "      <td>\n" +
    "        {{::lang.summary.settings.investmentForms}}\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        <a href=\"#/settings/investments\">{{::lang.summary.settings.edit}}</a>\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        {{::lang.summary.settings.incomplete}}\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <td>\n" +
    "        {{::lang.summary.settings.verifyID}}\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        <a href=\"#/settings/personal\">{{::lang.summary.settings.edit}}</a>\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        {{::lang.summary.settings.incomplete}}\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
  $templateCache.put("tpl/views/summary/summary_statements.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "    <i class=\"transactions-icon\"></i>\n" +
    "    <h2>{{::lang.summary.statements.title}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"summary-statements\">\n" +
    "  </div>\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/summary/summary_transaction_list.html",
    "<table id=\"summary-tx-list\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th>{{::lang.summary.transactions.date}}</th>\n" +
    "      <th>{{::lang.summary.transactions.description}}</th>\n" +
    "      <th>{{::lang.summary.transactions.status}}</th>\n" +
    "      <th class=\"balance\">\n" +
    "        {{::lang.summary.transactions.amount}}\n" +
    "      </th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"item in transactions.all | orderBy : tx.sort | limitTo : tx.size\">\n" +
    "      <td>\n" +
    "        <span>{{item.date ? (item.date | formatDate) : '&nbsp;'}}</span>\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        {{item.description}}\n" +
    "      </td>\n" +
    "      <td ng-class=\"{ confirmed: item.status === 'confirmed' }\">\n" +
    "        <span ng-if=\"item.status === 'confirmed'\">\n" +
    "          {{::lang.summary.status.confirmed}}\n" +
    "        </span>\n" +
    "        <span ng-if=\"item.status === 'pending'\" tooltip=\"{{::lang.summary.tooltip.pending}}\">\n" +
    "          {{::lang.summary.status.pending}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "      <td class=\"balance\">\n" +
    "        <span>\n" +
    "          {{::lang.currencySymbol[$root.currency]}}\n" +
    "        </span>\n" +
    "        <span ng-class=\"{ left: item.amount > 0, right: item.amount < 0 }\">\n" +
    "          {{ item.amount * $root.exchange[$root.currency][item.currency] | formatCurrency : 2 }}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
  $templateCache.put("tpl/views/summary/summary_transactions.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "\n" +
    "    <div class=\"actions\">\n" +
    "\n" +
    "  		<div class=\"flyout-widget\">\n" +
    "\n" +
    "	  		<div class=\"select-dropdown\" ng-click=\"exportMenu=true\" outer-click=\"exportMenu=false\">\n" +
    "	  			<span>{{::lang.wallet.export}}</span>\n" +
    "	  		</div>\n" +
    "\n" +
    "	  		<div class=\"flyout-container icon-menu-flyout select-dropdown-flyout\" ng-class=\"{ active: exportMenu }\">\n" +
    "          <div class=\"inner\">\n" +
    "            <ul class=\"item-list\">\n" +
    "              <li>\n" +
    "                <pdf-button element=\"summary-tx-list\" filename=\"summary_transactions.pdf\">\n" +
    "                  <a href=\"javascript:;\"><i class=\"fa fa-file-pdf-o\"></i>{{::lang.wallet.pdf}}</a>\n" +
    "                </pdf-button>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <csv-button element=\"summary-tx-list\" filename=\"summary_transactions.csv\">\n" +
    "                  <a href=\"javascript:;\"><i class=\"fa fa-file-excel-o\"></i>{{::lang.wallet.csv}}</a>\n" +
    "                </csv-button>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </div><!-- flyout-container -->\n" +
    "\n" +
    "  		</div><!-- flyout-widget -->\n" +
    "\n" +
    "  	</div><!-- actions -->\n" +
    "\n" +
    "    <i class=\"transactions-icon\"></i>\n" +
    "    <h2>{{::lang.summary.transactions.title}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"summary-transactions\" include-template=\"tpl/views/summary/summary_transaction_list.html\">\n" +
    "  </div>\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/vault/vault.html",
    "<nav class=\"app-nav\">\n" +
    "\n" +
    "  <div class=\"_wrapper\">\n" +
    "\n" +
    "    <div class=\"menu-container\" include-template=\"tpl/views/menu.html\">\n" +
    "    </div><!-- menu-container -->\n" +
    "\n" +
    "    <div class=\"sub-nav\">\n" +
    "      <a active-link href=\"#/vault/overview\">{{::lang.vault.overview.title}}</a>\n" +
    "      <a active-link href=\"#/vault/transactions\">{{::lang.vault.transactions.title}}</a>\n" +
    "      <a active-link href=\"#/vault/deposit\">{{::lang.vault.deposit.title}}</a>\n" +
    "      <a active-link href=\"#/vault/withdraw\">{{::lang.vault.withdraw.title}}</a>\n" +
    "      <a active-link href=\"#/vault/goldcard\">{{::lang.vault.goldcard.title}}</a>\n" +
    "    </div><!-- sub-nav -->\n" +
    "\n" +
    "    <div class=\"cta\">\n" +
    "      <a href=\"#/vault/redeem\" class=\"button convert-to-gold\">{{::lang.vault.redeem.title}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "  </div><!-- _wrapper -->\n" +
    "\n" +
    "</nav><!-- app-nav -->\n" +
    "\n" +
    "<div class=\"app-view-loading\" ng-show=\"loading\">\n" +
    "  <p>{{::lang.vault.loading}}</p>\n" +
    "</div>\n" +
    "\n" +
    "<section class=\"app-view vault\" ng-if=\"view.overview\" ng-show=\"!loading\" include-template=\"tpl/views/vault/vault_overview.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view transactions\" ng-if=\"view.transactions\" ng-show=\"!loading\" include-template=\"tpl/views/vault/vault_transactions.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view deposit\" ng-if=\"view.deposit\" ng-show=\"!loading\" include-template=\"tpl/views/vault/vault_deposit.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view withdraw\" ng-if=\"view.withdraw\" ng-show=\"!loading\" include-template=\"tpl/views/vault/vault_withdraw.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view goldcard\" ng-if=\"view.goldcard\" ng-show=\"!loading\" include-template=\"tpl/views/vault/vault_goldcard.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view redeem\" ng-if=\"view.redeem\" ng-show=\"!loading\" include-template=\"tpl/views/vault/vault_redeem.html\">\n" +
    "</section>\n" +
    "");
  $templateCache.put("tpl/views/vault/vault_balance.html",
    "<table>\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th>{{::lang.vault.balance.name}}</th>\n" +
    "      <th>{{::lang.vault.balance.location}}</th>\n" +
    "      <th>{{::lang.vault.balance.custodian}}</th>\n" +
    "      <th>{{::lang.vault.balance.change}}</th>\n" +
    "      <th class=\"balance\">{{::lang.vault.balance.balance}}</th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"item in balance.locations\">\n" +
    "      <td>\n" +
    "          <label-input ng-model=\"item.label\" />\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        <span><i class=\"flag\" ng-class=\"item.country\"></i>{{item.location}}</span>\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        <span>{{item.custodian}}</span>\n" +
    "      </td>\n" +
    "      <td class=\"change\">\n" +
    "        <span ng-class=\"{\n" +
    "          up: item.change.daily > 0,\n" +
    "          down: item.change.daily < 0\n" +
    "        }\">\n" +
    "          {{item.change.daily | formatCurrency:3}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "      <td class=\"balance\">\n" +
    "        <span>{{item.value | formatCurrency:5}}</span>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "\n" +
    "    <tr class=\"totals\">\n" +
    "      <td colspan=\"3\">\n" +
    "          <span>{{::lang.vault.balance.total}}</span>\n" +
    "      </td>\n" +
    "      <td class=\"change\">\n" +
    "        <span ng-class=\"{\n" +
    "          up: balance.change.daily > 0,\n" +
    "          down: balance.change.daily < 0\n" +
    "        }\">\n" +
    "          {{balance.change.daily * $root.exchange[$root.currency]['XAU.gr'] | formatCurrency:5}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "      <td class=\"balance\">\n" +
    "        <span>{{balance.value * $root.exchange[$root.currency]['XAU.gr'] | formatCurrency:5}}</span>\n" +
    "      </span>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
  $templateCache.put("tpl/views/vault/vault_deposit.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "    <div class=\"center-heading\">\n" +
    "      <i class=\"sendpayment-icon\"></i>\n" +
    "      <h2>{{::lang.vault.deposit.title}}</h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <section class=\"box\">\n" +
    "\n" +
    "    <form name=\"formDeposit\" novalidate>\n" +
    "\n" +
    "      <fieldset>\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"!formDeposit.$valid && deposit.clicked\">\n" +
    "          <span>{{::lang.vault.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"formDeposit.method.$invalid\">{{::lang.vault.error.methodValid}}</li>\n" +
    "            <li ng-show=\"formDeposit.currency.$invalid\">{{::lang.vault.error.currencyValid}}</li>\n" +
    "            <li ng-show=\"formDeposit.location.$invalid\">{{::lang.vault.error.locationRequired}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formDeposit.method.$valid}\">\n" +
    "          <label>{{::lang.vault.deposit.method}}</label>\n" +
    "          <method-input name=\"method\" ng-model=\"deposit.method\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formDeposit.currency.$valid}\">\n" +
    "          <label>{{::lang.vault.deposit.currency}}</label>\n" +
    "          <currency-input name=\"amount\" ng-model=\"deposit.currency\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formDeposit.location.$valid}\">\n" +
    "          <label>{{::lang.vault.deposit.location}}</label>\n" +
    "          <location-input name=\"location\" ng-model=\"deposit.location\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cta-container\">\n" +
    "          <button ng-click=\"deposit.clicked = true; deposit.confirm = formDeposit.$valid;\" type=\"button\" class=\"medium-button\">{{::lang.vault.deposit.submit}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"dialog\" ng-show=\"deposit.confirm\">\n" +
    "          <button ng-click=\"deposit.confirm = false; deposit.clicked = false;\" type=\"submit\">{{::lang.vault.deposit.confirm}}</button>\n" +
    "          <button ng-click=\"deposit.confirm = false\" type=\"button\">{{::lang.vault.deposit.cancel}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "      </fieldset>\n" +
    "\n" +
    "    </form>\n" +
    "\n" +
    "  </section><!-- box -->\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/vault/vault_goldcard.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "    <div class=\"center-heading\">\n" +
    "      <i class=\"transactions-icon\"></i>\n" +
    "      <h2>{{::lang.vault.goldcard.title}}</h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <section class=\"box\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "  </section><!-- box -->\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/vault/vault_overview.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "    <i class=\"vault-icon\"></i>\n" +
    "    <h2>{{::lang.vault.title}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"vault-balance\" include-template=\"tpl/views/vault/vault_balance.html\"></div>\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "\n" +
    "    <div class=\"actions\">\n" +
    "      <a href=\"#/vault/transactions\" class=\"link-button\">{{::lang.vault.transactions.all}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <i class=\"transactions-icon\"></i>\n" +
    "    <h2 class=\"section-title\">{{::lang.vault.transactions.last}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"vault-transactions\">\n" +
    "    <div include-template=\"tpl/views/vault/vault_transaction_list.html\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/vault/vault_redeem.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "    <div class=\"center-heading\">\n" +
    "      <i class=\"transactions-icon\"></i>\n" +
    "      <h2>{{::lang.vault.redeem.title}}</h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <section class=\"box\">\n" +
    "\n" +
    "    <form name=\"formRedeem\" novalidate>\n" +
    "\n" +
    "      <fieldset>\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"!formRedeem.$valid && redeem.clicked\">\n" +
    "          <span>{{::lang.vault.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"!redeem.type\">{{::lang.vault.error.typeRequired}}</li>\n" +
    "            <li ng-show=\"formRedeem.amount.$error.required\">{{::lang.vault.error.amountRequired}}</li>\n" +
    "            <li ng-show=\"formRedeem.amount.$error.min\">{{::lang.vault.error.amountMinimum}}</li>\n" +
    "            <li ng-show=\"formRedeem.location.$error.required\">{{::lang.vault.error.locationRequired}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\">\n" +
    "          <label>{{::lang.vault.redeem.type}}</label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"radio\" value=\"physical\" name=\"type\" ng-model=\"redeem.type\" />\n" +
    "          <label>{{::lang.vault.type.physical}}</label>\n" +
    "        </div>\n" +
    "        <div class=\"input-container\">\n" +
    "          <input type=\"radio\" value=\"bitcoin\" name=\"type\" ng-model=\"redeem.type\" />\n" +
    "          <label>{{::lang.vault.type.bitcoin}}</label>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formRedeem.amount.$valid}\">\n" +
    "          <label>{{::lang.vault.redeem.amount}}</label>\n" +
    "          <amount-input name=\"amount\" ng-model=\"redeem.amount\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formRedeem.location.$valid}\">\n" +
    "          <label>{{::lang.vault.redeem.location}}</label>\n" +
    "          <location-input name=\"location\" ng-model=\"redeem.location\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cta-container\">\n" +
    "          <button ng-click=\"redeem.clicked = true; redeem.confirm = formRedeem.$valid;\" type=\"button\" class=\"medium-button\">{{::lang.vault.redeem.submit}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"dialog\" ng-show=\"redeem.confirm\">\n" +
    "          <button ng-click=\"redeem.confirm = false; redeem.clicked = false;\" type=\"submit\">{{::lang.vault.redeem.confirm}}</button>\n" +
    "          <button ng-click=\"redeem.confirm = false\" type=\"button\">{{::lang.vault.redeem.cancel}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "      </fieldset>\n" +
    "\n" +
    "    </form>\n" +
    "\n" +
    "  </section><!-- box -->\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/vault/vault_transaction_list.html",
    "<table id=\"vault-tx-list\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th>{{::lang.vault.transactions.date}}</th>\n" +
    "      <th>{{::lang.vault.transactions.description}}</th>\n" +
    "      <th>{{::lang.vault.transactions.status}}</th>\n" +
    "      <th class=\"balance\">\n" +
    "        {{::lang.vault.transactions.amount}}\n" +
    "      </th>\n" +
    "      <th>\n" +
    "      </th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"item in transactions | limitTo : tx.size\">\n" +
    "      <td>\n" +
    "        <span>{{item.date ? (item.date | formatDate) : '&nbsp;'}}</span>\n" +
    "      </td>\n" +
    "      <td>\n" +
    "\n" +
    "      </td>\n" +
    "      <td ng-class=\"{ confirmed: item.status === 'confirmed' }\">\n" +
    "        <span ng-if=\"item.status === 'confirmed'\">\n" +
    "            {{::lang.vault.status.confirmed}}\n" +
    "        </span>\n" +
    "        <span ng-if=\"item.status === 'pending'\" class=\"tooltip-multiline\" data-tooltip=\"{{::lang.vault.tooltip.pending}}\">\n" +
    "            {{::lang.vault.status.pending}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "      <td class=\"balance\">\n" +
    "        <span ng-class=\"{ left: item.amount > 0, right: item.amount < 0 }\" title=\"{{item.amount | formatCurrency : 5}}\">\n" +
    "          {{ item.amount | formatCurrency : 5 }}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        <a href=\"{{'#/vault/transactions/' + item.id}}\">{{::lang.vault.transactions.details}}</a>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
  $templateCache.put("tpl/views/vault/vault_transactions.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "\n" +
    "    <div class=\"actions\">\n" +
    "\n" +
    "      <div class=\"flyout-widget\">\n" +
    "\n" +
    "        <div class=\"select-dropdown\" ng-click=\"exportMenu=true\" outer-click=\"exportMenu=false\">\n" +
    "          <span>{{::lang.wallet.export}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"flyout-container icon-menu-flyout select-dropdown-flyout\" ng-class=\"{ active: exportMenu }\">\n" +
    "          <div class=\"inner\">\n" +
    "            <ul class=\"item-list\">\n" +
    "              <li>\n" +
    "                <pdf-button element=\"vault-tx-list\" filename=\"vault_transactions.pdf\">\n" +
    "                  <a href=\"javascript:;\"><i class=\"fa fa-file-pdf-o\"></i>{{::lang.wallet.pdf}}</a>\n" +
    "                </pdf-button>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <csv-button element=\"vault-tx-list\" filename=\"vault_transactions.csv\">\n" +
    "                  <a href=\"javascript:;\"><i class=\"fa fa-file-excel-o\"></i>{{::lang.wallet.csv}}</a>\n" +
    "                </csv-button>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </div><!-- flyout-container -->\n" +
    "\n" +
    "      </div><!-- flyout-widget -->\n" +
    "\n" +
    "    </div><!-- actions -->\n" +
    "\n" +
    "    <i class=\"transactions-icon\"></i>\n" +
    "    <h2>{{::lang.vault.transactions.title}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"vault-transactions\" include-template=\"tpl/views/vault/vault_transaction_list.html\">\n" +
    "  </div>\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/vault/vault_withdraw.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "    <div class=\"center-heading\">\n" +
    "      <i class=\"transactions-icon\"></i>\n" +
    "      <h2>{{::lang.vault.withdraw.title}}</h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <section class=\"box\">\n" +
    "\n" +
    "    <form name=\"formWithdraw\" novalidate>\n" +
    "\n" +
    "      <fieldset>\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"!formWithdraw.$valid && withdraw.clicked\">\n" +
    "          <span>{{::lang.vault.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"formWithdraw.amount.$error.required\">{{::lang.vault.error.amountRequired}}</li>\n" +
    "            <li ng-show=\"formWithdraw.amount.$error.min\">{{::lang.vault.error.amountMinimum}}</li>\n" +
    "            <li ng-show=\"formWithdraw.location.$error.required\">{{::lang.vault.error.locationRequired}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formWithdraw.method.$valid}\">\n" +
    "          <label>{{::lang.vault.withdraw.method}}</label>\n" +
    "          <select name=\"method\" ng-model=\"withdraw.method\" required>\n" +
    "            <option ng-repeat=\"item in lang.vault.methods\" value=\"{{item}}\">\n" +
    "              {{item}}\n" +
    "            </option>\n" +
    "          </select>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\">\n" +
    "          <label>{{::lang.vault.withdraw.details}}</label>\n" +
    "          <input type=\"text\" name=\"details\" ng-model=\"redeem.type\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formWithdraw.amount.$valid}\">\n" +
    "          <label>{{::lang.vault.withdraw.amount}}</label>\n" +
    "          <amount-input name=\"amount\" ng-model=\"withdraw.amount\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formWithdraw.location.$valid}\">\n" +
    "          <label>{{::lang.vault.withdraw.location}}</label>\n" +
    "          <location-input name=\"location\" ng-model=\"withdraw.location\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cta-container\">\n" +
    "          <button ng-click=\"withdraw.clicked = true; withdraw.confirm = formWithdraw.$valid;\" type=\"button\" class=\"medium-button\">{{::lang.vault.withdraw.submit}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"dialog\" ng-show=\"withdraw.confirm\">\n" +
    "          <button ng-click=\"withdraw.confirm = false; withdraw.clicked = false;\" type=\"submit\">{{::lang.vault.withdraw.confirm}}</button>\n" +
    "          <button ng-click=\"withdraw.confirm = false\" type=\"button\">{{::lang.vault.withdraw.cancel}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "      </fieldset>\n" +
    "\n" +
    "    </form>\n" +
    "\n" +
    "  </section><!-- box -->\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/verify_email.html",
    "<section class=\"account-flow\">\n" +
    "\n" +
    "  <div class=\"_wrapper\">\n" +
    "\n" +
    "    <!--\n" +
    "    //\n" +
    "    // Check Email Box\n" +
    "    //\n" +
    "    -->\n" +
    "    <section class=\"box check-email\">\n" +
    "\n" +
    "      <div class=\"outter-icon-container\">\n" +
    "\n" +
    "        <div class=\"inner-icon-container\"><i></i></div>\n" +
    "\n" +
    "      </div><!-- outter-icon-container -->\n" +
    "\n" +
    "      <div class=\"content-container\">\n" +
    "\n" +
    "        <h3>{{::lang.signUp.checkEmailHeading}}</h3>\n" +
    "\n" +
    "        <div class=\"text-container\">\n" +
    "          <p>{{::lang.signUp.checkLine1}}</p>\n" +
    "          <p class=\"data\">{{$root.profile.email}}</p>\n" +
    "          <p>{{::lang.signUp.checkLine2}}</p>\n" +
    "        </div>\n" +
    "\n" +
    "        <footer>\n" +
    "          <p>{{::lang.signUp.resend.text}} <a href=\"javascript:;\" class=\"link-button\" ng-click=\"resendEmail()\">{{::lang.signUp.resend.link}}</a></p>\n" +
    "        </footer>\n" +
    "\n" +
    "      </div><!-- content-container -->\n" +
    "\n" +
    "    </section><!-- box -->\n" +
    "\n" +
    "  </div><!-- _wrapper -->\n" +
    "\n" +
    "</section>\n" +
    "");
  $templateCache.put("tpl/views/verify_id.html",
    "<section class=\"account-flow\">\n" +
    "\n" +
    "  <div class=\"_wrapper\">\n" +
    "\n" +
    "    <section class=\"box\">\n" +
    "\n" +
    "      <header>\n" +
    "        <h2>{{::lang.verify.id.title}}</h2>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"step-container\">\n" +
    "\n" +
    "        <span class=\"divider\"></span>\n" +
    "        <span class=\"divider\"></span>\n" +
    "\n" +
    "        <div class=\"step email\">\n" +
    "          <div class=\"icon-container\">\n" +
    "            <i></i>\n" +
    "          </div>\n" +
    "          <span>{{::lang.signUp.steps.stepOne}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"step mobile complete\">\n" +
    "          <div class=\"icon-container\">\n" +
    "            <i></i>\n" +
    "          </div>\n" +
    "          <span>{{::lang.signUp.steps.stepTwo}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"step basic-info complete\">\n" +
    "          <div class=\"icon-container\">\n" +
    "            <i></i>\n" +
    "          </div>\n" +
    "          <span>{{::lang.signUp.steps.stepThree}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"step verify-id current\">\n" +
    "          <div class=\"icon-container\">\n" +
    "            <i></i>\n" +
    "          </div>\n" +
    "          <span>{{::lang.signUp.steps.stepFour}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "      </div><!-- step-container -->\n" +
    "\n" +
    "      <form name=\"formVerifyId\" ng-submit=\"verifyId()\" novalidate>\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"formVerifyId.$invalid && formVerifyId.$submitted\">\n" +
    "          <span>{{::lang.verify.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"formVerifyId.document.$invalid\">{{::lang.verify.error.document}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <p class=\"text-block\">\n" +
    "          <strong>{{::lang.verify.id.why.heading}}</strong>\n" +
    "          {{::lang.verify.id.why.text}}\n" +
    "        </p>\n" +
    "\n" +
    "        <image-input name=\"document\" ng-model=\"document\" required />\n" +
    "\n" +
    "      </form>\n" +
    "\n" +
    "    </section><!-- box -->\n" +
    "\n" +
    "  </div><!-- _wrapper -->\n" +
    "\n" +
    "</section>\n" +
    "");
  $templateCache.put("tpl/views/verify_mobile.html",
    "<section class=\"account-flow\">\n" +
    "\n" +
    "  <div class=\"_wrapper\">\n" +
    "\n" +
    "    <section class=\"box\">\n" +
    "\n" +
    "      <header>\n" +
    "        <h2>{{::lang.verify.mobile.title}}</h2>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"step-container\">\n" +
    "\n" +
    "        <span class=\"divider\"></span>\n" +
    "        <span class=\"divider\"></span>\n" +
    "\n" +
    "        <div class=\"step email\">\n" +
    "          <div class=\"icon-container\">\n" +
    "            <i></i>\n" +
    "          </div>\n" +
    "          <span>{{::lang.signUp.steps.stepOne}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"step mobile current\">\n" +
    "          <div class=\"icon-container\">\n" +
    "            <i></i>\n" +
    "          </div>\n" +
    "          <span>{{::lang.signUp.steps.stepTwo}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"step basic-info not-complete\">\n" +
    "          <div class=\"icon-container\">\n" +
    "            <i></i>\n" +
    "          </div>\n" +
    "          <span>{{::lang.signUp.steps.stepThree}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"step verify-id not-complete\">\n" +
    "          <div class=\"icon-container\">\n" +
    "            <i></i>\n" +
    "          </div>\n" +
    "          <span>{{::lang.signUp.steps.stepFour}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "      </div><!-- step-container -->\n" +
    "\n" +
    "      <form name=\"formSet\" ng-submit=\"setMobile()\" novalidate ng-show=\"!displayVerifyCode\">\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"formSet.$invalid && formSet.$submitted\">\n" +
    "          <span>{{::lang.verify.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"formSet.phone.$invalid\">{{::lang.verify.error.phone}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <p class=\"text-block\">\n" +
    "          <strong>{{::lang.verify.mobile.why.heading}}</strong>\n" +
    "          {{::lang.verify.mobile.why.text}}\n" +
    "        </p>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formSet.phone.$valid}\">\n" +
    "          <label>{{::lang.verify.mobile.phone}}</label>\n" +
    "          <phone-input name=\"phone\" ng-model=\"phone\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cta-container\">\n" +
    "          <button type=\"submit\" class=\"medium-button\">\n" +
    "            {{::lang.verify.mobile.send}}\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "      </form>\n" +
    "\n" +
    "      <form name=\"formVerify\" ng-submit=\"verifyMobile()\" novalidate ng-show=\"displayVerifyCode\">\n" +
    "\n" +
    "        <h3>{{::lang.verify.mobile.verifyHeading}}</h3>\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"formVerify.$invalid && formVerify.$submitted\">\n" +
    "          <span>{{::lang.verify.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"formVerify.$error.expired\">{{::lang.verify.error.expired}}</li>\n" +
    "            <li ng-show=\"formVerify.token.$invalid\">{{::lang.verify.error.token}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container center-small-input\">\n" +
    "          <input type=\"text\" name=\"token\" ng-model=\"token\" placeholder=\"{{::lang.verify.mobile.token}}\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cta-container\">\n" +
    "          <button type=\"submit\" class=\"medium-button\">\n" +
    "            {{::lang.verify.mobile.submit}}\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "      </form>\n" +
    "\n" +
    "      <footer ng-show=\"displayVerifyCode\">\n" +
    "        <p>{{::lang.verify.mobile.resend.text}} <a href=\"javascript:;\" class=\"link-button\" ng-click=\"resendCode()\">{{::lang.verify.mobile.resend.link}}</a></p>\n" +
    "      </footer>\n" +
    "\n" +
    "    </section><!-- box -->\n" +
    "\n" +
    "  </div><!-- _wrapper -->\n" +
    "\n" +
    "</section>\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet.html",
    "<nav class=\"app-nav\">\n" +
    "\n" +
    "  <div class=\"_wrapper\">\n" +
    "\n" +
    "    <div class=\"menu-container\" include-template=\"tpl/views/menu.html\">\n" +
    "    </div><!-- menu-container -->\n" +
    "\n" +
    "    <div class=\"sub-nav\">\n" +
    "      <a active-link href=\"#/wallet/overview\">{{::lang.wallet.balance.title}}</a>\n" +
    "      <a active-link href=\"#/wallet/transactions\">{{::lang.wallet.transactions.title}}</a>\n" +
    "      <a active-link href=\"#/wallet/send\">{{::lang.wallet.send.title}}</a>\n" +
    "      <a active-link href=\"#/wallet/receive\">{{::lang.wallet.receive.title}}</a>\n" +
    "      <a active-link href=\"#/wallet/contacts\">{{::lang.wallet.contacts.title}}</a>\n" +
    "    </div><!-- sub-nav -->\n" +
    "\n" +
    "    <div class=\"cta\">\n" +
    "      <a href=\"javascript:;\" ng-click=\"cg.show = true; cg.step = 1; cg.balance = balance;\" class=\"button convert-to-gold\">{{::lang.wallet.convert.title}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "  </div><!-- _wrapper -->\n" +
    "\n" +
    "</nav><!-- app-nav -->\n" +
    "\n" +
    "<div class=\"app-view-loading\" ng-show=\"loading\">\n" +
    "  <p>{{::lang.wallet.loading}}</p>\n" +
    "</div>\n" +
    "\n" +
    "<section class=\"app-view wallet\" ng-if=\"view.overview\" ng-show=\"!loading\" include-template=\"tpl/views/wallet/wallet_overview.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view send\" ng-if=\"view.send\" ng-show=\"!loading\" scope=\"parent\" include-template=\"tpl/views/wallet/wallet_send.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view receive\" ng-if=\"view.receive\" ng-show=\"!loading\" scope=\"parent\" include-template=\"tpl/views/wallet/wallet_receive.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view contacts\" ng-if=\"view.contacts\" ng-show=\"!loading\" include-template=\"tpl/views/wallet/wallet_contacts.html\">\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"app-view transcations\" ng-if=\"view.transactions\"  ng-show=\"!loading\" include-template=\"tpl/views/wallet/wallet_transactions.html\">\n" +
    "</section>\n" +
    "\n" +
    "<div scope=\"parent\" include-template=\"tpl/views/wallet/wallet_convert.html\"></div>\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet_add_contact.html",
    "<modal ng-model=\"ct.form\">\n" +
    "\n" +
    "  <div class=\"modal-box\">\n" +
    "\n" +
    "    <header>\n" +
    "      <a href=\"javascript:;\" ng-click=\"cancelContact()\" class=\"close-modal\"><i class=\"fa fa-times\"></i></a>\n" +
    "      <h2 ng-if=\"!ct.edit\">{{::lang.wallet.contacts.addTitle}}</h2>\n" +
    "      <h2 ng-if=\"ct.edit\">{{::lang.wallet.contacts.editTitle}}</h2>\n" +
    "    </header>\n" +
    "\n" +
    "    <form name=\"formContact\" ng-submit=\"saveContact()\">\n" +
    "\n" +
    "      <fieldset>\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"!formContact.$valid && formContact.$submitted\">\n" +
    "          <span>{{::lang.wallet.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"!formContact.address.$error.required && formContact.address.$error.valid\">{{::lang.wallet.error.addressValid}}</li>\n" +
    "            <li ng-show=\"formContact.address.$error.required\">{{::lang.wallet.error.addressRequired}}</li>\n" +
    "            <li ng-show=\"formContact.phone.$error.valid\">{{::lang.wallet.error.phoneValid}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid: formContact.address.$valid}\">\n" +
    "          <label>{{::lang.wallet.contacts.address}}</label>\n" +
    "          <address-input name=\"address\" ng-model=\"contact.address\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\">\n" +
    "          <label>{{::lang.wallet.contacts.name}}</label>\n" +
    "          <input type=\"text\" name=\"name\" ng-model=\"contact.name\" placeholder=\"{{::lang.wallet.contacts.namePlaceholder}}\" />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid: contact && contact.email && formContact.email.$valid }\">\n" +
    "          <label>{{::lang.wallet.contacts.email}}</label>\n" +
    "          <input type=\"email\" name=\"email\" placeholder=\"{{::lang.wallet.contacts.emailPlaceholder}}\" ng-model=\"contact.email\" />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid: contact && contact.phone && formContact.phone.$valid }\">\n" +
    "          <label>{{::lang.wallet.contacts.phone}}</label>\n" +
    "          <phone-input name=\"phone\" ng-model=\"contact.phone\" />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cta-container\">\n" +
    "          <button type=\"submit\" class=\"medium-button\">{{::lang.wallet.contacts.save}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "      </fieldset>\n" +
    "\n" +
    "    </form>\n" +
    "\n" +
    "  </div><!-- modal-box -->\n" +
    "\n" +
    "</div><!-- modal-overlay -->\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet_balance.html",
    "<table>\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th>{{::lang.wallet.balance.name}}</th>\n" +
    "      <th>{{::lang.wallet.balance.type}}</th>\n" +
    "      <th>{{::lang.wallet.balance.address}}</th>\n" +
    "      <th>{{::lang.wallet.balance.change}}</th>\n" +
    "      <th class=\"balance\">{{::lang.wallet.balance.balance}}</th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr>\n" +
    "      <td>\n" +
    "          <label-input ng-model=\"wallet.label\" />\n" +
    "      </td>\n" +
    "      <td>{{::lang.wallet.type.bitcoin}}</td>\n" +
    "      <td class=\"address\">\n" +
    "        <a href=\"javascript:;\" ng-click=\"displayAddress.show = true\" class=\"show\"><i></i>{{::lang.wallet.show}}</a>\n" +
    "        <a href=\"javascript:;\" ng-if=\"features.flash\" copy-button=\"wallet.address\" class=\"copy\"><i></i>{{::lang.wallet.copy}}</a>\n" +
    "      </td>\n" +
    "      <td class=\"change\">\n" +
    "        <span ng-class=\"{ up: balance.change.daily > 0, down: balance.change.daily < 0 }\">\n" +
    "          {{(balance.change.daily < 0 ? balance.change.daily * -1 : balance.change.daily) | formatCurrency:3}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "      <td class=\"balance\">\n" +
    "        <span>{{::lang.currencySymbol.BTC}} {{balance.value | formatCurrency:3}}</span>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "\n" +
    "    <tr class=\"totals\">\n" +
    "      <td colspan=\"3\">\n" +
    "          <span>{{::lang.wallet.balance.total}}</span>\n" +
    "      </td>\n" +
    "      <td class=\"change\">\n" +
    "        <span ng-class=\"{ up: balance.change.daily > 0, down: balance.change.daily < 0 }\">\n" +
    "          {{(balance.change.daily < 0 ? balance.change.daily * -1 : balance.change.daily) * $root.exchange[$root.currency].BTC | formatCurrency:2}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "      <td class=\"balance\">\n" +
    "        <span>{{$root.currency === 'XAU.gr' ? 'Gold Gram' : lang.currencySymbol[$root.currency]}}</span>\n" +
    "        <span>{{balance.value * $root.exchange[$root.currency].BTC | formatCurrency:2}}</span>\n" +
    "      </span>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "\n" +
    "<modal ng-model=\"displayAddress.show\" class=\"show-address-modal\">\n" +
    "\n" +
    "  <div class=\"modal-box\">\n" +
    "\n" +
    "    <header>\n" +
    "      <a href=\"javascript:;\" ng-click=\"displayAddress.show = false\" class=\"close-modal\"><i class=\"fa fa-times\"></i></a>\n" +
    "      <h2>{{::lang.wallet.walletAdressTitle}}</h2>\n" +
    "    </header>\n" +
    "\n" +
    "    <div class=\"label\">\n" +
    "      <span>{{wallet.label}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"qrcode\">\n" +
    "      <qrcode text=\"wallet.address\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"address-text\">\n" +
    "      <span>{{wallet.address}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "  </div><!-- modal-box -->\n" +
    "\n" +
    "</modal><!-- show-address-modal -->\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet_contact_list.html",
    "<table id=\"wallet-ct-list\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th>{{::lang.wallet.contacts.name}}</th>\n" +
    "      <th>{{::lang.wallet.contacts.address}}</th>\n" +
    "      <th>{{::lang.wallet.contacts.email}}</th>\n" +
    "      <th>{{::lang.wallet.contacts.phone}}</th>\n" +
    "      <th></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"contact in wallet.contacts | filter : ct.filter\">\n" +
    "      <td>{{contact.name}}</td>\n" +
    "      <td>{{contact.address}}</td>\n" +
    "      <td>{{contact.email}}</td>\n" +
    "      <td>{{contact.phone}}</td>\n" +
    "      <td class=\"small-col details-link\" data-csv=\"false\">\n" +
    "        <a href=\"{{'#/wallet/contacts/' + contact.address}}\">{{::lang.wallet.contacts.details}} <i class=\"fa fa-arrow-right\"></i></a>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet_contact_view.html",
    "<dl>\n" +
    "  <dt>{{::lang.wallet.contacts.name}}</dt>\n" +
    "  <dd>{{contact.name}}</dd>\n" +
    "  <dt>{{::lang.wallet.contacts.address}}</dt>\n" +
    "  <dd>{{contact.address}}</dd>\n" +
    "  <dt>{{::lang.wallet.contacts.email}}</dt>\n" +
    "  <dd>{{contact.email}}</dd>\n" +
    "  <dt>{{::lang.wallet.contacts.phone}}</dt>\n" +
    "  <dd>{{contact.phone}}</dd>\n" +
    "</dl>\n" +
    "\n" +
    "<a href=\"{{ '#/wallet/send/' + contact.address }}\">{{::lang.wallet.contacts.send}}</a>\n" +
    "\n" +
    "<a href=\"{{ '#/wallet/receive/' + contact.address }}\">{{::lang.wallet.contacts.receive}}</a>\n" +
    "\n" +
    "<button type=\"button\" ng-click=\"editContact(contact)\">{{::lang.wallet.contacts.edit}}</button>\n" +
    "\n" +
    "<button type=\"button\" ng-click=\"deleteContact(contact)\">{{::lang.wallet.contacts.delete}}</button>\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet_contacts.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "\n" +
    "  	<div class=\"actions\" ng-show=\"ct.list\">\n" +
    "\n" +
    "      <div class=\"input-container\">\n" +
    "        <input type=\"text\" ng-model=\"ct.filter\" placeholder=\"{{::lang.wallet.contacts.search}}\" />\n" +
    "      </div>\n" +
    "\n" +
    "    	<a href=\"javascript:;\" class=\"link-button\" ng-click=\"addContact()\">{{::lang.wallet.contacts.add}}</a>\n" +
    "\n" +
    "      <div class=\"flyout-widget\">\n" +
    "\n" +
    "        <div class=\"select-dropdown\" ng-click=\"exportContactMenu=true\" outer-click=\"exportContactMenu=false\">\n" +
    "          <span>{{::lang.wallet.export}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"flyout-container icon-menu-flyout select-dropdown-flyout\" ng-class=\"{ active: exportContactMenu }\">\n" +
    "          <div class=\"inner\">\n" +
    "            <ul class=\"item-list\">\n" +
    "              <li>\n" +
    "                <pdf-button element=\"wallet-ct-list\" filename=\"{{wallet.address + '_contacts.pdf'}}\">\n" +
    "                  <a href=\"javascript:;\"><i class=\"fa fa-file-pdf-o\"></i>{{::lang.wallet.pdf}}</a>\n" +
    "                </pdf-button>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <csv-button element=\"wallet-ct-list\" filename=\"{{wallet.address + '_contacts.csv'}}\">\n" +
    "                  <a href=\"javascript:;\"><i class=\"fa fa-file-excel-o\"></i>{{::lang.wallet.csv}}</a>\n" +
    "                </csv-button>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </div><!-- flyout-container -->\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <i class=\"contacts-icon\"></i>\n" +
    "    <h2>{{::lang.wallet.contacts.title}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"wallet-contact-list\" ng-show=\"ct.list\" include-template=\"tpl/views/wallet/wallet_contact_list.html\"></div>\n" +
    "  <div class=\"wallet-add-contact\" scope=\"parent\" include-template=\"tpl/views/wallet/wallet_add_contact.html\"></div>\n" +
    "  <div class=\"wallet-contact-view\" ng-show=\"ct.view\" include-template=\"tpl/views/wallet/wallet_contact_view.html\"></div>\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet_convert.html",
    "<modal ng-model=\"cg.show\" class=\"convert-to-gold-modal\">\n" +
    "\n" +
    "  <form name=\"formConvert\">\n" +
    "\n" +
    "    <!-- STEP 1 -->\n" +
    "    <div class=\"modal-box\" ng-show=\"cg.step == 1\">\n" +
    "\n" +
    "      <header>\n" +
    "        <a href=\"javascript:;\" ng-click=\"cg.show = false\" class=\"close-modal\"><i class=\"fa fa-times\"></i></a>\n" +
    "        <h2>{{::lang.wallet.convert.title}}</h2>\n" +
    "      </header>\n" +
    "\n" +
    "      <h3 class=\"dark\">{{::lang.wallet.convert.locationHeading}}</h3>\n" +
    "\n" +
    "      <div class=\"vault-location-map\">\n" +
    "\n" +
    "        <div class=\"map-pin toronto\" ng-class=\"{active: convert.location == lang.wallet.convert.toronto}\" ng-click=\"convert.location = lang.wallet.convert.toronto\">\n" +
    "          <i class=\"flag ca\"></i>\n" +
    "          <span>{{::lang.wallet.convert.toronto}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"map-pin new-york\" ng-class=\"{active: convert.location == lang.wallet.convert.newYork}\" ng-click=\"convert.location = lang.wallet.convert.newYork\">\n" +
    "          <i class=\"flag us\"></i>\n" +
    "          <span>{{::lang.wallet.convert.newYork}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"map-pin london\" ng-class=\"{active: convert.location == lang.wallet.convert.london}\" ng-click=\"convert.location = lang.wallet.convert.london\">\n" +
    "          <i class=\"flag gb\"></i>\n" +
    "          <span>{{::lang.wallet.convert.london}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"map-pin zurich\" ng-class=\"{active: convert.location == lang.wallet.convert.zurich}\" ng-click=\"convert.location = lang.wallet.convert.zurich\">\n" +
    "          <i class=\"flag ch\"></i>\n" +
    "          <span>{{::lang.wallet.convert.zurich}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"map-pin hong-kong\" ng-class=\"{active: convert.location == lang.wallet.convert.hongKong}\" ng-click=\"convert.location = lang.wallet.convert.hongKong\">\n" +
    "          <i class=\"flag hk\"></i>\n" +
    "          <span>{{::lang.wallet.convert.hongKong}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"map-pin singapore\" ng-class=\"{active: convert.location == lang.wallet.convert.singapore}\" ng-click=\"convert.location = lang.wallet.convert.singapore\">\n" +
    "          <i class=\"flag sg\"></i>\n" +
    "          <span>{{::lang.wallet.convert.singapore}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "      </div><!-- vault-location-map -->\n" +
    "\n" +
    "      <div class=\"input-container\" ng-class=\"{valid:formConvert.location.$valid}\">\n" +
    "        <label>{{::lang.wallet.convert.location}}</label>\n" +
    "        <location-input name=\"location\" ng-model=\"convert.location\" country=\"convert.country\" flag=\"convert.flag\" required />\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"cta-container\">\n" +
    "        <a href=\"javascript:;\" ng-click=\"cg.step = formConvert.location.$valid ? 2 : 1\" class=\"button medium-button\">{{::lang.wallet.convert.next}}</a>\n" +
    "      </div>\n" +
    "\n" +
    "    </div><!-- modal-box -->\n" +
    "\n" +
    "    <!-- STEP 2 -->\n" +
    "    <div class=\"modal-box\" ng-show=\"cg.step === 2\">\n" +
    "\n" +
    "      <header>\n" +
    "        <a href=\"javascript:;\" ng-click=\"cg.show = false\" class=\"close-modal\"><i class=\"fa fa-times\"></i></a>\n" +
    "        <h2>{{::lang.wallet.convert.title}}</h2>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"available-balance\">\n" +
    "\n" +
    "        <i></i>\n" +
    "\n" +
    "        <div class=\"balance-container\">\n" +
    "          <span>{{::lang.wallet.convert.availableBalance}}</span>\n" +
    "          <h2 ng-show=\"currencySwitch\">\n" +
    "            {{lang.currencySymbol[$root.currency]}}\n" +
    "            {{(cg.balance.value + cg.balance.unconfirmed) * $root.exchange[$root.currency].BTC | formatCurrency:2}}\n" +
    "          </h2>\n" +
    "          <h2 ng-show=\"!currencySwitch\">\n" +
    "            {{::lang.currencySymbol.BTC}}\n" +
    "            {{(cg.balance.value + cg.balance.unconfirmed) | formatCurrency:5}}\n" +
    "          </h2>\n" +
    "          <a href=\"javascript:;\" ng-click=\"currencySwitch = !currencySwitch\" class=\"switch-button\" data-tooltip=\"{{::lang.wallet.transactions.convert}}\">\n" +
    "            <i class=\"switch-icon\"></i>\n" +
    "          </a>\n" +
    "        </div><!-- balance-container -->\n" +
    "\n" +
    "      </div><!-- available-balance -->\n" +
    "\n" +
    "      <div class=\"input-container\" ng-class=\"{valid:formConvert.amount.$valid}\">\n" +
    "        <label>{{::lang.wallet.convert.amount}}</label>\n" +
    "        <amount-input name=\"amount\" ng-change=\"$root.convertGold(convert)\" ng-model=\"convert.amount\" input=\"convert.input\" required />\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"cta-container\">\n" +
    "        <a href=\"javascript:;\" ng-click=\"$root.convertGold(convert); cg.step = formConvert.amount.$valid ? 3 : 2;\" class=\"button medium-button\">{{::lang.wallet.convert.convert}}</a>\n" +
    "      </div>\n" +
    "\n" +
    "    </div><!-- modal-box -->\n" +
    "\n" +
    "      <!-- STEP 3 -->\n" +
    "    <div class=\"modal-box completion\" ng-show=\"cg.step === 3\">\n" +
    "\n" +
    "      <header>\n" +
    "        <a href=\"javascript:;\" ng-click=\"cg.show = false\" class=\"close-modal\"><i class=\"fa fa-times\"></i></a>\n" +
    "        <h2>{{::lang.wallet.convert.title}}</h2>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"completion-illustration\">\n" +
    "        <i></i>\n" +
    "      </div>\n" +
    "\n" +
    "      <p class=\"text-block\">\n" +
    "        {{::lang.wallet.convert.summary}}\n" +
    "      </p>\n" +
    "\n" +
    "      <div class=\"transaction-details\">\n" +
    "\n" +
    "        <div class=\"col\">\n" +
    "          <span>\n" +
    "            {{::lang.currencySymbol[convert.input.currency]}}\n" +
    "            {{convert.input.value}}\n" +
    "            {{convert.input.currency}}\n" +
    "          </span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col\">\n" +
    "          <span>\n" +
    "            {{convert.amount}}\n" +
    "            {{::lang.currencySymbol.BTC}}\n" +
    "          </span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col\">\n" +
    "          <span>\n" +
    "            {{convert.grams | formatCurrency:2}}g\n" +
    "            {{::lang.wallet.convert.gold}}\n" +
    "          </span>\n" +
    "        </div>\n" +
    "\n" +
    "      </div><!-- transaction-details -->\n" +
    "\n" +
    "      <p class=\"text-block\">\n" +
    "        {{::lang.wallet.convert.location}}\n" +
    "      </p>\n" +
    "\n" +
    "      <div class=\"location-details\">\n" +
    "\n" +
    "        <i class=\"flag\" ng-class=\"convert.flag\"></i>\n" +
    "        <img class=\"brinks-logo\" src=\"img/brinks-logo.png\" alt=\"Brinks\">\n" +
    "        <span>Brinks in {{convert.location}}, {{convert.country}}</span>\n" +
    "\n" +
    "      </div><!-- location-details -->\n" +
    "\n" +
    "      <footer>\n" +
    "        <a href=\"javascript:;\" ng-click=\"cg.show = false;\" class=\"link-button\">{{::lang.wallet.convert.close}}</a>\n" +
    "      </footer>\n" +
    "\n" +
    "    </div><!-- modal-box -->\n" +
    "\n" +
    "  </form>\n" +
    "\n" +
    "</modal><!-- modal -->\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet_overview.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "    <i class=\"wallet-icon\"></i>\n" +
    "    <h2>{{::lang.wallet.title}}</h2>\n" +
    "  </div><!-- section-heading -->\n" +
    "\n" +
    "  <div class=\"wallet-balance\" include-template=\"tpl/views/wallet/wallet_balance.html\"></div>\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "\n" +
    "    <div class=\"actions\">\n" +
    "      <a href=\"#/wallet/transactions\" class=\"link-button\">{{::lang.wallet.transactions.all}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <i class=\"transactions-icon\"></i>\n" +
    "    <h2 class=\"section-title\">{{::lang.wallet.transactions.last}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"wallet-transactions\">\n" +
    "    <div include-template=\"tpl/views/wallet/wallet_transaction_list.html\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet_receive.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "    <div class=\"center-heading\">\n" +
    "      <i class=\"receivepayment-icon\"></i>\n" +
    "      <h2>{{::lang.wallet.receive.title}}</h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <section class=\"box\">\n" +
    "\n" +
    "    <form name=\"formReceive\" ng-submit=\"requestPayment()\">\n" +
    "      <fieldset>\n" +
    "        <div class=\"input-container\">\n" +
    "          <label>{{::lang.wallet.receive.email}}:</label>\n" +
    "          <email-input contacts=\"wallet.contacts\" name=\"email\" ng-model=\"receive.email\" />\n" +
    "        </div>\n" +
    "        <div class=\"input-container\">\n" +
    "          <label>{{::lang.wallet.receive.amount}}:</label>\n" +
    "          <amount-input ng-model=\"receive.amount\" />\n" +
    "        </div>\n" +
    "        <div class=\"cta-container\">\n" +
    "          <button type=\"button\" class=\"medium-button\" ng-click=\"showQRCode()\">{{::lang.wallet.receive.qrcode}}</button>\n" +
    "        </div>\n" +
    "        <div class=\"field\" ng-show=\"receive.qrcode\">\n" +
    "          <qrcode text=\"receive.uri\"></qrcode>\n" +
    "          <div class=\"buttons\">\n" +
    "            <button ng-if=\"features.flash\" copy-button=\"receive.uri\" class=\"button-copy\" type=\"button\">{{::lang.wallet.receive.copy}}</button>\n" +
    "            <button class=\"button-mail\"type=\"submit\">{{::lang.wallet.receive.mail}}</button>\n" +
    "            <button class=\"button-close\"type=\"button\" ng-click=\"hideQRCode()\">{{::lang.wallet.receive.close}}</button>\n" +
    "        </div>\n" +
    "      </fieldset>\n" +
    "    </form>\n" +
    "\n" +
    "  </section><!-- box -->\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet_send.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "    <div class=\"center-heading\">\n" +
    "      <i class=\"sendpayment-icon\"></i>\n" +
    "      <h2>{{::lang.wallet.send.title}}</h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <section class=\"box\">\n" +
    "\n" +
    "    <form name=\"formSend\" ng-submit=\"sendPayment()\" novalidate>\n" +
    "\n" +
    "      <fieldset>\n" +
    "\n" +
    "        <div class=\"alert error\" ng-show=\"!formSend.$valid && send.clicked\">\n" +
    "          <span>{{::lang.wallet.error.title}}</span>\n" +
    "          <ul>\n" +
    "            <li ng-show=\"formSend.to.$error.self\">{{::lang.wallet.error.toSelf}}</li>\n" +
    "            <li ng-show=\"formSend.to.$error.valid\">{{::lang.wallet.error.toValid}}</li>\n" +
    "            <li ng-show=\"formSend.to.$error.required\">{{::lang.wallet.error.toRequired}}</li>\n" +
    "            <li ng-show=\"formSend.amount.$error.required\">{{::lang.wallet.error.amountRequired}}</li>\n" +
    "            <li ng-show=\"formSend.amount.$error.min\">{{::lang.wallet.error.amountMinimun}}</li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formSend.to.$valid}\">\n" +
    "          <label>{{::lang.wallet.send.to}}:</label>\n" +
    "          <address-input name=\"to\" ng-model=\"send.to\" self=\"wallet.address\" contacts=\"wallet.contacts\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"input-container\" ng-class=\"{valid:formSend.amount.$valid}\">\n" +
    "          <div class=\"available-amount\">\n" +
    "            {{::lang.wallet.send.available}}\n" +
    "            <span ng-show=\"currencySwitch\">\n" +
    "              {{lang.currencySymbol[$root.currency]}}\n" +
    "              {{(balance.value + balance.unconfirmed) * $root.exchange[$root.currency].BTC | formatCurrency:2}}\n" +
    "            </span>\n" +
    "            <span ng-show=\"!currencySwitch\">\n" +
    "              {{::lang.currencySymbol.BTC}}\n" +
    "              {{(balance.value + balance.unconfirmed) | formatCurrency:5}}\n" +
    "            </span>\n" +
    "          </div>\n" +
    "          <label>{{::lang.wallet.send.amount}}:</label>\n" +
    "          <amount-input name=\"amount\" ng-model=\"send.amount\" required />\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"cta-container\">\n" +
    "          <button ng-click=\"send.clicked = true; send.confirm = formSend.$valid;\" type=\"button\" class=\"medium-button\">{{::lang.wallet.send.submit}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"dialog\" ng-show=\"send.confirm\">\n" +
    "          <p compile=\"send.confirm\" ng-bind-html=\"lang.wallet.send.confirmation\"></p>\n" +
    "          <button ng-click=\"send.confirm = false; send.clicked = false;\" type=\"submit\">{{::lang.wallet.send.confirm}}</button>\n" +
    "          <button ng-click=\"send.confirm = false\" type=\"button\">{{::lang.wallet.send.cancel}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "      </fieldset>\n" +
    "\n" +
    "    </form>\n" +
    "\n" +
    "  </section><!-- box -->\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet_transaction_list.html",
    "<table id=\"wallet-tx-list\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th>{{::lang.wallet.transactions.date}}</th>\n" +
    "      <th>{{::lang.wallet.transactions.description}}</th>\n" +
    "      <th>{{::lang.wallet.transactions.status}}</th>\n" +
    "      <th class=\"balance\">\n" +
    "        <a href=\"javascript:;\" data-tooltip=\"{{::lang.wallet.transactions.convert}}\" ng-click=\"applyCurrencySwitch()\">\n" +
    "          <i class=\"icon switch-icon\"></i>\n" +
    "        </a>\n" +
    "        {{::lang.wallet.transactions.amount}}\n" +
    "      </th>\n" +
    "      <th data-csv=\"false\">\n" +
    "      </th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr\n" +
    "      ng-repeat=\"item in transactions | limitTo : tx.size\"\n" +
    "      ng-init=\"item.contact = getTxContact(item); item.address = item.amount > 0 ? item.from[0] : item.to[0];\"\n" +
    "    >\n" +
    "      <td>\n" +
    "        <span>{{item.date ? (item.date | formatDate) : '&nbsp;'}}</span>\n" +
    "      </td>\n" +
    "      <td>\n" +
    "        <span ng-if=\"item.contact\">\n" +
    "          <a href=\"{{'#/wallet/contacts/' + item.contact.address}}\">\n" +
    "            {{item.contact.name}}\n" +
    "          </a>\n" +
    "        </span>\n" +
    "        <span ng-if=\"!item.contact\">\n" +
    "          {{item.address}}\n" +
    "          <a href=\"{{'#/wallet/contacts/' + item.address}}\">\n" +
    "            <i class=\"icon add-contact-icon\"></i>\n" +
    "          </a>\n" +
    "        </span>\n" +
    "      </td>\n" +
    "      <td ng-class=\"{ confirmed: item.confirmations > 0 }\">\n" +
    "        <span ng-if=\"item.confirmations > 0\">\n" +
    "          {{::lang.wallet.transactions.confirmed}}\n" +
    "        </span>\n" +
    "        <span ng-if=\"item.confirmations === 0\" data-tooltip=\"{{::lang.wallet.tooltip.pending}}\">\n" +
    "          {{::lang.wallet.transactions.pending}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "      <td class=\"balance\">\n" +
    "        <span>\n" +
    "          {{ currencySwitch ? lang.currencySymbol[$root.currency] : lang.currencySymbol.BTC }}\n" +
    "        </span>\n" +
    "        <span ng-class=\"{ left: item.amount > 0, right: item.amount < 0 }\" title=\"{{item.amount | formatCurrency:5}}\">\n" +
    "          {{ currencySwitch ? (item.amount * $root.exchange[$root.currency].BTC | formatCurrency) : (item.amount | formatCurrency:3) }}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "      <td class=\"small-col details-link\" data-csv=\"false\">\n" +
    "        <a href=\"{{'#/wallet/transactions/' + item.hash}}\">{{::lang.wallet.transactions.details}} <i class=\"fa fa-arrow-right\"></i></a>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "\n" +
    "<div class=\"transactions-more\" ng-show=\"tx.more\">\n" +
    "  <button ng-click=\"loadTransactions()\" type=\"button\">{{::lang.wallet.transactions.more}}</button>\n" +
    "</div>\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet_transaction_view.html",
    "<dl>\n" +
    "  <dt>{{::lang.wallet.transactions.from}}</dt>\n" +
    "  <dd>\n" +
    "      <span ng-if=\"tx.item.fromContact\">\n" +
    "        <a href=\"{{'#/wallet/contacts/' + tx.item.fromContact.address}}\">\n" +
    "          {{tx.item.fromContact.name}}\n" +
    "        </a>\n" +
    "      </span>\n" +
    "      <span ng-if=\"!tx.item.fromContact\">\n" +
    "        {{tx.item.from[0]}}\n" +
    "        <a href=\"{{'#/wallet/contacts/' + tx.item.from[0]}}\">\n" +
    "          {{::lang.wallet.transactions.add}}\n" +
    "        </a>\n" +
    "      </span>\n" +
    "  </dd>\n" +
    "  <dt>{{::lang.wallet.transactions.to}}</dt>\n" +
    "  <dd>\n" +
    "    <span ng-if=\"tx.item.toContact\">\n" +
    "      <a href=\"{{'#/wallet/contacts/' + tx.item.toContact.address}}\">\n" +
    "        {{tx.item.toContact.name}}\n" +
    "      </a>\n" +
    "    </span>\n" +
    "    <span ng-if=\"!tx.item.toContact\">\n" +
    "      {{tx.item.to[0]}}\n" +
    "      <a href=\"{{'#/wallet/contacts/' + tx.item.to[0]}}\">\n" +
    "        {{::lang.wallet.transactions.add}}\n" +
    "      </a>\n" +
    "    </span>\n" +
    "  </dd>\n" +
    "  <dt>{{::lang.wallet.transactions.amount}}</dt>\n" +
    "  <dd>{{tx.item.amount}}</dd>\n" +
    "  <dt>{{::lang.wallet.transactions.confirmations}}</dt>\n" +
    "  <dd>{{tx.item.confirmations}}</dd>\n" +
    "  <dt>{{::lang.wallet.transactions.date}}</dt>\n" +
    "  <dd>{{tx.item.date}}</dd>\n" +
    "</dl>\n" +
    "");
  $templateCache.put("tpl/views/wallet/wallet_transactions.html",
    "<div class=\"_wrapper\">\n" +
    "\n" +
    "  <div class=\"section-heading\">\n" +
    "\n" +
    "    <div class=\"actions\">\n" +
    "\n" +
    "  		<div class=\"flyout-widget\">\n" +
    "\n" +
    "	  		<div class=\"select-dropdown\" ng-click=\"exportTransactionMenu=true\" outer-click=\"exportTransactionMenu=false\">\n" +
    "	  			<span>{{::lang.wallet.export}}</span>\n" +
    "	  		</div>\n" +
    "\n" +
    "	  		<div class=\"flyout-container icon-menu-flyout select-dropdown-flyout\" ng-class=\"{ active: exportTransactionMenu }\">\n" +
    "          <div class=\"inner\">\n" +
    "            <ul class=\"item-list\">\n" +
    "              <li>\n" +
    "                <pdf-button export=\"loadAllTransactions(callback)\" element=\"wallet-tx-list\" filename=\"{{wallet.address + '_transactions.pdf'}}\">\n" +
    "                  <a href=\"javascript:;\"><i class=\"fa fa-file-pdf-o\"></i>{{::lang.wallet.pdf}}</a>\n" +
    "                </pdf-button>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <csv-button export=\"loadAllTransactions(callback)\" element=\"wallet-tx-list\" filename=\"{{wallet.address + '_transactions.csv'}}\">\n" +
    "                  <a href=\"javascript:;\"><i class=\"fa fa-file-excel-o\"></i>{{::lang.wallet.csv}}</a>\n" +
    "                </csv-button>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </div><!-- flyout-container -->\n" +
    "\n" +
    "  		</div><!-- flyout-widget -->\n" +
    "\n" +
    "  	</div><!-- actions -->\n" +
    "\n" +
    "    <i class=\"transactions-icon\"></i>\n" +
    "    <h2>{{::lang.wallet.transactions.title}}</h2>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"wallet-transactions\">\n" +
    "    <div ng-if=\"tx.list\" include-template=\"tpl/views/wallet/wallet_transaction_list.html\"></div>\n" +
    "    <div ng-if=\"tx.view\" include-template=\"tpl/views/wallet/wallet_transaction_view.html\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "</div><!-- _wrapper -->\n" +
    "");
}]);
