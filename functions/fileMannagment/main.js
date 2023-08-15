"use strict";

import { convert_file_to_json } from '../fileMannagment/functions/convertFiles.js';
import { postFile } from '../fileMannagment/functions/postFiles.js';

const input = document.getElementById("input");
const sendBtn = document.getElementById("btn");

input.addEventListener("change", convert_file_to_json);
sendBtn.addEventListener("click", postFile);