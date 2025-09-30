import type { FC, ReactNode } from 'react';
import { Box, styled } from '@mui/material';
import * as PropTypes from 'prop-types';
import CommisionContainer from '../container';

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(1)};
`
);

interface PageTitleWrapperProps {
  children?: ReactNode;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
  return (
    <PageTitle className="MuiPageTitle-wrapper">
      <CommisionContainer>{children}</CommisionContainer>
    </PageTitle>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired as any
};

export default PageTitleWrapper;
