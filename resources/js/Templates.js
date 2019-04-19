export default {
    "User": String.raw
`<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    TEST_TOP_BLOCK

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

    TEST_MIDDLE_BLOCK

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        CASTS
    ];

    TEST_BOTTOM_BLOCK
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
    BEGGINING_BLOCK // IF EMPTY DELETE LINE+BELOW SPACING

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        FILLABLE
    ];

    MIDDLE_BLOCK // IF EMPTY DELETE ABOVE SPACING + LINE + BELOW SPACING

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        HIDDEN
    ];

    ENDING_BLOCK // IF EMPY DELETE ABOVE SPACING + LINE + BELOW SPACING
}`,
    "SOME_RELATIONSHIP": String.raw
`public function METHOD_NAME()
{
   return $this->hasMany('App\CLASS_NAME');
}`,

"MULTIPLE_RELATIONSHIPS": String.raw
`/**
* Some relationship method.
*/
public function METHOD_NAME()
{
   return $this->hasMany('App\CLASS_NAME');
}

/**
 * Some relationship method.
 */
public function SOME_OTHER_METHOD_NAME()
{
   return $this->hasManyOrSome('App\CLASS_NAME_2');
}`
}