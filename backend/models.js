import mongoose from 'mongoose';

const uri = "mongodb+srv://leo:5dADxBjC11gbcQo7@daymaxcluster.b1fuq.mongodb.net/";
// ?retryWrites=true&w=majority&appName=DayMaxCluster
const clientOptions = { 
    serverApi: { 
        version: '1', 
        strict: true, 
        deprecationErrors: true 
    }
};

async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        // sends ping request to the MongoDB server to check if server responsive. 
        // ping: 1 command = verification that server is up and connection working
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that client closes when finish/error
        await mongoose.disconnect();
    }
}
run().catch(console.dir);

// User table
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
});
export const User = mongoose.model('User', userSchema);

// Symptoms table
const symptomsSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    date: Date
    });
export const Symptoms = mongoose.model('Symptoms', symptomsSchema);

// User's Daily Statistics table
const dailyStatsSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    water: { type: Number, required: true },
    sleep: { type: Number, required: true },
    heart_rate: { type: Number, required: true },
    meds: { type: String }
});
export const DailyStats = mongoose.model('DailyStats', dailyStatsSchema);

// Health Resources table
const healthResourcesSchema = new mongoose.Schema({
    url: String
});
export const HealthResources = mongoose.model('HealthResources', healthResourcesSchema);

// Health Diary table
const diarySchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    entry: { type: String, required: true },
    date: Date
});
export const Diary = mongoose.model('Diary', diarySchema);

// Health Buddy table
const buddySchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    date: Date
});
export const Buddy = mongoose.model('Buddy', buddySchema);