# Text2Pic

**Turn Your Words into Striking Images Instantly**

---

## Description

**Text2Pic** is a full-stack web application that leverages advanced AI models to convert user-provided text prompts into unique, visually appealing images. It empowers users to bring their ideas to life without graphic design skills or complex software, making creative visual content generation accessible to everyone.

- **What does it do?**  
  Converts text prompts into images using AI.

- **What problem does it solve?**  
  Enables quick, creative image generation for users who need visual assets but lack design expertise.

- **Main purpose/goal:**  
  To provide an intuitive platform for AI-powered image synthesis and demonstrate proficiency in web development, API integration, and machine learning deployment.

---

## Features

- Convert text prompts into diverse images
- Supports multiple artistic styles and interpretations
- Preview and download generated images
- User authentication and profile management
- Credit-based usage system with payment integration (Razorpay)
- Responsive design for mobile and desktop
- Clean, intuitive user interface

---

## Technologies Used

**Frontend:**  
- React.js  
- JavaScript  
- HTML5  
- CSS3  
- Tailwind CSS  
- Framer Motion  
- React Router  
- Axios  
- React Toastify

**Backend:**  
- Node.js (Express.js)  
- MongoDB (Mongoose)  
- JWT Authentication  
- Razorpay API (for payments)  
- dotenv

**AI/ML:**  
- ClipDrop API (Text-to-Image generation)

**Other Tools/Platforms:**  
- Git & GitHub  
- RESTful APIs

---

## Installation and Setup

### Prerequisites

- Node.js (v14+)
- npm
- Git
- MongoDB (local or cloud instance)
- ClipDrop API Key
- Razorpay API Keys

### Steps

1. **Clone the repository:**
   ```
   git clone https://github.com/GARVCHOUHAN/Text2Pic.git
   ```

2. **Navigate to the project directory:**
   ```
   cd Text2Pic
   ```

3. **Install backend dependencies:**
   ```
   cd server
   npm install
   ```

4. **Install frontend dependencies:**
   ```
   cd ../client
   npm install
   ```

5. **Create a `.env` file in the `server` directory:**
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIPDROP_API=your_clipdrop_api_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

6. **Start the backend server:**
   ```
   cd ../server
   npm start
   ```

7. **Start the frontend application:**
   ```
   cd ../client
   npm run dev
   ```

---

## Usage

1. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).
2. Register or log in to your account.
3. Enter a text prompt in the input field and click "Generate".
4. Preview the generated image.
5. Download the image using the provided button.
6. Purchase more credits if needed via the "Buy Credits" page.

---

## Screenshots / Demo

*Screenshots and demo video will be added soon.*

<!-- Example:
![Main Interface](assets/screenshot-main.png)
[Watch Demo Video](https://www.youtube.com/your-demo-link)
-->

---

## Contributing

Contributions are welcome!  
To contribute:

1. Fork the repository.
2. Create your feature branch:
   ```
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## Acknowledgements

- Powered by [ClipDrop API](https://clipdrop.co/apis/text-to-image).
- Payment integration via [Razorpay](https://razorpay.com/).
- Frontend design inspired by modern UI/UX best practices.
- Special thanks to [GreatStack.dev](https://greatstack.dev) for inspiration.

---

## Contact / Author

**Garv Chouhan**  
GitHub: [GARVCHOUHAN](https://github.com/GARVCHOUHAN)  
Email: garvchouhan5@gmail.com  
LinkedIn: [Your LinkedIn Profile URL]

---

*Feel free to reach out for questions,
