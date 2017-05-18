/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * reveal.js
 * http://lab.hakim.se/reveal-js
 * MIT licensed
 *
 * Copyright (C) 2017 Hakim El Hattab, http://hakim.se
 */
(function( root, factory ) {
	if( true ) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			root.Reveal = factory();
			return root.Reveal;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if( typeof exports === 'object' ) {
		// Node. Does not work with strict CommonJS.
		module.exports = factory();
	} else {
		// Browser globals.
		root.Reveal = factory();
	}
}( this, function() {

	'use strict';

	var Reveal;

	// The reveal.js version
	var VERSION = '3.5.0';

	var SLIDES_SELECTOR = '.slides section',
		HORIZONTAL_SLIDES_SELECTOR = '.slides>section',
		VERTICAL_SLIDES_SELECTOR = '.slides>section.present>section',
		HOME_SLIDE_SELECTOR = '.slides>section:first-of-type',
		UA = navigator.userAgent,

		// Configuration defaults, can be overridden at initialization time
		config = {

			// The "normal" size of the presentation, aspect ratio will be preserved
			// when the presentation is scaled to fit different resolutions
			width: 960,
			height: 700,

			// Factor of the display size that should remain empty around the content
			margin: 0.04,

			// Bounds for smallest/largest possible scale to apply to content
			minScale: 0.2,
			maxScale: 2.0,

			// Display controls in the bottom right corner
			controls: true,

			// Display a presentation progress bar
			progress: true,

			// Display the page number of the current slide
			slideNumber: false,

			// Determine which displays to show the slide number on
			showSlideNumber: 'all',

			// Push each slide change to the browser history
			history: false,

			// Enable keyboard shortcuts for navigation
			keyboard: true,

			// Optional function that blocks keyboard events when retuning false
			keyboardCondition: null,

			// Enable the slide overview mode
			overview: true,

			// Vertical centering of slides
			center: true,

			// Enables touch navigation on devices with touch input
			touch: true,

			// Loop the presentation
			loop: false,

			// Change the presentation direction to be RTL
			rtl: false,

			// Randomizes the order of slides each time the presentation loads
			shuffle: false,

			// Turns fragments on and off globally
			fragments: true,

			// Flags if the presentation is running in an embedded mode,
			// i.e. contained within a limited portion of the screen
			embedded: false,

			// Flags if we should show a help overlay when the question-mark
			// key is pressed
			help: true,

			// Flags if it should be possible to pause the presentation (blackout)
			pause: true,

			// Flags if speaker notes should be visible to all viewers
			showNotes: false,

			// Global override for autolaying embedded media (video/audio/iframe)
			// - null: Media will only autoplay if data-autoplay is present
			// - true: All media will autoplay, regardless of individual setting
			// - false: No media will autoplay, regardless of individual setting
			autoPlayMedia: null,

			// Number of milliseconds between automatically proceeding to the
			// next slide, disabled when set to 0, this value can be overwritten
			// by using a data-autoslide attribute on your slides
			autoSlide: 0,

			// Stop auto-sliding after user input
			autoSlideStoppable: true,

			// Use this method for navigation when auto-sliding (defaults to navigateNext)
			autoSlideMethod: null,

			// Enable slide navigation via mouse wheel
			mouseWheel: false,

			// Apply a 3D roll to links on hover
			rollingLinks: false,

			// Hides the address bar on mobile devices
			hideAddressBar: true,

			// Opens links in an iframe preview overlay
			previewLinks: false,

			// Exposes the reveal.js API through window.postMessage
			postMessage: true,

			// Dispatches all reveal.js events to the parent window through postMessage
			postMessageEvents: false,

			// Focuses body when page changes visibility to ensure keyboard shortcuts work
			focusBodyOnPageVisibilityChange: true,

			// Transition style
			transition: 'slide', // none/fade/slide/convex/concave/zoom

			// Transition speed
			transitionSpeed: 'default', // default/fast/slow

			// Transition style for full page slide backgrounds
			backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom

			// Parallax background image
			parallaxBackgroundImage: '', // CSS syntax, e.g. "a.jpg"

			// Parallax background size
			parallaxBackgroundSize: '', // CSS syntax, e.g. "3000px 2000px"

			// Amount of pixels to move the parallax background per slide step
			parallaxBackgroundHorizontal: null,
			parallaxBackgroundVertical: null,

			// The maximum number of pages a single slide can expand onto when printing
			// to PDF, unlimited by default
			pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY,

			// Offset used to reduce the height of content within exported PDF pages.
			// This exists to account for environment differences based on how you
			// print to PDF. CLI printing options, like phantomjs and wkpdf, can end
			// on precisely the total height of the document whereas in-browser
			// printing has to end one pixel before.
			pdfPageHeightOffset: -1,

			// Number of slides away from the current that are visible
			viewDistance: 3,

			// The display mode that will be used to show slides
			display: 'block',

			// Script dependencies to load
			dependencies: []

		},

		// Flags if Reveal.initialize() has been called
		initialized = false,

		// Flags if reveal.js is loaded (has dispatched the 'ready' event)
		loaded = false,

		// Flags if the overview mode is currently active
		overview = false,

		// Holds the dimensions of our overview slides, including margins
		overviewSlideWidth = null,
		overviewSlideHeight = null,

		// The horizontal and vertical index of the currently active slide
		indexh,
		indexv,

		// The previous and current slide HTML elements
		previousSlide,
		currentSlide,

		previousBackground,

		// Slides may hold a data-state attribute which we pick up and apply
		// as a class to the body. This list contains the combined state of
		// all current slides.
		state = [],

		// The current scale of the presentation (see width/height config)
		scale = 1,

		// CSS transform that is currently applied to the slides container,
		// split into two groups
		slidesTransform = { layout: '', overview: '' },

		// Cached references to DOM elements
		dom = {},

		// Features supported by the browser, see #checkCapabilities()
		features = {},

		// Client is a mobile device, see #checkCapabilities()
		isMobileDevice,

		// Client is a desktop Chrome, see #checkCapabilities()
		isChrome,

		// Throttles mouse wheel navigation
		lastMouseWheelStep = 0,

		// Delays updates to the URL due to a Chrome thumbnailer bug
		writeURLTimeout = 0,

		// Flags if the interaction event listeners are bound
		eventsAreBound = false,

		// The current auto-slide duration
		autoSlide = 0,

		// Auto slide properties
		autoSlidePlayer,
		autoSlideTimeout = 0,
		autoSlideStartTime = -1,
		autoSlidePaused = false,

		// Holds information about the currently ongoing touch input
		touch = {
			startX: 0,
			startY: 0,
			startSpan: 0,
			startCount: 0,
			captured: false,
			threshold: 40
		},

		// Holds information about the keyboard shortcuts
		keyboardShortcuts = {
			'N  ,  SPACE':			'Next slide',
			'P':					'Previous slide',
			'&#8592;  ,  H':		'Navigate left',
			'&#8594;  ,  L':		'Navigate right',
			'&#8593;  ,  K':		'Navigate up',
			'&#8595;  ,  J':		'Navigate down',
			'Home':					'First slide',
			'End':					'Last slide',
			'B  ,  .':				'Pause',
			'F':					'Fullscreen',
			'ESC, O':				'Slide overview'
		};

	/**
	 * Starts up the presentation if the client is capable.
	 */
	function initialize( options ) {

		// Make sure we only initialize once
		if( initialized === true ) return;

		initialized = true;

		checkCapabilities();

		if( !features.transforms2d && !features.transforms3d ) {
			document.body.setAttribute( 'class', 'no-transforms' );

			// Since JS won't be running any further, we load all lazy
			// loading elements upfront
			var images = toArray( document.getElementsByTagName( 'img' ) ),
				iframes = toArray( document.getElementsByTagName( 'iframe' ) );

			var lazyLoadable = images.concat( iframes );

			for( var i = 0, len = lazyLoadable.length; i < len; i++ ) {
				var element = lazyLoadable[i];
				if( element.getAttribute( 'data-src' ) ) {
					element.setAttribute( 'src', element.getAttribute( 'data-src' ) );
					element.removeAttribute( 'data-src' );
				}
			}

			// If the browser doesn't support core features we won't be
			// using JavaScript to control the presentation
			return;
		}

		// Cache references to key DOM elements
		dom.wrapper = document.querySelector( '.reveal' );
		dom.slides = document.querySelector( '.reveal .slides' );

		// Force a layout when the whole page, incl fonts, has loaded
		window.addEventListener( 'load', layout, false );

		var query = Reveal.getQueryHash();

		// Do not accept new dependencies via query config to avoid
		// the potential of malicious script injection
		if( typeof query['dependencies'] !== 'undefined' ) delete query['dependencies'];

		// Copy options over to our config object
		extend( config, options );
		extend( config, query );

		// Hide the address bar in mobile browsers
		hideAddressBar();

		// Loads the dependencies and continues to #start() once done
		load();

	}

	/**
	 * Inspect the client to see what it's capable of, this
	 * should only happens once per runtime.
	 */
	function checkCapabilities() {

		isMobileDevice = /(iphone|ipod|ipad|android)/gi.test( UA );
		isChrome = /chrome/i.test( UA ) && !/edge/i.test( UA );

		var testElement = document.createElement( 'div' );

		features.transforms3d = 'WebkitPerspective' in testElement.style ||
								'MozPerspective' in testElement.style ||
								'msPerspective' in testElement.style ||
								'OPerspective' in testElement.style ||
								'perspective' in testElement.style;

		features.transforms2d = 'WebkitTransform' in testElement.style ||
								'MozTransform' in testElement.style ||
								'msTransform' in testElement.style ||
								'OTransform' in testElement.style ||
								'transform' in testElement.style;

		features.requestAnimationFrameMethod = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
		features.requestAnimationFrame = typeof features.requestAnimationFrameMethod === 'function';

		features.canvas = !!document.createElement( 'canvas' ).getContext;

		// Transitions in the overview are disabled in desktop and
		// Safari due to lag
		features.overviewTransitions = !/Version\/[\d\.]+.*Safari/.test( UA );

		// Flags if we should use zoom instead of transform to scale
		// up slides. Zoom produces crisper results but has a lot of
		// xbrowser quirks so we only use it in whitelsited browsers.
		features.zoom = 'zoom' in testElement.style && !isMobileDevice &&
						( isChrome || /Version\/[\d\.]+.*Safari/.test( UA ) );

	}

    /**
     * Loads the dependencies of reveal.js. Dependencies are
     * defined via the configuration option 'dependencies'
     * and will be loaded prior to starting/binding reveal.js.
     * Some dependencies may have an 'async' flag, if so they
     * will load after reveal.js has been started up.
     */
	function load() {

		var scripts = [],
			scriptsAsync = [],
			scriptsToPreload = 0;

		// Called once synchronous scripts finish loading
		function proceed() {
			if( scriptsAsync.length ) {
				// Load asynchronous scripts
				head.js.apply( null, scriptsAsync );
			}

			start();
		}

		function loadScript( s ) {
			head.ready( s.src.match( /([\w\d_\-]*)\.?js$|[^\\\/]*$/i )[0], function() {
				// Extension may contain callback functions
				if( typeof s.callback === 'function' ) {
					s.callback.apply( this );
				}

				if( --scriptsToPreload === 0 ) {
					proceed();
				}
			});
		}

		for( var i = 0, len = config.dependencies.length; i < len; i++ ) {
			var s = config.dependencies[i];

			// Load if there's no condition or the condition is truthy
			if( !s.condition || s.condition() ) {
				if( s.async ) {
					scriptsAsync.push( s.src );
				}
				else {
					scripts.push( s.src );
				}

				loadScript( s );
			}
		}

		if( scripts.length ) {
			scriptsToPreload = scripts.length;

			// Load synchronous scripts
			head.js.apply( null, scripts );
		}
		else {
			proceed();
		}

	}

	/**
	 * Starts up reveal.js by binding input events and navigating
	 * to the current URL deeplink if there is one.
	 */
	function start() {

		// Make sure we've got all the DOM elements we need
		setupDOM();

		// Listen to messages posted to this window
		setupPostMessage();

		// Prevent the slides from being scrolled out of view
		setupScrollPrevention();

		// Resets all vertical slides so that only the first is visible
		resetVerticalSlides();

		// Updates the presentation to match the current configuration values
		configure();

		// Read the initial hash
		readURL();

		// Update all backgrounds
		updateBackground( true );

		// Notify listeners that the presentation is ready but use a 1ms
		// timeout to ensure it's not fired synchronously after #initialize()
		setTimeout( function() {
			// Enable transitions now that we're loaded
			dom.slides.classList.remove( 'no-transition' );

			loaded = true;

			dom.wrapper.classList.add( 'ready' );

			dispatchEvent( 'ready', {
				'indexh': indexh,
				'indexv': indexv,
				'currentSlide': currentSlide
			} );
		}, 1 );

		// Special setup and config is required when printing to PDF
		if( isPrintingPDF() ) {
			removeEventListeners();

			// The document needs to have loaded for the PDF layout
			// measurements to be accurate
			if( document.readyState === 'complete' ) {
				setupPDF();
			}
			else {
				window.addEventListener( 'load', setupPDF );
			}
		}

	}

	/**
	 * Finds and stores references to DOM elements which are
	 * required by the presentation. If a required element is
	 * not found, it is created.
	 */
	function setupDOM() {

		// Prevent transitions while we're loading
		dom.slides.classList.add( 'no-transition' );

		// Background element
		dom.background = createSingletonNode( dom.wrapper, 'div', 'backgrounds', null );

		// Progress bar
		dom.progress = createSingletonNode( dom.wrapper, 'div', 'progress', '<span></span>' );
		dom.progressbar = dom.progress.querySelector( 'span' );

		// Arrow controls
		createSingletonNode( dom.wrapper, 'aside', 'controls',
			'<button class="navigate-left" aria-label="previous slide"></button>' +
			'<button class="navigate-right" aria-label="next slide"></button>' +
			'<button class="navigate-up" aria-label="above slide"></button>' +
			'<button class="navigate-down" aria-label="below slide"></button>' );

		// Slide number
		dom.slideNumber = createSingletonNode( dom.wrapper, 'div', 'slide-number', '' );

		// Element containing notes that are visible to the audience
		dom.speakerNotes = createSingletonNode( dom.wrapper, 'div', 'speaker-notes', null );
		dom.speakerNotes.setAttribute( 'data-prevent-swipe', '' );
		dom.speakerNotes.setAttribute( 'tabindex', '0' );

		// Overlay graphic which is displayed during the paused mode
		createSingletonNode( dom.wrapper, 'div', 'pause-overlay', null );

		// Cache references to elements
		dom.controls = document.querySelector( '.reveal .controls' );

		dom.wrapper.setAttribute( 'role', 'application' );

		// There can be multiple instances of controls throughout the page
		dom.controlsLeft = toArray( document.querySelectorAll( '.navigate-left' ) );
		dom.controlsRight = toArray( document.querySelectorAll( '.navigate-right' ) );
		dom.controlsUp = toArray( document.querySelectorAll( '.navigate-up' ) );
		dom.controlsDown = toArray( document.querySelectorAll( '.navigate-down' ) );
		dom.controlsPrev = toArray( document.querySelectorAll( '.navigate-prev' ) );
		dom.controlsNext = toArray( document.querySelectorAll( '.navigate-next' ) );

		dom.statusDiv = createStatusDiv();
	}

	/**
	 * Creates a hidden div with role aria-live to announce the
	 * current slide content. Hide the div off-screen to make it
	 * available only to Assistive Technologies.
	 *
	 * @return {HTMLElement}
	 */
	function createStatusDiv() {

		var statusDiv = document.getElementById( 'aria-status-div' );
		if( !statusDiv ) {
			statusDiv = document.createElement( 'div' );
			statusDiv.style.position = 'absolute';
			statusDiv.style.height = '1px';
			statusDiv.style.width = '1px';
			statusDiv.style.overflow = 'hidden';
			statusDiv.style.clip = 'rect( 1px, 1px, 1px, 1px )';
			statusDiv.setAttribute( 'id', 'aria-status-div' );
			statusDiv.setAttribute( 'aria-live', 'polite' );
			statusDiv.setAttribute( 'aria-atomic','true' );
			dom.wrapper.appendChild( statusDiv );
		}
		return statusDiv;

	}

	/**
	 * Converts the given HTML element into a string of text
	 * that can be announced to a screen reader. Hidden
	 * elements are excluded.
	 */
	function getStatusText( node ) {

		var text = '';

		// Text node
		if( node.nodeType === 3 ) {
			text += node.textContent;
		}
		// Element node
		else if( node.nodeType === 1 ) {

			var isAriaHidden = node.getAttribute( 'aria-hidden' );
			var isDisplayHidden = window.getComputedStyle( node )['display'] === 'none';
			if( isAriaHidden !== 'true' && !isDisplayHidden ) {

				toArray( node.childNodes ).forEach( function( child ) {
					text += getStatusText( child );
				} );

			}

		}

		return text;

	}

	/**
	 * Configures the presentation for printing to a static
	 * PDF.
	 */
	function setupPDF() {

		var slideSize = getComputedSlideSize( window.innerWidth, window.innerHeight );

		// Dimensions of the PDF pages
		var pageWidth = Math.floor( slideSize.width * ( 1 + config.margin ) ),
			pageHeight = Math.floor( slideSize.height * ( 1 + config.margin ) );

		// Dimensions of slides within the pages
		var slideWidth = slideSize.width,
			slideHeight = slideSize.height;

		// Let the browser know what page size we want to print
		injectStyleSheet( '@page{size:'+ pageWidth +'px '+ pageHeight +'px; margin: 0px;}' );

		// Limit the size of certain elements to the dimensions of the slide
		injectStyleSheet( '.reveal section>img, .reveal section>video, .reveal section>iframe{max-width: '+ slideWidth +'px; max-height:'+ slideHeight +'px}' );

		document.body.classList.add( 'print-pdf' );
		document.body.style.width = pageWidth + 'px';
		document.body.style.height = pageHeight + 'px';

		// Make sure stretch elements fit on slide
		layoutSlideContents( slideWidth, slideHeight );

		// Add each slide's index as attributes on itself, we need these
		// indices to generate slide numbers below
		toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ).forEach( function( hslide, h ) {
			hslide.setAttribute( 'data-index-h', h );

			if( hslide.classList.contains( 'stack' ) ) {
				toArray( hslide.querySelectorAll( 'section' ) ).forEach( function( vslide, v ) {
					vslide.setAttribute( 'data-index-h', h );
					vslide.setAttribute( 'data-index-v', v );
				} );
			}
		} );

		// Slide and slide background layout
		toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR ) ).forEach( function( slide ) {

			// Vertical stacks are not centred since their section
			// children will be
			if( slide.classList.contains( 'stack' ) === false ) {
				// Center the slide inside of the page, giving the slide some margin
				var left = ( pageWidth - slideWidth ) / 2,
					top = ( pageHeight - slideHeight ) / 2;

				var contentHeight = slide.scrollHeight;
				var numberOfPages = Math.max( Math.ceil( contentHeight / pageHeight ), 1 );

				// Adhere to configured pages per slide limit
				numberOfPages = Math.min( numberOfPages, config.pdfMaxPagesPerSlide );

				// Center slides vertically
				if( numberOfPages === 1 && config.center || slide.classList.contains( 'center' ) ) {
					top = Math.max( ( pageHeight - contentHeight ) / 2, 0 );
				}

				// Wrap the slide in a page element and hide its overflow
				// so that no page ever flows onto another
				var page = document.createElement( 'div' );
				page.className = 'pdf-page';
				page.style.height = ( ( pageHeight + config.pdfPageHeightOffset ) * numberOfPages ) + 'px';
				slide.parentNode.insertBefore( page, slide );
				page.appendChild( slide );

				// Position the slide inside of the page
				slide.style.left = left + 'px';
				slide.style.top = top + 'px';
				slide.style.width = slideWidth + 'px';

				if( slide.slideBackgroundElement ) {
					page.insertBefore( slide.slideBackgroundElement, slide );
				}

				// Inject notes if `showNotes` is enabled
				if( config.showNotes ) {

					// Are there notes for this slide?
					var notes = getSlideNotes( slide );
					if( notes ) {

						var notesSpacing = 8;
						var notesLayout = typeof config.showNotes === 'string' ? config.showNotes : 'inline';
						var notesElement = document.createElement( 'div' );
						notesElement.classList.add( 'speaker-notes' );
						notesElement.classList.add( 'speaker-notes-pdf' );
						notesElement.setAttribute( 'data-layout', notesLayout );
						notesElement.innerHTML = notes;

						if( notesLayout === 'separate-page' ) {
							page.parentNode.insertBefore( notesElement, page.nextSibling );
						}
						else {
							notesElement.style.left = notesSpacing + 'px';
							notesElement.style.bottom = notesSpacing + 'px';
							notesElement.style.width = ( pageWidth - notesSpacing*2 ) + 'px';
							page.appendChild( notesElement );
						}

					}

				}

				// Inject slide numbers if `slideNumbers` are enabled
				if( config.slideNumber && /all|print/i.test( config.showSlideNumber ) ) {
					var slideNumberH = parseInt( slide.getAttribute( 'data-index-h' ), 10 ) + 1,
						slideNumberV = parseInt( slide.getAttribute( 'data-index-v' ), 10 ) + 1;

					var numberElement = document.createElement( 'div' );
					numberElement.classList.add( 'slide-number' );
					numberElement.classList.add( 'slide-number-pdf' );
					numberElement.innerHTML = formatSlideNumber( slideNumberH, '.', slideNumberV );
					page.appendChild( numberElement );
				}
			}

		} );

		// Show all fragments
		toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR + ' .fragment' ) ).forEach( function( fragment ) {
			fragment.classList.add( 'visible' );
		} );

		// Notify subscribers that the PDF layout is good to go
		dispatchEvent( 'pdf-ready' );

	}

	/**
	 * This is an unfortunate necessity. Some actions – such as
	 * an input field being focused in an iframe or using the
	 * keyboard to expand text selection beyond the bounds of
	 * a slide – can trigger our content to be pushed out of view.
	 * This scrolling can not be prevented by hiding overflow in
	 * CSS (we already do) so we have to resort to repeatedly
	 * checking if the slides have been offset :(
	 */
	function setupScrollPrevention() {

		setInterval( function() {
			if( dom.wrapper.scrollTop !== 0 || dom.wrapper.scrollLeft !== 0 ) {
				dom.wrapper.scrollTop = 0;
				dom.wrapper.scrollLeft = 0;
			}
		}, 1000 );

	}

	/**
	 * Creates an HTML element and returns a reference to it.
	 * If the element already exists the existing instance will
	 * be returned.
	 *
	 * @param {HTMLElement} container
	 * @param {string} tagname
	 * @param {string} classname
	 * @param {string} innerHTML
	 *
	 * @return {HTMLElement}
	 */
	function createSingletonNode( container, tagname, classname, innerHTML ) {

		// Find all nodes matching the description
		var nodes = container.querySelectorAll( '.' + classname );

		// Check all matches to find one which is a direct child of
		// the specified container
		for( var i = 0; i < nodes.length; i++ ) {
			var testNode = nodes[i];
			if( testNode.parentNode === container ) {
				return testNode;
			}
		}

		// If no node was found, create it now
		var node = document.createElement( tagname );
		node.classList.add( classname );
		if( typeof innerHTML === 'string' ) {
			node.innerHTML = innerHTML;
		}
		container.appendChild( node );

		return node;

	}

	/**
	 * Creates the slide background elements and appends them
	 * to the background container. One element is created per
	 * slide no matter if the given slide has visible background.
	 */
	function createBackgrounds() {

		var printMode = isPrintingPDF();

		// Clear prior backgrounds
		dom.background.innerHTML = '';
		dom.background.classList.add( 'no-transition' );

		// Iterate over all horizontal slides
		toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ).forEach( function( slideh ) {

			var backgroundStack = createBackground( slideh, dom.background );

			// Iterate over all vertical slides
			toArray( slideh.querySelectorAll( 'section' ) ).forEach( function( slidev ) {

				createBackground( slidev, backgroundStack );

				backgroundStack.classList.add( 'stack' );

			} );

		} );

		// Add parallax background if specified
		if( config.parallaxBackgroundImage ) {

			dom.background.style.backgroundImage = 'url("' + config.parallaxBackgroundImage + '")';
			dom.background.style.backgroundSize = config.parallaxBackgroundSize;

			// Make sure the below properties are set on the element - these properties are
			// needed for proper transitions to be set on the element via CSS. To remove
			// annoying background slide-in effect when the presentation starts, apply
			// these properties after short time delay
			setTimeout( function() {
				dom.wrapper.classList.add( 'has-parallax-background' );
			}, 1 );

		}
		else {

			dom.background.style.backgroundImage = '';
			dom.wrapper.classList.remove( 'has-parallax-background' );

		}

	}

	/**
	 * Creates a background for the given slide.
	 *
	 * @param {HTMLElement} slide
	 * @param {HTMLElement} container The element that the background
	 * should be appended to
	 * @return {HTMLElement} New background div
	 */
	function createBackground( slide, container ) {

		var data = {
			background: slide.getAttribute( 'data-background' ),
			backgroundSize: slide.getAttribute( 'data-background-size' ),
			backgroundImage: slide.getAttribute( 'data-background-image' ),
			backgroundVideo: slide.getAttribute( 'data-background-video' ),
			backgroundIframe: slide.getAttribute( 'data-background-iframe' ),
			backgroundColor: slide.getAttribute( 'data-background-color' ),
			backgroundRepeat: slide.getAttribute( 'data-background-repeat' ),
			backgroundPosition: slide.getAttribute( 'data-background-position' ),
			backgroundTransition: slide.getAttribute( 'data-background-transition' )
		};

		var element = document.createElement( 'div' );

		// Carry over custom classes from the slide to the background
		element.className = 'slide-background ' + slide.className.replace( /present|past|future/, '' );

		if( data.background ) {
			// Auto-wrap image urls in url(...)
			if( /^(http|file|\/\/)/gi.test( data.background ) || /\.(svg|png|jpg|jpeg|gif|bmp)([?#]|$)/gi.test( data.background ) ) {
				slide.setAttribute( 'data-background-image', data.background );
			}
			else {
				element.style.background = data.background;
			}
		}

		// Create a hash for this combination of background settings.
		// This is used to determine when two slide backgrounds are
		// the same.
		if( data.background || data.backgroundColor || data.backgroundImage || data.backgroundVideo || data.backgroundIframe ) {
			element.setAttribute( 'data-background-hash', data.background +
															data.backgroundSize +
															data.backgroundImage +
															data.backgroundVideo +
															data.backgroundIframe +
															data.backgroundColor +
															data.backgroundRepeat +
															data.backgroundPosition +
															data.backgroundTransition );
		}

		// Additional and optional background properties
		if( data.backgroundSize ) element.style.backgroundSize = data.backgroundSize;
		if( data.backgroundSize ) element.setAttribute( 'data-background-size', data.backgroundSize );
		if( data.backgroundColor ) element.style.backgroundColor = data.backgroundColor;
		if( data.backgroundRepeat ) element.style.backgroundRepeat = data.backgroundRepeat;
		if( data.backgroundPosition ) element.style.backgroundPosition = data.backgroundPosition;
		if( data.backgroundTransition ) element.setAttribute( 'data-background-transition', data.backgroundTransition );

		container.appendChild( element );

		// If backgrounds are being recreated, clear old classes
		slide.classList.remove( 'has-dark-background' );
		slide.classList.remove( 'has-light-background' );

		slide.slideBackgroundElement = element;

		// If this slide has a background color, add a class that
		// signals if it is light or dark. If the slide has no background
		// color, no class will be set
		var computedBackgroundStyle = window.getComputedStyle( element );
		if( computedBackgroundStyle && computedBackgroundStyle.backgroundColor ) {
			var rgb = colorToRgb( computedBackgroundStyle.backgroundColor );

			// Ignore fully transparent backgrounds. Some browsers return
			// rgba(0,0,0,0) when reading the computed background color of
			// an element with no background
			if( rgb && rgb.a !== 0 ) {
				if( colorBrightness( computedBackgroundStyle.backgroundColor ) < 128 ) {
					slide.classList.add( 'has-dark-background' );
				}
				else {
					slide.classList.add( 'has-light-background' );
				}
			}
		}

		return element;

	}

	/**
	 * Registers a listener to postMessage events, this makes it
	 * possible to call all reveal.js API methods from another
	 * window. For example:
	 *
	 * revealWindow.postMessage( JSON.stringify({
	 *   method: 'slide',
	 *   args: [ 2 ]
	 * }), '*' );
	 */
	function setupPostMessage() {

		if( config.postMessage ) {
			window.addEventListener( 'message', function ( event ) {
				var data = event.data;

				// Make sure we're dealing with JSON
				if( typeof data === 'string' && data.charAt( 0 ) === '{' && data.charAt( data.length - 1 ) === '}' ) {
					data = JSON.parse( data );

					// Check if the requested method can be found
					if( data.method && typeof Reveal[data.method] === 'function' ) {
						Reveal[data.method].apply( Reveal, data.args );
					}
				}
			}, false );
		}

	}

	/**
	 * Applies the configuration settings from the config
	 * object. May be called multiple times.
	 *
	 * @param {object} options
	 */
	function configure( options ) {

		var numberOfSlides = dom.wrapper.querySelectorAll( SLIDES_SELECTOR ).length;

		dom.wrapper.classList.remove( config.transition );

		// New config options may be passed when this method
		// is invoked through the API after initialization
		if( typeof options === 'object' ) extend( config, options );

		// Force linear transition based on browser capabilities
		if( features.transforms3d === false ) config.transition = 'linear';

		dom.wrapper.classList.add( config.transition );

		dom.wrapper.setAttribute( 'data-transition-speed', config.transitionSpeed );
		dom.wrapper.setAttribute( 'data-background-transition', config.backgroundTransition );

		dom.controls.style.display = config.controls ? 'block' : 'none';
		dom.progress.style.display = config.progress ? 'block' : 'none';

		if( config.shuffle ) {
			shuffle();
		}

		if( config.rtl ) {
			dom.wrapper.classList.add( 'rtl' );
		}
		else {
			dom.wrapper.classList.remove( 'rtl' );
		}

		if( config.center ) {
			dom.wrapper.classList.add( 'center' );
		}
		else {
			dom.wrapper.classList.remove( 'center' );
		}

		// Exit the paused mode if it was configured off
		if( config.pause === false ) {
			resume();
		}

		if( config.showNotes ) {
			dom.speakerNotes.classList.add( 'visible' );
			dom.speakerNotes.setAttribute( 'data-layout', typeof config.showNotes === 'string' ? config.showNotes : 'inline' );
		}
		else {
			dom.speakerNotes.classList.remove( 'visible' );
		}

		if( config.mouseWheel ) {
			document.addEventListener( 'DOMMouseScroll', onDocumentMouseScroll, false ); // FF
			document.addEventListener( 'mousewheel', onDocumentMouseScroll, false );
		}
		else {
			document.removeEventListener( 'DOMMouseScroll', onDocumentMouseScroll, false ); // FF
			document.removeEventListener( 'mousewheel', onDocumentMouseScroll, false );
		}

		// Rolling 3D links
		if( config.rollingLinks ) {
			enableRollingLinks();
		}
		else {
			disableRollingLinks();
		}

		// Iframe link previews
		if( config.previewLinks ) {
			enablePreviewLinks();
			disablePreviewLinks( '[data-preview-link=false]' );
		}
		else {
			disablePreviewLinks();
			enablePreviewLinks( '[data-preview-link]:not([data-preview-link=false])' );
		}

		// Remove existing auto-slide controls
		if( autoSlidePlayer ) {
			autoSlidePlayer.destroy();
			autoSlidePlayer = null;
		}

		// Generate auto-slide controls if needed
		if( numberOfSlides > 1 && config.autoSlide && config.autoSlideStoppable && features.canvas && features.requestAnimationFrame ) {
			autoSlidePlayer = new Playback( dom.wrapper, function() {
				return Math.min( Math.max( ( Date.now() - autoSlideStartTime ) / autoSlide, 0 ), 1 );
			} );

			autoSlidePlayer.on( 'click', onAutoSlidePlayerClick );
			autoSlidePaused = false;
		}

		// When fragments are turned off they should be visible
		if( config.fragments === false ) {
			toArray( dom.slides.querySelectorAll( '.fragment' ) ).forEach( function( element ) {
				element.classList.add( 'visible' );
				element.classList.remove( 'current-fragment' );
			} );
		}

		// Slide numbers
		var slideNumberDisplay = 'none';
		if( config.slideNumber && !isPrintingPDF() ) {
			if( config.showSlideNumber === 'all' ) {
				slideNumberDisplay = 'block';
			}
			else if( config.showSlideNumber === 'speaker' && isSpeakerNotes() ) {
				slideNumberDisplay = 'block';
			}
		}

		dom.slideNumber.style.display = slideNumberDisplay;

		sync();

	}

	/**
	 * Binds all event listeners.
	 */
	function addEventListeners() {

		eventsAreBound = true;

		window.addEventListener( 'hashchange', onWindowHashChange, false );
		window.addEventListener( 'resize', onWindowResize, false );

		if( config.touch ) {
			dom.wrapper.addEventListener( 'touchstart', onTouchStart, false );
			dom.wrapper.addEventListener( 'touchmove', onTouchMove, false );
			dom.wrapper.addEventListener( 'touchend', onTouchEnd, false );

			// Support pointer-style touch interaction as well
			if( window.navigator.pointerEnabled ) {
				// IE 11 uses un-prefixed version of pointer events
				dom.wrapper.addEventListener( 'pointerdown', onPointerDown, false );
				dom.wrapper.addEventListener( 'pointermove', onPointerMove, false );
				dom.wrapper.addEventListener( 'pointerup', onPointerUp, false );
			}
			else if( window.navigator.msPointerEnabled ) {
				// IE 10 uses prefixed version of pointer events
				dom.wrapper.addEventListener( 'MSPointerDown', onPointerDown, false );
				dom.wrapper.addEventListener( 'MSPointerMove', onPointerMove, false );
				dom.wrapper.addEventListener( 'MSPointerUp', onPointerUp, false );
			}
		}

		if( config.keyboard ) {
			document.addEventListener( 'keydown', onDocumentKeyDown, false );
			document.addEventListener( 'keypress', onDocumentKeyPress, false );
		}

		if( config.progress && dom.progress ) {
			dom.progress.addEventListener( 'click', onProgressClicked, false );
		}

		if( config.focusBodyOnPageVisibilityChange ) {
			var visibilityChange;

			if( 'hidden' in document ) {
				visibilityChange = 'visibilitychange';
			}
			else if( 'msHidden' in document ) {
				visibilityChange = 'msvisibilitychange';
			}
			else if( 'webkitHidden' in document ) {
				visibilityChange = 'webkitvisibilitychange';
			}

			if( visibilityChange ) {
				document.addEventListener( visibilityChange, onPageVisibilityChange, false );
			}
		}

		// Listen to both touch and click events, in case the device
		// supports both
		var pointerEvents = [ 'touchstart', 'click' ];

		// Only support touch for Android, fixes double navigations in
		// stock browser
		if( UA.match( /android/gi ) ) {
			pointerEvents = [ 'touchstart' ];
		}

		pointerEvents.forEach( function( eventName ) {
			dom.controlsLeft.forEach( function( el ) { el.addEventListener( eventName, onNavigateLeftClicked, false ); } );
			dom.controlsRight.forEach( function( el ) { el.addEventListener( eventName, onNavigateRightClicked, false ); } );
			dom.controlsUp.forEach( function( el ) { el.addEventListener( eventName, onNavigateUpClicked, false ); } );
			dom.controlsDown.forEach( function( el ) { el.addEventListener( eventName, onNavigateDownClicked, false ); } );
			dom.controlsPrev.forEach( function( el ) { el.addEventListener( eventName, onNavigatePrevClicked, false ); } );
			dom.controlsNext.forEach( function( el ) { el.addEventListener( eventName, onNavigateNextClicked, false ); } );
		} );

	}

	/**
	 * Unbinds all event listeners.
	 */
	function removeEventListeners() {

		eventsAreBound = false;

		document.removeEventListener( 'keydown', onDocumentKeyDown, false );
		document.removeEventListener( 'keypress', onDocumentKeyPress, false );
		window.removeEventListener( 'hashchange', onWindowHashChange, false );
		window.removeEventListener( 'resize', onWindowResize, false );

		dom.wrapper.removeEventListener( 'touchstart', onTouchStart, false );
		dom.wrapper.removeEventListener( 'touchmove', onTouchMove, false );
		dom.wrapper.removeEventListener( 'touchend', onTouchEnd, false );

		// IE11
		if( window.navigator.pointerEnabled ) {
			dom.wrapper.removeEventListener( 'pointerdown', onPointerDown, false );
			dom.wrapper.removeEventListener( 'pointermove', onPointerMove, false );
			dom.wrapper.removeEventListener( 'pointerup', onPointerUp, false );
		}
		// IE10
		else if( window.navigator.msPointerEnabled ) {
			dom.wrapper.removeEventListener( 'MSPointerDown', onPointerDown, false );
			dom.wrapper.removeEventListener( 'MSPointerMove', onPointerMove, false );
			dom.wrapper.removeEventListener( 'MSPointerUp', onPointerUp, false );
		}

		if ( config.progress && dom.progress ) {
			dom.progress.removeEventListener( 'click', onProgressClicked, false );
		}

		[ 'touchstart', 'click' ].forEach( function( eventName ) {
			dom.controlsLeft.forEach( function( el ) { el.removeEventListener( eventName, onNavigateLeftClicked, false ); } );
			dom.controlsRight.forEach( function( el ) { el.removeEventListener( eventName, onNavigateRightClicked, false ); } );
			dom.controlsUp.forEach( function( el ) { el.removeEventListener( eventName, onNavigateUpClicked, false ); } );
			dom.controlsDown.forEach( function( el ) { el.removeEventListener( eventName, onNavigateDownClicked, false ); } );
			dom.controlsPrev.forEach( function( el ) { el.removeEventListener( eventName, onNavigatePrevClicked, false ); } );
			dom.controlsNext.forEach( function( el ) { el.removeEventListener( eventName, onNavigateNextClicked, false ); } );
		} );

	}

	/**
	 * Extend object a with the properties of object b.
	 * If there's a conflict, object b takes precedence.
	 *
	 * @param {object} a
	 * @param {object} b
	 */
	function extend( a, b ) {

		for( var i in b ) {
			a[ i ] = b[ i ];
		}

	}

	/**
	 * Converts the target object to an array.
	 *
	 * @param {object} o
	 * @return {object[]}
	 */
	function toArray( o ) {

		return Array.prototype.slice.call( o );

	}

	/**
	 * Utility for deserializing a value.
	 *
	 * @param {*} value
	 * @return {*}
	 */
	function deserialize( value ) {

		if( typeof value === 'string' ) {
			if( value === 'null' ) return null;
			else if( value === 'true' ) return true;
			else if( value === 'false' ) return false;
			else if( value.match( /^[\d\.]+$/ ) ) return parseFloat( value );
		}

		return value;

	}

	/**
	 * Measures the distance in pixels between point a
	 * and point b.
	 *
	 * @param {object} a point with x/y properties
	 * @param {object} b point with x/y properties
	 *
	 * @return {number}
	 */
	function distanceBetween( a, b ) {

		var dx = a.x - b.x,
			dy = a.y - b.y;

		return Math.sqrt( dx*dx + dy*dy );

	}

	/**
	 * Applies a CSS transform to the target element.
	 *
	 * @param {HTMLElement} element
	 * @param {string} transform
	 */
	function transformElement( element, transform ) {

		element.style.WebkitTransform = transform;
		element.style.MozTransform = transform;
		element.style.msTransform = transform;
		element.style.transform = transform;

	}

	/**
	 * Applies CSS transforms to the slides container. The container
	 * is transformed from two separate sources: layout and the overview
	 * mode.
	 *
	 * @param {object} transforms
	 */
	function transformSlides( transforms ) {

		// Pick up new transforms from arguments
		if( typeof transforms.layout === 'string' ) slidesTransform.layout = transforms.layout;
		if( typeof transforms.overview === 'string' ) slidesTransform.overview = transforms.overview;

		// Apply the transforms to the slides container
		if( slidesTransform.layout ) {
			transformElement( dom.slides, slidesTransform.layout + ' ' + slidesTransform.overview );
		}
		else {
			transformElement( dom.slides, slidesTransform.overview );
		}

	}

	/**
	 * Injects the given CSS styles into the DOM.
	 *
	 * @param {string} value
	 */
	function injectStyleSheet( value ) {

		var tag = document.createElement( 'style' );
		tag.type = 'text/css';
		if( tag.styleSheet ) {
			tag.styleSheet.cssText = value;
		}
		else {
			tag.appendChild( document.createTextNode( value ) );
		}
		document.getElementsByTagName( 'head' )[0].appendChild( tag );

	}

	/**
	 * Find the closest parent that matches the given
	 * selector.
	 *
	 * @param {HTMLElement} target The child element
	 * @param {String} selector The CSS selector to match
	 * the parents against
	 *
	 * @return {HTMLElement} The matched parent or null
	 * if no matching parent was found
	 */
	function closestParent( target, selector ) {

		var parent = target.parentNode;

		while( parent ) {

			// There's some overhead doing this each time, we don't
			// want to rewrite the element prototype but should still
			// be enough to feature detect once at startup...
			var matchesMethod = parent.matches || parent.matchesSelector || parent.msMatchesSelector;

			// If we find a match, we're all set
			if( matchesMethod && matchesMethod.call( parent, selector ) ) {
				return parent;
			}

			// Keep searching
			parent = parent.parentNode;

		}

		return null;

	}

	/**
	 * Converts various color input formats to an {r:0,g:0,b:0} object.
	 *
	 * @param {string} color The string representation of a color
	 * @example
	 * colorToRgb('#000');
	 * @example
	 * colorToRgb('#000000');
	 * @example
	 * colorToRgb('rgb(0,0,0)');
	 * @example
	 * colorToRgb('rgba(0,0,0)');
	 *
	 * @return {{r: number, g: number, b: number, [a]: number}|null}
	 */
	function colorToRgb( color ) {

		var hex3 = color.match( /^#([0-9a-f]{3})$/i );
		if( hex3 && hex3[1] ) {
			hex3 = hex3[1];
			return {
				r: parseInt( hex3.charAt( 0 ), 16 ) * 0x11,
				g: parseInt( hex3.charAt( 1 ), 16 ) * 0x11,
				b: parseInt( hex3.charAt( 2 ), 16 ) * 0x11
			};
		}

		var hex6 = color.match( /^#([0-9a-f]{6})$/i );
		if( hex6 && hex6[1] ) {
			hex6 = hex6[1];
			return {
				r: parseInt( hex6.substr( 0, 2 ), 16 ),
				g: parseInt( hex6.substr( 2, 2 ), 16 ),
				b: parseInt( hex6.substr( 4, 2 ), 16 )
			};
		}

		var rgb = color.match( /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i );
		if( rgb ) {
			return {
				r: parseInt( rgb[1], 10 ),
				g: parseInt( rgb[2], 10 ),
				b: parseInt( rgb[3], 10 )
			};
		}

		var rgba = color.match( /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i );
		if( rgba ) {
			return {
				r: parseInt( rgba[1], 10 ),
				g: parseInt( rgba[2], 10 ),
				b: parseInt( rgba[3], 10 ),
				a: parseFloat( rgba[4] )
			};
		}

		return null;

	}

	/**
	 * Calculates brightness on a scale of 0-255.
	 *
	 * @param {string} color See colorToRgb for supported formats.
	 * @see {@link colorToRgb}
	 */
	function colorBrightness( color ) {

		if( typeof color === 'string' ) color = colorToRgb( color );

		if( color ) {
			return ( color.r * 299 + color.g * 587 + color.b * 114 ) / 1000;
		}

		return null;

	}

	/**
	 * Returns the remaining height within the parent of the
	 * target element.
	 *
	 * remaining height = [ configured parent height ] - [ current parent height ]
	 *
	 * @param {HTMLElement} element
	 * @param {number} [height]
	 */
	function getRemainingHeight( element, height ) {

		height = height || 0;

		if( element ) {
			var newHeight, oldHeight = element.style.height;

			// Change the .stretch element height to 0 in order find the height of all
			// the other elements
			element.style.height = '0px';
			newHeight = height - element.parentNode.offsetHeight;

			// Restore the old height, just in case
			element.style.height = oldHeight + 'px';

			return newHeight;
		}

		return height;

	}

	/**
	 * Checks if this instance is being used to print a PDF.
	 */
	function isPrintingPDF() {

		return ( /print-pdf/gi ).test( window.location.search );

	}

	/**
	 * Hides the address bar if we're on a mobile device.
	 */
	function hideAddressBar() {

		if( config.hideAddressBar && isMobileDevice ) {
			// Events that should trigger the address bar to hide
			window.addEventListener( 'load', removeAddressBar, false );
			window.addEventListener( 'orientationchange', removeAddressBar, false );
		}

	}

	/**
	 * Causes the address bar to hide on mobile devices,
	 * more vertical space ftw.
	 */
	function removeAddressBar() {

		setTimeout( function() {
			window.scrollTo( 0, 1 );
		}, 10 );

	}

	/**
	 * Dispatches an event of the specified type from the
	 * reveal DOM element.
	 */
	function dispatchEvent( type, args ) {

		var event = document.createEvent( 'HTMLEvents', 1, 2 );
		event.initEvent( type, true, true );
		extend( event, args );
		dom.wrapper.dispatchEvent( event );

		// If we're in an iframe, post each reveal.js event to the
		// parent window. Used by the notes plugin
		if( config.postMessageEvents && window.parent !== window.self ) {
			window.parent.postMessage( JSON.stringify({ namespace: 'reveal', eventName: type, state: getState() }), '*' );
		}

	}

	/**
	 * Wrap all links in 3D goodness.
	 */
	function enableRollingLinks() {

		if( features.transforms3d && !( 'msPerspective' in document.body.style ) ) {
			var anchors = dom.wrapper.querySelectorAll( SLIDES_SELECTOR + ' a' );

			for( var i = 0, len = anchors.length; i < len; i++ ) {
				var anchor = anchors[i];

				if( anchor.textContent && !anchor.querySelector( '*' ) && ( !anchor.className || !anchor.classList.contains( anchor, 'roll' ) ) ) {
					var span = document.createElement('span');
					span.setAttribute('data-title', anchor.text);
					span.innerHTML = anchor.innerHTML;

					anchor.classList.add( 'roll' );
					anchor.innerHTML = '';
					anchor.appendChild(span);
				}
			}
		}

	}

	/**
	 * Unwrap all 3D links.
	 */
	function disableRollingLinks() {

		var anchors = dom.wrapper.querySelectorAll( SLIDES_SELECTOR + ' a.roll' );

		for( var i = 0, len = anchors.length; i < len; i++ ) {
			var anchor = anchors[i];
			var span = anchor.querySelector( 'span' );

			if( span ) {
				anchor.classList.remove( 'roll' );
				anchor.innerHTML = span.innerHTML;
			}
		}

	}

	/**
	 * Bind preview frame links.
	 *
	 * @param {string} [selector=a] - selector for anchors
	 */
	function enablePreviewLinks( selector ) {

		var anchors = toArray( document.querySelectorAll( selector ? selector : 'a' ) );

		anchors.forEach( function( element ) {
			if( /^(http|www)/gi.test( element.getAttribute( 'href' ) ) ) {
				element.addEventListener( 'click', onPreviewLinkClicked, false );
			}
		} );

	}

	/**
	 * Unbind preview frame links.
	 */
	function disablePreviewLinks( selector ) {

		var anchors = toArray( document.querySelectorAll( selector ? selector : 'a' ) );

		anchors.forEach( function( element ) {
			if( /^(http|www)/gi.test( element.getAttribute( 'href' ) ) ) {
				element.removeEventListener( 'click', onPreviewLinkClicked, false );
			}
		} );

	}

	/**
	 * Opens a preview window for the target URL.
	 *
	 * @param {string} url - url for preview iframe src
	 */
	function showPreview( url ) {

		closeOverlay();

		dom.overlay = document.createElement( 'div' );
		dom.overlay.classList.add( 'overlay' );
		dom.overlay.classList.add( 'overlay-preview' );
		dom.wrapper.appendChild( dom.overlay );

		dom.overlay.innerHTML = [
			'<header>',
				'<a class="close" href="#"><span class="icon"></span></a>',
				'<a class="external" href="'+ url +'" target="_blank"><span class="icon"></span></a>',
			'</header>',
			'<div class="spinner"></div>',
			'<div class="viewport">',
				'<iframe src="'+ url +'"></iframe>',
				'<small class="viewport-inner">',
					'<span class="x-frame-error">Unable to load iframe. This is likely due to the site\'s policy (x-frame-options).</span>',
				'</small>',
			'</div>'
		].join('');

		dom.overlay.querySelector( 'iframe' ).addEventListener( 'load', function( event ) {
			dom.overlay.classList.add( 'loaded' );
		}, false );

		dom.overlay.querySelector( '.close' ).addEventListener( 'click', function( event ) {
			closeOverlay();
			event.preventDefault();
		}, false );

		dom.overlay.querySelector( '.external' ).addEventListener( 'click', function( event ) {
			closeOverlay();
		}, false );

		setTimeout( function() {
			dom.overlay.classList.add( 'visible' );
		}, 1 );

	}

	/**
	 * Open or close help overlay window.
	 *
	 * @param {Boolean} [override] Flag which overrides the
	 * toggle logic and forcibly sets the desired state. True means
	 * help is open, false means it's closed.
	 */
	function toggleHelp( override ){

		if( typeof override === 'boolean' ) {
			override ? showHelp() : closeOverlay();
		}
		else {
			if( dom.overlay ) {
				closeOverlay();
			}
			else {
				showHelp();
			}
		}
	}

	/**
	 * Opens an overlay window with help material.
	 */
	function showHelp() {

		if( config.help ) {

			closeOverlay();

			dom.overlay = document.createElement( 'div' );
			dom.overlay.classList.add( 'overlay' );
			dom.overlay.classList.add( 'overlay-help' );
			dom.wrapper.appendChild( dom.overlay );

			var html = '<p class="title">Keyboard Shortcuts</p><br/>';

			html += '<table><th>KEY</th><th>ACTION</th>';
			for( var key in keyboardShortcuts ) {
				html += '<tr><td>' + key + '</td><td>' + keyboardShortcuts[ key ] + '</td></tr>';
			}

			html += '</table>';

			dom.overlay.innerHTML = [
				'<header>',
					'<a class="close" href="#"><span class="icon"></span></a>',
				'</header>',
				'<div class="viewport">',
					'<div class="viewport-inner">'+ html +'</div>',
				'</div>'
			].join('');

			dom.overlay.querySelector( '.close' ).addEventListener( 'click', function( event ) {
				closeOverlay();
				event.preventDefault();
			}, false );

			setTimeout( function() {
				dom.overlay.classList.add( 'visible' );
			}, 1 );

		}

	}

	/**
	 * Closes any currently open overlay.
	 */
	function closeOverlay() {

		if( dom.overlay ) {
			dom.overlay.parentNode.removeChild( dom.overlay );
			dom.overlay = null;
		}

	}

	/**
	 * Applies JavaScript-controlled layout rules to the
	 * presentation.
	 */
	function layout() {

		if( dom.wrapper && !isPrintingPDF() ) {

			var size = getComputedSlideSize();

			// Layout the contents of the slides
			layoutSlideContents( config.width, config.height );

			dom.slides.style.width = size.width + 'px';
			dom.slides.style.height = size.height + 'px';

			// Determine scale of content to fit within available space
			scale = Math.min( size.presentationWidth / size.width, size.presentationHeight / size.height );

			// Respect max/min scale settings
			scale = Math.max( scale, config.minScale );
			scale = Math.min( scale, config.maxScale );

			// Don't apply any scaling styles if scale is 1
			if( scale === 1 ) {
				dom.slides.style.zoom = '';
				dom.slides.style.left = '';
				dom.slides.style.top = '';
				dom.slides.style.bottom = '';
				dom.slides.style.right = '';
				transformSlides( { layout: '' } );
			}
			else {
				// Prefer zoom for scaling up so that content remains crisp.
				// Don't use zoom to scale down since that can lead to shifts
				// in text layout/line breaks.
				if( scale > 1 && features.zoom ) {
					dom.slides.style.zoom = scale;
					dom.slides.style.left = '';
					dom.slides.style.top = '';
					dom.slides.style.bottom = '';
					dom.slides.style.right = '';
					transformSlides( { layout: '' } );
				}
				// Apply scale transform as a fallback
				else {
					dom.slides.style.zoom = '';
					dom.slides.style.left = '50%';
					dom.slides.style.top = '50%';
					dom.slides.style.bottom = 'auto';
					dom.slides.style.right = 'auto';
					transformSlides( { layout: 'translate(-50%, -50%) scale('+ scale +')' } );
				}
			}

			// Select all slides, vertical and horizontal
			var slides = toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR ) );

			for( var i = 0, len = slides.length; i < len; i++ ) {
				var slide = slides[ i ];

				// Don't bother updating invisible slides
				if( slide.style.display === 'none' ) {
					continue;
				}

				if( config.center || slide.classList.contains( 'center' ) ) {
					// Vertical stacks are not centred since their section
					// children will be
					if( slide.classList.contains( 'stack' ) ) {
						slide.style.top = 0;
					}
					else {
						slide.style.top = Math.max( ( size.height - slide.scrollHeight ) / 2, 0 ) + 'px';
					}
				}
				else {
					slide.style.top = '';
				}

			}

			updateProgress();
			updateParallax();

			if( isOverview() ) {
				updateOverview();
			}

		}

	}

	/**
	 * Applies layout logic to the contents of all slides in
	 * the presentation.
	 *
	 * @param {string|number} width
	 * @param {string|number} height
	 */
	function layoutSlideContents( width, height ) {

		// Handle sizing of elements with the 'stretch' class
		toArray( dom.slides.querySelectorAll( 'section > .stretch' ) ).forEach( function( element ) {

			// Determine how much vertical space we can use
			var remainingHeight = getRemainingHeight( element, height );

			// Consider the aspect ratio of media elements
			if( /(img|video)/gi.test( element.nodeName ) ) {
				var nw = element.naturalWidth || element.videoWidth,
					nh = element.naturalHeight || element.videoHeight;

				var es = Math.min( width / nw, remainingHeight / nh );

				element.style.width = ( nw * es ) + 'px';
				element.style.height = ( nh * es ) + 'px';

			}
			else {
				element.style.width = width + 'px';
				element.style.height = remainingHeight + 'px';
			}

		} );

	}

	/**
	 * Calculates the computed pixel size of our slides. These
	 * values are based on the width and height configuration
	 * options.
	 *
	 * @param {number} [presentationWidth=dom.wrapper.offsetWidth]
	 * @param {number} [presentationHeight=dom.wrapper.offsetHeight]
	 */
	function getComputedSlideSize( presentationWidth, presentationHeight ) {

		var size = {
			// Slide size
			width: config.width,
			height: config.height,

			// Presentation size
			presentationWidth: presentationWidth || dom.wrapper.offsetWidth,
			presentationHeight: presentationHeight || dom.wrapper.offsetHeight
		};

		// Reduce available space by margin
		size.presentationWidth -= ( size.presentationWidth * config.margin );
		size.presentationHeight -= ( size.presentationHeight * config.margin );

		// Slide width may be a percentage of available width
		if( typeof size.width === 'string' && /%$/.test( size.width ) ) {
			size.width = parseInt( size.width, 10 ) / 100 * size.presentationWidth;
		}

		// Slide height may be a percentage of available height
		if( typeof size.height === 'string' && /%$/.test( size.height ) ) {
			size.height = parseInt( size.height, 10 ) / 100 * size.presentationHeight;
		}

		return size;

	}

	/**
	 * Stores the vertical index of a stack so that the same
	 * vertical slide can be selected when navigating to and
	 * from the stack.
	 *
	 * @param {HTMLElement} stack The vertical stack element
	 * @param {string|number} [v=0] Index to memorize
	 */
	function setPreviousVerticalIndex( stack, v ) {

		if( typeof stack === 'object' && typeof stack.setAttribute === 'function' ) {
			stack.setAttribute( 'data-previous-indexv', v || 0 );
		}

	}

	/**
	 * Retrieves the vertical index which was stored using
	 * #setPreviousVerticalIndex() or 0 if no previous index
	 * exists.
	 *
	 * @param {HTMLElement} stack The vertical stack element
	 */
	function getPreviousVerticalIndex( stack ) {

		if( typeof stack === 'object' && typeof stack.setAttribute === 'function' && stack.classList.contains( 'stack' ) ) {
			// Prefer manually defined start-indexv
			var attributeName = stack.hasAttribute( 'data-start-indexv' ) ? 'data-start-indexv' : 'data-previous-indexv';

			return parseInt( stack.getAttribute( attributeName ) || 0, 10 );
		}

		return 0;

	}

	/**
	 * Displays the overview of slides (quick nav) by scaling
	 * down and arranging all slide elements.
	 */
	function activateOverview() {

		// Only proceed if enabled in config
		if( config.overview && !isOverview() ) {

			overview = true;

			dom.wrapper.classList.add( 'overview' );
			dom.wrapper.classList.remove( 'overview-deactivating' );

			if( features.overviewTransitions ) {
				setTimeout( function() {
					dom.wrapper.classList.add( 'overview-animated' );
				}, 1 );
			}

			// Don't auto-slide while in overview mode
			cancelAutoSlide();

			// Move the backgrounds element into the slide container to
			// that the same scaling is applied
			dom.slides.appendChild( dom.background );

			// Clicking on an overview slide navigates to it
			toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR ) ).forEach( function( slide ) {
				if( !slide.classList.contains( 'stack' ) ) {
					slide.addEventListener( 'click', onOverviewSlideClicked, true );
				}
			} );

			// Calculate slide sizes
			var margin = 70;
			var slideSize = getComputedSlideSize();
			overviewSlideWidth = slideSize.width + margin;
			overviewSlideHeight = slideSize.height + margin;

			// Reverse in RTL mode
			if( config.rtl ) {
				overviewSlideWidth = -overviewSlideWidth;
			}

			updateSlidesVisibility();
			layoutOverview();
			updateOverview();

			layout();

			// Notify observers of the overview showing
			dispatchEvent( 'overviewshown', {
				'indexh': indexh,
				'indexv': indexv,
				'currentSlide': currentSlide
			} );

		}

	}

	/**
	 * Uses CSS transforms to position all slides in a grid for
	 * display inside of the overview mode.
	 */
	function layoutOverview() {

		// Layout slides
		toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ).forEach( function( hslide, h ) {
			hslide.setAttribute( 'data-index-h', h );
			transformElement( hslide, 'translate3d(' + ( h * overviewSlideWidth ) + 'px, 0, 0)' );

			if( hslide.classList.contains( 'stack' ) ) {

				toArray( hslide.querySelectorAll( 'section' ) ).forEach( function( vslide, v ) {
					vslide.setAttribute( 'data-index-h', h );
					vslide.setAttribute( 'data-index-v', v );

					transformElement( vslide, 'translate3d(0, ' + ( v * overviewSlideHeight ) + 'px, 0)' );
				} );

			}
		} );

		// Layout slide backgrounds
		toArray( dom.background.childNodes ).forEach( function( hbackground, h ) {
			transformElement( hbackground, 'translate3d(' + ( h * overviewSlideWidth ) + 'px, 0, 0)' );

			toArray( hbackground.querySelectorAll( '.slide-background' ) ).forEach( function( vbackground, v ) {
				transformElement( vbackground, 'translate3d(0, ' + ( v * overviewSlideHeight ) + 'px, 0)' );
			} );
		} );

	}

	/**
	 * Moves the overview viewport to the current slides.
	 * Called each time the current slide changes.
	 */
	function updateOverview() {

		var vmin = Math.min( window.innerWidth, window.innerHeight );
		var scale = Math.max( vmin / 5, 150 ) / vmin;

		transformSlides( {
			overview: [
				'scale('+ scale +')',
				'translateX('+ ( -indexh * overviewSlideWidth ) +'px)',
				'translateY('+ ( -indexv * overviewSlideHeight ) +'px)'
			].join( ' ' )
		} );

	}

	/**
	 * Exits the slide overview and enters the currently
	 * active slide.
	 */
	function deactivateOverview() {

		// Only proceed if enabled in config
		if( config.overview ) {

			overview = false;

			dom.wrapper.classList.remove( 'overview' );
			dom.wrapper.classList.remove( 'overview-animated' );

			// Temporarily add a class so that transitions can do different things
			// depending on whether they are exiting/entering overview, or just
			// moving from slide to slide
			dom.wrapper.classList.add( 'overview-deactivating' );

			setTimeout( function () {
				dom.wrapper.classList.remove( 'overview-deactivating' );
			}, 1 );

			// Move the background element back out
			dom.wrapper.appendChild( dom.background );

			// Clean up changes made to slides
			toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR ) ).forEach( function( slide ) {
				transformElement( slide, '' );

				slide.removeEventListener( 'click', onOverviewSlideClicked, true );
			} );

			// Clean up changes made to backgrounds
			toArray( dom.background.querySelectorAll( '.slide-background' ) ).forEach( function( background ) {
				transformElement( background, '' );
			} );

			transformSlides( { overview: '' } );

			slide( indexh, indexv );

			layout();

			cueAutoSlide();

			// Notify observers of the overview hiding
			dispatchEvent( 'overviewhidden', {
				'indexh': indexh,
				'indexv': indexv,
				'currentSlide': currentSlide
			} );

		}
	}

	/**
	 * Toggles the slide overview mode on and off.
	 *
	 * @param {Boolean} [override] Flag which overrides the
	 * toggle logic and forcibly sets the desired state. True means
	 * overview is open, false means it's closed.
	 */
	function toggleOverview( override ) {

		if( typeof override === 'boolean' ) {
			override ? activateOverview() : deactivateOverview();
		}
		else {
			isOverview() ? deactivateOverview() : activateOverview();
		}

	}

	/**
	 * Checks if the overview is currently active.
	 *
	 * @return {Boolean} true if the overview is active,
	 * false otherwise
	 */
	function isOverview() {

		return overview;

	}

	/**
	 * Checks if the current or specified slide is vertical
	 * (nested within another slide).
	 *
	 * @param {HTMLElement} [slide=currentSlide] The slide to check
	 * orientation of
	 * @return {Boolean}
	 */
	function isVerticalSlide( slide ) {

		// Prefer slide argument, otherwise use current slide
		slide = slide ? slide : currentSlide;

		return slide && slide.parentNode && !!slide.parentNode.nodeName.match( /section/i );

	}

	/**
	 * Handling the fullscreen functionality via the fullscreen API
	 *
	 * @see http://fullscreen.spec.whatwg.org/
	 * @see https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
	 */
	function enterFullscreen() {

		var element = document.documentElement;

		// Check which implementation is available
		var requestMethod = element.requestFullscreen ||
							element.webkitRequestFullscreen ||
							element.webkitRequestFullScreen ||
							element.mozRequestFullScreen ||
							element.msRequestFullscreen;

		if( requestMethod ) {
			requestMethod.apply( element );
		}

	}

	/**
	 * Enters the paused mode which fades everything on screen to
	 * black.
	 */
	function pause() {

		if( config.pause ) {
			var wasPaused = dom.wrapper.classList.contains( 'paused' );

			cancelAutoSlide();
			dom.wrapper.classList.add( 'paused' );

			if( wasPaused === false ) {
				dispatchEvent( 'paused' );
			}
		}

	}

	/**
	 * Exits from the paused mode.
	 */
	function resume() {

		var wasPaused = dom.wrapper.classList.contains( 'paused' );
		dom.wrapper.classList.remove( 'paused' );

		cueAutoSlide();

		if( wasPaused ) {
			dispatchEvent( 'resumed' );
		}

	}

	/**
	 * Toggles the paused mode on and off.
	 */
	function togglePause( override ) {

		if( typeof override === 'boolean' ) {
			override ? pause() : resume();
		}
		else {
			isPaused() ? resume() : pause();
		}

	}

	/**
	 * Checks if we are currently in the paused mode.
	 *
	 * @return {Boolean}
	 */
	function isPaused() {

		return dom.wrapper.classList.contains( 'paused' );

	}

	/**
	 * Toggles the auto slide mode on and off.
	 *
	 * @param {Boolean} [override] Flag which sets the desired state.
	 * True means autoplay starts, false means it stops.
	 */

	function toggleAutoSlide( override ) {

		if( typeof override === 'boolean' ) {
			override ? resumeAutoSlide() : pauseAutoSlide();
		}

		else {
			autoSlidePaused ? resumeAutoSlide() : pauseAutoSlide();
		}

	}

	/**
	 * Checks if the auto slide mode is currently on.
	 *
	 * @return {Boolean}
	 */
	function isAutoSliding() {

		return !!( autoSlide && !autoSlidePaused );

	}

	/**
	 * Steps from the current point in the presentation to the
	 * slide which matches the specified horizontal and vertical
	 * indices.
	 *
	 * @param {number} [h=indexh] Horizontal index of the target slide
	 * @param {number} [v=indexv] Vertical index of the target slide
	 * @param {number} [f] Index of a fragment within the
	 * target slide to activate
	 * @param {number} [o] Origin for use in multimaster environments
	 */
	function slide( h, v, f, o ) {

		// Remember where we were at before
		previousSlide = currentSlide;

		// Query all horizontal slides in the deck
		var horizontalSlides = dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR );

		// Abort if there are no slides
		if( horizontalSlides.length === 0 ) return;

		// If no vertical index is specified and the upcoming slide is a
		// stack, resume at its previous vertical index
		if( v === undefined && !isOverview() ) {
			v = getPreviousVerticalIndex( horizontalSlides[ h ] );
		}

		// If we were on a vertical stack, remember what vertical index
		// it was on so we can resume at the same position when returning
		if( previousSlide && previousSlide.parentNode && previousSlide.parentNode.classList.contains( 'stack' ) ) {
			setPreviousVerticalIndex( previousSlide.parentNode, indexv );
		}

		// Remember the state before this slide
		var stateBefore = state.concat();

		// Reset the state array
		state.length = 0;

		var indexhBefore = indexh || 0,
			indexvBefore = indexv || 0;

		// Activate and transition to the new slide
		indexh = updateSlides( HORIZONTAL_SLIDES_SELECTOR, h === undefined ? indexh : h );
		indexv = updateSlides( VERTICAL_SLIDES_SELECTOR, v === undefined ? indexv : v );

		// Update the visibility of slides now that the indices have changed
		updateSlidesVisibility();

		layout();

		// Apply the new state
		stateLoop: for( var i = 0, len = state.length; i < len; i++ ) {
			// Check if this state existed on the previous slide. If it
			// did, we will avoid adding it repeatedly
			for( var j = 0; j < stateBefore.length; j++ ) {
				if( stateBefore[j] === state[i] ) {
					stateBefore.splice( j, 1 );
					continue stateLoop;
				}
			}

			document.documentElement.classList.add( state[i] );

			// Dispatch custom event matching the state's name
			dispatchEvent( state[i] );
		}

		// Clean up the remains of the previous state
		while( stateBefore.length ) {
			document.documentElement.classList.remove( stateBefore.pop() );
		}

		// Update the overview if it's currently active
		if( isOverview() ) {
			updateOverview();
		}

		// Find the current horizontal slide and any possible vertical slides
		// within it
		var currentHorizontalSlide = horizontalSlides[ indexh ],
			currentVerticalSlides = currentHorizontalSlide.querySelectorAll( 'section' );

		// Store references to the previous and current slides
		currentSlide = currentVerticalSlides[ indexv ] || currentHorizontalSlide;

		// Show fragment, if specified
		if( typeof f !== 'undefined' ) {
			navigateFragment( f );
		}

		// Dispatch an event if the slide changed
		var slideChanged = ( indexh !== indexhBefore || indexv !== indexvBefore );
		if( slideChanged ) {
			dispatchEvent( 'slidechanged', {
				'indexh': indexh,
				'indexv': indexv,
				'previousSlide': previousSlide,
				'currentSlide': currentSlide,
				'origin': o
			} );
		}
		else {
			// Ensure that the previous slide is never the same as the current
			previousSlide = null;
		}

		// Solves an edge case where the previous slide maintains the
		// 'present' class when navigating between adjacent vertical
		// stacks
		if( previousSlide ) {
			previousSlide.classList.remove( 'present' );
			previousSlide.setAttribute( 'aria-hidden', 'true' );

			// Reset all slides upon navigate to home
			// Issue: #285
			if ( dom.wrapper.querySelector( HOME_SLIDE_SELECTOR ).classList.contains( 'present' ) ) {
				// Launch async task
				setTimeout( function () {
					var slides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR + '.stack') ), i;
					for( i in slides ) {
						if( slides[i] ) {
							// Reset stack
							setPreviousVerticalIndex( slides[i], 0 );
						}
					}
				}, 0 );
			}
		}

		// Handle embedded content
		if( slideChanged || !previousSlide ) {
			stopEmbeddedContent( previousSlide );
			startEmbeddedContent( currentSlide );
		}

		// Announce the current slide contents, for screen readers
		dom.statusDiv.textContent = getStatusText( currentSlide );

		updateControls();
		updateProgress();
		updateBackground();
		updateParallax();
		updateSlideNumber();
		updateNotes();

		// Update the URL hash
		writeURL();

		cueAutoSlide();

	}

	/**
	 * Syncs the presentation with the current DOM. Useful
	 * when new slides or control elements are added or when
	 * the configuration has changed.
	 */
	function sync() {

		// Subscribe to input
		removeEventListeners();
		addEventListeners();

		// Force a layout to make sure the current config is accounted for
		layout();

		// Reflect the current autoSlide value
		autoSlide = config.autoSlide;

		// Start auto-sliding if it's enabled
		cueAutoSlide();

		// Re-create the slide backgrounds
		createBackgrounds();

		// Write the current hash to the URL
		writeURL();

		sortAllFragments();

		updateControls();
		updateProgress();
		updateSlideNumber();
		updateSlidesVisibility();
		updateBackground( true );
		updateNotes();

		formatEmbeddedContent();

		// Start or stop embedded content depending on global config
		if( config.autoPlayMedia === false ) {
			stopEmbeddedContent( currentSlide );
		}
		else {
			startEmbeddedContent( currentSlide );
		}

		if( isOverview() ) {
			layoutOverview();
		}

	}

	/**
	 * Resets all vertical slides so that only the first
	 * is visible.
	 */
	function resetVerticalSlides() {

		var horizontalSlides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );
		horizontalSlides.forEach( function( horizontalSlide ) {

			var verticalSlides = toArray( horizontalSlide.querySelectorAll( 'section' ) );
			verticalSlides.forEach( function( verticalSlide, y ) {

				if( y > 0 ) {
					verticalSlide.classList.remove( 'present' );
					verticalSlide.classList.remove( 'past' );
					verticalSlide.classList.add( 'future' );
					verticalSlide.setAttribute( 'aria-hidden', 'true' );
				}

			} );

		} );

	}

	/**
	 * Sorts and formats all of fragments in the
	 * presentation.
	 */
	function sortAllFragments() {

		var horizontalSlides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );
		horizontalSlides.forEach( function( horizontalSlide ) {

			var verticalSlides = toArray( horizontalSlide.querySelectorAll( 'section' ) );
			verticalSlides.forEach( function( verticalSlide, y ) {

				sortFragments( verticalSlide.querySelectorAll( '.fragment' ) );

			} );

			if( verticalSlides.length === 0 ) sortFragments( horizontalSlide.querySelectorAll( '.fragment' ) );

		} );

	}

	/**
	 * Randomly shuffles all slides in the deck.
	 */
	function shuffle() {

		var slides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );

		slides.forEach( function( slide ) {

			// Insert this slide next to another random slide. This may
			// cause the slide to insert before itself but that's fine.
			dom.slides.insertBefore( slide, slides[ Math.floor( Math.random() * slides.length ) ] );

		} );

	}

	/**
	 * Updates one dimension of slides by showing the slide
	 * with the specified index.
	 *
	 * @param {string} selector A CSS selector that will fetch
	 * the group of slides we are working with
	 * @param {number} index The index of the slide that should be
	 * shown
	 *
	 * @return {number} The index of the slide that is now shown,
	 * might differ from the passed in index if it was out of
	 * bounds.
	 */
	function updateSlides( selector, index ) {

		// Select all slides and convert the NodeList result to
		// an array
		var slides = toArray( dom.wrapper.querySelectorAll( selector ) ),
			slidesLength = slides.length;

		var printMode = isPrintingPDF();

		if( slidesLength ) {

			// Should the index loop?
			if( config.loop ) {
				index %= slidesLength;

				if( index < 0 ) {
					index = slidesLength + index;
				}
			}

			// Enforce max and minimum index bounds
			index = Math.max( Math.min( index, slidesLength - 1 ), 0 );

			for( var i = 0; i < slidesLength; i++ ) {
				var element = slides[i];

				var reverse = config.rtl && !isVerticalSlide( element );

				element.classList.remove( 'past' );
				element.classList.remove( 'present' );
				element.classList.remove( 'future' );

				// http://www.w3.org/html/wg/drafts/html/master/editing.html#the-hidden-attribute
				element.setAttribute( 'hidden', '' );
				element.setAttribute( 'aria-hidden', 'true' );

				// If this element contains vertical slides
				if( element.querySelector( 'section' ) ) {
					element.classList.add( 'stack' );
				}

				// If we're printing static slides, all slides are "present"
				if( printMode ) {
					element.classList.add( 'present' );
					continue;
				}

				if( i < index ) {
					// Any element previous to index is given the 'past' class
					element.classList.add( reverse ? 'future' : 'past' );

					if( config.fragments ) {
						var pastFragments = toArray( element.querySelectorAll( '.fragment' ) );

						// Show all fragments on prior slides
						while( pastFragments.length ) {
							var pastFragment = pastFragments.pop();
							pastFragment.classList.add( 'visible' );
							pastFragment.classList.remove( 'current-fragment' );
						}
					}
				}
				else if( i > index ) {
					// Any element subsequent to index is given the 'future' class
					element.classList.add( reverse ? 'past' : 'future' );

					if( config.fragments ) {
						var futureFragments = toArray( element.querySelectorAll( '.fragment.visible' ) );

						// No fragments in future slides should be visible ahead of time
						while( futureFragments.length ) {
							var futureFragment = futureFragments.pop();
							futureFragment.classList.remove( 'visible' );
							futureFragment.classList.remove( 'current-fragment' );
						}
					}
				}
			}

			// Mark the current slide as present
			slides[index].classList.add( 'present' );
			slides[index].removeAttribute( 'hidden' );
			slides[index].removeAttribute( 'aria-hidden' );

			// If this slide has a state associated with it, add it
			// onto the current state of the deck
			var slideState = slides[index].getAttribute( 'data-state' );
			if( slideState ) {
				state = state.concat( slideState.split( ' ' ) );
			}

		}
		else {
			// Since there are no slides we can't be anywhere beyond the
			// zeroth index
			index = 0;
		}

		return index;

	}

	/**
	 * Optimization method; hide all slides that are far away
	 * from the present slide.
	 */
	function updateSlidesVisibility() {

		// Select all slides and convert the NodeList result to
		// an array
		var horizontalSlides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ),
			horizontalSlidesLength = horizontalSlides.length,
			distanceX,
			distanceY;

		if( horizontalSlidesLength && typeof indexh !== 'undefined' ) {

			// The number of steps away from the present slide that will
			// be visible
			var viewDistance = isOverview() ? 10 : config.viewDistance;

			// Limit view distance on weaker devices
			if( isMobileDevice ) {
				viewDistance = isOverview() ? 6 : 2;
			}

			// All slides need to be visible when exporting to PDF
			if( isPrintingPDF() ) {
				viewDistance = Number.MAX_VALUE;
			}

			for( var x = 0; x < horizontalSlidesLength; x++ ) {
				var horizontalSlide = horizontalSlides[x];

				var verticalSlides = toArray( horizontalSlide.querySelectorAll( 'section' ) ),
					verticalSlidesLength = verticalSlides.length;

				// Determine how far away this slide is from the present
				distanceX = Math.abs( ( indexh || 0 ) - x ) || 0;

				// If the presentation is looped, distance should measure
				// 1 between the first and last slides
				if( config.loop ) {
					distanceX = Math.abs( ( ( indexh || 0 ) - x ) % ( horizontalSlidesLength - viewDistance ) ) || 0;
				}

				// Show the horizontal slide if it's within the view distance
				if( distanceX < viewDistance ) {
					showSlide( horizontalSlide );
				}
				else {
					hideSlide( horizontalSlide );
				}

				if( verticalSlidesLength ) {

					var oy = getPreviousVerticalIndex( horizontalSlide );

					for( var y = 0; y < verticalSlidesLength; y++ ) {
						var verticalSlide = verticalSlides[y];

						distanceY = x === ( indexh || 0 ) ? Math.abs( ( indexv || 0 ) - y ) : Math.abs( y - oy );

						if( distanceX + distanceY < viewDistance ) {
							showSlide( verticalSlide );
						}
						else {
							hideSlide( verticalSlide );
						}
					}

				}
			}

		}

	}

	/**
	 * Pick up notes from the current slide and display them
	 * to the viewer.
	 *
	 * @see {@link config.showNotes}
	 */
	function updateNotes() {

		if( config.showNotes && dom.speakerNotes && currentSlide && !isPrintingPDF() ) {

			dom.speakerNotes.innerHTML = getSlideNotes() || '';

		}

	}

	/**
	 * Updates the progress bar to reflect the current slide.
	 */
	function updateProgress() {

		// Update progress if enabled
		if( config.progress && dom.progressbar ) {

			dom.progressbar.style.width = getProgress() * dom.wrapper.offsetWidth + 'px';

		}

	}

	/**
	 * Updates the slide number div to reflect the current slide.
	 *
	 * The following slide number formats are available:
	 *  "h.v":	horizontal . vertical slide number (default)
	 *  "h/v":	horizontal / vertical slide number
	 *    "c":	flattened slide number
	 *  "c/t":	flattened slide number / total slides
	 */
	function updateSlideNumber() {

		// Update slide number if enabled
		if( config.slideNumber && dom.slideNumber ) {

			var value = [];
			var format = 'h.v';

			// Check if a custom number format is available
			if( typeof config.slideNumber === 'string' ) {
				format = config.slideNumber;
			}

			switch( format ) {
				case 'c':
					value.push( getSlidePastCount() + 1 );
					break;
				case 'c/t':
					value.push( getSlidePastCount() + 1, '/', getTotalSlides() );
					break;
				case 'h/v':
					value.push( indexh + 1 );
					if( isVerticalSlide() ) value.push( '/', indexv + 1 );
					break;
				default:
					value.push( indexh + 1 );
					if( isVerticalSlide() ) value.push( '.', indexv + 1 );
			}

			dom.slideNumber.innerHTML = formatSlideNumber( value[0], value[1], value[2] );
		}

	}

	/**
	 * Applies HTML formatting to a slide number before it's
	 * written to the DOM.
	 *
	 * @param {number} a Current slide
	 * @param {string} delimiter Character to separate slide numbers
	 * @param {(number|*)} b Total slides
	 * @return {string} HTML string fragment
	 */
	function formatSlideNumber( a, delimiter, b ) {

		if( typeof b === 'number' && !isNaN( b ) ) {
			return  '<span class="slide-number-a">'+ a +'</span>' +
					'<span class="slide-number-delimiter">'+ delimiter +'</span>' +
					'<span class="slide-number-b">'+ b +'</span>';
		}
		else {
			return '<span class="slide-number-a">'+ a +'</span>';
		}

	}

	/**
	 * Updates the state of all control/navigation arrows.
	 */
	function updateControls() {

		var routes = availableRoutes();
		var fragments = availableFragments();

		// Remove the 'enabled' class from all directions
		dom.controlsLeft.concat( dom.controlsRight )
						.concat( dom.controlsUp )
						.concat( dom.controlsDown )
						.concat( dom.controlsPrev )
						.concat( dom.controlsNext ).forEach( function( node ) {
			node.classList.remove( 'enabled' );
			node.classList.remove( 'fragmented' );

			// Set 'disabled' attribute on all directions
			node.setAttribute( 'disabled', 'disabled' );
		} );

		// Add the 'enabled' class to the available routes; remove 'disabled' attribute to enable buttons
		if( routes.left ) dom.controlsLeft.forEach( function( el ) { el.classList.add( 'enabled' ); el.removeAttribute( 'disabled' ); } );
		if( routes.right ) dom.controlsRight.forEach( function( el ) { el.classList.add( 'enabled' ); el.removeAttribute( 'disabled' ); } );
		if( routes.up ) dom.controlsUp.forEach( function( el ) { el.classList.add( 'enabled' ); el.removeAttribute( 'disabled' ); } );
		if( routes.down ) dom.controlsDown.forEach( function( el ) { el.classList.add( 'enabled' ); el.removeAttribute( 'disabled' ); } );

		// Prev/next buttons
		if( routes.left || routes.up ) dom.controlsPrev.forEach( function( el ) { el.classList.add( 'enabled' ); el.removeAttribute( 'disabled' ); } );
		if( routes.right || routes.down ) dom.controlsNext.forEach( function( el ) { el.classList.add( 'enabled' ); el.removeAttribute( 'disabled' ); } );

		// Highlight fragment directions
		if( currentSlide ) {

			// Always apply fragment decorator to prev/next buttons
			if( fragments.prev ) dom.controlsPrev.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); el.removeAttribute( 'disabled' ); } );
			if( fragments.next ) dom.controlsNext.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); el.removeAttribute( 'disabled' ); } );

			// Apply fragment decorators to directional buttons based on
			// what slide axis they are in
			if( isVerticalSlide( currentSlide ) ) {
				if( fragments.prev ) dom.controlsUp.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); el.removeAttribute( 'disabled' ); } );
				if( fragments.next ) dom.controlsDown.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); el.removeAttribute( 'disabled' ); } );
			}
			else {
				if( fragments.prev ) dom.controlsLeft.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); el.removeAttribute( 'disabled' ); } );
				if( fragments.next ) dom.controlsRight.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); el.removeAttribute( 'disabled' ); } );
			}

		}

	}

	/**
	 * Updates the background elements to reflect the current
	 * slide.
	 *
	 * @param {boolean} includeAll If true, the backgrounds of
	 * all vertical slides (not just the present) will be updated.
	 */
	function updateBackground( includeAll ) {

		var currentBackground = null;

		// Reverse past/future classes when in RTL mode
		var horizontalPast = config.rtl ? 'future' : 'past',
			horizontalFuture = config.rtl ? 'past' : 'future';

		// Update the classes of all backgrounds to match the
		// states of their slides (past/present/future)
		toArray( dom.background.childNodes ).forEach( function( backgroundh, h ) {

			backgroundh.classList.remove( 'past' );
			backgroundh.classList.remove( 'present' );
			backgroundh.classList.remove( 'future' );

			if( h < indexh ) {
				backgroundh.classList.add( horizontalPast );
			}
			else if ( h > indexh ) {
				backgroundh.classList.add( horizontalFuture );
			}
			else {
				backgroundh.classList.add( 'present' );

				// Store a reference to the current background element
				currentBackground = backgroundh;
			}

			if( includeAll || h === indexh ) {
				toArray( backgroundh.querySelectorAll( '.slide-background' ) ).forEach( function( backgroundv, v ) {

					backgroundv.classList.remove( 'past' );
					backgroundv.classList.remove( 'present' );
					backgroundv.classList.remove( 'future' );

					if( v < indexv ) {
						backgroundv.classList.add( 'past' );
					}
					else if ( v > indexv ) {
						backgroundv.classList.add( 'future' );
					}
					else {
						backgroundv.classList.add( 'present' );

						// Only if this is the present horizontal and vertical slide
						if( h === indexh ) currentBackground = backgroundv;
					}

				} );
			}

		} );

		// Stop content inside of previous backgrounds
		if( previousBackground ) {

			stopEmbeddedContent( previousBackground );

		}

		// Start content in the current background
		if( currentBackground ) {

			startEmbeddedContent( currentBackground );

			var backgroundImageURL = currentBackground.style.backgroundImage || '';

			// Restart GIFs (doesn't work in Firefox)
			if( /\.gif/i.test( backgroundImageURL ) ) {
				currentBackground.style.backgroundImage = '';
				window.getComputedStyle( currentBackground ).opacity;
				currentBackground.style.backgroundImage = backgroundImageURL;
			}

			// Don't transition between identical backgrounds. This
			// prevents unwanted flicker.
			var previousBackgroundHash = previousBackground ? previousBackground.getAttribute( 'data-background-hash' ) : null;
			var currentBackgroundHash = currentBackground.getAttribute( 'data-background-hash' );
			if( currentBackgroundHash && currentBackgroundHash === previousBackgroundHash && currentBackground !== previousBackground ) {
				dom.background.classList.add( 'no-transition' );
			}

			previousBackground = currentBackground;

		}

		// If there's a background brightness flag for this slide,
		// bubble it to the .reveal container
		if( currentSlide ) {
			[ 'has-light-background', 'has-dark-background' ].forEach( function( classToBubble ) {
				if( currentSlide.classList.contains( classToBubble ) ) {
					dom.wrapper.classList.add( classToBubble );
				}
				else {
					dom.wrapper.classList.remove( classToBubble );
				}
			} );
		}

		// Allow the first background to apply without transition
		setTimeout( function() {
			dom.background.classList.remove( 'no-transition' );
		}, 1 );

	}

	/**
	 * Updates the position of the parallax background based
	 * on the current slide index.
	 */
	function updateParallax() {

		if( config.parallaxBackgroundImage ) {

			var horizontalSlides = dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ),
				verticalSlides = dom.wrapper.querySelectorAll( VERTICAL_SLIDES_SELECTOR );

			var backgroundSize = dom.background.style.backgroundSize.split( ' ' ),
				backgroundWidth, backgroundHeight;

			if( backgroundSize.length === 1 ) {
				backgroundWidth = backgroundHeight = parseInt( backgroundSize[0], 10 );
			}
			else {
				backgroundWidth = parseInt( backgroundSize[0], 10 );
				backgroundHeight = parseInt( backgroundSize[1], 10 );
			}

			var slideWidth = dom.background.offsetWidth,
				horizontalSlideCount = horizontalSlides.length,
				horizontalOffsetMultiplier,
				horizontalOffset;

			if( typeof config.parallaxBackgroundHorizontal === 'number' ) {
				horizontalOffsetMultiplier = config.parallaxBackgroundHorizontal;
			}
			else {
				horizontalOffsetMultiplier = horizontalSlideCount > 1 ? ( backgroundWidth - slideWidth ) / ( horizontalSlideCount-1 ) : 0;
			}

			horizontalOffset = horizontalOffsetMultiplier * indexh * -1;

			var slideHeight = dom.background.offsetHeight,
				verticalSlideCount = verticalSlides.length,
				verticalOffsetMultiplier,
				verticalOffset;

			if( typeof config.parallaxBackgroundVertical === 'number' ) {
				verticalOffsetMultiplier = config.parallaxBackgroundVertical;
			}
			else {
				verticalOffsetMultiplier = ( backgroundHeight - slideHeight ) / ( verticalSlideCount-1 );
			}

			verticalOffset = verticalSlideCount > 0 ?  verticalOffsetMultiplier * indexv : 0;

			dom.background.style.backgroundPosition = horizontalOffset + 'px ' + -verticalOffset + 'px';

		}

	}

	/**
	 * Called when the given slide is within the configured view
	 * distance. Shows the slide element and loads any content
	 * that is set to load lazily (data-src).
	 *
	 * @param {HTMLElement} slide Slide to show
	 */
	/**
	 * Called when the given slide is within the configured view
	 * distance. Shows the slide element and loads any content
	 * that is set to load lazily (data-src).
	 *
	 * @param {HTMLElement} slide Slide to show
	 */
	function showSlide( slide ) {

		// Show the slide element
		slide.style.display = config.display;

		// Media elements with data-src attributes
		toArray( slide.querySelectorAll( 'img[data-src], video[data-src], audio[data-src]' ) ).forEach( function( element ) {
			element.setAttribute( 'src', element.getAttribute( 'data-src' ) );
			element.removeAttribute( 'data-src' );
		} );

		// Media elements with <source> children
		toArray( slide.querySelectorAll( 'video, audio' ) ).forEach( function( media ) {
			var sources = 0;

			toArray( media.querySelectorAll( 'source[data-src]' ) ).forEach( function( source ) {
				source.setAttribute( 'src', source.getAttribute( 'data-src' ) );
				source.removeAttribute( 'data-src' );
				sources += 1;
			} );

			// If we rewrote sources for this video/audio element, we need
			// to manually tell it to load from its new origin
			if( sources > 0 ) {
				media.load();
			}
		} );


		// Show the corresponding background element
		var indices = getIndices( slide );
		var background = getSlideBackground( indices.h, indices.v );
		if( background ) {
			background.style.display = 'block';

			// If the background contains media, load it
			if( background.hasAttribute( 'data-loaded' ) === false ) {
				background.setAttribute( 'data-loaded', 'true' );

				var backgroundImage = slide.getAttribute( 'data-background-image' ),
					backgroundVideo = slide.getAttribute( 'data-background-video' ),
					backgroundVideoLoop = slide.hasAttribute( 'data-background-video-loop' ),
					backgroundVideoMuted = slide.hasAttribute( 'data-background-video-muted' ),
					backgroundIframe = slide.getAttribute( 'data-background-iframe' );

				// Images
				if( backgroundImage ) {
					background.style.backgroundImage = 'url('+ backgroundImage +')';
				}
				// Videos
				else if ( backgroundVideo && !isSpeakerNotes() ) {
					var video = document.createElement( 'video' );

					if( backgroundVideoLoop ) {
						video.setAttribute( 'loop', '' );
					}

					if( backgroundVideoMuted ) {
						video.muted = true;
					}

					// Inline video playback works (at least in Mobile Safari) as
					// long as the video is muted and the `playsinline` attribute is
					// present
					if( isMobileDevice ) {
						video.muted = true;
						video.autoplay = true;
						video.setAttribute( 'playsinline', '' );
					}

					// Support comma separated lists of video sources
					backgroundVideo.split( ',' ).forEach( function( source ) {
						video.innerHTML += '<source src="'+ source +'">';
					} );

					background.appendChild( video );
				}
				// Iframes
				else if( backgroundIframe ) {
					var iframe = document.createElement( 'iframe' );
					iframe.setAttribute( 'allowfullscreen', '' );
					iframe.setAttribute( 'mozallowfullscreen', '' );
					iframe.setAttribute( 'webkitallowfullscreen', '' );

					// Only load autoplaying content when the slide is shown to
					// avoid having it play in the background
					if( /autoplay=(1|true|yes)/gi.test( backgroundIframe ) ) {
						iframe.setAttribute( 'data-src', backgroundIframe );
					}
					else {
						iframe.setAttribute( 'src', backgroundIframe );
					}

					iframe.style.width  = '100%';
					iframe.style.height = '100%';
					iframe.style.maxHeight = '100%';
					iframe.style.maxWidth = '100%';

					background.appendChild( iframe );
				}
			}

		}

	}

	/**
	 * Called when the given slide is moved outside of the
	 * configured view distance.
	 *
	 * @param {HTMLElement} slide
	 */
	function hideSlide( slide ) {

		// Hide the slide element
		slide.style.display = 'none';

		// Hide the corresponding background element
		var indices = getIndices( slide );
		var background = getSlideBackground( indices.h, indices.v );
		if( background ) {
			background.style.display = 'none';
		}

	}

	/**
	 * Determine what available routes there are for navigation.
	 *
	 * @return {{left: boolean, right: boolean, up: boolean, down: boolean}}
	 */
	function availableRoutes() {

		var horizontalSlides = dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ),
			verticalSlides = dom.wrapper.querySelectorAll( VERTICAL_SLIDES_SELECTOR );

		var routes = {
			left: indexh > 0 || config.loop,
			right: indexh < horizontalSlides.length - 1 || config.loop,
			up: indexv > 0,
			down: indexv < verticalSlides.length - 1
		};

		// reverse horizontal controls for rtl
		if( config.rtl ) {
			var left = routes.left;
			routes.left = routes.right;
			routes.right = left;
		}

		return routes;

	}

	/**
	 * Returns an object describing the available fragment
	 * directions.
	 *
	 * @return {{prev: boolean, next: boolean}}
	 */
	function availableFragments() {

		if( currentSlide && config.fragments ) {
			var fragments = currentSlide.querySelectorAll( '.fragment' );
			var hiddenFragments = currentSlide.querySelectorAll( '.fragment:not(.visible)' );

			return {
				prev: fragments.length - hiddenFragments.length > 0,
				next: !!hiddenFragments.length
			};
		}
		else {
			return { prev: false, next: false };
		}

	}

	/**
	 * Enforces origin-specific format rules for embedded media.
	 */
	function formatEmbeddedContent() {

		var _appendParamToIframeSource = function( sourceAttribute, sourceURL, param ) {
			toArray( dom.slides.querySelectorAll( 'iframe['+ sourceAttribute +'*="'+ sourceURL +'"]' ) ).forEach( function( el ) {
				var src = el.getAttribute( sourceAttribute );
				if( src && src.indexOf( param ) === -1 ) {
					el.setAttribute( sourceAttribute, src + ( !/\?/.test( src ) ? '?' : '&' ) + param );
				}
			});
		};

		// YouTube frames must include "?enablejsapi=1"
		_appendParamToIframeSource( 'src', 'youtube.com/embed/', 'enablejsapi=1' );
		_appendParamToIframeSource( 'data-src', 'youtube.com/embed/', 'enablejsapi=1' );

		// Vimeo frames must include "?api=1"
		_appendParamToIframeSource( 'src', 'player.vimeo.com/', 'api=1' );
		_appendParamToIframeSource( 'data-src', 'player.vimeo.com/', 'api=1' );

	}

	/**
	 * Start playback of any embedded content inside of
	 * the given element.
	 *
	 * @param {HTMLElement} element
	 */
	function startEmbeddedContent( element ) {

		if( element && !isSpeakerNotes() ) {

			// Restart GIFs
			toArray( element.querySelectorAll( 'img[src$=".gif"]' ) ).forEach( function( el ) {
				// Setting the same unchanged source like this was confirmed
				// to work in Chrome, FF & Safari
				el.setAttribute( 'src', el.getAttribute( 'src' ) );
			} );

			// HTML5 media elements
			toArray( element.querySelectorAll( 'video, audio' ) ).forEach( function( el ) {
				if( closestParent( el, '.fragment' ) && !closestParent( el, '.fragment.visible' ) ) {
					return;
				}

				// Prefer an explicit global autoplay setting
				var autoplay = config.autoPlayMedia;

				// If no global setting is available, fall back on the element's
				// own autoplay setting
				if( typeof autoplay !== 'boolean' ) {
					autoplay = el.hasAttribute( 'data-autoplay' ) || !!closestParent( el, '.slide-background' );
				}

				if( autoplay && typeof el.play === 'function' ) {

					if( el.readyState > 1 ) {
						startEmbeddedMedia( { target: el } );
					}
					else {
						el.removeEventListener( 'loadeddata', startEmbeddedMedia ); // remove first to avoid dupes
						el.addEventListener( 'loadeddata', startEmbeddedMedia );
					}

				}
			} );

			// Normal iframes
			toArray( element.querySelectorAll( 'iframe[src]' ) ).forEach( function( el ) {
				if( closestParent( el, '.fragment' ) && !closestParent( el, '.fragment.visible' ) ) {
					return;
				}

				startEmbeddedIframe( { target: el } );
			} );

			// Lazy loading iframes
			toArray( element.querySelectorAll( 'iframe[data-src]' ) ).forEach( function( el ) {
				if( closestParent( el, '.fragment' ) && !closestParent( el, '.fragment.visible' ) ) {
					return;
				}

				if( el.getAttribute( 'src' ) !== el.getAttribute( 'data-src' ) ) {
					el.removeEventListener( 'load', startEmbeddedIframe ); // remove first to avoid dupes
					el.addEventListener( 'load', startEmbeddedIframe );
					el.setAttribute( 'src', el.getAttribute( 'data-src' ) );
				}
			} );

		}

	}

	/**
	 * Starts playing an embedded video/audio element after
	 * it has finished loading.
	 *
	 * @param {object} event
	 */
	function startEmbeddedMedia( event ) {

		var isAttachedToDOM = !!closestParent( event.target, 'html' ),
			isVisible  		= !!closestParent( event.target, '.present' );

		if( isAttachedToDOM && isVisible ) {
			event.target.currentTime = 0;
			event.target.play();
		}

		event.target.removeEventListener( 'loadeddata', startEmbeddedMedia );

	}

	/**
	 * "Starts" the content of an embedded iframe using the
	 * postMessage API.
	 *
	 * @param {object} event
	 */
	function startEmbeddedIframe( event ) {

		var iframe = event.target;

		if( iframe && iframe.contentWindow ) {

			var isAttachedToDOM = !!closestParent( event.target, 'html' ),
				isVisible  		= !!closestParent( event.target, '.present' );

			if( isAttachedToDOM && isVisible ) {

				// Prefer an explicit global autoplay setting
				var autoplay = config.autoPlayMedia;

				// If no global setting is available, fall back on the element's
				// own autoplay setting
				if( typeof autoplay !== 'boolean' ) {
					autoplay = iframe.hasAttribute( 'data-autoplay' ) || !!closestParent( iframe, '.slide-background' );
				}

				// YouTube postMessage API
				if( /youtube\.com\/embed\//.test( iframe.getAttribute( 'src' ) ) && autoplay ) {
					iframe.contentWindow.postMessage( '{"event":"command","func":"playVideo","args":""}', '*' );
				}
				// Vimeo postMessage API
				else if( /player\.vimeo\.com\//.test( iframe.getAttribute( 'src' ) ) && autoplay ) {
					iframe.contentWindow.postMessage( '{"method":"play"}', '*' );
				}
				// Generic postMessage API
				else {
					iframe.contentWindow.postMessage( 'slide:start', '*' );
				}

			}

		}

	}

	/**
	 * Stop playback of any embedded content inside of
	 * the targeted slide.
	 *
	 * @param {HTMLElement} element
	 */
	function stopEmbeddedContent( element ) {

		if( element && element.parentNode ) {
			// HTML5 media elements
			toArray( element.querySelectorAll( 'video, audio' ) ).forEach( function( el ) {
				if( !el.hasAttribute( 'data-ignore' ) && typeof el.pause === 'function' ) {
					el.setAttribute('data-paused-by-reveal', '');
					el.pause();
				}
			} );

			// Generic postMessage API for non-lazy loaded iframes
			toArray( element.querySelectorAll( 'iframe' ) ).forEach( function( el ) {
				if( el.contentWindow ) el.contentWindow.postMessage( 'slide:stop', '*' );
				el.removeEventListener( 'load', startEmbeddedIframe );
			});

			// YouTube postMessage API
			toArray( element.querySelectorAll( 'iframe[src*="youtube.com/embed/"]' ) ).forEach( function( el ) {
				if( !el.hasAttribute( 'data-ignore' ) && el.contentWindow && typeof el.contentWindow.postMessage === 'function' ) {
					el.contentWindow.postMessage( '{"event":"command","func":"pauseVideo","args":""}', '*' );
				}
			});

			// Vimeo postMessage API
			toArray( element.querySelectorAll( 'iframe[src*="player.vimeo.com/"]' ) ).forEach( function( el ) {
				if( !el.hasAttribute( 'data-ignore' ) && el.contentWindow && typeof el.contentWindow.postMessage === 'function' ) {
					el.contentWindow.postMessage( '{"method":"pause"}', '*' );
				}
			});

			// Lazy loading iframes
			toArray( element.querySelectorAll( 'iframe[data-src]' ) ).forEach( function( el ) {
				// Only removing the src doesn't actually unload the frame
				// in all browsers (Firefox) so we set it to blank first
				el.setAttribute( 'src', 'about:blank' );
				el.removeAttribute( 'src' );
			} );
		}

	}

	/**
	 * Returns the number of past slides. This can be used as a global
	 * flattened index for slides.
	 *
	 * @return {number} Past slide count
	 */
	function getSlidePastCount() {

		var horizontalSlides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );

		// The number of past slides
		var pastCount = 0;

		// Step through all slides and count the past ones
		mainLoop: for( var i = 0; i < horizontalSlides.length; i++ ) {

			var horizontalSlide = horizontalSlides[i];
			var verticalSlides = toArray( horizontalSlide.querySelectorAll( 'section' ) );

			for( var j = 0; j < verticalSlides.length; j++ ) {

				// Stop as soon as we arrive at the present
				if( verticalSlides[j].classList.contains( 'present' ) ) {
					break mainLoop;
				}

				pastCount++;

			}

			// Stop as soon as we arrive at the present
			if( horizontalSlide.classList.contains( 'present' ) ) {
				break;
			}

			// Don't count the wrapping section for vertical slides
			if( horizontalSlide.classList.contains( 'stack' ) === false ) {
				pastCount++;
			}

		}

		return pastCount;

	}

	/**
	 * Returns a value ranging from 0-1 that represents
	 * how far into the presentation we have navigated.
	 *
	 * @return {number}
	 */
	function getProgress() {

		// The number of past and total slides
		var totalCount = getTotalSlides();
		var pastCount = getSlidePastCount();

		if( currentSlide ) {

			var allFragments = currentSlide.querySelectorAll( '.fragment' );

			// If there are fragments in the current slide those should be
			// accounted for in the progress.
			if( allFragments.length > 0 ) {
				var visibleFragments = currentSlide.querySelectorAll( '.fragment.visible' );

				// This value represents how big a portion of the slide progress
				// that is made up by its fragments (0-1)
				var fragmentWeight = 0.9;

				// Add fragment progress to the past slide count
				pastCount += ( visibleFragments.length / allFragments.length ) * fragmentWeight;
			}

		}

		return pastCount / ( totalCount - 1 );

	}

	/**
	 * Checks if this presentation is running inside of the
	 * speaker notes window.
	 *
	 * @return {boolean}
	 */
	function isSpeakerNotes() {

		return !!window.location.search.match( /receiver/gi );

	}

	/**
	 * Reads the current URL (hash) and navigates accordingly.
	 */
	function readURL() {

		var hash = window.location.hash;

		// Attempt to parse the hash as either an index or name
		var bits = hash.slice( 2 ).split( '/' ),
			name = hash.replace( /#|\//gi, '' );

		// If the first bit is invalid and there is a name we can
		// assume that this is a named link
		if( isNaN( parseInt( bits[0], 10 ) ) && name.length ) {
			var element;

			// Ensure the named link is a valid HTML ID attribute
			if( /^[a-zA-Z][\w:.-]*$/.test( name ) ) {
				// Find the slide with the specified ID
				element = document.getElementById( name );
			}

			if( element ) {
				// Find the position of the named slide and navigate to it
				var indices = Reveal.getIndices( element );
				slide( indices.h, indices.v );
			}
			// If the slide doesn't exist, navigate to the current slide
			else {
				slide( indexh || 0, indexv || 0 );
			}
		}
		else {
			// Read the index components of the hash
			var h = parseInt( bits[0], 10 ) || 0,
				v = parseInt( bits[1], 10 ) || 0;

			if( h !== indexh || v !== indexv ) {
				slide( h, v );
			}
		}

	}

	/**
	 * Updates the page URL (hash) to reflect the current
	 * state.
	 *
	 * @param {number} delay The time in ms to wait before
	 * writing the hash
	 */
	function writeURL( delay ) {

		if( config.history ) {

			// Make sure there's never more than one timeout running
			clearTimeout( writeURLTimeout );

			// If a delay is specified, timeout this call
			if( typeof delay === 'number' ) {
				writeURLTimeout = setTimeout( writeURL, delay );
			}
			else if( currentSlide ) {
				var url = '/';

				// Attempt to create a named link based on the slide's ID
				var id = currentSlide.getAttribute( 'id' );
				if( id ) {
					id = id.replace( /[^a-zA-Z0-9\-\_\:\.]/g, '' );
				}

				// If the current slide has an ID, use that as a named link
				if( typeof id === 'string' && id.length ) {
					url = '/' + id;
				}
				// Otherwise use the /h/v index
				else {
					if( indexh > 0 || indexv > 0 ) url += indexh;
					if( indexv > 0 ) url += '/' + indexv;
				}

				window.location.hash = url;
			}
		}

	}
	/**
	 * Retrieves the h/v location and fragment of the current,
	 * or specified, slide.
	 *
	 * @param {HTMLElement} [slide] If specified, the returned
	 * index will be for this slide rather than the currently
	 * active one
	 *
	 * @return {{h: number, v: number, f: number}}
	 */
	function getIndices( slide ) {

		// By default, return the current indices
		var h = indexh,
			v = indexv,
			f;

		// If a slide is specified, return the indices of that slide
		if( slide ) {
			var isVertical = isVerticalSlide( slide );
			var slideh = isVertical ? slide.parentNode : slide;

			// Select all horizontal slides
			var horizontalSlides = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );

			// Now that we know which the horizontal slide is, get its index
			h = Math.max( horizontalSlides.indexOf( slideh ), 0 );

			// Assume we're not vertical
			v = undefined;

			// If this is a vertical slide, grab the vertical index
			if( isVertical ) {
				v = Math.max( toArray( slide.parentNode.querySelectorAll( 'section' ) ).indexOf( slide ), 0 );
			}
		}

		if( !slide && currentSlide ) {
			var hasFragments = currentSlide.querySelectorAll( '.fragment' ).length > 0;
			if( hasFragments ) {
				var currentFragment = currentSlide.querySelector( '.current-fragment' );
				if( currentFragment && currentFragment.hasAttribute( 'data-fragment-index' ) ) {
					f = parseInt( currentFragment.getAttribute( 'data-fragment-index' ), 10 );
				}
				else {
					f = currentSlide.querySelectorAll( '.fragment.visible' ).length - 1;
				}
			}
		}

		return { h: h, v: v, f: f };

	}

	/**
	 * Retrieves all slides in this presentation.
	 */
	function getSlides() {

		return toArray( dom.wrapper.querySelectorAll( SLIDES_SELECTOR + ':not(.stack)' ));

	}

	/**
	 * Retrieves the total number of slides in this presentation.
	 *
	 * @return {number}
	 */
	function getTotalSlides() {

		return getSlides().length;

	}

	/**
	 * Returns the slide element matching the specified index.
	 *
	 * @return {HTMLElement}
	 */
	function getSlide( x, y ) {

		var horizontalSlide = dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR )[ x ];
		var verticalSlides = horizontalSlide && horizontalSlide.querySelectorAll( 'section' );

		if( verticalSlides && verticalSlides.length && typeof y === 'number' ) {
			return verticalSlides ? verticalSlides[ y ] : undefined;
		}

		return horizontalSlide;

	}

	/**
	 * Returns the background element for the given slide.
	 * All slides, even the ones with no background properties
	 * defined, have a background element so as long as the
	 * index is valid an element will be returned.
	 *
	 * @param {number} x Horizontal background index
	 * @param {number} y Vertical background index
	 * @return {(HTMLElement[]|*)}
	 */
	function getSlideBackground( x, y ) {

		// When printing to PDF the slide backgrounds are nested
		// inside of the slides
		if( isPrintingPDF() ) {
			var slide = getSlide( x, y );
			if( slide ) {
				return slide.slideBackgroundElement;
			}

			return undefined;
		}

		var horizontalBackground = dom.wrapper.querySelectorAll( '.backgrounds>.slide-background' )[ x ];
		var verticalBackgrounds = horizontalBackground && horizontalBackground.querySelectorAll( '.slide-background' );

		if( verticalBackgrounds && verticalBackgrounds.length && typeof y === 'number' ) {
			return verticalBackgrounds ? verticalBackgrounds[ y ] : undefined;
		}

		return horizontalBackground;

	}

	/**
	 * Retrieves the speaker notes from a slide. Notes can be
	 * defined in two ways:
	 * 1. As a data-notes attribute on the slide <section>
	 * 2. As an <aside class="notes"> inside of the slide
	 *
	 * @param {HTMLElement} [slide=currentSlide]
	 * @return {(string|null)}
	 */
	function getSlideNotes( slide ) {

		// Default to the current slide
		slide = slide || currentSlide;

		// Notes can be specified via the data-notes attribute...
		if( slide.hasAttribute( 'data-notes' ) ) {
			return slide.getAttribute( 'data-notes' );
		}

		// ... or using an <aside class="notes"> element
		var notesElement = slide.querySelector( 'aside.notes' );
		if( notesElement ) {
			return notesElement.innerHTML;
		}

		return null;

	}

	/**
	 * Retrieves the current state of the presentation as
	 * an object. This state can then be restored at any
	 * time.
	 *
	 * @return {{indexh: number, indexv: number, indexf: number, paused: boolean, overview: boolean}}
	 */
	function getState() {

		var indices = getIndices();

		return {
			indexh: indices.h,
			indexv: indices.v,
			indexf: indices.f,
			paused: isPaused(),
			overview: isOverview()
		};

	}

	/**
	 * Restores the presentation to the given state.
	 *
	 * @param {object} state As generated by getState()
	 * @see {@link getState} generates the parameter `state`
	 */
	function setState( state ) {

		if( typeof state === 'object' ) {
			slide( deserialize( state.indexh ), deserialize( state.indexv ), deserialize( state.indexf ) );

			var pausedFlag = deserialize( state.paused ),
				overviewFlag = deserialize( state.overview );

			if( typeof pausedFlag === 'boolean' && pausedFlag !== isPaused() ) {
				togglePause( pausedFlag );
			}

			if( typeof overviewFlag === 'boolean' && overviewFlag !== isOverview() ) {
				toggleOverview( overviewFlag );
			}
		}

	}

	/**
	 * Return a sorted fragments list, ordered by an increasing
	 * "data-fragment-index" attribute.
	 *
	 * Fragments will be revealed in the order that they are returned by
	 * this function, so you can use the index attributes to control the
	 * order of fragment appearance.
	 *
	 * To maintain a sensible default fragment order, fragments are presumed
	 * to be passed in document order. This function adds a "fragment-index"
	 * attribute to each node if such an attribute is not already present,
	 * and sets that attribute to an integer value which is the position of
	 * the fragment within the fragments list.
	 *
	 * @param {object[]|*} fragments
	 * @return {object[]} sorted Sorted array of fragments
	 */
	function sortFragments( fragments ) {

		fragments = toArray( fragments );

		var ordered = [],
			unordered = [],
			sorted = [];

		// Group ordered and unordered elements
		fragments.forEach( function( fragment, i ) {
			if( fragment.hasAttribute( 'data-fragment-index' ) ) {
				var index = parseInt( fragment.getAttribute( 'data-fragment-index' ), 10 );

				if( !ordered[index] ) {
					ordered[index] = [];
				}

				ordered[index].push( fragment );
			}
			else {
				unordered.push( [ fragment ] );
			}
		} );

		// Append fragments without explicit indices in their
		// DOM order
		ordered = ordered.concat( unordered );

		// Manually count the index up per group to ensure there
		// are no gaps
		var index = 0;

		// Push all fragments in their sorted order to an array,
		// this flattens the groups
		ordered.forEach( function( group ) {
			group.forEach( function( fragment ) {
				sorted.push( fragment );
				fragment.setAttribute( 'data-fragment-index', index );
			} );

			index ++;
		} );

		return sorted;

	}

	/**
	 * Navigate to the specified slide fragment.
	 *
	 * @param {?number} index The index of the fragment that
	 * should be shown, -1 means all are invisible
	 * @param {number} offset Integer offset to apply to the
	 * fragment index
	 *
	 * @return {boolean} true if a change was made in any
	 * fragments visibility as part of this call
	 */
	function navigateFragment( index, offset ) {

		if( currentSlide && config.fragments ) {

			var fragments = sortFragments( currentSlide.querySelectorAll( '.fragment' ) );
			if( fragments.length ) {

				// If no index is specified, find the current
				if( typeof index !== 'number' ) {
					var lastVisibleFragment = sortFragments( currentSlide.querySelectorAll( '.fragment.visible' ) ).pop();

					if( lastVisibleFragment ) {
						index = parseInt( lastVisibleFragment.getAttribute( 'data-fragment-index' ) || 0, 10 );
					}
					else {
						index = -1;
					}
				}

				// If an offset is specified, apply it to the index
				if( typeof offset === 'number' ) {
					index += offset;
				}

				var fragmentsShown = [],
					fragmentsHidden = [];

				toArray( fragments ).forEach( function( element, i ) {

					if( element.hasAttribute( 'data-fragment-index' ) ) {
						i = parseInt( element.getAttribute( 'data-fragment-index' ), 10 );
					}

					// Visible fragments
					if( i <= index ) {
						if( !element.classList.contains( 'visible' ) ) fragmentsShown.push( element );
						element.classList.add( 'visible' );
						element.classList.remove( 'current-fragment' );

						// Announce the fragments one by one to the Screen Reader
						dom.statusDiv.textContent = getStatusText( element );

						if( i === index ) {
							element.classList.add( 'current-fragment' );
							startEmbeddedContent( element );
						}
					}
					// Hidden fragments
					else {
						if( element.classList.contains( 'visible' ) ) fragmentsHidden.push( element );
						element.classList.remove( 'visible' );
						element.classList.remove( 'current-fragment' );
					}

				} );

				if( fragmentsHidden.length ) {
					dispatchEvent( 'fragmenthidden', { fragment: fragmentsHidden[0], fragments: fragmentsHidden } );
				}

				if( fragmentsShown.length ) {
					dispatchEvent( 'fragmentshown', { fragment: fragmentsShown[0], fragments: fragmentsShown } );
				}

				updateControls();
				updateProgress();

				return !!( fragmentsShown.length || fragmentsHidden.length );

			}

		}

		return false;

	}

	/**
	 * Navigate to the next slide fragment.
	 *
	 * @return {boolean} true if there was a next fragment,
	 * false otherwise
	 */
	function nextFragment() {

		return navigateFragment( null, 1 );

	}

	/**
	 * Navigate to the previous slide fragment.
	 *
	 * @return {boolean} true if there was a previous fragment,
	 * false otherwise
	 */
	function previousFragment() {

		return navigateFragment( null, -1 );

	}

	/**
	 * Cues a new automated slide if enabled in the config.
	 */
	function cueAutoSlide() {

		cancelAutoSlide();

		if( currentSlide ) {

			var fragment = currentSlide.querySelector( '.current-fragment' );

			// When the slide first appears there is no "current" fragment so
			// we look for a data-autoslide timing on the first fragment
			if( !fragment ) fragment = currentSlide.querySelector( '.fragment' );

			var fragmentAutoSlide = fragment ? fragment.getAttribute( 'data-autoslide' ) : null;
			var parentAutoSlide = currentSlide.parentNode ? currentSlide.parentNode.getAttribute( 'data-autoslide' ) : null;
			var slideAutoSlide = currentSlide.getAttribute( 'data-autoslide' );

			// Pick value in the following priority order:
			// 1. Current fragment's data-autoslide
			// 2. Current slide's data-autoslide
			// 3. Parent slide's data-autoslide
			// 4. Global autoSlide setting
			if( fragmentAutoSlide ) {
				autoSlide = parseInt( fragmentAutoSlide, 10 );
			}
			else if( slideAutoSlide ) {
				autoSlide = parseInt( slideAutoSlide, 10 );
			}
			else if( parentAutoSlide ) {
				autoSlide = parseInt( parentAutoSlide, 10 );
			}
			else {
				autoSlide = config.autoSlide;
			}

			// If there are media elements with data-autoplay,
			// automatically set the autoSlide duration to the
			// length of that media. Not applicable if the slide
			// is divided up into fragments.
			// playbackRate is accounted for in the duration.
			if( currentSlide.querySelectorAll( '.fragment' ).length === 0 ) {
				toArray( currentSlide.querySelectorAll( 'video, audio' ) ).forEach( function( el ) {
					if( el.hasAttribute( 'data-autoplay' ) ) {
						if( autoSlide && (el.duration * 1000 / el.playbackRate ) > autoSlide ) {
							autoSlide = ( el.duration * 1000 / el.playbackRate ) + 1000;
						}
					}
				} );
			}

			// Cue the next auto-slide if:
			// - There is an autoSlide value
			// - Auto-sliding isn't paused by the user
			// - The presentation isn't paused
			// - The overview isn't active
			// - The presentation isn't over
			if( autoSlide && !autoSlidePaused && !isPaused() && !isOverview() && ( !Reveal.isLastSlide() || availableFragments().next || config.loop === true ) ) {
				autoSlideTimeout = setTimeout( function() {
					typeof config.autoSlideMethod === 'function' ? config.autoSlideMethod() : navigateNext();
					cueAutoSlide();
				}, autoSlide );
				autoSlideStartTime = Date.now();
			}

			if( autoSlidePlayer ) {
				autoSlidePlayer.setPlaying( autoSlideTimeout !== -1 );
			}

		}

	}

	/**
	 * Cancels any ongoing request to auto-slide.
	 */
	function cancelAutoSlide() {

		clearTimeout( autoSlideTimeout );
		autoSlideTimeout = -1;

	}

	function pauseAutoSlide() {

		if( autoSlide && !autoSlidePaused ) {
			autoSlidePaused = true;
			dispatchEvent( 'autoslidepaused' );
			clearTimeout( autoSlideTimeout );

			if( autoSlidePlayer ) {
				autoSlidePlayer.setPlaying( false );
			}
		}

	}

	function resumeAutoSlide() {

		if( autoSlide && autoSlidePaused ) {
			autoSlidePaused = false;
			dispatchEvent( 'autoslideresumed' );
			cueAutoSlide();
		}

	}

	function navigateLeft() {

		// Reverse for RTL
		if( config.rtl ) {
			if( ( isOverview() || nextFragment() === false ) && availableRoutes().left ) {
				slide( indexh + 1 );
			}
		}
		// Normal navigation
		else if( ( isOverview() || previousFragment() === false ) && availableRoutes().left ) {
			slide( indexh - 1 );
		}

	}

	function navigateRight() {

		// Reverse for RTL
		if( config.rtl ) {
			if( ( isOverview() || previousFragment() === false ) && availableRoutes().right ) {
				slide( indexh - 1 );
			}
		}
		// Normal navigation
		else if( ( isOverview() || nextFragment() === false ) && availableRoutes().right ) {
			slide( indexh + 1 );
		}

	}

	function navigateUp() {

		// Prioritize hiding fragments
		if( ( isOverview() || previousFragment() === false ) && availableRoutes().up ) {
			slide( indexh, indexv - 1 );
		}

	}

	function navigateDown() {

		// Prioritize revealing fragments
		if( ( isOverview() || nextFragment() === false ) && availableRoutes().down ) {
			slide( indexh, indexv + 1 );
		}

	}

	/**
	 * Navigates backwards, prioritized in the following order:
	 * 1) Previous fragment
	 * 2) Previous vertical slide
	 * 3) Previous horizontal slide
	 */
	function navigatePrev() {

		// Prioritize revealing fragments
		if( previousFragment() === false ) {
			if( availableRoutes().up ) {
				navigateUp();
			}
			else {
				// Fetch the previous horizontal slide, if there is one
				var previousSlide;

				if( config.rtl ) {
					previousSlide = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR + '.future' ) ).pop();
				}
				else {
					previousSlide = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR + '.past' ) ).pop();
				}

				if( previousSlide ) {
					var v = ( previousSlide.querySelectorAll( 'section' ).length - 1 ) || undefined;
					var h = indexh - 1;
					slide( h, v );
				}
			}
		}

	}

	/**
	 * The reverse of #navigatePrev().
	 */
	function navigateNext() {

		// Prioritize revealing fragments
		if( nextFragment() === false ) {
			if( availableRoutes().down ) {
				navigateDown();
			}
			else if( config.rtl ) {
				navigateLeft();
			}
			else {
				navigateRight();
			}
		}

	}

	/**
	 * Checks if the target element prevents the triggering of
	 * swipe navigation.
	 */
	function isSwipePrevented( target ) {

		while( target && typeof target.hasAttribute === 'function' ) {
			if( target.hasAttribute( 'data-prevent-swipe' ) ) return true;
			target = target.parentNode;
		}

		return false;

	}


	// --------------------------------------------------------------------//
	// ----------------------------- EVENTS -------------------------------//
	// --------------------------------------------------------------------//

	/**
	 * Called by all event handlers that are based on user
	 * input.
	 *
	 * @param {object} [event]
	 */
	function onUserInput( event ) {

		if( config.autoSlideStoppable ) {
			pauseAutoSlide();
		}

	}

	/**
	 * Handler for the document level 'keypress' event.
	 *
	 * @param {object} event
	 */
	function onDocumentKeyPress( event ) {

		// Check if the pressed key is question mark
		if( event.shiftKey && event.charCode === 63 ) {
			toggleHelp();
		}

	}

	/**
	 * Handler for the document level 'keydown' event.
	 *
	 * @param {object} event
	 */
	function onDocumentKeyDown( event ) {

		// If there's a condition specified and it returns false,
		// ignore this event
		if( typeof config.keyboardCondition === 'function' && config.keyboardCondition() === false ) {
			return true;
		}

		// Remember if auto-sliding was paused so we can toggle it
		var autoSlideWasPaused = autoSlidePaused;

		onUserInput( event );

		// Check if there's a focused element that could be using
		// the keyboard
		var activeElementIsCE = document.activeElement && document.activeElement.contentEditable !== 'inherit';
		var activeElementIsInput = document.activeElement && document.activeElement.tagName && /input|textarea/i.test( document.activeElement.tagName );
		var activeElementIsNotes = document.activeElement && document.activeElement.className && /speaker-notes/i.test( document.activeElement.className);

		// Disregard the event if there's a focused element or a
		// keyboard modifier key is present
		if( activeElementIsCE || activeElementIsInput || activeElementIsNotes || (event.shiftKey && event.keyCode !== 32) || event.altKey || event.ctrlKey || event.metaKey ) return;

		// While paused only allow resume keyboard events; 'b', 'v', '.'
		var resumeKeyCodes = [66,86,190,191];
		var key;

		// Custom key bindings for togglePause should be able to resume
		if( typeof config.keyboard === 'object' ) {
			for( key in config.keyboard ) {
				if( config.keyboard[key] === 'togglePause' ) {
					resumeKeyCodes.push( parseInt( key, 10 ) );
				}
			}
		}

		if( isPaused() && resumeKeyCodes.indexOf( event.keyCode ) === -1 ) {
			return false;
		}

		var triggered = false;

		// 1. User defined key bindings
		if( typeof config.keyboard === 'object' ) {

			for( key in config.keyboard ) {

				// Check if this binding matches the pressed key
				if( parseInt( key, 10 ) === event.keyCode ) {

					var value = config.keyboard[ key ];

					// Callback function
					if( typeof value === 'function' ) {
						value.apply( null, [ event ] );
					}
					// String shortcuts to reveal.js API
					else if( typeof value === 'string' && typeof Reveal[ value ] === 'function' ) {
						Reveal[ value ].call();
					}

					triggered = true;

				}

			}

		}

		// 2. System defined key bindings
		if( triggered === false ) {

			// Assume true and try to prove false
			triggered = true;

			switch( event.keyCode ) {
				// p, page up
				case 80: case 33: navigatePrev(); break;
				// n, page down
				case 78: case 34: navigateNext(); break;
				// h, left
				case 72: case 37: navigateLeft(); break;
				// l, right
				case 76: case 39: navigateRight(); break;
				// k, up
				case 75: case 38: navigateUp(); break;
				// j, down
				case 74: case 40: navigateDown(); break;
				// home
				case 36: slide( 0 ); break;
				// end
				case 35: slide( Number.MAX_VALUE ); break;
				// space
				case 32: isOverview() ? deactivateOverview() : event.shiftKey ? navigatePrev() : navigateNext(); break;
				// return
				case 13: isOverview() ? deactivateOverview() : triggered = false; break;
				// two-spot, semicolon, b, v, period, Logitech presenter tools "black screen" button
				case 58: case 59: case 66: case 86: case 190: case 191: togglePause(); break;
				// f
				case 70: enterFullscreen(); break;
				// a
				case 65: if ( config.autoSlideStoppable ) toggleAutoSlide( autoSlideWasPaused ); break;
				default:
					triggered = false;
			}

		}

		// If the input resulted in a triggered action we should prevent
		// the browsers default behavior
		if( triggered ) {
			event.preventDefault && event.preventDefault();
		}
		// ESC or O key
		else if ( ( event.keyCode === 27 || event.keyCode === 79 ) && features.transforms3d ) {
			if( dom.overlay ) {
				closeOverlay();
			}
			else {
				toggleOverview();
			}

			event.preventDefault && event.preventDefault();
		}

		// If auto-sliding is enabled we need to cue up
		// another timeout
		cueAutoSlide();

	}

	/**
	 * Handler for the 'touchstart' event, enables support for
	 * swipe and pinch gestures.
	 *
	 * @param {object} event
	 */
	function onTouchStart( event ) {

		if( isSwipePrevented( event.target ) ) return true;

		touch.startX = event.touches[0].clientX;
		touch.startY = event.touches[0].clientY;
		touch.startCount = event.touches.length;

		// If there's two touches we need to memorize the distance
		// between those two points to detect pinching
		if( event.touches.length === 2 && config.overview ) {
			touch.startSpan = distanceBetween( {
				x: event.touches[1].clientX,
				y: event.touches[1].clientY
			}, {
				x: touch.startX,
				y: touch.startY
			} );
		}

	}

	/**
	 * Handler for the 'touchmove' event.
	 *
	 * @param {object} event
	 */
	function onTouchMove( event ) {

		if( isSwipePrevented( event.target ) ) return true;

		// Each touch should only trigger one action
		if( !touch.captured ) {
			onUserInput( event );

			var currentX = event.touches[0].clientX;
			var currentY = event.touches[0].clientY;

			// If the touch started with two points and still has
			// two active touches; test for the pinch gesture
			if( event.touches.length === 2 && touch.startCount === 2 && config.overview ) {

				// The current distance in pixels between the two touch points
				var currentSpan = distanceBetween( {
					x: event.touches[1].clientX,
					y: event.touches[1].clientY
				}, {
					x: touch.startX,
					y: touch.startY
				} );

				// If the span is larger than the desire amount we've got
				// ourselves a pinch
				if( Math.abs( touch.startSpan - currentSpan ) > touch.threshold ) {
					touch.captured = true;

					if( currentSpan < touch.startSpan ) {
						activateOverview();
					}
					else {
						deactivateOverview();
					}
				}

				event.preventDefault();

			}
			// There was only one touch point, look for a swipe
			else if( event.touches.length === 1 && touch.startCount !== 2 ) {

				var deltaX = currentX - touch.startX,
					deltaY = currentY - touch.startY;

				if( deltaX > touch.threshold && Math.abs( deltaX ) > Math.abs( deltaY ) ) {
					touch.captured = true;
					navigateLeft();
				}
				else if( deltaX < -touch.threshold && Math.abs( deltaX ) > Math.abs( deltaY ) ) {
					touch.captured = true;
					navigateRight();
				}
				else if( deltaY > touch.threshold ) {
					touch.captured = true;
					navigateUp();
				}
				else if( deltaY < -touch.threshold ) {
					touch.captured = true;
					navigateDown();
				}

				// If we're embedded, only block touch events if they have
				// triggered an action
				if( config.embedded ) {
					if( touch.captured || isVerticalSlide( currentSlide ) ) {
						event.preventDefault();
					}
				}
				// Not embedded? Block them all to avoid needless tossing
				// around of the viewport in iOS
				else {
					event.preventDefault();
				}

			}
		}
		// There's a bug with swiping on some Android devices unless
		// the default action is always prevented
		else if( UA.match( /android/gi ) ) {
			event.preventDefault();
		}

	}

	/**
	 * Handler for the 'touchend' event.
	 *
	 * @param {object} event
	 */
	function onTouchEnd( event ) {

		touch.captured = false;

	}

	/**
	 * Convert pointer down to touch start.
	 *
	 * @param {object} event
	 */
	function onPointerDown( event ) {

		if( event.pointerType === event.MSPOINTER_TYPE_TOUCH || event.pointerType === "touch" ) {
			event.touches = [{ clientX: event.clientX, clientY: event.clientY }];
			onTouchStart( event );
		}

	}

	/**
	 * Convert pointer move to touch move.
	 *
	 * @param {object} event
	 */
	function onPointerMove( event ) {

		if( event.pointerType === event.MSPOINTER_TYPE_TOUCH || event.pointerType === "touch" )  {
			event.touches = [{ clientX: event.clientX, clientY: event.clientY }];
			onTouchMove( event );
		}

	}

	/**
	 * Convert pointer up to touch end.
	 *
	 * @param {object} event
	 */
	function onPointerUp( event ) {

		if( event.pointerType === event.MSPOINTER_TYPE_TOUCH || event.pointerType === "touch" )  {
			event.touches = [{ clientX: event.clientX, clientY: event.clientY }];
			onTouchEnd( event );
		}

	}

	/**
	 * Handles mouse wheel scrolling, throttled to avoid skipping
	 * multiple slides.
	 *
	 * @param {object} event
	 */
	function onDocumentMouseScroll( event ) {

		if( Date.now() - lastMouseWheelStep > 600 ) {

			lastMouseWheelStep = Date.now();

			var delta = event.detail || -event.wheelDelta;
			if( delta > 0 ) {
				navigateNext();
			}
			else if( delta < 0 ) {
				navigatePrev();
			}

		}

	}

	/**
	 * Clicking on the progress bar results in a navigation to the
	 * closest approximate horizontal slide using this equation:
	 *
	 * ( clickX / presentationWidth ) * numberOfSlides
	 *
	 * @param {object} event
	 */
	function onProgressClicked( event ) {

		onUserInput( event );

		event.preventDefault();

		var slidesTotal = toArray( dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ).length;
		var slideIndex = Math.floor( ( event.clientX / dom.wrapper.offsetWidth ) * slidesTotal );

		if( config.rtl ) {
			slideIndex = slidesTotal - slideIndex;
		}

		slide( slideIndex );

	}

	/**
	 * Event handler for navigation control buttons.
	 */
	function onNavigateLeftClicked( event ) { event.preventDefault(); onUserInput(); navigateLeft(); }
	function onNavigateRightClicked( event ) { event.preventDefault(); onUserInput(); navigateRight(); }
	function onNavigateUpClicked( event ) { event.preventDefault(); onUserInput(); navigateUp(); }
	function onNavigateDownClicked( event ) { event.preventDefault(); onUserInput(); navigateDown(); }
	function onNavigatePrevClicked( event ) { event.preventDefault(); onUserInput(); navigatePrev(); }
	function onNavigateNextClicked( event ) { event.preventDefault(); onUserInput(); navigateNext(); }

	/**
	 * Handler for the window level 'hashchange' event.
	 *
	 * @param {object} [event]
	 */
	function onWindowHashChange( event ) {

		readURL();

	}

	/**
	 * Handler for the window level 'resize' event.
	 *
	 * @param {object} [event]
	 */
	function onWindowResize( event ) {

		layout();

	}

	/**
	 * Handle for the window level 'visibilitychange' event.
	 *
	 * @param {object} [event]
	 */
	function onPageVisibilityChange( event ) {

		var isHidden =  document.webkitHidden ||
						document.msHidden ||
						document.hidden;

		// If, after clicking a link or similar and we're coming back,
		// focus the document.body to ensure we can use keyboard shortcuts
		if( isHidden === false && document.activeElement !== document.body ) {
			// Not all elements support .blur() - SVGs among them.
			if( typeof document.activeElement.blur === 'function' ) {
				document.activeElement.blur();
			}
			document.body.focus();
		}

	}

	/**
	 * Invoked when a slide is and we're in the overview.
	 *
	 * @param {object} event
	 */
	function onOverviewSlideClicked( event ) {

		// TODO There's a bug here where the event listeners are not
		// removed after deactivating the overview.
		if( eventsAreBound && isOverview() ) {
			event.preventDefault();

			var element = event.target;

			while( element && !element.nodeName.match( /section/gi ) ) {
				element = element.parentNode;
			}

			if( element && !element.classList.contains( 'disabled' ) ) {

				deactivateOverview();

				if( element.nodeName.match( /section/gi ) ) {
					var h = parseInt( element.getAttribute( 'data-index-h' ), 10 ),
						v = parseInt( element.getAttribute( 'data-index-v' ), 10 );

					slide( h, v );
				}

			}
		}

	}

	/**
	 * Handles clicks on links that are set to preview in the
	 * iframe overlay.
	 *
	 * @param {object} event
	 */
	function onPreviewLinkClicked( event ) {

		if( event.currentTarget && event.currentTarget.hasAttribute( 'href' ) ) {
			var url = event.currentTarget.getAttribute( 'href' );
			if( url ) {
				showPreview( url );
				event.preventDefault();
			}
		}

	}

	/**
	 * Handles click on the auto-sliding controls element.
	 *
	 * @param {object} [event]
	 */
	function onAutoSlidePlayerClick( event ) {

		// Replay
		if( Reveal.isLastSlide() && config.loop === false ) {
			slide( 0, 0 );
			resumeAutoSlide();
		}
		// Resume
		else if( autoSlidePaused ) {
			resumeAutoSlide();
		}
		// Pause
		else {
			pauseAutoSlide();
		}

	}


	// --------------------------------------------------------------------//
	// ------------------------ PLAYBACK COMPONENT ------------------------//
	// --------------------------------------------------------------------//


	/**
	 * Constructor for the playback component, which displays
	 * play/pause/progress controls.
	 *
	 * @param {HTMLElement} container The component will append
	 * itself to this
	 * @param {function} progressCheck A method which will be
	 * called frequently to get the current progress on a range
	 * of 0-1
	 */
	function Playback( container, progressCheck ) {

		// Cosmetics
		this.diameter = 100;
		this.diameter2 = this.diameter/2;
		this.thickness = 6;

		// Flags if we are currently playing
		this.playing = false;

		// Current progress on a 0-1 range
		this.progress = 0;

		// Used to loop the animation smoothly
		this.progressOffset = 1;

		this.container = container;
		this.progressCheck = progressCheck;

		this.canvas = document.createElement( 'canvas' );
		this.canvas.className = 'playback';
		this.canvas.width = this.diameter;
		this.canvas.height = this.diameter;
		this.canvas.style.width = this.diameter2 + 'px';
		this.canvas.style.height = this.diameter2 + 'px';
		this.context = this.canvas.getContext( '2d' );

		this.container.appendChild( this.canvas );

		this.render();

	}

	/**
	 * @param value
	 */
	Playback.prototype.setPlaying = function( value ) {

		var wasPlaying = this.playing;

		this.playing = value;

		// Start repainting if we weren't already
		if( !wasPlaying && this.playing ) {
			this.animate();
		}
		else {
			this.render();
		}

	};

	Playback.prototype.animate = function() {

		var progressBefore = this.progress;

		this.progress = this.progressCheck();

		// When we loop, offset the progress so that it eases
		// smoothly rather than immediately resetting
		if( progressBefore > 0.8 && this.progress < 0.2 ) {
			this.progressOffset = this.progress;
		}

		this.render();

		if( this.playing ) {
			features.requestAnimationFrameMethod.call( window, this.animate.bind( this ) );
		}

	};

	/**
	 * Renders the current progress and playback state.
	 */
	Playback.prototype.render = function() {

		var progress = this.playing ? this.progress : 0,
			radius = ( this.diameter2 ) - this.thickness,
			x = this.diameter2,
			y = this.diameter2,
			iconSize = 28;

		// Ease towards 1
		this.progressOffset += ( 1 - this.progressOffset ) * 0.1;

		var endAngle = ( - Math.PI / 2 ) + ( progress * ( Math.PI * 2 ) );
		var startAngle = ( - Math.PI / 2 ) + ( this.progressOffset * ( Math.PI * 2 ) );

		this.context.save();
		this.context.clearRect( 0, 0, this.diameter, this.diameter );

		// Solid background color
		this.context.beginPath();
		this.context.arc( x, y, radius + 4, 0, Math.PI * 2, false );
		this.context.fillStyle = 'rgba( 0, 0, 0, 0.4 )';
		this.context.fill();

		// Draw progress track
		this.context.beginPath();
		this.context.arc( x, y, radius, 0, Math.PI * 2, false );
		this.context.lineWidth = this.thickness;
		this.context.strokeStyle = '#666';
		this.context.stroke();

		if( this.playing ) {
			// Draw progress on top of track
			this.context.beginPath();
			this.context.arc( x, y, radius, startAngle, endAngle, false );
			this.context.lineWidth = this.thickness;
			this.context.strokeStyle = '#fff';
			this.context.stroke();
		}

		this.context.translate( x - ( iconSize / 2 ), y - ( iconSize / 2 ) );

		// Draw play/pause icons
		if( this.playing ) {
			this.context.fillStyle = '#fff';
			this.context.fillRect( 0, 0, iconSize / 2 - 4, iconSize );
			this.context.fillRect( iconSize / 2 + 4, 0, iconSize / 2 - 4, iconSize );
		}
		else {
			this.context.beginPath();
			this.context.translate( 4, 0 );
			this.context.moveTo( 0, 0 );
			this.context.lineTo( iconSize - 4, iconSize / 2 );
			this.context.lineTo( 0, iconSize );
			this.context.fillStyle = '#fff';
			this.context.fill();
		}

		this.context.restore();

	};

	Playback.prototype.on = function( type, listener ) {
		this.canvas.addEventListener( type, listener, false );
	};

	Playback.prototype.off = function( type, listener ) {
		this.canvas.removeEventListener( type, listener, false );
	};

	Playback.prototype.destroy = function() {

		this.playing = false;

		if( this.canvas.parentNode ) {
			this.container.removeChild( this.canvas );
		}

	};


	// --------------------------------------------------------------------//
	// ------------------------------- API --------------------------------//
	// --------------------------------------------------------------------//


	Reveal = {
		VERSION: VERSION,

		initialize: initialize,
		configure: configure,
		sync: sync,

		// Navigation methods
		slide: slide,
		left: navigateLeft,
		right: navigateRight,
		up: navigateUp,
		down: navigateDown,
		prev: navigatePrev,
		next: navigateNext,

		// Fragment methods
		navigateFragment: navigateFragment,
		prevFragment: previousFragment,
		nextFragment: nextFragment,

		// Deprecated aliases
		navigateTo: slide,
		navigateLeft: navigateLeft,
		navigateRight: navigateRight,
		navigateUp: navigateUp,
		navigateDown: navigateDown,
		navigatePrev: navigatePrev,
		navigateNext: navigateNext,

		// Forces an update in slide layout
		layout: layout,

		// Randomizes the order of slides
		shuffle: shuffle,

		// Returns an object with the available routes as booleans (left/right/top/bottom)
		availableRoutes: availableRoutes,

		// Returns an object with the available fragments as booleans (prev/next)
		availableFragments: availableFragments,

		// Toggles a help overlay with keyboard shortcuts
		toggleHelp: toggleHelp,

		// Toggles the overview mode on/off
		toggleOverview: toggleOverview,

		// Toggles the "black screen" mode on/off
		togglePause: togglePause,

		// Toggles the auto slide mode on/off
		toggleAutoSlide: toggleAutoSlide,

		// State checks
		isOverview: isOverview,
		isPaused: isPaused,
		isAutoSliding: isAutoSliding,

		// Adds or removes all internal event listeners (such as keyboard)
		addEventListeners: addEventListeners,
		removeEventListeners: removeEventListeners,

		// Facility for persisting and restoring the presentation state
		getState: getState,
		setState: setState,

		// Presentation progress
		getSlidePastCount: getSlidePastCount,

		// Presentation progress on range of 0-1
		getProgress: getProgress,

		// Returns the indices of the current, or specified, slide
		getIndices: getIndices,

		// Returns an Array of all slides
		getSlides: getSlides,

		// Returns the total number of slides
		getTotalSlides: getTotalSlides,

		// Returns the slide element at the specified index
		getSlide: getSlide,

		// Returns the slide background element at the specified index
		getSlideBackground: getSlideBackground,

		// Returns the speaker notes string for a slide, or null
		getSlideNotes: getSlideNotes,

		// Returns the previous slide element, may be null
		getPreviousSlide: function() {
			return previousSlide;
		},

		// Returns the current slide element
		getCurrentSlide: function() {
			return currentSlide;
		},

		// Returns the current scale of the presentation content
		getScale: function() {
			return scale;
		},

		// Returns the current configuration object
		getConfig: function() {
			return config;
		},

		// Helper method, retrieves query string as a key/value hash
		getQueryHash: function() {
			var query = {};

			location.search.replace( /[A-Z0-9]+?=([\w\.%-]*)/gi, function(a) {
				query[ a.split( '=' ).shift() ] = a.split( '=' ).pop();
			} );

			// Basic deserialization
			for( var i in query ) {
				var value = query[ i ];

				query[ i ] = deserialize( unescape( value ) );
			}

			return query;
		},

		// Returns true if we're currently on the first slide
		isFirstSlide: function() {
			return ( indexh === 0 && indexv === 0 );
		},

		// Returns true if we're currently on the last slide
		isLastSlide: function() {
			if( currentSlide ) {
				// Does this slide has next a sibling?
				if( currentSlide.nextElementSibling ) return false;

				// If it's vertical, does its parent have a next sibling?
				if( isVerticalSlide( currentSlide ) && currentSlide.parentNode.nextElementSibling ) return false;

				return true;
			}

			return false;
		},

		// Checks if reveal.js has been loaded and is ready for use
		isReady: function() {
			return loaded;
		},

		// Forward event binding to the reveal DOM element
		addEventListener: function( type, listener, useCapture ) {
			if( 'addEventListener' in window ) {
				( dom.wrapper || document.querySelector( '.reveal' ) ).addEventListener( type, listener, useCapture );
			}
		},
		removeEventListener: function( type, listener, useCapture ) {
			if( 'addEventListener' in window ) {
				( dom.wrapper || document.querySelector( '.reveal' ) ).removeEventListener( type, listener, useCapture );
			}
		},

		// Programatically triggers a keyboard event
		triggerKey: function( keyCode ) {
			onDocumentKeyDown( { keyCode: keyCode } );
		},

		// Registers a new shortcut to include in the help overlay
		registerKeyboardShortcut: function( key, value ) {
			keyboardShortcuts[key] = value;
		}
	};

	return Reveal;

}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(14);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list, options);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list, options) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove, transformResult;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    transformResult = options.transform(obj.css);
	    
	    if (transformResult) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = transformResult;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css. 
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "data:application/vnd.ms-fontobject;base64,bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArICI3MjIxNzcxMmViOGQyODg3MmU3MDY5MzIyZjNmZGEyMy5lb3QiOw=="

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "data:application/vnd.ms-fontobject;base64,bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArICIxZDcxNDM4NDYyZDUzMmI2MmIwNWNkZDdlNmQ3MTk3ZC5lb3QiOw=="

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "data:application/vnd.ms-fontobject;base64,bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArICIwZjNkYTFlZGYxYjVjNmE5NGE2YWQ5NDhhNzY2NDQ1MS5lb3QiOw=="

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "data:application/vnd.ms-fontobject;base64,bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArICI1ODE1M2FjNzE5NGUxNDFkMWU3M2VhODhjNmI2Mzg2MS5lb3QiOw=="

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  "use strict";

  __webpack_require__(13);
  const Reveal = __webpack_require__(1);
  __webpack_require__(15);
  __webpack_require__(16);

  Reveal.initialize({
    history: true
  });
})();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/*!\n * reveal.js\n * http://lab.hakim.se/reveal-js\n * MIT licensed\n *\n * Copyright (C) 2017 Hakim El Hattab, http://hakim.se\n */\n/*********************************************\n * RESET STYLES\n *********************************************/\nhtml, body, .reveal div, .reveal span, .reveal applet, .reveal object, .reveal iframe,\n.reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6, .reveal p, .reveal blockquote, .reveal pre,\n.reveal a, .reveal abbr, .reveal acronym, .reveal address, .reveal big, .reveal cite, .reveal code,\n.reveal del, .reveal dfn, .reveal em, .reveal img, .reveal ins, .reveal kbd, .reveal q, .reveal s, .reveal samp,\n.reveal small, .reveal strike, .reveal strong, .reveal sub, .reveal sup, .reveal tt, .reveal var,\n.reveal b, .reveal u, .reveal center,\n.reveal dl, .reveal dt, .reveal dd, .reveal ol, .reveal ul, .reveal li,\n.reveal fieldset, .reveal form, .reveal label, .reveal legend,\n.reveal table, .reveal caption, .reveal tbody, .reveal tfoot, .reveal thead, .reveal tr, .reveal th, .reveal td,\n.reveal article, .reveal aside, .reveal canvas, .reveal details, .reveal embed,\n.reveal figure, .reveal figcaption, .reveal footer, .reveal header, .reveal hgroup,\n.reveal menu, .reveal nav, .reveal output, .reveal ruby, .reveal section, .reveal summary,\n.reveal time, .reveal mark, .reveal audio, .reveal video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n.reveal article, .reveal aside, .reveal details, .reveal figcaption, .reveal figure,\n.reveal footer, .reveal header, .reveal hgroup, .reveal menu, .reveal nav, .reveal section {\n  display: block; }\n\n/*********************************************\n * GLOBAL STYLES\n *********************************************/\nhtml,\nbody {\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\nbody {\n  position: relative;\n  line-height: 1;\n  background-color: #fff;\n  color: #000; }\n\n/*********************************************\n * VIEW FRAGMENTS\n *********************************************/\n.reveal .slides section .fragment {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition: all .2s ease;\n          transition: all .2s ease; }\n  .reveal .slides section .fragment.visible {\n    opacity: 1;\n    visibility: inherit; }\n\n.reveal .slides section .fragment.grow {\n  opacity: 1;\n  visibility: inherit; }\n  .reveal .slides section .fragment.grow.visible {\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3); }\n\n.reveal .slides section .fragment.shrink {\n  opacity: 1;\n  visibility: inherit; }\n  .reveal .slides section .fragment.shrink.visible {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7); }\n\n.reveal .slides section .fragment.zoom-in {\n  -webkit-transform: scale(0.1);\n          transform: scale(0.1); }\n  .reveal .slides section .fragment.zoom-in.visible {\n    -webkit-transform: none;\n            transform: none; }\n\n.reveal .slides section .fragment.fade-out {\n  opacity: 1;\n  visibility: inherit; }\n  .reveal .slides section .fragment.fade-out.visible {\n    opacity: 0;\n    visibility: hidden; }\n\n.reveal .slides section .fragment.semi-fade-out {\n  opacity: 1;\n  visibility: inherit; }\n  .reveal .slides section .fragment.semi-fade-out.visible {\n    opacity: 0.5;\n    visibility: inherit; }\n\n.reveal .slides section .fragment.strike {\n  opacity: 1;\n  visibility: inherit; }\n  .reveal .slides section .fragment.strike.visible {\n    text-decoration: line-through; }\n\n.reveal .slides section .fragment.fade-up {\n  -webkit-transform: translate(0, 20%);\n          transform: translate(0, 20%); }\n  .reveal .slides section .fragment.fade-up.visible {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.reveal .slides section .fragment.fade-down {\n  -webkit-transform: translate(0, -20%);\n          transform: translate(0, -20%); }\n  .reveal .slides section .fragment.fade-down.visible {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.reveal .slides section .fragment.fade-right {\n  -webkit-transform: translate(-20%, 0);\n          transform: translate(-20%, 0); }\n  .reveal .slides section .fragment.fade-right.visible {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.reveal .slides section .fragment.fade-left {\n  -webkit-transform: translate(20%, 0);\n          transform: translate(20%, 0); }\n  .reveal .slides section .fragment.fade-left.visible {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n\n.reveal .slides section .fragment.current-visible {\n  opacity: 0;\n  visibility: hidden; }\n  .reveal .slides section .fragment.current-visible.current-fragment {\n    opacity: 1;\n    visibility: inherit; }\n\n.reveal .slides section .fragment.highlight-red,\n.reveal .slides section .fragment.highlight-current-red,\n.reveal .slides section .fragment.highlight-green,\n.reveal .slides section .fragment.highlight-current-green,\n.reveal .slides section .fragment.highlight-blue,\n.reveal .slides section .fragment.highlight-current-blue {\n  opacity: 1;\n  visibility: inherit; }\n\n.reveal .slides section .fragment.highlight-red.visible {\n  color: #ff2c2d; }\n\n.reveal .slides section .fragment.highlight-green.visible {\n  color: #17ff2e; }\n\n.reveal .slides section .fragment.highlight-blue.visible {\n  color: #1b91ff; }\n\n.reveal .slides section .fragment.highlight-current-red.current-fragment {\n  color: #ff2c2d; }\n\n.reveal .slides section .fragment.highlight-current-green.current-fragment {\n  color: #17ff2e; }\n\n.reveal .slides section .fragment.highlight-current-blue.current-fragment {\n  color: #1b91ff; }\n\n/*********************************************\n * DEFAULT ELEMENT STYLES\n *********************************************/\n/* Fixes issue in Chrome where italic fonts did not appear when printing to PDF */\n.reveal:after {\n  content: '';\n  font-style: italic; }\n\n.reveal iframe {\n  z-index: 1; }\n\n/** Prevents layering issues in certain browser/transition combinations */\n.reveal a {\n  position: relative; }\n\n.reveal .stretch {\n  max-width: none;\n  max-height: none; }\n\n.reveal pre.stretch code {\n  height: 100%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n/*********************************************\n * CONTROLS\n *********************************************/\n.reveal .controls {\n  display: none;\n  position: fixed;\n  width: 110px;\n  height: 110px;\n  z-index: 30;\n  right: 10px;\n  bottom: 10px;\n  -webkit-user-select: none; }\n\n.reveal .controls button {\n  padding: 0;\n  position: absolute;\n  opacity: 0.05;\n  width: 0;\n  height: 0;\n  background-color: transparent;\n  border: 12px solid transparent;\n  -webkit-transform: scale(0.9999);\n          transform: scale(0.9999);\n  -webkit-transition: all 0.2s ease;\n          transition: all 0.2s ease;\n  -webkit-appearance: none;\n  -webkit-tap-highlight-color: transparent; }\n\n.reveal .controls .enabled {\n  opacity: 0.7;\n  cursor: pointer; }\n\n.reveal .controls .enabled:active {\n  margin-top: 1px; }\n\n.reveal .controls .navigate-left {\n  top: 42px;\n  border-right-width: 22px;\n  border-right-color: #000; }\n\n.reveal .controls .navigate-left.fragmented {\n  opacity: 0.3; }\n\n.reveal .controls .navigate-right {\n  left: 74px;\n  top: 42px;\n  border-left-width: 22px;\n  border-left-color: #000; }\n\n.reveal .controls .navigate-right.fragmented {\n  opacity: 0.3; }\n\n.reveal .controls .navigate-up {\n  left: 42px;\n  border-bottom-width: 22px;\n  border-bottom-color: #000; }\n\n.reveal .controls .navigate-up.fragmented {\n  opacity: 0.3; }\n\n.reveal .controls .navigate-down {\n  left: 42px;\n  top: 74px;\n  border-top-width: 22px;\n  border-top-color: #000; }\n\n.reveal .controls .navigate-down.fragmented {\n  opacity: 0.3; }\n\n/*********************************************\n * PROGRESS BAR\n *********************************************/\n.reveal .progress {\n  position: fixed;\n  display: none;\n  height: 3px;\n  width: 100%;\n  bottom: 0;\n  left: 0;\n  z-index: 10;\n  background-color: rgba(0, 0, 0, 0.2); }\n\n.reveal .progress:after {\n  content: '';\n  display: block;\n  position: absolute;\n  height: 20px;\n  width: 100%;\n  top: -20px; }\n\n.reveal .progress span {\n  display: block;\n  height: 100%;\n  width: 0px;\n  background-color: #000;\n  -webkit-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n          transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }\n\n/*********************************************\n * SLIDE NUMBER\n *********************************************/\n.reveal .slide-number {\n  position: fixed;\n  display: block;\n  right: 8px;\n  bottom: 8px;\n  z-index: 31;\n  font-family: Helvetica, sans-serif;\n  font-size: 12px;\n  line-height: 1;\n  color: #fff;\n  background-color: rgba(0, 0, 0, 0.4);\n  padding: 5px; }\n\n.reveal .slide-number-delimiter {\n  margin: 0 3px; }\n\n/*********************************************\n * SLIDES\n *********************************************/\n.reveal {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  -ms-touch-action: none;\n      touch-action: none; }\n\n.reveal .slides {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  pointer-events: none;\n  overflow: visible;\n  z-index: 1;\n  text-align: center;\n  -webkit-perspective: 600px;\n          perspective: 600px;\n  -webkit-perspective-origin: 50% 40%;\n          perspective-origin: 50% 40%; }\n\n.reveal .slides > section {\n  -ms-perspective: 600px; }\n\n.reveal .slides > section,\n.reveal .slides > section > section {\n  display: none;\n  position: absolute;\n  width: 100%;\n  padding: 20px 0px;\n  pointer-events: auto;\n  z-index: 10;\n  -webkit-transform-style: flat;\n          transform-style: flat;\n  -webkit-transition: -webkit-transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), -webkit-transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), visibility 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), opacity 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n          transition: transform-origin 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), transform 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), visibility 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985), opacity 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }\n\n/* Global transition speed settings */\n.reveal[data-transition-speed=\"fast\"] .slides section {\n  -webkit-transition-duration: 400ms;\n          transition-duration: 400ms; }\n\n.reveal[data-transition-speed=\"slow\"] .slides section {\n  -webkit-transition-duration: 1200ms;\n          transition-duration: 1200ms; }\n\n/* Slide-specific transition speed overrides */\n.reveal .slides section[data-transition-speed=\"fast\"] {\n  -webkit-transition-duration: 400ms;\n          transition-duration: 400ms; }\n\n.reveal .slides section[data-transition-speed=\"slow\"] {\n  -webkit-transition-duration: 1200ms;\n          transition-duration: 1200ms; }\n\n.reveal .slides > section.stack {\n  padding-top: 0;\n  padding-bottom: 0; }\n\n.reveal .slides > section.present,\n.reveal .slides > section > section.present {\n  display: block;\n  z-index: 11;\n  opacity: 1; }\n\n.reveal .slides > section:empty,\n.reveal .slides > section > section:empty,\n.reveal .slides > section[data-background-interactive],\n.reveal .slides > section > section[data-background-interactive] {\n  pointer-events: none; }\n\n.reveal.center,\n.reveal.center .slides,\n.reveal.center .slides section {\n  min-height: 0 !important; }\n\n/* Don't allow interaction with invisible slides */\n.reveal .slides > section.future,\n.reveal .slides > section > section.future,\n.reveal .slides > section.past,\n.reveal .slides > section > section.past {\n  pointer-events: none; }\n\n.reveal.overview .slides > section,\n.reveal.overview .slides > section > section {\n  pointer-events: auto; }\n\n.reveal .slides > section.past,\n.reveal .slides > section.future,\n.reveal .slides > section > section.past,\n.reveal .slides > section > section.future {\n  opacity: 0; }\n\n/*********************************************\n * Mixins for readability of transitions\n *********************************************/\n/*********************************************\n * SLIDE TRANSITION\n * Aliased 'linear' for backwards compatibility\n *********************************************/\n.reveal.slide section {\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden; }\n\n.reveal .slides > section[data-transition=slide].past,\n.reveal .slides > section[data-transition~=slide-out].past,\n.reveal.slide .slides > section:not([data-transition]).past {\n  -webkit-transform: translate(-150%, 0);\n          transform: translate(-150%, 0); }\n\n.reveal .slides > section[data-transition=slide].future,\n.reveal .slides > section[data-transition~=slide-in].future,\n.reveal.slide .slides > section:not([data-transition]).future {\n  -webkit-transform: translate(150%, 0);\n          transform: translate(150%, 0); }\n\n.reveal .slides > section > section[data-transition=slide].past,\n.reveal .slides > section > section[data-transition~=slide-out].past,\n.reveal.slide .slides > section > section:not([data-transition]).past {\n  -webkit-transform: translate(0, -150%);\n          transform: translate(0, -150%); }\n\n.reveal .slides > section > section[data-transition=slide].future,\n.reveal .slides > section > section[data-transition~=slide-in].future,\n.reveal.slide .slides > section > section:not([data-transition]).future {\n  -webkit-transform: translate(0, 150%);\n          transform: translate(0, 150%); }\n\n.reveal.linear section {\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden; }\n\n.reveal .slides > section[data-transition=linear].past,\n.reveal .slides > section[data-transition~=linear-out].past,\n.reveal.linear .slides > section:not([data-transition]).past {\n  -webkit-transform: translate(-150%, 0);\n          transform: translate(-150%, 0); }\n\n.reveal .slides > section[data-transition=linear].future,\n.reveal .slides > section[data-transition~=linear-in].future,\n.reveal.linear .slides > section:not([data-transition]).future {\n  -webkit-transform: translate(150%, 0);\n          transform: translate(150%, 0); }\n\n.reveal .slides > section > section[data-transition=linear].past,\n.reveal .slides > section > section[data-transition~=linear-out].past,\n.reveal.linear .slides > section > section:not([data-transition]).past {\n  -webkit-transform: translate(0, -150%);\n          transform: translate(0, -150%); }\n\n.reveal .slides > section > section[data-transition=linear].future,\n.reveal .slides > section > section[data-transition~=linear-in].future,\n.reveal.linear .slides > section > section:not([data-transition]).future {\n  -webkit-transform: translate(0, 150%);\n          transform: translate(0, 150%); }\n\n/*********************************************\n * CONVEX TRANSITION\n * Aliased 'default' for backwards compatibility\n *********************************************/\n.reveal .slides section[data-transition=default].stack,\n.reveal.default .slides section.stack {\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d; }\n\n.reveal .slides > section[data-transition=default].past,\n.reveal .slides > section[data-transition~=default-out].past,\n.reveal.default .slides > section:not([data-transition]).past {\n  -webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0); }\n\n.reveal .slides > section[data-transition=default].future,\n.reveal .slides > section[data-transition~=default-in].future,\n.reveal.default .slides > section:not([data-transition]).future {\n  -webkit-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0); }\n\n.reveal .slides > section > section[data-transition=default].past,\n.reveal .slides > section > section[data-transition~=default-out].past,\n.reveal.default .slides > section > section:not([data-transition]).past {\n  -webkit-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\n          transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0); }\n\n.reveal .slides > section > section[data-transition=default].future,\n.reveal .slides > section > section[data-transition~=default-in].future,\n.reveal.default .slides > section > section:not([data-transition]).future {\n  -webkit-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\n          transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0); }\n\n.reveal .slides section[data-transition=convex].stack,\n.reveal.convex .slides section.stack {\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d; }\n\n.reveal .slides > section[data-transition=convex].past,\n.reveal .slides > section[data-transition~=convex-out].past,\n.reveal.convex .slides > section:not([data-transition]).past {\n  -webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0); }\n\n.reveal .slides > section[data-transition=convex].future,\n.reveal .slides > section[data-transition~=convex-in].future,\n.reveal.convex .slides > section:not([data-transition]).future {\n  -webkit-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0); }\n\n.reveal .slides > section > section[data-transition=convex].past,\n.reveal .slides > section > section[data-transition~=convex-out].past,\n.reveal.convex .slides > section > section:not([data-transition]).past {\n  -webkit-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\n          transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0); }\n\n.reveal .slides > section > section[data-transition=convex].future,\n.reveal .slides > section > section[data-transition~=convex-in].future,\n.reveal.convex .slides > section > section:not([data-transition]).future {\n  -webkit-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\n          transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0); }\n\n/*********************************************\n * CONCAVE TRANSITION\n *********************************************/\n.reveal .slides section[data-transition=concave].stack,\n.reveal.concave .slides section.stack {\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d; }\n\n.reveal .slides > section[data-transition=concave].past,\n.reveal .slides > section[data-transition~=concave-out].past,\n.reveal.concave .slides > section:not([data-transition]).past {\n  -webkit-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0); }\n\n.reveal .slides > section[data-transition=concave].future,\n.reveal .slides > section[data-transition~=concave-in].future,\n.reveal.concave .slides > section:not([data-transition]).future {\n  -webkit-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0); }\n\n.reveal .slides > section > section[data-transition=concave].past,\n.reveal .slides > section > section[data-transition~=concave-out].past,\n.reveal.concave .slides > section > section:not([data-transition]).past {\n  -webkit-transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\n          transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0); }\n\n.reveal .slides > section > section[data-transition=concave].future,\n.reveal .slides > section > section[data-transition~=concave-in].future,\n.reveal.concave .slides > section > section:not([data-transition]).future {\n  -webkit-transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\n          transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0); }\n\n/*********************************************\n * ZOOM TRANSITION\n *********************************************/\n.reveal .slides section[data-transition=zoom],\n.reveal.zoom .slides section:not([data-transition]) {\n  -webkit-transition-timing-function: ease;\n          transition-timing-function: ease; }\n\n.reveal .slides > section[data-transition=zoom].past,\n.reveal .slides > section[data-transition~=zoom-out].past,\n.reveal.zoom .slides > section:not([data-transition]).past {\n  visibility: hidden;\n  -webkit-transform: scale(16);\n          transform: scale(16); }\n\n.reveal .slides > section[data-transition=zoom].future,\n.reveal .slides > section[data-transition~=zoom-in].future,\n.reveal.zoom .slides > section:not([data-transition]).future {\n  visibility: hidden;\n  -webkit-transform: scale(0.2);\n          transform: scale(0.2); }\n\n.reveal .slides > section > section[data-transition=zoom].past,\n.reveal .slides > section > section[data-transition~=zoom-out].past,\n.reveal.zoom .slides > section > section:not([data-transition]).past {\n  -webkit-transform: translate(0, -150%);\n          transform: translate(0, -150%); }\n\n.reveal .slides > section > section[data-transition=zoom].future,\n.reveal .slides > section > section[data-transition~=zoom-in].future,\n.reveal.zoom .slides > section > section:not([data-transition]).future {\n  -webkit-transform: translate(0, 150%);\n          transform: translate(0, 150%); }\n\n/*********************************************\n * CUBE TRANSITION\n *\n * WARNING:\n * this is deprecated and will be removed in a\n * future version.\n *********************************************/\n.reveal.cube .slides {\n  -webkit-perspective: 1300px;\n          perspective: 1300px; }\n\n.reveal.cube .slides section {\n  padding: 30px;\n  min-height: 700px;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  box-sizing: border-box;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d; }\n\n.reveal.center.cube .slides section {\n  min-height: 0; }\n\n.reveal.cube .slides section:not(.stack):before {\n  content: '';\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n  -webkit-transform: translateZ(-20px);\n          transform: translateZ(-20px); }\n\n.reveal.cube .slides section:not(.stack):after {\n  content: '';\n  position: absolute;\n  display: block;\n  width: 90%;\n  height: 30px;\n  left: 5%;\n  bottom: 0;\n  background: none;\n  z-index: 1;\n  border-radius: 4px;\n  box-shadow: 0px 95px 25px rgba(0, 0, 0, 0.2);\n  -webkit-transform: translateZ(-90px) rotateX(65deg);\n          transform: translateZ(-90px) rotateX(65deg); }\n\n.reveal.cube .slides > section.stack {\n  padding: 0;\n  background: none; }\n\n.reveal.cube .slides > section.past {\n  -webkit-transform-origin: 100% 0%;\n          transform-origin: 100% 0%;\n  -webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg);\n          transform: translate3d(-100%, 0, 0) rotateY(-90deg); }\n\n.reveal.cube .slides > section.future {\n  -webkit-transform-origin: 0% 0%;\n          transform-origin: 0% 0%;\n  -webkit-transform: translate3d(100%, 0, 0) rotateY(90deg);\n          transform: translate3d(100%, 0, 0) rotateY(90deg); }\n\n.reveal.cube .slides > section > section.past {\n  -webkit-transform-origin: 0% 100%;\n          transform-origin: 0% 100%;\n  -webkit-transform: translate3d(0, -100%, 0) rotateX(90deg);\n          transform: translate3d(0, -100%, 0) rotateX(90deg); }\n\n.reveal.cube .slides > section > section.future {\n  -webkit-transform-origin: 0% 0%;\n          transform-origin: 0% 0%;\n  -webkit-transform: translate3d(0, 100%, 0) rotateX(-90deg);\n          transform: translate3d(0, 100%, 0) rotateX(-90deg); }\n\n/*********************************************\n * PAGE TRANSITION\n *\n * WARNING:\n * this is deprecated and will be removed in a\n * future version.\n *********************************************/\n.reveal.page .slides {\n  -webkit-perspective-origin: 0% 50%;\n          perspective-origin: 0% 50%;\n  -webkit-perspective: 3000px;\n          perspective: 3000px; }\n\n.reveal.page .slides section {\n  padding: 30px;\n  min-height: 700px;\n  box-sizing: border-box;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d; }\n\n.reveal.page .slides section.past {\n  z-index: 12; }\n\n.reveal.page .slides section:not(.stack):before {\n  content: '';\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background: rgba(0, 0, 0, 0.1);\n  -webkit-transform: translateZ(-20px);\n          transform: translateZ(-20px); }\n\n.reveal.page .slides section:not(.stack):after {\n  content: '';\n  position: absolute;\n  display: block;\n  width: 90%;\n  height: 30px;\n  left: 5%;\n  bottom: 0;\n  background: none;\n  z-index: 1;\n  border-radius: 4px;\n  box-shadow: 0px 95px 25px rgba(0, 0, 0, 0.2);\n  -webkit-transform: translateZ(-90px) rotateX(65deg); }\n\n.reveal.page .slides > section.stack {\n  padding: 0;\n  background: none; }\n\n.reveal.page .slides > section.past {\n  -webkit-transform-origin: 0% 0%;\n          transform-origin: 0% 0%;\n  -webkit-transform: translate3d(-40%, 0, 0) rotateY(-80deg);\n          transform: translate3d(-40%, 0, 0) rotateY(-80deg); }\n\n.reveal.page .slides > section.future {\n  -webkit-transform-origin: 100% 0%;\n          transform-origin: 100% 0%;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0); }\n\n.reveal.page .slides > section > section.past {\n  -webkit-transform-origin: 0% 0%;\n          transform-origin: 0% 0%;\n  -webkit-transform: translate3d(0, -40%, 0) rotateX(80deg);\n          transform: translate3d(0, -40%, 0) rotateX(80deg); }\n\n.reveal.page .slides > section > section.future {\n  -webkit-transform-origin: 0% 100%;\n          transform-origin: 0% 100%;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0); }\n\n/*********************************************\n * FADE TRANSITION\n *********************************************/\n.reveal .slides section[data-transition=fade],\n.reveal.fade .slides section:not([data-transition]),\n.reveal.fade .slides > section > section:not([data-transition]) {\n  -webkit-transform: none;\n          transform: none;\n  -webkit-transition: opacity 0.5s;\n          transition: opacity 0.5s; }\n\n.reveal.fade.overview .slides section,\n.reveal.fade.overview .slides > section > section {\n  -webkit-transition: none;\n          transition: none; }\n\n/*********************************************\n * NO TRANSITION\n *********************************************/\n.reveal .slides section[data-transition=none],\n.reveal.none .slides section:not([data-transition]) {\n  -webkit-transform: none;\n          transform: none;\n  -webkit-transition: none;\n          transition: none; }\n\n/*********************************************\n * PAUSED MODE\n *********************************************/\n.reveal .pause-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: black;\n  visibility: hidden;\n  opacity: 0;\n  z-index: 100;\n  -webkit-transition: all 1s ease;\n          transition: all 1s ease; }\n\n.reveal.paused .pause-overlay {\n  visibility: visible;\n  opacity: 1; }\n\n/*********************************************\n * FALLBACK\n *********************************************/\n.no-transforms {\n  overflow-y: auto; }\n\n.no-transforms .reveal .slides {\n  position: relative;\n  width: 80%;\n  height: auto !important;\n  top: 0;\n  left: 50%;\n  margin: 0;\n  text-align: center; }\n\n.no-transforms .reveal .controls,\n.no-transforms .reveal .progress {\n  display: none !important; }\n\n.no-transforms .reveal .slides section {\n  display: block !important;\n  opacity: 1 !important;\n  position: relative !important;\n  height: auto;\n  min-height: 0;\n  top: 0;\n  left: -50%;\n  margin: 70px 0;\n  -webkit-transform: none;\n          transform: none; }\n\n.no-transforms .reveal .slides section section {\n  left: 0; }\n\n.reveal .no-transition,\n.reveal .no-transition * {\n  -webkit-transition: none !important;\n          transition: none !important; }\n\n/*********************************************\n * PER-SLIDE BACKGROUNDS\n *********************************************/\n.reveal .backgrounds {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  -webkit-perspective: 600px;\n          perspective: 600px; }\n\n.reveal .slide-background {\n  display: none;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  visibility: hidden;\n  overflow: hidden;\n  background-color: transparent;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  -webkit-transition: all 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n          transition: all 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }\n\n.reveal .slide-background.stack {\n  display: block; }\n\n.reveal .slide-background.present {\n  opacity: 1;\n  visibility: visible;\n  z-index: 2; }\n\n.print-pdf .reveal .slide-background {\n  opacity: 1 !important;\n  visibility: visible !important; }\n\n/* Video backgrounds */\n.reveal .slide-background video {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  max-width: none;\n  max-height: none;\n  top: 0;\n  left: 0;\n  -o-object-fit: cover;\n     object-fit: cover; }\n\n.reveal .slide-background[data-background-size=\"contain\"] video {\n  -o-object-fit: contain;\n     object-fit: contain; }\n\n/* Immediate transition style */\n.reveal[data-background-transition=none] > .backgrounds .slide-background,\n.reveal > .backgrounds .slide-background[data-background-transition=none] {\n  -webkit-transition: none;\n          transition: none; }\n\n/* Slide */\n.reveal[data-background-transition=slide] > .backgrounds .slide-background,\n.reveal > .backgrounds .slide-background[data-background-transition=slide] {\n  opacity: 1;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden; }\n\n.reveal[data-background-transition=slide] > .backgrounds .slide-background.past,\n.reveal > .backgrounds .slide-background.past[data-background-transition=slide] {\n  -webkit-transform: translate(-100%, 0);\n          transform: translate(-100%, 0); }\n\n.reveal[data-background-transition=slide] > .backgrounds .slide-background.future,\n.reveal > .backgrounds .slide-background.future[data-background-transition=slide] {\n  -webkit-transform: translate(100%, 0);\n          transform: translate(100%, 0); }\n\n.reveal[data-background-transition=slide] > .backgrounds .slide-background > .slide-background.past,\n.reveal > .backgrounds .slide-background > .slide-background.past[data-background-transition=slide] {\n  -webkit-transform: translate(0, -100%);\n          transform: translate(0, -100%); }\n\n.reveal[data-background-transition=slide] > .backgrounds .slide-background > .slide-background.future,\n.reveal > .backgrounds .slide-background > .slide-background.future[data-background-transition=slide] {\n  -webkit-transform: translate(0, 100%);\n          transform: translate(0, 100%); }\n\n/* Convex */\n.reveal[data-background-transition=convex] > .backgrounds .slide-background.past,\n.reveal > .backgrounds .slide-background.past[data-background-transition=convex] {\n  opacity: 0;\n  -webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0); }\n\n.reveal[data-background-transition=convex] > .backgrounds .slide-background.future,\n.reveal > .backgrounds .slide-background.future[data-background-transition=convex] {\n  opacity: 0;\n  -webkit-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0); }\n\n.reveal[data-background-transition=convex] > .backgrounds .slide-background > .slide-background.past,\n.reveal > .backgrounds .slide-background > .slide-background.past[data-background-transition=convex] {\n  opacity: 0;\n  -webkit-transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\n          transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0); }\n\n.reveal[data-background-transition=convex] > .backgrounds .slide-background > .slide-background.future,\n.reveal > .backgrounds .slide-background > .slide-background.future[data-background-transition=convex] {\n  opacity: 0;\n  -webkit-transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\n          transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0); }\n\n/* Concave */\n.reveal[data-background-transition=concave] > .backgrounds .slide-background.past,\n.reveal > .backgrounds .slide-background.past[data-background-transition=concave] {\n  opacity: 0;\n  -webkit-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0); }\n\n.reveal[data-background-transition=concave] > .backgrounds .slide-background.future,\n.reveal > .backgrounds .slide-background.future[data-background-transition=concave] {\n  opacity: 0;\n  -webkit-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0); }\n\n.reveal[data-background-transition=concave] > .backgrounds .slide-background > .slide-background.past,\n.reveal > .backgrounds .slide-background > .slide-background.past[data-background-transition=concave] {\n  opacity: 0;\n  -webkit-transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\n          transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0); }\n\n.reveal[data-background-transition=concave] > .backgrounds .slide-background > .slide-background.future,\n.reveal > .backgrounds .slide-background > .slide-background.future[data-background-transition=concave] {\n  opacity: 0;\n  -webkit-transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\n          transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0); }\n\n/* Zoom */\n.reveal[data-background-transition=zoom] > .backgrounds .slide-background,\n.reveal > .backgrounds .slide-background[data-background-transition=zoom] {\n  -webkit-transition-timing-function: ease;\n          transition-timing-function: ease; }\n\n.reveal[data-background-transition=zoom] > .backgrounds .slide-background.past,\n.reveal > .backgrounds .slide-background.past[data-background-transition=zoom] {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(16);\n          transform: scale(16); }\n\n.reveal[data-background-transition=zoom] > .backgrounds .slide-background.future,\n.reveal > .backgrounds .slide-background.future[data-background-transition=zoom] {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(0.2);\n          transform: scale(0.2); }\n\n.reveal[data-background-transition=zoom] > .backgrounds .slide-background > .slide-background.past,\n.reveal > .backgrounds .slide-background > .slide-background.past[data-background-transition=zoom] {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(16);\n          transform: scale(16); }\n\n.reveal[data-background-transition=zoom] > .backgrounds .slide-background > .slide-background.future,\n.reveal > .backgrounds .slide-background > .slide-background.future[data-background-transition=zoom] {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(0.2);\n          transform: scale(0.2); }\n\n/* Global transition speed settings */\n.reveal[data-transition-speed=\"fast\"] > .backgrounds .slide-background {\n  -webkit-transition-duration: 400ms;\n          transition-duration: 400ms; }\n\n.reveal[data-transition-speed=\"slow\"] > .backgrounds .slide-background {\n  -webkit-transition-duration: 1200ms;\n          transition-duration: 1200ms; }\n\n/*********************************************\n * OVERVIEW\n *********************************************/\n.reveal.overview {\n  -webkit-perspective-origin: 50% 50%;\n          perspective-origin: 50% 50%;\n  -webkit-perspective: 700px;\n          perspective: 700px; }\n  .reveal.overview .slides {\n    -moz-transform-style: preserve-3d; }\n  .reveal.overview .slides section {\n    height: 100%;\n    top: 0 !important;\n    opacity: 1 !important;\n    overflow: hidden;\n    visibility: visible !important;\n    cursor: pointer;\n    box-sizing: border-box; }\n  .reveal.overview .slides section:hover,\n  .reveal.overview .slides section.present {\n    outline: 10px solid rgba(150, 150, 150, 0.4);\n    outline-offset: 10px; }\n  .reveal.overview .slides section .fragment {\n    opacity: 1;\n    -webkit-transition: none;\n            transition: none; }\n  .reveal.overview .slides section:after,\n  .reveal.overview .slides section:before {\n    display: none !important; }\n  .reveal.overview .slides > section.stack {\n    padding: 0;\n    top: 0 !important;\n    background: none;\n    outline: none;\n    overflow: visible; }\n  .reveal.overview .backgrounds {\n    -webkit-perspective: inherit;\n            perspective: inherit;\n    -moz-transform-style: preserve-3d; }\n  .reveal.overview .backgrounds .slide-background {\n    opacity: 1;\n    visibility: visible;\n    outline: 10px solid rgba(150, 150, 150, 0.1);\n    outline-offset: 10px; }\n  .reveal.overview .backgrounds .slide-background.stack {\n    overflow: visible; }\n\n.reveal.overview .slides section,\n.reveal.overview-deactivating .slides section {\n  -webkit-transition: none;\n          transition: none; }\n\n.reveal.overview .backgrounds .slide-background,\n.reveal.overview-deactivating .backgrounds .slide-background {\n  -webkit-transition: none;\n          transition: none; }\n\n/*********************************************\n * RTL SUPPORT\n *********************************************/\n.reveal.rtl .slides,\n.reveal.rtl .slides h1,\n.reveal.rtl .slides h2,\n.reveal.rtl .slides h3,\n.reveal.rtl .slides h4,\n.reveal.rtl .slides h5,\n.reveal.rtl .slides h6 {\n  direction: rtl;\n  font-family: sans-serif; }\n\n.reveal.rtl pre,\n.reveal.rtl code {\n  direction: ltr; }\n\n.reveal.rtl ol,\n.reveal.rtl ul {\n  text-align: right; }\n\n.reveal.rtl .progress span {\n  float: right; }\n\n/*********************************************\n * PARALLAX BACKGROUND\n *********************************************/\n.reveal.has-parallax-background .backgrounds {\n  -webkit-transition: all 0.8s ease;\n          transition: all 0.8s ease; }\n\n/* Global transition speed settings */\n.reveal.has-parallax-background[data-transition-speed=\"fast\"] .backgrounds {\n  -webkit-transition-duration: 400ms;\n          transition-duration: 400ms; }\n\n.reveal.has-parallax-background[data-transition-speed=\"slow\"] .backgrounds {\n  -webkit-transition-duration: 1200ms;\n          transition-duration: 1200ms; }\n\n/*********************************************\n * LINK PREVIEW OVERLAY\n *********************************************/\n.reveal .overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1000;\n  background: rgba(0, 0, 0, 0.9);\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition: all 0.3s ease;\n          transition: all 0.3s ease; }\n\n.reveal .overlay.visible {\n  opacity: 1;\n  visibility: visible; }\n\n.reveal .overlay .spinner {\n  position: absolute;\n  display: block;\n  top: 50%;\n  left: 50%;\n  width: 32px;\n  height: 32px;\n  margin: -16px 0 0 -16px;\n  z-index: 10;\n  background-image: url(data:image/gif;base64,R0lGODlhIAAgAPMAAJmZmf%2F%2F%2F6%2Bvr8nJybW1tcDAwOjo6Nvb26ioqKOjo7Ozs%2FLy8vz8%2FAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ%2FV%2FnmOM82XiHRLYKhKP1oZmADdEAAAh%2BQQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY%2FCZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB%2BA4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6%2BHo7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq%2BB6QDtuetcaBPnW6%2BO7wDHpIiK9SaVK5GgV543tzjgGcghAgAh%2BQQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK%2B%2BG%2Bw48edZPK%2BM6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE%2BG%2BcD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm%2BFNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk%2BaV%2BoJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0%2FVNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc%2BXiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30%2FiI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE%2FjiuL04RGEBgwWhShRgQExHBAAh%2BQQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR%2BipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY%2BYip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd%2BMFCN6HAAIKgNggY0KtEBAAh%2BQQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1%2BvsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d%2BjYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg%2BygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0%2Bbm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h%2BKr0SJ8MFihpNbx%2B4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX%2BBP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA%3D%3D);\n  visibility: visible;\n  opacity: 0.6;\n  -webkit-transition: all 0.3s ease;\n          transition: all 0.3s ease; }\n\n.reveal .overlay header {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 40px;\n  z-index: 2;\n  border-bottom: 1px solid #222; }\n\n.reveal .overlay header a {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  line-height: 36px;\n  padding: 0 10px;\n  float: right;\n  opacity: 0.6;\n  box-sizing: border-box; }\n\n.reveal .overlay header a:hover {\n  opacity: 1; }\n\n.reveal .overlay header a .icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background-position: 50% 50%;\n  background-size: 100%;\n  background-repeat: no-repeat; }\n\n.reveal .overlay header a.close .icon {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABkklEQVRYR8WX4VHDMAxG6wnoJrABZQPYBCaBTWAD2g1gE5gg6OOsXuxIlr40d81dfrSJ9V4c2VLK7spHuTJ/5wpM07QXuXc5X0opX2tEJcadjHuV80li/FgxTIEK/5QBCICBD6xEhSMGHgQPgBgLiYVAB1dpSqKDawxTohFw4JSEA3clzgIBPCURwE2JucBR7rhPJJv5OpJwDX+SfDjgx1wACQeJG1aChP9K/IMmdZ8DtESV1WyP3Bt4MwM6sj4NMxMYiqUWHQu4KYA/SYkIjOsm3BXYWMKFDwU2khjCQ4ELJUJ4SmClRArOCmSXGuKma0fYD5CbzHxFpCSGAhfAVSSUGDUk2BWZaff2g6GE15BsBQ9nwmpIGDiyHQddwNTMKkbZaf9fajXQca1EX44puJZUsnY0ObGmITE3GVLCbEhQUjGVt146j6oasWN+49Vph2w1pZ5EansNZqKBm1txbU57iRRcZ86RWMDdWtBJUHBHwoQPi1GV+JCbntmvok7iTX4/Up9mgyTc/FJYDTcndgH/AA5A/CHsyEkVAAAAAElFTkSuQmCC); }\n\n.reveal .overlay header a.external .icon {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAcElEQVRYR+2WSQoAIQwEzf8f7XiOMkUQxUPlGkM3hVmiQfQR9GYnH1SsAQlI4DiBqkCMoNb9y2e90IAEJPAcgdznU9+engMaeJ7Azh5Y1U67gAho4DqBqmB1buAf0MB1AlVBek83ZPkmJMGc1wAR+AAqod/B97TRpQAAAABJRU5ErkJggg==); }\n\n.reveal .overlay .viewport {\n  position: absolute;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  top: 40px;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n\n.reveal .overlay.overlay-preview .viewport iframe {\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n  border: 0;\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition: all 0.3s ease;\n          transition: all 0.3s ease; }\n\n.reveal .overlay.overlay-preview.loaded .viewport iframe {\n  opacity: 1;\n  visibility: visible; }\n\n.reveal .overlay.overlay-preview.loaded .viewport-inner {\n  position: absolute;\n  z-index: -1;\n  left: 0;\n  top: 45%;\n  width: 100%;\n  text-align: center;\n  letter-spacing: normal; }\n\n.reveal .overlay.overlay-preview .x-frame-error {\n  opacity: 0;\n  -webkit-transition: opacity 0.3s ease 0.3s;\n          transition: opacity 0.3s ease 0.3s; }\n\n.reveal .overlay.overlay-preview.loaded .x-frame-error {\n  opacity: 1; }\n\n.reveal .overlay.overlay-preview.loaded .spinner {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transform: scale(0.2);\n          transform: scale(0.2); }\n\n.reveal .overlay.overlay-help .viewport {\n  overflow: auto;\n  color: #fff; }\n\n.reveal .overlay.overlay-help .viewport .viewport-inner {\n  width: 600px;\n  margin: auto;\n  padding: 20px 20px 80px 20px;\n  text-align: center;\n  letter-spacing: normal; }\n\n.reveal .overlay.overlay-help .viewport .viewport-inner .title {\n  font-size: 20px; }\n\n.reveal .overlay.overlay-help .viewport .viewport-inner table {\n  border: 1px solid #fff;\n  border-collapse: collapse;\n  font-size: 16px; }\n\n.reveal .overlay.overlay-help .viewport .viewport-inner table th,\n.reveal .overlay.overlay-help .viewport .viewport-inner table td {\n  width: 200px;\n  padding: 14px;\n  border: 1px solid #fff;\n  vertical-align: middle; }\n\n.reveal .overlay.overlay-help .viewport .viewport-inner table th {\n  padding-top: 20px;\n  padding-bottom: 20px; }\n\n/*********************************************\n * PLAYBACK COMPONENT\n *********************************************/\n.reveal .playback {\n  position: fixed;\n  left: 15px;\n  bottom: 20px;\n  z-index: 30;\n  cursor: pointer;\n  -webkit-transition: all 400ms ease;\n          transition: all 400ms ease; }\n\n.reveal.overview .playback {\n  opacity: 0;\n  visibility: hidden; }\n\n/*********************************************\n * ROLLING LINKS\n *********************************************/\n.reveal .roll {\n  display: inline-block;\n  line-height: 1.2;\n  overflow: hidden;\n  vertical-align: top;\n  -webkit-perspective: 400px;\n          perspective: 400px;\n  -webkit-perspective-origin: 50% 50%;\n          perspective-origin: 50% 50%; }\n\n.reveal .roll:hover {\n  background: none;\n  text-shadow: none; }\n\n.reveal .roll span {\n  display: block;\n  position: relative;\n  padding: 0 2px;\n  pointer-events: none;\n  -webkit-transition: all 400ms ease;\n          transition: all 400ms ease;\n  -webkit-transform-origin: 50% 0%;\n          transform-origin: 50% 0%;\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden; }\n\n.reveal .roll:hover span {\n  background: rgba(0, 0, 0, 0.5);\n  -webkit-transform: translate3d(0px, 0px, -45px) rotateX(90deg);\n          transform: translate3d(0px, 0px, -45px) rotateX(90deg); }\n\n.reveal .roll span:after {\n  content: attr(data-title);\n  display: block;\n  position: absolute;\n  left: 0;\n  top: 0;\n  padding: 0 2px;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transform-origin: 50% 0%;\n          transform-origin: 50% 0%;\n  -webkit-transform: translate3d(0px, 110%, 0px) rotateX(-90deg);\n          transform: translate3d(0px, 110%, 0px) rotateX(-90deg); }\n\n/*********************************************\n * SPEAKER NOTES\n *********************************************/\n.reveal aside.notes {\n  display: none; }\n\n.reveal .speaker-notes {\n  display: none;\n  position: absolute;\n  width: 70%;\n  max-height: 15%;\n  left: 15%;\n  bottom: 26px;\n  padding: 10px;\n  z-index: 1;\n  font-size: 18px;\n  line-height: 1.4;\n  color: #fff;\n  background-color: rgba(0, 0, 0, 0.5);\n  overflow: auto;\n  box-sizing: border-box;\n  text-align: left;\n  font-family: Helvetica, sans-serif;\n  -webkit-overflow-scrolling: touch; }\n\n.reveal .speaker-notes.visible:not(:empty) {\n  display: block; }\n\n@media screen and (max-width: 1024px) {\n  .reveal .speaker-notes {\n    font-size: 14px; } }\n\n@media screen and (max-width: 600px) {\n  .reveal .speaker-notes {\n    width: 90%;\n    left: 5%; } }\n\n/*********************************************\n * ZOOM PLUGIN\n *********************************************/\n.zoomed .reveal *,\n.zoomed .reveal *:before,\n.zoomed .reveal *:after {\n  -webkit-backface-visibility: visible !important;\n          backface-visibility: visible !important; }\n\n.zoomed .reveal .progress,\n.zoomed .reveal .controls {\n  opacity: 0; }\n\n.zoomed .reveal .roll span {\n  background: none; }\n\n.zoomed .reveal .roll span:after {\n  visibility: hidden; }\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports
exports.i(__webpack_require__(10), "");

// module
exports.push([module.i, "/**\n * White theme for reveal.js. This is the opposite of the 'black' theme.\n *\n * By Hakim El Hattab, http://hakim.se\n */\nsection.has-dark-background, section.has-dark-background h1, section.has-dark-background h2, section.has-dark-background h3, section.has-dark-background h4, section.has-dark-background h5, section.has-dark-background h6 {\n  color: #fff; }\n\n/*********************************************\n * GLOBAL STYLES\n *********************************************/\nbody {\n  background: #fff;\n  background-color: #fff; }\n\n.reveal {\n  font-family: \"Source Sans Pro\", Helvetica, sans-serif;\n  font-size: 42px;\n  font-weight: normal;\n  color: #222; }\n\n::selection {\n  color: #fff;\n  background: #98bdef;\n  text-shadow: none; }\n\n::-moz-selection {\n  color: #fff;\n  background: #98bdef;\n  text-shadow: none; }\n\n.reveal .slides > section,\n.reveal .slides > section > section {\n  line-height: 1.3;\n  font-weight: inherit; }\n\n/*********************************************\n * HEADERS\n *********************************************/\n.reveal h1,\n.reveal h2,\n.reveal h3,\n.reveal h4,\n.reveal h5,\n.reveal h6 {\n  margin: 0 0 20px 0;\n  color: #222;\n  font-family: \"Source Sans Pro\", Helvetica, sans-serif;\n  font-weight: 600;\n  line-height: 1.2;\n  letter-spacing: normal;\n  text-transform: uppercase;\n  text-shadow: none;\n  word-wrap: break-word; }\n\n.reveal h1 {\n  font-size: 2.5em; }\n\n.reveal h2 {\n  font-size: 1.6em; }\n\n.reveal h3 {\n  font-size: 1.3em; }\n\n.reveal h4 {\n  font-size: 1em; }\n\n.reveal h1 {\n  text-shadow: none; }\n\n/*********************************************\n * OTHER\n *********************************************/\n.reveal p {\n  margin: 20px 0;\n  line-height: 1.3; }\n\n/* Ensure certain elements are never larger than the slide itself */\n.reveal img,\n.reveal video,\n.reveal iframe {\n  max-width: 95%;\n  max-height: 95%; }\n\n.reveal strong,\n.reveal b {\n  font-weight: bold; }\n\n.reveal em {\n  font-style: italic; }\n\n.reveal ol,\n.reveal dl,\n.reveal ul {\n  display: inline-block;\n  text-align: left;\n  margin: 0 0 0 1em; }\n\n.reveal ol {\n  list-style-type: decimal; }\n\n.reveal ul {\n  list-style-type: disc; }\n\n.reveal ul ul {\n  list-style-type: square; }\n\n.reveal ul ul ul {\n  list-style-type: circle; }\n\n.reveal ul ul,\n.reveal ul ol,\n.reveal ol ol,\n.reveal ol ul {\n  display: block;\n  margin-left: 40px; }\n\n.reveal dt {\n  font-weight: bold; }\n\n.reveal dd {\n  margin-left: 40px; }\n\n.reveal q,\n.reveal blockquote {\n  quotes: none; }\n\n.reveal blockquote {\n  display: block;\n  position: relative;\n  width: 70%;\n  margin: 20px auto;\n  padding: 5px;\n  font-style: italic;\n  background: rgba(255, 255, 255, 0.05);\n  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2); }\n\n.reveal blockquote p:first-child,\n.reveal blockquote p:last-child {\n  display: inline-block; }\n\n.reveal q {\n  font-style: italic; }\n\n.reveal pre {\n  display: block;\n  position: relative;\n  width: 90%;\n  margin: 20px auto;\n  text-align: left;\n  font-size: 0.55em;\n  font-family: monospace;\n  line-height: 1.2em;\n  word-wrap: break-word;\n  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3); }\n\n.reveal code {\n  font-family: monospace; }\n\n.reveal pre code {\n  display: block;\n  padding: 5px;\n  overflow: auto;\n  max-height: 400px;\n  word-wrap: normal; }\n\n.reveal table {\n  margin: auto;\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n.reveal table th {\n  font-weight: bold; }\n\n.reveal table th,\n.reveal table td {\n  text-align: left;\n  padding: 0.2em 0.5em 0.2em 0.5em;\n  border-bottom: 1px solid; }\n\n.reveal table th[align=\"center\"],\n.reveal table td[align=\"center\"] {\n  text-align: center; }\n\n.reveal table th[align=\"right\"],\n.reveal table td[align=\"right\"] {\n  text-align: right; }\n\n.reveal table tbody tr:last-child th,\n.reveal table tbody tr:last-child td {\n  border-bottom: none; }\n\n.reveal sup {\n  vertical-align: super; }\n\n.reveal sub {\n  vertical-align: sub; }\n\n.reveal small {\n  display: inline-block;\n  font-size: 0.6em;\n  line-height: 1.2em;\n  vertical-align: top; }\n\n.reveal small * {\n  vertical-align: top; }\n\n/*********************************************\n * LINKS\n *********************************************/\n.reveal a {\n  color: #2a76dd;\n  text-decoration: none;\n  -webkit-transition: color .15s ease;\n  -moz-transition: color .15s ease;\n  transition: color .15s ease; }\n\n.reveal a:hover {\n  color: #6ca0e8;\n  text-shadow: none;\n  border: none; }\n\n.reveal .roll span:after {\n  color: #fff;\n  background: #1a53a1; }\n\n/*********************************************\n * IMAGES\n *********************************************/\n.reveal section img {\n  margin: 15px 0px;\n  background: rgba(255, 255, 255, 0.12);\n  border: 4px solid #222;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); }\n\n.reveal section img.plain {\n  border: 0;\n  box-shadow: none; }\n\n.reveal a img {\n  -webkit-transition: all .15s linear;\n  -moz-transition: all .15s linear;\n  transition: all .15s linear; }\n\n.reveal a:hover img {\n  background: rgba(255, 255, 255, 0.2);\n  border-color: #2a76dd;\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.55); }\n\n/*********************************************\n * NAVIGATION CONTROLS\n *********************************************/\n.reveal .controls .navigate-left,\n.reveal .controls .navigate-left.enabled {\n  border-right-color: #2a76dd; }\n\n.reveal .controls .navigate-right,\n.reveal .controls .navigate-right.enabled {\n  border-left-color: #2a76dd; }\n\n.reveal .controls .navigate-up,\n.reveal .controls .navigate-up.enabled {\n  border-bottom-color: #2a76dd; }\n\n.reveal .controls .navigate-down,\n.reveal .controls .navigate-down.enabled {\n  border-top-color: #2a76dd; }\n\n.reveal .controls .navigate-left.enabled:hover {\n  border-right-color: #6ca0e8; }\n\n.reveal .controls .navigate-right.enabled:hover {\n  border-left-color: #6ca0e8; }\n\n.reveal .controls .navigate-up.enabled:hover {\n  border-bottom-color: #6ca0e8; }\n\n.reveal .controls .navigate-down.enabled:hover {\n  border-top-color: #6ca0e8; }\n\n/*********************************************\n * PROGRESS BAR\n *********************************************/\n.reveal .progress {\n  background: rgba(0, 0, 0, 0.2); }\n\n.reveal .progress span {\n  background: #2a76dd;\n  -webkit-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  -moz-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@font-face {\n    font-family: 'Source Sans Pro';\n    src: url(" + __webpack_require__(4) + ");\n    src: url(" + __webpack_require__(4) + "?#iefix) format('embedded-opentype'),\n         url(" + __webpack_require__(22) + ") format('woff'),\n         url(" + __webpack_require__(18) + ") format('truetype');\n    font-weight: normal;\n    font-style: normal;\n}\n\n@font-face {\n    font-family: 'Source Sans Pro';\n    src: url(" + __webpack_require__(3) + ");\n    src: url(" + __webpack_require__(3) + "?#iefix) format('embedded-opentype'),\n         url(" + __webpack_require__(21) + ") format('woff'),\n         url(" + __webpack_require__(17) + ") format('truetype');\n    font-weight: normal;\n    font-style: italic;\n}\n\n@font-face {\n    font-family: 'Source Sans Pro';\n    src: url(" + __webpack_require__(5) + ");\n    src: url(" + __webpack_require__(5) + "?#iefix) format('embedded-opentype'),\n         url(" + __webpack_require__(23) + ") format('woff'),\n         url(" + __webpack_require__(19) + ") format('truetype');\n    font-weight: 600;\n    font-style: normal;\n}\n\n@font-face {\n    font-family: 'Source Sans Pro';\n    src: url(" + __webpack_require__(6) + ");\n    src: url(" + __webpack_require__(6) + "?#iefix) format('embedded-opentype'),\n         url(" + __webpack_require__(24) + ") format('woff'),\n         url(" + __webpack_require__(20) + ") format('truetype');\n    font-weight: 600;\n    font-style: italic;\n}", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5ec433fe6b683355b3883fe786bf766a.jpg";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5450798a8d2482fefb15895275fe43e2.gif";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<html> <body> <div class=reveal> <div class=slides> <section> <h2>Ready, Set, Release</h2> <h3>SyntaxCon - Bobby Earl</h3> <p> <a href=https://twitter.com/simplyearl target=_blank rel=\"noopener noreferrer\">@simplyearl</a> </p> </section> <section> <h2>Agenda</h2> <ul> <li class=fragment>Introductions</li> <li class=fragment>Fundamentals</li> <li class=fragment>Demo</li> <li class=fragment>Questions</li> </ul> </section> <section> <h2>About Me</h2> </section> <section> <ul> <li class=fragment>Staff Software Engineer at Blackbaud for 4 years</li> <li class=fragment>Father of 3 with a 4th due in July</li> <li class=fragment>Love building LEGO</li> <li class=fragment>First website was on Geocities and contained nothing but profanity</li> </ul> </section> <section> <img src=" + __webpack_require__(11) + " alt=\"\" class=stretch /> </section> <section> <h2>My Work</h2> </section> <section> <ul> <li class=fragment>Contribute to the Open Source community</li> <li class=fragment>Create UX framework</li> <li class=fragment>Create CLI to automate app/docs creation</li> <li class=fragment>Automate build processes</li> </ul> </section> <section> <h2>Show of Hands</h2> <p>Anyone guilty of manual deployments?</p> <p><small>(Remember to shamefully raise your hand Bobby)</small></p> </section> <section> <h2>Consistency is Key!</h2> <p>Automate to drive consistency, reliability, and security.</p> </section> <section> <h2>Services</h2> <ul> <li class=fragment>GitHub Pages</li> <li class=fragment>Travis CI</li> <li class=fragment>Azure App Services</li> </ul> </section> <section> <p>Each service has many alternatives.</p> <p>AWS, Heroku, CircleCI, Jenkins, VSTS</p> <p>Focus on required features.</p> </section> <section> <h2>GitHub Pages</h2> <p>Websites for you and your projects.</p> <p> <a href=https://pages.github.com target=_blank rel=\"noopener noreferrer\"> pages.github.com </a> </p> </section> <section> <h2>Travis CI</h2> <p>Easily sync your GitHub projects with Travis CI and you’ll be testing your code in minutes!</p> <p> <a href=https://travisci.org target=_blank rel=\"noopener noreferrer\"> Travis CI </a> </p> </section> <section> <h2>Azure App Services</h2> <p>Quickly create powerful cloud apps for web and mobile clients</p> <p> <a href=https://azure.microsoft.com/en-us/services/app-service/ target=_blank rel=\"noopener noreferrer\"> Azure App Services </a> </p> </section> <section> <h3>\"Choose a job you love, and you will never have to work a day in your life.\"</h3> <h4>Confucius</h4> <p><img src=" + __webpack_require__(12) + " /></p> </section> <section> <h2>Resources</h2> <ul> <li> <a href=https://www.hanselman.com/blog/AzureAppServiceSecretsAndWebSiteHiddenGems.aspx target=_blank rel=\"noopener noreferrer\"> Scott Hanselman - Azure App Service Secrets </a> </li> <li> <a href=https://developer.blackbaud.com/skyux2 target=_blank rel=\"noopener noreferrer\"> SKY UX - Blackbaud UX Framework </a> </li> <li> <a href=https://developer.blackbaud.com/stache target=_blank rel=\"noopener noreferrer\"> Stache - Blackbaud Documentation Framework </a> </li> <li> <a href=https://github.com/hakimel/reveal.js target=_blank rel=\"noopener noreferrer\"> Reveal.js - Presentation tool </a> </li> </ul></section> </div> </div> </body> </html>";

/***/ }),
/* 14 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./reveal.css", function() {
			var newContent = require("!!../../css-loader/index.js!./reveal.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./white.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./white.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8256cfd7e4017a7690814879409212cd.ttf";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2da39ecf9246383937da11b44b7bd9b4.ttf";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f3565095e6c9158140444970f5a2c5ed.ttf";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c7e698a4d0956f4a939f42a05685bbf5.ttf";

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "data:application/font-woff;base64,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"

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e7acc589bb558fe58936a853f570193c.woff";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1cb8e94f1185f1131a0c895165998f2b.woff";

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "data:application/font-woff;base64,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"

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(7);


/***/ })
/******/ ]);