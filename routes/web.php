<?php

use Illuminate\Support\Collection;

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


Route::get('/test', function () {
    
    Collection::macro('mapWithRemaining', function ($callback) {
        $keys = array_keys($this->items);
        $items = array_map(function($item, $key) use($callback) {
            $remaining = $this->items;
            unset($remaining[$key]);
            return $callback($item, collect($remaining));
        }, $this->items, $keys);

        return new static(array_combine($keys, $items));
    });

    class Student {
        public function __construct($name) {
            $this->name = $name;
        }
    }    

    $students = collect([
        new Student('Anna'),
        new Student('Jeff'),
        new Student('Sarah'),
        new Student('George'),
    ]);

    dd($students->mapWithRemaining(function($student, $otherStudents) {
        $student->classMates = $otherStudents;
        return $student;
    }));
    
});
