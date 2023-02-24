import { PropsWithChildren, useState, Fragment } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Transition, Dialog } from '@headlessui/react';
import { navigationLinks } from '@/data/navigation';
import { useRouter } from 'next/router';
import localFont from 'next/font/local';

const calSans = localFont({
  src: '../public/fonts/CalSans.woff2',
  variable: '--cal-sans',
  display: 'swap',
});

const matter = localFont({
  src: [
    {
      path: '../public/fonts/Matter-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
});

type LayoutProps = {};

export const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  const { pathname } = useRouter();

  const [openNav, setOpenNav] = useState(false);

  const toggleMobileNav = () => setOpenNav((prevState) => !prevState);

  const closeModal = () => setOpenNav(false);

  return (
    <div
      className={`min-h-screen bg-zinc-900 text-white scroll-smooth flex flex-col ${calSans.variable} ${matter.className}`}>
      <header className='flex items-center justify-between p-4 fixed top-0 inset-x-0 bg-transparent backdrop-blur-2xl'>
        <Link
          href='/'
          className='text-xl font-bold tracking-tight font-cal-sans'>
          thetechcodehub
        </Link>
        <div className='lg:hidden'>
          <button
            className='flex bg-zinc-800 items-center gap-2 text-sm border border-white/20 rounded-md p-2'
            onClick={toggleMobileNav}>
            <span>Menu</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1}
              stroke='currentColor'
              className={clsx('w-2 h-2', openNav && 'rotate-180')}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5'
              />
            </svg>
          </button>
        </div>
      </header>
      <main className='grow mt-20 p-4'>{children}</main>
      <footer className='p-4 text-center text-sm bg-zinc-800'>
        <p>{`©${new Date().getFullYear()} All rights reserved to thetechcodehub`}</p>
      </footer>
      {/* Modal */}
      <Transition appear show={openNav} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 text-white p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-4'>
                  <Dialog.Title
                    as='div'
                    className='flex items-center justify-between font-medium text-sm text-zinc-400'>
                    <p>Navigation</p>
                    <button onClick={closeModal}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-4 h-4 text-white'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </Dialog.Title>
                  <nav className='flex flex-col gap-1'>
                    {navigationLinks.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={clsx(
                          'text-lg font-medium tracking-tight',
                          pathname === item.href && 'text-white',
                          pathname !== item.href && 'text-zinc-400'
                        )}
                        onClick={closeModal}>
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
