"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const accessTokenSecret = process_1.env.ACCESS_TOKEN_SECRET;
