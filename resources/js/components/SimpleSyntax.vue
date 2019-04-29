<template>
    <div>
        <pre v-highlightjs><code class="javascript">// Static source code
function(test) { 
    console.log(test)
}</code></pre>
    </div>
</template>

<script>
export default {
    computed: {
        activeFileContent() {
            return (
`<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        ___FILLABLE___
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        ___HIDDEN___
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        ___CASTS_BLOCK___
    ];

    ___RELATIONSHIP_METHODS_BLOCK___
}`)
        }
    }


}
</script>