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
			this.commandHistory = {
				command : [],
				position: 0
			};

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
				return (eval(evalStr));
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
					switch(evt.keyCode) {
						case 13 : 
							that.commandHistory.command.push(consoleInput);
							that.commandHistory.position = that.commandHistory.position++;
							consoleOutput = evaluateExpression(consoleInput);
							that._eLResult.html(consoleOutput + '<br>' + that._eLResult.html());
							$(this).text('');
							break;
						case 38 : // up arrow
							if(!that.commandHistory.commad.length && that.commandHistory.position){
								evaluateExpression(that.commandHistory.command[that.commandHistory.position]);
								that.commandHistory.position-- ;
							}
							break;
						case 40 : // down arrow
 							if(this.commandHistory.position !== this.commandHistory.command.length){

 							}
 							break;
					}
					// if the key pressed is enter key then trigger evaluate string
					if(evt.keyCode === 13){
					}
				});
			};

			this.init = function () {
				this.attachEvents();
				this._elConsole.focus();
			}
		}

		app.init();
	}
)(window);