import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/doctor-details')({
  component: DoctorDetailsPage,
})

function DoctorDetailsPage() {
  return (
    <main className="relative mx-auto max-w-[640px] pb-[120px]">
      <header className="h-[219px] w-full rounded-b-2xl bg-primary px-4 pt-12">
        <a href="search-result">
          <img src="assets/icons/arrow-left-blue.svg" alt="Icon" />
        </a>
        <div className="absolute left-1/2 top-12 -translate-x-1/2">
          <h1 className="mb-[3px] whitespace-nowrap text-center font-jakarta text-xl font-bold leading-[25.2px] text-white">
            Doctor Details
          </h1>
          <p className="whitespace-nowrap text-center font-jakarta font-semibold leading-[20.16px] text-primary-light">
            We provide top doctors.
          </p>
        </div>
      </header>
      <section
        id="ContainerDetails"
        className="-mt-[91px] w-full space-y-4 pb-4"
      >
        <section id="Card" className="mx-4 space-y-5 rounded-3xl bg-white p-5">
          <div id="CardHeader" className="flex items-center gap-x-[12px]">
            <div className="relative h-[120px] w-[100px]">
              <img
                className="rounded-ee-md rounded-es-3xl rounded-se-3xl rounded-ss-md bg-gray-100 object-cover"
                src="assets/image/searchresult-dr-raze-invoker.png"
                alt="Image"
              />
              <img
                className="absolute left-2 top-2"
                src="assets/icons/alert-online.svg"
                alt="Icon"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-jakarta font-bold leading-[20.16px] text-primary">
                Radiant Hospital
              </h3>
              <h2 className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                Dr. Raze Invoker
              </h2>
              <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Internist Specialist
              </p>
            </div>
          </div>
          <div
            id="CardInfo"
            className="flex items-center justify-evenly rounded-2xl border border-gray-200 py-4"
          >
            <div className="grid w-[80.33px] place-items-center">
              <div className="mb-1 flex gap-[2px]">
                <img src="assets/icons/searchresult-verify.svg" alt="Icon" />
                <h4 className="font-jakarta font-bold leading-[20.16px] text-gray-900">
                  Verify
                </h4>
              </div>
              <p className="font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500">
                Certified
              </p>
            </div>
            <hr className="w-[36px] rotate-90 border-gray-200" />
            <div className="grid w-[80.33px] place-items-center">
              <div className="mb-1 flex gap-[2px]">
                <img src="assets/icons/searchresult-5-years.svg" alt="Icon" />
                <h4 className="font-jakarta font-bold leading-[20.16px] whitespace-nowrap text-gray-900">
                  5 Years
                </h4>
              </div>
              <p className="font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500">
                Experience
              </p>
            </div>
            <hr className="w-[36px] rotate-90 border-gray-200" />
            <div className="grid w-[80.33px] place-items-center">
              <div className="mb-1 flex gap-[2px]">
                <img src="assets/icons/searchresult-4.5.svg" alt="Icon" />
                <h4 className="font-jakarta font-bold leading-[20.16px] text-gray-900">
                  4.5
                </h4>
              </div>
              <p className="font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500">
                Rating
              </p>
            </div>
          </div>
        </section>
        <section id="About" className="w-full rounded-3xl bg-white px-4 py-8">
          <h2 className="mb-4 font-jakarta text-xl font-bold leading-[25.2px] text-gray-900">
            About Doctor
          </h2>
          <div className="w-full space-y-4 rounded-3xl border border-gray-200 p-6">
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
                  S2 Ascent University
                </h3>
                <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                  College graduate
                </p>
              </div>
              <img
                src="assets/image/doctordetails-college-graduate.png"
                alt="Image"
                className="size-6"
              />
            </div>
            <hr className="w-full border-gray-200" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-[2px] font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                  Nobel Prize in Medicine
                </h3>
                <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                  Official Achievement
                </p>
              </div>
              <img
                src="assets/image/doctordetails-official-achievement.png"
                alt="Image"
                className="size-6"
              />
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
        <section id="Reviews" className="w-full rounded-3xl bg-white px-4 py-8">
          <div className="mb-4 flex justify-between">
            <h2 className="font-jakarta text-xl font-bold leading-[25.2px] text-gray-900">
              Reviews and Ratings
            </h2>
            <a
              href="#"
              className="font-jakarta text-sm font-bold leading-[17.64px] text-gray-500"
            >
              View All
            </a>
          </div>
          <div className="space-y-6 rounded-3xl border border-gray-200 p-6">
            <div id="rating" className="flex items-center justify-between">
              <strong className="font-jakarta text-[40px] font-extrabold leading-[50.4px] tracking-[-8%] text-black">
                4.5/5.0
              </strong>
              <div>
                <img
                  src="assets/icons/doctordetails-stars.svg"
                  alt="Icon"
                  className="mb-2"
                  loading="lazy"
                />
                <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                  1250+ Reviews
                </p>
              </div>
            </div>
            <hr className="w-full border-gray-200" />
            <article id="Review1">
              <div className="mb-[21px] flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="assets/image/doctordetails-nabila-geeqo.png"
                    alt="Icon"
                    className="mr-3 size-[62px] rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="mb-1 font-jakarta font-bold leading-[22.68px] text-gray-900">
                      Nabila Geeqo
                    </h3>
                    <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                      30 min ago
                    </p>
                  </div>
                </div>
                <div className="flex h-8 w-[61px] items-center rounded-md bg-[#FFB06317] p-[6px]">
                  <img
                    src="assets/icons/doctordetails-star-yellow.svg"
                    alt="Icon"
                    className="mr-[2px]"
                    loading="lazy"
                  />
                  <p className="font-jakarta font-bold leading-[20.16px] text-accent-orange">
                    4.5
                  </p>
                </div>
              </div>
              <p className="font-jakarta font-semibold leading-[25.6px] text-gray-500">
                "Excellent service! Dr. Raze Invoker was attentive and thorough.
                The clinic was clean, and the staff were friendly. Highly
                recommend for in-person care!"
              </p>
            </article>
            <hr className="w-full border-gray-200" />
            <article id="Review2">
              <div className="mb-[21px] flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="assets/image/doctordetails-dire-clove.png"
                    alt="Image"
                    className="mr-3 size-[62px] rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="mb-1 font-jakarta font-bold leading-[22.68px] text-gray-900">
                      Dire Clove
                    </h3>
                    <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                      A week ago
                    </p>
                  </div>
                </div>
                <div className="flex h-8 w-[61px] items-center rounded-md bg-[#FFB06317] p-[6px]">
                  <img
                    src="assets/icons/doctordetails-star-yellow.svg"
                    alt="Icon"
                    className="mr-[2px]"
                    loading="lazy"
                  />
                  <p className="font-jakarta font-bold leading-[20.16px] text-accent-orange">
                    5.0
                  </p>
                </div>
              </div>
              <p className="font-jakarta font-semibold leading-[25.6px] text-gray-500">
                "Quick and easy appointment! Dr. Raze Invoker was professional,
                and the staff made me feel comfortable. Highly recommend!"
              </p>
            </article>
          </div>
        </section>
      </section>
      <nav id="Cta" className="fixed bottom-0 left-0 right-0 z-30">
        <div className="mx-auto max-w-[640px]">
          <div className="flex h-[120px] w-full items-center justify-between space-x-2 rounded-t-3xl bg-white px-4">
            <div>
              <p className="mb-[2px] whitespace-nowrap font-jakarta text-[24px] font-bold leading-[30.24px] text-accent-red">
                Rp 240.000
              </p>
              <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                /hours
              </p>
            </div>
            <a
              href="booking-confirmation"
              className="flex h-[52px] w-[197px] items-center justify-center rounded-[100px] bg-primary font-jakarta font-bold leading-[20.16px] text-white"
            >
              Book Now
            </a>
          </div>
        </div>
      </nav>
    </main>
  )
}
