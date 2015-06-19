(
	function(window) {
		var app = new Application({
			inputArea: '#console-container',
			outputArea: '#console-result'
		});

		function Application(options) {
			'use-strict';
			//window.console.log('init consolr');

			this._options = options;
			this._elConsole = $(this._options.inputArea);
			this._eLResult = $(this._options.outputArea);

			var evaluateExpression = function (evaluationString) {
				var returnExp = undefined;
				try {
					returnExp = eval.call(this, evaluationString);	
				} catch (err){
					returnExp = err;
				}

				return returnExp;
				
			},

			writer = function (evalStr) {
				$(options.outputArea).text(eval(evalStr));
			};
			this.console = {
				log: writer,
				warn: writer,
				err: writer
			};

			window.console = this.console;

			this.attachEvents = function() {
				var that = this;
				this._elConsole.on('keyup', function(evt) {
					var consoleInput = $(this).text(),
						consoleOutput = '';
					//window.console.log(consoleInput);
					// if the key pressed is enter key then trigger evaluate string
					if(evt.keyCode === 13){
						consoleOutput = evaluateExpression(consoleInput);
						that._eLResult.html(consoleOutput + '<br>' + that._eLResult.html());
						$(this).text('');
					}
				});
			};

			this.init = function () {
				this.attachEvents();
			}
		}

		app.init();
	}
)(window);