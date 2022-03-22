import Link from 'next/link';
import LoginForm from '../components/Authentication/LoginForm';
import RegisterForm from '../components/Authentication/RegisterForm';
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react';

const Authentication = () => {
  const router = useRouter();

  const [organizer, setOrganizer] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState(false);

  useEffect(() => {
    let check = router.query?.organizador;
    setOrganizer(check ? true : false);
    let callback = router.query?.callback;
    setCallbackUrl(callback ? callback : false);
  })

  return (
    <>
      <div className='profile-authentication-area'>
        <div className='d-table'>
          <div className='d-table-cell'>
            <div className='container'>
              <div className='row'>
                <LoginForm organizer={organizer} callback={callbackUrl} />
                <RegisterForm organizer={organizer} callback={callbackUrl} />
              </div>
            </div>
          </div>
        </div>
        <Link href='/'>
          <a className='back-icon'>
            <i className='bx bx-x'></i>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Authentication;
