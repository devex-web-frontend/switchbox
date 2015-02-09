describe('Switchbox ', function() {
	var tmpl = [
		'<div class="control control-switchBox">',
			'<span class="control--wrap">',
				'<select id="Switchbox_Id" class="band musicians doors" data-switchbox>',
					'<option class="superman" value="super power" data-man-of-steel="yeah">Superman</option>',
					'<option class="batman" value="super rich" data-friend="Robin" data-foe="Penguin">Batman</option>',
					'<option class="flash" value="super speed" data-status="not available">Flash</option>',
				'</select>',
			'</span>',
		'</div>'
	].join('');

	beforeEach(function() {
		document.body.innerHTML = tmpl;
		window.Selectbox = SelectboxMock;
	});
	afterEach(function() {
		document.body.innerHTML = '';
		window.Selectbox = null;
	});

	describe('#constructor()', function() {
		it('should generate .switchBox element', function() {
			new Switchbox(document.querySelector('select'));

			expect(document.querySelectorAll('.switchBox').length).toBe(1);
		});
		it('should add button', function() {
			new Switchbox(document.querySelector('select'));

			expect(document.querySelectorAll('.switchBox--button').length).toBe(1);
		});
		it('should set first option text as button text, if button text is empty and none option is selected', function() {
			var button;

			new Switchbox(document.querySelector('select'));
			button = document.querySelector('button');

			expect(button.innerHTML).toBe('Superman');
		});
		it('should set selected option text as button text', function() {
			var select = document.querySelector('select'),
				button;

			select.selectedIndex = 2;
			new Switchbox(select);
			button = document.querySelector('button');

			expect(button.innerHTML).toBe('Flash');
		});
	});

	describe('Methods', function() {
		describe('#getBlock()', function() {
			it('should return block', function() {
				var switchbox = new Switchbox(document.querySelector('select'));

				expect(switchbox.getBlock()).toBe(document.querySelector('.switchBox'));
			});
		});

		describe('#getEventTarget()', function() {
			it('should return original select', function() {
				var select = document.querySelector('select'),
					switchbox = new Switchbox(select);

				expect(switchbox.getEventTarget()).toBe(select);
			});
		});
	});

	describe('Constants', function() {
		it('should provide event names as constants', function() {
			expect(Switchbox.E_CREATED).toBe('switchbox:created');
			expect(Switchbox.E_ACTIVATED).toBe('switchbox:activated');
			expect(Switchbox.E_DEACTIVATED).toBe('switchbox:deactivated');
		});
	});

	describe('Button States', function() {
		beforeEach(function() {
			select = document.querySelector('select');
			switchbox = new Switchbox(select);
			button = document.querySelector('button');
			buttonContainer = document.querySelector('.switchBox--button');
		});
		afterEach(function() {
			select = switchbox = button = buttonContainer = null;
		});

		describe('E_SET_ACTIVE', function() {
			it('should add "-active" modifier to buttonContainer', function() {
				DX.Event.trigger(select, Switchbox.E_SET_ACTIVE);
				expect(buttonContainer.classList.contains('switchBox--button-active')).toBe(true);
			})
		});
		describe('E_REMOVE_ACTIVE', function() {
			it('should remove "-active" modifier to buttonContainer', function() {
				DX.Event.trigger(select, Switchbox.E_SET_ACTIVE);
				expect(buttonContainer.classList.contains('switchBox--button-active')).toBe(true);
				DX.Event.trigger(select, Switchbox.E_REMOVE_ACTIVE);
				expect(buttonContainer.classList.contains('switchBox--button-active')).toBe(false);
			})
		});
	});

	describe('Events API', function() {
		var switchbox,
			select,
			button,
			buttonContainer;

		beforeEach(function() {
			select = document.querySelector('select');
			switchbox = new Switchbox(select);
			button = document.querySelector('button');
			buttonContainer = document.querySelector('.switchBox--button');
		});
		afterEach(function() {
			switchbox = select = button = buttonContainer = null;
		});

		describe('Selectbox.E_CHANGED', function() {
			it('should set selected option as button text', function() {
				select.selectedIndex = 1;
				DX.Event.trigger(select, Selectbox.E_CHANGED);

				expect(button.innerHTML).toBe('Batman')
			});
			it('should add "-active" modifier to buttonContainer', function() {
				expect(buttonContainer.classList.contains('switchBox--button-active')).toBe(false);
				DX.Event.trigger(select, Selectbox.E_CHANGED);
				expect(buttonContainer.classList.contains('switchBox--button-active')).toBe(true);
			})
		});
	});


	describe('Static Methods', function() {
		describe('#disable()', function() {
			it('should disable originsl select element', function() {
				var select = document.querySelector('select');

				new Switchbox(select);

				Switchbox.disable(select);

				expect(Selectbox.disable).toHaveBeenCalledWith(select);
			});

			it('should add switchBox-disabled modifier to container', function() {
				var select = document.querySelector('select'),
					container;

				new Switchbox(select);
				container = document.querySelector('.switchBox');

				Switchbox.disable(select);

				expect(container.classList.contains('switchBox-disabled')).toBe(true);
			});

			it('should disable related button element', function() {
				var select = document.querySelector('select'),
					button;

				new Switchbox(select);
				button = document.querySelector('button');

				Switchbox.disable(select);
				expect(button.disabled).toBe(true);
			});
		});

		describe('#enable()', function() {
			it('should enable original button element', function() {
				var select = document.querySelector('select');

				new Switchbox(select);

				Switchbox.disable(select);
				Switchbox.enable(select);

				expect(select.disabled).toBe(false);
			});

			it('should remove switchBox-disabled modifier from container', function() {
				var select = document.querySelector('select'),
					container;

				new Switchbox(select);
				container = document.querySelector('.switchBox');

				Switchbox.disable(select);
				Switchbox.enable(select);

				expect(container.classList.contains('switchBox-disabled')).toBe(false);
			});

			it('should enable related button element', function() {
				var select = document.querySelector('select'),
					button;

				new Switchbox(select);
				button = document.querySelector('button');

				Switchbox.disable(select);
				expect(button.disabled).toBe(true);

				Switchbox.enable(select);
				expect(button.disabled).toBe(false);
			});
		});
	});

});