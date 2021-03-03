db.resorts.updateOne({}, 
{
    $set:
    {
        "images":
        [
            {
                id: 0,
                src: "https://avatars.yandex.net/get-music-content/97284/a2020179.a.298667-2/m1000x1000?webp=false"
            },
            {
                id: 1,
                src: "https://avatars.yandex.net/get-music-content/38044/bacf2020.a.1850697-1/m1000x1000?webp=false"    
            }
        ]
    }
})