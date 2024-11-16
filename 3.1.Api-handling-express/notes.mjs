/*

 -------> middleware-see notions note for more details <--------
note=> If you creating a middleware and you want that middleware to be applied in all type of request, define and use it before all route handler function.
>> In order to use middleware,apply use method from app object. 

--------> Custom middleware <---------
>> In case of Custom middleware always need to call next() method end of the function.
>> In custom middleware when we use the middleware in use method we simply pass the method not calling it. ex:- app.use(logger);
>> But when we use third party middleware we call it inside use method.because in this case function itself not a middleware, it returns the middleware when we call it inside use method. 


--------> GET : /api/v1/movies/:id <---------
<------- Route parameter -------->
>> Here id is a Route parameter => Route parameter are named URL segments that are used to capture the values spesified at their position in the URL
>> api/v1/movies/:id  => /api/v1/movies/4  => id=4
>> All the route parameter are stored as the property of the params object.And the params is property of the req object.

<------- Multiple route parameter -------->
=> /api/v1/movies/:id/:name => /api/v1/movies/5/Arnab
>> we get the response as {id:"5",name:"Arnab"}
>> Here we can see that we passed the id as integer but it stored as string. So if we use it as a integer, we should parse it from string to integer.

<-------- Optional route parameter -------->
=> /api/v1/movies/:id/:name => /api/v1/movies/5/Arnab
>> In this example if we not assign the value of name then it will give error.So for this we need to use ? operator.
=> /api/v1/movies/:id/:name? => /api/v1/movies/5 =>{id:"5",name:undefined}
>> we use question mark after the parameter that we want as a Optional route parameter.Then it will not give error.


---------------------> PUT vs PATCH <-----------------------
>> Use PUT when you want to completely replace a resource or create a new resource with a specific URI.
>> Use PATCH when you want to apply partial modifications to an existing resource, updating only specific fields.
>> PUT replaces the entire resource, while PATCH applies partial modifications

>> let's say we want to update only the email address of a user. We can use the PATCH method to send a request with only the email field to be updated.
 {
     "email": "newemail@example.com"
 }
>> But if we use PUT method we need to request with whole object.
 {
     "name":"Arnab",
     "email": "newemail@example.com".
     "district":"Chattogram"
 }

 */
