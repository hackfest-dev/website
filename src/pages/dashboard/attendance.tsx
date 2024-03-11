import { useZxing } from "react-zxing";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";

export default function Attendance() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      stopCamera();
    },
  });

  const stopCamera = () => {
    const stream = ref.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => {
      track.stop();
    });
  };

  const startCamera = async () => {
    // start the camera again
    await navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        const video = ref.current;
        if (video) {
          video.srcObject = stream;
        }
      });
  };

  const clearScanResults = () => {
    setResult(null);
    setError(null);
  };
  const [cameraOn, setCameraOn] = useState(true);

  return (
    <>
      <video className="w-full rounded-lg border border-gray-400" ref={ref} />
      {!result && (
        <div className="mt-2 text-center text-sm text-gray-400">
          <span className="text-green-500">Note:</span> Detection is retried
          every 300ms. If you are not seeing the detection, try moving the
          camera closer to the QR code.
        </div>
      )}
      <Badge color={"info"}>Scanned ID: {result}</Badge>
    </>
  );
}
