import * as React from 'react'
import { Font, Head } from '@react-email/components';

export const Header = () => {
  return (
    <Head>
      <Font
        fontFamily={'Geologica'}
        fallbackFontFamily={'sans-serif'}
        webFont={{
          url: 'https://cdn.jsdelivr.net/fontsource/fonts/geologica:vf@latest/latin-wght-normal.woff2',
          format: 'woff2'
        }}
        fontWeight={400}
        fontStyle='normal'
      />
    </Head>
  );
}
