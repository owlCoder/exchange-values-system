import CreditCardForm from '../CreditCard/CreditCardForm';

const Verification: React.FC = () => {
  return (
    <>
      <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
            Let’s Confirm!
            <p className="font-light md:-pt-12 text-gray-500 md:text-lg dark:text-gray-400">Complete verification process entering credit card details.</p>
          </h1>
          <div className="space-y-4 md:space-y-6">
            <CreditCardForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
