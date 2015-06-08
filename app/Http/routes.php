<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Blade::setRawTags('[!!', '!!]');
Blade::setContentTags('[[', ']]');
Blade::setEscapedContentTags('[[[', ']]]');

Route::get('/auth', function()
{
    return view('template.base');
});

Route::get('/', function()
{
    return view('template.admin');
});
