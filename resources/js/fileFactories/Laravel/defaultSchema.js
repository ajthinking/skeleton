export default {
    /* Lets only add things that will not be served as expected right out of the box */
    "objectModel": {
        "User": {
            "email": {
                "unique": true,
                "fillable": true
            },
            "email_verified_at": {
                "fillable": false,
                "nullable": true,
                "cast": "datetime"
            },
            "remember_token": {
                "fillable": false
            }
        },
        "password_resets": {
            "email": {
                "index": true
            }
        }
    }
}

/* User ************************************************************************
    $table->bigIncrements('id');
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->rememberToken();
    $table->timestamps();

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];    
*/

/* password_resets
    $table->string('email')->index();
    $table->string('token');
    $table->timestamp('created_at')->nullable();
*/