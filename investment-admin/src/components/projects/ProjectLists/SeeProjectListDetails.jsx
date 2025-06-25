"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faMoneyBillWave,
  faFile,
  faInfoCircle,
  faCalendar,
  faChartLine,
  faTimes, // Import the close icon
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Image from "next/image";
import { convertHtml } from "@/utils/convertHtml";

const formatDate = (date) => {
  if (!date) return "";
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const SeeProjectListDetails = ({
  showDetailsModal,
  setShowDetailsModal,
  project,
}) => {
  const handleClose = () => {
    setShowDetailsModal(false);
  };

  return (
    <div className={`modal z-9999 ${showDetailsModal ? "modal-open" : ""}`}>
      <div className="modal-box max-w-6xl mx-4 md:mx-auto relative">
        <div className="absolute top-2 right-2">
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <div className="modal-header">
          <h3 className="rounded-t-lg bg-success p-4 text-lg font-bold text-white">
            {project?.projectTitle || "Project Details"}
          </h3>
        </div>
        <div className="modal-body bg-base-200 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              {/* Project Details */}
              <div className="card mb-4 bg-base-100 shadow-md">
                <div className="card-body">
                  <h4 className="card-title text-success">
                    General Information
                  </h4>
                  <strong className="text-primary"> About The Project:</strong>{" "}
                  {/* <p>
                    {project?.aboutProject || "No information available."}

                  </p> */}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: convertHtml(project?.aboutProject),
                    }}
                    className="md:text-[16px] sm:text-[14px] "
                  ></span>
                  <h6 className="mb-2 text-primary font-semibold">
                    Exit Strategy :
                  </h6>
                  <div className="grid grid-cols-3 sm:grid-cols-3 text-sm lg:text-base mb-2">
                    <div
                      className="col-span-3 text-black projectData"
                      dangerouslySetInnerHTML={{
                        __html: convertHtml(project?.exitStrategy),
                      }}
                    ></div>
                  </div>
                  <ul className="list-none space-y-2">
                    <li>
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-blue-500"
                      />
                      <strong className="text-primary">
                        {" "}
                        Project Address:
                      </strong>{" "}
                      {project?.streetAddress}, {project?.city}
                    </li>
                  </ul>
                  <h6 className="mb-2  text-primary md:text-lg sm:text-base font-semibold">
                    Location:
                  </h6>
                  {project?.googleMapLink && (
                    <iframe
                      className="position-relative w-full sm:h-5/6 md:h-96"
                      loading="lazy"
                      src={project?.googleMapLink}
                      // title={addresses[0].address}
                      // aria-label={addresses[0].address}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Company Details */}
            <div>
              {/* Google Drive Links */}
              <div className="card mb-4 bg-base-100 shadow-md">
                <div className="card-body">
                  <h4 className="card-title text-success">
                    Google Drive Links
                  </h4>
                  <ul className="list-none space-y-2">
                    {project?.googleDriveLinks?.map((link, index) => (
                      <li key={index}>
                        <FontAwesomeIcon
                          icon={faFile}
                          className="text-green-500"
                        />{" "}
                        <Link
                          href={link.googleDriveLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {link?.googleDriveLinkTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/*Timeline Links */}
              <div className="card mb-4 bg-base-100 shadow-md">
                <div className="card-body">
                  <h4 className="card-title text-success">Timelines</h4>
                  <ul className="list-none space-y-2">
                    {project?.timelines?.length > 0 ? (
                      <ul className="list-none space-y-2">
                        {project.timelines.map((timeline, index) => (
                          <li key={index} className=" pb-2">
                            <FontAwesomeIcon
                              icon={faCalendar}
                              className="text-blue-500"
                            />{" "}
                            <span>{formatDate(timeline.date)}</span>
                            <li>
                              <FontAwesomeIcon
                                icon={faInfoCircle}
                                className="text-red-500"
                              />{" "}
                              <span>{timeline.details}</span>
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faChartLine}
                                className="text-yellow-500"
                              />{" "}
                              <span>{timeline.title}</span>
                            </li>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No timelines available.</p>
                    )}
                  </ul>
                </div>
              </div>

              {/* Financial Details */}
              <div className="card mb-4 bg-base-100 shadow-md">
                <div className="card-body">
                  <h4 className="card-title text-success">Financial Details</h4>
                  <ul className="list-none space-y-2">
                    <li>
                      <FontAwesomeIcon
                        icon={faMoneyBillWave}
                        className="text-green-500"
                      />
                      <strong> Total Investment:</strong>{" "}
                      {project?.totalProjectValue?.toLocaleString()} Tk
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faMoneyBillWave}
                        className="text-green-500"
                      />
                      <strong> Per Share:</strong>{" "}
                      {project?.perShareValue?.toLocaleString()} Tk
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faChartLine}
                        className="text-yellow-500"
                      />
                      <strong> Minimum Share:</strong>{" "}
                      {project?.minimumShareValue?.toLocaleString()}
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faChartLine}
                        className="text-yellow-500"
                      />
                      <strong> Available Total Purchase:</strong>{" "}
                      {project?.availableTotalShare?.toLocaleString()} shares
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="text-red-500"
                      />
                      <strong> Status:</strong> {project?.status}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card mb-4 bg-base-100 shadow-md">
                <div className="card-body">
                  <h4 className="text-lg font-bold text-start text-success mb-4">
                    Project Images
                  </h4>
                  <Splide
                    options={{
                      type: "loop",
                      perPage: 1,
                      autoplay: true,
                      pauseOnHover: false,
                      resetProgress: false,
                      arrows: true,
                      pagination: false,
                    }}
                  >
                    {project?.projectPicture?.map((picture, index) => (
                      <SplideSlide
                        key={index}
                        className="flex items-start justify-start h-[400px] rounded-lg overflow-hidden bg-gray-200 shadow-md"
                      >
                        <Image
                          src={picture}
                          height={400}
                          width={400}
                          alt={`Project Image ${index + 1}`}
                          className="object-cover w-full h-full rounded-lg transition-transform duration-300 hover:scale-105"
                        />
                      </SplideSlide>
                    ))}
                  </Splide>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeProjectListDetails;
