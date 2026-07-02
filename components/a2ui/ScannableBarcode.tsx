"use client";

import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { Text } from "@design-system/react";

interface ScannableBarcodeProps {
  code: string;
}

export function ScannableBarcode({ code }: ScannableBarcodeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    JsBarcode(svgRef.current, code, {
      format: "CODE128",
      displayValue: false,
      margin: 8,
      height: 56,
      width: 2,
      background: "#ffffff",
      lineColor: "#1f1e2f",
    });
  }, [code]);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-2 flex justify-center">
        <svg ref={svgRef} role="img" aria-label={`Barcode ${code}`} />
      </div>
      <Text size="s">
        <strong>{code}</strong>
      </Text>
    </div>
  );
}
