"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

type Slide = {
  title: string;
  description: string;
  imageUrl: string;
  color: string;
};
type PropType = {
  slides: Slide[];
  options?: EmblaOptionsType;
};

export default function EmblaCarousel(props: PropType) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div
                className="embla__slide__number rounded-xl px-6 py-4 flex flex-col justify-between items-center"
                style={{
                  boxShadow: `inset 0 0 0 0.2rem ${item.color}`,
                }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base sm:text-lg text-gray-500">
                    {item.description}
                  </p>
                </div>

                <img
                  alt={item.title}
                  src={item.imageUrl}
                  className="object-contain mx-auto w-32"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
