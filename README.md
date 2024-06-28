# Easy CRM

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-v18.2.0-blue)
![NextJS](https://img.shields.io/badge/NextJS-v14.2.3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4.3-blue)
![HeroIcons](https://img.shields.io/badge/HeroIcons-v2.1.3-blue)
![NextAuth](https://img.shields.io/badge/NextAuth-v4.24.7-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v6.6.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-v16.0.0-blue)
![FontAwesome](https://img.shields.io/badge/FontAwesome-v6.5.2-blue)
![MaterialTailwind](https://img.shields.io/badge/MaterialTailwind-v2.1.9-blue)

Easy CRM is a custom Customer Relationship Management system designed for tracking potential insurance leads. This application is built using modern web technologies such as React, NextJS, Tailwind CSS, NextAuth for authentication, HeroIcons and FontAwesome for icons, MongoDB for the database, and Node.js for the server.

## Features

- **Authentication**: Secure login using Google with NextAuth.
- **Lead Management**: Add, edit, delete, and view insurance leads.
- **Responsive Design**: Fully responsive design using Tailwind CSS.
- **Icons**: Beautiful icons provided by HeroIcons and FontAwesome.
- **Database**: MongoDB for efficient and scalable data storage.

## Tech Stack

- **React**: Front-end library for building user interfaces.
- **NextJS**: React framework for server-side rendering and static site generation.
- **NextAuth**: Authentication for Next.js applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **HeroIcons**: Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.
- **FontAwesome**: Icon library providing a wide range of icons.
- **Material Tailwind**: Material Design components for Tailwind CSS.
- **MongoDB**: NoSQL database for storing lead information.
- **Node.js**: JavaScript runtime for server-side programming.

## Screenshots

![Screenshot 1](https://github.com/adamrodgrs/easycrm/assets/80862221/0e27f32b-b81c-4d3e-871e-17bffb4a3cab)

![Screenshot 2](https://github.com/adamrodgrs/easycrm/assets/80862221/e8f7e1d9-c9a9-4fee-8eaa-f2dbe5d6fa5b)

![Screenshot 3](https://github.com/adamrodgrs/easycrm/assets/80862221/02ac8165-8901-4dda-b98f-5a9827da1a04)

## Getting Started

### Prerequisites

- Node.js v16.x
- npm v7.x

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/easycrm.git
   cd easycrm
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
- [FontAwesome](https://fontawesome.com/)
- [Material Tailwind](https://material-tailwind.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
