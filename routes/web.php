<?php

use App\User;
use Illuminate\Support\Facades\Input;

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
    $users = User::all();
    return view('users', ['users'=>$users]);
});

Route::get('/user_notes', function(){
	// $user_id = Input::get('user_id');
	$user_id = Input::get('user_id');

	$notes = DB::table('user_notes')->select('id', 'note', 'created_on')->where('user_id', '=', $user_id)->orderBy('created_on', 'desc')->get();

	return response()->json([
		'notes' => $notes
	]);
});

Route::post('/add_user_note', function(){
	$note = trim(Input::post('note'));
	$user_id = Input::post('user_id');
	$created_by = 5; //this would be the logged in users id

	$note_id = DB::table('user_notes')->insertGetId(['note' => $note, 'user_id' => $user_id, 'created_by' => $created_by]);

	return response()->json([
		'note_id' => $note_id,
		'created_on' => DATE('Y-m-d h:i:s'),
	]);
});
