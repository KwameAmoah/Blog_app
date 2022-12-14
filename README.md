# Blog_app
this api allows for you to create, delete, patch,view all blog and view blogs by id. its needs you to signup and signin. you can view all bogs wihtout signing in but you need to sign in to delete, create, patch blogs. 

# Pizza App
This is an api for a blog app

---

## Requirements
1. User should be able to register 
2. User should be able to login with Passport using JWT
3. Implement auth
4. User should be able to get blogs
5. Users should be able to create blogs
6. Users should be able to update and delete blogs
7. Test application
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with local server if you like
- run `nodemon`

---
## Base URL
- somehostsite.com


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  firstname | string  |  required|
|  lastname  |  string |  required  |
|  email     | string  |  required |
|  password |   string |  required  |
|  confirm password |  string |  required |
|  contact |   number | 



### Order
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  created_at |  date |  required |
|  state | number  |  required,default:1|
|  total_price  |  number |  required  |
|  items     | array  |  required |
|  item.name |   string |  required  |
|  item.price |  number |  required |
|  item.size |  string |  required, enum: ['m', 's', 'l'] |
|  item.quantity |  number |  required, enum: ['m', 's', 'l'] |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "confirm password": "Password1",
  "firstname": "jon",
  "lastname": "doe",
  "contact": '025671568",
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",
        "contact": '025671568",
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "Password1",
    "email": "doe@example.com",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}
```

---
### Create blog

- Route: /orders
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    title: the game,
    body: as it be what it will be,
    tag: sports,

}
```

- Responses

Success
```
{
   title: the game,
    body: as it be what it will be,
    tag: sports,
}
```
---
### Get blog

- Route: /blogId/getBlogById
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
  title: the game,
    body: as it be what it will be,
    tag: sports,
}
```
---

### Get all blogs

- Route: /getAllBlogs
- Method: GET
- Header:
    - Authorization: Bearer {token}
- Query params: 
 
        created_at, 
        state ={"published" : "draft"}, 
        order = 'asc', 
        read_count = 'created_at',
        reading_time = 'read_at', 
        timestamp = 'time_at', 
        page = 1, 
        per_page = 20

- Responses

Success
```
{ 
        created_at, 
        state ={"published" : "draft"}, 
        order = 'asc', 
        read_count = 'created_at',
        reading_time = 'read_at', 
        timestamp = 'time_at', 
        page = 1, 
        per_page = 20
    }
```
---

...

## Contributor
- Kwame Amoah