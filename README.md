# MyModel is Mysql Models for NodeJs

## Usage

### Selection
    var mysql = require('mysql');
    var model = new MyModel();    
    model.extend(connection, "movies"); //mysql connection and table name
    model.findOne("name", "id", "julien"); //which columns will be selected
    model.where("id = 3", "OR"); //first criteria
    model.where("name = 'slience'"); //second criteria
    model.execute(function(err, rows, field){
        console.log(rows);
    });

### Insertation

    var insertmodel = new MyModel();
    insertmodel.extend(connection, "movies");
    insertmodel.setProperty("name", "yigit"); //property with column name to insert
    insertmodel.setProperty("password", 123456); //property with column name to insert
    insertmodel.save();
    insertmodel.execute(function(err, rows, fields){
        if(!err){
            console.log("inserted");
        }
    });



## Running test
Running unit tests is easy as:

    nodeunit test.js


### TODO

* Multiple Selection Feature
* Update
* Relations
