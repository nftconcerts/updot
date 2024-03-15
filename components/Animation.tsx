import React, { useEffect, useRef } from "react";

interface Props {
  jackpotMode: boolean;
  setJackpotMode: (jackpotMode: boolean) => void;
}

const Animation: React.FC<Props> = ({ jackpotMode, setJackpotMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestIdRef = useRef<number>();
  const jackpotStartRef = useRef<number | null>(null);
  const lineOffsetRef = useRef<number>(0);
  const horizontalLineOffsetRef = useRef<number>(3);
  const dotYRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const easeInOutQuad = (t: any) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let frameCount = 0;
    const dotRadius = 7;
    const gridLineCount = 20;
    let gridLineSpeed = 3;
    const maxSpeed = 300;

    const moveDotInSineWave = () => {
      const amplitude = canvas.height / 4;
      const frequency = 0.01;
      const dotX = canvas.width / 2;
      dotYRef.current =
        canvas.height / 2 +
        amplitude * Math.sin(frameCountRef.current * frequency);
      return { dotX, dotY: dotYRef.current };
    };

    const drawBackground = (
      lineOffset: number,
      horizontalLineOffset: number
    ) => {
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      for (let i = 0; i <= gridLineCount; i++) {
        const y =
          ((i * canvasHeight) / gridLineCount + lineOffset) % canvasHeight;
        ctx.strokeStyle = "#333333";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();

        if (i === 0) {
          ctx.strokeStyle = "#777";
          ctx.lineWidth = 5;
          ctx.stroke();
        }

        // Adjusted calculation here for x
        const x =
          canvasWidth -
          (((i * canvasWidth) / gridLineCount + horizontalLineOffset) %
            canvasWidth);
        ctx.strokeStyle = "#333333";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();

        if (i === 0) {
          ctx.strokeStyle = "#777";
          ctx.lineWidth = 5;
          ctx.stroke();
        }
      }
    };

    const drawDot = ({ dotX, dotY }: { dotX: number; dotY: number }) => {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI);
      ctx.fill();
    };

    const drawLine = (
      { dotX, dotY }: { dotX: number; dotY: number },
      angle: number
    ) => {
      const lineLength = Math.sqrt(canvasWidth ** 2 + canvasHeight ** 2);
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(dotX, dotY);
      ctx.lineTo(
        dotX - lineLength * Math.cos(angle),
        dotY - lineLength * Math.sin(angle)
      );
      ctx.stroke();
    };

    const calculateLineAngle = (dotY: number, progress: number) => {
      const normalAngle =
        -Math.PI / 2 -
        (-Math.PI / 4) * ((dotY - canvasHeight / 4) / (canvasHeight / 2));
      const straightDownAngle = -Math.PI / 2;
      return normalAngle * (1 - progress) + straightDownAngle * progress;
    };

    const animate = () => {
      const now = Date.now();
      let progress: number;
      if (jackpotMode) {
        if (jackpotStartRef.current === null) jackpotStartRef.current = now;
        const duration = now - jackpotStartRef.current;
        const phaseDuration = 2000; // Duration of each phase (start, full speed, end)
        if (duration <= phaseDuration) {
          progress = easeInOutQuad(duration / phaseDuration);
        } else if (duration <= 2 * phaseDuration) {
          progress = 1;
        } else if (duration <= 3 * phaseDuration) {
          progress =
            1 - easeInOutQuad((duration - 2 * phaseDuration) / phaseDuration);
        } else {
          setJackpotMode(false);
          jackpotStartRef.current = null;
          progress = 0;
        }
        gridLineSpeed = 3 + (maxSpeed - 3) * progress;
      } else {
        gridLineSpeed = 3;
        progress = 0;
      }

      lineOffsetRef.current += gridLineSpeed;
      horizontalLineOffsetRef.current += 3; // Update line offset based on current speed

      const { dotX, dotY } = moveDotInSineWave();
      const lineOffset = lineOffsetRef.current % canvasHeight;

      const horizontalLineOffset =
        horizontalLineOffsetRef.current % canvasWidth; // Modulo to loop smoothly

      drawBackground(lineOffset, horizontalLineOffset);
      drawLine({ dotX, dotY }, calculateLineAngle(dotY, progress));
      drawDot({ dotX, dotY });

      frameCountRef.current++;
      requestIdRef.current = requestAnimationFrame(animate);
    };

    requestIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current);
    };
  }, [jackpotMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-screen z-0"
    ></canvas>
  );
};

export default Animation;
