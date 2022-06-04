import { MongoClient } from "mongodb";

const DBURL = `mongodb+srv://redaxe:${process.env.PASSWORD}@cluster0.xc4ck.mongodb.net/?retryWrites=true&w=majority`;

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const db = await MongoClient.connect(DBURL);
    const collection = db.db("url-shortener").collection("urls");

    const { url } = req.body;

    const result = await collection.findOne({ url });

    if (result) {
      res.status(200).json({
        shortUrl: `https://url.thecodeblog.net/${result.shortUrl}`,
        url: result.url,
        createdAt: result.createdAt,
        _id: result._id,
      });
    } else {
      const shortUrl = Math.random().toString(36).slice(2);

      const newUrl = {
        url,
        shortUrl,
        createdAt: new Date(),
      };

      await collection.insertOne(newUrl);

      res.status(200).json({
        shortUrl: `https://url.thecodeblog.net/${shortUrl}`,
        url,
        createdAt: newUrl.createdAt,
        _id: newUrl._id,
      });
    }
    db.close();
  } else {
    res.status(405).end();
  }
}
