"use client";

import React, { useState } from "react";
import { Circle, Layer, Line, Rect, RegularPolygon, Stage } from "react-konva";

interface Shape {
  type: "rect" | "circle" | "line" | "polygon";
  x: number;
  y: number;
  x2?: number;
  y2?: number;
  width?: number;
  height?: number;
  radius?: number;
  points?: number[];
  sides?: number;
  color: string;
  fill: boolean;
  strokeWidth: number;
}

const DrawComponent: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [newShape, setNewShape] = useState<Shape | null>(null);
  const [shapeType, setShapeType] = useState<
    "rect" | "circle" | "line" | "polygon"
  >("rect");
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [color, setColor] = useState("black");
  const [fill, setFill] = useState(true);
  const [strokeWidth, setStrokeWidth] = useState(2);

  const handleMouseDown = (e: any) => {
    const pos = e.target.getStage().getPointerPosition();
    if (!isDrawing) {
      setStartPos(pos);
      setIsDrawing(true);
    } else {
      if (shapeType === "rect") {
        const width = Math.abs(pos.x - startPos!.x);
        const height = Math.abs(pos.y - startPos!.y);
        const x = Math.min(pos.x, startPos!.x);
        const y = Math.min(pos.y, startPos!.y);
        setShapes([
          ...shapes,
          { type: "rect", x, y, width, height, color, fill, strokeWidth },
        ]);
      } else if (shapeType === "circle") {
        const radius = Math.sqrt(
          (pos.x - startPos!.x) ** 2 + (pos.y - startPos!.y) ** 2
        );
        setShapes([
          ...shapes,
          {
            type: "circle",
            x: startPos!.x,
            y: startPos!.y,
            radius,
            color,
            fill,
            strokeWidth,
          },
        ]);
      } else if (shapeType === "line") {
        setShapes([
          ...shapes,
          {
            type: "line",
            points: [startPos!.x, startPos!.y, pos.x, pos.y],
            color,
            fill,
            strokeWidth,
          },
        ]);
      } else if (shapeType === "polygon") {
        const radius = Math.sqrt(
          (pos.x - startPos!.x) ** 2 + (pos.y - startPos!.y) ** 2
        );
        setShapes([
          ...shapes,
          {
            type: "polygon",
            x: startPos!.x,
            y: startPos!.y,
            sides: 5,
            radius,
            color,
            fill,
            strokeWidth,
          },
        ]);
      }
      setIsDrawing(false);
      setNewShape(null);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    const pos = e.target.getStage().getPointerPosition();
    if (shapeType === "rect") {
      const width = Math.abs(pos.x - startPos!.x);
      const height = Math.abs(pos.y - startPos!.y);
      const x = Math.min(pos.x, startPos!.x);
      const y = Math.min(pos.y, startPos!.y);
      setNewShape({
        type: "rect",
        x,
        y,
        width,
        height,
        color,
        fill,
        strokeWidth,
      });
    } else if (shapeType === "circle") {
      const radius = Math.sqrt(
        (pos.x - startPos!.x) ** 2 + (pos.y - startPos!.y) ** 2
      );
      setNewShape({
        type: "circle",
        x: startPos!.x,
        y: startPos!.y,
        radius,
        color,
        fill,
        strokeWidth,
      });
    } else if (shapeType === "line") {
      setNewShape({
        type: "line",
        points: [startPos!.x, startPos!.y, pos.x, pos.y],
        color,
        fill,
        strokeWidth,
      });
    } else if (shapeType === "polygon") {
      const radius = Math.sqrt(
        (pos.x - startPos!.x) ** 2 + (pos.y - startPos!.y) ** 2
      );
      setNewShape({
        type: "polygon",
        x: startPos!.x,
        y: startPos!.y,
        sides: 5,
        radius,
        color,
        fill,
        strokeWidth,
      });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setShapeType("rect")}>Rectangle</button>
        <button onClick={() => setShapeType("circle")}>Circle</button>
        <button onClick={() => setShapeType("line")}>Line</button>
        <button onClick={() => setShapeType("polygon")}>Polygon</button>
        <label>
          Color:
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="black">Black</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
          </select>
        </label>
        <label>
          Fill:
          <select
            value={fill ? "filled" : "outlined"}
            onChange={(e) => setFill(e.target.value === "filled")}
          >
            <option value="filled">Filled</option>
            <option value="outlined">Outlined</option>
          </select>
        </label>
        {!fill && (
          <label>
            Stroke Width:
            <input
              type="number"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
            />
          </label>
        )}
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {shapes.map((shape, i) => {
            const commonProps = {
              key: i,
              stroke: shape.fill ? "transparent" : shape.color,
              strokeWidth: shape.strokeWidth,
            };
            if (shape.type === "rect") {
              return (
                <Rect
                  {...commonProps}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width!}
                  height={shape.height!}
                  fill={shape.fill ? shape.color : "transparent"}
                />
              );
            } else if (shape.type === "circle") {
              return (
                <Circle
                  {...commonProps}
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius!}
                  fill={shape.fill ? shape.color : "transparent"}
                />
              );
            } else if (shape.type === "line") {
              return (
                <Line
                  {...commonProps}
                  points={shape.points!}
                  stroke={shape.color}
                  strokeWidth={shape.strokeWidth}
                />
              );
            } else if (shape.type === "polygon") {
              return (
                <RegularPolygon
                  {...commonProps}
                  x={shape.x}
                  y={shape.y}
                  sides={shape.sides!}
                  radius={shape.radius!}
                  fill={shape.fill ? shape.color : "transparent"}
                />
              );
            } else {
              return null;
            }
          })}
          {newShape && newShape.type === "rect" && (
            <Rect
              x={newShape.x}
              y={newShape.y}
              width={newShape.width!}
              height={newShape.height!}
              fill="transparent"
              stroke="blue"
              dash={[10, 5]}
            />
          )}
          {newShape && newShape.type === "circle" && (
            <Circle
              x={newShape.x}
              y={newShape.y}
              radius={newShape.radius!}
              fill="transparent"
              stroke="red"
              dash={[10, 5]}
            />
          )}
          {newShape && newShape.type === "line" && (
            <Line
              points={newShape.points!}
              stroke="green"
              strokeWidth={2}
              dash={[10, 5]}
            />
          )}
          {newShape && newShape.type === "polygon" && (
            <RegularPolygon
              x={newShape.x}
              y={newShape.y}
              sides={newShape.sides!}
              radius={newShape.radius!}
              fill="transparent"
              stroke="purple"
              dash={[10, 5]}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawComponent;
