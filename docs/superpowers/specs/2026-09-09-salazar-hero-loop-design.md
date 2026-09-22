# Salazar hero loop — design

Date: 2026-09-09  
Status: approved to build

## Goal

Replace the ILOVEDUST Vimeo hero with a **24s silent Salazar loop** compiled from the agency’s own stills and video plates. Same job as the current iframe: full-bleed atmosphere under the HTML phrase and wordmark.

## Format

- 1920×1080, 30 fps, 720 frames (24.0s)
- Silent, muted autoplay, infinite loop
- 8-frame black pad at head and tail so the join is invisible
- Rendered MP4: `public/videos/hero-loop.mp4`
- Authoring: Remotion app in `hero-loop/` (own package, not mixed into Next)

## Motion grammar (ILOVEDUST density)

Default transition is a **hard cut**. Fades are forbidden except the loop pads.

| Device | Duration | Use |
| --- | --- | --- |
| Smash cut | 0 frames | Default between shots |
| Flash | 2–5 frames | Full-frame white / black / `#f5c400` / `#ff4a12` / beige |
| Stutter | 6–8 frames | Still → black 2f → still |
| Slam | 8–12 frames | Scale 1.35→1.0 into a lockup |
| Wipe | 8 frames | Inset clip-path left or up into the next still |
| Light leak | 10–14 frames | Warm overlay on a cut |
| Video plate | 8–16 frames per shard | Trimmed, 1.25×, internally smashed |
| Lockup | 10–16 frames | Logo almost still (Panda, Lídia, wordmark, chameleon) |

~35 picture events. Average hold under 1s. Grain overlay on every frame.

## Picture order

Chameleon → NAVIO shards + flashes → Panda yellow slam → food stutter → Vila Real chopped + orange flashes → helmet graphic → Lídia smash → NGC/Aquitex → GuimaBombas robot chopped → Queima/festival machine-gun → wordmark beige slam → chameleon → black.

No burned-in campaign titles. HTML overlay on the site stays.

## Site wiring

`Intro.tsx`: `<video className="hero-vimeo" src="/videos/hero-loop.mp4" muted loop playsInline autoPlay />`. `mediaReady` on `playing` / `canplay`. If missing or `prefers-reduced-motion`, still fallback (`story.jpg`). Curtain, cursor, scroll story unchanged.

## Out of scope

Music, Vimeo hybrid, 90s showreel, committing `public/reel-source/`.
