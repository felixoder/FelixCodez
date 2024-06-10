import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { useInView } from 'framer-motion';
import { cn } from '../lib/utils';
import Phone from './Phone';
import "../App.css";

const PHONES = [
  '/testimonials/testimonials1.png',
  '/testimonials/testimonials2.png',
  '/testimonials/testimonials3.png',
  '/testimonials/testimonials4.png',
  '/testimonials/testimonials5.png',
  '/testimonials/testimonials6.png',
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAYS = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s'];
  const animationDelay = POSSIBLE_ANIMATION_DELAYS[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)];

  return (
    <div className={cn('animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5', className)} style={{ animationDelay }} {...props}>
      <Phone imgSrc={imgSrc} className="w-full max-w-[500px]" />
    </div>
  );
}

interface ReviewColumnProps {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}

function ReviewColumn({ reviews, className, reviewClassName, msPerPixel = 0 }: ReviewColumnProps) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnWidth, setColumnWidth] = useState(0);
  const duration = `${(columnWidth / msPerPixel) * 1000}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setColumnWidth(columnRef.current?.scrollWidth ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn('space-y-8 py-4', className)}
      style={{
        '--marquee-duration': duration,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      } as React.CSSProperties}>
      <div
        className="animate-marquee"
        style={{
          display: 'inline-block',
          animationDuration: duration,
        }}>
        {reviews.map((imgSrc, reviewIndex) => (
          <Review
            key={reviewIndex}
            className={reviewClassName?.(reviewIndex)}
            imgSrc={imgSrc}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className='relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3'>
      {isInView ? (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex: number) =>
              cn({
                'md:hidden': reviewIndex >= column1.length + column3[0].length,
                'lg:hidden': reviewIndex >= column1.length,
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className='hidden md:block'
            reviewClassName={(reviewIndex: number) =>
              reviewIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className='hidden md:block'
            msPerPixel={10}
          />
        </>
      ) : null}
    <br />
    <br />
    </div>
  );
}

export function Reviews() {
  return (
    <MaxWidthWrapper className='relative max-w-5xl'>
      <img
        aria-hidden='true'
        src='/what-people-are-saying.png'
        className='absolute select-none hidden xl:block -left-60 top-1/3'
      />
      <ReviewGrid />
    </MaxWidthWrapper>
  );
}
