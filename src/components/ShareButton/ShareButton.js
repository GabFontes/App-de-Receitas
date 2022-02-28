import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { IconButton } from '../IconButton/IconButton';
import { Toast } from '../Toast/Toast';
import shareIcon from '../../images/shareIcon.svg';

const HIDE_MESSAGE_TIME = 1500;

export const ShareButton = ({ testID, textToShare }) => {
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  const handleShare = () => {
    copy(textToShare);
    setShowLinkCopied(true);
    setTimeout(() => {
      setShowLinkCopied(false);
    }, HIDE_MESSAGE_TIME);
  };

  return (
    <>
      <IconButton
        testID={ testID }
        icon={ shareIcon }
        altIcon="share-btn"
        onClick={ handleShare }
      />
      {
        showLinkCopied && <Toast message="Link copied!" />
      }
    </>
  );
};

ShareButton.propTypes = {
  testID: PropTypes.string,
}.isRequired;

export default ShareButton;
