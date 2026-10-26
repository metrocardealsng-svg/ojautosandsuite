# Rooms feature – install

1. Copy `public/rooms/*.jpg` into your repo's `public/rooms/`
2. Copy `components/Rooms.tsx` and `components/rooms.css` into your `components/` folder
3. Use it on any page:  `import Rooms from "@/components/Rooms";`  then  `<Rooms />`
4. Change `href="#book"` in Rooms.tsx to your booking/WhatsApp link.

Plain React/Vite (not Next.js)? Delete the first line (`"use client";`) and it works as is.
