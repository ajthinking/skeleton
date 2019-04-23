<?php

namespace Skeleton;

use stdClass;
use Storage;

class ProjectFileManager {
    /*********** PUBLIC API ************************************************** */    
    public function __construct($workspace)
    {
        $this->isSandboxed = false;
        $this->workspace = $workspace;
        $this->history = new stdClass();
    }

    public function write($files)
    {
        $this->recordCurrentStateFor($files);
    }

    public function delete($files)
    {
        $this->recordCurrentStateFor($files);
    }    

    public function reverseHistory()
    {
        // typically used before running to ensure no previous files are left behind
        $history = Storage::disk('skeleton')->load('history.json');
    }

    public function persistHistory()
    {
        Storage::disk('skeleton')->put(
            'history.json',
            json_encode($this->history)
        );
    }
    
    public function setupSandboxProject()
    {
        // copy laravel-including-vendors
    }

    /*********** PRIVATE ************************************************** */
    
    private function storage()
    {
        return Storage::disk(
            $this->isSandboxed ? 'skeleton.sandbox' : 'self'
        );
    }

    private function recordCurrentStateFor($files)
    {
        $files->each(function($file) {
            $this->history[$file->path] = 
                Storage::disk('skeleton.sandbox')->has($this->workspace . '/' . $file->path) ?
                Storage::disk('skeleton.sandbox')->get($this->workspace . '/' . $file->path) :
                null;
        });
    }
}