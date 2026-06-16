import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import QRCodeStyling, {
  type DotType,
  type CornerSquareType,
  type CornerDotType,
  type ErrorCorrectionLevel
} from 'qr-code-styling';
import { Download, Link2, Settings2, Upload } from 'lucide-react';
import './App.css';

function App() {
  const [url, setUrl] = useState('https://example.com');
  const [fgColor, setFgColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#1e293b');
  const [level, setLevel] = useState<ErrorCorrectionLevel>('H');
  
  // Style states
  const [dotType, setDotType] = useState<DotType>('rounded');
  const [cornerSquareType, setCornerSquareType] = useState<CornerSquareType>('extra-rounded');
  const [cornerDotType, setCornerDotType] = useState<CornerDotType>('dot');

  // Logo states
  const [includeLogo, setIncludeLogo] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>('');

  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>(
    new QRCodeStyling({
      width: 280,
      height: 280,
      margin: 10,
      type: 'canvas',
    })
  );

  useEffect(() => {
    qrCode.current.update({
      data: url || 'https://',
      qrOptions: {
        errorCorrectionLevel: level,
      },
      dotsOptions: {
        color: fgColor,
        type: dotType,
      },
      backgroundOptions: {
        color: bgColor,
      },
      cornersSquareOptions: {
        color: fgColor,
        type: cornerSquareType,
      },
      cornersDotOptions: {
        color: fgColor,
        type: cornerDotType,
      },
      image: includeLogo ? logoUrl : '',
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 5,
        imageSize: 0.4,
      },
    });
  }, [url, fgColor, bgColor, level, dotType, cornerSquareType, cornerDotType, includeLogo, logoUrl]);

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.current.append(qrRef.current);
    }
  }, []);

  const handleDownload = () => {
    qrCode.current.download({ name: 'qrcode', extension: 'png' });
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local object URL for the uploaded file
      const objectUrl = URL.createObjectURL(file);
      setLogoUrl(objectUrl);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <header className="w-full max-w-7xl mx-auto py-8 px-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Link2 className="text-blue-400" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              QR <span className="text-gradient">Generator</span>
            </h1>
            <p className="text-gray-400 mt-1">Convert your links into professional QR codes instantly.</p>
          </div>
        </div>
      </header>

      <main className="app-container">
        {/* Left Panel - Controls */}
        <div className="glass-panel p-8 rounded-2xl flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <Settings2 size={20} className="text-blue-400" />
            <h2 className="text-xl font-semibold">Customization</h2>
          </div>

          <div>
            <label className="label">Destination URL</label>
            <input
              type="text"
              className="input-field"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-website.com"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="label">Foreground Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  className="h-12 w-12 rounded cursor-pointer border-0 p-0 bg-transparent"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                />
                <input
                  type="text"
                  className="input-field flex-1"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full">
              <label className="label">Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  className="h-12 w-12 rounded cursor-pointer border-0 p-0 bg-transparent"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
                <input
                  type="text"
                  className="input-field flex-1"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-700">
            <div>
              <label className="label">Error Correction Level</label>
              <select
                className="input-field appearance-none cursor-pointer"
                value={level}
                onChange={(e) => setLevel(e.target.value as ErrorCorrectionLevel)}
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>

            <div>
              <label className="label">QR Style (Dots)</label>
              <select
                className="input-field appearance-none cursor-pointer"
                value={dotType}
                onChange={(e) => setDotType(e.target.value as DotType)}
              >
                <option value="square">Square</option>
                <option value="dots">Dots</option>
                <option value="rounded">Rounded</option>
                <option value="extra-rounded">Extra Rounded</option>
                <option value="classy">Classy</option>
                <option value="classy-rounded">Classy Rounded</option>
              </select>
            </div>
            
            <div>
              <label className="label">Corner Squares Style</label>
              <select
                className="input-field appearance-none cursor-pointer"
                value={cornerSquareType}
                onChange={(e) => setCornerSquareType(e.target.value as CornerSquareType)}
              >
                <option value="square">Square</option>
                <option value="dot">Dot</option>
                <option value="extra-rounded">Extra Rounded</option>
              </select>
            </div>

            <div>
              <label className="label">Corner Dots Style</label>
              <select
                className="input-field appearance-none cursor-pointer"
                value={cornerDotType}
                onChange={(e) => setCornerDotType(e.target.value as CornerDotType)}
              >
                <option value="square">Square</option>
                <option value="dot">Dot</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500/50 cursor-pointer"
                checked={includeLogo}
                onChange={(e) => setIncludeLogo(e.target.checked)}
              />
              <span className="font-medium">Embed Logo inside QR</span>
            </label>

            {includeLogo && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                <label className="label flex items-center gap-2">
                  <Upload size={16} /> Upload Logo Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="block w-full text-sm text-slate-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-500/10 file:text-blue-400
                    hover:file:bg-blue-500/20 cursor-pointer"
                />
                {logoUrl && (
                  <div className="mt-3 flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                    <img src={logoUrl} alt="Logo preview" className="w-10 h-10 object-contain rounded" />
                    <span className="text-sm text-slate-300">Logo selected</span>
                  </div>
                )}
                <p className="text-xs text-slate-400 mt-3">
                  Tip: Use a square image with a transparent background for best results.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex flex-col gap-6 items-center">
          <div className="glass-panel w-full p-8 rounded-2xl flex flex-col items-center justify-center min-h-[400px]">
            <div 
              className="p-4 bg-white rounded-xl shadow-2xl transition-transform hover:scale-105 duration-300 overflow-hidden"
              style={{ backgroundColor: bgColor }}
            >
              <div ref={qrRef} className="qr-container" />
            </div>
            <p className="text-slate-400 mt-6 text-sm text-center">
              Scan this code with your phone's camera<br/>to test the destination.
            </p>
          </div>

          <button 
            onClick={handleDownload}
            className="btn btn-primary w-full max-w-xs shadow-lg shadow-blue-500/25"
          >
            <Download size={20} />
            Download QR Code
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
