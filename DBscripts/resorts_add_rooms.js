db.resorts.updateOne({}, 
{
    $set: 
    {
        "rooms":
        [
            {
                "id": 0,
                "category": "Люкс",
                "number": 
                {
                    "of_seats": 2,
                    "of_rooms": 25
                },
                "corpus": "Главный",
                "prices": 
                {
                    "usual": 20000,
                    "on_weekends": 25000,
                    "extra":
                    {
                        "adult": 1000,
                        "child": 500
                    }
                },
                "pets": true
            },
            {
                "id": 1,
                "category": "King Size",
                "number": 
                {
                    "of_seats": 1,
                    "of_rooms": 50
                },
                "corpus": "Дачный",
                "prices": 
                {
                    "usual": 15000,
                    "on_weekends": 25000,
                    "extra":
                    {
                        "adult": 1000,
                        "child": 500
                    }
                },
                "pets": false
            }
        ]
    }
});