# Inspiration: ILOVEDUST Showreel 2023

Source of truth for how the Salazar hero video is built, and for how we would compile a similar piece from photos, clips, type, and motion.

- **Title:** ILOVEDUST — Showreel 2023
- **Author:** [ilovedust](https://vimeo.com/ilovedust)
- **URL:** [vimeo.com/832231383](https://vimeo.com/832231383)
- **Player (as used on this site):** `https://player.vimeo.com/video/832231383?background=1&autoplay=1&muted=1&loop=1&autopause=0`
- **Duration:** 90.25 seconds
- **Frame:** 1920 × 1080
- **Uploaded:** 2023-06-01
- **Official description:** Recent works for Nike, EA, Riot Games, Tag Heuer, Porsche, Jordan, Nio, WhatsApp, Metallica… and many more.

This file is a reverse-engineering notesheet, not a shot-for-shot remake brief. We take the **grammar** (pacing, color chapters, cut types, how stills and 3D and type share a timeline). We do not copy client work, logos, or footage.

---

## What this video actually is

It is a **90-second agency showreel**: a compilation of finished campaign pieces, cut to music, with almost no explanatory copy. The studio never “explains” a project. Each job gets 1–4 seconds. Identity comes from **color, material, and cut rhythm**, not from title cards.

On Salazar Concept, this exact file is the **hero background loop**. The site treats it as atmosphere (muted, looping, chrome-less Vimeo background player). The showreel itself was authored as a standalone piece with sound; the site strips the audio.

That split matters. A showreel **with** music is edited on the beat. A hero **loop** can reuse the same pictures but must survive silence and infinite repeat.

---

## How a piece like this is compiled

A showreel is not one animation. It is a **timeline of many already-made assets**, re-timed and re-colored so they feel like one film.

### 1. Gather the raw material

Typical inputs, all mixed in this reel:

| Kind | What it is | How it behaves on the timeline |
| --- | --- | --- |
| Still photo | Campaign still, product shot, lifestyle | Ken Burns (slow scale / pan), or a 4–8 frame flash |
| Video clip | Live action, product turntable, environment | Trimmed to 8–40 frames, often sped up |
| 3D render / sim | Cinema 4D / Houdini product, type, particles | Hero moments; longer holds (1–3s) |
| Motion graphics | Kinetic type, logos, HUD, collage | Smash-cut bumpers between jobs |
| Texture plates | Grain, dust, scanlines, light leaks | Full-frame overlay, always on |

ILOVEDUST’s public stack for this era: Houdini, Cinema 4D, Adobe. The showreel is the **edit** of those outputs, not a single 3D scene.

### 2. Build a spine, then hang clips on it

The spine is almost always **music**. Picture is cut so that:

- A **kick / snare** = a hard cut or a white flash
- A **bar change** = a new client / new color world
- A **drop** = a smash to a full-frame logo or a color field
- A **breakdown** = a slightly longer 3D hold

Without the original track we cannot mark exact beats, but the picture itself reports the grid: **hard cuts cluster around ~0.8s**, with denser 2–4 frame flashes inside a chapter, and 4-second black pads at the head and tail.

### 3. Sequence, don’t collage forever

Compiling is **time as layout**. Crowded frames exist (Nike Air Max yellow collage, Brazil football stack), but they are chapters, not the default. Most frames have **one subject**. When two worlds must coexist, the reel uses a **split** (Jordan: 3D lab left / physical collage right) rather than dumping everything in one composition.

### 4. Grade chapters, not individual shots

Color is the chapter title. Consecutive shots share a family so the brain reads “same job” even at 12 cuts per second.

### 5. Overlay a constant texture

Almost every sampled frame has **film grain / digital noise**. It is the glue. Without it, 3D, photography, and type look like three different videos. With it, they feel like one print.

---

## Measured structure (from the file)

Sampled at 0.2s. Luma + color jumps scored; clusters below are **true scene changes**, not camera move inside a shot.

| | Value |
| --- | --- |
| Runtime | 90.25s |
| Meaningful scene clusters (score ≥ 200, grouped) | **~55 chapters** |
| Average chapter length | **~0.8–1.6s** |
| Smash cuts (score ≥ 400, white/black/hue punches) | **~55 hits** |
| Head pad (near-black) | **0.0–4.2s** |
| Tail pad (cut to black) | **89.0–90.25s** |
| Picture body | **~84.8s** |

**Edit density:** about **36–40 scene changes per minute** in the body. That is showreel tempo, not commercial tempo (commercials often hold 2–5s). Many interior cuts are 2–6 frames: legal only because the **chapter color** stays stable.

**Luma waveform (1s buckets):**

- Black → gold/olive pop at **4.4s**
- First white-out at **10.0s** (Nike FC lockup)
- Oscillates dark / blown-white through **12–31s**
- Saturated mid-luma color worlds **35–45s** (pink road, blue sky, red Riot, yellow Air)
- Darker gothic / product **50–69s**
- Brighter 3D product / sky **70–88s**
- Hard black at **89.0s**

**Dominant palette families in the body:** near-black, charcoal, off-white flashes, then **olive-gold, cyan, hot pink, electric blue, saturated red, acid yellow, mint/WhatsApp green, gothic red-black**. Neutrals are the majority; **hue is used as a punch**, not as a wash.

---

## Beat sheet (picture, not music)

Times are approximate to 0.2s. “What we saw” is from paused frames of the Vimeo player.

### 0.0–4.2 — Black hold

Empty frame, faint grain. Lets the loop and the music (when present) breathe. On the website this is also the period the intro curtain covers.

### 4.2–5.8 — Olive / gold 3D debris

First picture: floating stone fragments in yellow-green volumetric fog, glowing type on rock (`EQUEST` / REQUEST), film-reel icon, taut cables, fabric straps (`WE KEEP`). Dutch angle, shallow depth of field, slow drift.

**Motion:** parallax through a 3D volume, not a 2D pan. Bloom on emissive type. This is a **3D environment fly-through**, not a photo.

### 5.8–9.8 — Dark neon objects

Smash to black, then foil balloons (smiley / X-eye mylar) against a tilted wireframe grid, cyan and red rim light. Tight cluster, soft-body collisions implied.

**Motion:** simulation (float, collide, rotate) + neon GI. Still one idea: **reflective 3D toys in a dark void**.

### 9.8–12.0 — White lockup chapter

Luma jumps to ~240. Centered **Nike F.C.** mark (swoosh + FC) on textured off-white, vignette, grain. Palette cleanser.

**Motion:** almost still. Maybe a 2% scale (Ken Burns). The cut *into* white is the event.

### 12.0–15.8 — Dark product / flesh tones

Hard cut from white to low-key close-ups. Several interior cuts. This is the “afterimage” of the white flash — the eye is reset, then fed shadow.

### 15.8–22.6 — Automotive neon (NIO)

Head-on EV in a black void. Form drawn only by **vertical light bars**: magenta center, electric blue flanks, gold edges. Studio-floor reflection.

**Motion:** lights scan / wrap the body (light-painting, not a camera orbit). Classic product-reveal: **the object is dark until light draws it**.

Intercut with paler frames and a magenta smash (~23.2).

### 22.6–25.8 — Nike Tiempo 3D + 2D

Rose-gold metallic boot, “TIEMPO” in the reflection, hot-pink lightning strokes, flat pink graphic behind a 3D shoe, grainy off-white ground.

**Motion:** 3D product hero + **2D graphic shapes** as speed lines. Materials contrast (chrome vs matte knit). This is the studio’s signature: **render + graphic in one frame**.

### 25.8–31.0 — Maximalist football collage (Nike / Brazil)

Chroma-key studio people: Nike tracksuit on a lowrider bike, Brazil kit, lime floor / sky-blue cyc, neon-pink **liquify / mesh-warp** smear through the center, green particles.

**Motion:** layered live-action plates + warp transition + particles. Density is the point. Holds longer than a lockup because there is more to read.

White flash around **30.6–31.0**, then dark again.

### 31.0–35.8 — Dark / warm close-ups

Lower energy, brown-red flesh and product. Bridge into the next color world.

### 35.8–39.8 — Hot-pink speed road

Low camera, pink ground, red dashed perspective blocks, speed streaks, a dark vehicle at the vanishing point, cyan glints.

**Motion:** **perspective grid rushing at camera** (or camera rushing down the grid). Minimal geometry, maximum speed. Could be Porsche / NIO graphic, or a pure motion-graphics insert.

White-out at **39.8**.

### 39.8–43.8 — Nike cloud swoosh

Saturated blue sky, cloud mass shaped as a swoosh, small Nike lockup bottom-right, heavy grain.

**Motion:** slow cloud drift / time-lapse. Editorial hold. After the pink speed chapter, this is **air and quiet**.

### 43.8–45.6 — Bumper sandwich

1. Dark beat  
2. **Riot Games** lockup, solid red, white fist + stacked type, `©2022 Riot Games` (~44.2)  
3. Smash to **Nike Air Max** yellow collage (~44.6): bubble “AIR”, chrome flowers, inflatable tube man, sky cutouts, “BRING THE NOISE”

Two full-frame identities in **under a second**. That is the showreel’s most important trick: **a logo is a one-frame drum hit**, not a 3-second end card.

### 45.6–50.6 — Olive / dusk product

Dark warm stills and slower 3D. Breathing room after the yellow explosion.

### 50.6–53.0 — Violet punch then black

Near-black flash, then purple-lavender 3D/type, then brown product. Color as percussion.

### 53.0–61.4 — Mixed: MSI glitch, then green

Around **55s:** League of Legends **MSI 2022** — mint circular emblem, italic “TAKE NOTES”, horizontal glitch / displacement, HUD grids, Pantheon inset, film grain on black.

Then a long-ish **green/mint** world into **61.4** (likely WhatsApp or a green product chapter). Smash from mint-white into dark green.

**Motion (MSI):** kinetic type + **glitch/displacement** + HUD overlay. The whole stack is treated as one distressed print, not separate layers the eye can peel apart.

### 61.4–69.4 — Gothic red (Metallica lane)

Deep red fog, central silhouetted figure, arms out, falling black crosses, doorway frame, grain. Later: hotter red close-ups (`rgb(173,7,9)` etc.).

**Motion:** particle rain (crosses) + volumetric fog + slow camera. Longest tonal hold in the reel. Horror/metal, not sports.

### 69.4–74.0 — Jordan split-screen

Left: silver chamber, foot/sneaker wireframe, cables, `LOADING` bar, Jumpman. Right: blueprint-blue grid, stacked sole photography, fabric swatch, scribbles.

**Motion:** two clocks at once — **mechanical 3D** (progress bar, mesh) vs **stop-motion collage** (stills popping onto a board). Split is the transition.

### 74.0–79.4 — Kinetic manifesto

Solid red field, giant brush “Defy”, left column of monospaced numbered lines (“I WILL NOT ACCEPT MY LIMITS.” …), boxed / underlined / circled words, connector lines, chromatic aberration.

**Motion:** **kinetic typography** — type as interface. Highlights draw themselves. Brush type is analog on top of a code-editor metaphor.

### 79.4–89.0 — Product sky / particles, then fade

Purple then green-dark, then **85s:** Nike football boot flying through cyan sky, neon knit, particle/confetti wake, heavy motion blur, hint of net.

**Motion:** 3D hero + **particle trail** + camera move. Closing energy.

Hard cut to black at **89.0**. One second of black so the loop (and the music, if any) can reset.

---

## Animation vocabulary (what you are seeing)

Mapped to production terms, not marketing adjectives.

| You see | Term | What to build |
| --- | --- | --- |
| Shots slamming into each other on the beat | **Hard cut** | Adjacent `<Sequence>` with 0-frame overlap |
| White or color field for 2–6 frames | **Flash frame / smash cut** | Full-frame `<AbsoluteFill>` of `#fff` / brand color, 2–5 frames |
| One job fading into the next in the same spot | **Crossfade** | Rare here. Do not default to it. |
| Logo expanding into a scene, or scene collapsing into a mark | **Shared element / continuity** | Used in lockups; keep the mark centered |
| Cloud becoming a swoosh | **Morph** (soft) | Shape or mask interpolation, slow |
| MSI type tearing horizontally | **Displacement / glitch** | `noiseDisplacement`, RGB split, scanlines |
| Pink smear through the Brazil collage | **Warp / liquify** | Mesh warp or `wave()` / custom displace |
| Shoe + flat pink lightning | **2D/3D composite** | 3D or photo in a 2D graphic world |
| Road dashes rushing at camera | **Perspective / Z-move** | Scale + `translateZ` or a 3D camera |
| Balloons bumping | **Simulation** | Pre-rendered; we would not sim this in Remotion |
| Grain on every frame | **Film grain overlay** | `noise()` / `speckle()` / looping grain plate, opacity ~8–15% |
| Slow push on a still | **Ken Burns** | `scale` 1.0 → 1.08 over the clip |
| Type sliding up into a mask | **Reveal** (clip-path) | Same idea as the site’s `MaskedLine` |
| Words appearing in a stagger | **Stagger** | Per-character / per-word delay, 1–3 frames |
| Lights wrapping a car | **Reveal by light, not by opacity** | Animated gradient / light leak over a dark plate |
| Left 3D / right collage | **Split-screen** | Two sequences, 50/50, independent clocks |
| Particle wake behind a boot | **Particle trail** | Pre-render, or Canvas 2D dots parented to a path |
| Infinite hero on the website | **Loop** | Tail black + head black so the join is invisible |

**Easing:** interiors of 3D shots feel **ease-in-out** (already in motion). Cuts themselves are **linear / instantaneous**. Do not spring a showreel cut. Springs belong to UI, not to this grammar.

**Orchestration rule:** one primary motion per shot. If the camera pushes, type stays still. If type staggers, the background is a hold. The Brazil collage is the exception, and it is allowed because it is a **chapter about chaos**.

---

## Editing grammar to steal

### Color as chapter title

Do not mix Nike yellow collage into Metallica red in the same second without a **flash or black** between them. The sandwich at 43.8–45.6 works because Riot red and Air yellow are both **full-frame graphic plates**, so the cut is two posters, not two films.

### Flash as reset

White (10s, 30.6s, 39.8s) and black (5.8s, 50.6s, 89s) wipe the previous afterimage. Use 2–5 frames. Longer than 8 frames and it becomes a title card.

### Hold vs stutter

- **Lockup / logo:** 8–20 frames, almost still  
- **3D hero:** 1.2–3.0s, continuous camera  
- **Collage / type:** 1.5–2.5s, internal cuts allowed  
- **Stills:** 6–12 frames if they are “hits”; 1–2s if they are beauty

### Safe area

Showreel picture is **edge-to-edge**. Text that must read (Defy, TAKE NOTES, Nike lockups) sits in the center third. Tiny HUD copy is decorative. For a Salazar piece, readable type should follow Remotion video layout: at 1920 wide, headlines ≥ ~84px, supporting ≥ ~44px, ≥80px from the sides.

### Loop construction

Head black (4s) + tail black (1s) = a loop that does not pop. The website’s `loop=1` depends on that. If we author an original hero, **start and end on the same black** (or the same still).

### Sound (even if we mute it)

Edit as if there is a 120–140 BPM track. At 30 fps, an eighth note at 120 BPM is **6.25 frames**. Most flashes in this reel are in that neighborhood. If the Salazar piece is silent on the site, keep the same grid anyway — the eye still feels it.

---

## How we would compile this in Remotion

This site is Next.js, not a Remotion project yet. The pattern below is the production method when we start a composition.

### Timeline

```tsx
<Series>
  <Series.Sequence durationInFrames={4 * fps}>
    <Black />
  </Series.Sequence>

  <Series.Sequence durationInFrames={36} offset={-2}>
    <ChapterOliveDebris />
  </Series.Sequence>

  <Series.Sequence durationInFrames={4} layout="none">
    <Flash color="#ffffff" />
  </Series.Sequence>

  <Series.Sequence durationInFrames={18}>
    <Lockup src={staticFile("marks/nike-fc.png")} />
  </Series.Sequence>
  {/* … */}
</Series>
```

Negative `offset` = overlap (a flash sitting on top of a cut). Default to **hard cuts** (`offset={0}`). Use `@remotion/transitions` fade/wipe only for the rare beauty dissolve.

### Stills

```tsx
<Img
  src={staticFile("images/industries/construction.jpg")}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    scale: interpolate(frame, [0, duration], [1, 1.08], {
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  }}
/>
```

### Video clips

```tsx
import { Video } from "@remotion/media";

<Video
  src={staticFile("videos/footer-bg.mp4")}
  trimBefore={2 * fps}
  trimAfter={6 * fps}
  playbackRate={1.25}
  muted
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
```

### Always-on grain

A looping grain plate or `noise()` / `speckle()` at low opacity, **above** every chapter, so 3D, photo, and type share a surface.

### Forbidden in Remotion

CSS `transition` / `animation` / Tailwind `animate-*`. Drive every property with `useCurrentFrame()` + `interpolate()`. Premount sequences that contain `<Video>` / `<Img>` so the first frame is not empty.

### What Remotion should not fake

Houdini balloon sims, car light-painting, and particle wakes are **pre-rendered plates**. Remotion’s job is **edit + type + 2D graphic + stills + already-made clips**. If we need that 3D density, we render elsewhere and compile here.

---

## What this means for Salazar Concept

### Already on the site

The intro **is already in conversation** with this reel:

- Hero iframe is this Vimeo, background / autoplay / muted / loop  
- Curtain hole-punch, then the reel as full-bleed atmosphere  
- `MaskedLine` character stagger (showreel kinetic type, slowed down for scroll)  
- Industry carousel: three stills, parallax inside the track (Ken Burns cousin)  
- ClothImage on `story.jpg` (material, not a hard cut)  
- Chameleon cursor as a brand “insert” over the picture  

### Local assets we could compile (if we author our own reel)

- `/public/images/story.jpg`  
- `/public/images/industries/{construction,restauration,science}.jpg`  
- `/public/images/legacy/{hero,detail-a,detail-b}.jpg`  
- `/public/videos/footer-bg.mp4`  
- `/public/logo/{wordmark.png,chameleon.svg,logo.svg}`  

That is enough for a **short branded loop** (15–30s). It is **not** enough for a 90s ILOVEDUST-density showreel. A true reel needs more finished work: extra stills, product/process clips, and at least one pre-rendered 3D or type plate.

### What to copy vs what to ignore

**Copy**

- Chapter-by-color  
- Flash as reset  
- 0.8–1.5s average hold  
- Grain as glue  
- Logo as a 8–16 frame hit, not a 3s card  
- Head/tail black for looping  
- One subject per shot, split-screen when two worlds must coexist  

**Do not copy**

- Client marks, footage, or 3D  
- Maximalist collage as the default (Salazar’s site voice is slower, beige, cloth, wordmark)  
- Glitch/HUD unless a chapter is explicitly “digital / esports”  
- Bounce / spring on cuts  

Salazar’s on-site motion is **scroll-orchestrated and tactile**. The Vimeo is **beat-orchestrated and graphic**. A Salazar-original video should steal the **edit grammar** and keep the **brand temperature** (beige, wordmark, chameleon, cloth, “art from every angle”).

---

## Open questions before production

1. Is the deliverable a **replacement hero loop** (silent, 15–30s, seamless), a **standalone showreel** (with music, ~45–90s), or a **section film** (legacy / industries)?  
2. Do we only use **assets already in `/public`**, or is more photography / footage coming?  
3. Should the first version be **Remotion (code, frame-accurate)** or a **timeline edit of existing stills + footer-bg** to lock pacing first?

This notesheet is the idea. Production starts after those three are answered.
