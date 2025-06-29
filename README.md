# Scroll Video Player

A modern, responsive website that plays video smoothly as you scroll. The video scrubs through its timeline based on your scroll position, creating an immersive scrolling experience.

## Features

- **Smooth Scroll Video Playback**: Video plays and scrubs based on scroll position
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Performance Optimized**: Uses requestAnimationFrame and throttling for smooth performance
- **Loading States**: Shows loading indicator while video loads
- **Cross-browser Compatible**: Works on all modern browsers

## How to Use

1. **Open the website**: Simply open `index.html` in your web browser
2. **Scroll to experience**: Scroll down to see the video section
3. **Watch the magic**: As you scroll, the video will play smoothly through its timeline
4. **Enjoy the experience**: The video scrubs forward and backward based on your scroll position

## File Structure

```
videoanimate/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript for scroll video functionality
├── 0001-0460.mp4       # Your video file
└── README.md           # This file
```

## Technical Details

### How it Works

1. **Scroll Detection**: The JavaScript listens for scroll events and calculates scroll progress through the video section
2. **Video Scrubbing**: Based on scroll position, the video's `currentTime` is updated to match the scroll progress
3. **Performance**: Uses `requestAnimationFrame` for smooth 60fps updates and throttling to prevent excessive calculations
4. **Responsive**: The video maintains aspect ratio and covers the full viewport on all devices

### Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features

- **Throttled scroll events**: Prevents excessive calculations
- **RequestAnimationFrame**: Ensures smooth 60fps updates
- **Intersection Observer**: Optimizes video loading
- **Passive event listeners**: Improves scroll performance

## Customization

### Changing the Video

Simply replace `0001-0460.mp4` with your own video file and update the source in `index.html`:

```html
<video id="scrollVideo" muted playsinline>
    <source src="your-video.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

### Styling

The website uses modern CSS with:
- CSS Grid and Flexbox for layout
- CSS animations and transitions
- Responsive design with media queries
- Custom scrollbar styling

### Content

You can easily modify the content sections in `index.html` to match your needs. The video section will remain functional regardless of the content above or below it.

## Troubleshooting

### Video Not Playing
- Ensure the video file is in the same directory as `index.html`
- Check that the video file is a valid MP4 format
- Some browsers require user interaction before playing videos

### Performance Issues
- The website is optimized for modern browsers
- Large video files may take time to load initially
- Consider compressing your video for better performance

### Mobile Issues
- The website is fully responsive and should work on all mobile devices
- Touch scrolling is supported
- Video scrubbing works with touch gestures

## License

This project is open source and available under the MIT License. 