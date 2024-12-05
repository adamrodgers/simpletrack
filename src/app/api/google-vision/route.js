import { ImageAnnotatorClient } from "@google-cloud/vision";
import { NextResponse } from "next/server";

const client = new ImageAnnotatorClient();

export async function POST(req) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 });
    }

    const [result] = await client.textDetection({
      image: { content: imageBase64 },
    });

    const detections = result.textAnnotations || [];
    const extractedText = detections.length > 0 ? detections[0].description : "";

    return NextResponse.json({ extractedText });
  } catch (error) {
    console.error("Google Vision API error:", error);
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}
