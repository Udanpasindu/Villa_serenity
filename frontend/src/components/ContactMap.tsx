
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AlertCircle } from 'lucide-react';

interface ContactMapProps {
  apiKey?: string;
}

const ContactMap = ({ apiKey }: ContactMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapApiKey, setMapApiKey] = useState(apiKey || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  
  useEffect(() => {
    if (!mapContainer.current || !mapApiKey) return;

    mapboxgl.accessToken = mapApiKey;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-77.0369, 38.9072], // Default location (sample)
        zoom: 14
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Add marker
      const marker = new mapboxgl.Marker({ color: '#B38C6C' })
        .setLngLat([-77.0369, 38.9072])
        .setPopup(new mapboxgl.Popup().setHTML("<h3 class='font-serif font-medium'>Villa Serenity</h3><p>123 Serenity Road</p>"))
        .addTo(map.current);
      
      // Open popup by default
      marker.togglePopup();

      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [mapApiKey]);

  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('apiKey') as HTMLInputElement;
    const newApiKey = input.value.trim();
    if (newApiKey) {
      setMapApiKey(newApiKey);
      setShowApiKeyInput(false);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md relative h-[400px] md:h-full">
      {!mapApiKey && (
        <div className="absolute inset-0 bg-secondary flex flex-col items-center justify-center p-6 z-10">
          {showApiKeyInput ? (
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-amber-600 bg-amber-50 p-3 rounded-md">
                <AlertCircle size={18} />
                <p className="text-sm">Mapbox API Key required to display the map.</p>
              </div>
              <form onSubmit={handleApiKeySubmit}>
                <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
                  Enter your Mapbox public token:
                </label>
                <input 
                  type="text" 
                  id="apiKey" 
                  name="apiKey" 
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                  placeholder="pk.eyJ1IjoieW91..."
                  required
                />
                <button 
                  type="submit" 
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90"
                >
                  Set API Key
                </button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">
                To get a Mapbox token, visit <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a> and create an account.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg mb-2">Loading map...</p>
              <p className="text-sm text-muted-foreground">If the map doesn't appear, there might be an issue with the API key.</p>
              <button 
                onClick={() => setShowApiKeyInput(true)}
                className="text-primary underline mt-2"
              >
                Enter different API key
              </button>
            </div>
          )}
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default ContactMap;
