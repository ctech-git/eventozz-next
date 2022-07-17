import Link from 'next/link';

import { Container } from 'react-bootstrap';
import { PasswordRecovery } from '../components/Authentication/PasswordRecovery';

const Authentication = () => {

  return (
    <>
      <div className='profile-authentication-area'>
        <Container>
          <PasswordRecovery />
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
