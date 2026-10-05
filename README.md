# HomelyHub

### AI-Powered Property & Travel Platform

HomelyHub is a full-stack web application that brings property discovery, property management, bookings, AI assistance, and travel planning together in one place.

I built this project using React and Vite for the frontend, Node.js and Express for the backend, and MongoDB for storing application data. The project also uses ImageKit for property images, Leaflet and OpenStreetMap for maps, Groq for AI features, and SerpApi for local place discovery.

## What is HomelyHub?

The idea behind HomelyHub is to bring different parts of finding and managing a stay into one application.

Users can:

- Browse and explore properties
- View property details, images, and locations
- Add and manage property listings
- Book properties
- View their bookings
- Generate property descriptions with AI
- Plan trips using Trip Genie
- Discover places based on their destination and interests

The project is still under development, and I continue to improve it by adding and refining features.

## Features

### Property Discovery

Users can browse available properties and view the information they need before making a booking.

This includes:

- Property details
- Property images
- Property location
- Other listing information

### Property Management

Property owners can add their own listings and provide details about the property.

The property section includes:

- Adding a property
- Adding property details and descriptions
- Uploading property images
- AI assistance for writing property descriptions

### Booking

Users can book properties and keep track of their bookings through the **My Bookings** section.

### AI-Assisted Property Descriptions

Writing a good property description can take time, so HomelyHub includes a **"Write with AI"** option.

The user provides the property information and the AI helps generate a description that can then be used for the listing.

### Maps and Location

Property locations are displayed using **Leaflet** with **OpenStreetMap**.

Users can view the location on an interactive map and can also open the location in Google Maps.

### Property Images

**ImageKit** is used to handle property images in the application.


# Trip Genie

Trip Genie is the travel-planning part of HomelyHub.

The idea is simple: instead of only giving users a general AI-generated itinerary, Trip Genie also searches for places related to the destination and interests entered by the user.

The user provides their trip details, and Trip Genie uses those details to find relevant local places and then uses AI to organize them into a travel plan.

## How Trip Genie Works

The flow is:

1. The user enters their destination, interests, trip details, and other preferences.
2. The request is sent to the HomelyHub backend.
3. The backend uses **SerpApi's Google Maps search** to find relevant local places.
4. The places returned by SerpApi are collected and prepared for the AI.
5. The AI uses those results along with the user's trip requirements.
6. A structured travel plan is generated.
7. The user sees the itinerary along with the discovered local places.

This gives Trip Genie two important parts:

**Local discovery + AI trip planning**

# SerpApi Integration

SerpApi is used in Trip Genie for local place discovery.

When a user enters a destination and interests, HomelyHub creates a search based on that information and sends it to SerpApi using the Google Maps search engine.

The application then receives local search results and uses information such as:

- Place name
- Address
- Rating
- Number of reviews
- Place type
- Price information
- Description
- Thumbnail
- Opening status
- Hours
- Website
- Directions
- GPS coordinates

The results are displayed in Trip Genie as local discovery cards.

Users can also open a discovered place directly in Google Maps.

## Why SerpApi?

The main reason for using SerpApi is to give Trip Genie access to local search results instead of making the AI suggest places entirely from its own knowledge.

SerpApi handles the local search part, while the AI handles the planning part.

This allows Trip Genie to build the travel plan around places returned from the local search.


# AI Architecture

Trip Genie uses SerpApi and AI for two different parts of the process.

### SerpApi

SerpApi is responsible for:

- Finding local places
- Performing the Google Maps search
- Returning information about those places

### Groq / AI

The AI is responsible for:

- Understanding the user's trip requirements
- Using the retrieved places
- Organizing the places into an itinerary
- Generating the final travel plan

In simple terms:
```text

User's trip details
        ↓
     SerpApi
        ↓
 Local places
        ↓
      Groq AI
        ↓
   Travel plan
```

# Technology Stack

### Frontend

- React
- Vite
- JavaScript
- Axios
- Leaflet

### Backend

- Node.js
- Express.js
- Axios

### Database

- MongoDB
- Mongoose

### AI

- Groq
- AI-assisted property descriptions
- AI Trip Planner

### APIs & Services

- SerpApi
- ImageKit
- OpenStreetMap
- Google Maps

### Development Tools

- Git & GitHub
- Postman

Postman was used during development to test and verify backend APIs.

# Application Architecture

```text
                    ┌──────────────────┐
                    │    React + Vite  │
                    │     Frontend     │
                    └────────┬─────────┘
                             │
                             │ REST API
                             ↓
                    ┌──────────────────┐
                    │ Node.js +        │
                    │ Express Backend  │
                    └────────┬─────────┘
                             │
             ┌───────────────┼───────────────┐
             ↓               ↓               ↓
         MongoDB          Groq AI         SerpApi
             │               │               │
             │               │               ↓
             │               │         Local Places
             │               │
             │               ↓
             │          Trip Planning
             │
             ↓
      Property & Booking Data
```

# Getting Started

## Prerequisites

Before running the project, make sure you have:

- Node.js
- npm
- MongoDB
- Git

You will also need the required API keys and environment variables for the services used by the application.

## Installation

Clone the repository:

```bash
git clone https://github.com/nissislessor123-art/HomelyHub.git
cd HomelyHub
```



Install the frontend and backend dependencies:

```bash
cd frontend
npm install

cd ../backend
npm install
```

## Environment Variables

The project uses environment variables for API keys and other configuration values.

For example, the SerpApi key is accessed from the backend using:

```js
process.env.SERPAPI_KEY
```
Keep your API keys private and do not commit them to GitHub.

The project uses environment files such as:

```text
.env
.env.local
```
These files are excluded from Git using `.gitignore`.

---

# Running the Project

Start the backend using the development/start script provided in the backend `package.json`.

Then start the frontend using the script provided in the frontend `package.json`.

For local development, the frontend is configured to send `/api` requests to the local backend.


# Project Background

HomelyHub was developed as a full-stack web application before being extended for the **SerpApi India Hackathon 2026**.

For the hackathon's **Travel & Local Discovery** track, I extended the existing project by adding SerpApi-powered local discovery to Trip Genie.

The existing property, booking, AI, image, and map functionality remains part of HomelyHub. The hackathon work focuses specifically on improving the travel-planning experience through SerpApi's local search capabilities.


# AI & Service Usage

| Service | Used For |
|---|---|
| **SerpApi** | Local place discovery through Google Maps search |
| **Groq / AI** | Trip planning and AI-assisted property descriptions |
| **ImageKit** | Property image handling |
| **Leaflet + OpenStreetMap** | Property location maps |
| **MongoDB** | Application data |
| **Postman** | Backend API testing during development |


# Future Improvements

Some features I would like to explore in future versions include:

- More personalized travel recommendations
- Better itinerary customization
- More travel search categories
- Improved property recommendations
- More detailed map features
- Additional booking features
- Better integration between stays and travel planning



# Project Status

HomelyHub is an ongoing full-stack project.

The current version combines property-related features with AI functionality and a travel-planning experience powered by SerpApi local discovery.
