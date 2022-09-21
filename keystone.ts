import { config } from "@keystone-6/core";
import { lists } from "./schema";
import { withAuth, session } from "./auth";
import dotenv from "dotenv";

dotenv.config();
const {
  S3_BUCKET_NAME: bucketName = "keystone-test",
  S3_REGION: region = "ap-southeast-2",
  S3_ACCESS_KEY_ID: accessKeyId = "keystone",
  S3_SECRET_ACCESS_KEY: secretAccessKey = "keystone",
  ASSET_BASE_URL: baseUrl = "http://localhost:3000",
  KEYSTONE_DB_USER,
  KEYSTONE_DB_PASSWORD,
  MYSQL_HOST_APP,
  KEYSTONE_DB_NAME,
  KEYSTONE_PORT = "3001",
} = process.env;

export default withAuth(
  config({
    server: {
      port: parseInt(KEYSTONE_PORT),
      extendExpressApp: (app) => {
        app.get("/_version", (req, res) => {
          res.send("v6.0.0-rc.2");
        });
      },
    },
    db: {
      provider: "mysql",
      url: `mysql://${KEYSTONE_DB_USER}:${KEYSTONE_DB_PASSWORD}@${MYSQL_HOST_APP}:3306/${KEYSTONE_DB_NAME}`,
      onConnect: async (context) => {
        /* ... */
      },
      // Optional advanced configuration
      enableLogging: true,
      useMigrations: false,
      idField: { kind: "uuid" },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    session,
    lists,
    storage: {
      my_local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `${baseUrl}/images${path}`,
        serverRoute: {
          path: "/images",
        },
        storagePath: "public/images",
      },
      my_s3_files: {
        kind: "s3",
        type: "file",
        bucketName,
        region,
        accessKeyId,
        secretAccessKey,
        signed: { expiry: 5000 },
      },
    },
  })
);
