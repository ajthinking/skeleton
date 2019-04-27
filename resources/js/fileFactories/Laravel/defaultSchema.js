export default {
    /* Lets only add things that will not be served as expected right out of the box */
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
            "fillable": false,
            "nullable": true
        }
    },
    "password_resets": {
        "email": {
            "index": true
        },
        "id": false,
        "updated_at": false
    }
}