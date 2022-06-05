import { MongoClient } from "mongodb";

const DBURL = `mongodb+srv://redaxe:${process.env.PASSWORD}@cluster0.xc4ck.mongodb.net/?retryWrites=true&w=majority`;

export async function getServerSideProps({ res, params }) {
  const db = await MongoClient.connect(DBURL);
  const collection = db.db("url-shortener").collection("urls");
  const shortUrl = params.url;

  const result = await collection.findOne({ shortUrl });

  if (result) {
    res.statusCode = 302
    res.setHeader('Location', result.url);
  } else {
    res.statusCode = 404
  }

  db.close();

  return {props: {}}
}

export default function Redirect() {
  return <></>;
}