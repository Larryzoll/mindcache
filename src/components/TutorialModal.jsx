import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function TutorialModal({ isOpen, onClose }) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      // API already loaded, init immediately
      initPlayer();
    }

    return () => {
      // Cleanup player when modal closes
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [isOpen]);

  const initPlayer = () => {
    if (!containerRef.current || playerRef.current) return;

    playerRef.current = new window.YT.Player('tutorial-video', {
      videoId: 'lIyYN4Y6so4',
      playerVars: {
        autoplay: 1,
        playsinline: 1,
      },
      events: {
        onReady: (event) => {
          // Set playback speed to 2x when player is ready
          event.target.setPlaybackRate(2);
        },
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            Welcome to MindCache!
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Video */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div ref={containerRef} className="aspect-video w-full bg-black rounded-lg overflow-hidden">
            <div id="tutorial-video" className="w-full h-full"></div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This quick tutorial will show you how to get the most out of MindCache.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Playing at 2x speed by default. You can adjust this in the video player.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Skip tutorial
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-orange-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
