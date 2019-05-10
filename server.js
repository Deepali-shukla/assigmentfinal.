/*
initial global
log on console which port
see sql on or not
create and check db existence
see table esistense and make table
all variable init at first line


/signup-> signup and redirect to generate page
/signin->check sign in and redirect to generate page
/save session
/submit
*/

var mysql=require('mysql'),qs = require('querystring'),http=require('http'),url=require('url');
var path="", sql="", formData="",con="";
con = mysql.createConnection
({//put your local uname and passwd here
  host: "localhost",
  user: "root",
  password: "123@123#"});
//testing database existence
con.connect(function(err) 
{
/*	con.query(sql, function(err, result)
	{
		if(err) throw err;
		console.log	("DB check done");	
	});//now creating DB and table if not already exists
*/	if (err) throw err;
	sql="create database if not exists lobe";
	con.query(sql);
	sql="use lobe";
	con.query(sql);
	sql="create table if not exists loginfo ( id int primary key auto_increment, email varchar(100),password varchar(100),fname varchar(100),affiliation varchar(100),role varchar(10),code float(20,15))";
	con.query(sql);
	sql="create table if not exists useranswer ( id int primary key auto_increment, email varchar(100), q1 int,q2 int,q3 int,q4 int,q5 int,q6 int)"
	con.query(sql);
	sql="create table if not exists userselect ( id int primary key auto_increment, email varchar(100), lobe varchar(20),l1 int,l3 int,l4 int)";
	con.query(sql);
	console.log	("DB check done : db and table created. \n\nServer now listening on port 8080");

}); 


http.createServer((req,res)=> { const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  };
res.writeHead(200, headers);
console.log(req.url);
var q=url.parse(req.url,true);
if(q.pathname=="/signup")
{  console.log("access signup") ; 
if (['GET', 'POST'].indexOf(req.method) > -1) {
          var requestBody = '';
      req.on('data', function(data) {
        requestBody += data;
      });
           req.on('end', function() 
      {
        formData = qs.parse(requestBody);
        console.log(formData);
sql="insert into loginfo( email,password,fname ,affiliation ,code) values (\'"+ formData.emailid+"\',\'"+ formData.password+"\',\'"+formData.name+"\',\'"+formData.affiliation+"\',"+formData.t+")";
  con.query(sql);
  console.log("signup done");
  res.end('hi '+formData.email+" "+formData.t);
	 });
}}

if(q.pathname=="/generatordashboard")
{  console.log("access generatordashboard") ; 
if (['GET', 'POST'].indexOf(req.method) > -1) {

          var requestBody = '';
      req.on('data', function(data) {
        requestBody += data;
      });
           req.on('end', function() 
      {
        formData = qs.parse(requestBody);
        console.log(formData);


sql="insert into userselect( email,lobe,l1,l3,l4) values (\'ssdf\',\'"+formData.lobe+"\',"+formData.l1+","+formData.l3+","+formData.l4+")";  
console.log(sql);
con.query(sql);
  console.log("generatordashboard done");
	 });
}}



if(q.pathname=="/generatorquestion")
{  console.log("access generatorquestion") ; 
if (['GET', 'POST'].indexOf(req.method) > -1) {

          var requestBody = '';
      req.on('data', function(data) {
        requestBody += data;
      });
           req.on('end', function() 
      {
        formData = qs.parse(requestBody);
        console.log(formData);
	sql="insert into useranswer ( email , q1 ,q2 ,q3 ,q4 ,q5 ,q6 ) values (\'ssdf\',"+formData.l1+","+formData.l2+","+formData.l3+","+formData.l4+","+formData.l5+","+formData.l6+")"
console.log(sql);
  con.query(sql);
  console.log("generatorquestion done");
	 });
}}




res.end();
}).listen(8081);