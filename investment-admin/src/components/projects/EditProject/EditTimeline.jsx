import { useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FiMove } from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";

const EditTimeline = ({
  project,
  timeLines,
  setTimelines,
  handleTimeLine,
  handleRemoveTimeLine,
  setInvestmentStartDate,
  investmentStartDate,
  setInvestmentEndDate,
  investmentEndDate,
  setFirstReturnDate,
  firstReturnDate,
  handleNextClick,
}) => {
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const returnDateRef = useRef(null);

  // Handle drag end
  const previousIndicesRef = useRef({
    sourceIndex: null,
    destinationIndex: null,
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    previousIndicesRef.current = {
      sourceIndex: source.index,
      destinationIndex: destination.index,
    };

    const updatedTimelines = [...timeLines];
    const [movedItem] = updatedTimelines.splice(source.index, 1);
    updatedTimelines.splice(destination.index, 0, movedItem);

    setTimelines(updatedTimelines);
  };

  // Track changes to timeLines and log previous and current indices
  // useEffect(() => {
  //   const { sourceIndex, destinationIndex } = previousIndicesRef.current;

  //   if (sourceIndex !== null && destinationIndex !== null) {
  //     console.log(`Moved from index ${sourceIndex} to ${destinationIndex}`);
  //     console.log("Updated timelines:", timeLines);
  //   }
  // }, [timeLines]);

  // Handle instant updates for timeline fields
  const handleTimelineChange = (index, field, value) => {
    setTimelines((prevTimelines) =>
      prevTimelines.map((timeline, idx) =>
        idx === index ? { ...timeline, [field]: value } : timeline
      )
    );
  };

  return (
    <div className="p-4 shadow-12">
      <h4 className="mb-8 text-xl font-semibold">Investment Duration</h4>

      <h4 className="mt-8 text-lg font-semibold">Timelines</h4>
      <hr className="my-4 border-black" />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="timeline-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {timeLines.map((option, index) => (
                <Draggable
                  key={index}
                  draggableId={`timeline-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          {...provided.dragHandleProps}
                          className="cursor-pointer"
                        >
                          <FiMove size={20} />
                        </span>
                        <div className="flex-1">
                          <label className="text-gray-700 mb-2 block font-semibold">
                            Date
                          </label>
                          <input
                            type="date"
                            className="border-gray-300 w-full rounded-md border p-2"
                            placeholder="Select Date"
                            onChange={(e) =>
                              handleTimelineChange(
                                index,
                                "date",
                                e.target.value
                              )
                            }
                            value={option?.date || ""}
                            style={{
                              borderColor: "#dddddd",
                              outlineColor: "#00c196",
                              outlineWidth: "2px",
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-700 mb-2 block font-semibold">
                          Title
                        </label>
                        <input
                          type="text"
                          className="border-gray-300 w-full rounded-md border p-2"
                          placeholder="Timeline Title"
                          onChange={(e) =>
                            handleTimelineChange(index, "title", e.target.value)
                          }
                          value={option?.title || ""}
                          style={{
                            borderColor: "#dddddd",
                            outlineColor: "#00c196",
                            outlineWidth: "2px",
                          }}
                        />
                      </div>

                      <div className="col-span-1 md:col-span-2 ms-6">
                        <label className="text-gray-700 mb-2 block font-semibold">
                          Details
                        </label>
                        <input
                          type="text"
                          className="border-gray-300 w-full rounded-md border p-2"
                          placeholder="Timeline Details"
                          onChange={(e) =>
                            handleTimelineChange(
                              index,
                              "details",
                              e.target.value
                            )
                          }
                          value={option?.details || ""}
                          style={{
                            borderColor: "#dddddd",
                            outlineColor: "#00c196",
                            outlineWidth: "2px",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-4 flex gap-3">
        <p
          onClick={handleTimeLine}
          className="cursor-pointer rounded-md bg-teal-700 px-4 py-2 text-base text-white"
        >
          Add New Date
        </p>

        <p
          onClick={handleRemoveTimeLine}
          className="cursor-pointer rounded-md bg-rose-600 px-4 py-2 text-base text-white"
        >
          Delete
        </p>
      </div>

      {/* Others Section */}
      <div
        className="flex items-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-5"
        role="alert"
      >
        <FaExclamationTriangle className="h-6 w-6 mr-2" />
        <p>
          The input must remain the same; that has already been provided in the
          timeline.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
        {/* Investment Start Date */}
        <div>
          <label className="text-gray-700 mb-2 block font-semibold">
            Investment Start Date
          </label>
          <input
            type="date"
            ref={startDateRef}
            className="border-gray-300 w-full rounded-md border p-2"
            onChange={(e) => setInvestmentStartDate(e.target.value)}
            onClick={() => startDateRef.current?.showPicker()}
            value={
              investmentStartDate
                ? new Date(investmentStartDate).toISOString().split("T")[0]
                : ""
            }
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          />
        </div>
        {/* Investment End Date */}
        <div>
          <label className="text-gray-700 mb-2 block font-semibold">
            Investment End Date
          </label>
          <input
            type="date"
            ref={endDateRef}
            className="border-gray-300 w-full rounded-md border p-2"
            onChange={(e) => setInvestmentEndDate(e.target.value)}
            onClick={() => endDateRef.current?.showPicker()}
            value={
              investmentEndDate
                ? new Date(investmentEndDate).toISOString().split("T")[0]
                : ""
            }
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          />
        </div>

        {/* First Return Date */}
        <div>
          <label className="text-gray-700 mb-2 block font-semibold">
            First Return Date
          </label>
          <input
            type="date"
            ref={returnDateRef}
            className="border-gray-300 w-full rounded-md border p-2"
            onChange={(e) => setFirstReturnDate(e.target.value)}
            onClick={() => returnDateRef.current?.showPicker()}
            value={
              firstReturnDate
                ? new Date(firstReturnDate).toISOString().split("T")[0]
                : ""
            }
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          />
        </div>
      </div>
      <div className="flex justify-end" onClick={handleNextClick}>
        <p
          style={{
            backgroundColor: "#006666",
            color: "white",
            padding: "10px 20px",
            marginRight: "30px",
            borderRadius: "5px",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          Next
        </p>
      </div>
    </div>
  );
};

export default EditTimeline;
