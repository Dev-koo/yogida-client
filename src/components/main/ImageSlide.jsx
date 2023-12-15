import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { IoHeartOutline } from 'react-icons/io5';
import { IoEllipseSharp } from 'react-icons/io5';

export default function ImageSlide({ images }) {
  ImageSlide.propTypes = {
    images: PropTypes.array.isRequired,
  };

  widthSize.propsTypes = {
    images: PropTypes.array.isRequired,
  };

  // 데스크탑 드래그
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);

  // 모바일 드래그
  const [tochedX, setTochedX] = useState(0);
  const [tochedY, setTochedY] = useState(0);

  // 이동한 값
  const [transformValue, setTransformValue] = useState(0);

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(0);

  // 데스크탑 드래그 시작 시 마우스의 x, y 좌표 저장
  function onMouseDown(e) {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  }

  // 데스크탑 드래그 종료 시 마우스의 x, y 좌표 저장
  function onMouseUp(e) {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  }

  // 드래그에 의한 슬라이드 변경 감지
  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
    const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
    const vector = dragSpaceX / dragSpaceY;

    if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
      if (mouseUpClientX < mouseDownClientX) {
        handleNextSlide();
      } else if (mouseUpClientX > mouseDownClientX) {
        handlePrevSlide();
      }
    }
  }, [mouseDownClientX, mouseUpClientX, mouseDownClientY, mouseUpClientY, handleNextSlide, handlePrevSlide]);

  // 모바일 터치 시작 시 좌표 저장
  function onTouchStart(e) {
    setTochedX(e.changedTouches[0].pageX);
    setTochedY(e.changedTouches[0].pageY);
  }

  // 모바일 터치 종료 시 드래그 거리를 계산하여 슬라이드 변경 감지
  function onTouchEnd(e) {
    const distanceX = tochedX - e.changedTouches[0].pageX;
    const distanceY = tochedY - e.changedTouches[0].pageY;
    const vector = Math.abs(distanceX / distanceY);

    if (distanceX > 30 && vector > 2) {
      handleNextSlide();
    } else if (distanceX < -30 && vector > 2) {
      handlePrevSlide();
    }
  }

  // 다음 슬라이드로 이동
  const handleNextSlide = useEffect(
    function () {
      if (transformValue === -327 * (images.length - 1)) {
        return;
      }
      setTransformValue(function (prevTransform) {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage !== currentPage ? nextPage : currentPage);
        return prevTransform - 327;
      });
    },
    [currentPage, transformValue, images.length],
  );

  // 이전 슬라이드로 이동
  const handlePrevSlide = useEffect(() => {
    if (transformValue === 0) {
      return;
    }
    setTransformValue((prevTransform) => {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage !== currentPage ? prevPage : currentPage);
      return prevTransform + 327;
    });
  }, [currentPage, transformValue]);

  // ul의 width길이 동적으로 변환
  function widthSize(images) {
    return `${images.length * 100}%`;
  }

  return (
    <div className="w-[327px] h-[303px] rounded-[10px] mb-[14px] overflow-hidden relative">
      <IoHeartOutline size="36" color="#ffffff" />
      <ul
        className={`flex transition-transform duration-300 ease-in-out`}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        style={{ transform: `translateX(${transformValue}px)`, width: widthSize(images) }}
      >
        {images.map((image, index) => (
          <li key={index} className="w-[327px] h-[303px] bg-[#D9D9D9]">
            {image}
          </li>
        ))}
      </ul>
      <div className="absolute bottom-[14px] flex justify-center inset-x-0">
        {Array.from({ length: images.length }, (_, index) => (
          <IoEllipseSharp
            key={index}
            size="8"
            color={currentPage === index ? '#589BF7' : '#ffffff'}
            className="inline mx-1"
          />
        ))}
      </div>
    </div>
  );
}

ImageSlide.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};