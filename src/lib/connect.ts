import mongoose from "mongoose";

type ConnectionObject = {
    isConnected? : number ;
}

const connection : ConnectionObject = {};


async function Connect(): Promise<void> {

    if( connection.isConnected){
        console.log('Already connected to the database');

        return ;
    }

    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
        connection.isConnected = db.connections[0].readyState;
        console.log('Database connected successfully');
    }catch(error){
        console.error('Database connection failed:', error);
         // Graceful exit in case of a connection error
          process.exit(1);
    }
}

export default Connect;