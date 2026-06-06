# Sample MongoDB Documents

## User

```json
{
  "_id": "648af34b9bbc0936d2e8d5f1",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "$2a$10$...",
  "role": "customer",
  "createdAt": "2026-06-06T10:00:00.000Z",
  "updatedAt": "2026-06-06T10:00:00.000Z"
}
```

## Room

```json
{
  "_id": "648af36e9bbc0936d2e8d5f2",
  "roomNumber": "102",
  "roomType": "Suite",
  "price": 180,
  "description": "Large suite with balcony overview.",
  "capacity": 4,
  "image": "https://images.unsplash.com/photo-1519824145371-296894a0daa9",
  "available": true,
  "createdAt": "2026-06-06T10:05:00.000Z",
  "updatedAt": "2026-06-06T10:05:00.000Z"
}
```

## Booking

```json
{
  "_id": "648af38f9bbc0936d2e8d5f3",
  "userId": "648af34b9bbc0936d2e8d5f1",
  "roomId": "648af36e9bbc0936d2e8d5f2",
  "checkInDate": "2026-06-20T00:00:00.000Z",
  "checkOutDate": "2026-06-22T00:00:00.000Z",
  "totalPrice": 360,
  "status": "Pending",
  "createdAt": "2026-06-06T10:10:00.000Z",
  "updatedAt": "2026-06-06T10:10:00.000Z"
}
```
