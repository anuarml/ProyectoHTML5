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
        
        //tx.executeSql('DROP TABLE '+TABLE_USERS);
    	tx.executeSql('CREATE TABLE IF NOT EXISTS '+TABLE_USERS+' ('+
			'id INTEGER PRIMARY KEY AUTOINCREMENT,'+
			'userName VARCHAR(30) NOT NULL UNIQUE,'+
			'password VARCHAR(30) NOT NULL,'+
            'name VARCHAR(30) NOT NULL,'+
            'lastName VARCHAR(30) NOT NULL,'+
            'email VARCHAR(60) NOT NULL)'
		);
        //tx.executeSql('DROP TABLE '+TABLE_POSTS);
        tx.executeSql('CREATE TABLE IF NOT EXISTS '+TABLE_POSTS+' ('+
            'id INTEGER PRIMARY KEY AUTOINCREMENT,'+
            'title VARCHAR(30) NOT NULL UNIQUE,'+
            'description VARCHAR(300) NOT NULL,'+
            'teaser VARCHAR(150) NOT NULL,'+
            'vidLink VARCHAR(100) NOT NULL,'+
            'imgLink VARCHAR(100) NOT NULL,'+
            'tag VARCHAR(30) NOT NULL,'+
            'date DATETIME NOT NULL DEFAULT (datetime(\'now\',\'localtime\')))'
        );

        //tx.executeSql('DROP TABLE '+TABLE_COMMENTS);
        tx.executeSql('CREATE TABLE IF NOT EXISTS '+TABLE_COMMENTS+' ('+
            'id INTEGER PRIMARY KEY AUTOINCREMENT,'+
            'idPost INTEGER NOT NULL,'+
            'name VARCHAR(30) NOT NULL,'+
            'email VARCHAR(100) NOT NULL,'+
            'comment VARCHAR(250) NOT NULL,'+
            'date DATETIME NOT NULL DEFAULT (datetime(\'now\',\'localtime\')))'
        );

    });            
})();

// Obtiene un usuario de la base de datos.
function getUser(userName, callback, failCallback){
    db.readTransaction(function (tx) {
        tx.executeSql("SELECT * FROM "+TABLE_USERS+" WHERE userName=?", [userName], callback, failCallback);
    });     
}

// Agrega un nuevo usuario en la base de datos.
function addUser(userName, password, name, lastName, email, callback, failCallback){
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO "+TABLE_USERS+" (userName, password, name, lastName, email) VALUES (?,?,?,?,?)", [userName,password,name,lastName,email], callback, failCallback);
    });     
}

// Obtiene un post de la base de datos de acuerdo al titulo.
function getPost(title, callback, failCallback){
    db.readTransaction(function (tx) {
        tx.executeSql("SELECT * FROM "+TABLE_POSTS+" WHERE title=?", [title], callback, failCallback);
    });     
}

// Obtiene un post de la base de datos de acuerdo al id.
function getPostById(id, callback, failCallback){
    db.readTransaction(function (tx) {
        tx.executeSql("SELECT * FROM "+TABLE_POSTS+" WHERE id=?", [id], callback, failCallback);
    });     
}

//Obtiene todos los posts de la base de datos
function getPosts(callback, failCallback){
    db.readTransaction(function (tx) {
        tx.executeSql("SELECT * FROM "+TABLE_POSTS +" ORDER BY date DESC", [], callback, failCallback);
    });
}

//Obtiene todos los posts de la base de datos de forma ascendente
function getPostsASC(callback, failCallback){
    db.readTransaction(function (tx) {
        tx.executeSql("SELECT * FROM "+TABLE_POSTS +" ORDER BY date ASC LIMIT 5", [], callback, failCallback);
    });
}

//Obtiene todos los posts de la base de datos de acuerdo a la busqueda
function getSearchedPosts(searched, callback, failCallback){
    db.readTransaction(function (tx) {
        tx.executeSql("SELECT * FROM "+TABLE_POSTS +" WHERE title LIKE ? OR tag LIKE ?", ['%'+searched+'%','%'+searched+'%'], callback, failCallback);
    });
}

// Agrega un nuevo post en la base de datos.
function addPost(title, description, teaser, vidLink, imgLink, tag, callback, failCallback){
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO "+TABLE_POSTS+" (title, description, teaser, vidLink, imgLink, tag) VALUES (?,?,?,?,?,?)", [title, description, teaser, vidLink, imgLink, tag], callback, failCallback);
    });     
}

// Obtiene los comentarios de un post de la base de datos.
function getComments(idPost, callback, failCallback){
    db.readTransaction(function (tx) {
        tx.executeSql("SELECT * FROM "+TABLE_COMMENTS+" WHERE idPost=?", [idPost], callback, failCallback);
    });     
}

// Agrega un nuevo comentario al post en la base de datos.
function addComment(idPost, name, email, comment, callback, failCallback){
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO "+TABLE_COMMENTS+" (idPost, name, email, comment) VALUES (?,?,?,?)", [idPost, name, email, comment], callback, failCallback);
    });     
}

