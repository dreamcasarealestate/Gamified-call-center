const Loader = () => {
  const COLOR = "#7C3AED";
  const COLOR_2 = "#22C55E";
  return (
    <div className="flex items-center justify-center min-h-full h-screen">
      <style>{`
        @keyframes cubeSpin {
          0% { transform: rotateX(-20deg) rotateY(0deg); }
          50% { transform: rotateX(-20deg) rotateY(180deg); }
          100% { transform: rotateX(-20deg) rotateY(360deg); }
        }

        @keyframes floaty {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes pulseGlow {
          0%,100% { opacity: 0.55; transform: scale(0.98); }
          50% { opacity: 0.95; transform: scale(1.06); }
        }

        .cubeWrap {
          transform-style: preserve-3d;
          perspective: 800px;
        }

        .cube {
          width: 52px;
          height: 52px;
          position: relative;
          transform-style: preserve-3d;
          animation: cubeSpin 1.4s linear infinite;
        }

        .face {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(6px);
          box-shadow:
            0 10px 30px rgba(0,0,0,0.18),
            inset 0 0 0 1px rgba(255,255,255,0.12);
        }

        .glowRing {
          width: 92px;
          height: 92px;
          border-radius: 999px;
          filter: blur(14px);
          animation: pulseGlow 1.2s ease-in-out infinite;
        }

        .floaty {
          animation: floaty 1.1s ease-in-out infinite;
        }
      `}</style>

      <div className="cubeWrap flex flex-col items-center gap-3">
        <div
          className="glowRing"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${COLOR}, transparent 55%), radial-gradient(circle at 70% 70%, ${COLOR_2}, transparent 55%)`,
          }}
        />

        <div className="cube floaty -mt-[92px]">
          <div
            className="face"
            style={{
              transform: "translateZ(26px)",
              background: `linear-gradient(135deg, ${COLOR}55, ${COLOR_2}33)`,
              outline: `1px solid ${COLOR}55`,
            }}
          />
          <div
            className="face"
            style={{
              transform: "translateZ(-26px) rotateY(180deg)",
              background: `linear-gradient(135deg, ${COLOR}33, #ffffff10)`,
              outline: `1px solid ${COLOR}45`,
            }}
          />
          <div
            className="face"
            style={{
              transform: "rotateY(90deg) translateZ(26px)",
              background: `linear-gradient(135deg, ${COLOR}44, ${COLOR_2}22)`,
              outline: `1px solid ${COLOR}40`,
            }}
          />
          <div
            className="face"
            style={{
              transform: "rotateY(-90deg) translateZ(26px)",
              background: `linear-gradient(135deg, ${COLOR_2}22, ${COLOR}22)`,
              outline: `1px solid ${COLOR}35`,
            }}
          />
          <div
            className="face"
            style={{
              transform: "rotateX(90deg) translateZ(26px)",
              background: `linear-gradient(135deg, #ffffff1a, ${COLOR}22)`,
              outline: `1px solid ${COLOR}33`,
            }}
          />
          <div
            className="face"
            style={{
              transform: "rotateX(-90deg) translateZ(26px)",
              background: `linear-gradient(135deg, ${COLOR}22, #00000012)`,
              outline: `1px solid ${COLOR}2a`,
            }}
          />

          <div
            className="absolute inset-0 m-auto h-5 w-5 rounded-lg"
            style={{
              transform: "translateZ(27px)",
              background: `linear-gradient(135deg, ${COLOR}, ${COLOR_2})`,
              boxShadow: `0 0 18px ${COLOR}66`,
            }}
          />
        </div>

        <div className="text-xs text-gray-500">Loading…</div>
      </div>
    </div>
  );
};

export default Loader;
