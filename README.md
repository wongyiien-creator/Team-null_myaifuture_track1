# null_MyAIFuture: Farming Assistant

# Instruction
1. Click the Google Cloud Run link to access the website: 
Cloud Run Link: https://analyzefarmagent-309499836612.us-central1.run.app
2. Be sure to allow every premission that was asked (location, services)

Canva Link: https://www.canva.com/design/DAHGhWmGe24/glu_HiesaEq1laFYmcI6nQ/edit

# Overview
"Farming Assistant" aims to produce an optimize farming plan of the choosen based on weather and soil data. AI is used throughout the coding process as an assitant. 

# Desciption
"Farming Assistant" is achat based website. It gets the crop input from the user and analyze the farm suitability of crops using the searhed data. It then provide a farming plan, aim to optimized yield

# Problems

a.	Depleting Agriculture Resources 
-	Farmers experience issues with managing water supply as a lot of the global water supply is used on farming, leading to water scarcity.
-	The solution addresses these issues by providing a optimized irrigation plan, cater towards soil moisture and the weather
  
b.	Degrading farmland soil 
-	Continuous farming can cause erosion, soil degradation and reduced fertility. This cause farmland to lose organic matter and diminish soil structure, leading to negative impact on crops yield and sustainability
-	The product aims to decrease degrading farmland soil as it choose a crop that is highly suitable and provide a fertilizer plan based on the selected crops and soil condition such as soil 

c.	Environmental Issues
- Factors such as temperature, sunlight and soil erosion can affect yield. Extreme temperature can affect crop’s growth, as extreme heat accelerate evaporation, stress plants, and reduce pollination, while extreme cold damages tissues and stunt growth. Additionally, each crops have a specific temperature range for optimal growth, highlighting the importance of the right temperature for the right crops. 
-	Besides that, sunlight is important in agriculture due to photosynthesis. The variation of daylight duration and intensity can affect crops yields. Lastly, pollution in soil can negatively affect crops, reducing its yield. 
-	This product examines the weather components and gives the suitability score of crops to plant based on the conditions to optimized yield. 

d. Natural Disasters
-	Studies show that natural disasters, especially drought have negatively affected agriculture, follow by storms, floods, and earthquakes. Drought related death, damages, and affected populations significantly reduce agricultural value while storm related economics damage also significantly reduce agriculture value. Floods and Earthquake only have negative effect when a big portion of the population is affected.
-	The product provide precautions for unexpected events.

# Technical Stack
Brain: Gemini 2.5

Orchestrator: Firebase Genkit

Context: Vertex AI Search

Development Lifecycle: Google Clound Run - Deployment

Location: Google Geocoding | W3C Geolocation

Language: Javascript | HTML | CSS

Development Platform: Google Antigravity (Proof in slides and video)

# Flow
This is a Farming Assistant website, it aims to help optimize the yield of crop through analysis and planning. To activate the website, the user must physically be at the farm and  enter the crop they wish to plant in their farm. Using W3C Geolocation API with enableHighAccuracy toggled to get an accurate coordinate, the system will obtain the coordinates of the user. Then, it will use Google Maps Geocoding API to translate the coordinates into address. 

Once the website got its address, it will input the address and chosen crop to the agent and call the backend. The backend is developed in Google Antigravity, providing a managed development environment. It is deployed using Google Cloud Run as it is a serverless platform and can scale based on incoming request, allowing the website to remain responsive despite large volume of request. The backend used Firebase Genkit, which serves as an orchestration framework. It streamlines the integration between custom logic and language models. It handles the formatting of prompts and parsing of JSON output through the input and output schema. Firebase Genkit will automatically parse the input or output to fit the schema, making the code less heavy. Within the flow we used Vertex AI Search o perform Retrieval-Augmented Generation (RAG). This allow the agent to search and fetch real time data from Google’s vast search index. Using Vertex AI Search, the agent fetch the weather data, consisting of current temperature, current humidity, 24-hour forecast temperature and 24-hour forecast humidity. Additionally, Vertex AI Search will also search for soil texture, soil ph and the drainage of the farm and the eligibility of the chosen crop. If the crop is an eligible crop, it will continue and input the searched data to Gemini via Google AI Studio. Gemini will the analyse and provide the suitability of the crop, the irrigation plan, fertilizer plan and precaution plan. 

The backend will the send the output information to the frontend, so that the frontend can show the information to the user through chat bubbles. The frontend, is a webpage developed using HTML and CSS.


# National Relevance
This website perfertly aligned with NATIONAL AGROFOOD POLICY 2021-2030 (NAP 2.0). NAP 2.0 aims to develop sustainable, resilient, and high-technology agrofood sector in efforts to drive economic growth, enhance the well-being of the people, and prioritize food and nutrition security. The two main aspect of NAP 2.0 is Food Security and Economic Growth, where our website focuses on enhancing food security. One of the policy thrust action of NAP 2.0 is embracing modernisation and Smart Agriculture, where food producers are encouraged to use technology in farming practices to obtain higher productivity. This in turn will lead to higher profit margin, increasing household income. This website support this as it used AI technology to produce an optimize farming plan. This enhances the farming practices of farmers, increasing the yield of the crop. Eventually, this lead higher income.

# Impact (Value Gained)
The farmers gain economic value from this website. This is because our “Farming Assitant” can reduce farmer’s input cost by providing an optimized fertilizer and irrigation plan. Farmers will then be able to reduce wasted resources and money. Our website also provide a precaution plan for unexpected events. This allow the farmer to reduce the loss of capital when natural disaster or unexpected events occur. This website also provide environmental value. This is because the farmer can reduce wasting water by following the optimized irrigation plan. It can also prevent damaging the soil due to chemical pollution and planting unsuitable crops.

# Potential Positive Change
Our website have the potential for positive change. Our helper is a web app, meaning it is highly accessible and does not require high-end hardware. Farmers can access our website using only a mobile phone. Our website also promote scalability since Google Cloud Run is used. The website can handle many requests without crashing. The website also supports sustainability as it prevent further soil degradation and wasted resources

# Future Improvement
I also believe future improvement can be made for this website. For example, IoT sensors can be used so that the soil data are more accurate. Google Vertex AI Search can search from the library of all the registered farm’s soil. 



