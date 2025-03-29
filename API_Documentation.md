
---

## **Authentication Endpoints**

### **POST /auth/register**
- **Description**: Registers a new user.
- **Request Body**:
    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string",
        "role": "user" // Optional, defaults to "user" if not provided.
    }
    ```
- **Response**:
    - **Success**:
      ```json
      {
          "message": "User registered successfully",
          "userId": 1
      }
      ```
    - **Error**: Invalid data or existing user.

### **POST /auth/login**
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **Success**:
      ```json
      {
          "accessToken": "jwt_token_here"
      }
      ```
    - **Error**: Invalid credentials.

### **GET /auth/profile**
- **Description**: Fetches the profile of the authenticated user.
- **Headers**: 
    - `Authorization: Bearer <jwt_token>`
- **Response**:
    ```json
    {
        "username": "string",
        "email": "string",
        "role": "user"
    }
    ```

---

## **File Upload and Processing Endpoints**

### **POST /file/upload**
- **Description**: Uploads one or more files.
- **Request Body**: 
  - Form-data, with `file` as the key and files as the value.
- **Response**:
    - **Success**:
      ```json
      {
          "message": "File(s) uploaded successfully",
          "fileId": 1
      }
      ```
    - **Error**: Invalid file format or size.

### **GET /files**
- **Description**: Retrieves a list of files with pagination, filtering, and sorting.
- **Query Parameters**: 
    - `page` (optional): Page number for pagination.
    - `limit` (optional): Number of files per page.
    - `filter` (optional): Filter by file type or status.
- **Response**:
    ```json
    {
        "files": [
            {
                "id": 1,
                "filename": "file1.pdf",
                "status": "processing",
                "size": 12345,
                "uploadDate": "2025-03-29T12:34:56Z"
            },
            ...
        ],
        "total": 100,
        "page": 1,
        "limit": 10
    }
    ```

### **GET /files/:id**
- **Description**: Fetches details and processing results of a specific file.
- **Response**:
    ```json
    {
        "id": 1,
        "filename": "file1.pdf",
        "status": "completed",
        "size": 12345,
        "uploadDate": "2025-03-29T12:34:56Z",
        "processedData": {
            "text": "Extracted text from the file...",
            "ocrResult": "Extracted text from image..."
        }
    }
    ```

---

## **User Management Endpoints**

### **GET /users**
- **Description**: Fetches all users (requires authentication).
- **Headers**:
    - `Authorization: Bearer <jwt_token>`
- **Response**:
    ```json
    {
        "users": [
            {
                "id": 1,
                "username": "john_doe",
                "email": "john@example.com",
                "role": "admin"
            },
            ...
        ]
    }
    ```

### **PUT /users/:id/edit**
- **Description**: Edits a user's details (e.g., username). (requires authentication)
- **Request Body**:
    ```json
    {
        "username": "new_username"
    }
    ```
- **Response**:
    - **Success**:
      ```json
      {
          "message": "User updated successfully",
          "userId": 1
      }
      ```
    - **Error**: Unauthorized or invalid user ID.

### **DELETE /users/:id**
- **Description**: Deletes a user from the system (requires authentication).
- **Response**:
    - **Success**:
      ```json
      {
          "message": "User deleted successfully"
      }
      ```
    - **Error**: Unauthorized or invalid user ID.

---

## **Real-Time Updates (WebSocket Events)**

### **fileStatusUpdate**
- **Description**: Emits real-time updates on the status of file processing (e.g., processing, completed, failed).
- **Event**: `fileStatusUpdate`
- **Data**:
    ```json
    {
        "fileId": 1,
        "status": "processing"
    }
    ```

---

## **Error Handling**
All endpoints should return a standard error format:

```json
{
    "statusCode": 400,
    "message": "Error message describing the issue",
    "error": "Bad Request"
}


