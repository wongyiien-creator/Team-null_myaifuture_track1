import { genkit, z } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';

const ai = genkit({
  plugins: [
    vertexAI({ location: 'us-central1' })
  ],
  model: vertexAI.model('gemini-2.0-flash'),
});

export async function vertexSearch(type, input) {
  const prompts = {
    weather: `Search weather for ${input}. Return ONLY a JSON object with current_temp (number), current_humidity (number), forecast_temp (number), forecast_humidity(number), and forecast_humidity (number).`,
    soil: `Search soil data for ${input}. Return ONLY a JSON object with texture (string), ph (number), and drainage (string).`,
    crop: `Is ${input} a commercial crop? Return ONLY a JSON object with exists (boolean).`
  };

  const schemas = {
    weather: z.object({
      current_temp: z.number().nullable().describe("Current Celsius. If exact number is missing from search, provide a regional estimate."),
      current_humidity: z.number().nullable().describe("Current humidity %. If missing, estimate based on climate."),
      forecast_temp: z.number().nullable().describe("24 hour forecast Celsius. If exact number is missing from search, provide a regional estimate."),
      forecast_humidity: z.number().nullable().describe("24 hour forecast humidity %. If missing, estimate based on climate.")
    }).required(),

    soil: z.object({
      texture: z.string().default("Unknown").describe("Texture of soil"),
      ph: z.union([z.number(), z.string()]).nullable().describe("mean ph value of the soil"),
      drainage: z.string().default("Information not found").describe("The drainage of the area")
    }).required(),

    crop: z.object({
      exists: z.boolean(),
    }).required()
  };

  try {
    const response = await ai.generate({
      system: `You are an expert agrotech assistant.You are a data extraction bot. 
      Your ONLY job is to search Google and extract data into the requested JSON format. 
      If a specific number isn't found, use a reasonable regional estimate. DO NOT return null. DO NOT explain your answer.`,
      prompt: prompts[type],
      outputSchema: schemas[type],
      config: {
        temperature: 0.1,
        googleSearchRetrieval: {}
      }
    });

    //console.log("Vertex Response generated successfully!")
    console.log("Full Output:", JSON.stringify(response.output, null, 2))
    return response.output;
  }
  catch (error) {
    console.error(`VertexSearch Error (${type}):`, error);
    throw error;
  }
}