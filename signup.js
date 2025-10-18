// Imports
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://sofiaalvesfigueredo_db_user:unY3CTyHldCNmCx1@gerenpoliciaes.ri9t8ag.mongodb.net/';
