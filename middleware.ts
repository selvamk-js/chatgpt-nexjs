import { isEmpty } from 'lodash';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    console.log('req.nextauth.token', req.nextauth.token);
  },
  {
    callbacks: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      authorized({ req, token }) {
        return !isEmpty(token);
      },
    },
  },
);

export const config = { matcher: ['/chat/:path*', '/config'] };
