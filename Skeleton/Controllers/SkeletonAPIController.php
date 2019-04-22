<?php

namespace Skeleton\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Storage;
use File;

class SkeletonAPIController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function templates()
    {
        return collect(glob(__DIR__ . '/../templates/*'))->reduce(function($allFiles, $path) {
            $allFiles[$this->pathToFileName($path)] = File::get($path);
            return $allFiles;
        }, collect([]));
    }

    public function build()
    {
        $files = json_decode(request()->getContent())->reviewFiles;
        $workspace = $this->getWorkspace();
        collect($files)->each(function($file) use($workspace) {
            Storage::disk('Sandbox')->put($workspace . "/" . $file->path, $file->content);
        });

        return response([
            "message" => "Successfully stored files!"
        ], 200);
    }

    private function getWorkspace() {
        $latestBuild = collect(glob(storage_path('Sandbox') . '/*'))->map(function($build) {
            return $this->pathToFileName($build);
        })->filter(function($build) {
            return preg_match('/^\d+$/', $build);
        })->map(function($build) {
            return (int) $build;
        })->sort()->last();
    
        return $latestBuild ? $latestBuild + 1 : 1;
    }
    
    private function pathToFileName($path)
    {
        return substr($path, strrpos($path, '/') + 1);
    }


}
