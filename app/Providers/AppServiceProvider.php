<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Collection;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->addCollectionMacros();
    }

    /**
     * Add useful collection macros.
     *
     * @return void
     */    
    private function addCollectionMacros()
    {
        // add stuff here later
    }
}
