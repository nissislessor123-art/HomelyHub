import groq from "./aiClient.js";
import axios from "axios";

const systemPrompt = `You are a travel planner for a holiday rental website in India.

Create a day-by-day trip plan from the details the user gives you.

IMPORTANT:
The "Live places from SerpApi" section contains current local search results retrieved through SerpApi.
Use these results as the main source for recommending places.
Only recommend places that appear in the live SerpApi results.
Do not invent or add places that are not present in those results.

Rules:
1. Give exactly one entry per day of the trip.
2. Each day needs a short title and 3 to 4 activities.
3. Write each activity as "Morning: ...", "Afternoon: ...", or "Evening: ...".
4. Keep the plan inside the budget the user gave, and say roughly what things cost in rupees.
5. Match the activities to the interests the user picked.
6. Only suggest places that really exist and are present in the live search results.
7. Prefer places with good ratings when several suitable options are available.
8. Keep the language simple and friendly.
9. Do not use emojis.
10. If a place has a rating or address in the live results, use that information naturally when useful.

Reply with ONLY this JSON shape:
{
  "summary": "two sentences about the trip",
  "days": [
    {
      "day": 1,
      "title": "short title",
      "activities": [
        "Morning: ...",
        "Afternoon: ...",
        "Evening: ..."
      ]
    }
  ],
  "tips": ["short tip", "short tip", "short tip"]
}`;

const searchPlacesWithSerpApi = async (trip) => {
  
  

  const query = `${trip.interests.join(" ")} places in ${trip.destination}`;

  

  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_maps",
        q: query,
        api_key: process.env.SERPAPI_KEY,
        type: "search",
      },
    });

  

    const places = response.data.local_results || [];
    

    

return places.slice(0, 15).map((place) => ({
  name: place.title,
  address: place.address,
  rating: place.rating,
  reviews: place.reviews,
  type: place.type,
  price: place.price,
  description: place.description,
 thumbnail: place.serpapi_thumbnail,
  openState: place.open_state,
  hours: place.hours,
  website: place.website,
  directions: place.links?.directions,
  gps: place.gps_coordinates,
}));
  } catch (error) {
    console.error("🔥 SERPAPI ERROR:", error.response?.data || error.message);
    throw error;
  }
};

// making AI readable
const planTrip = async (trip) => {
  const tripInfo = `- Destination: ${trip.destination}
- Total Budget: Rs ${trip.budget}
- Number of Days: ${trip.days}
- Number of People: ${trip.people}
- Interests: ${trip.interests.join(", ")}`;

  // Get live local places from SerpApi
  const livePlaces = await searchPlacesWithSerpApi(trip);

  const livePlacesText = JSON.stringify(livePlaces, null, 2);

  // calling Groq with the user's trip details + live SerpApi results
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    max_tokens: 2000,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `${tripInfo}

Live places from SerpApi:
${livePlacesText}`,
      },
    ],
  });

  const plan = JSON.parse(completion.choices[0].message.content);

return {
  plan,
  livePlaces,
};
};

export { planTrip };
