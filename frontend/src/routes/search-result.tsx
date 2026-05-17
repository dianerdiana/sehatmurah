import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/search-result')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className='relative mx-auto max-w-[640px] pb-12'>
      <header className='h-[268px] w-full rounded-b-2xl bg-primary px-4 pt-12'>
        <a href='doctor-search'>
          <img src='assets/icons/arrow-left-blue.svg' alt='Image' />
        </a>
        <div className='absolute left-1/2 top-12 -translate-x-1/2'>
          <h1 className='mb-[3px] whitespace-nowrap text-center font-jakarta text-xl font-bold leading-[25.2px] text-white'>
            Recommended Doctors
          </h1>
          <h2 className='whitespace-nowrap text-center font-jakarta font-semibold leading-[20.16px] text-primary-light'>
            Jakarta<span className='mx-[6px]'>•</span>Internist Specialist
          </h2>
        </div>
      </header>
      <section id='ContainerCards' className='-mt-[140px] w-full space-y-4 px-4'>
        <article id='Card1' className='space-y-5 rounded-3xl bg-white p-5'>
          <header className='cardHeader flex items-center gap-x-[12px]'>
            <div className='relative h-[120px] w-[100px]'>
              <img
                className='rounded-ee-md rounded-es-3xl rounded-se-3xl rounded-ss-md bg-gray-100 object-cover'
                src='assets/image/searchresult-dr-raze-invoker.png'
                alt='Image'
              />
              <img className='absolute left-2 top-2' src='assets/icons/alert-online.svg' alt='Icon' />
            </div>
            <div className='space-y-2'>
              <h3 className='font-jakarta font-bold leading-[20.16px] text-primary'>Radiant Hospital</h3>
              <h2 className='font-jakarta text-lg font-bold leading-[22.68px] text-gray-900'>Dr. Raze Invoker</h2>
              <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>Internist Specialist</p>
            </div>
          </header>
          <div className='cardInfo flex items-center justify-evenly rounded-2xl border border-gray-200 py-4'>
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px]'>
                <img src='assets/icons/searchresult-verify.svg' alt='Icon' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>Verify</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Certified</p>
            </div>
            <hr className='w-[36px] rotate-90 border-gray-200' />
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px] whitespace-nowrap'>
                <img src='assets/icons/searchresult-5-years.svg' alt='Icon' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>5 Years</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Experience</p>
            </div>
            <hr className='w-[36px] rotate-90 border-gray-200' />
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px]'>
                <img src='assets/icons/searchresult-4.5.svg' alt='Icon' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>4.5</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Rating</p>
            </div>
          </div>
          <footer className='cardPrice flex items-center justify-between space-x-2'>
            <div>
              <p className='mb-[2px] whitespace-nowrap font-jakarta text-[18px] font-bold leading-[22.68px] text-accent-red'>
                Rp 240.000
              </p>
              <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>/hour</p>
            </div>
            <a
              href='doctor-details'
              className='flex h-[52px] w-[180px] items-center justify-center rounded-[100px] border border-primary bg-[#2C40FF17] font-jakarta font-bold leading-[20.16px] text-primary'
            >
              Book Now
            </a>
          </footer>
        </article>
        <article id='Card2' className='space-y-5 rounded-3xl bg-white p-5'>
          <header className='cardHeader flex items-center gap-x-[12px]'>
            <div className='relative h-[120px] w-[100px]'>
              <img
                className='rounded-ee-md rounded-es-3xl rounded-se-3xl rounded-ss-md bg-gray-100 object-cover'
                src='assets/image/searchresult-dr.-arrbona-naaiv.png'
                alt='Image'
              />
              <img className='absolute left-2 top-2' src='assets/icons/alert-online.svg' alt='Icon' />
            </div>
            <div className='space-y-2'>
              <h3 className='font-jakarta font-bold leading-[20.16px] text-primary'>Gassroma Sin Hospital</h3>
              <h2 className='font-jakarta text-lg font-bold leading-[22.68px] text-gray-900'>Dr. Arrbona Naaiv</h2>
              <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>Internist Specialist</p>
            </div>
          </header>
          <div className='cardInfo flex items-center justify-evenly rounded-2xl border border-gray-200 py-4'>
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px]'>
                <img src='assets/icons/searchresult-verify.svg' alt='Icon' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>Verify</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Certified</p>
            </div>
            <hr className='w-[36px] rotate-90 border-gray-200' />
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px] whitespace-nowrap'>
                <img src='assets/icons/searchresult-5-years.svg' alt='Icon' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>3 Years</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Experience</p>
            </div>
            <hr className='w-[36px] rotate-90 border-gray-200' />
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px]'>
                <img src='assets/icons/searchresult-4.5.svg' alt='Icon' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>4.2</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Rating</p>
            </div>
          </div>
          <footer className='cardPrice flex items-center justify-between space-x-2'>
            <div>
              <p className='mb-[2px] whitespace-nowrap font-jakarta text-[18px] font-bold leading-[22.68px] text-accent-red'>
                Rp 200.000
              </p>
              <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>/hour</p>
            </div>
            <a
              href='doctor-details'
              className='flex h-[52px] w-[180px] items-center justify-center rounded-[100px] border border-primary bg-[#2C40FF17] font-jakarta font-bold leading-[20.16px] text-primary'
            >
              Book Now
            </a>
          </footer>
        </article>
        <article id='Card3' className='space-y-5 rounded-3xl bg-white p-5'>
          <header className='cardHeader flex items-center gap-x-[12px]'>
            <div className='relative h-[120px] w-[100px]'>
              <img
                className='rounded-ee-md rounded-es-3xl rounded-se-3xl rounded-ss-md bg-gray-100 object-cover'
                src='assets/image/searchresult-dr-reyna-ramma.png'
                alt='Image'
              />
              <img className='absolute left-2 top-2' src='assets/icons/alert-online.svg' alt='Icon' />
            </div>
            <div className='space-y-2'>
              <h3 className='font-jakarta font-bold leading-[20.16px] text-primary'>Naabs Bylaa Hospital</h3>
              <h2 className='font-jakarta text-lg font-bold leading-[22.68px] text-gray-900'>Dr. Reyna Ramma</h2>
              <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>Internist Specialist</p>
            </div>
          </header>
          <div className='cardInfo flex items-center justify-evenly rounded-2xl border border-gray-200 py-4'>
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px]'>
                <img src='assets/icons/searchresult-verify.svg' alt='Icon' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>Verify</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Certified</p>
            </div>
            <hr className='w-[36px] rotate-90 border-gray-200' />
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px] whitespace-nowrap'>
                <img src='assets/icons/searchresult-5-years.svg' alt='Icon' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>4 Years</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Experience</p>
            </div>
            <hr className='w-[36px] rotate-90 border-gray-200' />
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px]'>
                <img src='assets/icons/searchresult-4.5.svg' alt='Icon' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>4.7</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Rating</p>
            </div>
          </div>
          <footer className='cardPrice flex items-center justify-between space-x-2'>
            <div>
              <p className='mb-[2px] whitespace-nowrap font-jakarta text-[18px] font-bold leading-[22.68px] text-accent-red'>
                Rp 230.000
              </p>
              <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>/hour</p>
            </div>
            <a
              href='doctor-details'
              className='flex h-[52px] w-[180px] items-center justify-center rounded-[100px] border border-primary bg-[#2C40FF17] font-jakarta font-bold leading-[20.16px] text-primary'
            >
              Book Now
            </a>
          </footer>
        </article>
        <article id='Card4' className='space-y-5 rounded-3xl bg-white p-5'>
          <header className='cardHeader flex items-center gap-x-[12px]'>
            <div className='relative h-[120px] w-[100px]'>
              <img
                className='rounded-ee-md rounded-es-3xl rounded-se-3xl rounded-ss-md bg-gray-100 object-cover'
                src='assets/image/doctorsearch-dr-marci-maiden.png'
                alt='Image'
              />
              <img className='absolute left-2 top-2' src='assets/icons/alert-online.svg' alt='Icon' />
            </div>
            <div className='space-y-2'>
              <h3 className='font-jakarta font-bold leading-[20.16px] text-primary'>Madelyn Hospital</h3>
              <h2 className='font-jakarta text-lg font-bold leading-[22.68px] text-gray-900'>Dr. Marci Maiden</h2>
              <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>Internist Specialist</p>
            </div>
          </header>
          <div className='cardInfo flex items-center justify-evenly rounded-2xl border border-gray-200 py-4'>
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px]'>
                <img src='assets/icons/searchresult-verify.svg' alt='Icon' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>Verify</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Certified</p>
            </div>
            <hr className='w-[36px] rotate-90 border-gray-200' />
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px] whitespace-nowrap'>
                <img src='assets/icons/searchresult-5-years.svg' alt='Icon' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>5 Years</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Experience</p>
            </div>
            <hr className='w-[36px] rotate-90 border-gray-200' />
            <div className='grid w-[80.33px] place-items-center'>
              <div className='mb-1 flex gap-[2px]'>
                <img src='assets/icons/searchresult-4.5.svg' alt='Icon' />
                <h4 className='font-jakarta font-bold leading-[20.16px] text-gray-900'>4.5</h4>
              </div>
              <p className='font-jakarta text-sm font-semibold leading-[17.64px] text-gray-500'>Rating</p>
            </div>
          </div>
          <footer className='cardPrice flex items-center justify-between space-x-2'>
            <div>
              <p className='mb-[2px] whitespace-nowrap font-jakarta text-[18px] font-bold leading-[22.68px] text-accent-red'>
                Rp 240.000
              </p>
              <p className='font-jakarta font-semibold leading-[20.16px] text-gray-500'>/hour</p>
            </div>
            <a
              href='doctor-details'
              className='flex h-[52px] w-[180px] items-center justify-center rounded-[100px] border border-primary bg-[#2C40FF17] font-jakarta font-bold leading-[20.16px] text-primary'
            >
              Book Now
            </a>
          </footer>
        </article>
      </section>
    </main>
  );
}
