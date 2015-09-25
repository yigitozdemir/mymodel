var MyModel = require('./index');
var nodeUnit = require('nodeunit');

exports.ConstructorTest = function(test){
    var constructorTestModel = new MyModel();
    test.equal(constructorTestModel.tablename, null);
    test.equal(constructorTestModel.activeQuery, "");
    test.equal(constructorTestModel.activeConnection, null);
    test.equal(constructorTestModel.singular, false);
    test.equal(constructorTestModel.plural, false);
    test.ok(constructorTestModel.properties, []);

    test.done();
};

exports.extendTest = function(test){
    var extendTestModel = new MyModel();
    var connection = {con: "connection"}; //psuedo connection object
    extendTestModel.extend(connection, "myTable");

    test.equal(extendTestModel.activeConnection, connection);
    test.equal(extendTestModel.tablename, "myTable");
    test.equal(extendTestModel.activeQuery, "");
    test.done();
};


/**
 * Singular column select query test
 */
exports.findOneTest1 = function(test){
    var findOneTestModel = new MyModel();
    var connection = {con: "connection"};
    findOneTestModel.extend(connection, "myTable");
    findOneTestModel.findOne("name");

    test.equal("SELECT name FROM myTable ", findOneTestModel.activeQuery);
    test.equal(findOneTestModel.singular, true);
    test.done();
};

/**
 * Multiple column select query test
 */
exports.findOneTest2 = function(test){
    var findOneTestModel2 = new MyModel();
    var connection = {con: "connection"};
    findOneTestModel2.extend(connection, "myTable");
    findOneTestModel2.findOne("name", "mail", "password");

    test.equal("SELECT name, mail, password FROM myTable ", findOneTestModel2.activeQuery);
    test.equal(findOneTestModel2.singular, true);
    test.done();
};


/**
 * select * test
 */
exports.findStartTest = function (test) {
    var findOneStartTestModel = new MyModel();
    var connection = {con: "connection"};
    findOneStartTestModel.extend(connection, "myTable");
    findOneStartTestModel.findOne("*");

    test.equal("SELECT * FROM myTable ", findOneStartTestModel.activeQuery);
    test.equal(findOneStartTestModel.singular, true);
    test.equal(findOneStartTestModel.plural, false);
    test.done();
};

/**
 * single where, method chaining test
 */
exports.singleWhereTest = function(test){
    var singleWhereTestModel = new MyModel();
    var connection = {con: "connection"};
    singleWhereTestModel.extend(connection, "myTable");
    singleWhereTestModel.findOne("*").where("id=5");

    test.equal("SELECT * FROM myTable WHERE id=5 ", singleWhereTestModel.activeQuery);
    test.equal(singleWhereTestModel.singular, true);
    test.equal(singleWhereTestModel.plural, false);
    test.done();
};

/**
 * multiple where AND connector, method chaining
 */
exports.multipleAndleWhereTest = function(test){
    var multipleAndWhereTestModel = new MyModel();
    var connection = {con: "connection"};
    multipleAndWhereTestModel.extend(connection, "myTable");
    multipleAndWhereTestModel.findOne("*").where("id=5","AND").where("name='yiğit'");

    test.equal("SELECT * FROM myTable WHERE id=5 AND name='yiğit' ", multipleAndWhereTestModel.activeQuery);
    test.equal(multipleAndWhereTestModel.singular, true);
    test.equal(multipleAndWhereTestModel.plural, false);
    test.done();
};

/**
 * multiple where, OR connector, method chaining
 */
exports.multipleOrWhereTest = function(test){
    var multipleOrWhereTestModel = new MyModel();
    var connection = {con: "connection"};
    multipleOrWhereTestModel.extend(connection, "myTable");
    multipleOrWhereTestModel.findOne("*").where("id=5", "OR").where("name='yiğit'");

    test.equal("SELECT * FROM myTable WHERE id=5 OR name='yiğit' ", multipleOrWhereTestModel.activeQuery);
    test.equal(multipleOrWhereTestModel.singular, true);
    test.equal(multipleOrWhereTestModel.plural, false);
    test.done();
};

/**
 * orderby test
 */
exports.orderByTest = function(test){
    var orderByTestModel = new MyModel();
    var connection = {con: "connection"};
    orderByTestModel.extend(connection, "myTable");
    orderByTestModel.findOne("*").orderBy("name");

    test.equal("SELECT * FROM myTable ORDER BY 'name' ", orderByTestModel.activeQuery);
    test.done();
};

/**
 * orderby ascending test
 */
exports.orderByAscTest = function(test){
    var orderByAscTestModel = new MyModel();
    var connection = {con: "connection"};
    orderByAscTestModel.extend(connection, "myTable");
    orderByAscTestModel.findOne("*").orderBy("name").asc();

    test.equal("SELECT * FROM myTable ORDER BY 'name' ASC", orderByAscTestModel.activeQuery);
    test.done();
};

/**
 * orderby descending test
 */
exports.orderByDescTest = function(test){
    var orderByDescTestModel = new MyModel();
    var connection = {con: "connection"};
    orderByDescTestModel.extend(connection, "myTable");
    orderByDescTestModel.findOne("*").orderBy("name").desc();

    test.equal("SELECT * FROM myTable ORDER BY 'name' DESC", orderByDescTestModel.activeQuery);
    test.done();
};

/**
 * addString singular test
 */
exports.addStringTest = function(test){
    var addStringTestModel = new MyModel();
    var connection = {con: "connection"};
    addStringTestModel.extend(connection, "myTable");
    addStringTestModel.addString("name", "yiğit");
    addStringTestModel.save();

    test.equal("INSERT INTO myTable (name) VALUES ('yiğit')", addStringTestModel.activeQuery);
    test.done();
};

/**
 * addstring multiple test
 */
exports.addStringMultipleTest = function(test){
    var addStringMultipleTestModel = new MyModel();
    var connection = {con: "connection"};
    addStringMultipleTestModel.extend(connection, "myTable");
    addStringMultipleTestModel.addString("name", "yiğit");
    addStringMultipleTestModel.addString("mail", "yigitozdemir@yandex.com");
    addStringMultipleTestModel.save();

    test.equal("INSERT INTO myTable (name, mail) VALUES ('yiğit', 'yigitozdemir@yandex.com')", addStringMultipleTestModel.activeQuery);
    test.done();
};

exports.addNumberTest = function(test){
    var addNumberTestModel = new MyModel();
    var connection = {con: "connection"};
    addNumberTestModel.extend(connection, "myTable");
    addNumberTestModel.addNumber("id", 5);
    addNumberTestModel.save();

    test.equal("INSERT INTO myTable (id) VALUES (5)", addNumberTestModel.activeQuery);
    test.done();
};

exports.addNumberMultipleTest = function(test){
    var addNumberMultipleTestModel = new MyModel();
    var connection = {con: "connection"};
    addNumberMultipleTestModel.extend(connection, "myTable");
    addNumberMultipleTestModel.addNumber("id", 5);
    addNumberMultipleTestModel.addNumber("point", 25);
    addNumberMultipleTestModel.save();

    test.equal("INSERT INTO myTable (id, point) VALUES (5, 25)", addNumberMultipleTestModel.activeQuery);
    test.done();
};


exports.addMixedTest = function(test){
    var addMixedTestModel = new MyModel();
    var connection = {con: "connection"};
    addMixedTestModel.extend(connection, "myTable");
    addMixedTestModel.addString("name", "yiğit");
    addMixedTestModel.addNumber("id", 5);
    addMixedTestModel.save();

    test.equal("INSERT INTO myTable (name, id) VALUES ('yiğit', 5)", addMixedTestModel.activeQuery);
    test.done();
};
