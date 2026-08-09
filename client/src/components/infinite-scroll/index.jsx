import { useEffect, useRef } from 'react';

const InfiniteScroll = ({
  action,
  hasMore,
  loading,
  loadingComponent,
  children,
  loaderClassName = '',
}) => {
  const loaderRef = useRef(null);
  const loadingRef = useRef(loading);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    if (!loaderRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loadingRef.current) {
            action();
          }
        });
      },
      { rootMargin: '0px 0px 200px 0px' }
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, action]);

  return (
    <>
      {children}
      {hasMore && (
        <span ref={loaderRef} className={loaderClassName}>
          {loading && loadingComponent}
        </span>
      )}
    </>
  );
};

export default InfiniteScroll;
