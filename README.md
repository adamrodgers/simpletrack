# Sarah's CRM

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-v18.0.0-blue)
![NextJS](https://img.shields.io/badge/NextJS-v12.0.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.0.0-blue)
![HeroIcons](https://img.shields.io/badge/HeroIcons-v2.0.0-blue)
![NextAuth](https://img.shields.io/badge/NextAuth-v4.0.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v4.4.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-v16.0.0-blue)

Sarah's CRM is a custom Customer Relationship Management system designed for tracking potential insurance leads. This application is built using modern web technologies such as React, NextJS, Tailwind CSS, NextAuth for authentication, HeroIcons for icons, MongoDB for the database, and Node.js for the server.

## Features

- **Authentication**: Secure login using Google with NextAuth.
- **Lead Management**: Add, edit, delete, and view insurance leads.
- **Responsive Design**: Fully responsive design using Tailwind CSS.
- **Icons**: Beautiful icons provided by HeroIcons v2.
- **Database**: MongoDB for efficient and scalable data storage.

## Tech Stack

- **React**: Front-end library for building user interfaces.
- **NextJS**: React framework for server-side rendering and static site generation.
- **NextAuth**: Authentication for Next.js applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **HeroIcons**: Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.
- **MongoDB**: NoSQL database for storing lead information.
- **Node.js**: JavaScript runtime for server-side programming.

## Screenshots

![Screenshot 1](https://github.com/adamrodgrs/sarahcrm/assets/80862221/0e27f32b-b81c-4d3e-871e-17bffb4a3cab)

![Screenshot 2](https://github.com/adamrodgrs/sarahcrm/assets/80862221/49de24f9-959e-435b-831b-6ce4f278a4bd)

![Screenshot 3](https://github.com/adamrodgrs/sarahcrm/assets/80862221/bc578fe2-461b-482e-8b01-4878fd80be0a)

## Getting Started

### Prerequisites

- Node.js v16.x
- npm v7.x

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/sarah-crm.git
   cd sarah-crm
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add your environment variables.

   ```plaintext
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   MONGODB_URI=your-mongodb-uri
   MONGODB_DB=your-mongodb-database
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   ```plaintext
   Open http://localhost:3000 with your browser to see the result.
   ```

## Usage

- **Sign In**: Use your Google account to sign in.
- **Dashboard**: View and manage your insurance leads.
- **Add Lead**: Add new leads with detailed information.
- **Edit Lead**: Update existing lead information.
- **Delete Lead**: Remove leads that are no longer relevant.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth](https://next-auth.js.org/)
- [HeroIcons](https://heroicons.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
