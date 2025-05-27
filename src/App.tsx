import Chat from './components/layout/chat/Chat';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';

const App = () => {
	return (
		<main className="flex flex-col justify-between h-screen">
			<Header />
			<Chat />
			<Footer />
		</main>
	);
};

export default App;
