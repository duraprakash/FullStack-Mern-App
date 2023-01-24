
 01. mkdir serve
 02. cd server
 03. npm i -g nodemon
 04. npm i express body-parser bcrypt cors dotenv gridfs-stream multer multer-gridfs-storage helmet morgan jsonwebtoken mongoose
 05. npm init -y
 06. setup mongoose db connection and database
    ==> Add your mongodb connection string into your application code in a separate file .env
    MONGO_URL=your_mongodb
    PORT=3001

    example:
    
    MONGO_URL=mongodb+srv://username:password@cluster1.tv7cp.mongodb.net/<dbname>?retryWrites=true&w=majority"
    PORT=3001

    Note: ==> replace username and password with your mongodb username and password