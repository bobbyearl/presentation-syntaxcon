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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
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

module.exports = "<html> <body> <div class=reveal> <div class=slides> <section> <h2>Ready, Set, Release</h2> <h3>SyntaxCon - Bobby Earl</h3> <p> <a href=http://bobbyearl.com target=_blank rel=\"noopener noreferrer\">bobbyearl.com</a> </p> <p> <a href=https://twitter.com/simplyearl target=_blank rel=\"noopener noreferrer\">@simplyearl</a> </p> </section> <section> <h2>Agenda</h2> <ul> <li class=fragment>Introductions</li> <li class=fragment>Fundamentals</li> <li class=fragment>Demo</li> <li class=fragment>Questions</li> </ul> </section> <section> <h2>About Me</h2> </section> <section> <ul> <li class=fragment>Staff Software Engineer at Blackbaud for 4 years</li> <li class=fragment>Father of 3 with a 4th due in July</li> <li class=fragment>Love building LEGO</li> <li class=fragment>First website was on Geocities and contained nothing but profanity</li> </ul> </section> <section> <img src=" + __webpack_require__(11) + " alt=\"\" class=stretch /> </section> <section> <h2>My Work</h2> </section> <section> <ul> <li class=fragment>Contribute to the Open Source community</li> <li class=fragment>Create UX framework</li> <li class=fragment>Create CLI to automate app/docs creation</li> <li class=fragment>Automate build processes</li> </ul> </section> <section> <h2>Show of Hands</h2> <p>Anyone guilty of manual deployments?</p> <p><small>(Remember to shamefully raise your hand Bobby)</small></p> </section> <section> <h2>Consistency is Key!</h2> <p>Automate to drive consistency, reliability, and security.</p> </section> <section> <h2>Services</h2> <ul> <li class=fragment>GitHub Pages</li> <li class=fragment>Travis CI</li> <li class=fragment>Azure App Services</li> </ul> </section> <section> <p>Each service has many alternatives.</p> <p>AWS, Heroku, CircleCI, Now, Jenkins, VSTS</p> <p>Focus on required features.</p> </section> <section> <h2>GitHub Pages</h2> <p>Websites for you and your projects.</p> <p> <a href=https://pages.github.com target=_blank rel=\"noopener noreferrer\"> pages.github.com </a> </p> </section> <section> <img src=" + __webpack_require__(25) + " alt=\"GitHub Pages\" class=stretch /> </section> <section> <ul> <li class=fragment>Static files only</li> <li class=fragment>Supports custom domains but no SSL for them</li> <li class=fragment>Can use <a href=https://jekyllrb.com/ target=_blank rel=\"noopener noreferrer\"> Static Site Generator Jekyll </a> </li> <li class=fragment>Free!</li> </ul> </section> <section> <h2>Travis CI</h2> <p>Easily sync your GitHub projects with Travis CI and you’ll be testing your code in minutes!</p> <p> <a href=https://travisci.org target=_blank rel=\"noopener noreferrer\"> Travis CI </a> </p> </section> <section> <ul> <li class=fragment>Pristine container for each run</li> <li class=fragment>First-class integrations with other services</li> <li class=fragment>Can be a little slow</li> <li class=fragment>Free!</li> </ul> </section> <section> <h2>Azure App Services</h2> <p>Quickly create powerful cloud apps for web and mobile clients</p> <p> <a href=https://azure.microsoft.com/en-us/services/app-service/ target=_blank rel=\"noopener noreferrer\"> Azure App Services </a> </p> </section> <section> <ul> <li class=fragment>First-class support for many languages</li> <li class=fragment>Lots of tooling available</li> <li class=fragment>Deployment slots</li> <li class=fragment>Highly reliable</li> <li class=fragment>Free, but limited!</li> </ul> </section> <section> <h3>\"Choose a job you love, and you will never have to work a day in your life.\"</h3> <h4>Confucius</h4> <p><img src=" + __webpack_require__(12) + " /></p> </section> <section> <h2>Resources</h2> <ul> <li> <a href=https://developer.blackbaud.com/skyux2 target=_blank rel=\"noopener noreferrer\"> SKY UX - Blackbaud UX Framework </a> </li> <li> <a href=https://developer.blackbaud.com/stache target=_blank rel=\"noopener noreferrer\"> Stache - Blackbaud Documentation Framework </a> </li> <li> <a href=https://github.com/hakimel/reveal.js target=_blank rel=\"noopener noreferrer\"> Reveal.js - Presentation tool </a> </li> <li> <a href=https://docs.travis-ci.com/user/customizing-the-build target=_blank rel=\"noopener noreferrer\"> Customizing Travis CI Build </a> </li> <li> <a href=https://www.hanselman.com/blog/AzureAppServiceSecretsAndWebSiteHiddenGems.aspx target=_blank rel=\"noopener noreferrer\"> Scott Hanselman - Azure App Service Secrets </a> </li> <li> <a href=https://docs.microsoft.com/en-us/azure/cloud-services/cloud-services-nodejs-develop-deploy-express-app target=_blank rel=\"noopener noreferrer\"> Deploying Express in Azure </a> </li> <li> <a href=https://github.com/projectkudu/kudu/wiki target=_blank rel=\"noopener noreferrer\"> Kudu </a> </li> </ul> </section> </div> </div> </body> </html>";

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
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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BEAABEAABEAABEAABEAABEAABEAABEAABEAABHKaAATpOZ09iBwIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgEB7E4Agvb1zAOGDAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAjkNAEI0nM6exA5EAABEAABEAABEAABEAABEAABEAABEAABEAABEACB9iYAQXp75wDCBwEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQyGkCEKTndPYgciAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAu1NAIL09s4BhA8CIAACIAACIAACIAACIAACIAACIAACIAACIAACIJDTBCBIz+nsQeRAAARAAARAAARAAARAAARAAARAAARAAARAAARAAATamwAE6e2dAwgfBEAABEAABEAABEAABEAABEAABEAABEAABEAABEAgpwlAkJ7T2YPIgQAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAItDcBCNLbOwcQPgiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAQE4TgCA9p7MHkQMBEAABEAABEAABEAABEAABEAABEAABEAABEAABEGhvAhCkt3cOIHwQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAIGcJgBBek5nDyIHAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiDQ3gQgSG/vHED4IAACIAACIAACIAACIAACIAACIAACIAACIAACIAACOU0AgvSczh5EDgRAAARAAARAAARAAARAAARAAARAAARAAARAAARAoL0JQJDe3jmA8EEABEAABEAABEAABEAABEAABEAABEAABEAABEAABHKaAATpOZ09iBwIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgEB7E4Agvb1zAOGDAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAjkNAEI0nM6exA5EAABEAABEAABEAABEAABEAABEAABEAABEAABEACB9iYAQXp75wDCBwEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQyGkCEKTndPYgciAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAu1NAIL0lHPgHH2440/0Vv1fqM/NPajs1p4p+5CzH7S20pkYxy4SoS75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IJAFAjFqfGcX1b1bT0dPqAM1iRqPxOjqLw6kYV8ZQcW9US+zABlegEByBPgQdD6xL/QA9OQ8gqvkCaANTJ4VXIIACIBA+xNoOXSQTnFfGWuJUdFAPrgXOyY9mQJBugcJHoAACIAACIAACIAACIAACIAACIAACIAACIAACIAACICAQwCCdIcFrkAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEDAQwCCdA8SPAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABhwAE6Q4LXIEACIAACIAACIAACIAACIAACIAACIAACIAACIAACICAhwAE6R4keAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACDgEI0h0WuAIBEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABDwEI0j1I8AAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEHAIQpDsscAUCIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACHgIQpHuQ4AEIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIOAQgSHdY4AoEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEPAQgSPcgwQMQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQcAhAkO6wwBUIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIeAhAkO5BggcgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIg4BCAIN1hgSsQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQ8BCAIN2DBA9AAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAwCEAQbrDAlcgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIg4CEAQboHCR6AAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAgEMAgnSHBa5AAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAwEMAgnQPEjwAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAAYcABOkOC1yBAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAgIcABOkeJHgAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAg4BCNIdFrgCARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAAQ8BCNI9SPAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABBwCEKQ7LHAFAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAh4CEKR7kOABCIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACDgEIEh3WOAKBEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABDwEIEj3IMEDEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEHAIQJDusMAVCIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACHgIQJDuQYIHIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIOAQgCDdYYErEAABEAABEAABEAABEAABEAABEAABEAABEAABEAABEPAQgCDdgwQPQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQMAhAEG6wwJXIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIOAhAEG6BwkegAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgIBDAIJ0hwWuQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQMBDAIJ0DxI8AAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAGHAATpDgtcgQAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgICHAATpHiR4AAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIOAQjSHRa4AgEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEPAQjSPUjwAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAAQcAhCkOyxwBQIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIeAhCke5DgAQiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAg4BCBId1jgCgRAAARAAARAAARAAARAAARAAARAAARAAARAAARAAAQ8BCBI9yDBAxAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARBwCECQ7rDAFQiAAAiAAAiAAAiAAAiAAAiAAAiAAAiA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/3I2Fkn6oo+mGHp/JjIGA/NGzYcj6m6IzBkLMLCj4yNKs7zjIKyaMTxAgO/4s87Cx/KxevnvsW7vaeuW+7dJB2Tcdx+G3tbZfT/qKoyC3JVYujbfZVNdd9apxwD89CfD0bV9SL/NcxIgARIgARIgARIgARIgARIgARIgARIgARIgARKoVgRqjyDdwl4WRuHuAuzfdwBHi86ifiiE8+Ew6jdqhtSO3dCtV2c00uyhW97i/YZPHkbhwcMIh1qK9vcpFIVDaN2hM9o0T1JIXHpa0rcPJY0lnPMlQONWki6x436pj+LjKNx3UITgTZHSOIyiM0Drb3REm1bJbgYqfg/sQ+GXZ5HSuiXCRacQSmmF5te2QyPaQ7/Upcr4SIAESIAESIAESIAESIAESIAESIAESIAESIAEykGg9gnSywGJXkiABEiABEiABEiABEiABEiABEiABEiABEiABEiABGovAQrSa2/ZM+ckQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIJEKAgPQFIdEICJEACJEACJEACJEACJEACJEACJEACJEACJEACJFB7CVCQXnvLnjknARIgARIgARIgARIgARIgARIgARIgARIgARIgARJIgAAF6QlAohMSIAESIAESIAESIAESIAESIAESIAESIAESIAESIIHaS4CC9Npb9sw5CZAACZAACZAACZAACZAACZAACZAACZAACZAACZBAAgQoSE8AEp2QAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAnUXgIUpNfesmfOSYAESIAESIAESIAESIAESIAESIAESIAESIAESIAEEiBAQXoCkOiEBEiABEiABEiABEiABEiABEiABEiABEiABEiABEig9hKgIL32lj1zTgIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkkAABCtITgEQnJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACtZcABem1t+yZcxIgARIgARIgARIgARIgARIgARIgARIgARIgARIggQQIUJCeACQ6IQESIAESIAESIAESIAESIAESIAESIAESIAESIAESqL0EKEivvWXPnJMACZAACZAACZAACZAACZAACZAACZAACZAACZAACSRAgIL0BCDRCQmQAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAmQQO0lQEF67S175pwESIAESIAESIAESIAESIAESIAESIAESIAESIAESCABAhSkJwCJTkiABEiABEiABEiABEiABEiABEiABEiABEiABEiABGovAQrSa2/ZM+ckQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIJEKAgPQFIdEICJEACJEACJEACJEACJEACJEACJEACJEACJEACJFB7CVCQXnvLnjknARIgARIgARIgARIgARIgARIgARIgARIgARIgARJIgAAF6QlAohMSIAESIAESIAESIAESIAESIAESIAESIAESIAESIIHaS4CC9Npb9sw5CZAACZAACZAACZAACZAACZAACZAACZAACZAACZBAAgQoSE8AEp2QAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAnUXgIUpNfesmfOSYAESIAESIAESIAESIAESIAESIAESIAESIAESIAEEiBAQXoCkOiEBEiABEiABEiABEiABEiABEiABEiABEiABEiABEig9hKgIL32lj1zTgIkQAIkQAIkQAJXLIFwOIyLFy+irKzsis1DrIRfddVVqFu3LkKhUCxnfEYClUqgprerZGGxHSZLjO5JgARIgARIoGYToCC9ZpdvuXJXciAff3rnI9T/Rh8MHdyrXGFcLk8lxw6jOAw0adEOja6+XKlgvMkSKNy2HlvyjyH11iHo37tlst4r1X11SkulZqxGBhZG0aHjOI8QmrdvKX+r6Cg9jaMnSoBQI7Rp1bSKItGDPYuCdWvx0Zch3Hr3cHRtpT+rPufhk8dx8lwY9Ru0RErzKqOvZTiIi1UPqrbvDxefRRj1pBqEELpKS1atOb00nBPB+fXXX6O0tLTGCtC9DJQg7+qrr0adOnW8j+JeV2q9LT4ufaG0+WuSb/PVanxWfBCb/nszvgx1wOB7BiDlcrfnCnCNWwGScFDb2lUSaAynybTDalXfk81oZbi/5OOmykg0wyABEiABEiCBxAjUXEH6yd3Y9JfPgfrn0bhdf/S9JbZwbs+m9fhC5CRhNEXfIf0u/6A6sfKL6UoJxN/K3Yi8zw7hjOVSBEE39e6DgXd+H13bN7Tuar/HsXLUVGyI3EkfvwAjevu507xopyV78/HejgMINe6IWwenoZH2LOq09DDyNuaj6DzQ7Xt3oVPzKBfJ3SjNx8Qx2SgUXyn9MvHiw2nJ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xsSLEt5dffXVqFOnTo0tU2bs8hOobe0qWeJsh8kSo3sSIAESIAESqJkEKEivmeXKXJEACZAACZAACZBAjSagzFFcvHixxgrUleCubt26NOdSo2tx9ctcTW9XyRJnO0yWGN2TAAmQAAmQQM0mQEF6zS5f5o4ESIAESIAESIAESIAESIAESIAESIAESIAESIAESKCCBChIryBAeicBEiABEiABEiABEiABEiABEiABEiABEiABEiABEqjZBChIr9nly9yRAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAlUkAAF6RUESO8kQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAI1mwAF6TW7fJk7EiABEiABEiABEiABEiABEiABEiABEiABEiABEiCBChKgIL2CAOmdBEiABEiABEiABEiABEiABEiABEiABEiABEiABEigZhOgIL1mly9zRwIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkUEECFKRXECC9kwAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJ1GwCFKTX7PJl7kiABEiABEiABEiABEiABEiABEiABEiABEiABEiABCpIgIL0CgKkdxIgARIgARIgARIgARIgARIgARIgARIgARIgARIggZpNgIL0ml2+zB0JkAAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJkAAJkEAFCVCQXkGA9E4CJEACJEACJEACJEACJEACJEACJEACJEACJEACJFCzCdQKQfqZMyXYvWcPvig8hNNffYWysrKaXarMHQmQAAmQQI0mcNVVV6HpNdfg2tT26N61Kxo3blQl+S09fx6HjnyJkydP4ey5c/j666+rJB4GWrkE6tSpg4YNGqB582Zo37Y1rq5fv3IjYGgkQAIkQAIkQAIkQAIkQAIkUAsJ1HhB+p69+/DBtu0UntfCys0skwAJkEBtIKCE6rf2uQVdu3Su1OweOXoMe/cfoPC8Uqle+sCUUL1Lp45o26bVpY+cMZIACZAACZAACZAACZAACZBADSJQowXpSoj+1w+2GcXVtGlTtGvbFnXr1UW9evXsIqyDOvY5T0iABEiABEiguhL4Go42+IULF3DxwkUcOnwYX8lKK3V899Y+lSZMV0L0zz7/pxHuNaL53rp1a9SvH0LdunWNe/xTvQlcvHgR58+H8eWXR6V+FBuJvf66b1KYXr2LjakjARIgARIgARIgARIgARKo5gRqrCBdmXPJfXOdoYmuBADt2rUVkbkIzUUzyxCdR/4YP9W8kJg8EiABEiABEjDF6PLX/F9+lWj9axw6dBjHjh2D0kxP/8HQCpt5UeZctufvNDTRW7VqibbyEZrHlUvgyJEjUj+Oy/CnDm5J60UzL1duUTLlJEACJEACJEACJEACJEACl5lAjRWkf5j/d+z8xyciUGiMLrLcXU0gjf/k15Cnm38Ef0SwfpkLgtGTAAmQAAmQQBABtxA9IkyPCNK/Lvsa+z7/HMXFxej1Lzfg5rRvBQWT0P39BwtR+L+Hjfdnp07fTMgPHVVvAv/85z+lfpxB6jfaoVOH1OqdWKaOBEiABEiABEiABEiABEiABKopgRorSF+7bj2KTp3C9V26oEmTJqhzVR1cVecqQ6DuCNIpRK+m9ZLJIgESIAES8BAwhOkR4bmhlS7nZV+XQQnS1Uba+/btQ0qzZhg29C6Pz+QuP9rxD5ScPQslRFcfo3lc+QTUR5Z//vMAGjVsiJt6/8uVnyHmgARIgARIgARIgARIgARIgAQuA4EaK0jP+f3rhlmXnj17GsuY1ZJ3X2G6gh6x70Kx+mWogYySBEiABEggkIBtF91USTdMuXiF6GVlZThXWop//OMfhnmXjB/dGxheIg+25n1omHXp3r2ba0+RRPzSTfUkoGzq7979qaFM0K/vzdUzkUwVCZAACZAACZAACZAACZAACVRzAjVWkL7qP1cb6G+++SZDsKAE6ca/iFa6MvVia6ZX80Ji8kiABEiABEjAEKorqy5KKz2ija6E6Na/Dz/8yIA08sf3VQjWlg+2G/579qTmcoVAVjPPBQX/MFLU/9ZbqlnKmBwSIAESIAESIAESIAESIAESuDII1HhB+rdvuQV169Z1CdMNe+kUpF8ZNZSpJAESIAESMAhECdI1IfrFixfxt+2mAJyCdFYYPwIUpPtR4T0SIAESIAESIAESIAESIAESSJxAjRek9+3TxxGk1xWtdNFIV5rpsr7Zsuhi2k1PnBldkgAJkAAJkMAlI2AJ0FWElp10Qwtd7KOXXTQ10pUgPW/bNiNNFKRfsqK5oiKiIP2KKi4mlgRIgARIgARIgARIgARIoBoSqPGC9Ftv7Yu6V9V1hOkREy+6WRfDzEs1LBwmiQRIgARIgAQUAWXKxfg1DKTDNueiBOpKiH6x7CI++CDPcENBuoGBfzwEKEj3AOElCZAACZAACZAACZAACZAACSRJoMYL0r/zne8YQvS6oo2uBOrGpqNKG52mXZKsKnROAiRAAiRwOQlYmum2jXQlRBcB+kXRSr948QLef/8DI3kUpF/OUqq+cVOQXn3LhikjARIgARIgARIgARIgARK4MgjUeEH6d5UgvZ5opGta6baNdCkjaqNfGRWVqSQBEiCB2k7A1kq3NhvVtNEvXriIv77/voGIgvTaXlP8809Buj8X3iUBEiABEiABEiABEiABEiCBRAnUeEF6v+9+N6KRLtromo10PwG6371EQdIdCZAACZAACVQ2AUt4roer7uk20g3TLmLeZetf/2o4oyBdp8VziwAF6RYJ/pIACZAACZAACZAACZAACZBA+QjUDkG60kiva2qlu0y7CDMKz8tXceiLBEiABEjg0hKwhOrq1xKmm6ZdxLyLaKRTkH5py+NKi42C9CutxJheEiABEiABEiABEiABEiCB6kag5gvS+30X9erWc202qoTn1r/qViBMDwmQAAmQAAkEEbCE6JYg3dps9ILYSN+6lRrpQdx4H6AgnbWABEiABEiABEiABEiABEiABCpGoMYL0vv36+eYdrnqKtdmo9RGr1jloW8SIAESIIFLSyBIkK7Mu2zZutVIDE27XNoyuVJioyD9SikpppMESIAESIAESIAESIAESKC6EqAgvbqWDNNFAiRAAiRAAh4CFKR7gPAyYQIUpCeMig5JgARIgARIgARIgARIgARIwJcABem+WHiTBEiABEiABKofAQrSq1+ZXCkpoiD9SikpppMESIAESIAESIAESIAESKC6EqAgvbqWDNNFAiRAAiRAAh4CFKR7gPAyYQIUpCeMig5JgARIgARIgARIgARIgARIwJcABem+WHiTBEiABEiABKofAQrSq1+ZXCkpoiD9SikpppMESIAESIAESIAESIAESKC6EqAgvbqWDNNFAiRAAiRAAh4CFKR7gPAyYQIUpCeMig5JgARIgARIgARIgARIgARIwJcABem+WHizRhE4ewL7j34VyVJ9tGrfHk3q16gcVl1mvOyuFXZ1qy66Sgn54nkc+uIQSiOBXd2yPdrX6gI/j+JT500aUnb1GzZB/cosw7PF0r6O20VXbt7eusZ2ajPV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BwmQAAmQAAmQAAmQgEuAQrpLhL9JgARIgARIgARIgARIgARyGwEK6bltxjleEiABEiABEiABEoiRAIX0GIExOwmQAAmQAAmQAAmQAAmQQNIRoJCedFPKAZEACZAACZAACZBAfAlQSI8vT9ZGAiRAAiRAAiRAAiRAAiSQ8wgktZC+bft2ueG663LerLDHJEACJEACJEACJJBABCikJ9BksCskQAIkQAIkQAIkQAIkQALZQiBphfTvfvhBftiwURrcdWe2gGWjJEACJEACJEACJJAsBCikJ8tMchwkQAIkQAIkQAIkQAIkQALpJZC0QvqHa9fKn39tk4Z3U0hP7+JgORIgARIgARIgARIAAQrpXAckQAIkQAIkQAIkQAIkQAK5nUDSCukrV70te/ftp5Ce21c4x08CJEACJEACJJBhAhTSM4yQFZAACZAACZAACZAACZAACeRwAkkrpC9ZvkIOp6RQSM/hC5TdJwESIAESIAESyH4CFNKzfw7YAxIgARIgARIgARIgARIggewlkLRC+qLlb8h/Kf9RSM/e9cXWSYAESIAESIAEkoAAhfQkmEQOgQRIgARIgARIgARIgARIIEMEKKRnCB8LkwAJkAAJkAAJkEDyE6CQnvxzzBGSAAmQAAmQAAmQAAmQAAmEJ5C8QvqyNIv0e3jYaPglwFQSIAESIAESIAESCE+AQnp4PkwlARIgARIgARIgARIgARJIfgIU0pN/jjlCEiABEiABEiABEsgQAQrpGcLHwiRAAiRAAiRAAiRAAiRAAklAgEJ6Ekwih0ACJEACJEACJEACmUmAQnpm0mXdJEACJEACJEACJEACJEACOYFAEgvpy1MPG73nrpwwD+wjCZAACZAACZAACSQsAQrpCTs17BgJkAAJkAAJkAAJkAAJkEAWEaCQnkWg2QwJkAAJkAAJkAAJ5FQCFNJz6syx3yRAAiRAAiRAAiRAAiRAAvEikPRCes0aNePFivWQAAmQAAmQAAmQQK4ksGnTRsmbN6+cXLGivuJe8uSRvPhP3edRV+8/pP33n/cbwJBmB/e3ncZ7EiABEiABEiABEiABEiABEkhEAhTSE3FW2CcSIAESIAESIAESSCACFNITaDLYFRIgARIgARIgARIgARIggWwhkPRCekP6SM+WhcVGSYAESIAESIAEkocAXbskz1xyJCRAAiRAAiRAAiRAAiRAAukjkLxC+tK0w0bv5WGj6VsaLEUCJEACJEACJEACqQQopHMlkAAJkAAJkAAJkAAJkAAJ5HYCSSukL0wT0htRSM/ta5zjJwESIAESIAESyCABCukZBMjiJEACJEACJEACJEACJEACOZ4AhfQcP4UcAAmQAAmQAAmQAAlkLgEK6ZnLl7WTAAmQAAmQAAmQAAmQAAkkPgEK6Yk/R+whCZAACZAACZAACWQrAQrp2YqfjZMACZAACZAACZAACZAACSQAAQrpCTAJ7AIJkAAJkAAJkAAJJDIBCumJPDvsGwmQAAmQAAmQAAmQAAmQQFYQSHIhPUUa3Xt3VnBkGyRAAiRAAiRAAiSQtAQopCft1HJgJEACJEACJEACJEACJEACURKgkB4lKGYjARIgARIgARIggdxKgEJ6bp15jpsESIAESIAESIAESIAESMAQSGohPSUlRe6jRbqZa15JgARIgARIgARIIF0EKKSnCxsLkQAJkAAJkAAJkAAJkAAJJBEBCulJNJkcCgmQAAmQAAmQAAlkBgEK6ZlBlXWSAAmQAAmQAAmQAAmQAAnkJAIU0nPSbLGvJEACJEACJEACJJANBCikZwN0NkkCJEACJEACJEACJEACJJBQBCikJ9R0sDMkQAIkQAIkQAIkkHgEKKQn3pywRyRAAiRAAiRAAiRAAiRAAllLgEJ61vJmayRAAiRAAiRAAiSQ4whQSM9xU8YOkwAJkAAJkAAJkAAJkAAJxJkAhfQ4A2V1JEACJEACJEACJJBsBCikJ9uMcjwkQAIkQAIkQAIkQAIkQAKxEkhaIX3B0uWSkpIi9997d6xMmJ8ESIAESIAESIAESMAiQCHdgsFbEiABEiABEiABEiABEiCBXEmAQnqunHYOmgRIgARIgARIgASiJ0AhPXpWzEkCJEACJEACJEACJEACJJCcBCikJ+e8clQkQAIkQAIkQAIkEDcCFNLjhpIVkQAJkAAJkAAJkAAJkAAJ5FACySukL1kmKf/Btcs9OXRq2G0SIAESIAESIAESSAwCFNITYx7YCxIgARIgARIgARIgARIggewjQCE9+9izZRIgARIgARIgARLIEQQopOeIaWInSYAESIAESIAESIAESIAEMpFA0grp85VF+n+0SM/EpcOqSYAESIAESIAEcgsBCum5ZaY5ThIgARIgARIgARIgARIggVAEKKSHIsN4EiABEiABEiABEiABTYBCOhcCCZAACZAACZAACZAACZBAbidAIT23rwCOnwRIgARIgARIgAQiEKCQHgEQk0mABEiABEiABEiABEiABJKeAIX0pJ9iDpAESIAESIAESIAEMkaAQnrG+LE0CZAACZAACZAACZAACZBAzidAIT2b5/D12XPlg4/XyoghA7O5J2yeBEiABEiABEiABPwJUEj358JYEiABEiABEiABEiABEiCB3EMgeYX0xWmHjTa4J2FnEyJ6t159df/q17uVYnrCzhQ7RgIkQAIkQAK5mwCF9Nw9/xw9CZAACZAACZAACZAACZCACIX0bFoFtohuukAx3ZDglQRIgARIgARIIJEIUEhPpNlgX0iABEiABEiABEiABEiABLKDAIX0bKDuJ6KjG/Vvu0VGDB2UDT1ik1lJYM+ePfLb71t0k3nyiJxwwglSpHDhrOxCjm3LZVehfHkpUKBAQo/H7XNun+///vtPtm/fIf+p/8ufL58UK1ZM8ufPH7c5jBfveNUTt4GxIhLIZgIU0rN5Atg8CZAACZAACZAACZAACZBAthOgkJ7FU0ARPYuBJ2Bzz7/4svQfNNTr2cynp8nll17i/eZNaAIuuxdmTpdqF18UukAcUnbs2CFbtv6hxd4CBfILxPs82AGJMrh9zq3zDWH61ddmy6ix42X//v0evfZtW0vrls293xm9iRfveNWT0fGwPAkkCgEK6YkyE+wHCZAACZAACZAACZAACZBAdhGgkJ6F5Cmixx/2vzt3ysGDB3XFsG495phj4t9InGuc9foc6dG7n1fri88+LRdfdKH3mzehCWQ1O1hP9+zTX9AuQtGiRWX1m8vlqKOKh+6kk5LVfXaaT4ifKSkpUueW+rJhw8ag/nRo11patYifkB4v3vGqJ2jAjCCBHEqAQnoOnTh2mwRIgARIgARIgARIgARIIG4EKKTHDWX4iiiih+eTntS9+/ZJ9RvryN/btuniJ1eqKIvnz5F8+fKmp7osK0OBLv2os5odNmnq3Fxfft60SXe6+nXXyOMTx0vevNGvsazuc/rpZl7Jb9evl5vr3RXUQKFChaRr5w5yf8N7g9LSGxEv3vGqJ73jYDkSSDQCFNITbUbYHxIgARIgARIgARIgARIggawmkLRC+rzFy+S//1KkcYN7spppUHsU0YOQxCUCQvoNterKn3/+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ZLhPdX6TeJPYAneTWOcq/oLAnUVAPRO23ANG8yaCk5PyQ35nlRjSggAIgAAIgAAIgAAIgAAIgAAINIcAFOnNoYe4IAACIHCnELhp+NmvYWegAyizXzI+l3lTyL3/RnXRJmq60ZNyvz5a32j4Tik/5AQBL4GaStr7H7VEV5oo/cE8GjHcZ/NNbxycgwAIgAAIgAAIgAAIgAAIgAAItFsCUKS326pHwUEABEAABEAABEAABEAABEAABEAABEAABEAABEAABMIQgCI9DCWEAQEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQaLcEoEhvt1WPgoMACIAACIAACIAACIAACIAACIAACIAACIAACIAACIQhAEV6GEoIAwIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIg0G4JQJHebqseBQcBEAABEAABEAABEAABEAABEAABEAABEAABEAABEAhDAIr0MJQQBgRAAARAAARAAARAAARAAARAAARAAARAAARAAARAoN0SgCK93VY9Cg4CIAACIAACIAACIAACIAACIAACIAACIAACIAACIBCGABTpYSghDAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAQLslAEV6u616FBwEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQCAMASjSw1BCGBAAARAAARAAARAAARAAARAAARAAARAAARAAARAAgXZLAIr0dlv1KDgIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgEAYAlCkh6GEMCAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAu2WABTp7bbqUXAQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAIEwBKBID0MJYUAABEAABEAABEAABEAABEAABEAABEAABEAABEAABNotASjS223Vo+AgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAJhCECRHoYSwoAACIAACIAACIAACIAACIAACIAACIAACIAACIAACLRbAlCkt9uqR8FBAARAAARAAARAAARAAARAAARAAARAAARAAARAAATCEIAiPQwlhAEBEAABEAABEAABEAABEAABEAABEAABEAABEAABEGi3BKBIb7dVj4KDAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiEIQBFehhKCAMCIAACIAACIAACIAACIAACIAACIAACIAACIAACINBuCUCR3m6rHgUHARAAARAAARAAARAAARAAARAAARAAARAAARAAARAIQwCK9DCUEAYEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQKDdEoAivd1WPQoOAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAQhgAU6WEoIQwIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgEC7JQBFerutehQcBEAABEAABEAABEAABEAABEAABEAABEAABEAABEAgDAEo0sNQQhgQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAIF2SwCK9HZb9Sg4CIAACIAACIAACIAACIAACIAACIAACIAACIAACIBAGAJQpIehhDAgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAALtlgAU6e226lFwEAABEAABEAABEAABEAABEAABEAABEAABEAABEACBMASgSA9DCWFAAARAAARAAARAAARAAARAAARAAARAAARAAARAAATaLQEo0ttt1aPgIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACYQhAkR6GEsKAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAi0WwJQpLfbqkfBQQAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEwhCAIj0MJYQBARAAARAAARAAARAAARAAARAAARAAARAAARAAARBotwSgSG+3VY+CgwAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIhCEARXoYSggDAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiDQbglAkd5uqx4FBwEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQCEMAivQwlBAGBEAABEAABEAABEAABEAABEAABEAABEAABEAABECg3RKAIr3dVj0KDgIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgEIYAFOlhKCEMCIAACIAACIAACIAACIAACIAACIAACIAACIAACIBAuyUARXq7rXoUHARAAARAAARAAARAAARAAARAAARAAARAAARAAARAIAwBKNLDUEIYEAABEAABEAABEAABEAABEAABEAABEAABEAABEACBdksAivR2W/UoOAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAQBgCUKSHoYQwIAACIAACIAACIAACIAACIAACIAACIAACIAACIAAC7ZYAFOnttupRcBAAARAAARAAARAAARAAARAAARAAARAAARAAARAAgTAEoEgPQwlhQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAE2i0BKNLbbdWj4CAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAmEIQJEehhLCgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAItFsCUKS326pHwUEABEAABEAABEAABEAABEAABEAABEAABEAABEAABMIQgCI9DCWEAQEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQaLcEoEhvt1WPgoMACIAACIAACIAACIAACIAACIAACIAACIAACIAACIQhcNsV6X848Uf685//TMOGfoHu6tAhjMwIAwIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAK3hMBN1l8fYz12B9Zff5H12M35dWBl+J9TSeDUmSq6eu06ZfX/HHW/t1sqSSAOCIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACHwmBC5/coXOnf8v6tL5HhoyaECz8khZkf7hpXqquXDRFGLwwP6wSm9WNSAyCIAACIAACIAACIAACIAACIAACIAACIAACIAACIBASxEwrNFPnz1vGoP369OL7u+Z0aykU1akG7k6VumGRr/P/T0pLa0rFOrNqg5EBgEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQSJWAoUBvbGyiCx9eMpXoLWGNbsjSLEX6jRtR+s8PakyBUi0Y4oEACIAACIAACIAACIAACIAACIAACIAACIAACIAACIBASxMwlOh/8fl+1KlTpNlJN0uR7uRuuHlp+PgTunb9hrkBqXMdf0EABEAABEAABEAABEAABEAABEAABEAABEAABEAABEDgVhEwNhbtfE8nSr/v3ma7c5Eyt4giXSaIYxAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARBoSwSgSG9LtYmygAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAItDgBKNJbHCkSBAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQaEsEoEhvS7WJsoAACIAACIAACIAACIAACIAACIAACIAACIAACIAACLQ4ASjSWxwpEgQBEAABEAABEAABEAABEAABEAABEAABEAABEAABEGhLBKBIb0u1ibKAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAi0OAEo0lscKRIEARAAARAAARAAARAAARAAARAAARAAARAAARAAARBoSwSgSG9LtYmygAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAItDgBKNJbHCkSBAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQaEsEoEhvS7WJsoAACIAACIAACIAACIAACIAACIAACIAACIAACIAACLQ4ASjSWxwpEgQBEAABEAABEAABEAABEAABEAABEAABEAABEAABEGhLBKBIb0u1ibKAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAi0OAEo0lscKRIEARAAARAAARAAARAAARAAARAAARAAARAAARAAARBoSwSgSG9LtYmygAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAIgAAItDgBKNJbHCkSBAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQAAEQaEsEoEhvS7WJsoAACIAACIAACIAACIAACIAACIAACIAACIAACIAACLQ4ASjSWxwpEgQBEAABEAABEAABEAABEAABEAABEAABEAABEAABEGhLBKBIb0u1ibKAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAiAAAi0OIH/D7DHlDRJU4lOAAAAAElFTkSuQmCC"

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(7);


/***/ })
/******/ ]);