export async function connect(uri) {
    if (!uri) return;
    return await mongoose.connect(MONGODB_URI);
}