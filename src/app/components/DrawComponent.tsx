/* eslint-disable react/jsx-key */
"use client";

import React, { useState } from "react";
import { Circle, Layer, Line, Rect, RegularPolygon, Stage } from "react-konva";

interface Shape {
  type: "rect" | "circle" | "line" | "polygon";
  x?: number;
  y?: number;
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
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <div className="space-x-2 flex flex-wrap items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={() => setShapeType("rect")}
          >
            Rectangle
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={() => setShapeType("circle")}
          >
            Circle
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={() => setShapeType("line")}
          >
            Line
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={() => setShapeType("polygon")}
          >
            Polygon
          </button>

          <div className="ml-4">
            <label className="block text-gray-700 mb-2 mr-2 ml-4">
              Color:
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="mt-1 ml-2 px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="black">Black</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
              </select>
            </label>
          </div>

          <div className="ml-4">
            <label className="block text-gray-700 mb-2 mr-2">
              Fill:
              <select
                value={fill ? "filled" : "outlined"}
                onChange={(e) => setFill(e.target.value === "filled")}
                className="mt-1 ml-2 px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="filled">Filled</option>
                <option value="outlined">Outlined</option>
              </select>
            </label>
          </div>

          {!fill && (
            <div className="ml-4">
              <label className="block text-gray-700 mb-2">
                Stroke Width:
                <input
                  type="number"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                  className="mt-1 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      <Stage
        width={800}
        height={500}
        className="container max-w-5xl mx-auto rounded-xl border-4 border-gray-500 bg-gray-100"
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
