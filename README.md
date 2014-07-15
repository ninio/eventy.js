eventy.js
=========

Simple library for enhancing regular JS objects with event interface. No jQuery and no DOM.
To event enable the type you've just created simply use `eventy.eventEnable( YourObject );`
Let's say you are implementing a car
```
function Car( type ) {
  this.type = type;
}
```
To enable it's events just type
```
eventy.eventEnable( Car );
```
Next you can trigger any event
```
Car.prototype.setType = function ( newType ) {
  if( newType !== this.type ) {
    this.type = newType;
    Car.triggerEvent( 'typeChange', { type: newType } );
  }
};
```
And you can handle any event
```
Car.addEventListener( 'typeChange', function( options ) {
  console.log( options.type );
  console.log( this );
});
```
Just to make sure it works:
```
var car1 = new Car( 'sedan' ),
  car2 = new Car( 'truck' );
  
car1.setType( 'truck' );
car2.setType( 'cabrio' );

```
