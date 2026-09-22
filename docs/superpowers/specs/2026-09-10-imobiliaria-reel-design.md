# Imobiliária reel — design A

Date: 2026-09-10  
Status: approved to build

## Goal

Keep the Prestiti tour (~51s, 9:16, original VO) and overlay Lucasvs-style kinetic titles timed to what he already says. Hide the burned-in bottom captions. Leave the gold Prestiti lockup (~47s–end) uncovered.

## Format

- 1080×1920, 30 fps, 1525 frames (50.82s)
- Audio: original Prestiti VO (not muted)
- Authoring: second Remotion composition in `hero-loop/` (`ImobiliariaTour`)
- Output: `public/videos/imobiliaria-tour.mp4`
- Salazar `SalazarHero` / `hero-loop.mp4` unchanged

## Picture

Source plate: `hero-loop/public/plates/tour-prestiti.mp4` (from `public/reel-source/imobiliaria/tour-prestiti.mp4`).

Scale 1.42 from the top of the frame so burned-in captions (mid-lower third) fall off. Ease back to 1.0 from ~46.6s so the centered gold logo is not cropped or shifted.

## Type (Lucasvs)

- Extra-bold condensed white sans (Barlow Condensed 800)
- Large cyan italic (`#2EE6D6`, Playfair Display italic) on proper nouns / punch words
- 2–3 lines, centered, upper-middle
- Enter: scale ~1.38→1 + blur in; exit: blur-fade. Stagger lines ~3 frames
- No CSS/Tailwind animations — `interpolate` + individual transform props

## Caption blocks (VO)

Times in seconds, from burned-in captions at 1 fps.

| from | to | lines (script = cyan italic) |
| --- | --- | --- |
| 0.85 | 2.05 | centralizado |
| 2.05 | 3.85 | perto / do estádio / **do Vitória** |
| 3.85 | 5.15 | e poucos metros do / **Guimarães** / **Shopping** |
| 5.15 | 6.95 | e do acesso / autoestrada ao / **Porto** |
| 6.95 | 8.30 | apartamento / **T3** |
| 8.30 | 9.90 | que foi / **remodelado** |
| 13.70 | 16.00 | Venha conhecer / **apartamento T3** |
| 16.00 | 18.10 | 106 metros / **quadrados** |
| 18.10 | 20.40 | uma cozinha / **open space** |
| 24.60 | 26.60 | Esta casa / de banho / de apoio |
| 26.60 | 28.00 | **a dois quartos** |
| 29.60 | 32.20 | Temos um / **quarto** |
| 33.60 | 35.80 | Temos um segundo / **quarto** |
| 35.80 | 38.20 | e por fim / **uma suíte** |
| 38.70 | 41.50 | Apartamento / em todas as / **divisões** |
| 41.50 | 42.90 | **em vinil** |
| 42.90 | 45.20 | e as casas de / **chuveiro** |
| 46.60 | end | no titles — Prestiti lockup |

## Out of scope

New VO, recut, contacts end-card, committing `public/reel-source/`.
