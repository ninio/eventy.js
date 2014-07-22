/*
 * Eventy.js
 * v0.1.0
 * Init by Nikolay Ninarski
 */
;( function( root, undefined ) {
	'use strict';

	var eventyModule = {
		/**
		 * Add event interface to the given Object
		 * @param  {[type]} NewEventEnabledObject  The object that will be event enabled
		 * @return {[type]}
		 */
		eventEnable: function ( NewEventEnabledObject ) {
			/**
			 * addEventListener an event for NewEventEnabledObject
			 * @param  {String} eventName  The name of the event
			 * @param  {Function} handler  The callback
			 */
			NewEventEnabledObject.addEventListener = function ( eventName, handler ) {
				if( NewEventEnabledObject._eventHandlers === undefined ) {
					NewEventEnabledObject._eventHandlers = {};
				}

				if( NewEventEnabledObject._eventHandlers[ eventName ] === undefined ) {
					NewEventEnabledObject._eventHandlers[ eventName ] = [];
				}

				if( typeof handler === 'function' ) {
					NewEventEnabledObject._eventHandlers[ eventName ].push( handler );
				}
				else {
					console.error( 'Cannot attach the handler - it is not a function.');
				}
			}

			/**
			 * triggerEvent an event for a NewEventEnabledObject
			 * @param  {String} eventName  The name of the event
			 * @param  {Object} options    The single argument for the callback. Can consist of anything
			 */
			NewEventEnabledObject.triggerEvent = function ( eventName, options ) {
				if( NewEventEnabledObject._eventHandlers !== undefined ) {
					if( NewEventEnabledObject._eventHandlers[ eventName ] !== undefined ) {
						for( var handlerIndex = 0; handlerIndex < NewEventEnabledObject._eventHandlers[ eventName ].length; handlerIndex++ ) {
							if( typeof NewEventEnabledObject._eventHandlers[ eventName ][ handlerIndex ] === 'function' ) {
								NewEventEnabledObject._eventHandlers[ eventName ][ handlerIndex ].call( this, options );
							}
						}
					}
				}
			}

			/**
			 * removeEventListener event handler
			 * @param  {String} eventName  The name of the event
			 * @param  {Function} handler  The handler that we want to remove
			 * @return {Function|null}     The removed handler
			 */
			NewEventEnabledObject.removeEventListener = function ( eventName, handler ) {
				if( typeof handler === 'function' ) {
					if( NewEventEnabledObject._eventHandlers !== undefined ) {
						if( NewEventEnabledObject._eventHandlers[ eventName ] !== undefined ) {
							for( var handlerIndex = 0; handlerIndex < NewEventEnabledObject._eventHandlers[ eventName ].length; handlerIndex++ ) {
								if( NewEventEnabledObject._eventHandlers[ eventName ][ handlerIndex ] === handler ) {
									return NewEventEnabledObject._eventHandlers[ eventName ].splice( handlerIndex, 1 );
								}
							}
						}
					}
				}
				return null;
			}


			// Enable instance-invoked events only if there are instances
			if( NewEventEnabledObject.prototype ) {
				NewEventEnabledObject.prototype.addEventListener = function( eventName, handler ) {
					NewEventEnabledObject.addEventListener.call( this, eventName, handler );
				};

				NewEventEnabledObject.prototype.triggerEvent = function( eventName, options ) {
					NewEventEnabledObject.triggerEvent.call( this, eventName, options );
				};

				NewEventEnabledObject.prototype.removeEventListener = function( eventName, handler ) {
					NewEventEnabledObject.removeEventListener.call( this, eventName, handler );
				};
			}
		}
	};

	root.eventy = eventyModule;
})( window );
