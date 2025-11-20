# Backend - Social MERN (updated)

Setup:
1. cd backend
2. npm install
3. create .env from .env.example and set MONGO_URI and JWT_SECRET
4. npm run dev

New endpoints:
- GET /api/posts/search?q=...   # search posts by caption
- GET /api/posts/user/:id       # posts by a user
- PUT /api/posts/:id            # edit a post (author only)
- DELETE /api/posts/:id         # delete a post (author only)