<?php 

Route::view('/skeleton', 'skeleton::spa');

Route::prefix('skeleton/api')->group(function () {
    // MINIMAL IMPLEMENTATION ********************************************************
    Route::get('/templates', '\Skeleton\Controllers\SkeletonAPIController@templates');
    Route::post('/build',    '\Skeleton\Controllers\SkeletonAPIController@build');

    // EXTRA STUFF *******************************************************************
    Route::prefix('actions')->group(function () {
        Route::get('cleanup-old-migrations');
        Route::get('migrate');
        Route::get('seed');
        Route::get('undo');
        Route::get('redo');
    });
});


/*
// A User sends it first build request
    // We loop through all the files to be written
    // For each file we save the current content before
    // Note the null values for nonexisting files
    // That allows us to rollback newly created files if needed

const HISTORY_STACK = [
    [
        "app/User.php" => "The original content",
        "app/Elephaant.php" => null
    ]
];
*/