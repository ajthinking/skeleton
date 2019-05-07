export default {
    "User": {
        "name": "User",
        "type": "UserEntity",
        "attributes": {
            "name": {
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
            "email": {
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
            "email_verified_at": {
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
            "password": {
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
            "remember_token": {
                "name": "remember_token",
                "cast": null,
                "dataType": "string",
                "fillable": false,
                "hidden": true,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            }
        },
        "relationships": {
            "hasOne": [],
            "hasMany": [
                "Car"
            ],
            "belongsTo": [],
            "belongsToMany": []
        }
    },
    "password_resets": {
        "name": "password_resets",
        "type": "TableEntity",
        "attributes": {
            "email": {
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
            "token": {
                "name": "token",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            }
        },
        "relationships": {
            "hasOne": [],
            "hasMany": [],
            "belongsTo": [],
            "belongsToMany": []
        }
    },
    "Car": {
        "name": "Car",
        "type": "ModelEntity",
        "attributes": {
            "color": {
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
            "user_id": {
                "name": "user_id",
                "cast": null,
                "dataType": "unsignedInteger",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": true,
                "unique": false,
                "foreign": "user"
            }
        },
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
    "Garage": {
        "name": "Garage",
        "type": "ModelEntity",
        "attributes": {
            "location": {
                "name": "location",
                "cast": null,
                "dataType": "string",
                "fillable": true,
                "hidden": false,
                "index": false,
                "nullable": false,
                "unique": false,
                "foreign": null
            }
        },
        "relationships": {
            "hasOne": [],
            "hasMany": [],
            "belongsTo": [],
            "belongsToMany": [
                "Car"
            ]
        }
    },
    "car_garage": {
        "name": "car_garage",
        "type": "PivotTableEntity",
        "attributes": {},
        "relationships": {
            "hasOne": [],
            "hasMany": [],
            "belongsTo": [],
            "belongsToMany": []
        }
    }
}