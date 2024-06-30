import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

const LessonContent = ({ content }) => {
  // Depending on the content_type, render the content differently
  // (e.g., plain text, HTML, video embed)
  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} style={{paddingLeft:'10px', fontSize: '8px', fontWeight: 'lighter', fontFamily: 'sans-serif'}}/>
  );
};

LessonContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default LessonContent;
