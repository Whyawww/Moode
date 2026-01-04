import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Moode - Focus shouldn't be boring";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logoData = await fetch(new URL("../public/logo.png", import.meta.url))
    .then((res) => res.arrayBuffer())
    .catch(() => null);

  const textData = await fetch(new URL("../public/moode.png", import.meta.url))
    .then((res) => res.arrayBuffer())
    .catch(() => null);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.20) 0%, transparent 50%), " +
            "radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.20) 0%, transparent 50%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo & Text Container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            gap: "24px",
          }}
        >
          {/* LOGO IMAGE */}
          {logoData && (
            <img
              src={logoData as any}
              alt="Moode Logo"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 20px rgba(56, 189, 248, 0.3))",
              }}
            />
          )}

          {/* MOODE */}
          {textData && (
            <img
              src={textData as any}
              alt="Moode Text"
              style={{
                height: "80px",
                objectFit: "contain",
              }}
            />
          )}
        </div>

        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            fontWeight: 500,
            marginTop: "10px",
            textAlign: "center",
            letterSpacing: "0.02em",
          }}
        >
          Focus shouldn't be boring.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
