"use strict"
// Nombre de tablas.
var TABLE_USERS = 'users';
var TABLE_POSTS = 'posts';
var TABLE_COMMENTS = 'comments';

// Inicializa la base de datos.
var db = openDatabase('blogDB', '1.0', 'DB for HTML5', 2 * 1024 * 1024);

if(!db){
    alert("No se creo tu base de datos");
    //return false;
}/*else{
    alert("se creo");
}*/

// Se crean las tablas en la base de datos si no existen.
(function createTables(){

    db.transaction(function (tx) {
    	//tx.executeSql('DROP TABLE IF EXISTS users');
    	tx.executeSql('CREATE TABLE IF NOT EXISTS '+TABLE_USERS+' ('+
			'id INTEGER PRIMARY KEY AUTOINCREMENT,'+
			'userName VARCHAR(30) NOT NULL UNIQUE,'+
			'password VARCHAR(30) NOT NULL,'+
            'name VARCHAR(30) NOT NULL,'+
            'lastName VARCHAR(30) NOT NULL,'+
            'email VARCHAR(60) NOT NULL)'
		);
    });             
})();

// Obtiene un usuario de la base de datos.
function getUser(userName, callback, failCallback){
    db.readTransaction(function (tx) {
        tx.executeSql("SELECT * FROM "+TABLE_USERS+" WHERE userName=?", [userName], callback, failCallback);
    });     
}

// Crea un nuevo usuario en la base de datos.
function addUser(userName, password, name, lastName, email, callback, failCallback){
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO "+TABLE_USERS+" (userName, password, name, lastName, email) VALUES (?,?,?,?,?)", [userName,password,name,lastName,email], callback, failCallback);
    });     
}