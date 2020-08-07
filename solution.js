/*

Use "http://localhost:3000/" POST method to add the JSON data and use "http://localhost:3000/" GET Method to substitute the {REF_*} values
Tool : Postman
*/

var express = require('express');

const replaceString = require('replace-string');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function(req,res)
{
	res.send(out);
});

app.post('/', function(req,res)
{
	var input = req.body;

	var ref=(input.referenceData);

	var myJSON = JSON.stringify(input.payload);

	var mapDict = new Map();
	
	for(x in ref)
	{
		mapDict.set(x,ref[x]);
	}

	var itr=mapDict.keys();

	for(var a=0;a<mapDict.size;a++)
	{
		const key=itr.next().value;
		console.log(key +'   '+mapDict.get(key));
		myJSON = replaceString(myJSON, '{'+key+'}', mapDict.get(key));
	}

	input=JSON.parse(myJSON);
	
	if(input)
	{
		delete input['referenceData'];	
		out.push(input);
		res.status(200).send(input);
	}
});

app.listen(3000, function()
{
	console.log('Server Starts');
});

