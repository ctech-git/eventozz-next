import Link from 'next/link';
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react';
import { SimplifiedAuthContainer } from '../components/Authentication/SimplifiedAuthContainer';
import { Container } from 'react-bootstrap';

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
        <Container>
          <SimplifiedAuthContainer pageLogin organizer={organizer} callback={callbackUrl} />
        </Container>
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
