import React from 'react';
import PageHeader from '../PageHeader';
import styles from './index.less';

const PageHeaderWrapper = ({ children, contentWidth, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
        <PageHeader
          wide={contentWidth === 'Fixed'}
          key="pageheader"
          {...restProps}
        />
    {children ? (
      <div className={styles.content}>
        {children}
      </div>
    ) : null}
  </div>
);

// export default connect(({ setting }) => ({
//   contentWidth: setting.contentWidth,
// }))(PageHeaderWrapper);

export default PageHeaderWrapper;
