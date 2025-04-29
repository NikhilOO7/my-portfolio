// src/types/custom.d.ts

// Declare MP3 file module
declare module '*.mp3' {
    const src: string;
    export default src;
  }
  
  // Declare other audio file types if needed
  declare module '*.wav' {
    const src: string;
    export default src;
  }
  
  declare module '*.ogg' {
    const src: string;
    export default src;
  }
  
  // Declare image file types if you're having issues with them
  declare module '*.png' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpeg' {
    const content: string;
    export default content;
  }
  
  declare module '*.svg' {
    const content: string;
    export default content;
  }
  
  declare module '*.gif' {
    const content: string;
    export default content;
  }