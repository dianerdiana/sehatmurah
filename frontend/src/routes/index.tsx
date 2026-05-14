import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <main className="mx-auto max-w-[640px] overflow-hidden pb-[98px]">
        <header>
          <div className="flex items-center justify-between rounded-b-3xl border border-gray-200 bg-white px-4 pb-8 pt-12">
            <a href="#">
              <img
                src="assets/image/homepage-nav-company.png"
                alt="Image"
                className="max-h-[50px]"
              />
            </a>
            <a
              href="#"
              className="flex size-[50px] items-center justify-center shrink-0 rounded-full border border-gray-200"
            >
              <img
                src="assets/icons/homepage-nav-notification.svg"
                alt="Icon"
              />
            </a>
          </div>
          <img
            src="assets/image/homepage-header-banner.png"
            alt="Image"
            className="mx-auto min-h-[183px] min-w-[361px] p-4"
          />
        </header>
        <section id="categories" className="rounded-3xl bg-white px-4 py-8">
          <div className="flex items-center justify-between">
            <h2 className="font-jakarta text-[20px] font-bold leading-[25.2px] text-gray-900">
              Specialist Categories
            </h2>
            <a
              href="search-result"
              className="font-jakarta text-sm font-bold leading-[17.64px] text-gray-500"
            >
              View All
            </a>
          </div>
          <div className="grid grid-cols-3 justify-items-center gap-y-4 pt-4">
            <a href="search-result" className="categori-1 h-[102px] w-[111px]">
              <div className="mx-auto flex size-[72px] items-center justify-center overflow-hidden rounded-3xl">
                <img
                  src="assets/image/homepage-specialist-pediatric.png"
                  alt="Image"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-[10px] text-center font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Pediatric
              </h3>
            </a>
            <a href="search-result" className="categori-2 h-[102px] w-[111px]">
              <div className="mx-auto flex size-[72px] items-center justify-center overflow-hidden rounded-3xl">
                <img
                  src="assets/image/homepage-specialist-cardiology.png"
                  alt="Image"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-[10px] text-center font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Cardiology
              </h3>
            </a>
            <a href="search-result" className="categori-3 h-[102px] w-[111px]">
              <div className="mx-auto flex size-[72px] items-center justify-center overflow-hidden rounded-3xl">
                <img
                  src="assets/image/homepage-specialist-neurology.png"
                  alt="Image"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-[10px] text-center font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Neurology
              </h3>
            </a>
            <a href="search-result" className="categori-4 h-[102px] w-[111px]">
              <div className="mx-auto flex size-[72px] items-center justify-center overflow-hidden rounded-3xl">
                <img
                  src="assets/image/homepage-specialist-obstetrics.png"
                  alt="Image"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-[10px] text-center font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Obstetrics
              </h3>
            </a>
            <a href="search-result" className="categori-5 h-[102px] w-[111px]">
              <div className="mx-auto flex size-[72px] items-center justify-center overflow-hidden rounded-3xl">
                <img
                  src="assets/image/homepage-specialist-dermatology.png"
                  alt="Image"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-[10px] text-center font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Dermatology
              </h3>
            </a>
            <a href="search-result" className="categori-6 h-[102px] w-[111px]">
              <div className="mx-auto flex size-[72px] items-center justify-center overflow-hidden rounded-3xl">
                <img
                  src="assets/image/homepage-specialist-urologist.png"
                  alt="Image"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-[10px] text-center font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Urologist
              </h3>
            </a>
          </div>
        </section>
        <section
          id="Recommended"
          className="mb-4 mt-4 rounded-3xl bg-white py-8"
        >
          <h2 className="pl-4 font-jakarta text-[20px] font-bold leading-[25.2px] text-gray-900">
            Recommended Doctors
          </h2>
          <div id="ContainerTabs">
            <div id="Tabs" className="categoriesSwiper mb-4 mt-4">
              <div className="swiper-wrapper">
                <button
                  type="button"
                  className="tab-button swiper-slide active-tab mx-0 w-[98px] rounded-[100px] bg-[#2C40FF17] px-5 py-[14px] font-jakarta font-bold leading-[20.16px] text-primary transition-all duration-300"
                  data-target-tab="#Latest"
                >
                  Latest
                </button>
                <button
                  type="button"
                  className="tab-button swiper-slide w-[189px] whitespace-nowrap rounded-[100px] border border-gray-200 bg-white px-5 py-[14px] font-jakarta font-semibold leading-[20.16px] text-gray-500 transition-all duration-300"
                  data-target-tab="#PediatricSpecialist"
                >
                  Pediatric Specialist
                </button>
                <button
                  type="button"
                  className="tab-button swiper-slide w-[217px] whitespace-nowrap rounded-[100px] border border-gray-200 bg-white px-5 py-[14px] font-jakarta font-semibold leading-[20.16px] text-gray-500 transition-all duration-300"
                  data-target-tab="#OftalmologiSpecialist"
                >
                  Oftalmologi Specialist
                </button>
              </div>
            </div>
            <div id="TabsContent">
              <div className="latest cardsSwiper">
                <div id="Latest" className="content swiper-wrapper flex">
                  <a
                    href="doctor-details"
                    className="swiper-slide w-[280px] shrink-0 rounded-3xl border border-gray-200"
                  >
                    <div className="relative h-[180px] w-full overflow-hidden rounded-t-3xl">
                      <img
                        src="assets/image/homepage-recommended-dr-marci-maiden.png"
                        alt="Image"
                        className="w-ful h-full"
                      />
                      <img
                        src="assets/icons/homepage-recommended-available.svg"
                        alt="Icon"
                        className="absolute left-4 top-4"
                      />
                    </div>
                    <div className="flex h-[48px] w-full items-center justify-between bg-primary px-5 py-[14px]">
                      <p className="font-jakarta font-bold leading-[20.16px] text-white">
                        Madelyn Hospital
                      </p>
                      <img
                        src="assets/icons/homepage-recomended-hospital.svg"
                        alt="Icon"
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-b-3xl bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                            Dr. Marci Maiden
                          </h3>
                          <p className="mt-1 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                            Internist Specialist
                          </p>
                        </div>
                        <img
                          src="assets/icons/homepage-recommended-star45.svg"
                          alt="Icon"
                        />
                      </div>
                      <p className="mt-4 text-start font-jakarta text-lg font-bold leading-[22.68px] text-accent-red">
                        Rp 240.000{' '}
                        <span className="text-base font-semibold leading-[20.16px] text-gray-500">
                          /hours
                        </span>
                      </p>
                    </div>
                  </a>
                  <a
                    href="doctor-details"
                    className="swiper-slide w-[280px] shrink-0 rounded-3xl border border-gray-200"
                  >
                    <div className="relative h-[180px] w-full overflow-hidden rounded-t-3xl">
                      <img
                        src="assets/image/homepage-recommended-dr-marci-maiden.png"
                        alt="Image"
                        className="w-ful h-full"
                      />
                      <img
                        src="assets/icons/homepage-recommended-available.svg"
                        alt="Icon"
                        className="absolute left-4 top-4"
                      />
                    </div>
                    <div className="flex h-[48px] w-full items-center justify-between bg-primary px-5 py-[14px]">
                      <p className="font-jakarta font-bold leading-[20.16px] text-white">
                        Madelyn Hospital
                      </p>
                      <img
                        src="assets/icons/homepage-recomended-hospital.svg"
                        alt="Icon"
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-b-3xl bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                            Dr. Marci Maiden
                          </h3>
                          <p className="mt-1 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                            Internist Specialist
                          </p>
                        </div>
                        <img
                          src="assets/icons/homepage-recommended-star45.svg"
                          alt="Icon"
                        />
                      </div>
                      <p className="mt-4 text-start font-jakarta text-lg font-bold leading-[22.68px] text-accent-red">
                        Rp 240.000{' '}
                        <span className="text-base font-semibold leading-[20.16px] text-gray-500">
                          /hours
                        </span>
                      </p>
                    </div>
                  </a>
                  <a
                    href="doctor-details"
                    className="swiper-slide w-[280px] shrink-0 rounded-3xl border border-gray-200"
                  >
                    <div className="relative h-[180px] w-full overflow-hidden rounded-t-3xl">
                      <img
                        src="assets/image/homepage-recommended-dr-marci-maiden.png"
                        alt="Image"
                        className="w-ful h-full"
                      />
                      <img
                        src="assets/icons/homepage-recommended-available.svg"
                        alt="Icon"
                        className="absolute left-4 top-4"
                      />
                    </div>
                    <div className="flex h-[48px] w-full items-center justify-between bg-primary px-5 py-[14px]">
                      <p className="font-jakarta font-bold leading-[20.16px] text-white">
                        Madelyn Hospital
                      </p>
                      <img
                        src="assets/icons/homepage-recomended-hospital.svg"
                        alt="Icon"
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-b-3xl bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                            Dr. Marci Maiden
                          </h3>
                          <p className="mt-1 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                            Internist Specialist
                          </p>
                        </div>
                        <img
                          src="assets/icons/homepage-recommended-star45.svg"
                          alt="Icon"
                        />
                      </div>
                      <p className="mt-4 text-start font-jakarta text-lg font-bold leading-[22.68px] text-accent-red">
                        Rp 240.000{' '}
                        <span className="text-base font-semibold leading-[20.16px] text-gray-500">
                          /hours
                        </span>
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="pediatric-specialist cardsSwiper">
                <div
                  id="PediatricSpecialist"
                  className="content swiper-wrapper hidden"
                >
                  <a
                    href="doctor-details"
                    className="swiper-slide w-[280px] shrink-0 rounded-3xl border border-gray-200"
                  >
                    <div className="relative h-[180px] w-full overflow-hidden rounded-t-3xl">
                      <img
                        src="assets/image/homepage-recommended-dr-marci-maiden.png"
                        alt="Image"
                        className="w-ful h-full"
                      />
                      <img
                        src="assets/icons/homepage-recommended-available.svg"
                        alt="Icon"
                        className="absolute left-4 top-4"
                      />
                    </div>
                    <div className="flex h-[48px] w-full items-center justify-between bg-primary px-5 py-[14px]">
                      <p className="font-jakarta font-bold leading-[20.16px] text-white">
                        Madelyn Hospital2
                      </p>
                      <img
                        src="assets/icons/homepage-recomended-hospital.svg"
                        alt="Icon"
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-b-3xl bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                            Dr. Marci Maiden2
                          </h3>
                          <p className="mt-1 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                            Internist Specialist2
                          </p>
                        </div>
                        <img
                          src="assets/icons/homepage-recommended-star45.svg"
                          alt="Icon"
                        />
                      </div>
                      <p className="mt-4 text-start font-jakarta text-lg font-bold leading-[22.68px] text-accent-red">
                        Rp 240.000{' '}
                        <span className="text-base font-semibold leading-[20.16px] text-gray-500">
                          /hours
                        </span>
                      </p>
                    </div>
                  </a>
                  <a
                    href="doctor-details"
                    className="swiper-slide w-[280px] shrink-0 rounded-3xl border border-gray-200"
                  >
                    <div className="relative h-[180px] w-full overflow-hidden rounded-t-3xl">
                      <img
                        src="assets/image/homepage-recommended-dr-marci-maiden.png"
                        alt="Image"
                        className="w-ful h-full"
                      />
                      <img
                        src="assets/icons/homepage-recommended-available.svg"
                        alt="Icon"
                        className="absolute left-4 top-4"
                      />
                    </div>
                    <div className="flex h-[48px] w-full items-center justify-between bg-primary px-5 py-[14px]">
                      <p className="font-jakarta font-bold leading-[20.16px] text-white">
                        Madelyn Hospital2
                      </p>
                      <img
                        src="assets/icons/homepage-recomended-hospital.svg"
                        alt="Icon"
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-b-3xl bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                            Dr. Marci Maiden2
                          </h3>
                          <p className="mt-1 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                            Internist Specialist2
                          </p>
                        </div>
                        <img
                          src="assets/icons/homepage-recommended-star45.svg"
                          alt="Icon"
                        />
                      </div>
                      <p className="mt-4 text-start font-jakarta text-lg font-bold leading-[22.68px] text-accent-red">
                        Rp 240.000{' '}
                        <span className="text-base font-semibold leading-[20.16px] text-gray-500">
                          /hours
                        </span>
                      </p>
                    </div>
                  </a>
                  <a
                    href="doctor-details"
                    className="swiper-slide w-[280px] shrink-0 rounded-3xl border border-gray-200"
                  >
                    <div className="relative h-[180px] w-full overflow-hidden rounded-t-3xl">
                      <img
                        src="assets/image/homepage-recommended-dr-marci-maiden.png"
                        alt="Image"
                        className="w-ful h-full"
                      />
                      <img
                        src="assets/icons/homepage-recommended-available.svg"
                        alt="Icon"
                        className="absolute left-4 top-4"
                      />
                    </div>
                    <div className="flex h-[48px] w-full items-center justify-between bg-primary px-5 py-[14px]">
                      <p className="font-jakarta font-bold leading-[20.16px] text-white">
                        Madelyn Hospital2
                      </p>
                      <img
                        src="assets/icons/homepage-recomended-hospital.svg"
                        alt="Icon"
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-b-3xl bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                            Dr. Marci Maiden2
                          </h3>
                          <p className="mt-1 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                            Internist Specialist2
                          </p>
                        </div>
                        <img
                          src="assets/icons/homepage-recommended-star45.svg"
                          alt="Icon"
                        />
                      </div>
                      <p className="mt-4 text-start font-jakarta text-lg font-bold leading-[22.68px] text-accent-red">
                        Rp 240.000{' '}
                        <span className="text-base font-semibold leading-[20.16px] text-gray-500">
                          /hours
                        </span>
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="oftalmologi-specialist cardsSwiper">
                <div
                  id="OftalmologiSpecialist"
                  className="content swiper-wrapper hidden"
                >
                  <a
                    href="doctor-details"
                    className="swiper-slide w-[280px] shrink-0 rounded-3xl border border-gray-200"
                  >
                    <div className="relative h-[180px] w-full overflow-hidden rounded-t-3xl">
                      <img
                        src="assets/image/homepage-recommended-dr-marci-maiden.png"
                        alt="Image"
                        className="w-ful h-full"
                      />
                      <img
                        src="assets/icons/homepage-recommended-available.svg"
                        alt="Icon"
                        className="absolute left-4 top-4"
                      />
                    </div>
                    <div className="flex h-[48px] w-full items-center justify-between bg-primary px-5 py-[14px]">
                      <p className="font-jakarta font-bold leading-[20.16px] text-white">
                        Madelyn Hospital3
                      </p>
                      <img
                        src="assets/icons/homepage-recomended-hospital.svg"
                        alt="Icon"
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-b-3xl bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                            Dr. Marci Maiden3
                          </h3>
                          <p className="mt-1 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                            Internist Specialist3
                          </p>
                        </div>
                        <img
                          src="assets/icons/homepage-recommended-star45.svg"
                          alt="Icon"
                        />
                      </div>
                      <p className="mt-4 text-start font-jakarta text-lg font-bold leading-[22.68px] text-accent-red">
                        Rp 240.000{' '}
                        <span className="text-base font-semibold leading-[20.16px] text-gray-500">
                          /hours
                        </span>
                      </p>
                    </div>
                  </a>
                  <a
                    href="doctor-details"
                    className="swiper-slide w-[280px] shrink-0 rounded-3xl border border-gray-200"
                  >
                    <div className="relative h-[180px] w-full overflow-hidden rounded-t-3xl">
                      <img
                        src="assets/image/homepage-recommended-dr-marci-maiden.png"
                        alt="Image"
                        className="w-ful h-full"
                      />
                      <img
                        src="assets/icons/homepage-recommended-available.svg"
                        alt="Icon"
                        className="absolute left-4 top-4"
                      />
                    </div>
                    <div className="flex h-[48px] w-full items-center justify-between bg-primary px-5 py-[14px]">
                      <p className="font-jakarta font-bold leading-[20.16px] text-white">
                        Madelyn Hospital3
                      </p>
                      <img
                        src="assets/icons/homepage-recomended-hospital.svg"
                        alt="Icon"
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-b-3xl bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                            Dr. Marci Maiden3
                          </h3>
                          <p className="mt-1 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                            Internist Specialist3
                          </p>
                        </div>
                        <img
                          src="assets/icons/homepage-recommended-star45.svg"
                          alt="Icon"
                        />
                      </div>
                      <p className="mt-4 text-start font-jakarta text-lg font-bold leading-[22.68px] text-accent-red">
                        Rp 240.000{' '}
                        <span className="text-base font-semibold leading-[20.16px] text-gray-500">
                          /hours
                        </span>
                      </p>
                    </div>
                  </a>
                  <a
                    href="doctor-details"
                    className="swiper-slide w-[280px] shrink-0 rounded-3xl border border-gray-200"
                  >
                    <div className="relative h-[180px] w-full overflow-hidden rounded-t-3xl">
                      <img
                        src="assets/image/homepage-recommended-dr-marci-maiden.png"
                        alt="Image"
                        className="w-ful h-full"
                      />
                      <img
                        src="assets/icons/homepage-recommended-available.svg"
                        alt="Icon"
                        className="absolute left-4 top-4"
                      />
                    </div>
                    <div className="flex h-[48px] w-full items-center justify-between bg-primary px-5 py-[14px]">
                      <p className="font-jakarta font-bold leading-[20.16px] text-white">
                        Madelyn Hospital3
                      </p>
                      <img
                        src="assets/icons/homepage-recomended-hospital.svg"
                        alt="Icon"
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-b-3xl bg-white p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-jakarta text-lg font-bold leading-[22.68px] text-gray-900">
                            Dr. Marci Maiden3
                          </h3>
                          <p className="mt-1 font-jakarta font-semibold leading-[20.16px] text-gray-500">
                            Internist Specialist3
                          </p>
                        </div>
                        <img
                          src="assets/icons/homepage-recommended-star45.svg"
                          alt="Icon"
                        />
                      </div>
                      <p className="mt-4 text-start font-jakarta text-lg font-bold leading-[22.68px] text-accent-red">
                        Rp 240.000{' '}
                        <span className="text-base font-semibold leading-[20.16px] text-gray-500">
                          /hours
                        </span>
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <nav className="navigate fixed bottom-0 left-0 right-0 z-30 mx-auto">
        <div className="mx-auto max-w-[640px]">
          <div className="flex items-center justify-between rounded-t-2xl border-t border-gray-50 bg-white px-4 py-6">
            <a
              href="/"
              className="grid w-[112.33px] place-items-center gap-[6px]"
            >
              <img src="assets/icons/homepage-nav-home-active.svg" alt="Icon" />
              <p className="font-jakarta font-bold leading-[20.16px] text-primary">
                Home
              </p>
            </a>
            <a
              href="doctor-search"
              className="grid w-[112.33px] place-items-center gap-[6px]"
            >
              <img
                src="assets/icons/homepage-nav-appointment-nonactive.svg"
                alt="Icon"
              />
              <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                Appointment
              </p>
            </a>
            <a
              href="my-booking"
              className="grid w-[112.33px] place-items-center gap-[6px]"
            >
              <img
                src="assets/icons/homepage-nav-booking-nonactive.svg"
                alt="Icon"
              />
              <p className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                My Booking
              </p>
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
