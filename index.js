MyModel = function(){
    this.tablename = null;
    this.activeQuery = ""; //set query at a momment
    this.activeConnection = null; //this a active connection at a momment

    this.singular = false;
    this.plural = false;
    this.properties = [];
};

MyModel.prototype.extend = function(connection, tablename){
    this.activeConnection = connection;
    this.tablename = tablename;
    this.activeQuery = "";
};

/**
 * @arg 0 and more are column names
 */
MyModel.prototype.findOne = function(){
    //only one selection will done
    this.plural = false;
    this.singular = true;

    this.createColumnsQuery(arguments); //drop connection object
    return this;
};

/**
 * @arg all arguments are column names
 */
MyModel.prototype.createColumnsQuery = function() {
    var query = "SELECT ";
    for(var i = 0; i < arguments[0].length; i++){
        query += arguments[0][i];
        if(i != arguments[0].length - 1){
            query += ",";
        }
        query += " ";
    }

    query += "FROM " + this.tablename + " ";
    this.activeQuery = query;
};

/**
 * @arg all arguments are where clouses
 */
MyModel.prototype.where = function() {
    var query = this.activeQuery;
    var args = arguments;

    if(query.indexOf("WHERE") > 0 ){
        query += args[0] + " ";
    } else {
        query += "WHERE "+ args[0] + " ";
    }
    if(args.length > 1){
        //here is operators like 'and', 'or' etc
        query += args[1] + " ";
    }
    this.activeQuery = query;
    return this;
};

/**
 * @arg columnName is name of the column that table will be ordered by
 */
MyModel.prototype.orderBy = function(columnName){
    var query = this.activeQuery;
    query += "ORDER BY '" + columnName + "' ";
    this.activeQuery = query;
    return this;
};

/**
 * Sorting ascending
 */
MyModel.prototype.asc = function(){
    this.activeQuery += "ASC";
    return this;
};

/**
 * Sorting descending
 */
MyModel.prototype.desc = function(){
    this.activeQuery += "DESC";
    return this;
};

/**
 * this.activeQuery executer function
 */
MyModel.prototype.execute = function(callback){
    this.activeConnection.query(this.activeQuery, callback);
};

MyModel.prototype.save = function(){
    var protperties = this.properties;

    var columnNames = [];
    var columnValues = [];

    for(var key in this.properties){//every attribute of keys
        var keyVal = this.properties[key];
        columnNames.push(key);
        columnValues.push(keyVal);
    }
    this.buildInsertQuery(columnNames, columnValues);

    return this;
};

MyModel.prototype.buildInsertQuery = function(columnNames, columnValues){
    if(columnNames.length != columnValues.length){
        return false;
    }

    var query = "INSERT INTO " + this.tablename + " ";
    query += "(";
    for(var i = 0; i < columnNames.length; i++){
        query += columnNames[i];
        if(i != columnNames.length - 1){
            query += ",";
            query += " ";
        }
    }
    query += ") VALUES (";
    for(i = 0; i < columnValues.length; i++){
        query += columnValues[i];
        if(i != columnValues.length - 1){
            query += ",";
            query += " ";
        }
    }
    query += ")";

    this.activeQuery = query;
};


MyModel.prototype.addString = function(propertyKey, propertyValue){
    this.properties[propertyKey] = "'" + propertyValue.toString() + "'";
    return this;
};

MyModel.prototype.addNumber = function(propertyKey, propertyValue){
    if(!isNaN(parseFloat(propertyValue)) && isFinite(propertyValue)){
        this.properties[propertyKey] = propertyValue;
    }
    return this;
};

module.exports = MyModel;
