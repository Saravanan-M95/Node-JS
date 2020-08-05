/*

Use "http://localhost:3000/" POST method to add the JSON data and use "http://localhost:3000/" GET Method to substitute the {REF_*} values
Tool : Postman
*/

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

var out = [
];

app.get('/', function(req,res)
{
	
	res.send(out);
});

app.post('/', function(req,res)
{
	var input = req.body;

	var myJSON = JSON.stringify(input);

	var REF_MSISDN=req.body.referenceData.REF_MSISDN;
	var REF_IMSI=req.body.referenceData.REF_IMSI;
	var REF_SERVPROFID=req.body.referenceData.REF_SERVPROFID;

	var mapObj = 
	{
   		'{REF_IMSI}':REF_IMSI,
  		'{REF_MSISDN}':REF_MSISDN,
   		'{REF_SERVPROFID}':REF_SERVPROFID
	};

	myJSON = myJSON.replace(/{REF_IMSI}|{REF_MSISDN}|{REF_SERVPROFID}/gi, function(matched){
  		return mapObj[matched];
	});
		
	input=JSON.parse(myJSON);
	
	if(!input || input.text ==="")
	{
		response.status(500).send({error: "Empty Value"});
	}
	else
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

