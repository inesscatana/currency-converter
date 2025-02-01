import Header from './components/Header/Header';
import CurrencyInput from './components/Currency/CurrencyInput';

function App() {
  return (
    <div className="flex flex-col items-center px-6 py-10 md:py-14 lg:py-16">
      <Header />
      <div className="mt-8 w-full flex justify-center">
        <CurrencyInput />
      </div>
    </div>
  );
}

export default App;
