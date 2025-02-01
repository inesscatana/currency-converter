import UpholdLogo from '../../assets/icons/uphold-logo.svg';
export default function Header() {
  return (
    <div className="max-w-[42rem] text-center flex flex-col items-center">
      <img
        src={UpholdLogo}
        alt="Uphold Logo"
        className="w-24 h-24 sm:w-32 sm:h-32 mb-6"
      />

      <h1 className="text-2xl sm:text-3xl md:text-4xl text-dark-gray leading-tight">
        Currency Converter
      </h1>

      <p className="text-light-gray text-lg sm:text-xl md:text-2xl leading-normal mt-2 sm:mt-3 md:mt-4">
        Receive competitive and transparent pricing with
        <br /> no hidden spreads. See how we compare.
      </p>
    </div>
  );
}
