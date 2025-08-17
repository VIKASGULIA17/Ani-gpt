# AniGPT - AI CHAT WEB APP 🤖

A modern, feature-rich AI chat application built with React that replicates Google\'s Gemini AI interface. Experience intelligent conversations with persistent chat history, user authentication, and a beautiful responsive design.

![AniGPT Preview](https://ani-gpt.netlify.app/)

## ✨ Features

### 🧠 **AI-Powered Conversations**
- **Google Gemini Integration**: Powered by Gemini 1.5 Flash model for intelligent responses
- **Real-time Chat**: Instant AI responses with typing indicators
- **Custom AI Personality**: Branded as "ani-gpt" with personalized responses
- **Code Generation**: Generate high-quality code snippets in multiple languages
- **Natural Language Processing**: Advanced understanding of human language

### 👤 **User Authentication & Management**
- **Secure Authentication**: Complete login/register system via Supabase
- **Protected Routes**: Secure access to chat features
- **User Profile Management**: Personalized experience for each user
- **Session Persistence**: Stay logged in across browser sessions

### 💾 **Chat History & Persistence**
- **Database Storage**: All chats saved in Supabase PostgreSQL
- **Chat History Sidebar**: Easy navigation through previous conversations
- **Message Timestamps**: Track conversation timeline
- **Chat Management**: Create, view, and delete chat sessions
- **Auto-save**: Real-time saving of conversations

### 🎨 **Modern User Interface**
- **Dark/Light Themes**: Toggle between elegant themes
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Syntax Highlighting**: Beautiful code rendering with React Syntax Highlighter
- **Markdown Support**: Rich text rendering for AI responses
- **Copy to Clipboard**: Easy sharing of code and responses

### 🛠 **Developer Experience**
- **Vite Build System**: Lightning-fast development and builds
- **TypeScript Ready**: Type-safe development environment
- **ESLint Configuration**: Consistent code quality
- **Component Architecture**: Modular and maintainable code structure

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Supabase Account** (for database and authentication)
- **Google AI Studio Account** (for Gemini API key)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gemini-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Gemini AI Configuration
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   
   Run these SQL commands in your Supabase SQL editor:
   
   ```sql
   -- Create chats table
   CREATE TABLE chats (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create messages table
   CREATE TABLE messages (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     prompt TEXT NOT NULL,
     response TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
   ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

   -- Create policies for chats
   CREATE POLICY "Users can view their own chats" ON chats
     FOR SELECT USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can create their own chats" ON chats
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can update their own chats" ON chats
     FOR UPDATE USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can delete their own chats" ON chats
     FOR DELETE USING (auth.uid() = user_id);

   -- Create policies for messages
   CREATE POLICY "Users can view their own messages" ON messages
     FOR SELECT USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can create their own messages" ON messages
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can update their own messages" ON messages
     FOR UPDATE USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can delete their own messages" ON messages
     FOR DELETE USING (auth.uid() = user_id);
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

## 🔧 Configuration

### Getting API Keys

#### Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file

#### Supabase Setup
1. Create a new project at [Supabase](https://supabase.com/)
2. Go to Settings > API
3. Copy your project URL and anon key
4. Add them to your `.env` file
5. Run the provided SQL commands to set up tables

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI responses | ✅ |
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |

## 📁 Project Structure

```
gemini-clone/
├── public/
│   └── vite.svg                 # App favicon
├── src/
│   ├── assets/                  # Static assets
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Radix UI components
│   │   ├── BottomInputSection.jsx
│   │   ├── ChatPage.jsx
│   │   ├── MainContent.jsx
│   │   ├── Navbar.jsx
│   │   ├── ResultSection.jsx
│   │   └── ThemeToggle.jsx
│   ├── config/                  # Configuration files
│   │   ├── gemini.js           # Gemini AI configuration
│   │   └── supabase.js         # Supabase client setup
│   ├── context/                # React Context providers
│   │   ├── Context.jsx         # Main app state
│   │   └── ThemeContext.jsx    # Theme management
│   ├── hooks/                  # Custom React hooks
│   │   └── use-mobile.jsx
│   ├── lib/                    # Utility libraries
│   ├── Pages/                  # Main application pages
│   │   ├── About/
│   │   ├── Auth/               # Authentication pages
│   │   ├── History/
│   │   └── Sidebar/
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles
├── .env                       # Environment variables
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js           # Vite build configuration
└── README.md                # Project documentation
```

## 🎯 Usage

### Getting Started
1. **Register/Login**: Create an account or sign in to access the chat features
2. **Start Chatting**: Click "Start New Chat" to begin a conversation
3. **Ask Questions**: Type your questions or requests in the input field
4. **View History**: Access previous conversations from the sidebar
5. **Theme Toggle**: Switch between dark and light modes using the theme toggle

### Features Guide

#### **Chat Management**
- **New Chat**: Start fresh conversations anytime
- **Chat History**: All conversations are automatically saved
- **Delete Chats**: Remove unwanted conversations
- **Search**: Find specific conversations easily

#### **AI Interactions**
- **Code Generation**: Ask for code examples in any language
- **Problem Solving**: Get help with technical challenges
- **Learning**: Ask questions about programming concepts
- **Creative Writing**: Generate content and ideas

#### **Customization**
- **Themes**: Toggle between light and dark modes
- **Responsive**: Works perfectly on all device sizes
- **Animations**: Smooth transitions enhance the user experience

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

## 🏗 Tech Stack

### **Frontend**
- **React 18**: Modern React with hooks and concurrent features
- **Vite**: Next-generation frontend build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready motion library
- **Radix UI**: Low-level UI primitives

### **Backend & Services**
- **Supabase**: Backend-as-a-Service (Database + Auth)
- **Google Generative AI**: Gemini 1.5 Flash model
- **PostgreSQL**: Relational database via Supabase

### **Development Tools**
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 🤝 Contributing

We welcome contributions to make AniGPT even better! Here\'s how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`npm install`)
4. Set up your environment variables
5. Make your changes
6. Test thoroughly
7. Commit your changes (`git commit -m \'Add amazing feature\'`)
8. Push to your branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

### Contribution Guidelines
- **Code Style**: Follow the existing code style and ESLint rules
- **Testing**: Ensure your changes don\'t break existing functionality
- **Documentation**: Update documentation for any new features
- **Commits**: Use clear, descriptive commit messages
- **Issues**: Check existing issues before creating new ones

### Areas for Contribution
- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🔧 Performance optimizations
- 🧪 Test coverage improvements

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini**: For providing the powerful AI model
- **Supabase**: For the excellent backend-as-a-service platform
- **Vercel**: For inspiration from modern web applications
- **React Community**: For the amazing ecosystem and tools
- **Open Source**: All the amazing libraries that make this possible

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Documentation**: Review this README and inline comments
2. **Search Issues**: Look through existing GitHub issues
3. **Create an Issue**: Report bugs or request features
4. **Community**: Join discussions in the repository

---

**Built with ❤️ by Vikas Gulia**

*Transform your conversations with AI-powered intelligence* 
