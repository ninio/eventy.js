eventy.js
=========

Simple pub-sub library for enhancing regular JS objects with event interface. No jQuery and no DOM.
To event enable the type you've just created simply use `eventy.eventEnable( YourObject );`
Let's say you are implementing a car
```javascript
function Car( type ) {
	this.type = type;
}
```
To enable it's events just type
```javascript
eventy.eventEnable( Car );
```
Next you can trigger any event
```javascript
Car.prototype.setType = function ( newType ) {
	if( newType !== this.type ) {
		this.type = newType;
		Car.triggerEvent( 'typeChange', { type: newType } );
	}
};
```
And you can handle any event
```javascript
Car.addEventListener( 'typeChange', function( options ) {
	console.log( options.type );
	console.log( this );
});
```
Now you can trigger the event from the instance and handle it from the Type
```javascript
var car1 = new Car( 'sedan' ),
	car2 = new Car( 'truck' );

car1.setType( 'truck' );
car2.setType( 'cabrio' );

```
You can also subscribe for a specific instance
```javascript
car1.addEventListener( 'typeChange', function ( options ) {
	console.log( 'car1 event:' );
	console.log( options.type );
});
```

