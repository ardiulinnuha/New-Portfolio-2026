import React from 'react';

interface YouTubeIconProps {
  className?: string;
  size?: number | string;
  alt?: string;
  variant?: 'color' | 'white' | 'monochrome';
  iconColor?: string;
  triangleColor?: string;
}

/**
 * YouTube Icon Component styled with rounded rectangle and center play triangle.
 * Supports standard red/color, white monochrome, and custom color overrides.
 */
export const YouTubeIcon: React.FC<YouTubeIconProps> = ({
  className = 'w-3.5 h-3.5',
  size,
  alt = 'YouTube',
  variant = 'color',
  iconColor,
  triangleColor,
}) => {
  const style = size ? { width: size, height: size } : undefined;
  const isWhite = variant === 'white' || variant === 'monochrome' || (className && className.includes('text-white'));

  const rectFill = iconColor || (isWhite ? '#FFFFFF' : '#FF0000');
  const triangleFill = triangleColor || (isWhite ? '#000000' : '#000000');

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 inline-block align-middle transition-transform duration-200 ${className}`}
      style={style}
      role="img"
      aria-label={alt}
    >
      {/* YouTube Rounded Rectangle */}
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
        fill={rectFill}
      />
      {/* Center Play Button Triangle */}
      <path
        d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        fill={triangleFill}
      />
    </svg>
  );
};

export default YouTubeIcon;
