import { useMemo } from "react";

const getAvgHex = (color: number, total: number) =>
  Math.round(color / total)
    .toString(16)
    .padStart(2, "0");

export const useEmojiColor = (emoji: string) => {
  const avgColor = useMemo(() => {
    if (!emoji) return "#000000";

    let totalPixels = 0;
    const colors = {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
    };
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return "#000000";
    }

    ctx.font = "30px Arial";
    ctx.fillText(emoji, 0, 28);
    const { data: imageData } = ctx.getImageData(0, 0, 30, 30);

    for (let i = 0; i < imageData.length; i += 4) {
      let [r, g, b, a] = imageData.slice(i, i + 4);
      if (a > 50) {
        totalPixels += 1;
        colors.red += r;
        colors.green += g;
        colors.blue += b;
        colors.alpha += a;
      }
    }

    const r = getAvgHex(colors.red, totalPixels);
    const g = getAvgHex(colors.green, totalPixels);
    const b = getAvgHex(colors.blue, totalPixels);

    return "#" + r + g + b;
  }, [emoji]);

  return avgColor;
};
