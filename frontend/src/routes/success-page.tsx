import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/success-page')({
  component: SuccessPage,
})

function SuccessPage() {
  return (
    <div className="bg-gray-50">
      <main className="mx-auto flex min-h-screen max-w-[640px] items-center justify-center px-4">
        <section
          id="ContainerSuccess"
          className="w-full rounded-3xl bg-white pt-8"
        >
          <header className="mb-8 w-full px-4">
            <img
              src="assets/icons/succespage-booking-succes.svg"
              alt="Icon"
              className="mx-auto mb-6"
            />
            <h1
              id="success-heading"
              className="text-center font-jakarta text-2xl font-extrabold leading-[30.24px]"
            >
              Booking Succes,
              <br />
              well done🙌🏻
            </h1>
          </header>
          <div id="BookingId" className="w-full px-4">
            <section className="mb-8 h-[148px] w-full rounded-3xl bg-[linear-gradient(100.99deg,#277B53_0%,#277B7B_100%)] pb-6">
              <div className="w-full rounded-3xl bg-[linear-gradient(100.99deg,#277B53_0%,#277B7B_100%)] p-[2px]">
                <div className="mb-4 flex h-14 w-full items-center gap-x-1 rounded-3xl bg-white p-4">
                  <img
                    src="assets/icons/succespage-booking-id.svg"
                    alt="Icon"
                    loading="lazy"
                  />
                  <h2 className="font-jakarta font-semibold leading-[20.16px] text-gray-500">
                    Booking ID:
                  </h2>
                  <strong className="font-jakarta font-extrabold leading-[20.16px] text-primary">
                    SEHAT1935
                  </strong>
                </div>
              </div>
              <p className="px-4 text-center font-jakarta font-bold leading-[25.6px] text-white">
                Your appointment is set. We're checking your payment.
              </p>
            </section>
          </div>
          <a
            id="CtaViewBooking"
            href="future-appointment-pending"
            className="flex h-[60px] w-full items-center justify-center rounded-full bg-primary font-jakarta font-bold leading-[20.16px] text-white"
          >
            {' '}
            View My Booking{' '}
          </a>
        </section>
      </main>
      <footer>
        <a
          href="#"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-jakarta font-bold leading-[20.16px] text-primary"
        >
          Make Another Appointment
        </a>
      </footer>
    </div>
  )
}
