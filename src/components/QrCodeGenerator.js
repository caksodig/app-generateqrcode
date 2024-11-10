"use client";
import React, { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, AlertCircle } from "lucide-react";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [size, setSize] = useState("300");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [isValidatedUrl, setIsValidatedUrl] = useState(false);
  const qrRef = useRef();

  useEffect(() => {
    const savedHistory = localStorage.getItem("qrHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Enhanced URL validation
  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      // Check if protocol is http or https
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  // Validate URL as user types
  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setError("");
    setIsValidatedUrl(false);
  };

  const generateQRCode = () => {
    if (!url) {
      setError("URL tidak boleh kosong");
      setIsValidatedUrl(false);
      return;
    }

    if (!isValidUrl(url)) {
      setError(
        "URL tidak valid. Pastikan dimulai dengan http:// atau https://"
      );
      setIsValidatedUrl(false);
      return;
    }

    setError("");
    setIsValidatedUrl(true);

    // Add to history only if URL is valid
    const newHistory = [
      { url, date: new Date().toLocaleString(), size },
      ...history.slice(0, 9),
    ];
    setHistory(newHistory);
    localStorage.setItem("qrHistory", JSON.stringify(newHistory));
  };

  const downloadQRCode = () => {
    if (!qrRef.current || !isValidatedUrl) return;

    const svg = qrRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const data = new XMLSerializer().serializeToString(svg);
    const DOMURL = window.URL || window.webkitURL || window;

    const img = new Image();
    const svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    const url = DOMURL.createObjectURL(svgBlob);

    img.onload = function () {
      canvas.width = parseInt(size);
      canvas.height = parseInt(size);
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);

      const imgURI = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const link = document.createElement("a");
      link.download = `qrcode-${size}x${size}.png`;
      link.href = imgURI;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.src = url;
  };

  const loadFromHistory = (historyItem) => {
    setUrl(historyItem.url);
    setSize(historyItem.size);
    // Validate URL from history
    setIsValidatedUrl(isValidUrl(historyItem.url));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("qrHistory");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Generator section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">QR Code Generator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Input
                type="url"
                placeholder="Masukkan URL disini... (contoh: https://www.example.com)"
                value={url}
                onChange={handleUrlChange}
                className="w-full"
              />

              <Select value={size} onValueChange={setSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih ukuran QR Code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="200">200x200</SelectItem>
                  <SelectItem value="300">300x300</SelectItem>
                  <SelectItem value="400">400x400</SelectItem>
                  <SelectItem value="500">500x500</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={generateQRCode}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Generate QR Code
              </Button>
            </div>

            {isValidatedUrl && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <QRCodeSVG
                      ref={qrRef}
                      value={url}
                      size={parseInt(size)}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                </div>
                <Button
                  onClick={downloadQRCode}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Download QR Code
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* History Section */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Riwayat</CardTitle>
            {history.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearHistory}
                className="text-red-600 hover:text-red-700"
              >
                Hapus Riwayat
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.length === 0 ? (
                <p className="text-center text-gray-500">Belum ada riwayat</p>
              ) : (
                history.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                    onClick={() => loadFromHistory(item)}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate">{item.url}</p>
                      <p className="text-xs text-gray-500">
                        {item.date} - {item.size}x{item.size}
                      </p>
                    </div>
                    <X
                      className="h-4 w-4 text-gray-400 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newHistory = history.filter(
                          (_, i) => i !== index
                        );
                        setHistory(newHistory);
                        localStorage.setItem(
                          "qrHistory",
                          JSON.stringify(newHistory)
                        );
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
