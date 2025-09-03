import { useEffect, useRef, useState } from "react";
import { getBoardPosition, updateBoardPosition } from "utils/storage";

const Draggable = ({ children, containerRef, id }) => {
  const storagePosition = getBoardPosition(id);

  const dragRef = useRef(null);
  const [pos, setPos] = useState({
    x: storagePosition.x || 20,
    y: storagePosition.y || 20,
  });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);

    const containerRect = containerRef.current.getBoundingClientRect();
    const elemRect = dragRef.current.getBoundingClientRect();

    setOffset({
      x: e.clientX - elemRect.left,
      y: e.clientY - elemRect.top,
      containerRect,
      elemRect,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const { containerRect, elemRect } = offset;

    let newX = e.clientX - containerRect.left - offset.x;
    let newY = e.clientY - containerRect.top - offset.y;

    // Clamp inside parent
    newX = Math.max(0, Math.min(newX, containerRect.width - elemRect.width));
    newY = Math.max(0, Math.min(newY, containerRect.height - elemRect.height));

    setPos({ x: newX, y: newY });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  /**
   * Push elements on the edge when resizing the screen
   */
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !dragRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const elemRect = dragRef.current.getBoundingClientRect();

      let newX = pos.x;
      let newY = pos.y;

      if (pos.x + elemRect.width > containerRect.width) {
        newX = Math.max(0, containerRect.width - elemRect.width);
      }

      if (pos.y + elemRect.height > containerRect.height) {
        newY = Math.max(0, containerRect.height - elemRect.height);
      }

      setPos({ x: newX, y: newY });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pos, containerRef]);

  useEffect(() => {
    updateBoardPosition(id, pos);
  }, [pos]);

  return (
    <div
      ref={dragRef}
      onMouseDown={handleMouseDown}
      className="absolute cursor-grab select-none"
      style={{
        left: pos.x,
        top: pos.y,
      }}
    >
      {children}
    </div>
  );
};
export default Draggable;
