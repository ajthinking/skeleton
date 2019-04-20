<?php 

Route::get('/skeleton', function () {
    return view('skeleton::spa');
});


Route::prefix('skeleton/api')->group(function () {
    Route::post('/build', function () {
        $files = json_decode(request()->getContent())->reviewFiles;
        $workspace = getWorkspace();
        collect($files)->each(function($file) use($workspace) {
            Storage::disk('Sandbox')->put($workspace . "/" . $file->path, $file->content);
        });

        return ["OKAY"];
    });
});

function getWorkspace() {
    $latestBuild = collect(glob(storage_path('Sandbox') . '/*'))->map(function($build) {
        return substr($build, strrpos($build, '/') + 1);
    })->filter(function($build) {
        return preg_match('/^\d+$/', $build);
    })->map(function($build) {
        return (int) $build;
    })->sort()->last();

    return $latestBuild ? $latestBuild + 1 : 1;
}