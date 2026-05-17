import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/payment-details')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="relative mx-auto max-w-[640px] pb-[120px]">
      <header className="h-[274px] w-full rounded-b-2xl bg-primary px-4 pt-12">
        <a href="booking-confirmation">
          <img src="assets/icons/arrow-left-blue.svg" alt="Icon" />
        </a>
        <div className="absolute left-1/2 top-12 -translate-x-1/2">
          <h1 className="mb-[3px] whitespace-nowrap text-center font-jakarta text-xl font-bold leading-[25.2px] text-white">
            Payment Details
          </h1>
          <p className="whitespace-nowrap text-center font-jakarta font-semibold leading-[20.16px] text-primary-light">
            Complete the payment
          </p>
        </div>
      </header>
      <section
        id="ContainertDetails"
        className="-mt-[146px] w-full space-y-4 pb-4"
      >
        <section
          id="DetailsAppointment"
          className="mx-4 rounded-3xl bg-white p-5"
        >
          <h2 className="mb-4 font-jakarta text-xl font-bold leading-[25.2px] text-gray-900">
            Details Appointment
          </h2>
          <div className="mb-4 w-full space-y-4 rounded-3xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-[2px] font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                  31 Aug 2024
                </h3>
                <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                  Doctor Available
                </p>
              </div>
              <img
                src="assets/icons/doctordetails-doctor-available.svg"
                alt="Icon"
              />
            </div>
            <hr className="w-full border-gray-200" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-[2px] font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                  13:00 PM
                </h3>
                <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                  Appointment Time
                </p>
              </div>
              <img
                src="assets/image/bookingconfirm-clock-nonactive.png"
                alt="Icon"
                className="size-6"
              />
            </div>
            <hr className="w-full border-gray-200" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-[2px] font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                  Radiant Hospital
                </h3>
                <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                  Appointment Location
                </p>
              </div>
              <img
                src="assets/image/doctordetails-college-graduate.png"
                alt="Image"
                className="size-6"
              />
            </div>
          </div>
          <div
            id="Doctor"
            className="flex w-full items-center gap-3 rounded-3xl bg-[#2C40FF08] p-4"
          >
            <div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-gray-300">
              <img
                src="assets/image/paymentdetails-dr-raze-invoker.png"
                alt="Image"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="mb-1 font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                Dr. Raze Invoker
              </h3>
              <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Internist Specialist
              </p>
            </div>
          </div>
        </section>
        <section
          id="PaymentDetails"
          className="mb-4 w-full space-y-4 rounded-3xl bg-white px-4 py-8"
        >
          <h2 className="font-jakarta text-xl font-bold leading-[25.2px] text-gray-900">
            Payment Details
          </h2>
          <div className="w-full space-y-4 rounded-3xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Duration
              </p>
              <p className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                1 Hour
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Price
              </p>
              <p className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                Rp 240.000
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                PPN 11%
              </p>
              <p className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                Rp 10.000
              </p>
            </div>
            <hr className="w-full border-gray-200" />
            <div className="flex items-center justify-between">
              <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Grand Total
              </p>
              <p className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                Rp 249.675
              </p>
            </div>
          </div>
        </section>
        <form action="succes-page" method="">
          <section
            id="BankTransfer"
            className="mb-4 w-full rounded-3xl bg-white px-4 py-8"
          >
            <h2 className="mb-6 font-jakarta text-xl font-bold leading-[25.2px] text-gray-900">
              Bank Transfer
            </h2>
            <div className="container-input-bank space-y-6">
              <div
                id="Bca"
                className="group w-full space-y-4 rounded-2xl border border-gray-200 bg-white px-4 py-6 transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary"
              >
                <label className="flex items-center justify-between">
                  <img
                    src="assets/image/paymentdetails-bca.png"
                    alt="Image"
                    className="h-[40px] w-[80px]"
                    loading="lazy"
                  />
                  <input
                    required
                    type="radio"
                    name="banking"
                    className="size-6 rounded-full p-1 accent-primary"
                  />
                </label>
                <hr className="hidden w-full border-gray-200 group-has-[:checked]:block" />
                <button
                  id="bcaCopy"
                  className="hidden w-full cursor-pointer items-center justify-between group-has-[:checked]:flex"
                >
                  <div>
                    <p
                      id="bcaTitle"
                      className="mb-1 font-jakarta font-semibold leading-[20.16px] text-gray-500"
                    >
                      Sehat - BCA Bank
                    </p>
                    <p
                      id="bcaNumber"
                      className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900"
                    >
                      1935 0009 1200
                    </p>
                  </div>
                  <img src="assets/icons/paymentdetails-copy.svg" alt="Icon" />
                </button>
              </div>
              <div
                id="Bni"
                className="group w-full space-y-4 rounded-2xl border border-gray-200 bg-white px-4 py-6 transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary"
              >
                <label className="flex items-center justify-between">
                  <img
                    src="assets/image/paymentdetails-bni.png"
                    alt="Image"
                    className="h-[40px] w-[80px]"
                    loading="lazy"
                  />
                  <input
                    required
                    type="radio"
                    name="banking"
                    className="size-6 rounded-full p-1 accent-primary"
                  />
                </label>
                <hr className="hidden w-full border-gray-200 group-has-[:checked]:block" />
                <button
                  id="bniCopy"
                  className="hidden w-full cursor-pointer items-center justify-between group-has-[:checked]:flex"
                >
                  <div>
                    <p
                      id="bniTitle"
                      className="mb-1 font-jakarta font-semibold leading-[20.16px] text-gray-500"
                    >
                      Sehat - BNI Bank
                    </p>
                    <p
                      id="bniNumber"
                      className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900"
                    >
                      1111 0009 1200
                    </p>
                  </div>
                  <img src="assets/icons/paymentdetails-copy.svg" alt="Icon" />
                </button>
              </div>
              <div
                id="Bri"
                className="group w-full space-y-4 rounded-2xl border border-gray-200 bg-white px-4 py-6 transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary"
              >
                <label className="flex items-center justify-between">
                  <img
                    src="assets/image/paymentdetails-bri.png"
                    alt="Image"
                    className="h-[40px] w-[80px]"
                    loading="lazy"
                  />
                  <input
                    required
                    type="radio"
                    name="banking"
                    className="size-6 rounded-full p-1 accent-primary"
                  />
                </label>
                <hr className="hidden w-full border-gray-200 group-has-[:checked]:block" />
                <button
                  id="briCopy"
                  className="hidden w-full cursor-pointer items-center justify-between group-has-[:checked]:flex"
                >
                  <div>
                    <p
                      id="briTitle"
                      className="mb-1 font-jakarta font-semibold leading-[20.16px] text-gray-500"
                    >
                      Sehat - BRI Bank
                    </p>
                    <p
                      id="briNumber"
                      className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900"
                    >
                      2222 0009 1200
                    </p>
                  </div>
                  <img src="assets/icons/paymentdetails-copy.svg" alt="Icon" />
                </button>
              </div>
            </div>
          </section>
          <section
            id="BankAccount"
            className="mb-4 w-full space-y-6 rounded-3xl bg-white px-4 py-8"
          >
            <h2 className="font-jakarta text-xl font-bold leading-[25.2px] text-gray-900">
              Your Bank Account
            </h2>
            <label id="BankName" className="block">
              <p className="mb-3 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Bank Name
              </p>
              <div className="relative">
                <select
                  required
                  className="peer h-[56px] w-full appearance-none rounded-[100px] border border-gray-200 bg-white pl-12 font-jakarta font-bold leading-[20.16px] text-gray-500 transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary focus:outline-none"
                >
                  <option value="" disabled selected>
                    What Your Bank?
                  </option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="BCA">BCA</option>
                  <option value="BNI">BNI</option>
                  <option value="BRI">BRI</option>
                </select>
                <img
                  src="assets/icons/paymentdetails-input-bank-nonactive.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 peer-invalid:opacity-100"
                />
                <img
                  src="assets/icons/paymentdetails-input-bank-active.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 peer-valid:opacity-100"
                />
              </div>
            </label>
            <label id="BankAccountName" className="block">
              <p className="mb-3 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Bank Account Name
              </p>
              <div className="relative">
                <input
                  type="text"
                  id="inputBankAccountName"
                  value=""
                  required
                  placeholder="Your Bank Account Name"
                  name="bankAccountName"
                  className="peer h-[56px] w-full rounded-[100px] border border-gray-200 bg-white pl-12 font-jakarta font-bold leading-[20.16px] text-gray-900 transition-all duration-300 placeholder:font-jakarta placeholder:font-bold placeholder:leading-[20.16px] placeholder:text-gray-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary focus:outline-none"
                />
                <img
                  src="assets/icons/bookingconfirm-people-nonactive.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />
                <img
                  src="assets/icons/bookingconfirm-people-active.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 peer-placeholder-shown:opacity-0"
                />
              </div>
            </label>
            <label id="BankAccountNumber" className="block">
              <p className="mb-3 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Bank Account Number
              </p>
              <div className="relative">
                <input
                  type="text"
                  value=""
                  required
                  placeholder="Your Bank Account Number"
                  name="inputBankAccountNumber"
                  id="inputBankAccountNumber"
                  className="peer h-[56px] w-full rounded-[100px] border border-gray-200 bg-white pl-12 font-jakarta font-bold leading-[20.16px] text-gray-900 transition-all duration-300 placeholder:font-jakarta placeholder:font-bold placeholder:leading-[20.16px] placeholder:text-gray-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary focus:outline-none"
                />
                <img
                  src="assets/icons/paymentdetails-input-wallet-nonactive.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />
                <img
                  src="assets/icons/paymentdetails-input-wallet-active.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 peer-placeholder-shown:opacity-0"
                />
              </div>
            </label>
            <label id="Image" htmlFor="file-upload" className="block">
              <p className="mb-3 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Upload Your Payment Of Proof
              </p>
              <div className="relative rounded-[100px] border border-gray-200 bg-white py-[18px] transition-all duration-300 placeholder:font-jakarta placeholder:font-bold placeholder:leading-[20.16px] placeholder:text-gray-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary focus:outline-none">
                <p
                  id="upload"
                  className="absolute left-12 top-1/2 -translate-y-1/2 py-[18px] font-jakarta font-bold leading-[20.16px] text-gray-500"
                >
                  Upload Image
                </p>
                <input
                  required
                  type="file"
                  value=""
                  name="file-upload"
                  id="file-upload"
                  className="peer invisible w-full pl-12 font-jakarta font-bold leading-[20.16px] text-gray-900 file:hidden"
                />
                <img
                  src="assets/icons/paymentdetails-input-image-nonactive.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />
                <img
                  src="assets/icons/paymentdetails-input-image-active.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 peer-valid:opacity-100"
                />
                <img
                  src="assets/icons/paymentdetails-input-image-download.svg"
                  alt="Icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
            </label>
          </section>
          <section
            id="PersonalInformations"
            className="relative -mb-6 w-full space-y-6 rounded-3xl bg-white px-4 py-8"
          >
            <h2 className="font-jakarta text-xl font-bold leading-[25.2px] text-gray-900">
              Personal Informations
            </h2>
            <label id="FullName" className="block">
              <p className="mb-3 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Full Name
              </p>
              <div className="relative">
                <input
                  value=""
                  id="fullName"
                  type="text"
                  required
                  placeholder="Full Name"
                  name="fullName"
                  className="peer h-[56px] w-full rounded-[100px] border border-gray-200 bg-white pl-12 font-jakarta font-bold leading-[20.16px] text-gray-900 transition-all duration-300 placeholder:font-jakarta placeholder:font-bold placeholder:leading-[20.16px] placeholder:text-gray-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary focus:outline-none"
                />
                <img
                  src="assets/icons/bookingconfirm-people-nonactive.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />
                <img
                  src="assets/icons/bookingconfirm-people-active.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 peer-placeholder-shown:opacity-0"
                />
              </div>
            </label>
            <label id="Email" className="block">
              <p className="mb-3 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Email Address
              </p>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value=""
                  required
                  placeholder="Write Your Email"
                  name="email"
                  className="peer h-[56px] w-full rounded-[100px] border border-gray-200 bg-white pl-12 font-jakarta font-bold leading-[20.16px] text-gray-900 transition-all duration-300 placeholder:font-jakarta placeholder:font-bold placeholder:leading-[20.16px] placeholder:text-gray-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary focus:outline-none"
                />
                <img
                  src="assets/icons/paymentdetails-email-nonactive.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />
                <img
                  src="assets/icons/paymentdetails-email-active.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 peer-placeholder-shown:opacity-0"
                />
              </div>
            </label>
            <label id="PhoneNumber" className="block">
              <p className="mb-3 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Phone No.
              </p>
              <div className="relative">
                <input
                  type="tel"
                  value=""
                  required
                  placeholder="+62 | Enter your phone number"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="peer h-[56px] w-full rounded-[100px] border border-gray-200 bg-white pl-12 font-jakarta font-bold leading-[20.16px] text-gray-900 transition-all duration-300 placeholder:font-jakarta placeholder:font-bold placeholder:leading-[20.16px] placeholder:text-gray-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white hover:border-primary focus:outline-none"
                />
                <img
                  src="assets/icons/paymentdetails-phone-nonactive.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />
                <img
                  src="assets/icons/paymentdetails-phone-active.svg"
                  alt="Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 peer-placeholder-shown:opacity-0"
                />
              </div>
            </label>
          </section>
          <section
            role="alert"
            className="h-[116px] w-full rounded-b-3xl bg-[linear-gradient(100.99deg,_#277B53_0%,_#277B7B_100%)] px-4 pb-6 pt-12"
          >
            <h3 className="text-center font-jakarta font-bold leading-[22.4px] text-white">
              We will send the receipt to this Email. Please enter the correct
              information.
            </h3>
          </section>
          <nav id="Cta" className="fixed bottom-0 left-0 right-0 z-30">
            <div className="mx-auto max-w-[640px]">
              <div className="flex h-[120px] w-full items-center justify-between space-x-2 rounded-t-3xl bg-white px-4">
                <div>
                  <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                    Grandtotal:
                  </p>
                  <p className="mb-[2px] whitespace-nowrap font-jakarta text-[24px] font-bold leading-[30.24px] text-accent-red">
                    Rp 240.000
                  </p>
                </div>
                <button
                  type="submit"
                  id="payNow"
                  className="flex h-[52px] w-[197px] items-center justify-center rounded-[100px] bg-primary font-jakarta font-bold leading-[20.16px] text-white transition-all duration-300"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </nav>
        </form>
      </section>
    </main>
  )
}
