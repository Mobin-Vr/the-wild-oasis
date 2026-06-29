import styled, { css } from 'styled-components';

interface HeadingProps {
   as?: 'h1' | 'h2' | 'h3';
   children?: React.ReactNode;
}

const Heading = styled.h1<HeadingProps>`
   ${(props) =>
      props.as === 'h1' &&
      css`
         font-size: 30px;
         font-weight: 700;
      `}

   ${(props) =>
      props.as === 'h2' &&
      css`
         font-size: 24px;
         font-weight: 600;
      `}

  ${(props) =>
      props.as === 'h3' &&
      css`
         font-size: 20px;
         font-weight: 500;
      `}
`;

export default Heading;
