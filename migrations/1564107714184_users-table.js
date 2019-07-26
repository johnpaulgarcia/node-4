exports.shorthands = undefined;

exports.up = (pgm) => {
   pgm.createTable('users',{
  	id: {type: 'serial',primaryKey: true},
 	username: {type: 'text'},
	email: {type: 'text'},
	password: {type: 'text'}, 
  })
};

exports.down = (pgm) => {

};
