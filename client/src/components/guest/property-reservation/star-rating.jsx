import React from 'react';

const StarRating = ({ rating, size, gap }) => {
    const fullStar = '/assets/full_star.svg';
    const halfStar = '/assets/half_star.svg';
    const emptyStar = '/assets/empty_star.svg';

    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<img style={{ width: size + 'px' }} src={fullStar} alt="Full Star" key={'star' + i} />);
        } else if (rating >= i - 0.5) {
            stars.push(<img style={{ width: size + 'px' }} src={halfStar} alt="Half Star" key={'star' + i} />);
        } else {
            stars.push(<img style={{ width: size + 'px' }} src={emptyStar} alt="Empty Star" key={'star' + i} />);
        }
    }

    return <div className="flex items-center" style={{ gap: gap + 'px' }}>{stars}</div>;
};

export default StarRating;
