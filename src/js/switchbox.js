/**
 * @requires DX
 * @requires DX.Dom
 * @requires DX.Event
 * @requires Selectbox
 */

var Switchbox = (function(DX, window, document, undefined) {
	'use strict';

	var CN_SWITCHBOX = 'switchBox',
		CN_BUTTON = CN_SWITCHBOX + '--button',
		M_ACTIVE = 'active',
		tmpl = [
			'<span class="' + CN_BUTTON + '">',
				'<button></button>',
			'</span>'
		].join('');

	/**
	 * @constructor
	 * @param {HTMLSelectElement} input
	 */
	return function Switchbox(select) {
		var block,
			buttonContainer,
			button,
			selectBox;

		function init() {
			initAppearance();
			initSelectBox();
			setValue();
			initListeners();

			DX.Event.trigger(select, Switchbox.E_CREATED, {
				detail: {
					block: block,
					eventTarget: select
				}
			});
		}

		function initAppearance() {
			block = DX.Dom.createElement('div', {
				className: CN_SWITCHBOX,
				innerHTML: tmpl
			});
			buttonContainer = DX.$$('.' + CN_BUTTON, block);
			button = DX.$$('button', block);
		}
		function initSelectBox() {
			var selectBoxBlock,
				selectBoxParent;

			selectBox = new Selectbox(select);

			selectBoxBlock = selectBox.getBlock();
			selectBoxParent = DX.Dom.getParent(selectBoxBlock);
			selectBoxParent.insertBefore(block, selectBoxBlock);
			block.insertBefore(selectBoxBlock, buttonContainer);
		}
		function setValue() {
			button.innerHTML = selectBox.getText() || button.innerHTML;
		}
		function changeValue() {
			setValue();
			setActiveState();
		}
		function initListeners() {
			select.addEventListener(Selectbox.E_CHANGED, changeValue);
			select.addEventListener(Switchbox.E_SET_ACTIVE, setActiveState);
			select.addEventListener(Switchbox.E_REMOVE_ACTIVE, removeActiveState);
			button.addEventListener('click', changeStates);
		}

		function changeStates() {
			return DX.Bem.hasModifier(buttonContainer, M_ACTIVE) ? removeActiveState() : setActiveState();
		}

		function setActiveState() {
			DX.Bem.addModifier(buttonContainer, M_ACTIVE);
			DX.Event.trigger(button, Switchbox.E_ACTIVATED, {
				detail: {
					mode: button.innerHTML
				}
			});
		}

		function removeActiveState() {
			DX.Bem.removeModifier(buttonContainer, M_ACTIVE);
			DX.Event.trigger(button, Switchbox.E_DEACTIVATED);
		}

		init();

		this.getBlock = function() {
			return block;
		};
		this.getEventTarget = function() {
			return select;
		};
	};


})(DX, window, document);

Switchbox.E_CREATED = 'switchbox:created';
Switchbox.E_ACTIVATED = 'switchbox:activated';
Switchbox.E_DEACTIVATED = 'switchbox:deactivated';
Switchbox.E_SET_ACTIVE = 'switchbox:setactive';
Switchbox.E_REMOVE_ACTIVE = 'switchbox:removeactive';

Switchbox.disable = function disableSwitchbox(select) {
	'use strict';

	var cn = 'switchBox',
		container = DX.Dom.getAscendantByClassName(select, cn),
		button = container.querySelector('button');

	button.disabled = true;
	DX.Bem.addModifier(container, 'disabled', cn);
	Selectbox.disable(select);
};

Switchbox.enable = function enableSwitchbox(select) {
	'use strict';

	var cn = 'switchBox',
		container = DX.Dom.getAscendantByClassName(select, cn),
		button = container.querySelector('button');

	button.disabled = false;
	DX.Bem.removeModifier(container, 'disabled', cn);
	Selectbox.enable(select);
};