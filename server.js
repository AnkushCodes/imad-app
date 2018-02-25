var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config={
    user:'ankushkanchar07',
    db:'ankushkanchar07',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
}
 

var app = express();
app.use(morgan('combined'));

var articles={ 
      'article-one':{
            title:'Article One | Ankush Kanchar',
            heading:'Article One',
            date:'jan 2018',
            content:` 
              <p>
                This is content for my first article. This is the content of my article.
                This is content for my first article. This is the content of my article.
                This is content for my first article. This is the content of my article.
              </p>

              <p>
                This is content for my first article. This is the content of my article.
                This is content for my first article. This is the content of my article.
                This is content for my first article. This is the content of my article.
              </p>

              <p>
                This is content for my first article. This is the content of my article.
                This is content for my first article. This is the content of my article.
                This is content for my first article. This is the content of my article.
              </p>` 
       },
      
      'article-two':{
        title:'Article Second | Ankush Kanchar',
        heading:'Article Second',
        date:'jan 2018',
        content:` 
          <p>
            This is content for my second article. This is the content of my article.
          </p>`

      },
      'article-three':{
        title:'Article three | Ankush Kanchar',
        heading:'Article Three',
        date:'jan 2018',
        content:` 
          <p>
            This is content for my Third article. This is the content of my article.
          </p>`
      }
    };
   

 function createTemplate(data){

      var title=data.title;
      var date=data.date;
      var heading=data.heading;
      var content=data.content;

    var htmlTemplate=`<html>
    <head>
        <title>
            ${title}
        </title>
        
        <meta name-"viewport" content="width-device-width , initial-scale=1">
    
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    
    <body>
        <div class="container">
            <div>
                <a href="/">home</a>
            </div>
            <hr/>
    
            <h3>
                ${heading}
            </h3>
    
            <div>
                ${date}
            </div>
    
            <div>
                ${content}
            </div>
        </div>
    </body>
    </html>`;
    return htmlTemplate;
  }




app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var pool=new Pool(config);

app.get('/test-db',function(req,res){
    
pool.query('SELECT * FROM test', function(err,result){
  if(err){
      res.status(500).send(err.toString());
  } else{
      res.send(JSON.stringify(result.rows));
  }
});    
});





var counter=0;

app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/articles/:articleName',function(req,res){
   
    pool.query("SELECT * FROM article WHERE title='"+req.params.articleName+"'",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
          if(result.row.length === 0){
                     res.status(404).send('result not found');
             }else{
                    var articleData=result.rows[0];
                    res.send(createTemplate(articleData));
          }
        }
    })
 
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});