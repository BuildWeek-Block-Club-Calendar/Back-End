# Back-End

## /api/users/register
### POST with
REQUIRED email  
OPTIONAL username  
REQUIRED password  
OPTIONAL streetAddress  
OPTIONAL city  
OPTIONAL zipcode  
OPTIONAL businessName  
OPTIONAL photo (Not yet saving)  
OPTIONAL lattitude  
OPTIONAL longitude  

## /api/users/login
### POST with
REQUIRED email  
REQUIRED password  

## /api/rest/events
### POST with all required fields as seen in schema

## /api/rest/events/:id
### GET the details for an event
### PUT to update an event
### DELETE to remove an event entirely

## /api/rest/events/near
### POST COMING SOON

## /api/rest/events/attend/:id
### GET coming soon, to toggle attendance

## User Schema
```js
email: {
    type: String,
    required: true
},
username: {
    type: String,
    required: false
},
password: {
    type: String,
    required: true
},
streetAddress: {
    type: String,
    required: false
},
city: {
    type: String,
    required: false
},
country: {
    type: String,
    required: false
},
businessName: {
    type: String,
    required: false
},
events: {
    type: Array,
    require: false
},
photo: {
    data: Buffer,
    contentType: String,
    required: false
},                                                       
lattitude: {
    type: String,
    required: false
},
longitude: {
    type: String,
    required: false
}
```

## Event Schema
```js
eventTitle: {
    type: String,
    required: true
},
eventCreator: {
    type: String,
    required: true
},
eventAddress: {
    type: String,
    required: true
},
eventCity: {
    type: String,
    required: true
},
eventCountry: {
    type: String,
    required: true
},
latitude: {
    type: String,
    required: false
},
longitude: {
    type: String,
    required: false
},
eventDescription: {
    type: String,
    required: true
},
eventStart: {
    type: String,
    required: true
},
eventEnd: {
    type: String,
    required: true
},
externalLink: {
    type: String,
    required: false
},
photo: {
    data: Buffer,
    contentType: String,
    required: false
},
rsvpd: {
    type: Array,
    required: false
}                 
```