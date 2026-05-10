# Specialists API

Base URL: `/api/specialists`

## Data Model Ringkas

- Field specialist: `name`, `slug`, `description`, `icon`, `image`, `isActive`, `sortOrder`, `createdAt`, `updatedAt`

## Endpoints

## 1) List Specialists

- Method: `GET`
- Path: `/`
- Auth: publik

Query params:

- `isActive`: `true | false` (opsional)
- `page` (number, default `1`)
- `limit` (number, default `10`, max `100`)

Success:

- Status code: `200`
- `data`: array specialist
- `meta`: pagination

## 2) Get Specialist By ID

- Method: `GET`
- Path: `/:id`
- Auth: publik

Path params:

- `id`: string, wajib

Success:

- Status code: `200`
- `data`: object specialist

Error umum:

- `404` Specialist not found

## 3) Create Specialist

- Method: `POST`
- Path: `/`
- Role: `ADMIN`
- Auth: wajib `Authorization: Bearer <access_token>`

Request body:

```json
{
  "name": "Penyakit Dalam",
  "slug": "penyakit-dalam",
  "description": "Spesialis penyakit dalam",
  "icon": "stethoscope",
  "image": "https://example.com/specialist.jpg",
  "isActive": true,
  "sortOrder": 1
}
```

Validasi:

- `name`: string, wajib
- `slug`: string, opsional (jika kosong akan di-generate dari `name`)
- `description`: string, opsional, max 500
- `icon`: string, opsional, max 255
- `image`: string, opsional, max 255
- `isActive`: boolean, opsional
- `sortOrder`: integer, opsional

Success:

- Status code: `201`
- `data`: object specialist

Error umum:

- `400` name is required
- `409` Duplicate resource (slug duplikat)

## 4) Update Specialist

- Method: `PATCH`
- Path: `/:id`
- Role: `ADMIN`
- Auth: wajib token

Path params:

- `id`: string, wajib

Request body:

- Partial dari payload create
- Jika `name` diubah dan `slug` tidak dikirim, slug akan digenerate ulang dari `name`

Success:

- Status code: `200`
- `data`: object specialist setelah update

Error umum:

- `404` Specialist not found

## 5) Delete Specialist

- Method: `DELETE`
- Path: `/:id`
- Role: `ADMIN`
- Auth: wajib token

Path params:

- `id`: string, wajib

Success:

- Status code: `200`

```json
{
  "status": "success",
  "message": "Specialist deleted",
  "data": {}
}
```

Error umum:

- `404` Specialist not found
