import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import QRCodeStyling, {
  type DotType,
  type CornerSquareType,
  type CornerDotType,
  type ErrorCorrectionLevel
} from 'qr-code-styling';
import { Download, Link2, Settings2, Upload, Check } from 'lucide-react';
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
      const objectUrl = URL.createObjectURL(file);
      setLogoUrl(objectUrl);
      setIncludeLogo(true);
    }
  };

  const dotStyles: { value: DotType; label: string; icon: React.ReactNode }[] = [
    { value: 'square', label: 'Square', icon: <rect x="4" y="4" width="16" height="16" /> },
    { value: 'dots', label: 'Dots', icon: <circle cx="12" cy="12" r="8" /> },
    { value: 'rounded', label: 'Rounded', icon: <rect x="4" y="4" width="16" height="16" rx="4" /> },
    { value: 'extra-rounded', label: 'Extra Rounded', icon: <rect x="4" y="4" width="16" height="16" rx="8" /> },
    { value: 'classy', label: 'Classy', icon: <path d="M4 12v-4a4 4 0 0 1 4-4h8v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" /> },
    { value: 'classy-rounded', label: 'Classy Rounded', icon: <path d="M4 12v-4a4 4 0 0 1 4-4h8v8a4 4 0 0 1-4 4H4v-4z" /> },
  ];

  const cornerStyles: { value: CornerSquareType; label: string; icon: React.ReactNode }[] = [
    { value: 'square', label: 'Square', icon: <rect x="2" y="2" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" /> },
    { value: 'dot', label: 'Dot', icon: <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" /> },
    { value: 'extra-rounded', label: 'Extra Rounded', icon: <rect x="2" y="2" width="20" height="20" rx="6" fill="none" stroke="currentColor" strokeWidth="3" /> },
  ];

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-icon">
          <Link2 size={32} />
        </div>
        <div className="header-text">
          <h1>
            QR <span className="text-gradient">Generator</span>
          </h1>
          <p>Convert your links into professional QR codes instantly.</p>
        </div>
      </header>

      <main className="app-container">
        {/* Left Panel - Controls */}
        <div className="glass-panel controls-panel">
          <div className="section-title">
            <Settings2 size={20} />
            <h2>Customization</h2>
          </div>

          <div className="input-group">
            <label className="label">Destination URL</label>
            <input
              type="text"
              className="input-field"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-website.com"
            />
          </div>

          <div className="color-grid">
            <div className="input-group">
              <label className="label">Foreground Color</label>
              <div className="color-picker-wrapper">
                <input
                  type="color"
                  className="color-picker"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                />
                <input
                  type="text"
                  className="input-field"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label className="label">Background Color</label>
              <div className="color-picker-wrapper">
                <input
                  type="color"
                  className="color-picker"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
                <input
                  type="text"
                  className="input-field"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="label">Error Correction Level</label>
            <select
              className="input-field"
              value={level}
              onChange={(e) => setLevel(e.target.value as ErrorCorrectionLevel)}
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%) - Recommended for logos</option>
            </select>
          </div>

          <div className="divider"></div>

          <div className="input-group">
            <label className="label">QR Pattern Style</label>
            <div className="style-grid">
              {dotStyles.map((style) => (
                <button
                  key={style.value}
                  className={`style-btn ${dotType === style.value ? 'active' : ''}`}
                  onClick={() => setDotType(style.value)}
                  title={style.label}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    {style.icon}
                  </svg>
                  {dotType === style.value && <Check size={14} className="active-icon" />}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label className="label">Corner Style</label>
            <div className="style-grid corners">
              {cornerStyles.map((style) => (
                <button
                  key={style.value}
                  className={`style-btn ${cornerSquareType === style.value ? 'active' : ''}`}
                  onClick={() => {
                    setCornerSquareType(style.value);
                    setCornerDotType(style.value === 'extra-rounded' ? 'dot' : style.value as CornerDotType);
                  }}
                  title={style.label}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    {style.icon}
                  </svg>
                  {cornerSquareType === style.value && <Check size={14} className="active-icon" />}
                </button>
              ))}
            </div>
          </div>

          <div className="divider"></div>

          <div className="input-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeLogo}
                onChange={(e) => setIncludeLogo(e.target.checked)}
              />
              <span className="checkbox-text">Embed Logo</span>
            </label>

            {includeLogo && (
              <div className="logo-upload-section">
                <label className="upload-btn">
                  <Upload size={16} /> Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden-input"
                  />
                </label>
                {logoUrl && (
                  <div className="logo-preview-wrapper">
                    <img src={logoUrl} alt="Logo preview" className="logo-preview-image" />
                    <span>Logo Selected</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="preview-panel">
          <div className="glass-panel preview-container">
            <div 
              className="qr-wrapper"
              style={{ backgroundColor: bgColor }}
            >
              <div ref={qrRef} />
            </div>
            <p className="preview-hint">
              Scan this code with your phone's camera<br/>to test the destination.
            </p>
          </div>

          <button onClick={handleDownload} className="btn btn-primary download-btn">
            <Download size={20} />
            Download QR Code
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
