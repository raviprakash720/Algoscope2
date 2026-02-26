# MongoDB Production Configuration Guide

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Connection String (Required)
MONGO_URI=your_mongodb_atlas_connection_string_here

# Server Port (Optional)
PORT=5000

# Environment
NODE_ENV=production
```

## MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Choose the free tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Create the cluster

3. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Add a new database user
   - Choose password authentication
   - Assign "Read and write to any database" permissions

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Add your current IP address
   - For production, you can add `0.0.0.0/0` to allow all IPs (less secure)

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Local Development

For local development, you can use:
```env
MONGO_URI=mongodb://localhost:27017/algoscope
```

But make sure MongoDB is running locally:
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

## Security Best Practices

- ✅ Never commit `.env` files to version control
- ✅ Use strong, unique passwords for database users
- ✅ Limit IP whitelist to only necessary addresses
- ✅ Use environment variables, not hardcoded credentials
- ✅ Enable MongoDB Atlas encryption at rest
- ✅ Regularly rotate database credentials

## Testing Connection

Start the backend server to verify MongoDB connection:
```bash
cd backend
npm install
node server.js
```

You should see:
```
✅ MongoDB Connected Successfully
📡 Database ready for operations
```

## Render Deployment

When deploying to Render:

1. Set environment variables in Render dashboard:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `PORT` = 5000 (or let Render auto-assign)

2. Render will automatically use these environment variables
3. No code changes needed - the application is already production-ready

## Troubleshooting

**Connection Timeout Errors:**
- Check if your IP is whitelisted in MongoDB Atlas
- Verify the connection string format
- Ensure no firewall is blocking the connection

**Authentication Errors:**
- Double-check username and password
- Ensure the user has proper database permissions
- Verify the database name in the connection string

**Offline Mode:**
- Application will run in limited mode without database
- Progress tracking and mistake logging will be disabled
- All static content and frontend features will work normally