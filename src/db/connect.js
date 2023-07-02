import mongoose from 'mongoose';

const connect = async (uri) => {
    console.log('>> Connecting to database..');
    try {
        await mongoose.connect(uri);
        console.log('>> Connect to database successfully!');
    } catch (err) {
        console.log('>> Cannot connect to database..');
        throw err;
    }

}

export { connect };
