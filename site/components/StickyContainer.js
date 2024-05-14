const StickyContainer = ({ children, startId, endId }) => {
    return (
      <div id={startId} className="relative">
        <div className="sticky top-1/2 transform -translate-y-1/2">
          {children}
        </div>
        <div id={endId}></div>
      </div>
    );
  };
  
  export default StickyContainer;
  