/*var cool = require("cool-ascii-faces");
var express = require("express");
var app = express();*/

var express = require("express");
var path = require("path");

var app = express();

var port = (process.env.PORT || 10000);

app.use("/", express.static(path.join(__dirname,"public")));

app.post("/info/quality-of-life", (req, res) => {
    res.send("<html><head><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style></head><body><h2>Quality of life index 2020</h2><h3>Quality of Life Index by Country 2020 we are comparing data about quality of life with purchasing power and health care index.</h3><table><tr><th>country</th><th>year</th><th>quality-of-life</th><th>purchasing-power</th><th>health-care</th> </tr><tr>td>Denmark</td><td>2020</td><td>192.67</td><td>100.88</td><td>80</td> </tr><tr><td>Switzerland</td><td>2020</td><td>192.01</td><td>119.53</td><td>72.44</td></tr><tr><td>Finland</td><td>2020</td><td>190.22</td><td>99.93</td><td>75.79</td></tr><tr><td>Australia</td><td>2020</td><td>186.21</td><td>107.31</td><td>77.38</td></tr><tr><td>Netherlands</td><td>2020</td><td>183.67</td><td>90.73</td><td>64.65</td></tr></table></body></html>");});

app.get("/info/quality-of-life", (req, res) => {
	res.send("<html><head><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style></head><body><h2>Quality of life index 2020</h2><h3>Quality of Life Index by Country 2020 we are comparing data about quality of life with purchasing power and health care index.</h3><table><tr><th>country</th><th>year</th><th>quality-of-life</th><th>purchasing-power</th><th>health-care</th> </tr><tr>td>Denmark</td><td>2020</td><td>192.67</td><td>100.88</td><td>80</td> </tr><tr><td>Switzerland</td><td>2020</td><td>192.01</td><td>119.53</td><td>72.44</td></tr><tr><td>Finland</td><td>2020</td><td>190.22</td><td>99.93</td><td>75.79</td></tr><tr><td>Australia</td><td>2020</td><td>186.21</td><td>107.31</td><td>77.38</td></tr><tr><td>Netherlands</td><td>2020</td><td>183.67</td><td>90.73</td><td>64.65</td></tr></table></body></html>");});
	
	


app.listen(port, () => {
	console.log("Server ready listening on port " + port);
})