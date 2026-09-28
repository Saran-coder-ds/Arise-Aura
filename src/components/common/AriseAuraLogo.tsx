import React from 'react';

interface AriseAuraLogoProps {
  variant?: 'full' | 'icon' | 'stacked' | 'horizontal';
  theme?: 'gold' | 'white' | 'dark' | 'cream';
  className?: string;
  iconSize?: number | string;
  showSubtitle?: boolean;
}

export const AriseAuraLogo: React.FC<AriseAuraLogoProps> = ({
  variant = 'full',
  theme = 'gold',
  className = '',
  iconSize = 36,
  showSubtitle = true
}) => {
  // Theme color definitions
  const colors = {
    gold: {
      fill: 'url(#ariseGoldGradient)',
      text: '#ffffff',
      goldText: '#d4af37',
      subText: '#e5c358',
      stroke: '#d4af37'
    },
    white: {
      fill: '#ffffff',
      text: '#ffffff',
      goldText: '#ffffff',
      subText: '#d4d4d8',
      stroke: '#ffffff'
    },
    dark: {
      fill: '#0c0c0e',
      text: '#0c0c0e',
      goldText: '#18181b',
      subText: '#3f3f46',
      stroke: '#0c0c0e'
    },
    cream: {
      fill: '#f5f0e8',
      text: '#f5f0e8',
      goldText: '#e8dcbe',
      subText: '#c5b89a',
      stroke: '#f5f0e8'
    }
  }[theme];

  // The authentic majestic eagle emblem corresponding to ARISE AURA brand image
  const EagleIcon = () => (
    <svg
      viewBox="0 0 512 360"
      width={iconSize}
      height={typeof iconSize === 'number' ? iconSize * 0.7 : undefined}
      fill="currentColor"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ariseGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3e3a2" />
          <stop offset="35%" stopColor="#d4af37" />
          <stop offset="70%" stopColor="#f5df88" />
          <stop offset="100%" stopColor="#9a7b20" />
        </linearGradient>
        <linearGradient id="wingShine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <g fill={theme === 'gold' ? 'url(#ariseGoldGradient)' : colors.fill}>
        {/* Eagle Head & Crown */}
        <path d="M256 95 C259 88 266 84 274 85 C282 86 288 92 284 100 C280 108 274 113 268 116 C272 120 274 126 270 132 C266 138 259 142 254 144 C256 134 255 125 250 118 C245 110 248 102 256 95 Z" />
        
        {/* Eagle Beak */}
        <path d="M276 96 C286 98 296 104 294 112 C288 113 282 110 278 107 Z" />
        
        {/* Center Torso / Chest */}
        <path d="M256 128 C266 142 272 165 272 195 C272 230 264 256 256 285 C248 256 240 230 240 195 C240 165 246 142 256 128 Z" />

        {/* Tail Feather Base */}
        <path d="M256 265 L263 310 L256 325 L249 310 Z" />

        {/* LEFT WING - Primary Top Primary Feather */}
        <path d="M246 138 C232 115 198 75 125 58 C160 88 185 118 198 152 C180 142 152 130 112 118 C144 146 166 172 178 200 C162 195 138 188 108 182 C138 204 158 226 168 252 C152 249 135 245 116 242 C146 262 165 282 176 304 C188 276 210 240 242 215 C245 185 246 158 246 138 Z" />
        
        {/* LEFT WING - Secondary Upper Wing Spread Feathers */}
        <path d="M236 150 C210 120 170 82 124 60 C154 84 178 114 192 148 C164 136 136 125 106 117 C134 140 156 168 170 198 C148 194 126 189 98 185 C124 204 144 226 156 250 C172 220 198 185 236 150 Z" opacity="0.95" />
        <path d="M228 172 C204 146 168 116 132 94 C156 118 176 145 188 176 C168 170 144 164 120 160 C144 180 162 202 172 226 C190 198 210 180 228 172 Z" opacity="0.9" />

        {/* RIGHT WING - Primary Top Primary Feather */}
        <path d="M266 138 C280 115 314 75 387 58 C352 88 327 118 314 152 C332 142 360 130 400 118 C368 146 346 172 334 200 C350 195 374 188 404 182 C374 204 354 226 344 252 C360 249 377 245 396 242 C366 262 347 282 336 304 C324 276 302 240 270 215 C267 185 266 158 266 138 Z" />

        {/* RIGHT WING - Secondary Upper Wing Spread Feathers */}
        <path d="M276 150 C302 120 342 82 388 60 C358 84 334 114 320 148 C348 136 376 125 406 117 C378 140 356 168 342 198 C364 194 386 189 414 185 C388 204 368 226 356 250 C340 220 314 185 276 150 Z" opacity="0.95" />
        <path d="M284 172 C308 146 344 116 380 94 C356 118 336 145 324 176 C344 170 368 164 392 160 C368 180 350 202 340 226 C322 198 302 180 284 172 Z" opacity="0.9" />
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <EagleIcon />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center group cursor-pointer ${className}`}>
        <EagleIcon />
        <div className="mt-2 flex flex-col items-center">
          <span 
            className="font-black tracking-[0.22em] text-xl sm:text-2xl font-['Outfit'] uppercase transition-colors"
            style={{ color: colors.text }}
          >
            ARISE AURA
          </span>
          {showSubtitle && (
            <div className="flex items-center gap-2 mt-1">
              <span className="w-4 h-[1px] bg-[#d4af37]/60" />
              <span 
                className="text-[10px] tracking-[0.35em] uppercase font-bold font-['Plus_Jakarta_Sans']"
                style={{ color: colors.subText }}
              >
                CLOTHING
              </span>
              <span className="w-4 h-[1px] bg-[#d4af37]/60" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default 'full' or 'horizontal'
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none ${className}`}>
      <div className="relative flex items-center justify-center p-1 rounded-xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-zinc-800 shadow-md">
        <EagleIcon />
      </div>

      <div className="flex flex-col justify-center">
        <span 
          className="font-extrabold tracking-[0.16em] text-base sm:text-lg font-['Outfit'] uppercase transition-colors group-hover:text-[#d4af37]"
          style={{ color: colors.text }}
        >
          ARISE AURA
        </span>
        {showSubtitle && (
          <div className="flex items-center gap-1.5 -mt-0.5">
            <span className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase font-bold text-[#d4af37]">
              &mdash; CLOTHING &mdash;
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
