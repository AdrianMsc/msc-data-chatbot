import Chat from './components/layout/chat/Chat';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import './App.css'; // Importing the main CSS file for global styles

const App = () => {
	return (
		<main className="main">
			<Header />
			<Chat />
			<Footer />
		</main>
	);
};

export default App;
