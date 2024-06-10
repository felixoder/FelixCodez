import { HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  className?: string;
}

const Phone = ({ imgSrc, className, ...props }: PhoneProps) => {
  return (
    <div className={cn('relative flex items-center justify-center', className)} {...props}>
      <img
        src='/phone.png'
        className='absolute inset-0 object-cover w-full h-full pointer-events-none select-none z-999'
        alt='Phone frame'
      />
      <img
        src={imgSrc}
        className='relative z-10 object-cover w-full h-full max-w-full max-h-full'
        alt='Content on phone'
      />
    </div>
  );
}

export default Phone;
