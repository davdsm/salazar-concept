"use client";

import { useEffect, useRef, useState } from "react";

import { createCloth, type ClothInstance, type ClothOptions } from "./cloth-core";

type Props = {
  src: string;
  alt: string;
  /** Dá o tamanho ao pano — ex. "w-full aspect-[3/2]". */
  className?: string;
  /** Sobrepõe-se aos defaults do Cloth (wind, amplitude, brush, ...). */
  options?: ClothOptions;
  /** Margem, em px, entre o pano e o que o rodeia. A ondulação e a
   *  perspetiva empurram o tecido para fora do retângulo. */
  bleed?: number;
  /** Preenche o elemento pai em vez de ocupar espaço próprio. Use-se quando
   *  o pai já é uma moldura posicionada e animada por fora. */
  fill?: boolean;
};

export default function ClothImage({
  src,
  alt,
  className,
  options,
  bleed = 48,
  fill = false,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLCanvasElement>(null);
  const sourceRef = useRef<HTMLCanvasElement>(null);

  /* Sem WebGL2, ou com uma imagem que suje o canvas (cross-origin sem CORS),
     cai-se na imagem simples em vez de um buraco na página. */
  const [failed, setFailed] = useState(false);

  /* `options` costuma vir como objeto literal, novo em cada render. Guardá-lo
     num ref mantém-no fora das dependências do efeito — senão a simulação
     WebGL era destruída e reconstruída a cada render do pai. As mudanças
     seguem depois por setOptions, que é o que o componente expõe para isso. */
  const instanceRef = useRef<ClothInstance | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const frame = frameRef.current;
    const content = contentRef.current;
    const output = outputRef.current;
    const source = sourceRef.current;
    if (!frame || !content || !output || !source) return;

    let instance: ClothInstance | null = null;
    let plate: HTMLCanvasElement | null = null;
    let plateW = 0;
    let plateH = 0;
    let image: HTMLImageElement | null = null;
    let cancelled = false;

    /* A imagem recortada em "cover" para o tamanho do pano, em pixels de
       dispositivo. É este canvas que vai para a textura. */
    const currentPlate = () => {
      if (!image) return null;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(frame.clientWidth * dpr);
      const h = Math.round(frame.clientHeight * dpr);
      if (w < 1 || h < 1) return null;

      if (!plate || w !== plateW || h !== plateH) {
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight);
        const dw = image.naturalWidth * scale;
        const dh = image.naturalHeight * scale;
        ctx.drawImage(image, (w - dw) / 2, (h - dh) / 2, dw, dh);
        plate = canvas;
        plateW = w;
        plateH = h;
      }
      return plate;
    };

    const loader = new Image();
    /* Dá a melhor hipótese a uma imagem servida de outro domínio; sem isto o
       canvas fica tainted e o upload para a textura rebenta. */
    if (/^https?:\/\//i.test(src)) loader.crossOrigin = "anonymous";

    loader.onerror = () => {
      if (!cancelled) setFailed(true);
    };

    loader.onload = () => {
      if (cancelled) return;
      image = loader;
      try {
        instance = createCloth(
          { source, content, output, image: currentPlate },
          optionsRef.current,
        );
      } catch {
        instance = null;
      }
      if (!instance) {
        setFailed(true);
        return;
      }
      instanceRef.current = instance;
      instance.refresh();
    };

    loader.src = src;

    /* O componente já reage ao resize do seu canvas, mas não sabe que o
       recorte da imagem também tem de ser refeito. */
    const observer = new ResizeObserver(() => {
      if (!instance) return;
      plate = null;
      instance.resize();
      instance.refresh();
    });
    observer.observe(frame);

    return () => {
      cancelled = true;
      observer.disconnect();
      loader.onload = null;
      loader.onerror = null;
      instance?.destroy();
      instanceRef.current = null;
    };
  }, [src]);

  /* Opções alteradas chegam ao pano vivo, sem o reconstruir. */
  const optionsKey = JSON.stringify(options ?? {});
  useEffect(() => {
    if (optionsRef.current) instanceRef.current?.setOptions(optionsRef.current);
  }, [optionsKey]);

  if (failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={
          fill
            ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
            : undefined
        }
      />
    );
  }

  return (
    <div
      ref={frameRef}
      className={className}
      style={
        fill
          ? { position: "absolute", inset: 0 }
          : { position: "relative", margin: bleed }
      }
      role="img"
      aria-label={alt}
    >
      <div ref={contentRef} style={{ position: "absolute", inset: 0 }} />
      {/* O canvas transborda o frame; sem isto a zona de hover cresceria com ele. */}
      <canvas
        ref={outputRef}
        style={{ position: "absolute", pointerEvents: "none" }}
        aria-hidden="true"
      />
      <canvas
        ref={sourceRef}
        style={{ position: "fixed", left: -99999, top: 0 }}
        aria-hidden="true"
      />
    </div>
  );
}
