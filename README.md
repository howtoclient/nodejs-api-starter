## API doc
Node Parameters
```

    NODE_ENV= "dev" or "prod"                                   //server mode ( dev for debug )
    ALLOWED_DOMAINS= "http://localhost:3000,http://127.0.0.1"   //list of allowed web referes separated by ','
    PORT= 8888                                                  //Port to start the server on
```

## API Contents

- [**API Response Structure**](api-response-structure)
- [**Authorization**](authorization)

- [**POST** - /login](post-login-api) - simple login api
- [**GET** - /user](get-user-api) - get user data
    - [**POST** - /user/tokens](post-user-tokens-api) - set user token ids
    - [**GET** - /user/tokens](get-user-tokens-api) - get user token ids
- [**GET** - /user/tokens](get-tokens-info-api) - get all available tokens info
- [**POST** - /tokens-info](post-tokens-info-api) - get specific tokens info
- [**ANY METHOD** - /error](any-error-api) - just throws 500 errors

---

### API Response Structure
if `NODE_ENV` is set to 'dev' it will show the message and error body ( for development ).

- ``success`` - is response a success or not
- ``status`` - Response status code.
- ``data`` - response data
- ``error`` - error object
- ``error - errorId`` - contains Automatically Generated ErrorID
- ``error - message`` - Message to the client about the error ( 404,401,500 and 403 will return static message unless in development mode)

#### Success example
```
{
    "status": 200,
    "data": [
        {
            "tokenId": 1
        },
        {
            "tokenId": 2
        },
        {
            "tokenId": 3
        }
    ],
    "error": null,
    "success": true
}
```

#### Error Example
```
{
    "status": 401,
    "data": null,
    "error": {
        "errorId": "00c6e776-f8f2-45d3-978f-d2e948d5e32f",
        "message": "Unauthorized",
        "body": [ ... ]
    },
    "success": false
}
```
---

### Authorization

First login using the [login api](post-login-api). You will recieve a token.
```
{
    "status": 200,
    "data": {
        "username": "blox-user",
        "name": "blox.io",
        "token": "27bade39-c5ec-4249-b858-7e6dca65f0e1"
    },
    "error": null,
    "success": true
}
```

Add **"Authorization"** Header containing that token to every request to authorize the user.
```
POST /login HTTP/1.1
Host: localhost:8888
Content-Type: application/json
Authorization: 27bade39-c5ec-4249-b858-7e6dca65f0e1
Cache-Control: no-cache
```

---


### Post Login API
Authorize the user and get the access token:

Request body:
```
{
	"username": "blox-user",        //String
	"password": "blox-rocks"        //String
}
```

Returns Current user data.
Response body:
```
{
    "status": 200,                                          //Int
    "data": {
        "username": "blox-user",                            //String
        "name": "blox.io",                                  //String - Users Title/Name
        "token": "27bade39-c5ec-4249-b858-7e6dca65f0e1"     //String - Access Token
    },
    "error": null,                                          //Null OR Error Object
    "success": true                                         //Bool
}
```

---

### Get User API
Returns Current user data.
Response body:
```
{
    "status": 200,                                          //Int
    "data": {
        "username": "blox-user",                            //String
        "name": "blox.io",                                  //String - Users Title/Name
        "token": "27bade39-c5ec-4249-b858-7e6dca65f0e1"     //String - Access Token
    },
    "error": null,                                          //Null OR Error Object
    "success": true                                         //Bool
}
```

---

### GET User Tokens API
Get user watchlist token Ids.
Returns user watchlist tokens.

Response body:
```
{
    "status": 200,                                          //Int
    "data": [                                               //Array of Objects
           {
               "tokenId": 1
           },
           {
               "tokenId": 2
           },
           {
               "tokenId": 3
           }
       ],
    "error": null,                                          //Null OR Error Object
    "success": true                                         //Bool
}
```

---

### Post User Tokens API
Set watchlist token ids for current user.
This will overwrite the current watchlist with the sent Token Ids.

Request body:
```
{
	"tokenIds": [           //Array of Ints
	    1,
	    2,
	    3
	]
}
```

Returns user watchlist tokens.
Response body:
```
{
    "status": 200,                                          //Int
    "data": [                                               //Array of Objects
           {
               "tokenId": 1
           },
           {
               "tokenId": 2
           },
           {
               "tokenId": 3
           }
       ],
    "error": null,                                          //Null OR Error Object
    "success": true                                         //Bool
}
```

---

### GET Tokens Info API
Returns list of all available tokens and their data

Returns tokens info list
Response body:
```
{
    "status": 200,                                          //Int
    "data": [                                               //Array of Objects
       {
            "tokenId": 1,                                           //Int - token id
            "name": "Bitcoin",                                      //String - Token Name
            "symbol": "BTC",                                        //String - Token Symbol
            "rank": 1,                                              //Int - Token Rank
            "price": 6648.45,                                       //Float - Token USD Price
            "percentChange1h": 0.21,                                //Float - Token Price Change %
            "percentChange24h": 0.59,                               //Float - Token Price Change %
            "percentChange7d": 11.58,                               //Float - Token Price Change %
            "icon": "https://resources.blox.io/icons/bitcoin.png"   //String - Token Icon Location
        },
        {..},
        ...
       ],
    "error": null,                                          //Null OR Error Object
    "success": true                                         //Bool
}
```

---

### POST Tokens Info API
Returns list of requestd tokens by id and their data

Request body:
```
{
	"tokenIds": [           //Array of Ints
	    1,
	    2,
	]
}
```

Returns tokens info list
Response body:
```
{
    "status": 200,                                          //Int
    "data": [                                               //Array of Objects
              {
                  "tokenId": 1,                                           //Int - token id
                  "name": "Bitcoin",                                      //String - Token Name
                  "symbol": "BTC",                                        //String - Token Symbol
                  "rank": 1,                                              //Int - Token Rank
                  "price": 6648.45,                                       //Float - Token USD Price
                  "percentChange1h": 0.21,                                //Float - Token Price Change %
                  "percentChange24h": 0.59,                               //Float - Token Price Change %
                  "percentChange7d": 11.58,                               //Float - Token Price Change %
                  "icon": "https://resources.blox.io/icons/bitcoin.png"   //String - Token Icon Location
              },
              {
                   "tokenId": 1,                                           //Int - token id
                   "name": "Bitcoin",                                      //String - Token Name
                   "symbol": "BTC",                                        //String - Token Symbol
                   "rank": 1,                                              //Int - Token Rank
                   "price": 6648.45,                                       //Float - Token USD Price
                   "percentChange1h": 0.21,                                //Float - Token Price Change %
                   "percentChange24h": 0.59,                               //Float - Token Price Change %
                   "percentChange7d": 11.58,                               //Float - Token Price Change %
                   "icon": "https://resources.blox.io/icons/bitcoin.png"   //String - Token Icon Location
              }
       ],
    "error": null,                                          //Null OR Error Object
    "success": true                                         //Bool
}
```

---


### ANY error API
Always throws 500 error, used for making error handling.

Response body:
#### Error Example
```
{
    "status": 500,                                                          //Int - status code
    "data": null,                                                           //Null - error shouldnt contain data
    "error": {                                                              //Obj - Error Object
        "errorId": "520093d1-28df-4ee1-8a07-a7219057f70b",                  //String - error id also writtent to logs
        "message": "This is an error api. Always throws stuff at you...",   //String - error message
        "body": [..]                                                        //Array Of String - when in dev error stack
    },
    "success": false                                                        //Bool
}
```
---