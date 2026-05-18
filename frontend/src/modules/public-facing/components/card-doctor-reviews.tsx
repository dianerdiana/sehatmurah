import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

import { formatTimeAgo } from '@/utils/format-time-ago.util';

import type { Review } from '@/types/reviews.type';

export function CardDoctorReviews({ reviews }: { reviews: Review[] }) {
  return (
    <section id='Reviews' className='w-full rounded-3xl bg-white px-4 py-8'>
      <div className='mb-4 flex justify-between items-center'>
        <h2 className='text-xl font-bold leading-[25.2px] text-gray-900'>Reviews and Ratings</h2>
        <a href='#' className='text-sm font-bold leading-[17.64px] text-gray-500 hover:underline'>
          View All
        </a>
      </div>

      <Card className='rounded-3xl border border-gray-200 shadow-none py-0 pb-6'>
        <CardContent className='space-y-6 p-6'>
          <div id='rating' className='flex items-center justify-between'>
            <strong className='text-[40px] font-extrabold leading-[50.4px] tracking-[-8%] text-black'>4.5/5.0</strong>
            <div>
              <img src='/assets/icons/doctordetails-stars.svg' alt='Stars Rating' className='mb-2' loading='lazy' />
              <p className='font-semibold leading-[20.16px] text-gray-500'>1250+ Reviews</p>
            </div>
          </div>

          <hr className='w-full border-gray-200' />

          <div className='space-y-6'>
            {reviews.map((review) => (
              <article id={review._id} key={review._id}>
                <div className='mb-5.25 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Avatar className='mr-3 size-15.5'>
                      <AvatarImage
                        src={review.patient.fullName}
                        alt={review.patient.fullName}
                        className='object-cover'
                        loading='lazy'
                      />
                      <AvatarFallback>{review.patient.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className='mb-1 font-bold leading-[22.68px] text-gray-900'>{review.patient.fullName}</h3>
                      <p className='font-semibold leading-[20.16px] text-gray-500'>{formatTimeAgo(review.createdAt)}</p>
                    </div>
                  </div>

                  <div className='flex h-8 w-fit items-center rounded-md bg-[#FFB06317] p-1.5'>
                    <img
                      src='/assets/icons/doctordetails-star-yellow.svg'
                      alt='Star Icon'
                      className='mr-0.5'
                      loading='lazy'
                    />
                    <p className='font-bold leading-[20.16px] text-black'>{review.rating}</p>
                  </div>
                </div>

                <p className='font-semibold leading-[25.6px] text-gray-500'>{review.comment}</p>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
