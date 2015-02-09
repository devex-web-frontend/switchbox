/**
 * @requires DX
 */
var SelectboxMock = (function(DX, window, document, undefined) {
	'use strict';

	function SelectboxMock(select) {
		var container;

		function init() {
			var selectedIndex = select.selectedIndex;

			container = DX.Dom.createElement('div', {
				className: 'selectBox'
			});
			DX.Dom.getParent(select).insertBefore(container, select);
			container.appendChild(select);
			select.selectedIndex = selectedIndex;
		}

		function getBlock() {
			return container;
		}

		function getText() {
			var currentOption = select.options[select.selectedIndex] || {label: '', textContent: ''};

			return currentOption.label || currentOption.textContent;
		}


		this.getBlock = getBlock;
		this.getText = getText;

		init();
	}

	return SelectboxMock;
})(DX, window, document);

SelectboxMock.E_CHANGED = 'selectbox:changed';
SelectboxMock.E_CHANGE_VALUE = 'selectbox:changevalue';

SelectboxMock.disable = jasmine.createSpy('Selectbox.disable');
SelectboxMock.enable = jasmine.createSpy('Selectbox.enable');