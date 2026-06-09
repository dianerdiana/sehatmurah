# Health Check API

Base path: `/health`

## Endpoint: Health Check

### Description

Return a simple health check response for the backend process.

### HTTP Method and URL

```http
GET /health
```

### Headers Required

No authentication header is required.

### Response Examples

#### 200 OK

```json
{
  "status": "success",
  "message": "Health check ok",
  "data": {
    "status": "ok"
  }
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
