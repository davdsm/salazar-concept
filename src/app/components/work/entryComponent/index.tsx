import { useContext } from "react";

import { AppContext } from "@/app/layout";
import { API_URL } from "@/app/utils";
import Slider from "react-slick";

const settings = {
  dots: false,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 1500,
  pauseOnHover: false,
};

export default function EntryComponent({ sections, name }: any) {
  const { firstLoad } = useContext(AppContext);

  return (
    <div className="container relative bg-white pt-[130px] pb-10">
      <div className="text-center">
        <div
          className={`animate__animated animate__fadeInDown ${
            !firstLoad ? "animationDelay3000" : "animationDelay600"
          }`}
        >
          <h1 className="font-bold text-4xl sm:text-7xl uppercase">{name}</h1>
        </div>

        {sections?.map(
          ({
            id,
            title,
            images,
            images_hover,
            collectionId,
            text,
            isSlide,
            isSmallImages,
            videos,
          }: any) => (
            <div key={id} className="pt-8">
              {title && images.length === 0 && (
                <div
                  className={`animate__animated animate__fadeInDown ${
                    !firstLoad ? "animationDelay2000" : "animationDelay600"
                  }`}
                >
                  <h1 className="font-bold text-4xl sm:text-5xl uppercase">
                    {title}
                  </h1>
                </div>
              )}

              {images.length > 0 &&
                !title &&
                !text &&
                !isSmallImages &&
                !isSlide && (
                  <div className="flex gap-x-3.5 gap-y-6 flex-col sm:flex-row">
                    {images.map((img: string, index: number) => (
                      <div
                        className={`w-3/4 sm:w-2/6 m-auto animate__animated animate__fadeInDown ${
                          !firstLoad
                            ? "animationDelay2000"
                            : "animationDelay600"
                        }`}
                        key={`${img}-${index}`}
                      >
                        <img
                          src={`${API_URL}/api/files/${collectionId}/${id}/${img}`}
                          className={
                            images_hover?.length ? "cursor-pointer" : ""
                          }
                          onMouseEnter={(e) =>
                            images_hover?.length &&
                            (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${images_hover[index]}`)
                          }
                          onMouseLeave={(e) =>
                            images_hover?.length &&
                            (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${img}`)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}

              {text && images.length === 0 && (
                <div
                  className={`animate__animated animate__fadeInDown ${
                    !firstLoad ? "animationDelay2000" : "animationDelay600"
                  }`}
                >
                  <p
                    className="font-bold text-base sm:text-2xl uppercase"
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                </div>
              )}

              {!isSlide && title && images.length > 0 && (
                <div className="flex items-center text-center flex-col md:flex-row gap-10">
                  <div className="flex gap-x-3.5 gap-y-16 flex-col sm:w-1/2">
                    {images.map((img: string, index: number) => (
                      <div
                        className={`animate__animated animate__fadeInDown ${
                          !firstLoad
                            ? "animationDelay2000"
                            : "animationDelay600"
                        }`}
                        key={`${img}-${index}`}
                      >
                        <img
                          src={`${API_URL}/api/files/${collectionId}/${id}/${img}`}
                          className={`${
                            images_hover?.length ? "cursor-pointer" : ""
                          }`}
                          onMouseEnter={(e) =>
                            images_hover?.length &&
                            (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${images_hover[index]}`)
                          }
                          onMouseLeave={(e) =>
                            images_hover?.length &&
                            (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${img}`)
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div
                    className={`animate__animated animate__fadeInDown ${
                      !firstLoad ? "animationDelay2000" : "animationDelay600"
                    }`}
                  >
                    <h1 className="font-bold text-3xl md:text-5xl uppercase m-auto">
                      {title}
                    </h1>
                  </div>
                </div>
              )}

              {isSlide && (
                <>
                  {title && (
                    <div
                      className={`animate__animated animate__fadeInDown ${
                        !firstLoad ? "animationDelay2000" : "animationDelay600"
                      }`}
                    >
                      <h1 className="font-bold text-3xl md:text-5xl uppercase text-center">
                        {title}
                      </h1>
                    </div>
                  )}

                  <div
                    className={`animate__animated animate__fadeInDown ${
                      !firstLoad ? "animationDelay2000" : "animationDelay600"
                    }`}
                  >
                    <Slider {...settings} className="mt-6">
                      {images?.map((value: string, index: number) => (
                        <img
                          key={"slider" + index}
                          src={`${API_URL}/api/files/${collectionId}/${id}/${value}`}
                          className="h-[75vh] object-contain"
                        />
                      ))}
                    </Slider>
                  </div>
                </>
              )}

              {text && images.length > 0 && (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex gap-x-3.5 gap-y-16 flex-col sm:flex-row sm:w-2/3">
                    {images.map((img: string, index: number) => (
                      <div
                        className={`animate__animated animate__fadeInDown ${
                          !firstLoad
                            ? "animationDelay2000"
                            : "animationDelay600"
                        }`}
                        key={`${img}-${index}`}
                      >
                        <img
                          src={`${API_URL}/api/files/${collectionId}/${id}/${img}`}
                          className={
                            images_hover?.length ? "cursor-pointer" : ""
                          }
                          onMouseEnter={(e) =>
                            images_hover?.length &&
                            (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${images_hover[index]}`)
                          }
                          onMouseLeave={(e) =>
                            images_hover?.length &&
                            (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${img}`)
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div
                    className={`animate__animated animate__fadeInDown ${
                      !firstLoad ? "animationDelay2000" : "animationDelay600"
                    }`}
                  >
                    <p
                      className="font-bold text-base sm:text-2xl uppercase"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  </div>
                </div>
              )}

              {images.length > 0 && !title && !text && isSmallImages && (
                <div className="hidden sm:flex justify-center sm:justify-between flex-wrap gap-10">
                  {images.map((img: string, index: number) => (
                    <div
                      className={`w-52 h-52 animate__animated animate__fadeInDown ${
                        !firstLoad ? "animationDelay2000" : "animationDelay600"
                      }`}
                      key={`${img}-${index}`}
                    >
                      <img
                        src={`${API_URL}/api/files/${collectionId}/${id}/${img}`}
                        className={`${
                          images_hover?.length ? "cursor-pointer" : ""
                        } w-full h-full object-contain`}
                        onMouseEnter={(e) =>
                          images_hover?.length &&
                          (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${images_hover[index]}`)
                        }
                        onMouseLeave={(e) =>
                          images_hover?.length &&
                          (e.currentTarget.src = `${API_URL}/api/files/${collectionId}/${id}/${img}`)
                        }
                      />
                    </div>
                  ))}
                </div>
              )}

              {videos.length === 1 && (
                <div
                  className={`animate__animated animate__fadeInDown ${
                    !firstLoad ? "animationDelay2000" : "animationDelay600"
                  }`}
                >
                  <video controls className="h-[80vh] w-screen object-cover">
                    <source
                      src={`${API_URL}/api/files/${collectionId}/${id}/${videos[0]}`}
                      type="video/mp4"
                    />
                  </video>
                </div>
              )}

              {videos.length > 0 && (
                <div
                  className={`animate__animated animate__fadeInDown ${
                    !firstLoad ? "animationDelay2000" : "animationDelay600"
                  }`}
                >
                  <div>
                    {title && (
                      <h1 className="font-bold text-3xl md:text-5xl uppercase">
                        {title}
                      </h1>
                    )}

                    <div className="flex justify-between mt-16 flex-col sm:flex-row gap-10">
                      {videos.map((value: string, index: number) => (
                        <div
                          className={`sm:w-1/3 animate__animated animate__fadeInDown ${
                            !firstLoad
                              ? "animationDelay2000"
                              : "animationDelay600"
                          }`}
                          key={`${value}-${index}`}
                        >
                          <video
                            controls
                            className="w-full h-[70vh] object-cover"
                          >
                            <source
                              src={`${API_URL}/api/files/${collectionId}/${id}/${value}`}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
