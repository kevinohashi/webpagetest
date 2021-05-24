import*as RootModule from'../root/root.js';RootModule.Runtime.cachedResources.set("color_picker/spectrum.css","/* https://github.com/bgrins/spectrum */\n\n:host {\n  width: 232px;\n  height: 319px;\n  user-select: none;\n  overflow: hidden;\n}\n\n:selection {\n  background-color: blue;\n  color: white;\n}\n\n.spectrum-color {\n  position: relative;\n  width: 232px;\n  height: 124px;\n  border-radius: 2px 2px 0 0;\n  overflow: hidden;\n  flex: none;\n}\n\n.spectrum-dragger,\n.spectrum-slider {\n  user-select: none;\n}\n\n.spectrum-dragger {\n  border-radius: 12px;\n  height: 12px;\n  width: 12px;\n  border: 1px solid white;\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  background: black;\n  box-shadow: 0 0 2px 0 rgb(0 0 0 / 24%);\n}\n\n.spectrum-slider {\n  position: absolute;\n  top: -1px;\n  cursor: pointer;\n  width: 13px;\n  height: 13px;\n  border-radius: 13px;\n  background-color: rgb(248 248 248);\n  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 37%);\n}\n\n.spectrum-color:focus .spectrum-dragger {\n  border: 1px solid var(--accent-color-hover);\n}\n\n.spectrum-tools {\n  position: relative;\n  height: 111px;\n  width: 100%;\n  flex: none;\n}\n\n.spectrum-hue {\n  top: 16px;\n  background: linear-gradient(to left, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n}\n\n.spectrum-alpha {\n  top: 35px;\n  background-image: url(Images/checker.png);\n  background-size: 12px 11px;\n}\n\n.spectrum-alpha-background {\n  height: 100%;\n  border-radius: 2px;\n}\n\n.spectrum-hue,\n.spectrum-alpha {\n  position: absolute;\n  left: 86px;\n  width: 130px;\n  height: 11px;\n  border-radius: 2px;\n}\n\n.spectrum-hue:focus-visible .spectrum-slider,\n.spectrum-alpha:focus-visible .spectrum-slider {\n  border: 1px solid var(--accent-color-hover);\n  width: 14px;\n  height: 14px;\n  border-radius: 14px;\n}\n\n.spectrum-sat,\n.-theme-preserve {\n  background-image: linear-gradient(to right, white, rgb(204 154 129 / 0%));\n}\n\n.spectrum-val,\n.-theme-preserve {\n  background-image: linear-gradient(to top, black, rgb(204 154 129 / 0%));\n}\n\n.spectrum-contrast-details {\n  position: relative;\n  background-color: var(--color-background);\n  width: 100%;\n  height: 83px;\n  top: 0;\n  font-size: 13px;\n  color: #333;\n  border-top: var(--divider-border);\n  line-height: initial;\n  overflow: hidden;\n  flex: none;\n}\n\n.spectrum-contrast-details.collapsed {\n  height: 36px;\n  flex: none;\n}\n\n.spectrum-contrast-details div.toolbar.expand {\n  position: absolute;\n  right: 6px;\n  top: 6px;\n  margin: 0;\n}\n\n.spectrum-contrast-details.visible {\n  display: initial;\n}\n\n.spectrum-contrast-details div.container {\n  margin: 10px;\n}\n\n.spectrum-contrast-details .expanded-details {\n  display: flex;\n  margin: 12px 12px 0 4px;\n}\n\n.spectrum-contrast-details.collapsed .expanded-details {\n  display: none;\n}\n\n.contrast-pass-fail {\n  margin-left: 0.5em;\n  display: flex;\n  align-items: center;\n}\n\n.contrast-choose-bg-color {\n  margin: 8px 0 0 5px;\n  font-style: italic;\n}\n\n.spectrum-contrast-details .contrast-choose-bg-color,\n.spectrum-contrast-details .contrast-thresholds {\n  width: 150px;\n}\n\n.contrast-threshold:first-child {\n  margin-bottom: 5px;\n}\n\n.contrast-fix-button {\n  cursor: pointer;\n  font-size: 13px;\n  padding: 0;\n  margin: 0 0 0 10px;\n  background: 0;\n  width: 12px;\n  height: 12px;\n  border: 1px solid rgb(0 0 0 / 10%);\n  display: inline-block;\n  position: relative;\n}\n\n.contrast-fix-button::after {\n  content: \" \";\n  width: 13px;\n  height: 13px;\n  background-image: url(Images/ic_suggest_color.svg);\n  background-size: contain;\n  position: absolute;\n  left: 5.5px;\n  top: 3.5px;\n  background-color: var(--color-background);\n  border-radius: 50%;\n}\n\n:host-context(.-theme-with-dark-background) .contrast-fix-button::after {\n  background-color: rgb(36 36 36);\n}\n\n.contrast-fix-button:hover,\n.contrast-fix-button:focus {\n  border: 1px solid var(--accent-color-hover);\n  transform: scale(1.2);\n}\n\n.contrast-link-label {\n  cursor: pointer;\n}\n\n.contrast-link-label:hover {\n  text-decoration: underline;\n}\n\n.spectrum-contrast-details .background-color {\n  position: absolute;\n  flex: none;\n  right: 12px;\n}\n\n.spectrum-eye-dropper {\n  width: 32px;\n  height: 24px;\n  position: relative;\n  left: 8px;\n  top: 17px;\n  cursor: pointer;\n}\n\n.spectrum-contrast-details .spectrum-eye-dropper {\n  top: 2px;\n  right: 34px;\n  position: absolute;\n  left: auto;\n}\n\n.contrast-details-value {\n  color: #333;\n  margin: 1px 5px;\n  user-select: text;\n}\n\n.contrast-details-value [is=ui-icon] {\n  display: none;\n  margin-left: 5px;\n  background-color: #333;\n}\n\n.spectrum-contrast-details .toolbar-state-on [is=ui-icon] {\n  background-color: rgb(110 110 110);\n}\n\n[is=ui-icon].smallicon-no {\n  background-color: red;\n}\n\n.contrast-pass-fail span[is=ui-icon] {\n  margin-left: 5px;\n}\n\n[is=ui-icon].smallicon-checkmark-square,\n[is=ui-icon].smallicon-checkmark-behind {\n  background-color: #00b06f;\n}\n\n.spectrum-contrast-details .contrast-details-value.contrast-unknown {\n  background-color: var(--color-background);\n  color: #333;\n  width: 3em;\n  text-align: center;\n}\n\n.contrast-details-value .smallicon-checkmark-behind {\n  margin-left: -6px;\n}\n\n.contrast-details-value .smallicon-no,\n.contrast-details-value .smallicon-checkmark-square,\n.contrast-details-value .smallicon-checkmark-behind {\n  cursor: pointer;\n}\n\n.spectrum-contrast-details.contrast-fail .contrast-details-value .smallicon-no,\n.contrast-details-value.contrast-aa .smallicon-checkmark-square,\n.contrast-details-value.contrast-aaa .smallicon-checkmark-behind {\n  display: inline-block;\n}\n\n.swatch {\n  width: 32px;\n  height: 32px;\n  margin: 0;\n  position: absolute;\n  top: 15px;\n  left: 44px;\n  background-image: url(Images/checker.png);\n  border-radius: 16px;\n}\n\n.swatch-inner,\n.swatch-overlay {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  display: inline-block;\n  border-radius: 16px;\n}\n\n.swatch-inner-white {\n  border: 1px solid #ddd;\n}\n\n.swatch-overlay {\n  cursor: pointer;\n  opacity: 0%;\n  padding: 4px;\n}\n\n.swatch-overlay:hover,\n.swatch-overlay:focus-visible {\n  background-color: rgb(0 0 0 / 30%);\n  opacity: 100%;\n}\n\n.swatch-overlay:active {\n  background-color: rgb(0 0 0 / 50%);\n}\n\n[is=ui-icon].icon-mask.copy-color-icon {\n  background-color: var(--color-background);\n}\n\n.spectrum-text {\n  position: absolute;\n  top: 60px;\n  left: 16px;\n}\n\n.spectrum-text-value {\n  display: inline-block;\n  width: 40px;\n  overflow: hidden;\n  text-align: center;\n  margin-right: 6px;\n  line-height: 20px;\n  padding: 0;\n  color: #333;\n  white-space: nowrap;\n  box-shadow: var(--focus-ring-inactive-shadow);\n}\n\n.spectrum-text-label {\n  letter-spacing: 39.5px;\n  margin-top: 8px;\n  display: block;\n  color: #969696;\n  margin-left: 16px;\n  width: 174px;\n}\n\n.spectrum-text-hex > .spectrum-text-value {\n  width: 178px;\n}\n\n.spectrum-text-hex > .spectrum-text-label {\n  letter-spacing: normal;\n  margin-left: 0;\n  text-align: center;\n}\n\n.spectrum-switcher {\n  border-radius: 2px;\n  height: 20px;\n  width: 20px;\n  padding: 2px;\n}\n\n.spectrum-display-switcher {\n  top: 72px;\n  position: absolute;\n  right: 10px;\n}\n\n.spectrum-switcher:hover {\n  background-color: #ddd;\n}\n\n.spectrum-switcher:focus-visible {\n  background-color: var(--focus-bg-color);\n}\n\n.spectrum-palette-container {\n  border-top: var(--divider-border);\n  position: relative;\n  width: 100%;\n  padding: 6px 24px 6px 6px;\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.spectrum-palette {\n  display: flex;\n  flex-wrap: wrap;\n  width: 198px;\n}\n\n.spectrum-palette-color {\n  width: 12px;\n  height: 12px;\n  flex: 0 0 12px;\n  border-radius: 2px;\n  margin: 6px;\n  cursor: pointer;\n  position: relative;\n  border: 1px solid rgb(0 0 0 / 10%);\n  background-position: -1px !important;\n  z-index: 14;\n}\n\n.spectrum-palette-color-shadow {\n  position: absolute;\n  opacity: 0%;\n  margin: 0;\n  top: -5px;\n  left: 3px;\n}\n\n.spectrum-palette-color:hover:not(.spectrum-shades-shown) > .spectrum-palette-color-shadow,\n.spectrum-palette-color:focus:not(.spectrum-shades-shown) > .spectrum-palette-color-shadow {\n  opacity: 20%;\n}\n\n.spectrum-palette-color:hover:not(.spectrum-shades-shown) > .spectrum-palette-color-shadow:first-child,\n.spectrum-palette-color:focus:not(.spectrum-shades-shown) > .spectrum-palette-color-shadow:first-child {\n  opacity: 60%;\n  top: -3px;\n  left: 1px;\n}\n\n.palette-color-shades {\n  position: absolute;\n  background-color: var(--color-background);\n  height: 228px;\n  width: 28px;\n  box-shadow: 0 4px 5px 0 rgb(0 0 0 / 14.000000000000002%), 0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 40%);\n  z-index: 14;\n  border-radius: 2px;\n  transform-origin: 0 228px;\n  margin-top: 16px;\n  margin-left: -8px;\n}\n\n.spectrum-palette > .spectrum-palette-color.spectrum-shades-shown {\n  z-index: 15;\n}\n\n.palette-color-shades > .spectrum-palette-color {\n  margin: 8px 0 0 0;\n  margin-left: 8px;\n  width: 12px;\n}\n\n.spectrum-palette > .spectrum-palette-color {\n  transition: transform 100ms cubic-bezier(0, 0, 0.2, 1);\n  will-change: transform;\n  z-index: 13;\n}\n\n.palette-preview > .spectrum-palette-color {\n  margin-top: 1px;\n}\n\n.spectrum-palette > .spectrum-palette-color.empty-color {\n  border-color: transparent;\n}\n\n.spectrum-palette-color:not(.has-material-shades):focus {\n  border: 1px solid var(--accent-color-hover);\n  transform: scale(1.4);\n}\n\n.palette-color-shades > .spectrum-palette-color:not(.empty-color):hover,\n.spectrum-palette > .spectrum-palette-color:not(.empty-color):not(.has-material-shades):hover {\n  transform: scale(1.15);\n}\n\n.add-color-toolbar {\n  margin-left: -3px;\n  margin-top: -1px;\n}\n\n.spectrum-palette-switcher {\n  right: 10px;\n  top: 0;\n  margin-top: 9px;\n  position: absolute;\n}\n\n.palette-panel {\n  width: 100%;\n  position: absolute;\n  top: 100%;\n  display: flex;\n  flex-direction: column;\n  background-color: var(--color-background);\n  z-index: 14;\n  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1), visibility 0s 200ms;\n  border-top: var(--divider-border);\n  visibility: hidden;\n}\n\n.palette-panel-showing > .palette-panel {\n  transform: translateY(-100%);\n  transition-delay: 0s;\n  visibility: visible;\n}\n\n.palette-panel > div.toolbar {\n  position: absolute;\n  right: 6px;\n  top: 6px;\n}\n\n.palette-panel > div:not(.toolbar) {\n  flex: 0 0 38px;\n  border-bottom: var(--divider-border);\n  padding: 12px;\n  line-height: 14px;\n  color: #333;\n}\n\n.palette-panel > div.palette-title {\n  font-size: 14px;\n  line-height: 16px;\n  color: #333;\n  flex-basis: 40px;\n}\n\ndiv.palette-preview {\n  display: flex;\n  cursor: pointer;\n}\n\n.palette-preview-title {\n  flex: 0 0 84px;\n}\n\n.palette-preview:focus-visible,\n.palette-preview:hover {\n  background-color: #eee;\n}\n\n.spectrum-overlay {\n  z-index: 13;\n  visibility: hidden;\n  background-color: hsl(0deg 0% 0% / 50%);\n  opacity: 0%;\n  transition: opacity 100ms cubic-bezier(0, 0, 0.2, 1), visibility 0s 100ms;\n}\n\n.palette-panel-showing > .spectrum-overlay {\n  transition-delay: 0s;\n  visibility: visible;\n  opacity: 100%;\n}\n\n.spectrum-contrast-container {\n  width: 100%;\n  height: 100%;\n}\n\n.spectrum-contrast-line,\n:host-context(.-theme-with-dark-background) .spectrum-contrast-line {\n  fill: none;\n  stroke: white;\n  opacity: 70%;\n  stroke-width: 1.5px;\n}\n\n.delete-color-toolbar {\n  position: absolute;\n  right: 0;\n  top: 0;\n  background-color: #efefef;\n  visibility: hidden;\n  z-index: 3;\n  width: 36px;\n  display: flex;\n  align-items: center;\n  padding-left: 4px;\n  bottom: 2px;\n  border-bottom-right-radius: 2px;\n}\n\n@keyframes showDeleteToolbar {\n  from {\n    opacity: 0%;\n  }\n\n  to {\n    opacity: 100%;\n  }\n}\n\n.delete-color-toolbar.dragging {\n  visibility: visible;\n  animation: showDeleteToolbar 100ms 150ms cubic-bezier(0, 0, 0.2, 1) backwards;\n}\n\n.delete-color-toolbar-active {\n  background-color: #ddd;\n  color: white;\n}\n\n.swatch.contrast {\n  width: 30px;\n  height: 30px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: auto;\n  background-image: url(Images/checker.png);\n  border-radius: 15px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.swatch.contrast .swatch-overlay {\n  padding: 0;\n}\n\n.background-color .text-preview {\n  color: black;\n  font-size: 16px;\n  position: relative;\n  padding-bottom: 2px;\n}\n\n.swatch.contrast [is=ui-icon] {\n  margin: -2px;\n}\n\n.no-contrast-info-available {\n  border-top: var(--divider-border);\n  position: relative;\n  width: 100%;\n  padding: 10px;\n  justify-content: center;\n  display: flex;\n  flex-wrap: wrap;\n}\n\n@media (forced-colors: active) {\n  :host {\n    border: 1px solid canvastext !important;\n  }\n\n  .spectrum-color {\n    forced-color-adjust: none;\n  }\n\n  .spectrum-switcher:hover,\n  .spectrum-switcher:focus-visible {\n    forced-color-adjust: none;\n    background-color: Highlight !important;\n  }\n\n  :host-context(.-theme-with-dark-background) .spectrum-switcher {\n    filter: unset;\n  }\n\n  .spectrum-switcher:hover svg,\n  .spectrum-switcher:focus-visible svg {\n    fill: HighlightText;\n  }\n\n  .swatch {\n    forced-color-adjust: none;\n  }\n\n  .swatch-inner,\n  .swatch-overlay,\n  .swatch-inner-white {\n    border: 1px solid ButtonText;\n  }\n\n  .swatch-overlay:hover,\n  .swatch-overlay:focus-visible {\n    background-color: canvas !important;\n  }\n\n  .spectrum-slider {\n    forced-color-adjust: none;\n    background-color: ButtonText !important;\n    box-shadow: 0 1px 4px 0 ButtonFace !important;\n  }\n}\n\n/*# sourceURL=color_picker/spectrum.css */");