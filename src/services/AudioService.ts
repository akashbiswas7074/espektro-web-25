/**
 * Global Audio Service to manage background audio with aggressive autoplay
 */
class AudioService {
  private audio: HTMLAudioElement | null = null;
  private isInitialized: boolean = false;
  private attemptInterval: NodeJS.Timeout | null = null;
  
  /**
   * Initialize the audio service with a source
   */
  public initialize(audioSrc: string, volume: number = 0.3) {
    if (this.isInitialized && this.audio) {
      // Already initialized, just ensure it's playing
      this.audio.muted = false;
      this.play();
      return;
    }
    
    // Reset initialization flag on page load
    if (typeof window !== 'undefined') {
      localStorage.removeItem('audioInitialized');
    }

    // Create audio with both inline and API methods for maximum compatibility
    this.audio = new Audio(audioSrc);
    
    // Configure with unmuted state
    this.audio.loop = true;
    this.audio.volume = volume;
    this.audio.preload = 'auto';
    this.audio.muted = false;
    this.audio.autoplay = true;
    
    // Add backup loop handler
    this.audio.addEventListener('ended', this.handleEnded);
    
    // Start playback attempts
    this.startPlaybackAttempts();
    
    // Setup user interaction handlers
    this.setupUserInteractionHandlers();
    
    this.isInitialized = true;
    
    // Add to DOM for some browsers that need the element in the DOM
    document.body.appendChild(this.audio);
    
    // Initial attempt to play
    this.play();
    
    // Try multiple times with increasing delays
    setTimeout(() => this.play(), 100);
    setTimeout(() => this.play(), 500);
    setTimeout(() => this.play(), 1000);
    setTimeout(() => this.play(), 2000);

    // Auto-play attempt after initialization
    setTimeout(() => {
      this.play();
      if (typeof window !== 'undefined') {
        localStorage.setItem('audioInitialized', 'true');
      }
    }, 1000);
  }
  
  /**
   * Start continuous attempts to play audio
   */
  private startPlaybackAttempts() {
    // Clear any existing interval
    if (this.attemptInterval) {
      clearInterval(this.attemptInterval);
    }
    
    // Create a new interval to continuously attempt playback
    this.attemptInterval = setInterval(() => {
      if (this.audio && this.audio.paused) {
        console.log('Attempting to restart audio...');
        this.play();
      }
    }, 1000); // Check more frequently (every second)
  }
  
  /**
   * Setup handlers for user interaction
   */
  private setupUserInteractionHandlers() {
    // Create a single handler that captures any interaction
    const handleInteraction = () => {
      if (this.audio) {
        this.audio.muted = false;
        this.play();
      }
      
      // Remove listeners after first successful play
      if (this.audio && !this.audio.paused) {
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('keydown', handleInteraction);
        document.removeEventListener('scroll', handleInteraction);
      }
    };
    
    // Add listeners for common interactions
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('scroll', handleInteraction);
    
    // Also try when page becomes visible
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.audio) {
        this.audio.muted = false;
        this.play();
      }
    });
  }
  
  /**
   * Handle the 'ended' event as a backup for looping
   */
  private handleEnded = () => {
    if (this.audio) {
      this.audio.currentTime = 0;
      this.play();
    }
  }
  
  /**
   * Play the audio with multiple fallbacks
   */
  public play() {
    if (!this.audio) return;
    
    // Always ensure unmuted
    this.audio.muted = false;
    
    try {
      // Try the standard way
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Audio playback prevented:', error);
          // Try fallback method - this works in some browsers
          setTimeout(() => {
            if (this.audio) {
              this.audio.play().catch(e => console.error('Fallback play failed:', e));
            }
          }, 100);
        });
      }
    } catch (e) {
      console.error('Error attempting to play audio:', e);
    }
  }
  
  /**
   * Toggle mute state
   */
  public toggleMute() {
    if (!this.audio) return false;
    
    this.audio.muted = !this.audio.muted;
    
    // If unmuting, ensure it's playing
    if (!this.audio.muted && this.audio.paused) {
      this.play();
    }
    
    return this.audio.muted;
  }
  
  /**
   * Get current mute state
   */
  public isMuted() {
    return this.audio ? this.audio.muted : false;
  }
  
  /**
   * Clean up resources
   */
  public dispose() {
    if (this.attemptInterval) {
      clearInterval(this.attemptInterval);
    }
    
    if (this.audio) {
      this.audio.removeEventListener('ended', this.handleEnded);
      this.audio.pause();
      
      // Remove from DOM if it was added
      if (this.audio.parentNode) {
        this.audio.parentNode.removeChild(this.audio);
      }
      
      this.audio.src = '';
      this.audio = null;
    }
    
    this.isInitialized = false;
  }
}

// Create a singleton instance
const audioService = new AudioService();
export default audioService;
