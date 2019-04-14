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
    class Student {
        public function __construct($name, $grade) {
            $this->name = $name;
            $this->grade = $grade;
        }
    }
    
    Collection::macro('mapWithSiblings', function ($callback) {
        $keys = array_keys($this->items);
        $items = array_map(function($item, $key) use($callback) {
            $siblings = $this->items;
            unset($siblings[$key]);
            return $callback($item, collect($siblings));
        }, $this->items, $keys);
        
        return new static(array_combine($keys, $items));
    });

    
    $students = collect([
        new Student('Jeff', 3),
        new Student('Anna', 2),
        new Student('Sarah', 3),
        new Student('George', 4),
        new Student('Zorro', 4),
        new Student('Nicolas', 3),
        new Student('Withney', 4)
    ]);

    dd($students->mapWithSiblings(function($student, $siblings) {
        return $student->name . " have classmates " . $siblings->filter(function($candidate) use($student) {
            return $candidate->grade == $student->grade;
        })->map(function($item){ return $item->name; })->join(' ');
    }));

});
