var url = require('url');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function(app, con){

//This is the URL which we use to get all the list in our application
//http://localhost:4300/trackList/list
app.get('/trackList/list', function (req, res){
  var sql = "show tables";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
    console.log('List of Tables'+result);
  });
});

//This URL is used to create new list in the application
//http://localhost:4300/trackList/list?list=(Give the name of your new list here)
app.post('/trackList/list' , urlencodedParser, function (req, res){

  var qdata = req.query;
  var list = qdata.list;

  var sql = "CREATE TABLE"+ list +"(ID int NOT NULL AUTO_INCREMENT PRIMARY KEY, Checked VARCHAR(255) NOT NULL DEFAULT 'false', Item VARCHAR(255) NOT NULL UNIQUE, Qty VARCHAR(255) NOT NULL DEFAULT '0')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
    console.log('Tables created'+result);
  });
});

//This URL is used to delet list in the application
//http://localhost:4300/trackList/list-delete?list=(Give the name of your new list here)
app.delete('/trackList/list-delete' , urlencodedParser, function (req, res){

  var qdata = req.query;
  var list = qdata.list;

  var sql = "DROP TABLE"+list ;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
    console.log('Tables created'+result);
  });
});

//This URL is used to get all the items in the list
//http://localhost:4300/trackList/list-item?list=(Give the name of the list to get all the items in the list)
app.get('/trackList/list-item', function (req, res){
  console.log(req.query);
  var qdata = req.query;
  var list = qdata.list;
  var sql = "SELECT * FROM"+list;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
    console.log('List of Tables'+result);
  });
});

//This URL is used to add items in the list
//http://localhost:4300/trackList/list-item?list=(Give the name of the list to add new items in the list)&item=(Give the name of the new items in the list)
app.post('/trackList/list-item', function (req, res){
  console.log(req.query);
  var qdata = req.query;
  var list = qdata.list;
  var item = qdata.item;
  var sql = "INSERT INTO"+list+"(Item) VALUES ('"+ item + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
    console.log('List of Tables'+result);
  });
});

//This URL is used to change the checked status of added item in the list
//http://localhost:4300/trackList/list-item-checked?list=(Give the name of the list to change the checked status of the items in the list)&item=(Give the name of the item to change the checked status of the items in the list)&checked=(change the value of Checked to either true/false)
app.put('/trackList/list-item-checked', function (req, res){
  console.log(req.query);
  var qdata = req.query;
  var list = qdata.list;
  var item = qdata.item;
  var checked = qdata.checked;
  var sql = "UPDATE"+list+"SET checked = '"+ checked +"' WHERE Item = '"+ item +"'";
  console.log("sql Statement"+ sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
    console.log('checked value item'+result);
  });
});

//This URL is used to change the Quantity of the added item in the list
//http://localhost:4300/trackList/list-item-qty?list=(Give the name of the list to change the checked status of the items in the list)&item=(Give the name of the item to change the checked status of the items in the list)&qty=(change the value of qty)
app.put('/trackList/list-item-qty', function (req, res){
  console.log(req.query);
  var qdata = req.query;
  var list = qdata.list;
  var item = qdata.item;
  var qty = qdata.qty;
  var sql = "UPDATE"+list+"SET Qty = '"+ qty +"' WHERE Item = '"+ item +"'";
  console.log("sql Statement: "+ sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
    console.log('checked value item'+result);
  });
});

//This URL is used to Delete item in the list
//http://localhost:4300/trackList/list-item-delete?list=(Give the name of the list to delete items in the list)&item=(Give the name of the item to delete the items from the list)
app.delete('/trackList/list-item-delete', function (req, res){
  console.log(req.query);
  var qdata = req.query;
  var list = qdata.list;
  var item = qdata.item;
  var sql = "DELETE FROM" +list+ " WHERE Item = '"+ item +"'";
  console.log("sql Statement: "+ sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
    console.log('checked value item'+result);
  });
});


};
