var Site = {
    Init: function() {
		String.prototype.linkar = function( url ){
			return '<a href="' + url + '" target="_blank">' + this + '</a>' ;
		};
		
		String.prototype.zeros = function( qtde ){
			var texto = this ;
			while( texto.length < qtde ) texto = '0' + texto ;
			return texto ;
		};
		
		String.prototype.parseURL = function() {
			return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
				return url.linkar(url);
			});
		};
		
		String.prototype.parseUsername = function() {
			return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
				var username = u.replace("@","")
				return u.linkar("http://twitter.com/"+username);
			});
		};
		
		String.prototype.parseHashtag = function() {
			return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
				var tag = t.replace("#","%23")
				return t.linkar("http://search.twitter.com/search?q="+tag);
			});
		};
    },
    Generics: {
        OpenExternalModal: function(id, source, w, h, content) {
			var conteudo = '<iframe width=\"' + w + '\" height=\"' + h + '\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\" src=\"' + source + '\"></iframe>';
			if( content != null ) conteudo = content ;
			
            ModalWindow.windowId = id;
            ModalWindow.width = w;
            ModalWindow.height = h;
            ModalWindow.content = conteudo;
            ModalWindow.Open();
        },
        OpenInternalModal: function(id) {
            $(id).jqmShow({ toTop: true });
        },
        FormsEffects: function() {
            $('input[type=text], textarea, select').focus(function() {
                $(this).addClass('on');
            });
            $('input[type=text], textarea, select').blur(function() {
                $(this).removeClass('on');
            });
        },
        ChangeFonts: function() {
            var elements = "#content #main p, #content #main p strong, #content #main p strong span, #content #main li, #content #main a, #content #main h1, #content #main h2, #content #main h3, #content #main h4, #content #main h5, #content #main h6";
            $('.aumentar-fonte').unbind().bind('click', function() {
                var currentFontSize = $(elements).css('font-size');
                var currentFontSizeNum = parseFloat(currentFontSize, 2000);
                var newFontSize = currentFontSizeNum * 1.2;
                $(elements).css('font-size', newFontSize);
                return false;
            });
            $('.diminuir-fonte').unbind().bind('click', function() {
                var currentFontSize = $(elements).css('font-size');
                var currentFontSizeNum = parseFloat(currentFontSize, 2000);
                var newFontSize = currentFontSizeNum * 0.9;
                $(elements).css('font-size', newFontSize);
                return false;
            });
        }
	},
	
	Home: function(){
		
		Site.Resizes();
		
		Site.Conceito();
		Site.Cores();
		Site.Downloads();
		Site.Galeria();
		
		$('ul.menu li a').hover( 
			function(){
				$(this).fadeTo(300,0.5);
			},
			function(){
				$(this).fadeTo(300,1);
			}
		).click(function(e) {
			$.scrollTo( $( $(this).attr('href') ) , 800 );
		});
		
		$('#home #mulheres a').hover(
			function(){
				$('#home #mulheres').clearQueue();
				$('#home #mulheres').animate({opacity:0.5}, 500);
			},
			function(){
				$('#home #mulheres').clearQueue();
				$('#home #mulheres').animate({opacity:1}, 500);
			}
		);
		
		$('#home #proprietarios a').hover(
			function(){
				$('#home #proprietarios').animate({opacity:0.5}, 500);
			},
			function(){
				$('#home #proprietarios').animate({opacity:1}, 500);
			}
		).click(function(e) {
			$('#proprietarios_embreve').fadeIn();
		}).attr('href','javascript:void(0);');
		
		$('#proprietarios_embreve a').click(function(e) {
			$('#proprietarios_embreve').fadeOut();
		});
	},
	
	Conceito: function(){
		$("#conceito .container_videos .video a").click(function() {
			$.fancybox({
				'padding'		: 0,
				'overlayColor' 	: '#000000',
				'titleShow'		: false,
				'autoScale'		: false,
				'transitionIn'	: 'fade',
				'transitionOut'	: 'fade',
				'title'			: this.title,
				'centerOnScroll': true,
				'width'			: 680,
				'height'		: 495,
				'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
				'type'			: 'swf',
				'swf'			: {
					'wmode'		: 'transparent',
					'allowfullscreen'	: 'true'
				}
			});
		
			return false;
		});	
	}, 
	
	Galeria: function(){
		$("#galeria .imagens .container a").blend(300).fancybox({
			'padding'		: 0,
			'overlayColor' 	: '#000000',
			'autoScale'		: true,
			'transitionIn'	: 'fade',
			'transitionOut'	: 'fade',
			'title'			: null,
			'width'			: '100%',
			'height'		: '100%'
		});	
	},
	
	Cores: function(){
		$('#cores .controles a').click(function(e) {
			if( $(this).hasClass('verde') ){
				$('#cores .moto .verde').fadeIn(300);
				$('#cores .moto .preta').fadeOut(300);
			} else {
				$('#cores .moto .verde').fadeOut(300);
				$('#cores .moto .preta').fadeIn(300);
			}
		});
	},
	
	Downloads: function(){
		$('#downloads .container div .links a').hover(
			function(){
				$( '#downloads .container .' + $(this).attr('rel') + ' .img .over' ).show();
			},
			function(){
				$( '#downloads .container .' + $(this).attr('rel') + ' .img .over' ).hide();
			}
		);
	},
	
	OpniaoMulheres: function(){
		
		$('.mulheres .bt_opniao a').each(function(e) {
			$(this).attr('rel', $(this).attr('href') ).attr('href','javascript:void(0)').click(function(e) {
				var id = $(this).attr('rel');
				if( ! $(id).is(':visible') )
				{
					$('.opniao').fadeOut();
					$(id).fadeIn();
				}
			});
		});
		
		$('.mulheres .opniao .fechar').click(function(e) {
			$('.opniao').fadeOut();
		});
		
		$(".bt_video").click(function() {
			$.fancybox({
				'padding'		: 0,
				'overlayColor' 	: '#000000',
				'autoScale'		: false,
				'transitionIn'	: 'fade',
				'transitionOut'	: 'fade',
				'titleShow'		: false,
				'centerOnScroll': true,
				'width'			: 680,
				'height'		: 495,
				'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
				'type'			: 'swf',
				'swf'			: {
					'wmode'				: 'transparent',
					'allowfullscreen'	: 'true'
				}
			});
		
			return false;
		});	
	},
	
	Resizes: function(){
		
		function doResize(){
		
			var wind = $(window);
			var pos = 0 ;
			
			//HEADER --------------------------------------------------
			var header = $('#header');
			
			header.css( {left: (wind.width() - header.width() ) / 2 } );
			var headerWidth = header.width();
			if( wind.width() > headerWidth ) headerWidth -= 60 ;
			$('.menu').css({ 'margin-left': ( headerWidth - 920 ) / 2 });
			
			//HOME --------------------------------------------------
			pos =  (wind.width() - 570) / 2 ;
			
			$('#home #mulheres').css({ left: pos - 300 });
			$('#home #proprietarios').css({ left: pos + 450 });
			
			var posEmbreve = pos + 520 ;
			if( posEmbreve + 466 > wind.width() ){
				posEmbreve = wind.width() - 470 ;
			}
			$('#home #proprietarios_embreve').css({ left: posEmbreve });
			
			//CONCEITO --------------------------------------------------
			var containerVideosConceito = $('#conceito .container_videos');
			containerVideosConceito.css({ 'margin-left': pos - 200});
			
			//CORES --------------------------------------------------
			var motoCores = $('#cores .moto');
			motoCores.css({ 'left': pos - 230});
			
			var textoCores = $('#cores .texto');
			textoCores.css({ 'left': pos + 600});
			
			var controlesCores = $('#cores .controles');
			controlesCores.css({ 'left': pos - 230});
			
			//GALERIA --------------------------------------------------
			var textoGaleria = $('#galeria .texto');
			textoGaleria.css({ 'left': pos + 80});
			
			var imagensGaleria = $('#galeria .imagens');
			imagensGaleria.css({ 'left': pos - 200});
			
			//DOWNLOADS --------------------------------------------------
			var textoDownloads = $('#downloads .texto');
			textoDownloads.css({ 'left': pos + 150});
			
			var conteudoDownloads = $('#downloads .container');
			conteudoDownloads.css({ 'left': pos - 130});
			
			//ESPECS --------------------------------------------------
			var textoEspecs = $('#especificacoes .texto');
			textoEspecs.css({ 'left': pos + 360});
			
			var conteudoEspecs = $('#especificacoes .container');
			conteudoEspecs.css({ 'left': pos + 120});
			
			//COMO COMPRAR --------------------------------------------------
			var textoCC = $('#como_comprar .texto');
			textoCC.css({ 'left': pos + 530});
			
			var conteudoCC = $('#como_comprar .container');
			conteudoCC.css({ 'left': pos + 380 });
			
			//PROPRIETARIOS --------------------------------------------------
			pos = wind.width() / 2 ;
			$('.proprietarios .opniao1').css({ 'left': pos });
			$('.proprietarios .opniao2').css({ 'left': pos - 500 });
			$('.proprietarios .opniao3').css({ 'left': pos - 200 });
			
			//MULHERES --------------------------------------------------
			$('.mulheres .bt1').css({ 'left': pos - 400 });
			$('.mulheres .bt2').css({ 'left': pos });
			$('.mulheres .bt3').css({ 'left': pos + 370 });
			
			$('.mulheres #opniao1').css({ 'left': pos - 470 });
			$('.mulheres #opniao2').css({ 'left': pos - 250 });
			$('.mulheres #opniao3').css({ 'left': pos - 100 });
		}
		
		$(window).resize( doResize );
		doResize();
	}
}