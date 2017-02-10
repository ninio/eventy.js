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
			NewEventEnabledObject._eventHandlers = {};
			/**
			 * addEventListener an event for NewEventEnabledObject
			 * @param  {String} eventName  The name of the event
			 * @param  {Function} handler  The callback
			 */
			NewEventEnabledObject.addEventListener = function ( eventName, handler ) {
				if(  NewEventEnabledObject._eventHandlers[ eventName ] === undefined ) {
					NewEventEnabledObject._eventHandlers[ eventName ] = [];
				}

				if( typeof handler === 'function' ) {
					NewEventEnabledObject._eventHandlers[ eventName ].push( handler );
				}
				else {
					console.error( 'Cannot attach the handler - it is not a function.');
				}
			};

			/**
			 * triggerEvent an event for a NewEventEnabledObject
			 * @param  {String} eventName  The name of the event
			 * @param  {Object} options    The single argument for the callback. Can consist of anything
			 */
			NewEventEnabledObject.triggerEvent = function ( eventName, options ) {
				var isEventSuccessful = true;

				if( NewEventEnabledObject._eventHandlers !== undefined ) {
					if( NewEventEnabledObject._eventHandlers[ eventName ] !== undefined ) {
						for( var handlerIndex = 0; handlerIndex < NewEventEnabledObject._eventHandlers[ eventName ].length; handlerIndex++ ) {
							if( typeof NewEventEnabledObject._eventHandlers[ eventName ][ handlerIndex ] === 'function' ) {
								isEventSuccessful = ( NewEventEnabledObject._eventHandlers[ eventName ][ handlerIndex ].call( this, options ) !== false ) && isEventSuccessful;
							}
						}
					}
				}

				return isEventSuccessful;
			};

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
			};


			// Enable instance-invoked events only if there are instances
			if( NewEventEnabledObject.prototype ) {

				/**
				 * addEventListener an event for NewEventEnabledObject
				 * @param  {String} eventName  The name of the event
				 * @param  {Function} handler  The callback
				 */
				NewEventEnabledObject.prototype.addEventListener = function ( eventName, handler ) {
					if( !this._eventHandlers ) {
						this._eventHandlers = {};
					}

					if( this._eventHandlers[ eventName ] === undefined ) {
						this._eventHandlers[ eventName ] = [];
					}

					if( typeof handler === 'function' ) {
						this._eventHandlers[ eventName ].push( handler );
					}
					else {
						console.error( 'Cannot attach the handler - it is not a function.');
					}
				};

				/**
				 * triggerEvent an event for a NewEventEnabledObject
				 * @param  {String} eventName  The name of the event
				 * @param  {Object} options    The single argument for the callback. Can consist of anything
				 */
				NewEventEnabledObject.prototype.triggerEvent = function ( eventName, options ) {
					var isEventSuccessful = true;

					if( this._eventHandlers !== undefined ) {
						if( this._eventHandlers[ eventName ] !== undefined ) {
							for( var handlerIndex = 0; handlerIndex < this._eventHandlers[ eventName ].length; handlerIndex++ ) {
								if( typeof this._eventHandlers[ eventName ][ handlerIndex ] === 'function' ) {
									isEventSuccessful = ( this._eventHandlers[ eventName ][ handlerIndex ].call( this, options ) !== false ) && isEventSuccessful;
								}
							}
						}
					}

					isEventSuccessful = ( NewEventEnabledObject.triggerEvent.call( this, eventName, options ) !== false ) && isEventSuccessful;

					return isEventSuccessful;
				};

				/**
				 * removeEventListener event handler
				 * @param  {String} eventName  The name of the event
				 * @param  {Function} handler  The handler that we want to remove
				 * @return {Function|null}     The removed handler
				 */
				NewEventEnabledObject.prototype.removeEventListener = function ( eventName, handler ) {
					if( typeof handler === 'function' ) {
						if( this._eventHandlers !== undefined ) {
							if( this._eventHandlers[ eventName ] !== undefined ) {
								for( var handlerIndex = 0; handlerIndex < this._eventHandlers[ eventName ].length; handlerIndex++ ) {
									if( this._eventHandlers[ eventName ][ handlerIndex ] === handler ) {
										return this._eventHandlers[ eventName ].splice( handlerIndex, 1 );
									}
								}
							}
						}
					}
					return null;
				};
			}
		}
	};

	root.eventy = eventyModule;
})( window );
