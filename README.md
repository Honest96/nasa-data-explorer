# NASA Data Explorer

A full-stack web application that connects to NASA's APIs to provide an interactive platform for exploring space imagery and data. Users can browse NASA's Astronomy Picture of the Day (APOD), explore Mars rover photography, and search through NASA's extensive media library.

# Key Features

1. Real-time integration with NASA's APIs.
2. Three main features: APOD, Mars Rover Explorer, and Media Library.
3. Image/video grids, modal details, and filtering/search tools.
4. Mobile-responsive layout with themed design.

# How to Setup the Application

## Prerequisites:

1. Node.js (version 18 or version 20 recommended) Download: https://nodejs.org/
2. npm (comes with Node.js)
3. NASA API key (Download: https://api.nasa.gov/)
4. A terminal (Mac/Linux) or PowerShell for Windows

**_ Avoid Node.js v23 (compatibility issues) - use LTS versions only _**

# Step 1: Clone the Repository

In the terminal: git clone <your repository-url>
cd nasa-data-explorer

To install backend dependecies: cd backend
npm install

To install forntend dependecies: cd ../frontend
npm install

# Step 2: Configure Environment Variables

Create a .env file in the backend directory and add the following configuration:
NASA_API_KEY=your_actual_nasa_api_key (from https://api.nasa.gov/)
PORT=5001
NODE_ENV=development

# How To Start The Application

You need to simultaneously run the backend and frontend servers.
Terminal 1: Start the Backend:
cd backend
npm run dev

Terminal 2: Start the Frontend:
cd frontend
npm start
** Note: The app should run on http://localhost:3000 **

# How To Use The Application

## Astronomy Picture of the Day (APOD)

Explore NASA’s daily photo/video with scientific explanations.

Features:

1. Shows today's astronomy image or video.
2. Use date picker to browse historic content.
3. Read full descriptions with high-resolution imagery.
4. Play and listen to full descriptions of the APOD.

# Mars Rover Explorer

View and Filter through actual images taken on Mars by NASA’s rovers.

Filters:

Rover: Curiosity, Perseverance, Spirit, Opportunity
Camera: FHAZ, RHAZ, NAVCAM, MAST, etc.
Sol: A Martian day number (up to 3000)

Here you can select different tovers, choose different cameras, try out different Sol numbers and scroll through pages of results.

## NASA's Image & Video Library

Search through thousands of media libraries (images, videos & audio).

Filters:

Search Query: (e.g., “Supernova”, “Earth”)
Media Type: image, video, audio

Here you can search using a keyword, filter the results by mages, videos or audio, click a popular search tag and scroll through pages of results.
