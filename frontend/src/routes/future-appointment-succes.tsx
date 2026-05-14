import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/future-appointment-succes')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="relative mx-auto max-w-[640px] pb-[192px]">
      <header className="h-[277px] w-full rounded-b-2xl bg-primary px-4 pt-12">
        <h1 className="mb-[3px] whitespace-nowrap text-center font-jakarta text-xl font-bold leading-[25.2px] text-white">
          Booking Details
        </h1>
        <p className="whitespace-nowrap text-center font-jakarta font-semibold leading-[20.16px] text-primary-light">
          Appointment Secure
        </p>
      </header>
      <section
        id="ContainertDetails"
        className="-mt-[149px] w-full space-y-4 pb-4"
      >
        <section
          id="DetailsAppointment"
          className="mx-4 overflow-hidden rounded-3xl"
        >
          <div
            role="alert"
            className="alert -mb-[22px] flex items-center gap-x-3 rounded-t-3xl border-[1.5px] border-white bg-[linear-gradient(100.99deg,#277B53_0%,#277B7B_100%)] px-5 pb-[46px] pt-6"
          >
            <img
              src="assets/icons/futureappointment-alert-succes.svg"
              alt="Icon"
            />
            <div>
              <h2 className="mb-1 font-jakarta text-xl font-bold leading-[25.2px] text-white">
                Your Order Is Succes
              </h2>
              <p className="font-jakarta font-semibold leading-[20.16px] text-accent-teal">
                Your order is confirmed.
              </p>
            </div>
          </div>
          <div className="details-appointment rounded-3xl bg-white p-5">
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
          </div>
        </section>
        <section
          id="PaymentDetails"
          className="w-full space-y-4 rounded-3xl bg-white px-4 py-8"
        >
          <h2 className="font-jakarta text-xl font-bold leading-[25.2px] text-gray-900">
            Payment Details
          </h2>
          <div className="w-full space-y-4 rounded-3xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Booking Code
              </p>
              <strong>
                <p className="bg-[#2C40FF17] p-[6px] font-jakarta text-lg font-bold leading-[22.68px] text-primary">
                  SEHAT1935
                </p>
              </strong>
            </div>
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
        <section
          id="Location"
          className="w-full rounded-3xl bg-white px-4 py-8"
        >
          <h2 className="mb-4 font-jakarta text-xl font-bold leading-[25.2px] text-gray-900">
            Check-Up Location
          </h2>
          <div id="ContainerMap" className="relative">
            <div
              id="Map"
              className="h-[280px] w-full max-w-full overflow-hidden rounded-3xl"
            >
              <div id="my-map-canvas" className="h-full w-full max-w-full">
                <iframe
                  className="h-full w-full border-none"
                  src="https://www.google.com/maps/embed/v1/place?q=jakarta&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                ></iframe>
              </div>
              <a
                className="our-googlemap-code"
                rel="nofollow"
                href="https://www.bootstrapskins.com/themes"
                id="authmaps-data"
              >
                premium bootstrap themes
              </a>
            </div>
            <div id="CtaMap" className="absolute bottom-4 w-full px-4">
              <div className="flex items-center justify-between rounded-2xl bg-white p-3">
                <div className="flex items-center gap-[10px]">
                  <img
                    src="assets/icons/doctordetails-location-map.svg"
                    alt="Icon"
                  />
                  <div>
                    <h3 className="mb-1 font-jakarta text-[18px] font-bold leading-[22.68px] text-gray-900">
                      Radiant Hospital
                    </h3>
                    <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                      Jakarta, Indonesia
                    </p>
                  </div>
                </div>
                <a
                  href="#"
                  className="font-jakarta text-sm font-semibold leading-[17.64px] text-primary"
                >
                  See Map
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>
      <nav id="Cta" className="fixed bottom-0 left-0 right-0 z-30">
        <div className="mx-auto max-w-[640px]">
          <div className="h-[192px] w-full space-y-4 rounded-t-3xl bg-white px-4 py-8">
            <a
              href="doctor-search"
              className="block w-full rounded-full bg-primary py-[18px] text-center font-jakarta font-bold leading-[20.16px] text-white"
            >
              Make Another Appointment
            </a>
            <a
              href="/"
              className="block w-full rounded-full bg-[#2C40FF17] py-[18px] text-center font-jakarta font-bold leading-[20.16px] text-primary"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </nav>
    </main>
  )
}
