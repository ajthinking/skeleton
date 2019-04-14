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
        Collection::macro('mapWithSiblings', function ($callback) {
            $keys = array_keys($this->items);
            $items = array_map(function($item, $key) use($callback) {
                $siblings = $this->items;
                unset($siblings[$key]);
                return $callback($item, collect($siblings));
            }, $this->items, $keys);
            
            return new static(array_combine($keys, $items));
        });
    }
}
