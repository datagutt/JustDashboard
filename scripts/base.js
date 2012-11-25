(function(global){
	var ucfirst = function(str){
		return str.charAt(0).toUpperCase() + str.substr(1);
	};
	function handleBoard(board, boardConfig){
		var b;
		if(board){
			var gBoard = global[ucfirst(board)+'Board'];
			if(gBoard){
				b = new gBoard();
			}
		}
		// Generate board content and put it in <ul>
		if(b && b.init && LIB.areFeatures('query', 'setHtml') && LIB.isHostMethod(document, 'getElementsByTagName') && LIB.isHostMethod(document, 'createElement')){
			var ul = LIB.query('ul');
			if(ul && ul[0]){
				var grid = boardConfig.grid ? boardConfig.grid : '4';
				var el = document.createElement('li');
				el.className = 'board';
				el.className += ' span'+grid;
				LIB.setHtml(el, '<div class="'+board+'_board"></div>');
				ul[0].appendChild(el);
				var boardDiv = el.getElementsByTagName('div');
				if(boardDiv && boardDiv[0]){
					b.init(boardDiv[0], boardConfig);
				}
			}
		}
	}
	function loadBoards(boards){
		var board;
		for(board in boards){
			if(boards.hasOwnProperty(board)){
				var boardConfig = boards[board];
				if(LIB.isHostMethod(document, 'createElement') && board){
					var time = (new Date()).getTime();
					// Load styles
					var link = document.createElement('link');
					link.href = 'boards/'+board+'/board.css?'+time;
					link.rel = 'stylesheet';
					if(LIB.isHostObjectProperty(document, 'head') && LIB.isHostMethod(document.head, 'appendChild')){
						document.head.appendChild(link);
					}
					// Load script
					var url = 'boards/'+board+'/board.js?'+time;
					Loader.load(url, [board, boardConfig], handleBoard);
				}
			}
		}
	}
	if(LIB && LIB.areFeatures('deferUntilReady')){
		LIB.deferUntilReady(function(){
			if(LIB && LIB.isHostObjectProperty(document, 'documentElement')){
				document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
			}
			if(document.title){
				document.title = document.title.replace('{{ COMPANY }}', config.company);
			}
			if(LIB && LIB.isHostMethod(document, 'getElementById')){
				var companyTitle = document.getElementById('company');
				// Replace company title
				companyTitle.innerHTML = companyTitle.innerHTML.replace('{{ COMPANY }}', config.company);
			}
			loadBoards(config.boards);
		});
	}
})(window);