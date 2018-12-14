<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::post('/glists', 'GlistsController@store');
Route::delete('/glists/{glist}/delete', 'GlistsController@destroy');

Route::post('/glists/{glist}/task', 'TasksController@store');
Route::patch('/tasks/{task}', 'TasksController@update');
Route::delete('/tasks', 'TasksController@destroy');
