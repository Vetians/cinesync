// src/components/ReviewItem.jsx
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewItem = ({ review }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const reviewerName = review.author_details?.username || review.author;

  // Heuristic: Tentukan apakah perlu tombol "Baca selengkapnya"
  const isContentTooLong = review.content && review.content.length > 350; 

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const formatReviewDate = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const reviewContentStyle = {
    wordWrap: 'break-word',
    display: showFullContent ? 'block' : '-webkit-box',
    WebkitLineClamp: showFullContent ? 'unset' : 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <div className="mb-4 pb-4 border-bottom border-secondary">
      <h6 className="mb-1">{reviewerName}</h6>
      <p className="text-white-50 small">
        Ditulis pada {formatReviewDate(review.created_at)}
        {review.author_details?.rating && (
          <span className="ms-3">
            <FaStar color="gold" className="me-1" />
            {review.author_details.rating} / 10
          </span>
        )}
      </p>
      <p style={reviewContentStyle}>
        {review.content}
      </p>
      {isContentTooLong && (
        <button onClick={toggleContent} className="btn btn-link p-0 text-info" style={{ textDecoration: 'none' }}>
          {showFullContent ? 'Sembunyikan' : 'Baca selengkapnya'}
        </button>
      )}
    </div>
  );
};

export default ReviewItem;