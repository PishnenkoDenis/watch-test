import React, { memo } from 'react';
import { ReactComponent as ProfileSvg } from '../../../../assets/profile-icon.svg';

import styles from './profile.module.scss';

const Profile = ({ onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.profileBox}
      onClick={onClick}
    >
      <ProfileSvg className={styles.profileIcon} />
      <div className={styles.profileText}>Войти</div>
    </div>
  );
};

export default memo(Profile);
