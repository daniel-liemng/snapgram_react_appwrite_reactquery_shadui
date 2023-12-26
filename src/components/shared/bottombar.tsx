import { bottombarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { INavLink } from '@/types';
import { NavLink, useLocation } from 'react-router-dom';

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
          <NavLink
            to={link.route}
            key={link.label}
            className={cn(
              'flex justify-center flex-col items-center gap-1 p-2 transition',
              isActive && 'bg-primary-500 rounded-[10px]'
            )}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={cn(isActive && 'invert-white')}
              width={16}
              height={16}
            />
            <p className='tiny-medium text-light-2'>{link.label}</p>
          </NavLink>
        );
      })}
    </section>
  );
};

export default Bottombar;
