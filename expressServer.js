'use strict';

import { Router } from 'express'

var express = new Router();
var app = express();

app.get('/', function(req, resp) {
    resp.send('Hello');
});

app.listen(3000, function() {
    console.log('Example');
})