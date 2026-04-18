import { genkit, z } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';
import { vertexSearch } from "./vertexSearch.js";
//original(moved to vertexai): import { googleAI } from '@genkit-ai/google-genai';

const model = 'vertexAI/gemini-1.5-flash'

const ai = genkit({
  plugins: [vertexAI({ location: 'us-central1' })],
  model: 'gemini-1.5-flash',
});

export async function analyzeFarmAgent(input) {
  try {
    console.log("Agent received input:", JSON.stringify(input));
    console.log("Agent received input:", JSON.stringify(input.address));
    console.log("Agent received input:", JSON.stringify(input.crop));

    const weather = await vertexSearch("weather", input.address);
    const soil = await vertexSearch("soil", input.address);
    const cropData = await vertexSearch("crop", input.crop);

    console.log("Agent received input:", JSON.stringify(cropData.exists))

    console.log("Full Output:", JSON.stringify(weather, null, 2), JSON.stringify(soil, null, 2), JSON.stringify(cropData, null, 2));

    if (cropData.exists == true) {
      const response = await ai.generate({
        prompt: `
          Analyze suitability for Crop: ${input.crop} at Location: ${input.address}.
          Weather: Temp ${weather.current_temp}, Humidity ${weather.current_humidity}.
          Soil: Texture ${soil.texture}, pH ${soil.ph}, Drainage ${soil.drainage}.
          
          Return a JSON object with:
          suitability: number (0-10),
          suitability_reason: string,
          irrigationPlan: string[],
          fertilizerPlan: string[],
          precautionPlan: string[]
        `,
        outputSchema: z.object({
          suitability: z.number(),
          suitability_reason: z.string(),
          irrigationPlan: z.array(z.string()),
          fertilizerPlan: z.array(z.string()),
          precautionPlan: z.array(z.string()),
        })
      });
      return response.output;
    }

    else {
      return {
        suitability: 0,
        suitability_reason: `Sorry, ${input.crop} is not a eligible crop. Please try again`,
        irrigationPlan: ["No data available"],
        fertilizerPlan: ["No data available"],
        precautionPlan: ["No data available"]
      };
    }

  } catch (error) {
    console.error("AGENT_INTERNAL_ERROR:", error);
    throw error;
  }
}