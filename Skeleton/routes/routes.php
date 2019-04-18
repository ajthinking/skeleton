<?php 

Route::get('/skeleton', function () {
    return view('skeleton::spa');
});


Route::prefix('skeleton/api')->group(function () {
    Route::get('/build', function () {
        return "Im building!!!";
    });
});