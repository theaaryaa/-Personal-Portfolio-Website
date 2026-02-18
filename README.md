# GitHub Codespaces Setup

1. Copy `.env.example` to `.env` in Codespaces.
2. Set `MONGO_URI` to your MongoDB Atlas connection string.
3. Start the app:
   - `npm run seed`
   - `npm run dev`
4. Open forwarded port `5000`.

Note: MongoDB should be cloud-hosted (Atlas) for Codespaces unless you run MongoDB in another container.
