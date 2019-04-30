<?php 

Route::view('/skeleton', 'skeleton::spa');

Route::prefix('skeleton/api')->group(function () {
    Route::get('/templates', '\Skeleton\Controllers\SkeletonAPIController@templates');
    Route::post('/build',    '\Skeleton\Controllers\SkeletonAPIController@build');
});