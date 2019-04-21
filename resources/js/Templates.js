export default {
/******************************************************************* */
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
        ___CASTS___
    ];

    ___RELATIONSHIP_METHODS_BLOCK___
}`,
/******************************************************************* */
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
/******************************************************************* */
    "Model": String.raw
`<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ___CLASS_NAME___ extends Model
{
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

    ___RELATIONSHIP_METHODS_BLOCK___
}`,

"Migration": String.raw
`<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Create___TABLE___Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('___TABLE___', function (Blueprint $table) {
            ___COLUMNS_BLOCK___
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('___TABLE___');
    }
}`,
"HasManyRelationship": String.raw
`/**
 * Get the ___TARGET_CLASS_PLURAL___ for the ___THIS_CLASS___.
 */
public function ___METHOD_NAME___()
{
    return $this->hasMany('App\___TARGET_CLASS___');
}`,
"BelongsToRelationship": String.raw
`/**
 * Get the ___TARGET_CLASS___ for the ___THIS_CLASS___.
 */
public function ___METHOD_NAME___()
{
    return $this->belongsTo('App\___TARGET_CLASS___');
}`,
"BelongsToManyRelationship": String.raw
`/**
 * Get the ___TARGET_CLASS_PLURAL___ for the ___THIS_CLASS___.
 */
public function ___METHOD_NAME___()
{
    return $this->belongsToMany('App\___TARGET_CLASS___');
}`


}