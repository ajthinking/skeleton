export default {
    "User": String.raw
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
        FILLABLE
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        HIDDEN
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        CASTS
    ];
    RELATIONSHIP_METHODS_BLOCK
}`,
    "Controller": String.raw
`<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}`,

    "Model": String.raw
`<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MODEL extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        FILLABLE
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        HIDDEN
    ];
    RELATIONSHIP_METHODS_BLOCK
}`,
    "SOME_RELATIONSHIP": String.raw
`public function METHOD_NAME()
{
   return $this->hasMany('App\CLASS_NAME');
}`
}