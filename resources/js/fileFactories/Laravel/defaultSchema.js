export default [
    {
        "name": "User",
        "type": "UserEntity",
        "attributes": [
            {
                "name": "id",
                "cast": null,
                "dataType": "bigIncrements",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "name",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "email",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "email_verified_at",
                "cast": "datetime",
                "dataType": "timestamp",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "password",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": true,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "remember_token",
                "cast": null,
                "dataType": "string",
                "fillable": false,
                "hidden": true,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "created_at",
                "cast": null,
                "dataType": "timestamp",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "updated_at",
                "cast": null,
                "dataType": "timestamp",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            }
        ],
        "relationships": {
            "hasOne": [],
            "hasMany": [
                "Car"
            ],
            "belongsTo": [],
            "belongsToMany": []
        }
    },
    {
        "name": "password_resets",
        "type": "TableEntity",
        "attributes": [
            {
                "name": "id",
                "cast": null,
                "dataType": "bigIncrements",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "email",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "token",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "created_at",
                "cast": null,
                "dataType": "timestamp",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "updated_at",
                "cast": null,
                "dataType": "timestamp",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            }
        ],
        "relationships": {
            "hasOne": [],
            "hasMany": [],
            "belongsTo": [],
            "belongsToMany": []
        }
    },
    {
        "name": "Car",
        "type": "ModelEntity",
        "attributes": [
            {
                "name": "id",
                "cast": null,
                "dataType": "bigIncrements",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "color",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "user_id",
                "cast": null,
                "dataType": "unsignedInteger",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": true,
                "unique": false,
                "foreign": "user"
            },
            {
                "name": "created_at",
                "cast": null,
                "dataType": "timestamp",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "updated_at",
                "cast": null,
                "dataType": "timestamp",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            }
        ],
        "relationships": {
            "hasOne": [],
            "hasMany": [],
            "belongsTo": [
                "User"
            ],
            "belongsToMany": [
                "Garage"
            ]
        }
    },
    {
        "name": "Garage",
        "type": "ModelEntity",
        "attributes": [
            {
                "name": "id",
                "cast": null,
                "dataType": "bigIncrements",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "location",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "created_at",
                "cast": null,
                "dataType": "timestamp",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "updated_at",
                "cast": null,
                "dataType": "timestamp",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            }
        ],
        "relationships": {
            "hasOne": [],
            "hasMany": [],
            "belongsTo": [],
            "belongsToMany": [
                "Car"
            ]
        }
    },
    {
        "name": "car_garage",
        "type": "PivotTableEntity",
        "attributes": [
            {
                "name": "id",
                "cast": null,
                "dataType": "bigIncrements",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "created_at",
                "cast": null,
                "dataType": "timestamp",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            },
            {
                "name": "updated_at",
                "cast": null,
                "dataType": "timestamp",
                "fillable": false,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            }
        ],
        "relationships": {
            "hasOne": [],
            "hasMany": [],
            "belongsTo": [],
            "belongsToMany": []
        }
    }
]