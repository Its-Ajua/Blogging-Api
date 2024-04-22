import mongoose from "mongoose";

export async function connect(uri) {
    if (!uri) throw new Error("No database uri");
    const connection = await mongoose.connect(uri);
    return connection
}