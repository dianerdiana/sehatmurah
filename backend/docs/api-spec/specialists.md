# Specialists API

Base URL: `/api/specialists`

## Data Model Summary

- Specialist fields: `name`, `slug`, `description`, `icon`, `image`, `isActive`, `sortOrder`, `createdAt`, `updatedAt`

## Endpoints

## 1) List Specialists

- Method: `GET`
- Path: `/`
- Auth: public

Query parameters:

- `isActive`: `true | false` (optional)
- `page` (number, default `1`)
- `limit` (number, default `10`, max `100`)

Success:

- Status code: `200`
- `data`: specialist array
- `meta`: pagination

## 2) Get Specialist By ID

- Method: `GET`
- Path: `/:id`
- Auth: public

Path parameters:

- `id`: required string

Success:

- Status code: `200`
- `data`: specialist object

Common errors:

- `404` Specialist not found

## 3) Create Specialist

- Method: `POST`
- Path: `/`
- Role: `ADMIN`
- Auth: requires `Authorization: Bearer <access_token>`

Request body:

```json
{
  "name": "Internal Medicine",
  "slug": "penyakit-dalam",
  "description": "Internal medicine specialist",
  "icon": "stethoscope",
  "image": "https://example.com/specialist.jpg",
  "isActive": true,
  "sortOrder": 1
}
```

Validation:

- `name`: required string
- `slug`: optional string (generated from `name` when omitted)
- `description`: optional string, max 500
- `icon`: optional string, max 255
- `image`: optional string, max 255
- `isActive`: optional boolean
- `sortOrder`: optional integer

Success:

- Status code: `201`
- `data`: specialist object

Common errors:

- `400` name is required
- `409` Duplicate resource (duplicate slug)

## 4) Update Specialist

- Method: `PATCH`
- Path: `/:id`
- Role: `ADMIN`
- Auth: token required

Path parameters:

- `id`: required string

Request body:

- Partial payload from the create endpoint
- If `name` changes and `slug` is not sent, slug is regenerated from `name`

Success:

- Status code: `200`
- `data`: specialist object after update

Common errors:

- `404` Specialist not found

## 5) Delete Specialist

- Method: `DELETE`
- Path: `/:id`
- Role: `ADMIN`
- Auth: token required

Path parameters:

- `id`: required string

Success:

- Status code: `200`

```json
{
  "status": "success",
  "message": "Specialist deleted",
  "data": {}
}
```

Common errors:

- `404` Specialist not found
