# API Documentation

This document describes the REST API endpoints available for the Educational Resource Distribution System.

## Base URL

The base URL for all API endpoints is: `http://localhost:5000/api`

## Authentication

Currently, the API does not require authentication.

## Endpoints

### Schools

#### GET /schools

Returns a list of all schools.

**Response**:
```json
[
  {
    "School_ID": 1,
    "Name": "Central High School",
    "Location": "Downtown",
    "Contact_Person": "John Smith",
    "createdAt": "2023-05-10T10:00:00.000Z",
    "updatedAt": "2023-05-10T10:00:00.000Z"
  },
  ...
]




GET /schools/
Returns details of a specific school.
Parameters:

id: School ID

Response:
json{
  "School_ID": 1,
  "Name": "Central High School",
  "Location": "Downtown",
  "Contact_Person": "John Smith",
  "createdAt": "2023-05-10T10:00:00.000Z",
  "updatedAt": "2023-05-10T10:00:00.000Z"
}
POST /schools
Creates a new school.
Request Body:
json{
  "Name": "North High School",
  "Location": "North District",
  "Contact_Person": "Jane Doe"
}
Response:
json{
  "School_ID": 2,
  "Name": "North High School",
  "Location": "North District",
  "Contact_Person": "Jane Doe",
  "createdAt": "2023-05-10T11:00:00.000Z",
  "updatedAt": "2023-05-10T11:00:00.000Z"
}
PUT /schools/
Updates an existing school.
Parameters:

id: School ID

Request Body:
json{
  "Name": "North High School Updated",
  "Location": "North District",
  "Contact_Person": "Jane Doe"
}
Response:
json{
  "School_ID": 2,
  "Name": "North High School Updated",
  "Location": "North District",
  "Contact_Person": "Jane Doe",
  "createdAt": "2023-05-10T11:00:00.000Z",
  "updatedAt": "2023-05-10T12:00:00.000Z"
}
DELETE /schools/
Deletes a school.
Parameters:

id: School ID

Response:
json{
  "message": "School deleted successfully"
}
Resources
GET /resources
Returns a list of all resources.
GET /resources/
Returns details of a specific resource.
POST /resources
Creates a new resource.
PUT /resources/
Updates an existing resource.
DELETE /resources/
Deletes a resource.
Suppliers
GET /suppliers
Returns a list of all suppliers.
GET /suppliers/
Returns details of a specific supplier.
POST /suppliers
Creates a new supplier.
PUT /suppliers/
Updates an existing supplier.
DELETE /suppliers/
Deletes a supplier.
Distributions
GET /distributions
Returns a list of all distributions.
GET /distributions/
Returns details of a specific distribution.
POST /distributions
Creates a new distribution.
PUT /distributions/
Updates an existing distribution.
DELETE /distributions/
Deletes a distribution.
Error Responses
The API returns appropriate HTTP status codes and error messages:

400 Bad Request: Invalid input data
404 Not Found: Resource not found
500 Internal Server Error: Server error

Error response example:
json{
  "error": true,
  "message": "School not found"
}
