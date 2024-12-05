import { ImageAnnotatorClient } from "@google-cloud/vision";
import fs from "fs";

const getGoogleVisionClient = () => {
  // Decode Base64 key and write it to a temporary JSON file
  const credentialsPath = "/tmp/google-vision-key.json";
  if (!fs.existsSync(credentialsPath)) {
    const credentialsBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;
    fs.writeFileSync(credentialsPath, Buffer.from(credentialsBase64, "base64").toString("utf8"));
  }

  // Initialize the Vision client
  process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
  return new ImageAnnotatorClient();
};

const callGoogleVision = async (imageBase64) => {
  const client = getGoogleVisionClient();
  const [result] = await client.textDetection({
    image: { content: imageBase64 },
  });

  return result.fullTextAnnotation?.text || "";
};

export default callGoogleVision;
