# Specialists API

Base path: `/api/specialists`

## HTTP Method Convention in This Module

- `PUT /api/specialists/:id` is used for update operations.

## Endpoint: List Specialists

### Description

Return paginated specialist list with filtering and sorting.

### HTTP Method and URL

```http
GET /api/specialists
```

### Headers Required

No authentication header is required.

### Request Parameters

| Location | Field      | Type                                 | Required | Default     | Notes                         |
| -------- | ---------- | ------------------------------------ | -------- | ----------- | ----------------------------- |
| Query    | `isActive` | `all` \| `true` \| `false`           | No       | `all`       | Active filter                 |
| Query    | `page`     | number                               | No       | `1`         | Min 1                         |
| Query    | `limit`    | number                               | No       | `10`        | Min 1, max 100                |
| Query    | `search`   | string                               | No       | `""`        | Name/slug/description keyword |
| Query    | `category` | string                               | No       | `""`        | Name/slug keyword             |
| Query    | `column`   | `name` \| `createdAt` \| `sortOrder` | No       | `createdAt` | Sort column                   |
| Query    | `sort`     | `asc` \| `desc`                      | No       | `desc`      | Sort direction                |

### Request Example

```http
GET /api/specialists?isActive=true&search=cardio&column=sortOrder&sort=asc&page=1&limit=10
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": [
    {
      "_id": "68321ac367b4c6e7d7a03331",
      "name": "Cardiology",
      "slug": "cardiology",
      "isActive": true,
      "sortOrder": 1
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "column": "sortOrder",
    "sort": "asc",
    "totalItems": 1,
    "totalPages": 1
  }
}
```

#### 400 Bad Request

```json
{
  "status": "error",
  "message": "Validation error",
  "code": "VALIDATION_ERROR"
}
```

#### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```

## Endpoint: Get Specialist By ID

### Description

Return one specialist by id.

### HTTP Method and URL

```http
GET /api/specialists/:id
```

### Headers Required

No authentication header is required.

### Request Parameters

| Location | Field | Type   | Required | Notes         |
| -------- | ----- | ------ | -------- | ------------- |
| Path     | `id`  | string | Yes      | Specialist id |

### Request Example

```http
GET /api/specialists/68321ac367b4c6e7d7a03331
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a03331",
    "name": "Cardiology",
    "slug": "cardiology"
  }
}
```

#### 404 Not Found

```json
{
  "status": "error",
  "message": "Specialist not found"
}
```

#### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```

## Endpoint: Create Specialist

### Description

Create a specialist entry. Supports multipart form-data for icon/image upload.

### HTTP Method and URL

```http
POST /api/specialists
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

### Request Parameters

| Location         | Field         | Type        | Required | Notes                                 |
| ---------------- | ------------- | ----------- | -------- | ------------------------------------- |
| Body (form-data) | `name`        | string      | Yes      | Specialist name                       |
| Body (form-data) | `slug`        | string      | No       | Auto-generated if omitted             |
| Body (form-data) | `description` | string      | No       | Max 500                               |
| Body (form-data) | `icon`        | file/string | No       | Max 255 chars when mapped path string |
| Body (form-data) | `image`       | file/string | No       | Max 255 chars when mapped path string |
| Body (form-data) | `isActive`    | boolean     | No       | Active status                         |
| Body (form-data) | `sortOrder`   | number      | No       | Integer                               |

### Request Example

```http
POST /api/specialists HTTP/1.1
Authorization: Bearer <JWT_ACCESS_TOKEN>
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="name"

Internal Medicine
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="description"

Internal medicine specialist
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="sortOrder"

1
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="icon"; filename="icon.svg"
Content-Type: image/svg+xml

<binary>
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

### Response Examples

#### 201 Created

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a03331",
    "name": "Internal Medicine",
    "slug": "internal-medicine",
    "isActive": true,
    "sortOrder": 1
  }
}
```

#### 400 Bad Request

```json
{
  "status": "error",
  "message": "name is required"
}
```

#### 401 Unauthorized

```json
{
  "status": "error",
  "message": "Invalid token"
}
```

#### 403 Forbidden

```json
{
  "status": "error",
  "message": "Forbidden"
}
```

#### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```

## Endpoint: Update Specialist

### Description

Update specialist using `PUT` semantics. Accepts multipart form-data.

### HTTP Method and URL

```http
PUT /api/specialists/:id
```

### Headers Required

- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

### Request Parameters

| Location         | Field         | Type        | Required | Notes                                                |
| ---------------- | ------------- | ----------- | -------- | ---------------------------------------------------- |
| Path             | `id`          | string      | Yes      | Specialist id                                        |
| Body (form-data) | `name`        | string      | No       | If changed and `slug` missing, slug auto-regenerated |
| Body (form-data) | `slug`        | string      | No       | Optional override                                    |
| Body (form-data) | `description` | string      | No       | Max 500                                              |
| Body (form-data) | `icon`        | file/string | No       | Optional new icon                                    |
| Body (form-data) | `image`       | file/string | No       | Optional new image                                   |
| Body (form-data) | `isActive`    | boolean     | No       | Optional update                                      |
| Body (form-data) | `sortOrder`   | number      | No       | Optional integer                                     |

Validation note:

- At least one field must be present.

### Request Example

```http
PUT /api/specialists/68321ac367b4c6e7d7a03331 HTTP/1.1
Authorization: Bearer <JWT_ACCESS_TOKEN>
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="name"

Cardiology and Vascular
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="isActive"

true
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "ok",
  "data": {
    "_id": "68321ac367b4c6e7d7a03331",
    "name": "Cardiology and Vascular",
    "slug": "cardiology-and-vascular"
  }
}
```

#### 400 Bad Request

```json
{
  "status": "error",
  "message": "Validation error",
  "code": "VALIDATION_ERROR"
}
```

#### 401 Unauthorized

```json
{
  "status": "error",
  "message": "Invalid token"
}
```

#### 403 Forbidden

```json
{
  "status": "error",
  "message": "Forbidden"
}
```

#### 404 Not Found

```json
{
  "status": "error",
  "message": "Specialist not found"
}
```

#### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```

## Endpoint: Delete Specialist

### Description

Delete specialist by id.

### HTTP Method and URL

```http
DELETE /api/specialists/:id
```

### Headers Required

- `Authorization: Bearer <token>`

### Request Parameters

| Location | Field | Type   | Required | Notes         |
| -------- | ----- | ------ | -------- | ------------- |
| Path     | `id`  | string | Yes      | Specialist id |

### Request Example

```http
DELETE /api/specialists/68321ac367b4c6e7d7a03331
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "Specialist deleted",
  "data": {
    "_id": "68321ac367b4c6e7d7a03331"
  }
}
```

#### 401 Unauthorized

```json
{
  "status": "error",
  "message": "Invalid token"
}
```

#### 403 Forbidden

```json
{
  "status": "error",
  "message": "Forbidden"
}
```

#### 404 Not Found

```json
{
  "status": "error",
  "message": "Specialist not found"
}
```

#### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": "INTERNAL_SERVER_ERROR"
}
```
