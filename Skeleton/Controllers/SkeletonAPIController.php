<?php

namespace Skeleton\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Storage;
use File;
use Skeleton\ProjectFileManager;

class SkeletonAPIController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function templates()
    {
        return $this->getTemplates();
    }

    public function build()
    {
        // Setup sandboxed or regular project
        $this->setupProjectEnvironment();

        // Reverse the previous iteration
        // This is to remove previous mistakes and timestamp conflicts
        $this->project->reverseHistory();

        // Write the files generated
        $this->project->write($this->jsonParameter("reviewFiles"));

        // We wont need them
        $this->deleteDefaultMigrations();

        // Save the changes we made
        $this->project->persistHistory();

        return response([
            "message" => "Successfully stored files!"
        ], 200);
    }

    private function jsonParameter($name)
    {
        return json_decode(request()->getContent())->$name;
    }

    private function setupProjectEnvironment()
    {
        $this->project = ProjectFileManager::make(
            $this->jsonParameter("isSandboxed")
        );
    }

    private function deleteDefaultMigrations() {
        $this->project->delete(json_decode(`
            [
                {
                    "path": "database/migrations/2014_10_12_000000_create_users_table.php"
                },
                {
                    "path": "database/migrations/2014_10_12_100000_create_password_resets_table.php"
                }
            ]
        `));
    }

    private function getWorkspace() {
        $latestBuild = collect(glob(storage_path('skeleton.sandbox') . '/*'))->map(function($build) {
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

    private function getTemplates()
    {
        return collect(glob(__DIR__ . '/../templates/*'))->reduce(function($allFiles, $path) {
            $allFiles[$this->pathToFileName($path)] = File::get($path);
            return $allFiles;
        }, collect([]));
    }
}
